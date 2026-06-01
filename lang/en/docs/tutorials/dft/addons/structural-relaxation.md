# Perform Structural Relaxation 

This tutorial explains how to run a [structural relaxation]({{ reference_url }}/workflows/addons/structural-relaxation/) using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). Variable-cell relaxation consist in simultaneously minimizing the inter-atomic forces, whilst also optimizing the overall lattice geometry by minimizing its corresponding potential energy together with the components of its internal [stress tensor]({{ reference_url }}/properties-directory/non-scalar/stress-tensor/). 

## Accessing the Functionality

Relaxation can be run either as a stand-alone [workflow]({{ reference_url }}/workflows/overview/), or prepended as a [Workflow Add-on]({{ reference_url }}/workflows/addons/overview/) to another [property calculation]({{ reference_url }}/properties/overview/).

## Summary

In the present tutorial, we study the crystalline silicon distorted from its equilibrium cubic-diamond crystal structure and make use of the [VASP](../../../software-directory/modeling/vasp/overview.md) simulation engine. We will investigate how to optimize the crystal structure geometry and atomic positions in the context of a [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) computation. Relaxation prior to a property calculation is generally-speaking a critical precaution to take in order to ensure an accurate final result in the material property being sought.

!!!info "Generality of tutorial instructions"
    Despite making explicit references to [VASP](../../../software-directory/modeling/vasp/overview.md), the instructions presented herein are of general applicability to all [modeling engines](../../../software-directory/overview.md#modeling-applications) supported on our platform.
    
!!!note "VASP version considered in this tutorial"
    The present tutorial is written for VASP at versions 5.3.5 or 5.4.4.

## Create Job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) shown on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless this default was [changed]({{ interface_url }}/entities-general/actions/set-default/) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will be automatically loaded at the moment of the [opening]({{ interface_url }}/jobs/actions/create/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the Total Energy can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

Thereafter, in order to add structural relaxation as an [Add-on]({{ reference_url }}/workflows/addons/overview/) to the total energy calculation workflow, the user should [click the appropriate button]({{ interface_url }}/workflow-designer/header-menu/#inserting-add-ons) within the [Header Menu]({{ interface_url }}/workflow-designer/header-menu/) of [Workflow Designer]({{ interface_url }}/workflow-designer/overview/). The corresponding "Relaxation" option under this button should thus be chosen. 

At the end of the insertion of the relaxation Add-on to the Total Energy Workflow, the user will notice that an additional "Variable-cell Relaxation" [Subworkflow]({{ reference_url }}/workflows/components/subworkflows/) has been prepended to the overall [computation order flowchart]({{ interface_url }}/workflow-designer/sidebar/) exhibited on the left-hand side of the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/overview/).

## Examine Unit Input Files

The user can now try to open the main "vc-relax" [Execution Unit]({{ reference_url }}/workflows/components/units/) within the "Variable-cell Relaxation" [Subworkflow]({{ reference_url }}/workflows/components/subworkflows/) by clicking it. The contents of the input files used for the structural relaxation study can in this way be inspected, towards the bottom of the [unit editor interface]({{ interface_url }}/workflow-designer/unit-editor/#unit-input-templates). 

The type of relaxation calculation performed is always by default a variable-cell including the relaxation of the [atomic positions]({{ reference_url }}/properties-directory/structural/basis/) as well as of the [unit cell shape and size]({{ reference_url }}/properties-directory/structural/lattice/).

Please note that the second total energy subworkflow reads the structural information output by the preliminary relaxation, instead of the parameters in its own input.
 
!!!note "Specific example for VASP"
    The POSCAR file employed in the ensuing Total Energy subworkflow computation is just a placeholder, and during the course of its execution will be overwritten by a CONTCAR file obtained from the results of the relaxation. This behavior is triggered by the "prepare_restart" post-processor.

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [Job]({{ reference_url }}/jobs/overview/), the user should click the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and inspect the [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) included therein. Silicon is a small structure, so four CPU cores and one minute of calculation runtime should be sufficient.

## Examine Results

Once the Job execution is finished, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the results of the computation, including the final optimized value of the total energy as well as additional information about each execution unit.

## Optimized Structural Parameters

Finally, the user can also browse the actual output and input files that are part of the calculation under the [Files tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). In order to determine the structure geometry for which relaxation was achieved in the end, the POSCAR file can be [downloaded and inspected]({{ interface_url }}/data-in-objectstorage/actions/download/). 

The structural data contained in this file can readily be visualized graphically under the [Materials Viewer]({{ interface_url }}/materials/ui/viewer/) instance contained within the [Results tab]({{ interface_url }}/jobs/ui/results-tab/).

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a [structural relaxation]({{ reference_url }}/workflows/addons/structural-relaxation/) study on a [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) workflow computation under the following animation, where we make use of the [Quantum ESPRESSO](../../../software-directory/modeling/quantum-espresso/overview.md) simulation engine. The starting point is a crystal structure of silicon which has been slightly distorted from its equilibrium cubic-diamond lattice parameters and atomic positions.

As expected, the components of both the atomic forces and [stress tensor]({{ reference_url }}/properties-directory/non-scalar/stress-tensor/) shown at the end of the structural relaxation computation, under the interface of [Results tab]({{ interface_url }}/jobs/ui/results-tab/), have low values in proximity to zero, signalling successful relaxation and geometry optimization.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/vHmId3iU_Ik" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
