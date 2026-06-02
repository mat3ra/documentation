# Electronic Band Structure Calculation

This tutorial explains how to calculate the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of crystalline silicon in the standard cubic-diamond crystal structure, based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT). [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) is used as the simulation engine.

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.

!!!warning "Accuracy of the results"
    This calculation uses standard DFT, which is known to underestimate the energy of unoccupied electronic states. More accurate methods such as [HSE](hse-qe-bs.md) and [GW](gw-qe-bs-fullfreq.md) are covered in separate tutorials.


## 1. Create a job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default, it is automatically loaded when the [Job Designer]({{ interface_url }}/jobs-designer/overview/) is [opened]({{ interface_url }}/jobs/actions/create/).


## 2. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 3. Set sampling in reciprocal space

A high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is critical for resolving the fine features of the band structure plot.

The band structure workflow is composed of two [units]({{ reference_url }}/workflows/components/units/). The first unit performs a self-consistent field (SCF) calculation of the energy eigenvalues and wave functions. The second unit performs a non-self-consistent calculation using the wave functions and charge density from the first step.

The k-point grid is set to 18 × 18 × 18 in the first workflow unit. This provides dense enough sampling to resolve the features in the band structure output. The validity of this grid size for yielding meV-level accuracy can be verified by performing a [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).

In addition, the recommended [k-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) is applied to sample the electronic states throughout the Brillouin Zone, based on the crystal symmetry.


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) should be reviewed to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Silicon is a small structure, so 4 CPUs and 1 minute of calculation runtime are sufficient.


## 5. Examine the results

Once both [unit]({{ reference_url }}/workflows/components/units/) computations complete, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of silicon, plotted as a dispersion curve along the selected [k-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/).


## 6. Video walkthrough

The animation below demonstrates the steps involved in the creation and execution of a band structure computation on silicon using Quantum ESPRESSO.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/x82ntcP4Vj0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
