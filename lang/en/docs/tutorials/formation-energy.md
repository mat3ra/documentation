<!-- As of 2024-10-17, this tutorial is unused -->

# Formation Energy - VASP

This page explains how to calculate formation energy[^1] based on density
functional theory[^2]. We will be studying copper oxide CuO<sub>2</sub> and use
VASP[^3] as our simulation engine.

!!! Note "Pre-calculated energy values for default pseudopotentials"
    Formation energy requires the knowledge of the total and zero point energies
    of constituents in their standard state. We have pre-calculated these values
    at a converged k-point density for all supported pseudopotentials. These
    values are automatically populated to eliminate the need to recalculate them
    again.


## Import Material

Click on "Create a Job" from left-hand sidebar on the home page. Silicon will
automatically be loaded as it is the default material. The formation energy of
elements is zero, so for this test case we will need to import CuO<sub>2</sub>
structure.

To import CuO<sub>2</sub> use sidebar again, and select the "Materials" page.
Then click the cloud button on the upper right of that page to initiate import.
In the search box, put CuO<sub>2</sub> and after a few seconds, the entries for
CuO<sub>2</sub> from [materialsproject.org](
https://materialsproject.org){:target="_blank"} will appear.

Choose the version of CuO<sub>2</sub> with the lowest formation energy and click
on it. Then click on the right side of the entry to bring up the option to
import the material

<img data-gifffer="/images/tutorials/ImportCuO2.gif" />

## Create job

Now that you have imported CuO<sub>2</sub> we are ready to use that structure to
reproduce formation energy calculation. Click "Create Job" link again. If you go
to the "Choose A Material" section of the page, and click on the drop-down menu,
CuO<sub>2</sub> should be one of your options to select as the material for the
simulation.

<img data-gifffer="/images/tutorials/CreateCuO2.gif" />

## Choose workflow

Next go to the workflow tab and select "Formation Energy" as the workflow type.
The units displayed as part of this workflow will look similar to a combination
of the [kpt-convergence](dft/addons/kpt-convergence.md) and [relaxation tutorials](
dft/addons/structural-relaxation.md), but will include a couple of extra units after the vc_relax unit
used to obtain the elements total and zero point energies and calculate the
formation energy.

<img data-gifffer="/images/tutorials/SetFormationEnergyWorkflow.gif" />

## Submit job

This calculation will take some time to complete due to both k-point convergence
and relaxation being run on a relatively large supercell. It's important to
adjust the computation parameters accordingly. Click on the "Compute" tab and
increase the maximum run time limit to 30 minutes and the number of cores to 4.
Also click on your username in the box to turn on email notifications about the
jobs status.

<img data-gifffer="/images/tutorials/IncreaseComputeFormationE.gif" />

## Monitor status

As each unit in the workflow is executing, you can monitor its progress live by
viewing both the output of the executable as well as a graphical representation
of the total energy convergence on the "Status" tab under each unit's sub-tab.

<img data-gifffer="/images/tutorials/FormationEnergyTrackResults.gif" />

## Check results

When the execution of all units finished, switching to the Results tab and the
sub-tab for the final execution unit will have an entry titled "Formation
Energy" that will display formation energy of the material. The more
negative the value, the more stable the material is. This "Formation Energy" box
will also show the energetic parameters (total energy and zero-point energy) for
constituent elements used to calculate the property.

<img data-gifffer="/images/tutorials/FinalFormationEnergy.png" />

[^1]: [Formation Energy (Wikipedia)](https://en.wikipedia.org/wiki/Standard_Gibbs_free_energy_of_formation)
[^2]: [Density Functional Theory (Wikipedia)](https://en.wikipedia.org/wiki/Density_functional_theory)
[^3]: [Vienna ab-inito simulation package (Official Website)](https://www.vasp.at/)
