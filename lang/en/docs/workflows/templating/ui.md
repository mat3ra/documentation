# Templating: User Interface

The user interface component implementing the [Templating and Rendering](concept.md) concept for simulation input files can be found and employed by the user under the relevant section of the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/unit-editor/input-templates/) of our platform.

## Editing Unit Input

There are two ways to access the Workflow Designer Interface and edit the templating input of an individual [unit](../components/units.md).

### From Workflow Explorer

The user can edit and save the template directly inside the [workflow](../../workflows/overview.md) itself, by [opening]({{ interface_url }}/entities-general/actions/open-edit/) its entry as listed under the [Workflows Explorer Interface]({{ interface_url }}/workflows/ui/explorer/) for browsing the corresponding account-owned [collection](../../accounts/collections.md). In this case, **all** [jobs](../../jobs/overview.md) that will subsequently be created with this workflow will inherit the changes. 

### From Job Designer

Alternatively, the user can edit the template during [job creation]({{ interface_url }}/jobs-designer/overview/), under the corresponding [Workflow Tab]({{ interface_url }}/jobs-designer/workflow-tab/). In this other case, only the job being currently designed will have its input changed, but not the original entry of the workflow itself.
