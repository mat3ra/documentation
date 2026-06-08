# Phonon Dispersions and Density of States Calculation

This tutorial explains how to calculate the [Phonon Dispersion Curves]({{ reference_url }}/properties-directory/non-scalar/phonon-dispersions/) and [Phonon Density of States]({{ reference_url }}/properties-directory/non-scalar/phonon-dos/) of crystalline silicon in its cubic-diamond crystal structure using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.


## 1. Create the job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation.


## 2. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for phonon calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 3. Set sampling in reciprocal space

A high [q-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#other-types-of-reciprocal-space-grids) is critical for resolving phonon dispersion details.

The phonon workflow contains multiple [units]({{ reference_url }}/workflows/components/units/). The first unit configures the self-consistent calculation of energy eigenvalues and wave functions. Subsequent units are described in the theoretical explanation in Ref. [^1] of [this page]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/).

Set the [q-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#other-types-of-reciprocal-space-grids) to 3 × 3 × 3 under [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/). Also reduce the k-point grid from its default to 6 × 6 × 6 to make the q- and k-point grids commensurate and reduce computational cost.

The associated [i-grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/#other-types-of-reciprocal-space-grids) for reciprocal/real-space transformation and interpolation should be set to 18 × 18 × 18. The recommended [q-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/) should also be applied to sample the vibrational states across the Brillouin Zone.


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/).

!!!tip "Computational cost"
    Phonon calculations are computationally demanding. Despite silicon being a small structure, the settings above require at least 45 minutes on 16 compute cores.


## 5. Examine the results

Once all [units]({{ reference_url }}/workflows/components/units/) complete, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the [phonon dispersion curves]({{ reference_url }}/properties-directory/non-scalar/phonon-dispersions/) and the [Phonon Density of States]({{ reference_url }}/properties-directory/non-scalar/phonon-dos/) (directly above the dispersion curve).


## 6. Video walkthrough

The animation below demonstrates the full phonon calculation workflow on silicon using Quantum ESPRESSO.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/41uropwrb0k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
