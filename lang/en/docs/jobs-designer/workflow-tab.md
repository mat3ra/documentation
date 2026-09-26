# Workflow Tab

Navigating to the Workflow Tab in [Jobs Designer](overview.md) displays the [Workflow]({{ reference_url }}/workflows/overview/) for the [Job]({{ reference_url }}/jobs/overview/) being created. The interface is equivalent to that of the [Workflows Designer](../workflow-designer/overview.md), except for a limited set of non-adjustable parameters outlined in what follows.

![Workflow Tab](../images/jobs-designer/workflow-tab.png "Workflow Tab")

## Non-Adjustable Settings

Some Workflow parameters can be edited under Jobs Designer, except for those pertaining to the ["Application"]({{ reference_url }}/software/components/), ["Model"]({{ reference_url }}/models/overview/) and ["Method"]({{ reference_url }}/methods/overview/) being employed as part of the computation. 
 
These non-adjustable settings are present both under the ["Overview Tab"](../workflow-designer/subworkflow-editor/overview-tab.md) of Workflow Designer, and inside the editor of the [subworkflow units](../workflow-designer/unit-editor.md). Hovering the mouse over such settings makes it clear that the editing action is forbidden in these cases, as illustrated below.
 
 ![Forbidden Workflow Actions](../images/jobs-designer/forbidden-workflow-actions.png "Forbidden Workflow Actions")

## Workflow Settings for Multiple Materials

The same Workflow settings are attributed simultaneously to all Materials [added](actions-header-menu/select-materials.md) to Jobs Designer, regardless of which Material is currently open for inspection under the [corresponding Tab](materials-tab.md).

## Modify Units Input

### Single Material 

If only one [Material]({{ reference_url }}/materials/overview/) is present in Jobs Designer, the input parameters for each [computational unit]({{ reference_url }}/workflows/components/units/) contained in the Workflow can be edited within the [Preview Section of the unit input editor](../workflow-designer/unit-editor/input-templates.md#preview-of-the-input-file).

### Multiple Materials

If alternatively multiple [Materials]({{ reference_url }}/materials/overview/) have been added, then the use of templating logic is recommended for changing the input file parameters simultaneously for all entries. This action should be performed from the [Workflow Designer](../workflow-designer/overview.md) itself, instead of Jobs Designer. We explain the use of templating logic for rendering simulation input files [in this page]({{ reference_url }}/workflows/templating/overview/).

### See Preview for Each Material

In the animation below, we show how to cycle through the input file previews for a series of materials added to the Job Designer. Each entry can be selected in turn by clicking its corresponding radio button from the list on the right.

<img data-gifffer="/images/jobs-designer/unit-inputs-designer.gif">
