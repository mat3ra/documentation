# What is Jobs Designer?

Our platform provides a convenient interface for conceiving, editing and executing simulation [Jobs]({{ reference_url }}/jobs/overview/) We refer to this interface as the Jobs Designer, and we reviewed it in detail in this section of documentation.

## Navigating to Jobs Designer

### [From project page](../jobs/ui/project-page.md)

The Jobs Designer interface can be opened by [creating a new Job](../jobs/actions/create.md), starting from the [Project Page](../jobs/ui/project-page.md) for the project under which the user wishes to save the new Job. 

### [From left-hand sidebar](../ui/left-sidebar.md)

Alternatively, it can be opened directly from the [left-hand sidebar menu](../ui/left-sidebar.md). In this case the new job will be associated with the [default project]({{ reference_url }}/jobs/projects/#default-project). One may review [this page](../entities-general/actions/set-default.md) for instructions on how this default choice can be changed in the [Project Explorer](../jobs/ui/projects-explorer.md).

### [Open jobs in "pre-submission" status](../jobs/ui/explorer.md)

Any entry listed in [Jobs Explorer](../jobs/ui/explorer.md) which has a "Pre-submission" [status]({{ reference_url }}/jobs/status/) can be [opened](../entities-general/actions/open-edit.md) in Designer. This is because jobs not submitted for computation yet can be fully modified by the user (thus no limitations on edits such as those imposed by the [Viewer](../jobs/ui/viewer.md#no-adjustments-allowed)).

## Components of the Interface

The creation of new simulation Jobs via Designer proceeds through three main steps, namely the definition of the [Materials]({{ reference_url }}/materials/overview/) to be investigated (1), the type of simulation [Workflow]({{ reference_url }}/workflows/overview/) to be applied upon them (2), and finally of the [computational resources]({{ dev_url }}/infrastructure/resource/overview/) to be allocated for these calculations (3). 

These three steps are each formulated under the corresponding [tab](../ui/specific/tabs-navigator.md), as highlighted in the picture below. This image also shows the location of the [header menu](header-menu.md) located at the top of the page. 

Click on each component panel within the image to access the corresponding documentation section, or alternatively refer to the links listed towards the end of the present page.

<img src="/images/jobs-designer/jobs-designer.png" usemap="#mapname">

<map name="mapname">
    <area shape="rect" coords="0,41,753,116" href="/jobs-designer/header-menu/">
    <area shape="rect" coords="0,116,233,155" href="/jobs-designer/materials-tab/">
    <area shape="rect" coords="233,116,508,155" href="/jobs-designer/workflow-tab/">
    <area shape="rect" coords="508,116,753,155" href="/jobs-designer/compute-tab">
</map>

## [Header Menu](header-menu.md)

The components of the header menu are reviewed in [this part of the documentation](header-menu.md).

## [Materials Tab](materials-tab.md)

The explanation for the Materials Tab is offered [in this page](materials-tab.md). 

## [Workflow Tab](workflow-tab.md)

The Workflow tab is the object of a separate discussion, which can be found [here](workflow-tab.md).

## [Compute Tab](compute-tab.md)

The Compute tab is documented [in this section](compute-tab.md).
