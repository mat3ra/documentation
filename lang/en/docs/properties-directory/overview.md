# List of Properties

In this section of the documentation, we review in detail the physical relevance and description of each [property](../properties/overview.md) available for computation. 

In each case, we also explain how such results are presented to the user under the interface of the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) within [Jobs Viewer]({{ guide_url }}/jobs/ui/viewer/), when results are extracted from the output of simulations. 

Illustrations of the [JSON schemas](../properties/data/overview.md) and associated examples for each property discussed in the present section are contained [in this page](../properties/data/list.md), and referenced at the end of each property's dedicated description.

At the top of each property's page, we include colored badges referring to the [property classification](../properties/classification/overview.md), distinguishing between [scalar and non-scalar](../properties/classification/general.md#by-data-type) types and between the different types of [Materials Properties](../properties/classification/materials.md).

## Materials Properties

Below we provide a list of Materials properties that can be [extracted](../properties/lifecycle/extractor.md) on our platform. The reader can click each entry to be redirected to the relevant documentation explanation.

### Scalar

| Property                                                                        | Overview                                                                       |
|:--------------------------------------------------------------------------------|:-------------------------------------------------------------------------------|
| [Total Energy](scalar/total-energy.md)                                          | The ground state energy (free energy) of the system                            |
| [Fermi Energy](scalar/fermi-energy.md)                                          | The highest energy level occupied by electrons in a system                     |
| [Surface Energy](scalar/surface-energy.md)                                      | The energy of a crystal surface                                                |
| [Formation Energy](scalar/formation-energy.md)                                  | The energy required to create defects                                          |
| [Reaction Energy Barrier](scalar/reaction-energy-barrier.md)                    | The activation energy required by the reactants to undergo a chemical reaction |
| [Pressure](scalar/pressure.md)                                                  | Scalar average pressure                                                        |
| [Zero Point Energy](scalar/zero-point-energy.md)                                | Energy of the lowest vibrational level wrt to vacuum                           |
| [Total Energy Contributions](scalar/total-energy.md#total-energy-contributions) | Ewald, Exchange correlation and	Hartree contributions to the total energy      |
| [Total Force](scalar/total-force.md)                                            | Sum of the atomic forces                                                       |
| [Valence Band Offset](scalar/valence-band-offset.md)                            | Relative position of the valence band across an interface                      |

### Non-Scalar

| Property                                             | Overview                                         |
|:---------------------------------------------------  |:------------------------------------------------|
| [Stress tensor](non-scalar/stress-tensor.md)         | 3x3 matrix expressing stresses in x, y and z dimensions |
| Charge density                                       | Spatial function of charge distribution |
| [Band Structure](non-scalar/bandstructure.md)        | Electronic Band Structure |
| [Band Gap](non-scalar/band-gaps.md)       | Electronic Band Gap (direct / indirect) |
| [Electronic Density of States](non-scalar/electronic-dos.md)               | Electronic Density of States (including partial contributions) |
| [Phonon Dispersions](non-scalar/phonon-dispersions.md) | The dispersion plot of lattice vibrations (phonons) frequencies |
| [Phonon Density of States](non-scalar/phonon-dos.md) | The Density of States of Phonons |
| [Reaction Energy Profile](non-scalar/reaction-energy-profile.md)    | The energetic pathway followed by a chemical reaction during the course of its progress |


### Structural

| Property                                          | Overview                                         |
|:--------------------------------------------------|:------------------------------------------------|
| [Magnetic Moments](structural/magnetic-moment.md) | The magnetic moment of ferromagnetic materials when the "Magnetism" modifier is activated |
| [Basis Atoms](structural/basis.md)                | The individual atoms comprised in the crystal structure  |
| [Atomic forces](structural/atomic-forces.md)      | Force exerted on each atom by its surrounding |
| [Bravais Lattice](structural/lattice.md)          | The underlying Bravais Lattice of the crystal structure |
| [Symmetry](structural/symmetry.md)                | Information about the symmetry elements contained in crystal structure |
| [Final Structure](structural/final-structure.md)  | The final crystal structure obtained from basis atoms and lattice, and its visualization |
| [InChI](structural/inchi.md)                      | The International Chemical Identifier for a non-periodic structure. |
| [InchiKey](structural/inchi-key.md)               | The fixed length, non-human readable identifier string derived from an InChI for a non-periodic structure. |

### Elemental

| Property                                             | Overview                                         |
|:---------------------------------------------------  |:------------------------------------------------|
| [Atomic Radius](elemental/atomic-radius.md) | The mean distance between atomic nucleus and edge of electron cloud |
| [Electronegativity](elemental/electronegativity.md) | The capacity of the atom to attract shared electrons |
| [Ionization Potential](elemental/ionization-potential.md) | The energy required to strip an atom of its outermost electron |

## Workflow Monitors

Below we list the data points that can be monitored during the course of the execution of a [Workflow](../workflows/overview.md) computation.

| Output information | Overview |
|:---------------   |:------------|
| Standard Output   | Standard output of an execution unit in UNIX sense |
| Ionic Convergence | Convergence information on ionic moves in relaxation or molecular dynamics calculations |
| Electronic Convergence  | Convergence information on self-consistent electronic calculation steps |
