# Phonon Dispersions and Density of States on Grid

This tutorial explains how to calculate the [Phonon Dispersion Curves]({{ reference_url }}/properties-directory/non-scalar/phonon-dispersions/) and [Phonon Density of States]({{ reference_url }}/properties-directory/non-scalar/phonon-dos/) of crystalline silicon using the **Grid Method** with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.

The Grid Method is based on a [map type workflow]({{ reference_url }}/workflows/components/maps/) where multiple branches execute in parallel as separate [jobs]({{ reference_url }}/jobs/overview/), providing faster overall phonon calculations. More information and results on a sample material set are available in Ref. [^1]. For the alternative serial approach, see the [standard phonon tutorial](phonon-dispersion-dos.md).


## 1. Understand the Grid Method

The Grid Method parallelizes the computation of individual vibrational modes by optimizing the [workflow]({{ reference_url }}/workflows/overview/) to calculate frequencies for each **symmetry-irreducible representation** [^2] of phonon lattice perturbations in parallel.

The workflow follows a **map-reduce** pattern:

1. Irreducible representations (irreps) are generated based on the [q-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#other-types-of-reciprocal-space-grids).
2. A separate calculation is prepared and submitted for each irrep-q-point pair via a [Map]({{ reference_url }}/workflows/components/maps/) (**map stage**).
3. After all pair calculations complete, the dynamical matrices are collected and aggregated, and phonon dispersions and DOS are calculated (**reduce stage**).

The limiting factor is the longest run per individual irrep-q-point pair.

![phonons grid method](../../../images/tutorials/phonons-grid.png "phonons grid method")


## 2. Understand the workflow structure

The workflow contains five main [subworkflow]({{ reference_url }}/workflows/components/subworkflows/) steps:

### 2.1. Preliminary SCF calculation

A standard self-consistent field (SCF) total energy calculation provides the wavefunctions. The [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is set to 6 × 6 × 6 under [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/).

### 2.2. Q-points and irrep generation

The "ph-init-qpoints" subworkflow generates the [q-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#other-types-of-reciprocal-space-grids) over which phonon calculations are performed. The q-grid must be a divisor of the k-grid — a q-grid of 2 × 2 × 2 is appropriate here.

### 2.3. Extract q-point/irrep pairs

The "espresso-xml-get-qpt-irr" subworkflow uses a [Python script]({{ reference_url }}/software-directory/scripting/python/overview/) to parse and extract q-points and irreducible representations from the Quantum ESPRESSO XML data.

### 2.4. Map distributed phonon calculation

The [Map]({{ reference_url }}/workflows/components/maps/) subworkflow distributes parallel phonon calculations across each q-point/irrep pair. The q-grid under the "Important Settings" of the "ph-single-irr-qpt" map subworkflow should also be set to 2 × 2 × 2.

### 2.5. Reduce and aggregate results

The final "Reduce" subworkflow collects results from all independent pair calculations via "ph_grid_restart". The q-grid under [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) should again be 2 × 2 × 2. Results are then processed through the Quantum ESPRESSO "q2r" and "matdyn" [executables]({{ reference_url }}/software-directory/modeling/quantum-espresso/components/#executables).


## 3. Create and submit the job

"Phonon Map" [workflows]({{ reference_url }}/workflows/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). Follow the same instructions as in the [standard phonon tutorial](phonon-dispersion-dos.md) for creating and launching the job and inspecting results.


## 4. Video walkthrough

The animation below demonstrates the Grid Method phonon calculation on crystalline silicon using Quantum ESPRESSO.

!!!tip "Computational cost"
    Phonon calculations are computationally demanding. At least 8 computing cores are recommended. For larger calculations, [OF queues]({{ resources_url }}/infrastructure/resource/queues/) offer faster turnaround than OR queues.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/xZdjLr7zlhw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 5. Links

[^1]: [T. Bazhirov, E. X. Abot: "Fast and accessible first-principles calculations of vibrational properties of materials"; arXiv:1808.10011v1, 29 Aug 2018](https://arxiv.org/pdf/1808.10011.pdf)
[^2]: ["Introduction to lattice modes and their symmetry", Oxford University Lecture Document](https://www2.physics.ox.ac.uk/sites/default/files/CrystalStructure_Handout8_0.pdf)
