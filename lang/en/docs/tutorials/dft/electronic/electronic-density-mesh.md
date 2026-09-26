# Electronic Charge Density Mesh Calculation

This tutorial explains how to calculate and visualize the electronic charge density mesh of crystalline silicon in its standard equilibrium cubic-diamond crystal structure, based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT). [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) is used as the simulation engine.

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.


## 1. Create a job

Silicon in its cubic-diamond crystal structure is the [default material]({{ reference_url }}/materials/default/) loaded on [new job creation]({{ interface_url }}/jobs-designer/overview/), unless the default was [changed]({{ interface_url }}/entities-general/actions/set-default/) after [account]({{ reference_url }}/accounts/overview/) creation. If silicon is still the default, it is automatically loaded when the [Job Designer]({{ interface_url }}/jobs-designer/overview/) is [opened]({{ interface_url }}/jobs/actions/create/).


## 2. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the electronic density mesh through [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 3. Set sampling in reciprocal space

A high [k-point density]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is critical for computing the electronic density with sufficient accuracy and for properly visualizing the resulting charge density iso-surfaces.

For Quantum ESPRESSO, the "Electronic Density Mesh" workflow contains a single [unit]({{ reference_url }}/workflows/components/units/) that produces an output file called **density.xsf**.

The k-point grid is set to 18 × 18 × 18. The validity of this grid size for yielding meV-level accuracy can be verified by performing a [convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) should be reviewed to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Silicon is a small structure, so 4 CPUs and 1 minute of calculation runtime are sufficient.


## 5. Examine the results

Once the computation completes, the [Files tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) shows the files and directories associated with the job. The file of interest is "density.xsf", which contains the electronic charge density.


## 6. Open the Remote Desktop

In order to visualize the electron density mesh graphically, a [Remote Desktop Connection]({{ cli_url }}/remote-connection/remote-desktop/) should be opened so that graphical [visualization tools]({{ reference_url }}/software-directory/overview/#analysis-tools) can be run. Instructions for opening the [Remote Desktop Interface]({{ cli_url }}/remote-connection/remote-desktop/) are available [here]({{ cli_url }}/remote-connection/actions/open-desktop/).

> If the [default project]({{ reference_url }}/jobs/projects/) was used, the "density.xsf" file is located at: `/home/<username>/data/<username>/<job name>/`. The full path is also shown in the [Files tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).


## 7. Visualize charge density with XCrySDen

Open the [XCrySDen]({{ reference_url }}/software-directory/analysis/xcrysden/) application. Navigate to `File` → `Open`, and browse to the [directory]({{ resources_url }}/data-on-disk/directories/) where "density.xsf" was saved. The charge density is then displayed. Adjust the iso-surface value and toggle the iso-surface buttons to explore the data.


## 8. Visualize charge density with VESTA

Alternatively, open the [VESTA]({{ reference_url }}/software-directory/analysis/vesta/) application. Navigate to `File` → `Open` and browse to the directory containing "density.xsf". The electron density is displayed in the VESTA interface.


## 9. Video walkthrough

The animation below demonstrates the steps involved in creating, executing, and visualizing an electronic charge density mesh computation on silicon using Quantum ESPRESSO and [VESTA]({{ reference_url }}/software-directory/analysis/vesta/).

In the final part of the animation, the iso-surface value is adjusted to make the electronic density visible as yellow iso-surfaces, showing how the electron density is concentrated around the second atom in the two-atom [basis]({{ reference_url }}/properties-directory/structural/basis/) of crystalline silicon. The electron densities around other atoms are truncated by the sides of the unit cell (appearing as blue planes on the edges).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/N4Dk-lWXoY4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
