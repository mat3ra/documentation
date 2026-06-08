# Calculate Electronic Band Gap

This tutorial explains how to calculate the [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) of crystalline silicon in its standard equilibrium cubic-diamond crystal structure, based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT). [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) is used as the main simulation engine.

!!!note "Simulation engines considered in this tutorial"
    This tutorial is designed for [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) (ver. 5.3.5 or 5.4.4), however the steps are identical for other engines such as [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) (ver. 5.4 to 6.3 and later).

## 1. Understand the band gap

The [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) is the **energy difference** between the **highest occupied electronic state** and the **lowest unoccupied state** within the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of a material.

!!!info "Direct vs indirect gaps"
    The platform extracts both **direct** and **indirect** band gaps. The difference between the two types is explained in the [band gaps reference]({{ reference_url }}/properties-directory/non-scalar/band-gaps/#direct-and-indirect-band-gaps).


## 2. Create a job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default, it is automatically loaded when the [Job Designer]({{ interface_url }}/jobs-designer/overview/) is [opened]({{ interface_url }}/jobs/actions/create/).


## 3. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the band gap can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 4. Set sampling in reciprocal space

A high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is critical for calculating the band gap with sufficient accuracy.

For [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/), the band gap workflow is composed of two [units]({{ reference_url }}/workflows/components/units/). The first unit performs a self-consistent field (SCF) calculation of the energy eigenvalues and wave functions. The second unit performs a non-self-consistent calculation using the wave functions and charge density from the first step.

The k-point grid is set to 18 × 18 × 18 in the first workflow unit. The validity of this grid size for yielding meV-level accuracy can be verified by performing a [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).


## 5. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) should be reviewed to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Silicon is a small structure, so four CPUs and one minute of calculation runtime are sufficient.


## 6. Examine the results

Once both [unit]({{ reference_url }}/workflows/components/units/) computations complete, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the simulation results, including the indirect band gap of Si (~0.6 eV).

!!!note "Silicon as indirect gap semiconductor"
    Both the direct and indirect band gaps are identified. The calculation is performed during the first, self-consistent step on the dense k-point mesh. The indirect band gap is significantly smaller than the smallest direct band gap, which is why silicon is classified as an **indirect gap semiconductor**.

### 6.1. Compare with experiment

The calculated value of ~0.6 eV for the indirect band gap is below the tabulated experimental value of ~1.1 eV. As discussed in the [DFT accuracy notes]({{ reference_url }}/models-directory/dft/notes/#accuracy-limits-of-the-generalized-gradient-approximation), this underestimation is expected when using the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/parameters/#subtype). More accurate techniques, such as Hybrid Screened Exchange (HSE), significantly improve the comparison. See the [HSE band gap tutorial](hse-vasp-bg.md) for details.


## 7. Video walkthrough

The animation below demonstrates the steps involved in the creation and execution of a band gap computation on silicon.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/G5L52T6fjeQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
