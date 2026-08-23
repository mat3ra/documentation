---
render_macros: true
---
# Reciprocal Space Grid Convergence Study

This tutorial explains how to run a [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/) of the [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) size using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT).

K-point convergence can be run either as a stand-alone [workflow]({{ reference_url }}/workflows/overview/) or prepended as a [Workflow Add-on]({{ reference_url }}/workflows/addons/overview/) to another [property calculation]({{ reference_url }}/properties/overview/).

The example system is crystalline silicon in its cubic-diamond crystal structure, using [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) as the simulation engine in the context of a [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) calculation.

!!!note "VASP version"
    This tutorial applies to VASP versions 5.3.5, 5.4.4, and later.


## 1. Create the job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation.


## 2. Select the workflow and add the convergence add-on

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the Total Energy through [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

In order to add k-point convergence as an [Add-on]({{ reference_url }}/workflows/addons/overview/), [click the appropriate button]({{ interface_url }}/workflow-designer/subworkflow-editor/actions-menu/#insert-add-ons) within the [Subworkflow Editor]({{ interface_url }}/workflow-designer/subworkflow-editor/overview/) and select "Convergence". The parameters in the resulting dialog can be set according to the instructions in [this page]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/). Accepting the default settings and clicking **Apply** is sufficient for this tutorial.

After insertion, scrolling down reveals the extra [units]({{ reference_url }}/workflows/components/units/) added for convergence purposes, primarily of [Logical type]({{ reference_url }}/workflows/components/units/#unit-types). These units progressively increase [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) and check the total energy difference at each step.


## 3. Examine the input files

The main [Execution Unit]({{ reference_url }}/workflows/components/units/#execution) "vasp" can be opened by clicking it. The input files are visible towards the bottom of the [unit editor]({{ interface_url }}/workflow-designer/unit-editor/#unit-input-templates).

!!!warning "Templating in KPOINTS"
    The KPOINTS file contains [templating expressions]({{ reference_url }}/workflows/templating/overview/) (e.g. {% raw %}`{{PARAMETER}}`{% endraw %}) required for workflow operation. This file should not be edited, or edited with caution.


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Silicon is a small structure, so 4 CPUs and a few minutes of runtime are sufficient.


## 5. Examine the results

Once the job completes, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the final converged total energy and additional information about each execution unit.


## 6. Determine the converged k-point density

The output and input files are available under the [Files tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). The KPOINTS file can be [downloaded and inspected]({{ interface_url }}/data-in-objectstorage/actions/download/) to determine the k-point density at which convergence was reached.

### 6.1. View the convergence plot

The convergence plot is available under the "Charts" tab of the main "vasp" Execution Unit. The relevant plot is labelled "Ionic Energy". For this plot to appear, the "convergence_ionic" option must be selected under the [Detailed View tab]({{ interface_url }}/workflow-designer/subworkflow-editor/detailed-view/) of the Total Energy [Subworkflow Editor]({{ interface_url }}/workflow-designer/subworkflow-editor/overview/) at job design time.

An example convergence chart is shown below. After a sharp initial shift in energy, the desired convergence precision threshold is reached at a k-grid of 13 × 13 × 13.

![Convergence Plot](../../../images/tutorials/kpoint-convergence-chart.png "Convergence Plot")


## 7. Video walkthrough

The animation below demonstrates the creation and execution of a k-point convergence study using silicon and a [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) workflow.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/CN4eFZ0hVwk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
