# Electronic Charge Density Mesh Calculation

This tutorial page explains how to calculate and visualize the electronic charge density mesh based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We consider crystalline silicon in its standard equilibrium cubic-diamond crystal structure, and use [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as our main simulation engine during this tutorial.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.

## Create job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) that is shown on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless this default was [changed]({{ interface_url }}/entities-general/actions/set-default/) by the user following [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default choice, it will as such be automatically loaded at the moment of the [opening]({{ interface_url }}/jobs/actions/create/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/).

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the electronic density mesh through [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

## Set Sampling in Reciprocal Space

It is critical to have a high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) in order to calculate the electronic density with sufficient accuracy and to properly visualize the resulting charge density iso-surfaces.

For Quantum ESPRESSO, the workflow for "Electronic Density Mesh" contains only one [unit]({{ reference_url }}/workflows/components/units/) that produces an output file called **density.xsf**.

We set the size of the grid of k-points to 18 x 18 x 18 in the first workflow unit. This provides a dense enough k-point sampling in order to resolve the fine features present within the electron charge density mesh. The validity of this choice of k-grid size for yielding accurate results of order meV in the final energy can be verified by performing the relevant [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and inspect the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) included therein.  Silicon is a small structure, so 4 CPUs and 1 minute of calculation runtime should be sufficient.

## Examine Results

Once the computation is complete at the end of Job execution, switching to the [Files tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show a listing of the files and directories on the system associated with the electronic density job under consideration.
 
The file that is of interest to us in this case is the aforementioned "density.xsf" output file, containing the results for the electronic charge density computation. 

## Preparing for Visualization

### Open remote Desktop

Following Job execution, we are now ready to visualize graphically the electron density mesh. The next step is to open a [Remote Desktop Connection]({{ cli_url }}/remote-connection/remote-desktop/) so that graphical interface programs for [visualization]({{ reference_url }}/software-directory/overview/#analysis-tools) purposes can be run. Instructions on how to open the [Remote Desktop Interface]({{ cli_url }}/remote-connection/remote-desktop/) starting from our [Web Interface]({{ interface_url }}/ui/overview/) can be found [here]({{ cli_url }}/remote-connection/actions/open-desktop/).

### Open visualization software

The next steps depend on the [analysis and visualization software]({{ reference_url }}/software-directory/overview/#analysis-tools) preferred by the user. We provide below two examples supported on our platform, for the cases of [XCrysden]({{ reference_url }}/software-directory/analysis/xcrysden/) and [VESTA]({{ reference_url }}/software-directory/analysis/vesta/) respectively. Instructions on how to open Applications in the Remote Desktop Environment can be retrieved [in this page]({{ cli_url }}/remote-connection/actions-rd/open-app/).

> If the [default project]({{ reference_url }}/jobs/projects/) was used for the electron charge density calculation, then the location of the "density.xsf" output file referenced in what follows will be: `/home/<username>/data/<username>/<job name>/`. Otherwise, the full path to the file is shown underneath the filename among the list of entries in the [Files tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).

## Visualize Charge Density with XCrysden

The user should first open the [XCrysden]({{ reference_url }}/software-directory/analysis/xcrysden/) analysis and visualization software suite.

Within XCrysden, the user should first go to "File" > "Open", and then navigate to the [directory]({{ resources_url }}/data-on-disk/directories/) where the "density.xsf" electron density file was saved by the previously-executed Job. This opens the file for a visualization of the electron density.

At this stage, the user can adjust the value of charge density to be shown, and toggle the isosurface buttons to display the corresponding data.

## Visualize Charge Density with Vesta

The user can alternatively open the [VESTA]({{ reference_url }}/software-directory/analysis/vesta/) analysis and visualization software package, for achieving the same objective and purpose as with [XCrysden]({{ reference_url }}/software-directory/analysis/xcrysden/) described above.

Within VESTA, first go to file->Open and then browse to the directory where the electron density file (density.xsf) is located. This file should be opened in order to visualize the electron density of the material under investigation.

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of an electronic charge density mesh computation workflow on silicon, using the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) simulation engine, in the following animation. 

In this particular example, we consider the usage of [VESTA]({{ reference_url }}/software-directory/analysis/vesta/) for visualizing the output contents of the electron charge density file. In the final part of the animation, we adjust the iso-surface value to have the electronic density more visible as yellow iso-surfaces, demonstrating how the electron density within the dimensions of the unit cell is highly concentrated around the second atom in the two-atom [basis]({{ reference_url }}/properties-directory/structural/basis/) of crystalline silicon. The electron densities around the other atoms do not fully show up in this visualization, since their iso-surfaces are truncated by the sides of the unit cell (this truncation shows up as blue planes on the edges of the unit cell).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/N4Dk-lWXoY4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
