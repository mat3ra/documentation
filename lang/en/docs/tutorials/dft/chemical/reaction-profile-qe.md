# Calculate Reaction Energy Profile Using Nudged Elastic Band (NEB) method

This tutorial page explains how to calculate the [energy reaction profile]({{ reference_url }}/properties-directory/non-scalar/reaction-energy-profile/) and [activation barrier]({{ reference_url }}/properties-directory/scalar/reaction-energy-barrier/) for the multi-dimensional energy space of chemical reactions via the [**Nudged Elastic Bands (NEB) method**]({{ reference_url }}/models/auxiliary-concepts/nudged-elastic-band/), by making use of the [interpolated sets]({{ interface_url }}/materials-designer/header-menu/advanced/interpolated-set/) introduced in a [separate tutorial](../../materials/interpolated-sets.md). 

We consider the example of a one-dimensional, three-atom molecule of Hydrogen (H3) throughout the present tutorial, and shall be making use of [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as the main simulation engine, via the implementation of its `PWneb` [flavor]({{ reference_url }}/software-directory/modeling/quantum-espresso/components/#flavors). 

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.

This example considers a simple activated reaction, consisting in the **collinear proton transfer reaction**:

```text
H2 + H  <==>  H + H2
```

In this triatomic reaction, the middle H atom breaks the bond with first atom and forms a molecule with third atom. We will thus calculate the energy activation barrier of this reaction. This same example is also offered as part of the Quantum ESPRESSO online documentation [^1]. 

## Workflow Structure

<details markdown="1">
  <summary>
    Expand to view ...
  </summary>

We outline here some important aspects of the [Workflow]({{ reference_url }}/workflows/overview/) used for executing NEB calculations on our platform via [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/), which is composed of a single main [unit]({{ reference_url }}/workflows/components/units/).

### Main Executable

NEB calculations are performed through the ["neb.x" Quantum ESPRESSO Executable]({{ reference_url }}/software-directory/modeling/quantum-espresso/components/#executables). The input parameters for this executable are described in Ref. 4 of [this page]({{ reference_url }}/software-directory/modeling/quantum-espresso/components/), and can be customized by the user via the [unit input template editor]({{ interface_url }}/workflow-designer/unit-editor/#unit-input-templates) within the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/overview/). 

### Broyden Algorithm

Within the neb.x input script, we note in particular the need for the [Broyden algorithm]({{ reference_url }}/methods/auxiliary-concepts/optimization-algorithms/) instead of the default one, for numerically solving iterative minimization and optimization problems such as the [structural relaxations]({{ reference_url }}/workflows/addons/structural-relaxation/) performed on the interpolated set images during the course of the NEB computation. This helps to remove the problem of ”oscillations” in the calculated activation energies. If these oscillations persist, and the user cannot afford more images, he/she should focus on smaller problems by decomposing the original one into pieces.

### Number of Images

The number of image points used to discretize the reaction path, as defined by the [interpolated set]({{ interface_url }}/materials-designer/header-menu/advanced/interpolated-set/) of images to be considered for the NEB calculation, is defined by the `num_of_images` input parameter, and must be larger than 3 (including the initial and final images). 

The number of intermediate NEB images should be set under the "neb" section of the ["Important Settings" Tab]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) within the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/overview/), for their automatic generation by Quantum ESPRESSO (without consequently the need to import an interpolated set manually, as described later in this page).

### Convergence Threshold

The NEB simulation stops when the error (the norm of the force orthogonal to the path in eV/A) is less than the `path_thr` input parameter.

### Structure of Images

Atomic positions for all the images are specified within the `BEGIN_POSITIONS / END_POSITIONS` delimiters, where each instance of `ATOMIC_POSITIONS` card is prefixed either by `FIRST_IMAGE`, `INTERMEDIATE_IMAGE`, or `LAST_IMAGE` keywords, depending on its position within the overall order of the interpolated set under consideration.

</details>

## Create Job 

We start with [opening]({{ interface_url }}/jobs/actions/create/) an instance of the [Job Designer Interface]({{ interface_url }}/jobs-designer/overview/) for creating and designing new computational [Jobs]({{ reference_url }}/jobs/overview/) on our platform.
    
## Import Interpolated Set

The **Interpolated Set** generated in [this other tutorial](../../materials/interpolated-sets.md) under the name "NEB CONSTRAINED SET", containing the initial, final and a total of 3 intermediate images of the H3 molecule under investigation (including atomic constraints along the single dimension of the molecule), should then be [selected and imported]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) into the ["Materials Viewer" Tab]({{ interface_url }}/jobs-designer/materials-tab/) of the NEB job being [designed]({{ interface_url }}/jobs-designer/overview/). This is done by [selecting]({{ interface_url }}/entities-general/actions/select/) all images contained in the set at the moment of import.

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the reaction energy profile of chemical molecules via NEB with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

!!!warning "Size of grid of k-points"
    The user should take care to set the size of the [grid of reciprocal k-points (kgrid)]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) to 1 x 1 x 1 under the ["Important Settings" Tab]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) of the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/overview/), since we are presently dealing with single molecules as opposed to periodic crystalline structures.

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and examine the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) included therein. The H3 molecules being considered in the present tutorial are relatively small structures, hence 4 CPUs and a few minutes of calculation runtime should be sufficient.

## Examine Final Results

When the NEB computation is complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the **Reaction Energy Profile** for the H3 molecules under investigation, plotted in the form of an energy curve as a function of the one-dimensional reaction coordinate that is varied from the initial to final configuration.

An example of such a reaction energy profile is shown in the image below, in which the intermediate activation energy barrier between reactants and products is clearly visible.

![Reaction Energy Profile](../../../images/tutorials/reaction-profile.png "Reaction Energy Profile")

## Retrieve Final Optimized Images

The final optimized image structures can be retrieved at the end of Job execution according to the instructions contained [in this page]({{ reference_url }}/workflows/addons/structural-relaxation/#initial/final-structures-set).

## Animation

### NEB with Manually-Generated Images

We demonstrate the above-mentioned steps involved in the creation and execution of an NEB-based reaction energy profile computation on H3 molecules using the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) simulation engine in the following animation. 

Here, we have made use of the constrained interpolated set containing 3 intermediate images generated manually in a [separate tutorial](../../materials/interpolated-sets.md). It can be deduced from the final result for the energy reaction profile that the size of the activation barrier in this case is of 0.2 eV. This result is in good agreement with those published in the literature for the same collinear proton transfer chemical reaction (see for example page 26 in Ref. [^2]).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/1-B2Cf7nfzI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### NEB with Automatically Generated Images

We can repeat the same reaction profile calculation for H3 molecules as above, but this time taking advantage of the Quantum ESPRESSO feature for the automatic generation of intermediate images mentioned previously. This effectively makes it redundant to import manually an interpolated set, such as was done in the previous video. 

This feature can be enabled by selecting an appropriate number of intermediate images to be generated under the ["Important Settings" Tab]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) of the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/overview/), as demonstrated in the following animation, where we select to generate a total of 5 intermediate images. In this case, only the initial and final images need to be imported manually into Job Designer.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/m7HoFpXZ57k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Quantum ESPRESSO NEB Example, Official GitHub Repository](https://github.com/maxhutch/quantum-espresso/tree/master/NEB/examples/example01)

[^2]: [Guido Fratesi: "Low Temperature methane-to-methanol conversion on transition metal surfaces", Ph.D Thesis](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.378.7331&rep=rep1&type=pdf)
