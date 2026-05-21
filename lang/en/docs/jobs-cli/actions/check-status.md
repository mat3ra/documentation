# Check Job Status

The user can **inspect the status** of current [Jobs submitted via CLI](../overview.md) at any moment through the `qstat` command, which returns an output of the following kind.

```
[steve@login.mat3ra.com:~]$ qstat
JOBID                                                  USERNAME    QUEUE    JOBNAME    STATE    MEMORY    USEDTIME    WALLTIME      NODES    CPU
-----------------------------------------------------  ----------  -------  ---------  -------  --------  ----------  ----------  -------  -----
814.master-production-20160630-cluster-007.exabyte.io  steve       D        my_job     C        0kb       00:00:10    00:10:00          1      1
815.master-production-20160630-cluster-007.exabyte.io  steve       OR       my_job     R        1235kb    00:00:10    00:10:00          1      1
```

The complete manual page for this command listing all its possible option flags can be found in the reference containing the information about the Resource Management System [in the corresponding page of the present documentation]({{ dev_url }}/infrastructure/resource/overview/#links) (page 364).

## Job ID in CLI

The `qstat` command displays the information about jobs organized by their IDs, as listed under the **"JOBID"** column of the output. This "Job ID" includes the alias of the cluster where the job has been submitted (for example, `cluster-007` within the `814.master-production-20160630-cluster-007.exabyte.io` job ID in the above examples).

It is important to make a note of this ID for job tracking and problem resolution, as well as for the case when [job termination](terminate.md) by the user becomes necessary.

Job ID in command line may also be referred to as "jid".
 
## Possible Job Statuses

The possible job statuses indicated under the "STATE" column of the `qstat` command output include the following possibilities.

- "Q": Job is currently **Queued** and still pending execution. 
- "R": Job is currently **Running**.
- "C": Job execution is **Complete**. This can include the possibility of jobs interrupted prematurely because of errors.

Consult the reference containing the information about the Resource Management System [in the corresponding page of the present documentation]({{ dev_url }}/infrastructure/resource/overview/#links) for more information.
