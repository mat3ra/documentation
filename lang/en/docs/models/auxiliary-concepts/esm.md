# Effective Screening Medium

The **Effective Screening Medium (ESM)** [^1] is a computational scheme allowing to simulate **surfaces** and **interfaces**, which are periodic in the direction parallel to the surface, and of arbitrary shape in the perpendicular direction. The method was developed and originally described in Ref. [^2].

The  surface/interface slab system (the "working" region) is typically sandwiched between semi-infinite media, such as vacuum, an electrode, or an electrolyte. Here, we call this latter medium the "effective screening medium" (ESM), such as represented in the image below.

![Editor](../../images/models/esm.png "Editor")

The ESM model affords for the modeling of polarized surfaces without dipole correction.

## Applications of ESM

This ESM method can be used to calculate the total energy, charge density, force, and potential of a polarized or charged slab (which can also consist in molecules and clusters).

ESM screens the electronic charge of a polarized/charged medium along one perpendicular direction by introducing a classical charge model and a local relative permittivity into the first-principles calculation framework. 

## Boundary Conditions

The ESM method typically relies on the customization of the boundary conditions for the slab system under investigation, differently from the standard periodic boundary conditions which are usually encountered in [DFT-based computations](../../models-directory/dft/overview.md). 

We review the list of available boundary condition options offered on our platform [in this section]({{ guide_url }}/materials-designer/header-menu/advanced/boundary-conditions/) of the documentation.

## Implementation

We explain how ESM calculations are implemented and performed on our platform in a dedicated [tutorial page]({{ guide_url }}/tutorials/dft/electronic/esm-qe/).

## Links

[^1]: [What is ESM - online description, Tokyo ISSP Website](https://sugino.issp.u-tokyo.ac.jp/esm/)
[^2]: [M. Otani and O. Sugino: "First-principles calculations of charged surfaces and interfaces: A plane-wave nonrepeated slab approach"; Phys. Rev. B 73, 115407 (2006)](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.73.115407)
