# Tutorials

The sub-pages under this section contain detailed tutorials. A specific tutorial
can be found from the index below or via the corresponding entry in the sidebar
navigation.

## Table of Contents
<!-- this index is generated using scripts/generate_index_of_sub_section.py -->
- [Overview](overview.md)
- Jobs via Command Line
    - [Overview](jobs-cli/overview.md)
    - [Create + run a CLI Job](jobs-cli/job-cli-example.md)
    - [Import a CLI Job to Web Interface](jobs-cli/cli-job-import.md)
- Templating
    - [Overview](templating/overview.md)
    - [Flags by Elemental Composition](templating/set-flag-by-composition.md)
    - [Magnetic Moment on Atoms by Specie](templating/set-magnetic-moment.md)
- Machine Learning (ML)
    - [Overview](ml/overview.md)
    - Python ML
        - [Training a Regression Model](python-ml/train-regression-model.md)
        - [Predictions with Regression](python-ml/predict-with-regression.md)
        - [Unsupervised Learning with Clustering](python-ml/train-clustering-model.md)
        - [Training a Classifier](python-ml/train-classification-model.md)
        - [Predicting with a Classifier](python-ml/predict-with-classification.md)
    - [DeePMD (molecular dynamics)](ml/deepmd-mlff-with-espresso-cp-and-lammps.md)
- Density Functional Theory
    - Electronic Properties
        - [Overview](dft/electronic/overview.md)
        - [Effective Screening Medium](dft/electronic/esm-qe.md)
        - [Electronic band structure](dft/electronic/band-structure.md)
        - [Electronic band structure, HSE (QE)](dft/electronic/hse-qe-bs.md)
        - [Electronic band structure, HSE (VASP)](dft/electronic/hse-vasp-bg.md)
        - [Electronic band structure, GW, Full Freq., (QE)](dft/electronic/gw-qe-bs-fullfreq.md)
        - [Electronic band structure, GW, Plasmon P., (QE)](dft/electronic/gw-qe-bs-plasmon.md)
        - [Electronic band gap](dft/electronic/band-gap.md)
        - [Electronic band gap, HSE (QE)](dft/electronic/hse-qe-bg.md)
        - [Electronic band gap, GW (VASP)](dft/electronic/gw-vasp-bg.md)
        - [Electronic density of states](dft/electronic/density-of-states.md)
        - [Electronic density mesh](dft/electronic/electronic-density-mesh.md)
        - [Fermi Surface](dft/electronic/fermi-surface.md)
        - [Valence Band Offset](dft/electronic/valence-band-offset.md)
        - [Hubbard U (QE)](dft/electronic/hubbard.md)
        - [Spin-magnetic (QE)](dft/electronic/spin-magnetic-qe.md)
        - [Spin-orbit coupling (QE)](dft/electronic/spin-orbit-coupling-qe.md)
    - Optical Properties
        - [Dielectric constant (QE, simple.x)](dft/optical/epsilon-optimal-basis.md)
    - Vibrational Prop.
        - [Overview](dft/vibrational/overview.md)
        - [Zero Point Energy](dft/vibrational/zero-point-energy.md)
        - [Phonons](dft/vibrational/phonon-dispersion-dos.md)
        - [Phonons on Grid](dft/vibrational/phonons-grid.md)
    - Thermodynamic Prop.
        - [Surface Energy](dft/thermodynamic/surface-energy.md)
    - Chemical Prop.
        - [Reaction Energy Profile (QE)](dft/chemical/reaction-profile-qe.md)
        - [Reaction Energy Profile (VASP)](dft/chemical/reaction-profile-vasp.md)
    - Add-ons
        - [k-point convergence](dft/addons/kpt-convergence.md)
        - [Structural Relaxation](dft/addons/structural-relaxation.md)
- General Functionality
    - [Accessing the Platform](platform-access.md)
    - [Jupyter Notebook](other/jupyter.md)
    - [Restart from Previous Job](other/restart-job.md)
    - [TensorFlow (GPU)](general-functionality/tensorflow-gpu.md)
- Materials
    - [Overview](materials/overview.md)
    - [VESTA via Remote Desktop](materials/vesta-remote-desktop.md)
    - [Combinatorial Sets](materials/combinatorial-screening.md)
    - [Interpolated Sets](materials/interpolated-sets.md)
    - [Molecule on a Surface](materials/molecule-surface.md)
    - [Interface, quick setup (3D Editor)](materials/slabs-interface.md)
    - [Interface, minimal strain (JupyterLite Session)](materials/jupyterlite-zsl.md)
    - [Import materials from files in various formats](materials/import-from-files.md)

- Reproducing Specific Manuscripts:
    - [Substitutional Point Defects in Graphene](materials/specific/defect-point-substitution-graphene.md)
    - [Vacancy-Substitution Pair Defects in GaN](materials/specific/defect-point-pair-gallium-nitride.md)
    - [Vacancy Point Defect in h-BN](materials/specific/defect-point-vacancy-boron-nitride.md)
    - [Interstitial Point Defect in SnO](materials/specific/defect-point-interstitial-tin-oxide.md)
    - [Island Surface Defect Formation in TiN](materials/specific/defect-surface-island-titanium-nitride.md)
    - [Step Surface Defect on Pt(111)](materials/specific/defect-surface-step-platinum.md)
    - [Twisted Bilayer h-BN nanoribbons](materials/specific/interface-bilayer-twisted-nanoribbons-boron-nitride.md)
    - [Twisted Bilayer MoS2 commensurate lattices](materials/specific/interface-bilayer-twisted-commensurate-lattices-molybdenum-disulfide.md)
    - [Adatom Surface Defects on Graphene](materials/specific/defect-surface-adatom-graphene.md)
    - [H-Passivated Silicon Nanowire](materials/specific/passivation-edge-nanowire-silicon.md)
    - [H-Passivated Silicon (100) Surface](materials/specific/passivation-surface-silicon.md)
    - [Gold Nanoclusters](materials/specific/nanocluster-gold.md)
    - [SrTiO3 Slab](materials/specific/slab-strontium-titanate.md)
    - [Interface between Graphene and h-BN](materials/specific/interface-2d-2d-graphene-boron-nitride.md)
    - [Interface between Copper and SiO2 (Cristobalite)](materials/specific/interface-3d-3d-copper-silicon-dioxide.md)
    - [Interface between Graphene and SiO2 (alpha-quartz)](materials/specific/interface-2d-3d-graphene-silicon-dioxide.md)
    - [High-k Metal Gate Stack (Si/SiO2/HfO2/TiN)](materials/specific/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride.md)
    - [Ripple perturbation of a Graphene sheet](materials/specific/perturbation-ripples-graphene.md)
    - [Grain Boundary in FCC Metals (Copper)](materials/specific/defect-planar-grain-boundary-3d-fcc-metals-copper.md)
    - [Grain Boundary (2D) in h-BN](materials/specific/defect-planar-grain-boundary-2d-boron-nitride.md)
    - [Gr/Ni(111) Interface Optimization](materials/specific/optimization-interface-film-xy-position-graphene-nickel.md)
    - [Pt Adatoms Island on MoS2](materials/specific/defect-point-adatom-island-molybdenum-disulfide-platinum.md)

