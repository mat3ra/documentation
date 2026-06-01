# Submit Job

After a [Batch Script](../batch-scripts/overview.md) is prepared, computation jobs can be **submitted** for execution via CLI. 

!!! warning "Some things to remember"
    Simulation input files have been [gathered together](create.md) under the same [Working Directory](../batch-scripts/directories.md). This Working Directory has to be located within the [Home folder]({{ dev_url }}/infrastructure/clusters/directories/) of the cluster on which the user wants to execute the job, so that it is directed to the desired [computing cluster]({{ dev_url }}/infrastructure/clusters/overview/). We also recommend the user to first consult the accounting aspects documented [here](../accounting.md), before proceeding with job submission.

Job submission is performed with the `qsub` command, as demonstrated in the following example, where the Batch Script in this case is called `my_job.pbs`.

```
[steve@login.mat3ra.com:~]$ qsub my_job.pbs
814.master-production-20160630-cluster-007.exabyte.io
```

This command return the Job ID, further explained below. The manual page for this command can be reviewed in the reference containing the information about the Resource Management System [in the corresponding page of the present documentation]({{ dev_url }}/infrastructure/resource/overview/#links) (page 373).

## Jobs ID

Just after it is entered, the `qsub` command returns the **"Job ID"**, which includes the alias of the cluster where the job has been submitted (for example, `cluster-007` within the `814.master-production-20160630-cluster-007.exabyte.io` job ID in the above example).
 
It is important to remember this "job id" for tracking and for any problem resolution, as well as in the eventuality of [job termination](terminate.md) by the user.
