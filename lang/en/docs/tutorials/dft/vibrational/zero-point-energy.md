# Calculate Zero Point Energy

This tutorial explains how to calculate the [zero point energy]({{ reference_url }}/properties-directory/scalar/zero-point-energy/) of crystalline silicon in its equilibrium cubic-diamond crystal structure using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) with [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/).

!!!note "VASP version"
    This tutorial applies to VASP versions 5.3.5, 5.4.4, and later.


## 1. Create the job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation.


## 2. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for the Zero Point Energy calculation with [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 3. Examine the input file

The single [unit]({{ reference_url }}/workflows/components/units/) for this calculation is "vasp_zpe". Clicking it reveals the corresponding input files. The `IBRION = 5` flag within the INCAR file enables VASP to run the atomic displacements required for the zero point energy calculation.


## 4. Set sampling in reciprocal space

A [well-relaxed structure]({{ reference_url }}/workflows/addons/structural-relaxation/) with [converged k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/) is critical for zero point energy calculations.

The default sampling (KPPRA of 2000) is sufficient, as can be verified by performing a [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/). For larger cells, setting k-grid dimensions through KPPRA generally provides a reliable starting point.

Instructions for [structural relaxations](../addons/structural-relaxation.md) and [k-point convergence studies](../addons/kpt-convergence.md) are available in their respective tutorials.


## 5. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Silicon is a small structure, so 4 CPUs and 1 minute of runtime are sufficient.


## 6. Examine the results

Once the job completes, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays a "Zero Point Energy" card with the calculated value. The larger this value, the more important it becomes to include zero point energy in ab-initio thermodynamic calculations performed at zero temperature.


## 7. Video walkthrough

The animation below demonstrates the full zero point energy workflow on silicon using VASP.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/SeKAKDaU-g0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
