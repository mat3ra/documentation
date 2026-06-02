# Create New Job

Here, we explain how to assemble the necessary input files for [job submission via the CLI](../overview.md) using some pre-defined examples. The reader is referred to the [dedicated Tutorial]({{ guide_url }}/tutorials/overview/) on this topic for a more comprehensive description and examples on how such input files can be customized by the user.

## General Procedure

A new [simulation Job]({{ reference_url }}/jobs/overview/) can be created by assembling the necessary **simulation input files**, as well as the **[Batch Script](../batch-scripts/overview.md)** associated with the job, under the same [working folder](../batch-scripts/directories.md).
 
By our convention, this working folder must be located under the [cluster home directory]({{ resources_url }}/infrastructure/clusters/directories/) of the [computing cluster]({{ resources_url }}/infrastructure/clusters/overview/) being considered for job execution.

!!! note "Choose walltime carefully"
    The [Walltime]({{ resources_url }}/infrastructure/compute/parameters/#time-limit) of the simulation is defined in the [Batch Script](../batch-scripts/overview.md) through its corresponding [directive](../batch-scripts/directives.md), and should be chosen carefully for a number of reasons.
    
    1. Jobs that require long walltime will [reserve the corresponding balance]({{ reference_url }}/accounts/balance/#reserved-balance), and thus prevent other jobs from starting.
    2. When not enough walltime is allocated, the job may not finish on time, resulting in an erroneous output. 
    3. The user is advised to [submit a support ticket]({{ interface_url }}/ui/support/) if a walltime adjustment is needed during the course of a long job execution. Our support staff will do their best to accommodate the necessary desired changes, depending on the current computing load and business hours.

Users can find our examples of job batch scripts and input files as explained [here](../batch-scripts/sample-scripts.md). 

### Example

Below are example commands needed to copy and run one of these template examples with the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) modeling application, contained in the `espresso` sub-directory inside `job_script_templates`.

```bash
# make temporary directory
cd && mkdir -p job-examples/
# copy example files
cd job-examples/ && cp -r ~/job_script_templates/espresso .
# submit for execution
cd espresso && qsub job.pbs
```

The above case [submits](submit.md) the sample Quantum ESPRESSO job into the [queue]({{ resources_url }}/infrastructure/resource/queues/) of the [resource manager]({{ resources_url }}/infrastructure/resource/overview/) for scheduling its execution. You can view its status with the `qstat` command described [here](check-status.md).
