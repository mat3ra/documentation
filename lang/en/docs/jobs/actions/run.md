# Run Job

A Job listed under the [Jobs Explorer](../ui/explorer.md), which has a ["pre-submission" status]({{ reference_url }}/jobs/status/), can be submitted to the [computational infrastructure]({{ resources_url }}/infrastructure/overview/) for execution of its computational tasks. We refer to this action as "Running" the Job. 

The Run action is accessible from the [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar) or [actions dropdown](../../entities-general/ui/explorer.md#actions-dropdown), under the button labelled with the "Play" icon <i class="zmdi zmdi-play zmdi-hc-border"></i>.

## Change of Status

Running a Job changes its [status]({{ reference_url }}/jobs/status/) from "Pre-submission" to "Submission", and then eventually to "Active" once the job gets past the waiting time on the [cluster queue]({{ resources_url }}/infrastructure/resource/queues/) and enters the execution stage.

## Animation

In the example below, we demonstrate how the status of a Job changes as described above when it is Run. A delay of some (5-10) seconds is incurred from the moment the Job is submitted to the moment it becomes active. Waiting times depend on the [queue category]({{ resources_url }}/infrastructure/resource/category/) being considered.

<img data-gifffer="/images/jobs/run-job.gif">
