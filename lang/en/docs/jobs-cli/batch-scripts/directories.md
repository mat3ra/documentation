# Batch Script Directories
 
## Working Directory

Each job defined via the [Command Line Interface](../../cli/overview.md) (CLI) is associated with a user-defined **Working Directory**, referred to under the corresponding [environment variable](directives.md#environment-variables). This directory typically contains the [Batch Script](overview.md) for defining the Job, as well as all of the job's corresponding input and output simulation files generated during the course of its execution.

!!!warning "Required location of Working Directory"
    A Job can be [submitted](../actions/submit.md) to a [cluster]({{ dev_url }}/infrastructure/clusters/overview/) for its execution only if its corresponding working directory is located somewhere within the [cluster's home directory]({{ dev_url }}/infrastructure/clusters/directories/), or under any of its sub-directories. 

## Job Templates

Users can find examples of job batch scripts and the corresponding input files within the job script templates further explained [here]({{ dev_url }}/data-on-disk/directories/#job-script-templates). Users can copy the template inputs contained there into the corresponding job's working directory, and modify it as needed.
