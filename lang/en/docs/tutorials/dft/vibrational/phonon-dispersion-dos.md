# Phonon Dispersions and Density of States Calculation

This tutorial page explains how to calculate the [Phonon Dispersion Curves]({{ reference_url }}/properties-directory/non-scalar/phonon-dispersions/) and [Phonon Density of States]({{ reference_url }}/properties-directory/non-scalar/phonon-dos/) of materials based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We will be studying crystalline Silicon in the standard cubic-diamond crystal structure, and we will use [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as our simulation engine.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.

## Create Job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) that is shown on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless this default was [changed]({{ interface_url }}/entities-general/actions/set-default/) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will as such be automatically loaded at the moment of the [opening]({{ interface_url }}/jobs/actions/create/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [Phonon Dispersion Curves]({{ reference_url }}/properties-directory/non-scalar/phonon-dispersions/) and [Density of States]({{ reference_url }}/properties-directory/non-scalar/phonon-dos/) of [materials]({{ reference_url }}/materials/overview/) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

## Set Sampling in Reciprocal Space

It is critical to have a high [q-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#other-types-of-reciprocal-space-grids) in order to resolve enough details for the phonon dispersion plot.

The Phonon calculation workflow based on Quantum ESPRESSO is composed of multiple [units]({{ reference_url }}/workflows/components/units/). The first unit specifies the settings for the self-consistent calculation of the energy eigenvalues and wave functions. The subsequent units are narrated in detail in the theoretical explanation contained in Ref. [^1] of [this page]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/).

We set the size of the [grid of q-points (q-grid)]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#other-types-of-reciprocal-space-grids) to 3 x 3 x 3 under the [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) of [Workflow Designer]({{ interface_url }}/workflow-designer/overview/). This provides a dense enough q-point sampling in order to resolve the fine features present within the output of the phonon dispersion computation. In order to make the q- and k-point grids commensurate and make the phonon calculation less computationally demanding, we also reduce the size of the grid of electronic k-points from its original default value to 6 x 6 x 6.

In addition, the associated "interpolated" grid or [i-grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#other-types-of-reciprocal-space-grids) necessary for performing the transformation to and from the reciprocal and real space, and subsequent interpolation, should be set to 18 x 18 x 18.

Finally, we also apply the recommended [q-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) to effectively sample the vibrational states throughout the Brillouin Zone of the crystal, based on the crystal symmetry.

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and examine the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) included therein. 

Phonon calculations are quite computationally expensive and therefore, despite Silicon being a small structure, with the aforementioned settings for the sampling grids the user should account for at least 45 minutes of calculation runtime executed on 16 compute cores for example.

## Examine Final Results

When all [unit]({{ reference_url }}/workflows/components/units/) computations are complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the [phonon lattice vibrations]({{ reference_url }}/properties-directory/non-scalar/phonon-dispersions/) of silicon, plotted as a dispersion curve on the [q-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) chosen in the preceding steps.

The plot for the [Phonon Density of States]({{ reference_url }}/properties-directory/non-scalar/phonon-dos/) can also be retrieved in the [Results tab]({{ interface_url }}/jobs/ui/results-tab/), directly above the dispersion curve. 

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a phonon lattice vibration calculation for silicon, using the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) simulation engine, in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/41uropwrb0k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
