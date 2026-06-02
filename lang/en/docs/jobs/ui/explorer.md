# Jobs Explorer Interface

Jobs Explorer allows users to interact with the jobs. The features of Jobs Explorer that make it distinct from the [general case](../../entities-general/ui/explorer.md) include the kind of information that can be displayed under the items list.

The image below shows how Jobs Explorer appears under typical circumstances. The general [entity actions](../../entities-general/actions/overview.md) as well as those [specific to Jobs](../actions/overview.md) originate from this interface.

![Jobs Explorer Interface](../../images/jobs/jobs-explorer.png "Jobs Explorer Interface")

## Status Indicators

An important property present in the items list is the [Status indicator]({{ reference_url }}/jobs/status/) of each listed Job, under the "Status" column highlighted in the above image. 

## Other Specific Properties

Additional Job-specific columns that can be listed in Explorer include those ticked in the image below. They can be selected from the [Columns Selector](../../entities-general/ui/explorer.md#columns-selector).

![Jobs Specific Properties](../../images/jobs/jobs-properties.png "Jobs Specific Properties")

### Application

This option displays the [applications]({{ reference_url }}/software-directory/overview/) employed within the [workflow]({{ reference_url }}/workflows/overview/) used inside the Job, including their version numbers.

### Cluster - Queue & Cores

These are the [name of the cluster]({{ resources_url }}/infrastructure/clusters/overview/) and the compute [queue]({{ resources_url }}/infrastructure/resource/queues/) therein where the Job is executed. The number of computational nodes and CPU cores are also indicated.

### Run & Wait Time

This corresponds to the amount of time that the Job took to finish, and for how long it had to wait in the [queue]({{ resources_url }}/infrastructure/resource/queues/) of the cluster before being executed.

### Project

The name of the [Project]({{ reference_url }}/jobs/projects/) containing the Job is displayed under this column.
