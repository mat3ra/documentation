# Jobs via Command Line Interface

The present section of the documentation explains how [simulation Jobs]({{ reference_url }}/jobs/overview/) can be created and executed via the [Command Line Interface (CLI)](../cli/overview.md) of our platform.

## [Batch script](batch-scripts/overview.md)

We explain how to compose **Batch Scripts** (also known as **Job Scripts**), necessary for job submission via CLI, [in this section](batch-scripts/overview.md).

## [Accounting](accounting.md)

We describe the accounting aspects of Job submission via CLI, such as specifying [Projects]({{ reference_url }}/jobs/projects/) and inspecting the [Account]({{ reference_url }}/accounts/overview/) charges and balance, [here](accounting.md).

## [Actions](../cli/actions/overview.md)

The actions pertaining to Jobs submission and execution under the CLI are reviewed [in this section](actions/overview.md) of the documentation. Other general actions concerning the CLI, such as the loading of modules, the compilation of new applications or the creation of new python environments, are described [separately](../cli/actions/overview.md).

## Apptainer and Environment Modules

For the new platform, CLI workflows use Apptainer-backed modules that set `$EXEC_CMD` variables for containerized execution. See: [Apptainer and Environment Modules](batch-scripts/apptainer.md)

## [Tutorials](../tutorials/jobs-cli/overview.md)

We provide tutorials guiding the user through the complete procedure for submitting jobs via CLI, and subsequently retrieving the corresponding results under the [Web Interface](../ui/overview.md) of our platform. These tutorials are introduced [here](../tutorials/jobs-cli/overview.md).
