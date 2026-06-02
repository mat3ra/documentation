# Add New Software

## Overview
Users can compile their own software via the
[Command Line Interface](../overview.md) (CLI). This is helpful if users need
to run a specific version of an application that is not installed "globally".
The globally installed applications are currently distributed as Apptainer[^1]
(Singularity[^2]) containers, bundled with all required dependencies. This
ensures that each application is isolated and avoids dependency conflicts.

When planning to run an application that is not installed in our cluster, we
encourage packaging code and its dependencies as an Apptainer/<wbr/>Singularity
container. Existing Docker images can be converted into an
Apptainer/<wbr/>Singularity images.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/G1hfW_kS8oY?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Sandbox mode
Apptainer's sandbox mode is helpful for testing and fine-tuning the build steps
interactively. To start it, first initialize a sandbox with `--sandbox` or `-s`
flag:

```bash
apptainer build --sandbox gcc_sandbox/ docker://almalinux:9
```

The above command will extract the entire Linux OS tree (`/bin`, `/etc`, `/usr`)
from the AlmaLinux 9 Docker image to a subdirectory named `gcc_sandbox`.

Now, to install packages and save them to the sandbox folder, we can enter into
the container in shell (interactive) mode with write permission (use
`--writable` or `-w` flag). We will also need `--fakeroot` or `-f` flag to
install software as root inside the container:

```bash
apptainer shell --writable --fakeroot gcc_sandbox/
```

Once inside the Apptainer shell, we can install packages and run commands
interactively, as we would normally do from the terminal, for example:

```bash
dnf install gcc
```

Once you are happy with the sandbox, have tested the build steps, and installed
everything you need, `exit` from the Apptainer shell mode.


## Building containers

### Build from a Sandbox folder

We may either package the sandbox directory into a final image:
```bash
apptainer build -f gcc.sif gcc_sandbox/
```

We can verify that our container is working with:
```bash
apptainer exec gcc.sif gcc --version
```

After the container is built and saved as an SIF image, we may delete our
sandbox folder. We need to set appropriate permissions to be able to delete:

```bash
chmod -R u+rwX gcc_sandbox
rm -rf gcc_sandbox
```

### Build from a definition file

Instead of converting the sandbox folder to an SIF image, we may first create an
Apptainer definition with the finalized build steps. Below is an example
Apptainer/<wbr/>Singularity definition to build a Quantum ESPRESSO container
along with its dependencies.

??? example "Example Apptainer definition (click to expand)"
    ```singularity title="espresso.def"
    Bootstrap: docker  # (1)!
    From: almalinux:9  # (2)!

    %labels  # (3)!
        Maintainer Mat3ra.com
        Version QE-7.5-gcc-openmpi-openblas

    %environment  # (4)!
        export PATH=/usr/lib64/openmpi/bin:/opt/qe-7.5/bin:$PATH

    %post  # (5)!
        # enable additional repos
        dnf install -y epel-release
        dnf config-manager --set-enabled crb

        # install dependencies
        dnf install -y autoconf \
            gcc \
            gcc-c++ \
            gcc-gfortran \
            git \
            make \
            fftw-devel \
            openblas \
            openblas-devel \
            openmpi-devel \
            scalapack-openmpi-devel \
            wget

        # download QE and compile
        VERSION=7.5
        INSTALL_PREFIX="/opt/qe-$VERSION"
        BUILD_DIR=~/tmp
        mkdir $BUILD_DIR

        cd $BUILD_DIR
        wget https://gitlab.com/QEF/q-e/-/archive/qe-${VERSION}/q-e-qe-${VERSION}.tar.gz
        tar -xf q-e-qe-${VERSION}.tar.gz
        cd q-e-qe-${VERSION}

        export PATH=/usr/lib64/openmpi/bin:$PATH
        export FFLAGS="-O2 -fallow-argument-mismatch"
        export FCFLAGS="-O2 -fallow-argument-mismatch"

        ./configure --prefix=${INSTALL_PREFIX} MPIF90=mpif90 CC=mpicc F90=gfortran F77=gfortran \
        --with-scalapack=yes \
        BLAS_LIBS="-lopenblas" LAPACK_LIBS="-lopenblas" \
        LDFLAGS="-Wl,-rpath,/usr/lib64/openmpi/lib -Wl,-rpath,/usr/lib64"

        make all -j$(nproc)
        make install

        # cleanup
        rm -rf $BUILD_DIR
        dnf clean all && rm -rf /var/lib/dnf /var/cache/dnf /var/cache/yum
    ```

    1. Bootstrap from a Docker image
    2. Select base image
    3. Set Metadata such as version, maintainer details, etc.
    4. Set runtime environment variables
    5. Build routine, under the `post` section

