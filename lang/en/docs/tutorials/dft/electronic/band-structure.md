# Electronic Band Structure Calculation

This tutorial page explains how to calculate the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We will be studying crystalline Silicon in the standard cubic-diamond crystal structure, and we will use [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as our simulation engine.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.

!!! Note "Accuracy of the results"
    Please note that this calculation is performed using standard [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/), and therefore an underestimation of the energy of unoccupied electronic states is expected. Further modifications to the input files and settings to correctly predict the band gap are possible, and will be explored later.

## Create Job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) that is shown on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless this default was [changed]({{ interface_url }}/entities-general/actions/set-default/) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will as such be automatically loaded at the moment of the [opening]({{ interface_url }}/jobs/actions/create/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of [materials]({{ reference_url }}/materials/overview/) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

## Set Sampling in Reciprocal Space

It is critical to have a high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) in order to resolve enough details for the band structure plot.

The band structure workflow is composed of two [units]({{ reference_url }}/workflows/components/units/). The first unit specifies the settings for the self-consistent calculation of the energy eigenvalues and wave functions.  The second unit calculation is a non self-consistent calculation using the wave functions and charge density of the previous calculation.

We set the size of the grid of k-points to 18 x 18 x 18 in the first workflow unit. This provides a dense enough k-point sampling in order to resolve the fine features present within the output of the band structure computation. The validity of this choice of k-grid size for yielding accurate results of order meV in the final energy can be verified by performing the relevant [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).

In addition, we also apply the recommended [k-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) to effectively sample the electronic states throughout the Brillouin Zone of the crystal, based on the crystal symmetry.

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and examine the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) included therein.  Silicon is a small structure, so 4 CPUs and 1 minute of calculation runtime should be sufficient.

## Examine Final Results

When both [unit]({{ reference_url }}/workflows/components/units/) computations are complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of silicon, plotted as a dispersion curve as a function of the special [k-point paths]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) chosen.

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a band structure computation on silicon using the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) simulation engine in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/x82ntcP4Vj0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
