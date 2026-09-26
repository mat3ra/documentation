# Detailed List of Jobs and Charges

To get detailed information about all the [jobs](../overview.md) [submitted](../overview.md) **to date** by the user on the [Command Line Interface](../../cli/overview.md) (CLI) of our system, the `lsjob` command should be entered, as displayed in the example below.
 
This information includes the relevant [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) used as part of the job execution, as well as the [Project]({{ reference_url }}/jobs/projects/) container and [Account Charges]({{ reference_url }}/accounts/payments-charges/) incurred by each listed Job. Here, the Jobs are referenced by their **"Job IDs"**, as well as by their IDs attributed by the accounting system. 

## Example

The example below demonstrates how to list all jobs for the current user, executed within a certain time period.

```bash
# > lsjob -s 2019-01-08 -e 2019-02-08`
Id     JobId User  Project               Machine                                           Queue QualityOfService Stage   Charge   Processors Nodes WallDuration StartTime           EndTime             Description           
------ ----- ----- --------------------- ------------------------------------------------- ----- ---------------- ------- -------- ---------- ----- ------------ ------------------- ------------------- --------------------- 
38921  3112  steve steve                 master-20151023-0955-cluster-001.exabyte.io       OF    DEFAULT          Charge   0.40400 72               202          2019-02-02 07:22:18 2019-02-02 07:25:40                       
38922  3112  steve steve                 master-20151023-0955-cluster-001.exabyte.io       OF    DEFAULT          Charge   6.79598 72               3398         2019-02-02 07:22:18 2019-02-02 07:25:41 charge for whole hour 
```

The full list of command line parameters can be extracted as explained [here](../../cli/accounting.md#command line-parameters).

## More Information

The link to the full documentation manual for the accounting software is available [in this page](../../cli/accounting.md).
