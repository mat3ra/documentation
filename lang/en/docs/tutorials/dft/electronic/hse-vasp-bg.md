# Band Gap with VASP (HSE)

This tutorial covers the calculation of the [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) of crystalline silicon using the **HSE (Heyd–Scuseria–Ernzerhof)** [hybrid functional]({{ reference_url }}/models-directory/dft/parameters/#hybrid-functionals), as implemented in [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/). HSE provides significantly improved band gap accuracy compared to standard [DFT]({{ reference_url }}/models-directory/dft/overview/) calculations.

!!!note "VASP version"
    This tutorial applies to VASP versions 5.3.5, 5.4.4, and later.

The instructions presented here complement the general [band gap tutorial](band-gap.md). Only HSE-specific aspects are covered on this page.


## 1. Understand the HSE workflow

The VASP [workflow]({{ reference_url }}/workflows/overview/) for computing the band gap with HSE is composed of the following [subworkflow]({{ reference_url }}/workflows/components/subworkflows/) steps:

1. Standard self-consistent field (SCF) calculation of energy eigenvalues and wave functions, with the HSE [Refiner]({{ reference_url }}/models-directory/dft/parameters/#refiners) enabled under the [Subworkflow Editor]({{ interface_url }}/workflow-designer/subworkflow-editor/overview-tab/#refiners).
2. Self-consistent Hartree–Fock/HSE calculation, again with the HSE [Refiner]({{ reference_url }}/models-directory/dft/parameters/#refiners) activated.
3. Extraction of the [k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) in the symmetry-irreducible wedge of the Brillouin Zone (IBZ).
4. Final HSE band structure computation, using the wave functions and charge density from the previous steps.

Advanced instructions for HSE band structure calculations with VASP are available in Refs. [^1] and [^2].


## 2. Import the HSE workflow from the bank

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) through HSE with [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). Search for the string "D7-HSR-BS-BG-DOS" when looking for the relevant workflow.

!!!info "Workflow naming convention"
    The "D7-HSR-BS-BG-DOS" name contains the following information: "D" refers to the difficulty level (see table II in Ref. 1 cited [in this page](gw-vasp-bg.md)), "HSR" represents the method, and "BS", "BG", and "DOS" are abbreviations for band structure, band gap, and density of states respectively.

The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/overview/). The same general procedure as in the [band gap tutorial](band-gap.md) applies.

!!!warning "Computational cost"
    HSE calculations are significantly more expensive than standard [GGA-DFT]({{ reference_url }}/models-directory/dft/parameters/#subtype). More [CPU cores and/or walltime]({{ resources_url }}/infrastructure/compute/parameters/) should be allocated as appropriate.


## 3. Examine the results

Once the computation completes, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the simulation results, including the indirect band gap of silicon (~1.14 eV).

### 3.1. Compare with experiment

The calculated HSE value of ~1.14 eV is in excellent agreement with the experimental value of 1.17 eV [^3], a significant improvement over the GGA result of ~0.6 eV (see the [standard band gap tutorial](band-gap.md)). This demonstrates how hybrid functionals can yield more accurate electronic structure predictions.


## 4. Video walkthrough

The animation below demonstrates the steps involved in the creation and execution of an HSE band gap computation on silicon using VASP.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/MV-E1Q2LD_I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 5. Links

[^1]: [Hartree-Fock (HF) type and hybrid functional calculations, Official VASP Manual](https://cms.mpi.univie.ac.at/vasp/vasp/Hartree_Fock_HF_type_hybrid_functional_calculations.html)
[^2]: [Si HSE bandstructure, VASP Wiki Tutorial](https://cms.mpi.univie.ac.at/wiki/index.php/Si_HSE_bandstructure)
[^3]: [Accessible computational materials design with high fidelity and high throughput, P. Das, M. Mohammadi, and T.Bazhirov, Arxiv preprint, 2017](https://arxiv.org/pdf/1807.05623.pdf)
