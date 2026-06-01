# Calculate Zero Point Energy

This page explains how to run a [zero point energy]({{ reference_url }}/properties-directory/scalar/zero-point-energy/) calculation based on [density functional theory]({{ reference_url }}/models-directory/dft/overview/). For the sake of this presentation, we will calculate the zero point energy for crystalline silicon in its equilibrium cubic-diamond crystal structure, making use of [VASP](../../../software-directory/modeling/vasp/overview.md) as our simulation engine.

!!!note "VASP version considered in this tutorial"
    The present tutorial is written for VASP at versions 5.3.5 or 5.4.4.

## Create Job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) that is shown on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless this default was [changed]({{ interface_url }}/entities-general/actions/set-default/) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will as such be automatically loaded at the moment of the [opening]({{ interface_url }}/jobs/actions/create/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the Zero Point Energy through [VASP](../../../software-directory/modeling/vasp/overview.md) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/). 

## Examine Input File	

 The unique [unit]({{ reference_url }}/workflows/components/units/) for this tutorial is the "vasp_zpe" unit. Clicking it will show the corresponding input files. The `IBRION = 5` flag within the INCAR file enables VASP to run the displacements for the zero point energy calculation.

## Set Sampling in Reciprocal Space

It is critical that a [well-relaxed structure]({{ reference_url }}/workflows/addons/structural-relaxation/) with [converged k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/) is used for zero point energy calculations.

The default value of sampling, set according to KPPRA of 2000, is sufficient as can be verified by performing the relevant [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/). When dealing with larger cells, setting k-grid dimensions through KPPRA should generally provide a reliable guess.

We explain how to perform both [structural relaxations](../addons/structural-relaxation.md) and [k-points convergence studies](../addons/kpt-convergence.md) in their respective tutorials.

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [Job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and inspect the [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) included therein.  Silicon is a small structure, so four CPUs and one minute of calculation runtime should be sufficient.

## Examine Results

Once the Job execution is finished, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the results of the simulation, including a card titled "Zero Point Energy" that displays the value of this [property]({{ reference_url }}/properties/overview/) for the material in question. 

The larger its value, the more critical it becomes to include the zero point energy in ab-initio thermodynamic calculations performed at zero temperature.

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a Zero Point Energy computation workflow on silicon, using the [VASP](../../../software-directory/modeling/vasp/overview.md) simulation engine, in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/SeKAKDaU-g0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
