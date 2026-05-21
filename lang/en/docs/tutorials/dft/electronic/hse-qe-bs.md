# Band Structure with Quantum ESPRESSO (HSE)

This tutorial page explains how to calculate the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We will be studying crystalline Silicon in the standard cubic-diamond crystal structure, and we will use [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) as our simulation engine.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.

We discuss in the present tutorial those aspects of the band structure calculation which are specific to the implementation of the **HSE (Heyd-Scuseria-Ernzerhof)** [exchange-correlation functional]({{ reference_url }}/models-directory/dft/parameters/#functional), a special class of [Hybrid Functionals]({{ reference_url }}/models-directory/dft/parameters/#hybrid-functionals).
 
The instructions presented herein complement the general discussion introduced in a [separate tutorial](band-structure.md). The reader is referred to this latter page for an outline of the general procedure for band structure computations using DFT as performed on our platform, whereas only HSE-specific aspects will be reviewed throughout the remainder of the present page.

## Workflow for HSE Calculation with Quantum ESPRESSO

A Quantum ESPRESSO [Workflow]({{ reference_url }}/workflows/overview/) to compute the band structure of [materials]({{ reference_url }}/materials/overview/) using HSE is composed of the following [subworkflow]({{ reference_url }}/workflows/components/subworkflows/) steps.

### 1. Preliminary SCF Calculation

The first subworkflow step involves a standard self-consistent field (scf) calculation of the ground-state energy eigenvalues and wave functions. This is necessary for defining the [grid of k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/), which will later be extracted manually in the subsequent step.

### 2. Manual Extraction of k-points

The traditional approach for computing the band structure in Quantum ESPRESSO, outlined in [this separate tutorial](band-structure.md), would have proceeded via a non self-consistent calculation using the wave functions and charge density of the previous scf calculation. However, within the HSE approach towards achieving the same objective, in order to get the Fock operator [^1] [^2] at a certain k-point, one requires the wavefunctions on a grid that is commensurate with it, and this can only be done self-consistently.

A way around this problem is to manually extract the k-points generated automatically in the preceding step, together with their respective weights, and insert them individually as an explicit list inside the input script for the final HSE calculation described next. 

The procedure to manually extract the k-points from the output of the previous scf calculation is performed automatically in the present subworkflow step via a [Python script](../../../software-directory/scripting/python/overview.md). This script extracts the list of k-points with their corresponding weights within the list under consideration, with the help of [Regular Expressions]({{ reference_url }}/methods-directory/pseudopotential/actions/#regular-expressions) (commonly referred to as "regex"). The resulting output is finally printed out as a JSON file.

### 3. HSE Calculation

The final subworkflow step in the HSE band structure computation workflow is composed of two units. The main HSE calculation is performed in the first one of these units. Apart from the specific elements described in what follows, the remainder of the main HSE input script conforms to the general standard conventions of an scf ground-state total energy calculation performed with Quantum ESPRESSO via its ["pw_scf" flavor](../../../software-directory/modeling/quantum-espresso/components.md#flavors), as implemented on our platform. The HSE-specific aspects and parameters of the scf calculation described below can be triggered by including the HSE [Refiner]({{ reference_url }}/models-directory/dft/parameters/#refiners), as set under the [Subworkflow Editor Interface](../../../workflow-designer/subworkflow-editor/overview-tab.md#refiners).

#### Selecting the HSE Exchange-correlation Functional

The HSE method is activated via the addition of the `input_dft = 'hse'` input parameter within the main Quantum ESPRESSO input script, for explicitly selecting the HSE Exchange-correlation functional.
 
#### Defining the q-sampling of the Fock Operator
 
A second set of important input parameters in the context of HSE consists in the "nqx1, nqx2, nqx3" keywords. These parameters define the three-dimensional mesh for the q (k1-k2) sampling of the Fock operator. For basic bandstructure calculations such as those being considered in the present tutorial, these three mesh parameters can all be left to a size of one. However for an accurate estimate of the size of the band gap, such as narrated in a [separate tutorial](hse-qe-bg.md), a higher value for this q-mesh size should be considered and tested, which drastically improves the precision of the band structure computation at the price of a significantly higher computational cost. 

#### Inserting the List of k-points

Another aspect of the main HSE calculation unit worth noticing is how the grid of special [k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is not generated automatically, as customarily done in ground state scf computations, but rather is defined manually in crystal coordinates by importing the list of k-points extracted in the preceding subworkflow.
 
#### Specifying the k-path

In addition to this list of k-points for sampling the Brillouin Zone of the crystal over a regular grid, a second list of k-points needs to be provided and inserted manually at the bottom of the Quantum ESPRESSO input script, consisting in the [path of k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) to be followed across the Brillouin Zone for plotting the final band structure dispersion curves. This k-path can be customized by the user under the ["Important Settings" tab](../../../workflow-designer/subworkflow-editor/important-settings.md) of the [Subworkflow Editor interface](../../../workflow-designer/subworkflow-editor/overview.md). 

!!!note "Weight of the k-path points"
    It should be noticed that the reciprocal coordinates of these k-points along the path under consideration are inserted with a **very small weight**  (less than 1e-7), as opposed to the k-grid points which are instead entered with their normal weights. This is done to ensure that the k-path points do not interfere with the HSE electronic structure computation itself, since they are only needed for defining and plotting the final band structure dispersion curve. Such weights are not set to exactly zero in order for them to be applied correctly by Quantum ESPRESSO.

#### Calculating the Final Band Structure

The final band structure calculation based upon the results of the preceding steps is performed through the customary ["bands.x" executable](../../../software-directory/modeling/quantum-espresso/components.md#executables), a component of the Quantum ESPRESSO package distribution.

## Copy HSE Workflow from Bank

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of [materials]({{ reference_url }}/materials/overview/) with [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) via the HSE approach being presently described can readily be [imported](../../../workflows/actions/copy-bank.md) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). 

This workflow can later be [selected](../../../jobs-designer/actions-header-menu/select-workflow.md) and added to the [Job being created](../../../jobs-designer/overview.md). The same procedure as in the [general band-structure computation tutorial](band-structure.md) based on Quantum ESPRESSO can otherwise be followed.

!!!warning "Computational Cost"
    The computational cost of HSE calculations is significantly higher than for more basic methods in [DFT]({{ reference_url }}/models-directory/dft/overview/) such as the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/parameters/#subtype). We thus recommend to allow for more [CPU cores and/or walltime]({{ dev_url }}/infrastructure/compute/parameters/) as appropriate for the material system under investigation.

## Animation

We demonstrate the steps involved in the creation and execution of a HSE Band Structure computation workflow on silicon, using the [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) simulation engine, in the following animation. We conclude by inspecting the final band structure dispersion plot under the ["Results" Tab](../../../jobs/ui/results-tab.md) of [Job Viewer](../../../jobs/ui/viewer.md).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/Q-qPX6EY9Ok" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Wikipedia Hartree-Fock method, Website](https://en.wikipedia.org/wiki/Hartree%E2%80%93Fock_method)

[^2]: [Wikipedia Fock matrix, Website](https://en.wikipedia.org/wiki/Fock_matrix)
