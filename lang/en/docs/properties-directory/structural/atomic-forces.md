# Atomic Forces

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Mechanical</span>

Atomic Forces define the strength of the bonding interactions between [atoms in a crystal structure](basis.md) away from the most stable (lowest potential energy) equilibrium configuration [^1]. 

They are expressed as a set of vectors, one for each atom in the material, describing the combination of all inter-atomic forces acting upon it originating from all other atoms present in the crystal structure. 

## Example

Atomic forces can be computed as part of any [Workflow](../../workflows/overview.md) executing a total energy self-consistent field calculation.

Under the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) within [Jobs Viewer]({{ guide_url }}/jobs/ui/viewer/), the atomic forces are returned to the user as displayed in the example image below (exhibiting an ideal equilibrium situation with zero force components), expressed in units of eV/Angstroms.

![Atomic forces](../../images/properties-directory//atomic_forces.png "Atomic forces")

## Schema 

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#atomic-forces).

## Links

[^1]: [Wikipedia Interatomic potential, Website](https://en.wikipedia.org/wiki/Interatomic_potential)
