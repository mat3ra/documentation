# Fermi Surface Calculation

This tutorial explains how to calculate and visualize the [Fermi surface]({{ reference_url }}/properties-directory/scalar/fermi-energy/) for metallic copper (Cu) in its equilibrium face-centred cubic (fcc) [Bravais Lattice]({{ reference_url }}/properties-directory/structural/lattice/), based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT). [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) is used as the simulation engine.

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.


## 1. Create a job and select the material

Start by creating a new [Job]({{ reference_url }}/jobs/overview/) through [opening]({{ interface_url }}/jobs/actions/create/) the [Job Designer Interface]({{ interface_url }}/jobs-designer/overview/). The fcc crystal structure of copper should then be [selected and added]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) to the new job, assuming the structure is already present in the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials.


## 2. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the [band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 3. Set sampling in reciprocal space

A high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is critical for resolving the details of the Fermi surface plot.

The band structure workflow is composed of two [units]({{ reference_url }}/workflows/components/units/). The first unit performs a self-consistent field (SCF) calculation of the energy eigenvalues and wave functions. The second unit performs a non-self-consistent calculation using the wave functions and charge density from the first step.

The k-point grid is set to 18 × 18 × 18 in the first workflow unit. The validity of this grid size for yielding meV-level accuracy can be verified by performing a [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) should be reviewed to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Copper is a small structure, so 4 CPUs and 1 minute of calculation runtime are sufficient.


## 5. Examine the results

Once both [unit]({{ reference_url }}/workflows/components/units/) computations complete, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the final [total energy]({{ reference_url }}/properties-directory/scalar/total-energy/), the [Fermi energy]({{ reference_url }}/properties-directory/scalar/fermi-energy/), and additional information about each execution unit.

The actual input and output files can also be browsed under the [Files Tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).


## 6. Generate the Fermi surface file

Once the simulation is complete, a [Web Terminal session]({{ cli_url }}/remote-connection/web-terminal/) should be [opened]({{ cli_url }}/remote-connection/actions/open-terminal/) to create the file needed for Fermi surface visualization. The `fs.x` code, part of the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) distribution, generates a `.bxsf` file that can be plotted using [XCrySDen]({{ reference_url }}/software-directory/analysis/xcrysden/).

First, navigate within the [Command Line Interface]({{ cli_url }}/cli/overview/) into the [working directory]({{ cli_url }}/jobs-cli/batch-scripts/directories/) containing the simulation files. Then, create a new input file named `fs.in` using any [command-line text editor]({{ reference_url }}/software-directory/development/text-editors/) (e.g. `nano`) with the following contents:

```bash
&fermi
  outdir='./outdir'
  prefix='__prefix__'
/
```

Next, load the appropriate Quantum ESPRESSO [module]({{ cli_url }}/cli/modules/) and run the `fs.x` executable:

```bash
module load espresso/540-i-174-impi-044
fs.x < fs.in
```

After execution, a new file called `__prefix__fs.bxsf` appears in the current working directory.

Close the Web Terminal session to return to the [Web Interface]({{ interface_url }}/ui/overview/).


## 7. Visualize the Fermi surface

Open a [Remote Desktop Connection]({{ cli_url }}/remote-connection/remote-desktop/) to run graphical visualization software. Instructions for opening the Remote Desktop are available [here]({{ cli_url }}/remote-connection/actions/open-desktop/).

Find and [open]({{ cli_url }}/remote-connection/actions-rd/open-app/) the [XCrySDen]({{ reference_url }}/software-directory/analysis/xcrysden/) application. Within XCrySDen, navigate to `File` → `Open Structure` → `Open BXSF`, then browse to the directory where `__prefix__fs.bxsf` was created.

![Fermi Surface Copper](../../../images/tutorials/fermi-surface-copper.png "Fermi Surface Copper")


## 8. Video walkthrough

The animation below demonstrates the creation, execution, and visualization of a Fermi surface calculation on crystalline copper using Quantum ESPRESSO.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/isMCrrRF0F4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
