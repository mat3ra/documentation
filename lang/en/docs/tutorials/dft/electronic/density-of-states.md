# Calculate Electronic Density of States

This tutorial page explains how to calculate the [electronic density of states]({{ reference_url }}/properties-directory/non-scalar/electronic-dos/) using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We study crystalline silicon in its standard equilibrium cubic-diamond crystal structure, and use [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) as our main simulation engine during the present tutorial.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.

!!!warning "Accuracy of the results"
    Please note that this calculation is performed using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) and the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/parameters/#subtype), which is known to under-estimate the energy of unoccupied electronic states.

## Create job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) that is shown on [new job creation](../../../jobs-designer/overview.md), unless this default was [changed](../../../entities-general/actions/set-default.md) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will as such be automatically loaded at the moment of the [opening](../../../jobs/actions/create.md) of [Job Designer](../../../jobs-designer/overview.md).

## Choose Workflow

The Density of States in typically calculated in conjunction with the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of the material under investigation, whose computation is the object of a [separate tutorial](band-structure.md). 

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the band structure together with the Density of States through [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) can readily be [imported](../../../workflows/actions/copy-bank.md) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected](../../../jobs-designer/actions-header-menu/select-workflow.md) and added to the [Job being created](../../../jobs-designer/workflow-tab.md).

## Set Sampling in Reciprocal Space

It is critical to have a high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) in order to calculate the density of states with sufficient accuracy. The method for treating [partial electronic occupancies]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/electronic-occupations/) is also important in establishing the quality of the computation: the **tetrahedron method**, for example, is more precise for Density of States calculations.

In [Quantum Espresso](../../../software-directory/modeling/quantum-espresso/overview.md), the band structure + Density of States [workflow]({{ reference_url }}/workflows/overview/) has five [units]({{ reference_url }}/workflows/components/units/) in total.  The first unit specifies the settings for the self-consistent calculation of the eigenvalues and wave functions.  The second unit calculation is a non self-consitent calculation using the wave functions and charge density of the previous calculation. Subsequent units calculate the density of states, and also the projection of those states for partial density of states analysis.

We set the size of the grid of k-points to 18 x 18 x 18 in the first workflow unit. This provides a dense enough k-point sampling in order to resolve the fine features present within the output of the Density of States computation. The validity of this choice of k-grid size for yielding accurate results of order meV in the final energy can be verified by performing the relevant [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).

## Submit job

Before [submitting](../../../jobs/actions/run.md) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab](../../../jobs-designer/compute-tab.md) of [Job Designer](../../../jobs-designer/overview.md) and examine the [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) included therein.  Silicon is a small structure, so four CPUs and one minute of calculation runtime should be sufficient.

## Examine results

When all five [unit]({{ reference_url }}/workflows/components/units/) computations are complete at the end of Job execution, switching to the [Results tab](../../../jobs/ui/results-tab.md) of [Job Viewer](../../../jobs/ui/viewer.md) will show the density of states for the silicon sample under investigation, together with the partial density of states due to each atom in the structure as well as their s and p electron-like character. Moving the mouse cursor along each data series will highlight the atom's electronic character that the data series corresponds to.

!!!note "Partial contributions"
    The numbers represent the order of the current orbital as included inside the pseudopotential, and **not** the principal quantum number.
    
## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a Density of States computation on silicon using the [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) simulation engine in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/WqltKbsPlqU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
