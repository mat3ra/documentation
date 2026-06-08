# Band Gap and Density of States with Quantum ESPRESSO (HSE)

This tutorial explains how to calculate the [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) and [Density of States]({{ reference_url }}/properties-directory/non-scalar/electronic-dos/) (DOS) of crystalline silicon in its cubic-diamond crystal structure using the **HSE (Heyd–Scuseria–Ernzerhof)** [hybrid functional]({{ reference_url }}/models-directory/dft/parameters/#hybrid-functionals) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.

The instructions here complement the general [band gap tutorial](band-gap.md) and the [HSE band structure tutorial](hse-qe-bs.md). Only HSE-specific aspects of the band gap and DOS calculation are covered below.


## 1. Understand the HSE band gap workflow

Unlike the [HSE band structure computation](hse-qe-bs.md), where k-points must be extracted and inserted manually, the band gap and DOS calculation uses a [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) defined automatically, as in a standard SCF calculation.

The HSE-specific parameters are triggered by including the HSE [Refiner]({{ reference_url }}/models-directory/dft/parameters/#refiners), set under the [Subworkflow Editor Interface]({{ interface_url }}/workflow-designer/subworkflow-editor/overview-tab/#refiners).

For band-gap computations, the "band_gaps" [property]({{ reference_url }}/properties/overview/) calculation option must be enabled under the [Detailed View tab]({{ interface_url }}/workflow-designer/subworkflow-editor/detailed-view/) of the Subworkflow Editor before job execution.

### 1.1. Workflow units

The [workflow]({{ reference_url }}/workflows/overview/) contains a single [subworkflow]({{ reference_url }}/workflows/components/subworkflows/) with two [units]({{ reference_url }}/workflows/components/units/): the main HSE computation and the DOS extraction via the `projwfc.x` [executable]({{ reference_url }}/software-directory/modeling/quantum-espresso/components/#executables).

### 1.2. Configure the q-grid

An accurate band gap estimate requires a sufficiently large q-grid (k1-k2 mesh for the Fock operator), defined via the `nqx1`, `nqx2`, `nqx3` input keywords. The q-grid must be a divisor of the k-grid. For this tutorial, the recommended setting is a k-grid of 8 × 8 × 8 with a q-grid of 4 × 4 × 4, configurable under the [Important Settings tab]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) of the Subworkflow Editor.

!!!info "Even k-grid sizes required"
    The default HSE workflow sets the q-grid to half the k-grid size, so an **even k-grid size** is always required. If an odd number is entered, it is automatically increased by one (e.g. 5 × 5 × 5 → 6 × 6 × 6, yielding a 3 × 3 × 3 q-grid). This behavior can be overridden by editing the input script directly through the [unit editor]({{ interface_url }}/workflow-designer/unit-editor/).


## 2. Import the HSE workflow from the bank

[Workflows]({{ reference_url }}/workflows/overview/) for the HSE band gap and DOS calculation with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/overview/).

!!!warning "Computational cost"
    The recommended grid dimensions require approximately 20–30 minutes on 16 CPU cores. HSE calculations are significantly more expensive than standard [GGA-DFT]({{ reference_url }}/models-directory/dft/parameters/#subtype). More [CPU cores and/or walltime]({{ resources_url }}/infrastructure/compute/parameters/) should be allocated as appropriate.


## 3. Examine the results

The final result of ~1.193 eV for the indirect band gap of silicon is in excellent agreement with the experimental zero-temperature value of 1.17 eV. HSE provides a marked improvement in band gap accuracy compared to the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/notes/#accuracy-limits-of-the-generalized-gradient-approximation), which significantly underestimates band gaps.


## 4. Video walkthrough

The animation below demonstrates the creation and execution of the HSE band gap and DOS workflow on silicon using Quantum ESPRESSO, concluding with the numerical result in the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/ailaAlkaIRE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
