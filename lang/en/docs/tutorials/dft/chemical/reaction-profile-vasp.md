# Calculate Reaction Energy Profile Using Nudged Elastic Band (NEB) method

This tutorial page explains how to calculate the energy reaction profile and activation barrier for the multi-dimensional energy space of chemical reactions via the **Nudged Elastic Bands (NEB) method**, by making use of the [interpolated sets]({{ interface_url }}/materials-designer/header-menu/advanced/interpolated-set/) of intermediate image structures introduced in a [separate tutorial](../../materials/interpolated-sets.md).

We consider the example of a one-dimensional, three-atom molecule of Hydrogen (H3) throughout the present tutorial, and shall be making use of [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) as the main simulation engine. 

Only the aspects of NEB calculations which are specific to VASP will be reviewed here. For a more general introduction to how such calculations are performed and defined on our platform, the reader is referred to [this alternative tutorial page](reaction-profile-qe.md). The same collinear proton transfer chemical reaction of the H3 molecule as in this latter tutorial will be investigated here.

!!!note "VASP version considered in this tutorial"
    The present tutorial is written for VASP at versions 5.3.5 or 5.4.4.

## Workflow Structure

General instructions on how NEB is implemented under VASP can be found in Ref. [^1]. An example demonstration of VASP NEB capabilities, for calculating the energy barrier in the case of the self-diffusion of a Pt-adatom on Pt (001), is offered in Ref. [^2].

Most importantly, VASP expects there to be a group of pre-existing [set folders]({{ reference_url }}/entities-general/sets/), within the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials, named "00" (initial) to "0N" (final), each containing the POSCAR structure file for each of the N images constituting the interpolated set under consideration. All output files (OUTCAR, CONTCAR, OSZICAR etc...) of the NEB-steps run are written to these same directories. These sets are generated automatically on our platform, as explained in what follows.
 
We describe now the overall structure of the [Workflow]({{ reference_url }}/workflows/overview/) used for executing NEB calculations on our platform via [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/), which is composed of three main [subworkflow]({{ reference_url }}/workflows/components/subworkflows/) operations.

!!!warning "Restrictions on number of computing cores"
    The number of cores on which VASP is run for NEB purposes has to be an integer multiple of the total number of *intermediate* images. Hence, if the user is working with 2 intermediate images, the number of cores selected should be 2, 4, 6, or all other even numbers.

### 1. Calculate Initial/Final Total Energies

One important point about the VASP NEB workflow is that VASP does not run the calculation for initial and final image structures within the interpolated set.

Consequently, the first subworkflow step consists in executing a pair of self-consistent field (SCF) ground-state energy computations, in order to extract the [total energy]({{ reference_url }}/properties-directory/scalar/total-energy/) for both the initial and final images.

This first subworkflow has a separate compute configuration, independent from the rest of the workflow, that can be adjusted by the user under its ["Compute" Tab]({{ interface_url }}/workflow-designer/subworkflow-editor/compute/). The reason is that if there are 10 images, at least 10 cores are needed, as mentioned before, but such a large number of cores is not necessarily required for the initial/final total energy SCF calculations performed in the present step.

We also remind the reader that the size of the [grid of reciprocal k-points (kgrid)]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) should be set to 1 x 1 x 1 for the case of chemical molecules, such as those considered in the present tutorial. This option can be set under the ["Important Settings" Tab]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) of the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/overview/).

### 2. Prepare Directories 

The second subworkflow runs a [shell script]({{ reference_url }}/software-directory/scripting/shell/overview/) which prepares the aforementioned directories necessary to run a VASP NEB calculation. This script first puts the initial POSCAR structure file into a set directory named "00", the final one into "0N", and the remaining intermediate images in "01" to "0(N-1)". 

The outputs of the previous subworkflow on the SCF calculations applied to the initial and final images are here copied into the initial (00) and final (0N) directories respectively.

