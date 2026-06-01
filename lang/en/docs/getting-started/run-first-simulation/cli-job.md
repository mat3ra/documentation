# Jobs via Command-line Interface

The user may want more control over the [workflow execution]({{ reference_url }}/workflows/overview/), or run a type of calculation we have yet to implement. For that purpose, we provide access to our platform through [Command Line Interface (CLI)](../../cli/overview.md), were [simulation Jobs]({{ reference_url }}/jobs/overview/) can be executed.

Complete instructions on how to operate job submission via CLI can be found [in this section](../../jobs-cli/overview.md). We also provide a [tutorial](../../tutorials/jobs-cli/job-cli-example.md) dedicated to this topic, including on how to [retrieve and inspect](../../tutorials/jobs-cli/job-cli-example.md) the final results of the simulation.

## Command-line Interface

We provide an an incorporated [Web Terminal]({{ interface_url }}/remote-connection/web-terminal/) to conveniently access the CLI. Alternatively, the user can use the [SSH protocol]({{ interface_url }}/remote-connection/ssh/).

To use the former Web Terminal interface, open the [Account Menu]({{ interface_url }}/ui/account-menu/) and click `Terminal`.

The simulations that have been submitted through the main [Web Interface]({{ interface_url }}/ui/overview/) are under the `data/<username>` sub-directory under the main [Login Home directory]({{ dev_url }}/infrastructure/login/directories/).

Our [queuing system]({{ dev_url }}/infrastructure/resource/queues/) is controlled through the use of [batch scripts](../../jobs-cli/batch-scripts/overview.md). The reader can find batch script templates under the [job templates directory](../../jobs-cli/batch-scripts/directories.md#job-templates).

## Create job

### Prepare subdirectory

To create a job under the CLI, we recommend working inside the aforementioned `~/data/<username>` sub-directory. The user should create a new [working directory](../../jobs-cli/batch-scripts/directories.md#working-directory) under this sub-directory (called `test_job`, for example).

```bash
mkdir test_job
```

A convenient way to get acquainted with our CLI is to start by copying the template [batch script file](../../jobs-cli/batch-scripts/overview.md) from within the `~/job-script-templates` [folder](../../jobs-cli/batch-scripts/directories.md#job-templates), and rename it as `job.script`. These actions can be performed with the following command, for the example case of the [Quantum ESPRESSO](../../software-directory/modeling/quantum-espresso/overview.md) template.

```bash
cp ~/job_script_templates/espresso/job.pbs ~/data/<username>/test_job/job.script
```

Copy any necessary simulation input files or executables into this current working directory as well.

### Edit submission script

The user may need to edit the batch script if he/she wants to use a [simulation software](../../software-directory/overview.md) other the default. Directions on how to set resource manager variables can be found in [the batch script examples](../../jobs-cli/batch-scripts/sample-scripts.md). A comprehensive list of the resource manager options is available [here](../../jobs-cli/batch-scripts/directives.md).

In addition, if the user would like to alter runtime environment for the calculation, can may consult [modules environment](../../cli/environment.md) section of our documentation.

Lastly, the options for choosing the queue to submit the job can be found [here]({{ dev_url }}/infrastructure/resource/queues/).

!!!tip "Accounting Project Parameter"
    In order to specify a [project]({{ reference_url }}/jobs/projects/) that the job should belong to and should be [charged upon]({{ reference_url }}/accounts/payments-charges/), the instructions contained [in this page](../../jobs-cli/accounting.md) should be followed.

In the present tutorial we will proceed with the default submission script template, without modification.

## Submit job

As a next step, the user can [submit the batch script](../../jobs-cli/actions/submit.md) for job execution using the `qsub` resource manager command:

```bash
 qsub job.script
```

Our resource management system will respond with a message letting know that the job was accepted.

## Monitor job

In order to check on the [current status](../../jobs-cli/actions/check-status.md) of the job, type the following command.

```bash
qstat
```

Once the job starts running, all the output will be placed in the [working directory](../../jobs-cli/batch-scripts/directories.md#working-directory) where the `qsub` command was originally executed from (unless the "directory" line was changed within the batch script file).

## Animation

The animation below demonstrates the above steps in action.

<img data-gifffer="/images/jobs-cli/job-cli.gif"/>
