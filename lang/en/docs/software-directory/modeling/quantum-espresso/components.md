# Components

We present in this page the different [components]({{ reference_url }}/software/components/) (executables and flavors) comprised within the [Quantum ESPRESSO](overview.md) distribution package. 

Only those components implemented on our platform to date are mentioned here, as can be inspected from the lists of available executables and flavors under the [Unit Editor Interface]({{ interface_url }}/workflow-designer/unit-editor/#application).

!!!warning "Implementation on our platform"
    The user who wishes for additional functionality to be added to our platform in future should express so via a [support request]({{ interface_url }}/ui/support/).

## Executables

The core plane wave DFT functions of QE are provided by the PWscf (Plane-Wave Self-Consistent Field) component, further referred to under the name of its [executable]({{ reference_url }}/software/components/#executables) `pw.x`. Further components are included in the distribution package, such as the `ph.x` executable for performing phonon calculations via the density functional perturbation theory and linear response theoretical formalisms [^6].

Complete documentation about the software package can be found in its corresponding website. The input file description for `pw.x` can be found in Ref. [^1]. The package-specific documentation [^2] contains links to input descriptions for other [executables]({{ reference_url }}/software/components/#executables) as well.

The following executables have been implemented on our platform so far.

- `pw.x`: general-purpose executable (see its different computation flavors in the next section below).
- `ph.x`: calculates phonon frequencies and displacement patterns, dielectric tensors, effective charges (uses data produced by `pw.x`).
- `projwfc.x`: projects wavefunctions onto orthogonalized atomic wavefunctions.
- `q2r.x`: reads dynamical matrices produced by the phonon code `ph.x` for a grid of q-points, and calculates the corresponding set of interatomic force constants.
- `dynmat.x`: reads a dynamical matrix produced by the phonon code `ph.x`, diagonalises it, and writes the results to files, both for inspection and for plotting.
- `matdyn.x`: calculates phonons at generic q-points using the interatomic force constants computed by `q2r.x`. 
- `pp.x`: data analysis and plotting.
- `dos.x`:  calculates the Density of States (DOS).
- `bands.x`: re-orders the bands in the band-structure of the material, and computes band-related properties.
- `neb.x` [^3] [^4]: performs calculations of the energy profile of chemical reactions via the [Nudged Elastic Band]({{ guide_url }}/tutorials/dft/chemical/reaction-profile-qe/) method.

## Flavors

The `pw.x` executable for the Quantum ESPRESSO modeling application, for example, allows for the execution of the following different types of calculation [flavors]({{ reference_url }}/software/components/#flavors) [^5].

- `scf`: "self-consistent field" [total ground-state energy]({{ reference_url }}/properties-directory/scalar/total-energy/) calculation.    
- `nscf`: for further processing of the results of non-scf calculations (for instance, in DOS calculations).
- `bands`: [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) calculation.
- `relax`: optimization of the atomic positions to relax the inter-atomic forces. 
- `vc-relax`: "variable-cell" [structural relaxation and optimization]({{ reference_url }}/workflows/addons/structural-relaxation/).

## Links

[^1]: [Input file description of the pw.x code](https://www.quantum-espresso.org/Doc/INPUT_PW.html)
[^2]: [Quantum ESPRESSO package-specific documentation](https://www.quantum-espresso.org/resources/users-manual/specific-documentation)
[^3]: [PWneb User’s Guide, Official Documentation](https://www.quantum-espresso.org/Doc/neb_user_guide.pdf)
[^4]: [Input File Description for neb.x, Official Quantum ESPRESSO documentation](http://web.mit.edu/espresso_v6.1/i386_linux26/qe-6.1/Doc/INPUT_NEB.html)
[^5]: [PWscf User’s Guide, Official Documentation](https://www.quantum-espresso.org/Doc/pw_user_guide.pdf)
[^6]: [Calculation of Phonon Dispersions on the Grid Using Quantum ESPRESSO](http://users.ictp.it/~pub_off/lectures/lns024/10-giannozzi/10-giannozzi.pdf)
[^7]: [PWscf boundary conditions settings, Official Quantum ESPRESSO documentation](https://www.quantum-espresso.org/Doc/INPUT_PW.html#idm558)