Now we are ready to build the container with:

```bash
apptainer build espresso.sif espresso.def
```

### Build Considerations

#### Running resource-intensive builds in batch mode

Prototyping the build is convenient using sandbox mode, but when the routines
are clear and the `.def` file is ready, we suggest that users submit a
[PBS batch script]( ../../jobs-cli/batch-scripts/overview.md) to perform the
build tasks. This ensures that the resource-intensive build process runs on a
compute node rather than the login node itself. As a side "perk", by doing so,
we assert that the compute environment is equivalent to the build environment.

```bash title="build-qe.pbs"
#!/bin/bash
#PBS -N Build_QE
#PBS -j oe
#PBS -l nodes=1
#PBS -l ppn=4
#PBS -l walltime=00:01:00:00
#PBS -q OR
#PBS -m abe
#PBS -M info@mat3ra.com

cd $PBS_O_WORKDIR
apptainer build espresso.sif espresso.def
```

#### Porting large libraries from the host

Large libraries such as the Intel OneAPI suite and NVIDIA HPC SDK, which are
several gigabytes in size, can be mapped from the cluster host instead of
bundling together with the application. However, this is not applicable if one
needs a different version of these libraries than the one provided.

This can be done by using the `--bind` directives and passing the appropriate
library location from the host, e.g., from
`/cluster-001-share/compute/software/libraries` or
`/export/compute/software/libraries/`.

See the GPU example below for more details.

#### Building containers with GPU support

To run applications with GPU acceleration, first, we need to compile the
GPU code with appropriate GPU libraries used, which is done during the container
build phase. Here, we will describe how we can compile our application code
using NVIDIA HPC SDK (which includes CUDA libraries) and package the compiled
code as a containerized application.

The process works even on systems without GPU devices or drivers,
thanks to the availability of dummy shared objects (e.g.,
`libcuda.so`) in recent versions of the NVHPC SDK and CUDA Toolkit. These dummy
libraries allow the linker to complete compilation without requiring an actual
GPU.

NVIDIA HPC SDK (or CUDA Toolkit) is a large package,
typically several gigabytes in size. Unless a specific version of CUDA is
required, it’s more efficient to map the NVHPC installation available on
the host cluster. Currently, NVHPC 25.3 with CUDA 12.8 is installed in the
Mat3ra clusters. This version matches the NVIDIA driver version on the cluster's
compute nodes.

We build our GPU containers in two stages:

1. **Base Image and Compilation Stage**: Install NVHPC and all other
dependencies, and compile the application code.
2. **Slim Production Image**: Create a final production container by copying
only the compiled application and smaller dependencies (if any) into a new base
image, omitting the NVHPC SDK.

To run such a container, we must `--bind` the NVHPC paths from the host and set
appropriate `PATH` and `LD_LIBRARY_PATH` for apptainer. Specialized software
libraries are installed under `/export/compute/software` in Mat3ra clusters.
Also, to map the NVIDIA GPU drivers from the compute node, we must use the
`--nv` flag. Now, to set `PATH` inside apptainer, we can set
`APPTAINERENV_PREPEND_PATH` (or `APPTAINERENV_APPEND_PATH`) on the host.
However, for other ENV variables, such special Apptainer variables are not
present, so we can use the `APPTAINERENV_` prefix for them. So a typical job
script would look like:

