# Create Job

Creating new Jobs follows [the general explanation](../../entities-general/actions/create.md). The important difference is that **the create action has to originate from inside a [**Project**]({{ reference_url }}/jobs/projects/)**, by clicking on the "Create" button <i class="zmdi zmdi-file-plus zmdi-hc-border"></i> there. This is required to properly associate the newly created job with the project. When "Create Job" link is used in [left-hand sidebar]({{ interface_url }}/ui/left-sidebar/) the [default project]({{ reference_url }}/jobs/projects/#default-project)

> Attempting to perform the Create action directly from the main [Jobs Explorer](../ui/explorer.md) will result in a warning notice.
 
This contrasts with other [entity types]({{ reference_url }}/entities-general/overview/), for which this action has to originate under the main [Explorer Interface](../../entities-general/ui/explorer.md) of the entity itself. 

The project from where the Job is created corresponds to where it will also be saved later.

## Opening of Jobs Designer

Clicking "Create" as prescribed above takes the user to the [Job designer page]({{ interface_url }}/jobs-designer/overview/), where new simulations can be conceived from start to finish. 

## Animation

Below, we first navigate to the [Projects Explorer](../ui/projects-explorer.md) starting from [Jobs Explorer](../ui/explorer.md). We then open the first listed project, and from there we create a new Job by opening [Jobs Designer]({{ interface_url }}/jobs-designer/overview/) with the "Create" button.

<img data-gifffer="/images/jobs/create-job.gif">
