# Important Settings

An example of appearance of the "Important Settings" tab within the [Subworkflow Editor Interface]({{ interface_url }}/workflow-designer/subworkflow-editor/overview/) of [Workflow Designer]({{ interface_url }}/workflow-designer/overview/), for the case of a basic ground-state total energy subworkflow calculation performed with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) (comprising a single Unit of type "pw-scf"), is illustrated in the image below. 

![Important Settings](../../images/workflow-designer/important-settings-tab.png "Important Settings")

In this image, the two most common types of [input parameters](parameters.md) encountered in general [DFT calculations](../../models-directory/dft/overview.md) implemented via the [Plane-wave Pseudopotential Method](overview.md) are both shown to be contained as part of this total energy subworkflow. They consist in, respectively, the wavefunction and the density "cutoffs", and the size of the grid of reciprocal k-points (the so-called "kgrid").

## Cutoff 

The initial section of the "Important Settings" tab titled "cutoffs" contains settings which are always global to all units in the current subworkflow. In particular, under the label "wavefunction", the user can enter the plane-wave cutoff parameter for expanding the electronic wavefunction of the crystal. It is expressed in the corresponding default energy units for the current [application](../../software/components.md) of choice. For example, Rydbergs for [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/), and electronVolts (eV) for the [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) code.

This cutoff parameter is of crucial importance for establishing the overall [precision](../../methods/precision.md) of the DFT calculation, and a judicious choice will usually depend on the conduction of a preliminary [convergence test](../../workflows/addons/convergence-algorithms.md) to ensure that the desired precision in the total energy is reached. For instructions on how to add a preliminary convergence subworkflow add-on to the current workflow, see [this page]({{ interface_url }}/workflow-designer/subworkflow-editor/actions-menu/).

In the text field directly to the right, under the label "density", the user can then also set the cutoff for the electronic charge density and potential (in the same application-dependent units as the previously-described plane-waves cutoff). For norm-conserving or PAW pseudopotentials [subtypes](parameters.md#pseudopotential), a value of four times the aforementioned wavefunction cutoff parameter is recommended, whereas for Ultra-Soft pseudopotentials a higher value between eight and twelve times the wavefunction cutoff is typically more suitable.

## k-points grid 

The settings in the "kgrid" section are normally unit-specific. The name of the subworkflow unit to which each kgrid settings section applies is indicated on top of each section.

Under these kgrid settings lies the choice for the size and density of the grid of reciprocal electronic k-points, as described in the [corresponding page](../../models/auxiliary-concepts/reciprocal-space/sampling.md).

## Reciprocal path 

Sections containing unit-specific settings labelled either "kpath", "qpath", or "ipath", are necessary for defining the path in reciprocal space as part of a subworkflow for calculating band structure or phonon dispersion curves. The name of the unit to which each one of these settings sections applies is indicated on top of each section. Please refer to [this page](../../models/auxiliary-concepts/reciprocal-space/paths.md) for more detailed explanations.

## Pseudopotentials

The "Method" section of the "Overview" tab interface allows the user to choose which particular pseudopotential file to implement as part of the current subworkflow computations. A comprehensive set of pseudopotentials for most elements in the periodic table is already included on our platform and made available for user selection. In addition, we explain how to upload a custom Pseudopotential file through the "Method" section [in this page](actions.md).
