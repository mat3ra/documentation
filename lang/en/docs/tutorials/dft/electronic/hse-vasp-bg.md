# Band Gap with VASP (HSE)

We discuss in the present tutorial those aspects of the calculation of [electronic structure properties](overview.md) which are specific to the implementation of the **HSE (Heyd-Scuseria-Ernzerhof)** [exchange-correlation functional]({{ reference_url }}/models-directory/dft/parameters/#functional), a special class of [Hybrid Functionals]({{ reference_url }}/models-directory/dft/parameters/#hybrid-functionals).

## Band Gap Calculations

Here, we will explain how to compute the [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) of crystalline silicon using the [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) modeling engine. The increased [precision]({{ reference_url }}/methods/precision/) of Hybdrid Functionals in predicting [material properties]({{ reference_url }}/properties/overview/) of interest such as band gaps will hence be demonstrated. 

!!!note "VASP version considered in this tutorial"
    The present tutorial is written for VASP at versions 5.3.5 or 5.4.4.
 
The instructions presented herein complement the general discussion introduced in a [separate tutorial](band-gap.md). The reader is referred to this latter page for an outline of the general procedure for band-gap computations using DFT, whereas only HSE-specific aspects will be reviewed throughout the remainder of the present page.

## Workflow for HSE Calculation with VASP

Advanced instructions on how to perform an HSE band structure calculation using [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) can be retrieved under Refs. [^1],[^2]. 

For the sake of this brief introduction, it suffices to know that a VASP [Workflow]({{ reference_url }}/workflows/overview/) to compute the band-gap of semiconducting materials using HSE is composed of the following [subworkflow]({{ reference_url }}/workflows/components/subworkflows/) steps.

1. Standard self-consistent field (scf) calculation of the energy eigenvalues and wave functions, which includes the HSE [Refiner]({{ reference_url }}/models-directory/dft/parameters/#refiners) as set under the [Subworkflow Editor Interface]({{ interface_url }}/workflow-designer/subworkflow-editor/overview-tab/#refiners).

2. Self-consistent Hartree-Fock/HSE calculation, again with the HSE [Refiner]({{ reference_url }}/models-directory/dft/parameters/#refiners) activated.

3. Extraction of the [k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) in the Symmetry-irreducible wedge of the Brillouin Zone (IBZ) in [reciprocal space]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/).

4. Final HSE band structure computation, using the wave functions and charge density calculated in the previous steps.

## Copy HSE Workflow from Bank

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) through HSE, as implemented under [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/), can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The user should [search]({{ interface_url }}/entities-general/actions/search/) for the string "D7-HSR-BS-BG-DOS" under the Workflows Bank dialog when looking for the relevant HSE-based band-gap workflow.

!!!info "Workflow naming convention"
    The "D7-HSR-BS-BG-DOS" name for the HSE workflow contains the following information: "D" refers to the difficulty level (see table II in Ref. 1 cited [in this page](gw-vasp-bg.md)), "HSR" represents the method, and "BS", "BG" and "DOS" are abbreviations for band structure, band gap, and density of states respectively. 

This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/overview/). The same procedure as in the [general band-gap computation tutorial](band-gap.md) can otherwise be followed.

!!!warning "Computational Cost"
    The computational cost of HSE calculations is significantly higher than for more basic methods in [DFT]({{ reference_url }}/models-directory/dft/overview/) such as the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/parameters/#subtype). We thus recommend to allow for more [CPU cores and/or walltime]({{ resources_url }}/infrastructure/compute/parameters/) as appropriate for the system under investigation.

## Examine results

When the computation is complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the results of the simulation, including the indirect band gap found for silicon of around 1.14 eV.

### Comparison with Experimental Value

The calculated value of 1.14 eV for the indirect band gap of silicon is in much better agreement with the experimental value for this material (1.17 eV [^3]) than the alternative case of the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/notes/#accuracy-limits-of-the-generalized-gradient-approximation) (GGA), whose shortcomings are assessed in the [other tutorial page](band-gap.md). 

This provides an example of how HSE can result in improved precision in the estimation of important material properties than more traditional approaches within [DFT]({{ reference_url }}/models-directory/dft/overview/).

## Animation

We demonstrate the steps involved in the creation and execution of a HSE Band Gap computation workflow on silicon, using the [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) simulation engine, in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/MV-E1Q2LD_I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Hartree-Fock (HF) type and hybrid functional calculations, Official VASP Manual](https://cms.mpi.univie.ac.at/vasp/vasp/Hartree_Fock_HF_type_hybrid_functional_calculations.html)
[^2]: [Si HSE bandstructure, VASP Wiki Tutorial](https://cms.mpi.univie.ac.at/wiki/index.php/Si_HSE_bandstructure)
[^3]: [Accessible computational materials design with high fidelity and high throughput, P. Das, M. Mohammadi, and T.Bazhirov, Arxiv preprint, 2017](https://arxiv.org/pdf/1807.05623.pdf)