### 3. Nudged Elastic Band (NEB) Calculation

The third and final subworkflow executes the NEB computation itself through VASP. We note the following important input parameters within the VASP "INCAR" input script:

- "IMAGES" defines the number of interpolated image geometries between the initial and final states within the interpolated set under investigation. This tag is documented in detail in Ref. [^3]. 

- "SPRING" defines the spring constant, in eV/Ang^2, between the images. A negative value turns on nudging.

- "MAGMOM" ensures that the protons have opposite spins. This parameter has to be explicitly set in order to obtain the correct activation barrier, since the VASP NEB routine does not by itself relax the spins.

- "EDIFFG" is important to get the properly relaxed intermediate states, since the default parameters might not be enough. More specifically, this parameter defines the break condition for the ionic relaxation loop. If EDIFFG is negative, such as in our case, the relaxation will stop if all forces are smaller than the absolute value set for this parameter. 

An example of INCAR input script for an NEB calculation with VASP is shown below:

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

Additional information on further possible input parameters available for VASP NEB calculations can be retrieved in Ref. [^4].

!!!note "Redundant "number of intermediate images" option"
    The number of intermediate images under "Important Settings" is not used at present for VASP. It will be enabled when support will be added for generating images automatically on our platform.  
    
## Import Interpolated Set

The constrained **Interpolated Set** generated in [this other tutorial](../../materials/interpolated-sets.md) under the name "NEB CONSTRAINED SET", containing the initial, final and a total of 3 intermediate images of the H3 molecule under investigation, should then be [selected and imported]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) into the ["Materials Viewer" Tab]({{ interface_url }}/jobs-designer/materials-tab/) of the NEB VASP job being [designed]({{ interface_url }}/jobs-designer/overview/). This is done by [selecting]({{ interface_url }}/entities-general/actions/select/) all images contained in the set at the moment of import.                                        

## Create and Submit Job

The same set of instructions as in the [alternative NEB tutorial](reaction-profile-qe.md#create-job-and-choose-workflow) should now be followed for [importing]({{ interface_url }}/workflows/actions/copy-bank/) the relevant VASP NEB [workflow]({{ reference_url }}/workflows/overview/) from the [bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/), and for later [selecting and adding it]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) into the new [Job]({{ reference_url }}/jobs/overview/) being [designed]({{ interface_url }}/jobs-designer/overview/).

## Retrieve Final Optimized Images

The final optimized image structures can be retrieved at the end of Job execution according to the instructions contained [in this page]({{ reference_url }}/workflows/addons/structural-relaxation/#initial/final-structures-set).

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of an NEB-based reaction energy profile computation on H3 molecules, using the [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) simulation engine, in the following animation. Because we are working with 3 intermediate images, we run the NEB [Job]({{ reference_url }}/jobs/overview/) on a total of 6 cores, which is a multiple of 3 as required.

It can be deduced from the final results for the energy reaction profile, available under the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/), that the size of the activation energy barrier in this case is of about 0.2 eV, in agreement with the outcome of the [other NEB Tutorial](reaction-profile-qe.md).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/-ZKK8xTrmSY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [TS search using the NEB Method, Official VASP Documentation](https://cms.mpi.univie.ac.at/wiki/index.php/TS_search_using_the_NEB_Method)

[^2]: [Collective jumps of a Pt adatom on fcc-Pt (001): Nudged Elastic Band Calculation, Official VASP Documentation](https://cms.mpi.univie.ac.at/wiki/index.php/Collective_jumps_of_a_Pt_adatom_on_fcc-Pt_(001):_Nudged_Elastic_Band_Calculation)

[^3]: [Instructions on how to generate Images, Official VASP Documentation](https://cms.mpi.univie.ac.at/wiki/index.php/IMAGES)

[^4]: [Transition State Theory: Nudged Elastic Band with VASP, University of Texas Website](http://theory.cm.utexas.edu/vtsttools/neb.html)
