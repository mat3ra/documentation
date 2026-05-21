# Resource Manager Directives

As introduced [here](general-structure.md#3.-directives), the keywords described in the present page may be specified as **PBS Resource Manager Directives** (preceded by the `#PBS` prefix), to be embedded in a [batch script](overview.md). These directives are particularly important for allocating the necessary [computational resources and parameters]({{ dev_url }}/infrastructure/compute/parameters/) to the given [simulation Job]({{ reference_url }}/jobs/overview/), for its [submission to the CLI](../overview.md).

Full documentation on the resource management software and its directives can be found the reference containing the information about the Resource Management System [in the corresponding page of the present documentation]({{ dev_url }}/infrastructure/resource/overview/#links).

## Important Directives

|   Directive   |  Default | Description |
| ------------------|------------------|------------------|
| -l nodes = <number nodes>  |  1 node   | Number of [compute nodes]({{ dev_url }}/infrastructure/compute/parameters/#nodes-/-ppn) assigned to the job  |
| -l ppn = <processors per node> | 1 processor per node | Number of [processors per node]({{ dev_url }}/infrastructure/compute/parameters/#nodes-/-ppn) (ppn). **Note:** ppn must be less than or equal to the maximum available number of cores on the target compute node |
| -l walltime = <DD:HH:MM:SS> |  00:00:05:00  |  The maximum authorized [wallclock time]({{ dev_url }}/infrastructure/compute/parameters/#time-limit) for the job, after which the job will be automatically terminated |
| -N <Name of job script> | No default  |  The name of the job; up to 15 printable, non-whitespace characters |
| -q <queue code>  |  batch  |  Name of submit [queue]({{ dev_url }}/infrastructure/resource/queues/), for example "D" for Debug or "OR16" for Ordinary, Regular, 16 cores per each compute node  |
| -R  <y or n>     |      y           | Register Job in the Web Interface ("y" for yes or "n" for no). This option is further explained [here](../accounting.md#register-jobs-in-web-interface) |
| -A <Project Name> | Default Project |  [Charge job]({{ reference_url }}/accounts/payments-charges/) to the selected [project]({{ reference_url }}/jobs/projects/) |

!!!note "Project Name is required for Organizational Accounts"
    We recommend to consult the accounting aspects of the Project Name and its effect on the accounting for the organizational [accounts]({{ reference_url }}/accounts/overview/) documented [here](../accounting.md#job-project-specification).

## Other Useful Directives

|   Directive   |  Default | Description |
| ------------------|------------------|------------------|
| -r  <y or n>     |      y           | Make the job re-runnable, in the sense that it can be restarted automatically. Select either "y" for yes or "n" for no. This is particularly useful when running Jobs under the [Saving queue category]({{ dev_url }}/infrastructure/resource/category/), where the job can be interrupted anytime due to limited resources |     
| -e <filename>     |   &lt;job_name&gt;.e&lt;job_id&gt; | Write the standard error message(s) (stderr) encountered during job execution to the selected file name |
| -o <filename>     |  &lt;job_name&gt;.o&lt;job_id&gt; | Write the standard output of the simulation (stdout) to the selected file name |
| -j <oe or eo>      | Do not merge  | Merge (join) stdout and stderr. Select "oe" for merging to output file, or "eo" for merging to error file instead | 
| -m <a or b or e or n> |  a  | Email notification: a = send mail if job aborted by system; b = send mail when job begins; e = send mail when job ends; n = never send email. All the options may be combined together |
| -M <email_address> |  None  | User email address to which the above-mentioned notifications should be sent |

## Environment Variables

The batch system defines many **environment variables**, which are available for use within batch scripts via the `$` reference prefix. The following table list some of the more useful variables.
 
 Further explanation of these Environment Variables can be found under the reference containing the information about the Resource Management System [in the corresponding page of the present documentation]({{ dev_url }}/infrastructure/resource/overview/#links) (page 112).
 
!!!warning "Variables modification not recommended" 
    The user is advised not to redefine the value of any of these variables.
    
| Variable Name   | Meaning |
| --------------- | -------------|
| PBS_O_LOGNAME   | Login name of user who [submitted](../actions/submit.md) the job |
| PBS_O_HOME      | Home directory of submitting user    |
| PBS_O_WORKDIR   | Working directory in which the job files were defined and then [submitted](../actions/submit.md) |
| PBS_JOBID       | Unique identifier for this job; important for tracking [job status](../actions/check-status.md) |
| PBS_O_QUEUE     | Name of submit [queue]({{ dev_url }}/infrastructure/resource/queues/) |
| PBS_QUEUE       | Name of execution [queue]({{ dev_url }}/infrastructure/resource/queues/)  |
| PBS_O_JOBNAME   | Name of the present job |
| PBS_NODEFILE    | Name of file containing list of [nodes]({{ dev_url }}/infrastructure/compute/parameters/#nodes-/-ppn) assigned to this job |
| PBS_NUM_NODES   | Number of [nodes]({{ dev_url }}/infrastructure/compute/parameters/#nodes-/-ppn) assigned to this job  |
| PBS_NUM_PPN     | Value of ["ppn" (processes per node)]({{ dev_url }}/infrastructure/compute/parameters/#nodes-/-ppn) for this job |
| PBS_NP          | Total number of processors, that is the multiplication of the above-mentioned PBS_NUM_NODES with PBS_NUM_PPN |

## Standard Output and Error

While the job is running, the **standard output (stdout)** and **standard error (stderr)** of the simulation are written to temporary **"spool" files** (for example: "123456-cluster.o" and "123456-cluster.e") inside the [Working directory](directories.md). If the user decides to merge stderr/stdout via the aforementioned `#PBS -j eo` or `#PBS -j oe` directives, then only one such spool file will appear.

These files will be updated in real-time while the job is running, allowing the user to make use of them for job monitoring. It is important that these spool files are not modified, removed or renamed while the job is still running.

After the batch job completes, the above files will be renamed to the corresponding stdout/stderr files (for example: my_job.o123456 and my_job .e123456).

## Notifications

In order to get notified via email about an accidental job termination, resulting for example from computational errors or in case the job was being executed in the [Saving Category]({{ dev_url }}/infrastructure/resource/category/) and got interrupted, the above-mentioned `#PBS -m abe` and `#PBS -M < email_address >` directives must be set inside the [Batch Script file](overview.md). 

In addition, for the latter case of Jobs being run in the Saving Category, our scheduling system automatically restarts any unintentionally terminated jobs, and re-submits them into the [regular queue]({{ dev_url }}/infrastructure/resource/category/) for their continuation. If the user does not want the job to be restarted in this way, he/she must set the `#PBS -r n` directive inside the [Batch Script](overview.md). In this case, a temporary folder containing the job's intermediate results will be created in the user's home directory.
