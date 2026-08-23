# Schemas for Material Properties

We present throughout this page a list of JSON schemas and example representations concerning [properties]({{ reference_url }}/properties-directory/overview/). The reader is referred to their respective documentation pages, accessible by clicking the headers below, for a review of their underlying physical significance.

## Scalar Properties

### [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/)

Total energy contains the total energy of the unit cell.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/total_energy.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/total_energy.json"
    ```

### [Zero Point Energy]({{ reference_url }}/properties-directory/scalar/zero-point-energy/)

Some residual thermal vibrational energy is left at zero temperature due to quantum effects, and is referred to as Zero Point Energy.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/zero_point_energy.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/zero_point_energy.json"
    ```

### [Fermi Energy]({{ reference_url }}/properties-directory/scalar/fermi-energy/)

The Fermi energy marks the highest occupied energy level in a solid.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/fermi_energy.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/fermi_energy.json"
    ```

### [Total Energy Contributions]({{ reference_url }}/properties-directory/scalar/total-energy/#total-energy-contributions)

Total energy contributions contains information about the components in the total energy of the unit cell. The contributions available will depend on the type of method and software used.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/total_energy_contributions.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/total_energy_contributions.json"
    ```

### [Formation Energy]({{ reference_url }}/properties-directory/scalar/formation-energy/)

The Formation energy represents the energy required to create a defect in an otherwise perfect solid structure.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/formation_energy.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/formation_energy.json"
    ```

### [Surface Energy]({{ reference_url }}/properties-directory/scalar/surface-energy/)

The energy of a surface can also be computed.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/surface_energy.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/surface_energy.json"
    ```

### [Pressure]({{ reference_url }}/properties-directory/scalar/pressure/)

Pressure contains the average internal pressure of the unit cell.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/pressure.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/pressure.json"
    ```

### [Total Force]({{ reference_url }}/properties-directory/scalar/total-force/)

This is the total average force present within the crystal structure.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/total_force.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/total_force.json"
    ```

### [Valence Band Offset]({{ reference_url }}/properties-directory/scalar/valence-band-offset/)

The valence band offset represents the energy difference of valence bands across a heterostructure interface.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/valence_band_offset.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/valence_band_offset.json"
    ```

## Non-Scalar Properties

### [Bandstructure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/)

Band structure shows the energy of electronic states (bands) as a function of k-point position throughout the cell.


=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/band_structure.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/band_structure.json"
    ```

### [Band Gaps]({{ reference_url }}/properties-directory/non-scalar/band-gaps/)

Band gap is the difference in energy from the highest occupied electronic state (Fermi energy at 0K) to the lowest unoccupied state.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/band_gaps.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/band_gaps.json"
    ```

### [Electronic Density of States]({{ reference_url }}/properties-directory/non-scalar/electronic-dos/)

Density of states contains information on the number of electronic states as a function of energy. It may include the atom resolved partial density of states and electron states in some cases. In addition it may also contain information about each atom’s spin state as well.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/density_of_states.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/density_of_states.json"
    ```

### [File Content]({{ reference_url }}/properties-directory/non-scalar/file-content/)

Tags a file for display on the results tab of the web-app.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/file_content.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/file_content.json"
    ```

### [Reaction Energy Profile]({{ reference_url }}/properties-directory/non-scalar/reaction-energy-profile/)

The energy profile of a chemical reaction is a representation of its energetic pathway, followed by the reactants as they are transformed into products.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/reaction_energy_profile.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/reaction_energy_profile.json"
    ```

### [Reaction Energy Barrier]({{ reference_url }}/properties-directory/scalar/reaction-energy-barrier/)

The Reaction Energy Barrier marks the highest energy state encountered during the course of the progress of a chemical reaction.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/reaction_energy_barrier.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/reaction_energy_barrier.json"
    ```

### [Phonon Dispersions]({{ reference_url }}/properties-directory/non-scalar/phonon-dispersions/)

Lattice vibrations can be plotted in the form of phonon frequency dispersion plots across the reciprocal k-space of the crystal structure.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/phonon_dispersions.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/phonon_dispersions.json"
    ```

### [Phonon Density of States]({{ reference_url }}/properties-directory/non-scalar/phonon-dos/)

The Density of States for phonons can also be computed.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/phonon_dos.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/phonon_dos.json"
    ```

### [Stress Tensor]({{ reference_url }}/properties-directory/non-scalar/stress-tensor/)

Stress tensor contains a 3x3 matrix of the stress components of the unit cell.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/non-scalar/stress_tensor.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/non-scalar/stress_tensor.json"
    ```

