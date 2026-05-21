---
render_macros: false
---
# Select Materials to Jobs

The user may select one or multiple [materials]({{ reference_url }}/materials/overview/) present in the account-owned [collection]({{ reference_url }}/accounts/collections/) during [Job creation](../overview.md). Within the [header menu](../header-menu.md) of Jobs Designer, the relevant button <i class="zmdi zmdi-more-vert zmdi-hc-border"></i> on the right-hand side should be clicked, and the `Select materials` option chosen from the resulting drop-down menu.

## "Select Materials" Dialog

As a result, the "Select Materials" dialog exhibited in the image below is opened.

![Select Materials](../../images/jobs-designer/select-materials-dialog.png "Select Materials")

Here, the user can [select](../../entities-general/actions/select.md) one or multiple entries from the resulting list of materials, which is displayed in an [Explorer-type Interface](../../entities-general/ui/explorer.md). 

## Search for Materials

 [search](../../entities-general/actions/search.md) and [advanced search](../../materials/actions/advanced-search.md) can be performed in exactly the same manner as explained in [Materials Explorer](../../materials/ui/explorer.md).

## Select Materials

Once the desired material(s) have been selected, they can be selected for the Job through the "Select Items" button <i class="zmdi zmdi-collection-plus zmdi-hc-border"></i> located under the [top-right actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar). 

This returns the view to the main Jobs Designer page, where the structures of the imported materials can be inspected within the [Materials Tab](../materials-tab.md). It is worth noticing that the original default material which was present when the Jobs Designer was first opened is replaced with the newly selected material(s). 

When multiple materials are selected the [Job Name Field](../header-menu.md#1-job-name) can have a `{{ FORMULA }}` text added to it indicating that one separate job will be created per each selected material appending its formula to the name as explained [here](../header-menu.md#4-save-job).

## Animation

In the example animation below, we demonstrate how to select and import a series of III-V Semiconductors to the Job being currently designed. We then cycle through them under the [Materials Viewer](../materials-tab.md) with the help of the pager, in order to review their respective crystal structures.

<img data-gifffer="/images/jobs-designer/add-materials-designer.gif">