```bash
export APPTAINERENV_PREPEND_PATH="/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/hcoll/bin:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/ompi/bin:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/ucx/mt/bin:/export/compute/software/compilers/gcc/11.2.0/bin"

export APPTAINERENV_LD_LIBRARY_PATH="/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/hcoll/lib:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/ompi/lib:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/nccl_rdma_sharp_plugin/lib:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/sharp/lib:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/ucx/mt/lib:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/hpcx/hpcx-2.22.1/ucx/mt/lib/ucx:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/comm_libs/12.8/nccl/lib:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/compilers/lib:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/cuda/12.8/lib64:/export/compute/software/libraries/nvhpc-25.3-cuda-12.8/Linux_x86_64/25.3/math_libs/12.8/lib64:/export/compute/software/compilers/gcc/11.2.0/lib64:\${LD_LIBRARY_PATH}"

apptainer exec --nv --bind /export,/cluster-001-share <path-to-image.sif> pw.x -in pw.in > pw.out
```

To understand the details about library paths, one may inspect modulefiles (e.g.,
`/cluster-001-share/compute/modulefiles/applications/espresso/7.5-cuda-12.8`)
available in our clusters and [job scripts](
https://github.com/Exabyte-io/cli-job-examples/blob/main/espresso/gpu/job.gpu.pbs)
to see how it is implemented. Do not forget to use a GPU-enabled queue,
such as [GOF]({{ resources_url }}/infrastructure/clusters/google/) to submit your GPU jobs.


## Run jobs using Apptainer

Once the container is built, we are ready to run applications packaged in it. A
simple PBS job script would look like:

```bash title="run-qe.pbs"
#!/bin/bash
#PBS -N Run_QE
#PBS -j oe
#PBS -l nodes=1
#PBS -l ppn=4
#PBS -l walltime=00:24:00:00
#PBS -q OR
#PBS -m abe
#PBS -M info@mat3ra.com

cd $PBS_O_WORKDIR

apptainer exec --bind /export,/scratch,/dropbox,/cluster-001-share \
  /path/to/espresso.sif pw.x -in pw.in > pw.out
```

Above we `--bind` several host paths to the container so that we can use items
such as pseudopotential files stored under those locations. Submit job with:
```bash
qsub run-qe.pbs
```

Monitor job status:
```bash
qstat
```

Once the job is completed, all output files will be saved under the directory
from which the job was submitted. Please follow [this documentation page](
../../jobs-cli/batch-scripts/apptainer.md) to find more about Apptainer
integration. For practical templates, please visit[CLI job examples](
https://github.com/Exabyte-io/cli-job-examples).


## Transfer external images

You can build containers on your local machine or use pull pre-built ones from
sources such as [NVIDIA GPU Cloud](
https://catalog.ngc.nvidia.com/orgs/hpc/containers/quantum_espresso).

If the container is build locally, you can push the image to a container
registry such as the [GitHub Container Registry](
https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

```bash
apptainer push espresso.sif oras://ghcr.io/<user-or-org-name>/<namespace>/<container-name>:<tag>
```

Then, pull the image from the login node::

```bash
apptainer pull oras://ghcr.io/<user-or-org-name>/<namespace>/<container-name>:<tag>
```

!!! tip
    - You may use GitHub workflow to build images and push to GHCR.
    - When pulling a Docker image, Apptainer will automatically convert and save
    it as SIF file.

Alternatively, you can copy the local image file directly to the cluster
via SCP:

```bash
scp espresso.sif <username>@login.mat3ra.com:/cluster-001-home/<username>/
```

## Other Notes

### Cleaning Cache

Apptainer can use a significant amount of cache disc space. We can use
`--disable-cache` flag or clean Apptainer cache periodically with:

```
apptainer cache clean --force
```

## Links

[^1]: [Apptainer User Guide](https://apptainer.org/docs/user/latest/)
[^2]: [Singularity User Guide](https://docs.sylabs.io/guides/latest/user-guide/)
