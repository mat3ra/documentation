# Calculate Electronic Density of States

This tutorial explains how to calculate the [electronic density of states]({{ reference_url }}/properties-directory/non-scalar/electronic-dos/) (DOS) of crystalline silicon in its standard equilibrium cubic-diamond crystal structure, based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT). [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) is used as the simulation engine.

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.

!!!warning "Accuracy of the results"
    This calculation uses DFT with the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/parameters/#subtype), which is known to underestimate the energy of unoccupied electronic states.


## 1. Create a job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default, it is automatically loaded when the [Job Designer]({{ interface_url }}/jobs-designer/overview/) is [opened]({{ interface_url }}/jobs/actions/create/).


## 2. Select the workflow

The DOS is typically calculated together with the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/), whose computation is covered in a [separate tutorial](band-structure.md).

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the band structure together with the DOS through [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 3. Set sampling in reciprocal space

A high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is critical for calculating the DOS with sufficient accuracy. The method for treating [partial electronic occupancies]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/electronic-occupations/) also affects the quality of the computation — the **tetrahedron method**, for example, is more precise for DOS calculations.

In [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/), the band structure + DOS [workflow]({{ reference_url }}/workflows/overview/) has five [units]({{ reference_url }}/workflows/components/units/) in total. The first unit performs a self-consistent field (SCF) calculation of the eigenvalues and wave functions. The second unit performs a non-self-consistent calculation using the wave functions and charge density from the first step. Subsequent units calculate the total DOS and partial DOS (projected onto individual atoms and orbital characters).

The k-point grid is set to 18 × 18 × 18 in the first workflow unit. This provides dense enough sampling to resolve the fine features of the DOS. The validity of this grid size for yielding meV-level accuracy can be verified by performing a [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) should be reviewed to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Silicon is a small structure, so four CPUs and one minute of calculation runtime are sufficient.


## 5. Examine the results

Once all five [unit]({{ reference_url }}/workflows/components/units/) computations complete, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the DOS for the silicon sample, together with the partial DOS due to each atom and their s- and p-electron-like character. Moving the mouse cursor along each data series highlights the atom and orbital character that the series corresponds to.

!!!note "Partial contributions"
    The numbers in the partial DOS legend represent the order of the current orbital as included inside the pseudopotential, **not** the principal quantum number.


## 6. Video walkthrough

The animation below demonstrates the steps involved in the creation and execution of a DOS computation on silicon using Quantum ESPRESSO.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/WqltKbsPlqU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
