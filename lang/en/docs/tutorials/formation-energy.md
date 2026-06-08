<!-- As of 2024-10-17, this tutorial is unused -->

# Formation Energy — VASP

!!!warning "Unused tutorial"
    This tutorial is not currently linked in the main navigation. It is retained for reference.

This page explains how to calculate [formation energy](https://en.wikipedia.org/wiki/Standard_Gibbs_free_energy_of_formation) [^1] based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) [^2]. The example uses copper oxide CuO<sub>2</sub> with [VASP](https://www.vasp.at/) [^3] as the simulation engine.

!!!note "Pre-calculated energy values for default pseudopotentials"
    Formation energy requires the total and zero-point energies of constituents in their standard state. These values have been pre-calculated at a converged k-point density for all supported pseudopotentials and are populated automatically.


## 1. Import the material

Click **Create a Job** from the left-hand sidebar on the home page. Silicon is loaded automatically as the default material. Since the formation energy of elements is zero, a compound structure — CuO<sub>2</sub> — is needed for this example.

In order to import CuO<sub>2</sub>, open the sidebar again and select the *Materials* page. Then click the cloud button in the upper right of that page to initiate an import. In the search box, enter CuO<sub>2</sub>; after a few seconds, entries from [materialsproject.org](https://materialsproject.org){:target="_blank"} appear.

Select the version of CuO<sub>2</sub> with the lowest formation energy and click it. Then click the right side of the entry to bring up the option to import the material.

<img data-gifffer="/images/tutorials/ImportCuO2.gif" />


## 2. Create the job

After importing CuO<sub>2</sub>, click **Create Job** again. Under the *Choose A Material* section, open the drop-down menu — CuO<sub>2</sub> should appear as one of the selectable materials.

<img data-gifffer="/images/tutorials/CreateCuO2.gif" />


## 3. Select the workflow

Navigate to the workflow tab and select *Formation Energy* as the workflow type. The units displayed are similar to a combination of the [k-point convergence](dft/addons/kpt-convergence.md) and [relaxation](dft/addons/structural-relaxation.md) tutorials, with additional units after vc_relax for obtaining elemental total and zero-point energies and calculating the formation energy.

<img data-gifffer="/images/tutorials/SetFormationEnergyWorkflow.gif" />


## 4. Submit the job

This calculation takes some time due to both k-point convergence and relaxation being run on a relatively large supercell. The computation parameters should be adjusted accordingly: click the *Compute* tab, increase the maximum runtime limit to 30 minutes, and set the number of cores to 4. Email notifications can be enabled by clicking the username in the notifications box.

<img data-gifffer="/images/tutorials/IncreaseComputeFormationE.gif" />


## 5. Monitor status

As each unit in the workflow executes, its progress can be monitored in real time by viewing both the output of the executable and the graphical representation of total energy convergence on the *Status* tab under each unit's sub-tab.

<img data-gifffer="/images/tutorials/FormationEnergyTrackResults.gif" />


## 6. Check the results

Once all units have completed, switching to the *Results* tab and the sub-tab for the final execution unit reveals an entry titled *Formation Energy* that displays the formation energy of the material. More negative values indicate greater thermodynamic stability. The *Formation Energy* box also shows the energetic parameters (total energy and zero-point energy) for constituent elements used to calculate the property.

<img data-gifffer="/images/tutorials/FinalFormationEnergy.png" />


## 7. Links

[^1]: [Formation Energy (Wikipedia)](https://en.wikipedia.org/wiki/Standard_Gibbs_free_energy_of_formation)
[^2]: [Density Functional Theory (Wikipedia)](https://en.wikipedia.org/wiki/Density_functional_theory)
[^3]: [Vienna Ab-initio Simulation Package (Official Website)](https://www.vasp.at/)
