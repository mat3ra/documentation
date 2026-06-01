# Basis and Atoms

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Structural</span>

## Crystal Basis

The individual atoms in a [crystal structure](../../materials/classification/crystalline.md) are arranged periodically in three-dimensions according to a **repeating unit**, or **basis** - a set of atoms corresponding to certain chemical **elements** and positions.  

## Example Atomic Structure

A typical example of an atomic arrangement within a material is given by the cubic-diamond crystal structure displayed below. This represents the underlying structural framework of crystalline materials such as Carbon (in the diamond phase), Silicon and Germanium. Atoms are shown here as dark balls, connected by white tubes representing the covalent bonds between them.

![Crystal Atoms](../../images/properties-directory//crystal_atoms.png "Crystal Atoms")

## Atomic Positions

The atomic positions, defining the atom's geometric arrangement within the structure, can be defined and entered in the [basis editor]({{ guide_url }}/materials-designer/source-editor/basis/) of [Materials Designer]({{ guide_url }}/materials-designer/overview/), as separate three-dimensional vectors. Each vector labels the position of the corresponding atom within the unit cell of the crystal, expressed under either a fractional or Cartesian coordinate system. 

Depending on these atomic coordinates, finite [inter-atomic forces](atomic-forces.md) might arise.

## Elemental Ratio 

The ratio of an element in a compound or alloy describes the fraction of all atoms present in the crystal structure which are constituted by that particular element.

## Atomic Constraints

The Atomic Constraints or Selective Dynamics, specifying the constraints on the movement of atoms, can be set in the [basis editor]({{ guide_url }}/materials-designer/source-editor/basis/) of [Materials Designer]({{ guide_url }}/materials-designer/overview/), as three-dimensional boolean vector appending to the atom position. For example, "Si 0.25 0.25 0.25 1 0 1" freezes the movement of "Si" along the "Y" direction.

## Schema 

The JSON schema and an example representation for the properties described in this page can be found for each of the [basis]({{ data_url }}/properties/data/list/#basis), [atomic elements]({{ data_url }}/properties/data/list/#atomic-elements), [atomic positions]({{ data_url }}/properties/data/list/#atomic-coordinates) and [elemental ratio]({{ data_url }}/properties/data/list/#elemental-ratio).

## Links

[^1]: [Wikipedia Bonding in solids, Website](https://en.wikipedia.org/wiki/Bonding_in_solids)
