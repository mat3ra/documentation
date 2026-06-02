# Tutorials

Step-by-step tutorials for DFT, ML, materials construction, and simulation workflows on the Mat3ra platform. Each tutorial can also be located through the sidebar navigation.

!!!tip "Other documentation sites"
    For interface walkthroughs and platform actions, see the [User Interface]({{ interface_url }}/).
    For explanations of underlying concepts and software reference, see [Concepts & Reference]({{ reference_url }}/).
    For infrastructure and compute resources, see [Resources / Infrastructure]({{ resources_url }}/).
    For REST API documentation, see the [Developers]({{ developers_url }}/) site.
    For CLI environment and batch jobs, see the [Command-Line Interface]({{ cli_url }}/) site.


## Jobs via Command Line

Submitting and managing jobs through the [CLI]({{ cli_url }}/jobs-cli/overview/).

- [Create + run a CLI Job](tutorials/jobs-cli/job-cli-example.md)
- [Import a CLI Job to Web Interface](tutorials/jobs-cli/cli-job-import.md)


## Templating

Customizing simulation input files with the [template engine]({{ reference_url }}/workflows/templating/overview/).

- [Flags by Elemental Composition](tutorials/templating/set-flag-by-composition.md)
- [Magnetic Moment on Atoms by Specie](tutorials/templating/set-magnetic-moment.md)


## Machine Learning (ML)

[Machine Learning]({{ reference_url }}/models-directory/machine-learning/overview/) operations supported on the platform.

- [DeePMD (molecular dynamics)](tutorials/ml/deepmd-mlff-with-espresso-cp-and-lammps.md)
- [Python MLFF (MatterSim)](tutorials/ml/run-mlff-python-workflows-mattersim.md)


## Density Functional Theory

- Electronic Properties
    - [Effective Screening Medium](tutorials/dft/electronic/esm-qe.md)
    - [Electronic band structure](tutorials/dft/electronic/band-structure.md)
    - [Electronic band structure, HSE (QE)](tutorials/dft/electronic/hse-qe-bs.md)
    - [Electronic band structure, HSE (VASP)](tutorials/dft/electronic/hse-vasp-bg.md)
    - [Electronic band structure, GW, Full Freq., (QE)](tutorials/dft/electronic/gw-qe-bs-fullfreq.md)
    - [Electronic band structure, GW, Plasmon P., (QE)](tutorials/dft/electronic/gw-qe-bs-plasmon.md)
    - [Electronic band gap](tutorials/dft/electronic/band-gap.md)
    - [Electronic band gap, HSE (QE)](tutorials/dft/electronic/hse-qe-bg.md)
    - [Electronic band gap, GW (VASP)](tutorials/dft/electronic/gw-vasp-bg.md)
    - [Electronic density of states](tutorials/dft/electronic/density-of-states.md)
    - [Electronic density mesh](tutorials/dft/electronic/electronic-density-mesh.md)
    - [Fermi Surface](tutorials/dft/electronic/fermi-surface.md)
    - [Valence Band Offset](tutorials/dft/electronic/valence-band-offset.md)
    - [Hubbard U (QE)](tutorials/dft/electronic/hubbard.md)
    - [Spin-magnetic (QE)](tutorials/dft/electronic/spin-magnetic-qe.md)
    - [Spin-orbit coupling (QE)](tutorials/dft/electronic/spin-orbit-coupling-qe.md)
- Optical Properties
    - [Dielectric constant (QE, simple.x)](tutorials/dft/optical/epsilon-optimal-basis.md)
- Vibrational Properties
    - [Zero Point Energy](tutorials/dft/vibrational/zero-point-energy.md)
    - [Phonons](tutorials/dft/vibrational/phonon-dispersion-dos.md)
    - [Phonons on Grid](tutorials/dft/vibrational/phonons-grid.md)
- Thermodynamic Properties
    - [Surface Energy](tutorials/dft/thermodynamic/surface-energy.md)
- Chemical Properties
    - [Reaction Energy Profile (QE)](tutorials/dft/chemical/reaction-profile-qe.md)
    - [Reaction Energy Profile (VASP)](tutorials/dft/chemical/reaction-profile-vasp.md)