### [Workflow]({{ reference_url }}/properties-directory/non-scalar/workflow/)

Some jobs can result in the generation of new workflows, which will be placed in the user's account.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow.json"
    ```

## Elemental Properties

### [Atomic Radius]({{ reference_url }}/properties-directory/elemental/atomic-radius/)

The atomic radius represents the average distance between the nucleus of an atom and the edges of its surrounding electron cloud.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/elemental/atomic_radius.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/elemental/atomic_radius.json"
    ```

### [Electronegativity]({{ reference_url }}/properties-directory/elemental/electronegativity/)

The electronegativity describes the capacity of an atom to attract the electrons involved in chemical bonding.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/elemental/electronegativity.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/elemental/electronegativity.json"
    ```

### [Ionization Potential]({{ reference_url }}/properties-directory/elemental/ionization-potential/)

The ionization energy (or potential) measures the energy required to strip an atom from its most loosely bound valence electron.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/elemental/ionization_potential.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/elemental/ionization_potential.json"
    ```

## Structural Properties

### [Atomic Forces]({{ reference_url }}/properties-directory/structural/atomic-forces/)

Forces may exist between atoms in a crystal structure if they are displaced away from their equilibrium configuration.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/atomic_forces.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/atomic_forces.json"
    ```

### [Atomic Coordinates]({{ reference_url }}/properties-directory/structural/basis/)

Contains information about the coordinates of atoms within the unit cell by id.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/basis/atomic_coordinates.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/basis/atomic_coordinates.json"
    ```

### [Atomic Elements]({{ reference_url }}/properties-directory/structural/basis/)

Contains an array of the elements in the unit cell and the atom id’s association with each atom.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/basis/atomic_element.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/basis/atomic_element.json"
    ```

### [Atomic Constraints]({{ reference_url }}/properties-directory/structural/basis/)

Contains information about the spatial constraints on the movement of atoms.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/basis/atomic_constraints.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/basis/atomic_constraints.json"
    ```

### [Basis]({{ reference_url }}/properties-directory/structural/basis/)

Basis defines elemental and geometrical constitution of the unit cell.


=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/basis.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/basis.json"
    ```

### [Bravais Lattice]({{ reference_url }}/properties-directory/structural/lattice/)

Lattice Bravais holds information about the three-dimensional periodic structure specified implicitly through lengths and angles between lattice vectors, and their units.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/lattice/lattice_bravais.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/lattice/lattice_bravais.json"
    ```

### [Lattice Vectors]({{ reference_url }}/properties-directory/structural/lattice/)

Lattice vectors holds information about the three-dimensional periodic structure explicitly, by specifying the three lattice vectors and their units.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/lattice/lattice_vectors.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/lattice/lattice_vectors.json"
    ```

### [Density]({{ reference_url }}/properties-directory/structural/lattice/#volume-and-density)

The Density of the material is defined by the sum of the atomic masses within the unit cell, divided by its volume.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/density.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/density.json"
    ```

### [Elemental Ratio]({{ reference_url }}/properties-directory/structural/basis/#elemental-ratio)

The elemental ratio is given by the fraction of all atoms in a crystal which are composed of a certain element.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/elemental_ratio.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/elemental_ratio.json"
    ```

### [InChI]({{ reference_url }}/properties-directory/structural/inchi/)

The International Chemical Identifier[^1] used to identify molecules.
=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/inchi.json"
    ```
=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/inchi.json"
    ```

### [InChIKey]({{ reference_url }}/properties-directory/structural/inchi-key/)

The fixed-length non-human readable string derived from an **InChI**.
=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/inchi_key.json"
    ```
=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/inchi_key.json"
    ```

### [Magnetic Moments]({{ reference_url }}/properties-directory/structural/magnetic-moment/)

The magnetic moment of ferromagnetic materials can also be computed.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/magnetic_moments.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/magnetic_moments.json"
    ```

### [P Norm]({{ reference_url }}/properties-directory/structural/lattice/)

The P norm measures how homogeneous a material is in terms of its chemical composition.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/p-norm.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/p-norm.json"
    ```

### [Symmetry]({{ reference_url }}/properties-directory/structural/symmetry/)

The symmetry of the structure, indicating the point group and space group.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/symmetry.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/symmetry.json"
    ```

### [Volume]({{ reference_url }}/properties-directory/structural/lattice/)

The volume of the unit cell is given by the scalar triple product of the lattice vectors.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/structural/volume.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/structural/volume.json"
    ```


## Links
[^1]: [Wikipedia - International Chemical Identifier (Website)](https://en.wikipedia.org/wiki/International_Chemical_Identifier)
