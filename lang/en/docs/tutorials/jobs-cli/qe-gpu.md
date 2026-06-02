---
tags:
  - GPU
  - CUDA
hide:
  - tags
---
# Accelerate Quantum ESPRESSO simulation with GPUs

We will walk through a step-by-step example of running a Quantum ESPRESSO job on
GPUs. As of the time of writing, the GPU (CUDA) build of Quantum ESPRESSO is
only available via the Command Line Interface (CLI). We will see that we can
dramatically speedup our Quantum ESPRESSO simulation by using GPUs.

1. First connect to login node via [SSH client]({{ cli_url }}/remote-connection/ssh/),
or [web terminal]({{ cli_url }}/remote-connection/web-terminal/). Note that it is also
possible to run CLI jobs by creating a [bash workflow](
{{ reference_url }}/software-directory/scripting/shell/overview/).

    ![Wen Terminal](../../images/jobs-cli/open-web-terminal.webp)

2. Example job that we are going to run is available in git repository
[exabyte-io/cli-job-examples](https://github.com/exabyte-io/cli-job-examples).
You may clone the repository to your working directory:
```bash
git clone https://github.com/exabyte-io/cli-job-examples
cd cli-job-examples
git lfs pull
cd espresso/gpu
```

3. You will find all required input files and job script under `espresso/gpu`.
Please review the input files and PBS job script, update the project name, and
other parameters as necessary.

4. We will use [GOF]({{ resources_url }}/infrastructure/clusters/aws/#hardware-specifications)
queue, which comprises 8 CPUs and 1 NVIDIA V100 GPU per node.

5. Since our compute node contains 8 CPUs with 1 GPU, we will run 1 MPI process
with 8 OpenMP threads.
```bash
module load espresso/7.4-cuda-12.4-cc-70
export OMP_NUM_THREADS=8
mpirun -np 1 $EXEC_CMD pw.x -npool 1 -ndiag 1 -in pw.cuo.scf.in > pw.cuo.gpu.scf.out
```

6. Finally, we can submit our job using:
```bash
qsub job.gpu.pbs
```

7. Once, the job is completed, we can inspect the output file `pw.cuo.gpu.scf.out`.
We will see that GPU was used, and the job took about 1 minute wall time.
```
Parallel version (MPI & OpenMP), running on       8 processor cores
Number of MPI processes:                 1
Threads/MPI process:                     8
...

GPU acceleration is ACTIVE.  1 visible GPUs per MPI rank
GPU-aware MPI enabled
...

Parallel routines

PWSCF        :     37.94s CPU     50.77s WALL
```

8. For comparison, we ran the same calculation using only CPUs, and it took
about 20 times longer.
```
Parallel version (MPI), running on     8 processors

MPI processes distributed on     1 nodes
...

Parallel routines

PWSCF        :  18m 0.56s CPU  18m25.33s WALL
```

You may experiment different combinations of MPI and OpenMP, various
[parallelization options](https://www.quantum-espresso.org/Doc/user_guide/node20.html),
and find what gives you the best performance.

## Step-by-step screenshare video

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/trLDEwWc3ho?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
