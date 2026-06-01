# Calculate Electronic Band Structure with GW Approximation and Full-frequency Integration

This tutorial page explains how to calculate the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of a semiconducting material based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We consider crystalline silicon in its standard equilibrium cubic-diamond crystal structure, and use [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) as our main simulation engine during this tutorial.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at version(s) 6.3.

## GW Approximation

What sets the present tutorial apart from the [GGA DFT band-structure tutorial](band-structure.md) is the employment of the [GW Approximation]({{ reference_url }}/models-directory/dft/notes/#the-gw-approximation). This method is significantly more computationally intensive than the conventional approach for computing electronic band structures. It yields more accurate electronic results closer to experimental value. More information about this approximation, together with a demonstration of its application and results on a sample set of materials, can be found in Ref. 1 in [this page](gw-vasp-bg.md).

The aim of the present tutorial is to calculate the electronic band structure of silicon along the Gamma-X-W-K directions. In this example, we use **full-frequency integration** along the imaginary axis. For an alternative approach to GW band calculation using the Plasmon pole approximation the user can review [another tutorial](gw-qe-bs-plasmon.md).

## The SternheimerGW Code

The GW Approximation is enabled on our platform via **SternheimerGW** [^1] [^2], an add-on software package for Quantum ESPRESSO.

SternheimerGW uses time-dependent density-functional perturbation theory to evaluate GW quasiparticle band structures and spectral functions for solids. Both the Green's function G and the screened Coulomb interaction W are obtained by solving linear Sternheimer equations, thus overcoming the need for a summation over unoccupied states. The code targets the calculation of accurate spectral properties by convoluting G and W using a full frequency integration. The linear response approach allows users to evaluate the spectral function at arbitrary electron wavevectors, which is particularly useful for indirect band gap semiconductors and for simulations of angle-resolved photoelectron spectra. 

Further information and examples on how the GW method is supported by the SternheimerGW code can be retrieved in Ref. [^3].

!!!warning "Norm-conserving pseudopotentials required"
    Steinheimer GW needs to be operated in conjunction with norm-conserving pseudopotentials (default options provided by our platform are explained [here]({{ reference_url }}/methods-directory/pseudopotential/default/)).

## Workflow Structure

<details markdown="1">
  <summary>Expand to view</summary> 

We shall now describe the computational implementation of the GW Approximation for computing the electronic band structure on our platform, illustrating the various steps constituting the overall [Workflow]({{ reference_url }}/workflows/overview/). 

Workflows performing GW calculations, based upon the [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) modeling engine and the full-frequency integration approach, are composed of two main compute [units]({{ reference_url }}/workflows/components/units/):

1 - A first ground-state energy self-consistent field (SCF) calculation, to obtain the energy eigenvalues and wave functions.
2 - GW calculation to obtain quasiparticle energies, using SternheimerGW, using the wave functions and charge density of the previous preliminary calculation.

Let us consider the individual parts of the input file for the latter second step.

### GW Unit

#### Configuration of the scf run

The variables `prefix` and `outdir` should be set to the same values as in the SCF calculation, so that SternheimerGW can read the results of that preliminary calculation.

#### Grid used for the linear response

With the variables `kpt_grid` and `qpt_grid`, we control the integration over the Brillouin zone. The `kpt_grid` is used to calculate the density response required to evaluate the dielectric function. The `qpt_grid` is instead used to convolute the Green's function and the Screened Coulomb interaction.

#### Number of bands for which the GW correction is calculated

With the variable `num_band`, we control the for how many bands the GW correction is calculated. In order to determine an accurate Fermi energy, this value must be larger than the number of occupied states.

#### W in the convolution

We convolute the Green's function and the Screened Coulomb interaction in the frequency domain. The variables `max_freq_coul` and `num_freq_coul` determine the maximum value and the number of points used in this integration.

#### Exchange and correlation self energy

The variables `ecut_corr` and `ecut_exch` define the Fast Fourier Transform grid that is used to evaluate correlation and exchange contribution to the self energy.

#### Frequencies

The first line in the `FREQUENCIES` section of the SternheimerGW input script gives the number of frequencies followed by number of frequency lines that specify the coarse complex frequency mesh on which the Screened Coulomb interaction is evaluated. From this mesh, we obtain the denser mesh used in the convolution by numerical analytical continuation. Typically, a mesh along the imaginary frequency axis is chosen.

#### K-points

The first line of the final `K_points` section gives the number of k-points, followed by lines specifying the k-point coordinates in $2 \pi / a$ units. The code evaluates the exchange and correlation self energy at these k points.

</details>

## Create Job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) that is shown on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless this default was [changed]({{ interface_url }}/entities-general/actions/set-default/) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will as such be automatically loaded at the moment of the [opening]({{ interface_url }}/jobs/actions/create/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of [materials]({{ reference_url }}/materials/overview/) with [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md), operated in conjunction with the SternheimerGW code for enabling the GW Approximation via the full-frequency integration approach, can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

## Set Sampling in Reciprocal Space

We set the size of the [grids of k-points and q-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) to 4 x 4 x 4 for the second GW workflow unit (8 x 8 x 8 kgrid in the first SCF unit), via the ["Important Settings" section]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) under the [Workflow Tab]({{ interface_url }}/jobs-designer/workflow-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/). We also take care to reduce the plane-wave cutoff from their default values to 20 Ry, and the charge density cutoff to 80 Ry, which for the case of silicon modeled with a norm conserving pseudopotential provide sufficient precision.

