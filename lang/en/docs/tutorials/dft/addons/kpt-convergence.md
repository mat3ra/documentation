---
render_macros: true
---
# Study Convergence of the Reciprocal Space Grid

The present tutorial page explains how to run a [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/) of the size of the [grid of k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/), necessary for sampling the Brillouin Zone of the crystal structure under investigation, using [density functional theory]({{ reference_url }}/models-directory/dft/overview/). 

K-point convergence can be run either as a stand-alone [workflow]({{ reference_url }}/workflows/overview/), or prepended as a [Workflow Add-on]({{ reference_url }}/workflows/addons/overview/) to another [property calculation]({{ reference_url }}/properties/overview/).

In the present tutorial, we will study the issue of k-point convergence for the case of crystalline silicon under its equilibrium cubic-diamond crystal structure, by making use of [VASP](../../../software-directory/modeling/vasp/overview.md) as the main simulation engine. We will investigate k-point convergence in the context of a [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) calculation.

!!!note "VASP version considered in this tutorial"
    The present tutorial is written for VASP at versions 5.3.5 or 5.4.4.

## Create Job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) that is shown on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless this default was [changed]({{ interface_url }}/entities-general/actions/set-default/) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will be automatically loaded at the moment of the [opening]({{ interface_url }}/jobs/actions/create/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

## Choose workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the Total Energy through [VASP](../../../software-directory/modeling/vasp/overview.md) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

Thereafter, in order to add k-point convergence as an [Add-on]({{ reference_url }}/workflows/addons/overview/) to the total energy calculation workflow, the user should [click the appropriate button]({{ interface_url }}/workflow-designer/subworkflow-editor/actions-menu/#insert-add-ons) within the [Subworkflow Editor Interface]({{ interface_url }}/workflow-designer/subworkflow-editor/overview/) of [Workflow Designer]({{ interface_url }}/workflow-designer/overview/). The corresponding "Convergence" option should thus be chosen. The parameters contained in the resulting "Convergence" dialog should be set according to the instructions outlined [in this page]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/). For the moment, we shall just accept the default contents of such dialog, and proceed with no further modifications by clicking the bottom `Apply` button.

At the end of the insertion of the k-point convergence Add-on to the Total Energy Workflow, the user can scroll down to view the extra [units]({{ reference_url }}/workflows/components/units/) which have been added for convergence purposes, which are primarily of [Logical type]({{ reference_url }}/workflows/components/units/#unit-types). The objective of such units is to set up the parameters necessary to progressively increase [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/), and consequently check the corresponding evolution of the total energy difference throughout the study to ensure a sufficiently accurate final convergence.

## Examine Input Files

Readers can open the main [Execution Unit]({{ reference_url }}/workflows/components/units/#execution) "vasp" by clicking it. The contents of the input files used for the convergence study within the VASP calculation can in this way be inspected, towards the bottom of the [unit editor interface]({{ interface_url }}/workflow-designer/unit-editor/#unit-input-templates). 

Users should be able to notice some differences in the formatting of the KPOINTS file, compared to the more conventional cases. This file should not normally be edited, or should be edited with caution, since the text is modified to contain [templating expressions]({{ reference_url }}/workflows/templating/overview/) (eg. `{% raw %}{{PARAMETER}}{% endraw %}`) that are necessary for the workflow to function correctly.

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [Job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and inspect the [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) included therein. Silicon is a small structure, so four cores and a few minutes of calculation runtime should be sufficient.

## Examine Results

Once the Job execution is finished, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the results of the computation, including the final converged value of the total energy as well as additional information about each execution unit.

## Converged k-point Density

Finally, the user can also browse the output and input files under the [Files tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). In order to determine the k-point density at which convergence was reached, the KPOINTS file should be [downloaded and inspected]({{ interface_url }}/data-in-objectstorage/actions/download/).

### Convergence plot

The convergence plot can be retrieved upon Job completion under the "Charts" tab accessible by opening the main "vasp" Execution Unit. The relevant convergence plot is the one labelled "Ionic Energy". In order for this plot to appear among the calculation results, the "convergence_ionic" option should be selected under the ["Detailed View" tab]({{ interface_url }}/workflow-designer/subworkflow-editor/detailed-view/) of the Total Energy [Subworkflow Editor Interface]({{ interface_url }}/workflow-designer/subworkflow-editor/overview/) at the moment of initial Job designing.

An example appearance of the "Ionic Energy" energy convergence chart as a function of [k-grid size]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#kgrid) is given in the image below. In this case, after a sharp initial shift in energy, the desired convergence precision threshold has been reached for a k-grid size of 13 X 13 X 13. The threshold corresponds to the relative energy change between two subsequent steps in the k-grid size progression shown on the x-axis.

![Convergence Plot](../../../images/tutorials/kpoint-convergence-chart.png "Convergence Plot")

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a k-points convergence study using silicon and [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) workflow in the video below.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/CN4eFZ0hVwk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