- Add-ons
    - [k-point convergence](tutorials/dft/addons/kpt-convergence.md)
    - [Structural Relaxation](tutorials/dft/addons/structural-relaxation.md)


## General Functionality

- [Accessing the Platform](tutorials/platform-access.md)
- [Add New Software]({{ cli_url }}/cli/actions/add-software/)
- [Jupyter Notebook](tutorials/other/jupyter.md)
- [Restart from Previous Job](tutorials/other/restart-job.md)
- [TensorFlow (GPU)](tutorials/general-functionality/tensorflow-gpu.md)


## Materials

Designing and constructing [material structures]({{ reference_url }}/materials/overview/).


- [VESTA via Remote Desktop](tutorials/materials/vesta-remote-desktop.md)
- [Combinatorial Sets](tutorials/materials/combinatorial-screening.md)
- [Interpolated Sets](tutorials/materials/interpolated-sets.md)
- [Molecule on a Surface](tutorials/materials/molecule-surface.md)
- [Interface, quick setup (3D Editor)](tutorials/materials/slabs-interface.md)
- [Interface, minimal strain (JupyterLite Session)](tutorials/materials/jupyterlite-zsl.md)
- [Import materials from files in various formats](tutorials/materials/import-from-files.md)


## Reproducing Specific Manuscripts

Step-by-step recipes reproducing published structures from the literature.


- [Substitutional Point Defects in Graphene](tutorials/materials/specific/defect-point-substitution-graphene.md)
- [Vacancy-Substitution Pair Defects in GaN](tutorials/materials/specific/defect-point-pair-gallium-nitride.md)
- [Vacancy Point Defect in h-BN](tutorials/materials/specific/defect-point-vacancy-boron-nitride.md)
- [Interstitial Point Defect in SnO](tutorials/materials/specific/defect-point-interstitial-tin-oxide.md)
- [Island Surface Defect Formation in TiN](tutorials/materials/specific/defect-surface-island-titanium-nitride.md)
- [Step Surface Defect on Pt(111)](tutorials/materials/specific/defect-surface-step-platinum.md)
- [Twisted Bilayer h-BN nanoribbons](tutorials/materials/specific/interface-bilayer-twisted-nanoribbons-boron-nitride.md)
- [Twisted Bilayer MoS2 commensurate lattices](tutorials/materials/specific/interface-bilayer-twisted-commensurate-lattices-molybdenum-disulfide.md)
- [Adatom Surface Defects on Graphene](tutorials/materials/specific/defect-surface-adatom-graphene.md)
- [H-Passivated Silicon Nanowire](tutorials/materials/specific/passivation-edge-nanowire-silicon.md)
- [H-Passivated Silicon (100) Surface](tutorials/materials/specific/passivation-surface-silicon.md)
- [Gold Nanoclusters](tutorials/materials/specific/nanocluster-gold.md)
- [SrTiO3 Slab](tutorials/materials/specific/slab-strontium-titanate.md)
- [Interface between Graphene and h-BN](tutorials/materials/specific/interface-2d-2d-graphene-boron-nitride.md)
- [Interface between Copper and SiO2 (Cristobalite)](tutorials/materials/specific/interface-3d-3d-copper-silicon-dioxide.md)
- [Interface between Graphene and SiO2 (alpha-quartz)](tutorials/materials/specific/interface-2d-3d-graphene-silicon-dioxide.md)
- [High-k Metal Gate Stack (Si/SiO2/HfO2/TiN)](tutorials/materials/specific/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride.md)
- [Ripple perturbation of a Graphene sheet](tutorials/materials/specific/perturbation-ripples-graphene.md)
- [Grain Boundary in FCC Metals (Copper)](tutorials/materials/specific/defect-planar-grain-boundary-3d-fcc-metals-copper.md)
- [Grain Boundary (2D) in h-BN](tutorials/materials/specific/defect-planar-grain-boundary-2d-boron-nitride.md)
- [Gr/Ni(111) Interface Optimization](tutorials/materials/specific/optimization-interface-film-xy-position-graphene-nickel.md)
- [Pt Adatoms Island on MoS2](tutorials/materials/specific/defect-point-adatom-island-molybdenum-disulfide-platinum.md)
