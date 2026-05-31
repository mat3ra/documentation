# Purge Job

After the "Purge" action files present on the [cluster hard drives]({{ dev_url }}/infrastructure/storage/) and associated with the Job are removed to free some space against the [quota]({{ reference_url }}/accounts/quota/). These files remain, however visible in the web application under the [Files Tab](../ui/files-tab.md) of the [Jobs Viewer](../ui/viewer.md). 

The purge action is restricted to Jobs with a ["Finished" status]({{ reference_url }}/jobs/status/).

## Action

To purge a Job listed under the [Jobs Explorer](../ui/explorer.md), first [select it](../../entities-general/actions/select.md) and press the "Purge" button <i class="zmdi zmdi-card-off zmdi-hc-border"></i> located in the top right [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar).

Alternatively, the same action can be performed under the [actions dropdown](../../entities-general/ui/explorer.md#actions-dropdown) of the item entry that needs purging.

## Animation

In the example animation below, we begin by purging a Job. We then copy the command line path of one of the files listed under Jobs Viewer, and under the [Web Terminal]({{ guide_url }}/remote-connection/web-terminal/) we finally confirm its deletion from the [cluster disk]({{ dev_url }}/infrastructure/storage/) after pasting the file path in it.

<img data-gifffer="/images/jobs/purge-job.gif">
