---
tags:
  - GPU
  - CUDA
hide:
  - tags
---
# Accelerate Quantum ESPRESSO Simulation with GPUs

This tutorial walks through a step-by-step example of running a Quantum ESPRESSO job on GPUs. As of the time of writing, the GPU (CUDA) build of Quantum ESPRESSO is only available via the Command Line Interface (CLI). GPU acceleration can provide dramatic speedups for Quantum ESPRESSO simulations.


## 1. Connect to the login node

Connect to the login node via [SSH client]({{ cli_url }}/remote-connection/ssh/) or [web terminal]({{ cli_url }}/remote-connection/web-terminal/). It is also possible to run CLI jobs by creating a [bash workflow]({{ reference_url }}/software-directory/scripting/shell/overview/).

![Web Terminal](../../images/jobs-cli/open-web-terminal.webp)


## 2. Clone the example repository

The example job is available in the git repository [exabyte-io/cli-job-examples](https://github.com/exabyte-io/cli-job-examples). Clone the repository to the working directory:

```bash
git clone https://github.com/exabyte-io/cli-job-examples
cd cli-job-examples
git lfs pull
cd espresso/gpu
```


## 3. Review the input files

All required input files and the job script are located under `espresso/gpu`. Review the input files and PBS job script, and update the project name and other parameters as necessary.


## 4. Select the compute queue

The [GOF]({{ resources_url }}/infrastructure/clusters/aws/#hardware-specifications) queue is used, which comprises 8 CPUs and 1 NVIDIA V100 GPU per node.


## 5. Configure MPI and OpenMP

Since the compute node contains 8 CPUs with 1 GPU, the job runs 1 MPI process with 8 OpenMP threads:

```bash
module load espresso/7.4-cuda-12.4-cc-70
export OMP_NUM_THREADS=8
mpirun -np 1 $EXEC_CMD pw.x -npool 1 -ndiag 1 -in pw.cuo.scf.in > pw.cuo.gpu.scf.out
```


## 6. Submit the job

Submit the job using:

```bash
qsub job.gpu.pbs
```


## 7. Inspect the results

Once the job completes, inspect the output file `pw.cuo.gpu.scf.out`. The output confirms that GPU acceleration was used and the job took approximately 1 minute wall time:

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


## 8. Compare with CPU-only performance

For comparison, the same calculation using only CPUs took about 20 times longer:

```
Parallel version (MPI), running on     8 processors

MPI processes distributed on     1 nodes
...

Parallel routines

PWSCF        :  18m 0.56s CPU  18m25.33s WALL
```

Different combinations of MPI and OpenMP, as well as various [parallelization options](https://www.quantum-espresso.org/Doc/user_guide/node20.html), can be tested to find the best performance.


## 9. Video walkthrough

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/trLDEwWc3ho?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
