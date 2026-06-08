# Perform Structural Relaxation

This tutorial explains how to run a [structural relaxation]({{ reference_url }}/workflows/addons/structural-relaxation/) using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT). Variable-cell relaxation simultaneously minimizes inter-atomic forces while optimizing the lattice geometry by minimizing its potential energy and [stress tensor]({{ reference_url }}/properties-directory/non-scalar/stress-tensor/) components.

Relaxation can be run either as a stand-alone [workflow]({{ reference_url }}/workflows/overview/) or prepended as a [Workflow Add-on]({{ reference_url }}/workflows/addons/overview/) to another [property calculation]({{ reference_url }}/properties/overview/).

The example system is crystalline silicon distorted from its equilibrium cubic-diamond crystal structure, using [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) as the simulation engine for a [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) computation. Relaxation prior to a property calculation is a critical step for ensuring accurate final results.

!!!info "General applicability"
    Despite referencing [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/), the instructions here apply to all [modeling engines]({{ reference_url }}/software-directory/overview/#modeling-applications) supported on the platform.

!!!note "VASP version"
    This tutorial applies to VASP versions 5.3.5, 5.4.4, and later.


## 1. Create the job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation.


## 2. Select the workflow and add the relaxation add-on

[Workflows]({{ reference_url }}/workflows/overview/) for the Total Energy calculation can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

In order to add structural relaxation as an [Add-on]({{ reference_url }}/workflows/addons/overview/), [click the appropriate button]({{ interface_url }}/workflow-designer/header-menu/#inserting-add-ons) within the [Header Menu]({{ interface_url }}/workflow-designer/header-menu/) of [Workflow Designer]({{ interface_url }}/workflow-designer/overview/) and select "Relaxation".

After insertion, an additional "Variable-cell Relaxation" [Subworkflow]({{ reference_url }}/workflows/components/subworkflows/) is prepended to the [computation order flowchart]({{ interface_url }}/workflow-designer/sidebar/) on the left side of the [Workflow Designer]({{ interface_url }}/workflow-designer/overview/).


## 3. Examine the unit input files

Open the main "vc-relax" [Execution Unit]({{ reference_url }}/workflows/components/units/) within the "Variable-cell Relaxation" [Subworkflow]({{ reference_url }}/workflows/components/subworkflows/) by clicking it. The input files can be inspected towards the bottom of the [unit editor]({{ interface_url }}/workflow-designer/unit-editor/#unit-input-templates).

The relaxation type is variable-cell by default, including both [atomic positions]({{ reference_url }}/properties-directory/structural/basis/) and [unit cell shape and size]({{ reference_url }}/properties-directory/structural/lattice/).

The second total energy subworkflow reads the structural information output by the preliminary relaxation, rather than the parameters in its own input.

!!!note "VASP-specific behavior"
    The POSCAR file in the ensuing Total Energy subworkflow is a placeholder that is overwritten during execution by the CONTCAR file from the relaxation results. This behavior is triggered by the "prepare_restart" post-processor.


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Silicon is a small structure, so 4 CPUs and 1 minute of runtime are sufficient.


## 5. Examine the results

Once the job completes, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the optimized total energy and additional information about each execution unit.


## 6. Inspect the optimized structure

The output and input files are available under the [Files tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). The POSCAR file can be [downloaded and inspected]({{ interface_url }}/data-in-objectstorage/actions/download/) to determine the relaxed geometry.

The structural data can also be visualized graphically in the [Materials Viewer]({{ interface_url }}/materials/ui/viewer/) within the [Results tab]({{ interface_url }}/jobs/ui/results-tab/).


## 7. Video walkthrough

The animation below demonstrates the creation and execution of a [structural relaxation]({{ reference_url }}/workflows/addons/structural-relaxation/) study on a [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) workflow using [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/). The starting point is a silicon crystal slightly distorted from its equilibrium lattice parameters and atomic positions.

As expected, the force and [stress tensor]({{ reference_url }}/properties-directory/non-scalar/stress-tensor/) components shown at the end of the relaxation approach zero, indicating successful geometry optimization.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/vHmId3iU_Ik" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
