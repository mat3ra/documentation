# Fermi Surface Calculation

This page explains how to calculate the [Fermi surface]({{ reference_url }}/properties-directory/scalar/fermi-energy/) for metallic copper (Cu) lying in its equilibrium face-centred cubic (fcc) [Bravais Lattice]({{ reference_url }}/properties-directory/structural/lattice/), through the use of [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We will use [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as our simulation engine for this tutorial.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.

## Create Job and Select Material

The user should start by creating a new [Job]({{ reference_url }}/jobs/overview/), through [opening]({{ interface_url }}/jobs/actions/create/) the [Job Designer Interface]({{ interface_url }}/jobs-designer/overview/). The fcc crystal structure of copper should then be [selected and added]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) to the new Job being designed, assuming that this structure is already present among the entries listed in the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials.

## Choose Workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of [materials]({{ reference_url }}/materials/overview/) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

## Set Sampling in Reciprocal Space

It is critical to have a high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) in order to resolve enough details for the Fermi surface plot.

The band structure workflow is composed of two [units]({{ reference_url }}/workflows/components/units/). The first unit specifies the settings for the self-consistent calculation of the energy eigenvalues and wave functions.  The second unit calculation is a non self-consistent calculation using the wave functions and charge density of the previous calculation.

We set the size of the grid of k-points to 18 x 18 x 18 in the first workflow unit. This provides a dense enough k-point sampling in order to resolve the fine features present within the output of the band structure computation. The validity of this choice of k-grid size for yielding accurate results of order meV in the final energy can be verified by performing the relevant [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and examine the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) included therein.  Copper is a small structure, so 4 CPUs and 1 minute of calculation runtime should be sufficient.

## Examine Final Results

When both [unit]({{ reference_url }}/workflows/components/units/) computations are complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the final [total energy]({{ reference_url }}/properties-directory/scalar/total-energy/), the [Fermi energy]({{ reference_url }}/properties-directory/scalar/fermi-energy/), and more information about each execution unit.

The user can also browse the actual input and output files that are part of the calculation under the [Files Tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).

## Generate File with Fermi Surface Information

Once the simulation is complete, the user should [open]({{ cli_url }}/remote-connection/actions/open-terminal/) a [Web Terminal session]({{ cli_url }}/remote-connection/web-terminal/) in order to create a file that is essential for visualizing the Fermi surface. The calculation of Fermi surface can in general be performed using the `fs.x` code, part of the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) distribution. The resulting file in `.bxsf` format can then be read and plotted using the [XCrySDen]({{ reference_url }}/software-directory/analysis/xcrysden/) analysis and visualization software.  

In order to generate the post-processing bxsf file, the user should first navigate from within the [Command Line Interface]({{ cli_url }}/cli/overview/) into the [working directory]({{ cli_url }}/jobs-cli/batch-scripts/directories/) containing the simulation input and output files. Once in this directory, a new input file with the following contents should be written using any [command-line text editor]({{ reference_url }}/software-directory/development/text-editors/) (for example `nano`). This new file should be given the name `fs.in` at the moment of saving:

```bash
&fermi
  outdir='./outdir'
  prefix='__prefix__'
/
```

Afterwards, the following commands should be entered, first for [loading]({{ cli_url }}/cli/actions/modules-actions.md#load-desired-module) the appropriate Quantum ESPRESSO [module]({{ cli_url }}/cli/modules/) under the Command Line Interface [environment]({{ cli_url }}/cli/environment/), and then for running the `fs.x` executable on the previously-created `fs.in` file:

```bash
module load espresso/540-i-174-impi-044
fs.x < fs.in
```   

After the end of the execution of the above commands, the user will notice a new file that has been created in the current working directory called `__prefix__fs.bxsf`. We shall use this file for the ensuing visualization of the Fermi surface with XCrySDen.

Finally, the user should close the Web Terminal session to return to the original [Web Interface]({{ interface_url }}/ui/overview/) of our platform.

## Visualize Fermi Surface

The next step is to [open]({{ cli_url }}/remote-connection/actions/open-desktop/) a [Remote Desktop Connection]({{ cli_url }}/remote-connection/remote-desktop/), so that graphical interface programs for [visualization purposes]({{ reference_url }}/software-directory/overview/#analysis-tools) can be run.  

The user should now find and [open]({{ cli_url }}/remote-connection/actions-rd/open-app/) the [XCrySDen]({{ reference_url }}/software-directory/analysis/xcrysden/) application.

Within XCrysden, the user should go to `File` -> `Open Structure` -> `Open BXSF`, and then navigate to the directory where the aforementioned `__prefix__fs.bxsf` file was created. This opens a graphical visualization of the Fermi surface, as portrayed in the example screenshot below.

![Fermi Surface Copper](../../../images/tutorials/fermi-surface-copper.png "Fermi Surface Copper")

## Animation

We demonstrate the above-mentioned steps involved in the creation, execution and visualization of a Fermi Surface calculation on crystalline copper, using the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) simulation engine, in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/isMCrrRF0F4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
