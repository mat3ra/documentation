# Reaction Energy Profile with NEB (Quantum ESPRESSO)

This tutorial explains how to calculate the [energy reaction profile]({{ reference_url }}/properties-directory/non-scalar/reaction-energy-profile/) and [activation barrier]({{ reference_url }}/properties-directory/scalar/reaction-energy-barrier/) via the [Nudged Elastic Band (NEB) method]({{ reference_url }}/models/auxiliary-concepts/nudged-elastic-band/), using [interpolated sets]({{ interface_url }}/materials-designer/header-menu/advanced/interpolated-set/) of intermediate image structures (see the [interpolated sets tutorial](../../materials/interpolated-sets.md)).

The example system is a one-dimensional, three-atom hydrogen (H3) molecule undergoing a **collinear proton transfer reaction**:

```text
H2 + H  <==>  H + H2
```

In this reaction, the middle H atom breaks the bond with the first atom and forms a molecule with the third atom. This example is also available in the Quantum ESPRESSO documentation [^1].

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.


## 1. Understand the NEB workflow

<details markdown="1">
  <summary>Expand to view input parameter details</summary>

The [workflow]({{ reference_url }}/workflows/overview/) for NEB calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) contains a single [unit]({{ reference_url }}/workflows/components/units/).

**Executable:** NEB calculations use the ["neb.x" executable]({{ reference_url }}/software-directory/modeling/quantum-espresso/components/#executables). Input parameters are described in Ref. 4 of [this page]({{ reference_url }}/software-directory/modeling/quantum-espresso/components/) and can be customized via the [unit input template editor]({{ interface_url }}/workflow-designer/unit-editor/#unit-input-templates).

**Broyden algorithm:** The [Broyden algorithm]({{ reference_url }}/methods/auxiliary-concepts/optimization-algorithms/) is used instead of the default optimizer to remove oscillations in activation energies.

**Number of images:** The `num_of_images` parameter defines the number of image points discretizing the reaction path (must be > 3 including initial/final). This can be set under the "neb" section of [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) for automatic generation by Quantum ESPRESSO.

**Convergence threshold:** The simulation stops when the force orthogonal to the path is below `path_thr` (in eV/Å).

**Image structures:** Atomic positions for all images are specified within `BEGIN_POSITIONS / END_POSITIONS` delimiters, with each `ATOMIC_POSITIONS` card prefixed by `FIRST_IMAGE`, `INTERMEDIATE_IMAGE`, or `LAST_IMAGE`.

</details>


## 2. Create the job

Open the [Job Designer]({{ interface_url }}/jobs-designer/overview/) to create a new [job]({{ reference_url }}/jobs/overview/).


## 3. Import the interpolated set

The **Interpolated Set** generated in the [interpolated sets tutorial](../../materials/interpolated-sets.md) under the name "NEB CONSTRAINED SET" should be [selected and imported]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) into the [Materials tab]({{ interface_url }}/jobs-designer/materials-tab/) by [selecting]({{ interface_url }}/entities-general/actions/select/) all images in the set.


## 4. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for NEB calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the job.

!!!warning "K-point grid for molecules"
    The [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) should be set to 1 × 1 × 1 under [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/), since the system is a molecule rather than a periodic crystal.


## 5. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). H3 is a small system — 4 CPUs and a few minutes of runtime are sufficient.


## 6. Examine the results

The [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the **Reaction Energy Profile** as an energy curve versus the reaction coordinate.

![Reaction Energy Profile](../../../images/tutorials/reaction-profile.png "Reaction Energy Profile")

The final optimized image structures can be retrieved according to the instructions in [this page]({{ reference_url }}/workflows/addons/structural-relaxation/#initial/final-structures-set).


## 7. Video walkthrough

### 7.1. NEB with manually generated images

The animation below uses the constrained interpolated set containing 3 intermediate images generated in the [interpolated sets tutorial](../../materials/interpolated-sets.md). The activation barrier of ~0.2 eV is in good agreement with published results (see page 26 in Ref. [^2]).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/1-B2Cf7nfzI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### 7.2. NEB with automatically generated images

The same calculation can be performed with automatic intermediate image generation by Quantum ESPRESSO, eliminating the need to import an interpolated set manually. Set the number of intermediate images under [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) — only the initial and final images need to be imported.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/m7HoFpXZ57k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 8. Links

[^1]: [Quantum ESPRESSO NEB Example, Official GitHub Repository](https://github.com/maxhutch/quantum-espresso/tree/master/NEB/examples/example01)
[^2]: [Guido Fratesi: "Low Temperature methane-to-methanol conversion on transition metal surfaces", Ph.D Thesis](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.378.7331&rep=rep1&type=pdf)
