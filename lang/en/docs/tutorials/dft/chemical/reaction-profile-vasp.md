# Reaction Energy Profile with NEB (VASP)

This tutorial explains how to calculate the energy reaction profile and activation barrier via the **Nudged Elastic Band (NEB) method** using [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) and [interpolated sets]({{ interface_url }}/materials-designer/header-menu/advanced/interpolated-set/) of intermediate image structures (see the [interpolated sets tutorial](../../materials/interpolated-sets.md)).

The example system is the same collinear proton transfer reaction of H3 studied in the [Quantum ESPRESSO NEB tutorial](reaction-profile-qe.md). Only VASP-specific aspects are covered here.

!!!note "VASP version"
    This tutorial applies to VASP versions 5.3.5, 5.4.4, and later.


## 1. Understand the VASP NEB workflow

General VASP NEB instructions are available in Ref. [^1], and an example for Pt-adatom self-diffusion on Pt (001) is provided in Ref. [^2].

VASP requires pre-existing [set folders]({{ reference_url }}/entities-general/sets/) named "00" (initial) through "0N" (final), each containing a POSCAR file for the corresponding image. These are generated automatically by the workflow.

The workflow contains three main [subworkflows]({{ reference_url }}/workflows/components/subworkflows/):

!!!warning "Restrictions on computing cores"
    The number of cores must be an integer multiple of the number of *intermediate* images. For example, 2 intermediate images require 2, 4, 6, or another even number of cores.

### 1.1. Calculate initial/final total energies

VASP does not compute energies for the initial and final images during NEB. A pair of SCF calculations extracts the [total energy]({{ reference_url }}/properties-directory/scalar/total-energy/) for both endpoints.

This subworkflow has an independent compute configuration under its [Compute Tab]({{ interface_url }}/workflow-designer/subworkflow-editor/compute/), since the larger core count needed for NEB is not required for these SCF calculations.

The [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) should be set to 1 × 1 × 1 under [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) for molecular systems.

### 1.2. Prepare directories

A [shell script]({{ reference_url }}/software-directory/scripting/shell/overview/) creates the required directory structure: initial POSCAR → "00", final POSCAR → "0N", intermediate images → "01" through "0(N-1)". The SCF outputs from the previous step are copied into directories "00" and "0N".

### 1.3. NEB calculation

The NEB computation is executed through VASP. Key INCAR parameters:

- `IMAGES` — number of intermediate image geometries [^3]
- `SPRING` — spring constant (eV/Å²); negative values enable nudging
- `MAGMOM` — ensures protons have opposite spins (required for correct barrier)
- `EDIFFG` — break condition for ionic relaxation; negative values specify a force threshold

An example INCAR is shown below:

```text
ISTART = 0
EDIFFG = -0.001
IBRION = 1
NELM = 100
NSW = 100
SPRING = -5
ISPIN = 2
ENCUT = 500
MAGMOM = 1 -1 1
IMAGES = 1
```

Additional NEB input parameters are documented in Ref. [^4].

!!!note "Automatic image generation"
    The "number of intermediate images" option under Important Settings is not currently used for VASP. Automatic image generation support will be added in a future platform release.


## 2. Import the interpolated set

The constrained **Interpolated Set** from the [interpolated sets tutorial](../../materials/interpolated-sets.md) should be [selected and imported]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) into the [Materials tab]({{ interface_url }}/jobs-designer/materials-tab/) by [selecting]({{ interface_url }}/entities-general/actions/select/) all images in the set.


## 3. Create and submit the job

Follow the same instructions as in the [Quantum ESPRESSO NEB tutorial](reaction-profile-qe.md#4-select-the-workflow) for [importing]({{ interface_url }}/workflows/actions/copy-bank/) the VASP NEB [workflow]({{ reference_url }}/workflows/overview/) from the [bank]({{ reference_url }}/workflows/bank/) and adding it to the new [job]({{ reference_url }}/jobs/overview/).


## 4. Examine the results

The final optimized image structures can be retrieved following the instructions in [this page]({{ reference_url }}/workflows/addons/structural-relaxation/#initial/final-structures-set).

The [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the energy reaction profile with an activation barrier of ~0.2 eV, in agreement with the [Quantum ESPRESSO NEB tutorial](reaction-profile-qe.md).


## 5. Video walkthrough

The animation below demonstrates the NEB calculation on H3 using VASP with 3 intermediate images on 6 cores (a multiple of 3, as required).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/-ZKK8xTrmSY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 6. Links

[^1]: [TS search using the NEB Method, Official VASP Documentation](https://cms.mpi.univie.ac.at/wiki/index.php/TS_search_using_the_NEB_Method)
[^2]: [Collective jumps of a Pt adatom on fcc-Pt (001): Nudged Elastic Band Calculation, Official VASP Documentation](https://cms.mpi.univie.ac.at/wiki/index.php/Collective_jumps_of_a_Pt_adatom_on_fcc-Pt_(001):_Nudged_Elastic_Band_Calculation)
[^3]: [Instructions on how to generate Images, Official VASP Documentation](https://cms.mpi.univie.ac.at/wiki/index.php/IMAGES)
[^4]: [Transition State Theory: Nudged Elastic Band with VASP, University of Texas](http://theory.cm.utexas.edu/vtsttools/neb.html)
