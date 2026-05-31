# Compute Parameters

In the present page, we review the different **compute parameters** which can be set under the [user interface](overview.md).

## Time limit 
 
The user can specify the maximum time limit for the calculation to be run for. The format is `HH:MM:SS` in which H, M and S stand for day, hour, minute and second respectively. Thus, the example below would correspond to 12 hours exactly:

```bash
12:00:00
``` 

Please note that a calculation will be terminated when the runtime exceeds the maximum time specified in this field.

### Time limit type

Relevant for [Saving Compute Category](../resource/category.md#cost-categories). When set to "compound", the total execution time will never exceed the time limit, even if the job is restarted. By default, the time limit is "per single attempt".

### Is restartable

If the job should be restarted upon termination, e.g. due to saving node termination. See "-r" [directive]({{ guide_url }}/jobs-cli/batch-scripts/directives/#other-useful-directives)

## Cluster choice

A list of [computing clusters](../clusters/overview.md) is available for performing the desired calculation. The user can also visualize the status of each cluster, under the "See clusters status" option in the [user interface](overview.md). 

## Queue

[Queues](../resource/overview.md) are used for managing the submission of [Jobs]({{ reference_url }}/jobs/overview/) to the [computing clusters](../clusters/overview.md). 

The user is offered the possibility to launch the desired job with a flexible set of [hardware](../clusters/hardware.md) and resource allocation modes per queue. For example, the Debug ("D") queue is especially suited for preliminary tests, "fast" queues (eg. "OF")" are best for high-throughput or multi-node distributed memory runs, and "regular queues" (eg. OR) provide regular access to the scheduler.

## Nodes / PPN

The desired number of computing nodes and the number of cores on each node (PPN = processors per node) can be selected, depending on the expected computational costs and requirements of the calculation under consideration. The necessary payments will have to be made as explained [in this page]({{ reference_url }}/accounts/balance/), before the execution of any task can be made possible.

## Notifications

Finally, the user can be notified about the start of the calculation on the supercomputing cluster, about its termination, or about a possible accidental abortion.
 
The user can click on the button corresponding to each one of these [Job statuses]({{ reference_url }}/jobs/status/) within the [user interface](overview.md) to trigger the associated notifications. Alternatively, all three notification types can be activated simultaneously by clicking the user icon.  

## Advanced Options

Further advanced options are offered in order to optimize the calculation. These depend on the simulation application. 

### Specific Implementation

The user should consult the corresponding [application pages]({{ guide_url }}/software-directory/overview/) for more information about the advanced options which pertain to each respective application.
