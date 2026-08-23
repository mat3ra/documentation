# Calculate Electronic Band Gap with GW Approximation

This tutorial explains how to calculate the [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) of crystalline silicon in its cubic-diamond crystal structure using the [GW Approximation]({{ reference_url }}/models-directory/dft/notes/#the-gw-approximation) with [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/).

!!!note "VASP version"
    This tutorial applies to VASP versions 5.3.5, 5.4.4, and later.

The GW Approximation is significantly slower than standard DFT but yields more accurate band structures, rectifying the tendency of the [GGA to underestimate band gaps]({{ reference_url }}/models-directory/dft/notes/#accuracy-limits-of-the-generalized-gradient-approximation). Similarly to the [HSE method](hse-vasp-bg.md), the GW approach produces results much closer to experimental values. A demonstration of GW results on a sample set of materials is available in Ref. [^1].


## 1. Understand the GW workflow

The [workflow]({{ reference_url }}/workflows/overview/) for GW band gap calculations with [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) follows a three-step procedure [^2] [^3]:

### 1.1. Preliminary ground-state SCF calculation

The first [subworkflow]({{ reference_url }}/workflows/components/subworkflows/) step is a standard self-consistent field (SCF) total ground-state energy calculation, providing the wavefunctions needed by subsequent steps. The [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is set to 10 × 10 × 10 under [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/).

### 1.2. Many-bands SCF calculation

GW calculations require a significant number of empty bands. This is performed as a separate subworkflow: the `NBANDS` VASP tag is set to a large value to include many unoccupied orbitals.

### 1.3. GW step

The actual GW calculation is done in the final subworkflow. Different GW flavors are selected via the `ALGO` VASP tag.

The "Single Shot" quasi-particle energy method, commonly referred to as **G0W0**, is the simplest and most computationally efficient GW calculation. It computes quasi-particle energies from a single GW iteration by neglecting off-diagonal self-energy matrix elements and using a Taylor expansion around the DFT energies.

After a successful G0W0 run, VASP writes the quasi-particle energies into the main "OUTCAR" output file for every k-point in the Brillouin zone.

!!!note "Grid-based approach"
    In this example, quasi-particle energies are calculated on the k-point grid. Points on the grid may not fall exactly onto the band extrema, but this approach is robust and provides a reasonable approximation. Intelligent interpolation can be used to extract band dispersions along symmetry paths.


## 2. Import the GW workflow from the bank

GW band gap [workflows]({{ reference_url }}/workflows/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/), for example under the name "D1-GW0-BG".

!!!info "Workflow naming convention"
    The "D1-GW0-BG" name contains the following information: "D" refers to the difficulty level (see table II in Ref. [^1]), "GW0" represents the method, and "BG" is an abbreviation for band gap.

The same procedural instructions as in the [band gap tutorial](band-gap.md) apply for creating and launching the job.


## 3. Video walkthrough

The animation below demonstrates the procedure for creating and executing a GW band gap calculation on crystalline silicon using VASP.

!!!tip "Computational cost"
    GW calculations are computationally demanding. At least 8 computing cores are recommended. For larger calculations, [OF queues]({{ resources_url }}/infrastructure/resource/queues/) offer faster turnaround than OR queues.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/t1IDfMcTIxw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 4. Compare with experiment

The calculated value of ~1.094 eV for the indirect band gap of silicon is in better agreement with the experimental value of 1.17 eV [^1] than standard [GGA calculations](band-gap.md). This demonstrates how the GW Approximation provides improved accuracy for electronic structure predictions compared to traditional DFT approaches.


## 5. Links

[^1]: [P. Das, M. Mohammadi, T. Bazhirov: "Accessible computational materials design with high fidelity and high throughput"; arXiv:1807.05623, 15 Jul 2018](https://arxiv.org/pdf/1807.05623.pdf)
[^2]: [GW calculations, Official VASP Documentation](https://cms.mpi.univie.ac.at/wiki/index.php/GW_calculations)
[^3]: [Bandgap of Si in GW, Official VASP Documentation](https://cms.mpi.univie.ac.at/wiki/index.php/Bandgap_of_Si_in_GW)
