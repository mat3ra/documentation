# Batch Scripts

This page explains the basic framework for the submission of [simulation Jobs]({{ reference_url }}/jobs/overview/) via the [Command Line Interface](../../cli/overview.md) (CLI). The corresponding actions for handling the job submission are narrated [separately](../actions/overview.md).

## Batch Mode

Simulation tasks submitted through CLI are expected to be run in **"batch" mode**. Batch jobs are controlled by the so-called **Batch Scripts** (also referred to as **Job Scripts**), which are written by the user and then submitted to the [resource management system]({{ resources_url }}/infrastructure/resource/overview/). These scripts specify, at the very least, how many nodes and cores the job will use, how long the job will run, the name of the [application]({{ reference_url }}/software-directory/overview/) to be run, and other important [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/).

Interactive parallel jobs are not supported on our platform by design. Users are encouraged to prototype calculations on the [login node]({{ resources_url }}/infrastructure/login/overview/) (using 2-8 CPU cores with < 1min walltime per user) instead, and submit larger debug tasks into the [Debug queue]({{ resources_url }}/infrastructure/resource/category/) designed specifically for testing purposes.

## Implementation

Our batch system is based on the **PBS model** [^1], implemented with the **Maui scheduler** [^2] and **Torque resource manager** [^3]. The actual execution of the parallel job, however, is handled by a special command, called a **job launcher**, which is implemented by a **parallel (MPI) library**. In a generic Linux environment, this utility is often labelled **"mpirun"**.

## [General Structure](general-structure.md)

The general layout structure of Batch Scripts is the object of [this discussion](general-structure.md).

## [Resource Manager Directives](directives.md)

[This page](directives.md) contains the list of the most important directives for specifying the allocation of [computing resources]({{ resources_url }}/infrastructure/resource/overview/), necessary for the execution of the job under consideration.

## [Working Directory](directories.md)

The main "working" directory, which is important in the context of defining Batch Scripts, storing simulation files and submitting jobs via CLI, is described [in this page](directories.md).

## [Examples](sample-scripts.md)

We provide some examples on how to enter the relevant information about jobs in batch scripts [here](sample-scripts.md).

## Links

[^1]: [Torque Resource Manager Administrator Guide, Document](http://docs.adaptivecomputing.com/torque/6-1-2/adminGuide/torqueAdminGuide-6.1.2.pdf)

[^2]: [Maui Scheduler, Official Website](https://en.wikipedia.org/wiki/Maui_Cluster_Scheduler)

[^3]: [TORQUE, Wikipedia](https://en.wikipedia.org/wiki/TORQUE)
