# Job Termination

In order for the user to **terminate** the `qdel` command should be used. This command should be operated in conjunction with the **"Job ID"**, as returned by the `qstat` [command](check-status.md) under the **"JOBID"** column of its output. 

## Example

For example, the following command will kill the job with the `814.master-production-20160630-cluster-007.exabyte.io` ID.

```
[steve@login.mat3ra.com:~]$ qdel 814.master-production-20160630-cluster-007.exabyte.io
```

This explanation concerns the jobs [submitted for execution via CLI](../overview.md), and listed in either "Queued" or "Running" [statuses](check-status.md),

## More information

The manual page for the `qdel` command, listing the available option flags, can be retrieved the reference containing the information about the Resource Management System [in the corresponding page of the present documentation]({{ dev_url }}/infrastructure/resource/overview/#links) (page 337).
