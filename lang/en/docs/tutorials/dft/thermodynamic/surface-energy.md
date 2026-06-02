# Calculate Surface Energy

This tutorial page explains how to calculate the [surface energy]({{ reference_url }}/properties-directory/scalar/surface-energy/) of [materials]({{ reference_url }}/materials/overview/) based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/). We consider crystalline gold in its standard equilibrium face-centred cubic (fcc) crystal structure, and use [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as our main simulation engine during this tutorial.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.

More information on the conduction of surface energy calculations, together with their results on a sample set of materials, can be found in Ref. [^1].

## Create Surface

In order to create a surface of crystalline gold using the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/), the reader should follow the instructions contained in [this page]({{ interface_url }}/materials-designer/header-menu/advanced/surface-slab/).

For the present example, we consider a simple surface for Au 111 and 50% vacuum ratio, keeping the supercell dimensions along x-y to one and the slab thickness to 3 layers (corresponding to roughly 10 Angstroms). This gives a total of 3 atoms of gold within our surface.

## Workflow Structure

We shall now describe the computational implementation of Surface Energy calculations on our platform, illustrating the various [unit]({{ reference_url }}/workflows/components/units/) steps constituting the overall [Workflow]({{ reference_url }}/workflows/overview/). Each unit will now be reviewed in turn:

### io-slab

This [input/output type of unit]({{ reference_url }}/workflows/components/units/#i/o) launches a request to the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials, in order to retrieve the relevant identification information about the material under investigation. This request is made via the corresponding endpoint address of the [Rest API]({{ developers_url }}/rest-api/overview/), and is directed at the material entry with id given by the "MATERIAL_ID" keyword. The material information is then assigned to the variable "DATA".

### slab

This [assignment unit]({{ reference_url }}/workflows/components/units/#assignment) assigns the above-mentioned material information stored under the "DATA" variable to a new variable called "SLAB". The previous unit where DATA was first defined is specified through reference to its scope. 

### io-bulk

This i/o unit sends a query to the account-owned collection of materials, looking again for the "MATERIAL_ID" keyword identifying the material under consideration. This id is stored as metadata within the previously-defined "SLAB" variable.

### bulk

This assignment unit assigns the new variable "BULK" to the identification data of the material extracted by the previous unit, as defined by its scope. Hence at this stage both the "SLAB" and "BULK" variables have been assigned to the same material id.

### assert-bulk

This assertion unit makes sure that the material previously assigned to the "BULK" variable indeed exists inside the account owned collection of materials. Consequently, if the Bulk material does not have any information in the database, an error message is raised that the corresponding surface energy cannot be calculated.

!!!tip "Inclusion of Bulk material properties calculation in Workflow"
    In case the relevant bulk material information is not already contained in the collection database, such property calculations can readily be included at the start of the surface energy workflow. The only relevant bulk material information that is necessary for computing the surface energy is the [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) of the material.

### io-e-bulk

Here, the information about the relevant properties ([Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/)) of the bulk material is extracted. The "exabyteId" is also necessary in this case to retrieve the appropriate properties information.

### e-bulk

At this stage, we assign the new variable "E_BULK" to the total energy of the bulk material retrieved in the previous unit.

### assert-e-bulk

This unit asserts that the total energy of the bulk material is indeed listed within the collection database.

### surface

Assignment units in general allow for [Python]({{ reference_url }}/software-directory/scripting/python/overview/) logic and expressions to be executed. Here, we take advantage of this to compute the magnitude of the vector normal to the surface.

### n-bulk and n-slab

In these two units, the total number of atoms in the bulk and slab material respectively are counted.

### pw_scf

A ground-state energy self-consistent field (SCF) computation is finally performed with [DFT]({{ reference_url }}/models-directory/dft/overview/) in order to calculate the energy of the slab material. Since the slab is by definition always much thinner than it is wide in terms of its cross-sectional area, the size of the [grid of k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) can be set to be smaller in the $z$ dimension than across the $x-y$ cross-section (e.g. 8 x 8 x 1).

### e-slab

The variable "E_SLAB" is assigned to the energy of the slab material computed in the previous step.

### surface-energy

Finally, the last unit gathers together the previously-defined variables "E_BULK" and "E_SLAB" in order to compute the final value for the surface energy of the material under investigation, according to the formula defined [in this page]({{ reference_url }}/properties-directory/scalar/surface-energy/).

## Choose Workflow and Create Job

[Workflows]({{ reference_url }}/workflows/overview/) for calculating the surface energy through [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and inspect the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) included therein. Our slab of gold is a relatively small structure, so four CPUs and a few minutes of calculation runtime should be sufficient.

## Examine results

When all aforementioned [units]({{ reference_url }}/workflows/components/units/) computations are complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the results of the simulation, including the surface energy found for Au (0.049 eV/A^2). This final result is in good agreement with the tabulated value for the same surface orientation of gold [^2].

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a Surface Energy computation workflow on gold using the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) simulation engine in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/Z8GeBovopcM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Tran R., Xu Z., Radhakrishnan B., Winston D., Sun W., Persson K.A., Ong S.P.: "Surface energies of elemental crystals"; Nature Sci. Data., 3 (2016)](https://www.nature.com/articles/sdata201680)

[^2]: [Crystalium Surfaces Database, Website](http://crystalium.materialsvirtuallab.org/)
