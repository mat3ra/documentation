# Band Structure with Quantum ESPRESSO (HSE)

This tutorial explains how to calculate the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of crystalline silicon in its cubic-diamond crystal structure using the **HSE (Heyd–Scuseria–Ernzerhof)** [hybrid functional]({{ reference_url }}/models-directory/dft/parameters/#hybrid-functionals) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.

The instructions here complement the general [band structure tutorial](band-structure.md). Only HSE-specific aspects are covered below.


## 1. Understand the HSE workflow

A Quantum ESPRESSO [workflow]({{ reference_url }}/workflows/overview/) for computing the band structure with HSE is composed of three [subworkflow]({{ reference_url }}/workflows/components/subworkflows/) steps:

### 1.1. Preliminary SCF calculation

The first step is a standard self-consistent field (SCF) calculation of the ground-state energy eigenvalues and wave functions. This provides the [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) that is manually extracted in the next step.

### 1.2. Extract k-points

Unlike the standard [band structure calculation](band-structure.md), which proceeds via a non-self-consistent calculation, the HSE approach requires self-consistent evaluation of the Fock operator [^1] [^2] at each k-point on a commensurate grid.

The k-points generated in the SCF step are automatically extracted via a [Python script]({{ reference_url }}/software-directory/scripting/python/overview/) that uses [Regular Expressions]({{ reference_url }}/methods-directory/pseudopotential/actions/#regular-expressions) to parse the output. The resulting list is saved as a JSON file for use in the next step.

### 1.3. HSE calculation

The final step contains two units. The main HSE calculation is performed in the first unit. HSE-specific parameters are triggered by including the HSE [Refiner]({{ reference_url }}/models-directory/dft/parameters/#refiners), set under the [Subworkflow Editor]({{ interface_url }}/workflow-designer/subworkflow-editor/overview-tab/#refiners).

Key aspects of the HSE input configuration:

- **Exchange-correlation functional:** Activated via `input_dft = 'hse'` in the Quantum ESPRESSO input script.
- **q-grid for the Fock operator:** Defined via `nqx1`, `nqx2`, `nqx3`. For basic band structure calculations, a size of 1 is sufficient. For accurate band gap estimates, see the [HSE band gap tutorial](hse-qe-bg.md).
- **k-point list:** Imported from the extracted JSON rather than auto-generated.
- **k-path:** A second list of k-points defining the [path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) for the band structure dispersion curve, customizable under [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/).

!!!note "Weight of k-path points"
    The k-path points are assigned very small weights (<1e-7) so they do not interfere with the HSE electronic structure computation — they are only needed for plotting the dispersion curve. The weights are not exactly zero because Quantum ESPRESSO requires non-zero values.

The final band structure is computed via the [bands.x executable]({{ reference_url }}/software-directory/modeling/quantum-espresso/components/#executables).


## 2. Import the HSE workflow from the bank

[Workflows]({{ reference_url }}/workflows/overview/) for the HSE band structure calculation with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/overview/).

!!!warning "Computational cost"
    HSE calculations are significantly more expensive than standard [GGA-DFT]({{ reference_url }}/models-directory/dft/parameters/#subtype). More [CPU cores and/or walltime]({{ resources_url }}/infrastructure/compute/parameters/) should be allocated as appropriate.


## 3. Video walkthrough

The animation below demonstrates the creation and execution of an HSE band structure computation on silicon using Quantum ESPRESSO, concluding with the dispersion plot in the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/Q-qPX6EY9Ok" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 4. Links

[^1]: [Wikipedia Hartree-Fock method](https://en.wikipedia.org/wiki/Hartree%E2%80%93Fock_method)
[^2]: [Wikipedia Fock matrix](https://en.wikipedia.org/wiki/Fock_matrix)
