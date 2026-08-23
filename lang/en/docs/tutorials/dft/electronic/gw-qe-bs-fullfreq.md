# Calculate Electronic Band Structure with GW Approximation and Full-Frequency Integration

This tutorial explains how to calculate the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of crystalline silicon in its cubic-diamond crystal structure using the [GW Approximation]({{ reference_url }}/models-directory/dft/notes/#the-gw-approximation) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) and **full-frequency integration** along the imaginary axis.

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO version 6.3 and later.

The GW Approximation produces more accurate electronic band structures than standard DFT, at significantly higher computational cost. The aim is to calculate the band structure of silicon along the Γ–X–W–K directions. For an alternative approach using the plasmon-pole approximation, see the [plasmon-pole tutorial](gw-qe-bs-plasmon.md). More information on GW results for a sample set of materials can be found in Ref. 1 of [this page](gw-vasp-bg.md).


## 1. Understand the SternheimerGW code

The GW Approximation is enabled via **SternheimerGW** [^1] [^2], an add-on package for Quantum ESPRESSO. SternheimerGW uses time-dependent density-functional perturbation theory to evaluate GW quasiparticle band structures and spectral functions. Both the Green's function G and the screened Coulomb interaction W are obtained by solving linear Sternheimer equations, avoiding summation over unoccupied states. The code performs a full-frequency integration for accurate spectral properties, and the linear response approach allows evaluation at arbitrary electron wavevectors — particularly useful for indirect band gap semiconductors.

Further information is available in Ref. [^3].

!!!warning "Norm-conserving pseudopotentials required"
    SternheimerGW requires norm-conserving pseudopotentials (default options are described [here]({{ reference_url }}/methods-directory/pseudopotential/default/)).


## 2. Understand the workflow structure

<details markdown="1">
  <summary>Expand to view detailed input parameters</summary>

The workflow contains two main compute [units]({{ reference_url }}/workflows/components/units/):

1. A ground-state SCF calculation to obtain energy eigenvalues and wave functions.
2. A GW calculation using SternheimerGW, reading the wave functions and charge density from step 1.

The SternheimerGW input file contains the following key sections:

**SCF configuration:** The `prefix` and `outdir` variables must match the SCF calculation so SternheimerGW can read its results.

**Linear response grids:** The `kpt_grid` controls the density response for the dielectric function. The `qpt_grid` is used to convolute the Green's function and screened Coulomb interaction.

**Number of bands:** The `num_band` variable controls how many bands receive the GW correction. This value must exceed the number of occupied states for an accurate Fermi energy.

**W convolution:** The `max_freq_coul` and `num_freq_coul` variables set the maximum value and number of points for the frequency integration.

**Self-energy cutoffs:** The `ecut_corr` and `ecut_exch` variables define the FFT grid for the correlation and exchange contributions to the self-energy.

**Frequencies:** The `FREQUENCIES` section defines the coarse complex frequency mesh for evaluating the screened Coulomb interaction. A mesh along the imaginary frequency axis is typical.

**K-points:** The `K_points` section specifies the k-point coordinates (in $2 \pi / a$ units) where the exchange and correlation self-energy are evaluated.

</details>


## 3. Create the job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation.


## 4. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for the GW band structure calculation via full-frequency integration can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 5. Set sampling in reciprocal space

Set the [k-point and q-point grids]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) to 4 × 4 × 4 for the GW unit (8 × 8 × 8 for the SCF unit) via [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/). Reduce the plane-wave cutoff to 20 Ry and the charge density cutoff to 80 Ry — sufficient for silicon with a norm-conserving pseudopotential.

Also modify the [k-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) (at the bottom of Important Settings) to sample the Γ–X–W–K region of the Brillouin Zone.


## 6. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

!!!warning "Computational cost"
    GW calculations are significantly more expensive than standard [GGA-DFT]({{ reference_url }}/models-directory/dft/parameters/#subtype). More [CPU cores and/or walltime]({{ resources_url }}/infrastructure/compute/parameters/) should be allocated as appropriate.

!!!info "Parallelization for SternheimerGW"
    In order to run SternheimerGW in parallel, the `k-point pools` value under [Advanced Options]({{ resources_url }}/infrastructure/compute/parameters/#advanced-options) must be set equal to the number of cores. G-vector parallelization is not implemented — only pool and image parallelization are available.


## 7. Examine the results

Once both [units]({{ reference_url }}/workflows/components/units/) complete, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of silicon along the Γ–X–W–K path.

The indirect band gap of ~1.05 eV is in good agreement with experiment.

!!!note "Band gap measurement"
    In this case, the band gap is calculated on the chosen Γ–X–W–K reciprocal path, not on the overall grid.


## 8. Video walkthrough

The animation below demonstrates the full workflow.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/tjXYSCkHjDE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 9. Links

[^1]: [SternheimerGW, Official Website](http://www.sternheimergw.org/)
[^2]: [M. Schlipf, H. Lambert, N. Zibouche, F. Giustino: "SternheimerGW: a program for calculating GW quasiparticle band structures and spectral functions without unoccupied states"; arXiv:1812.03717](https://arxiv.org/pdf/1812.03717.pdf)
[^3]: [SternheimerGW, Official GitHub Repository](https://github.com/QEF/SternheimerGW)
