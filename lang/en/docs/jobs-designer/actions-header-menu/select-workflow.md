# Select Workflow

[Workflows]({{ reference_url }}/workflows/overview/) define the computational tasks to be executed and applied to the Material(s) [added](select-materials.md) to the Job being currently [designed](../overview.md).

After opening the drop-down menu <i class="zmdi zmdi-more-vert zmdi-hc-border"></i> on the right-hand side of the [main header menu](../header-menu.md), the `Select workflow` option should be chosen in order to add Workflows present in the [account-owned collection]({{ reference_url }}/accounts/collections/) to the Job being created. 

## "Select Workflow" Dialog

The user is now presented with the following "Select Workflow" dialog, where the available Workflows can be browsed under the [Workflows Explorer](../../workflows/ui/explorer.md) interface supporting the corresponding [filter/search](../../entities-general/actions/search.md) functionality.

![Select Workflow](../../images/jobs-designer/select-workflow-dialog.png "Select Workflow")

**Only one** Workflow at a time can be [selected](../../entities-general/actions/select.md) from this list and added to the new Job.

## Add Workflow to Job

Once the desired Workflow has been selected, it can be applied to the Job being designed through "Select Items" button <i class="zmdi zmdi-collection-plus zmdi-hc-border"></i> located in the [top-right actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar). 

This returns the view to the main Jobs Designer, where the computational units and overall flowchart of the imported Workflow can freely be inspected inside the [Workflow Tab](../workflow-tab.md), under the conventional interface of [Workflow Viewer](../../workflows/ui/viewer.md). It can be seen that the original default workflow which was included when the Jobs Designer was first opened is entirely replaced with the newly selected one.

## Animation

The following animation demonstrates how to select a phonon calculation Workflow present in the account-owned collection, and add it to the Job being currently created.

<img data-gifffer="/images/jobs-designer/add-workflow-designer.gif">