In addition, we also modify the [k-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/), accessible towards the bottom of "Important Settings", to sample only the region of the Brillouin Zone of the crystal between the central Gamma point and the X, W and K special symmetry points.

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and examine the [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) included therein. 

!!!warning "Computational Cost"
    The computational cost of GW calculations is significantly higher than for more basic methods in [DFT]({{ reference_url }}/models-directory/dft/overview/) such as the [Generalized Gradient Approximation]({{ reference_url }}/models-directory/dft/parameters/#subtype). We thus recommend to allow for more [CPU cores and/or walltime]({{ dev_url }}/infrastructure/compute/parameters/) as appropriate for the material system under investigation.

In order to run the SternheimerGW code in parallel (more than 1 core), the user should set the `k-point pools` value under the ["Advanced Options"]({{ dev_url }}/infrastructure/compute/parameters/#advanced-options) of the "Compute" tab equal to the number of cores, otherwise, the calculation fails with a "G-vectors mismatch" error message. This is a result of the fact that G-vector parallelization is not implemented for SternheimerGW, and the only available parallelization levels are pools and images.

## Examine Final Results

When both [unit]({{ reference_url }}/workflows/components/units/) computations are complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of silicon, plotted as a dispersion curve as a function of the special [k-point paths]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) chosen (the Gamma-X-W-K directions in our case).

We also note that the final result for the indirect band gap of silicon of 1.05 eV is in good agreement with the reported experimental value.

!!!note "Band gap result"
    In this case, the band gap is calculated on the chosen Gamma-X-W-K reciprocal path, and not on the overall grid.

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a GW band structure computation on crystalline silicon, using the [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) simulation engine together with the SternheimerGW code for enacting the full-frequency integration along the imaginary axis, in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/tjXYSCkHjDE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [SternheimerGW, Official Website](http://www.sternheimergw.org/)

[^2]: [M. Schlipf, H. Lambert, N. Zibouche, F. Giustino: "SternheimerGW: a program for calculating GW quasiparticle band structures and spectral functions without unoccupied states"; arXiv:1812.03717](https://arxiv.org/pdf/1812.03717.pdf)
[^3]: [SternheimerGW, Official GitHub Repository](https://github.com/QEF/SternheimerGW)
