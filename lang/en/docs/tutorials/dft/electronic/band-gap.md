# Calculate Electronic Band Gap

This tutorial page explains how to calculate an [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We consider crystalline silicon in its standard equilibrium cubic-diamond crystal structure, and use [VASP](../../../software-directory/modeling/vasp/overview.md) as our main simulation engine during this tutorial.

!!!note simulation engines considered in this tutorial"
    The present tutorial is originally designed for [VASP](../../../software-directory/modeling/vasp/overview.md) (ver. 5.3.5 or 5.4.4), however, the steps demonstrated below are identical for other similar software, such as [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) (ver. 5.4 to 6.3), for example.

## Definitions

### Band Gap

The [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) defines the **energy difference** between the **highest occupied electronic state** and the **lowest unoccupied state** within the [electronic band-structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of the material under investigation. 

!!!info "Direct vs Indirect Gaps"
    We support the extraction of both the **direct** and **indirect** band gaps. The difference between the two types is explained [in this page]({{ reference_url }}/properties-directory/non-scalar/band-gaps/#direct-and-indirect-band-gaps).

## Create job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) that is shown on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless this default was [changed]({{ interface_url }}/entities-general/actions/set-default/) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will as such be automatically loaded at the moment of the [opening]({{ interface_url }}/jobs/actions/create/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the band gap can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

## Set Sampling in Reciprocal Space

It is critical to have a high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) in order to calculate the band gap with sufficient accuracy.

For the case of [VASP](../../../software-directory/modeling/vasp/overview.md), the band gap workflow is composed of two [units]({{ reference_url }}/workflows/components/units/). The first unit specifies the settings for the self-consistent calculation of the energy eigenvalues and wave functions.  The second unit calculation is a non self-consistent calculation using the wave functions and charge density of the previous calculation.

We set the size of the grid of k-points to 18 x 18 x 18 in the first workflow unit. The validity of this choice of k-grid size for yielding accurate results of order meV in the final energy can be verified by performing the relevant [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and inspect the [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) included therein.  Silicon is a small structure, so four CPUs and one minute of calculation runtime should be sufficient.

## Examine results

When both [unit]({{ reference_url }}/workflows/components/units/) computations are complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the results of the simulation, including the indirect band gap found for Si (~0.6 eV).

!!!note "Silicon as Indirect Gap Semiconductor"
    The user will notice that we identify both the direct band gap and the indirect band gap. This calculation is done during the first, self-consistent step of the calculation on the dense k-point mesh. It can be deduced that the indirect band gap is significantly smaller than the smallest direct band gap, which is the reason why silicon is classed as an **indirect gap semiconductor**. 

### Comparison with Experimental Value

The calculated value of ~0.6 eV for the indirect band gap is significantly below the tabulated experimental value for the band gap of Silicon of ~1.1 eV, however as discussed [elsewhere]({{ reference_url }}/models-directory/dft/notes/#accuracy-limits-of-the-generalized-gradient-approximation) this underestimation is expected given our adoption of the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/parameters/#subtype). The use of more accurate techniques, such as Hybrid Screened Exchange (HSE), for example, allows to significantly improve the comparison. See the [corresponding tutorial](hse-vasp-bg.md) for more details.

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a Band Gap computation workflow on silicon using the  simulation engine in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/G5L52T6fjeQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

