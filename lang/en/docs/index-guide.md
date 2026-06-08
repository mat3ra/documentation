# Tutorials

Step-by-step tutorials for materials construction, DFT, ML, and simulation workflows on the Mat3ra platform. Each tutorial can also be located through the sidebar navigation.

!!!tip "Other documentation sites"
    For interface walkthroughs and platform actions, see the [User Interface]({{ interface_url }}/).
    For explanations of underlying concepts and software reference, see [Concepts & Reference]({{ reference_url }}/).
    For infrastructure and compute resources, see [Resources / Infrastructure]({{ resources_url }}/).
    For REST API documentation, see the [Developers]({{ developers_url }}/) site.
    For CLI environment and batch jobs, see the [Command-Line Interface]({{ cli_url }}/) site.
    To get started on the platform, see [Accessing the Platform](tutorials/platform-access.md) and [Restart from Previous Job](tutorials/other/restart-job.md).


## 1. Materials Design

Designing and constructing [material structures]({{ reference_url }}/materials/overview/) for simulations.

### 1.1. General

| Topic                   | Description                                              | Link |
|:------------------------|:---------------------------------------------------------|:-----|
| Import from files       | Upload CIF, POSCAR, XYZ and other formats via JupyterLite notebook | [Link](tutorials/materials/import-from-files.md) |
| Combinatorial sets      | Generate all unique elemental substitutions in a host structure | [Link](tutorials/materials/combinatorial-screening.md) |
| Interpolated sets       | Create intermediate structures between two endpoints     | [Link](tutorials/materials/interpolated-sets.md) |
| Molecule on a surface   | Place a molecular adsorbate on a crystalline slab        | [Link](tutorials/materials/molecule-surface.md) |
| Interface (3D Editor)   | Build a slab interface with quick visual setup           | [Link](tutorials/materials/slabs-interface.md) |
| Interface (JupyterLite) | Construct a minimal-strain interface via the ZSL algorithm | [Link](tutorials/materials/jupyterlite-zsl.md) |
| VESTA via Remote Desktop| Visualize structures in VESTA through a remote desktop session | [Link](tutorials/materials/vesta-remote-desktop.md) |

### 1.2. Reproducing Published Structures

Step-by-step recipes reproducing structures from the literature. The [full overview](tutorials/materials/specific/overview.md) page contains figures and additional context for each entry.

| Structure Type            | Material            | Reference                | Link |
|:--------------------------|:--------------------|:-------------------------|:-----|
| Substitutional defect     | Graphene            | Fujimoto et al. (2011)   | [Link](tutorials/materials/specific/defect-point-substitution-graphene.md) |
| Substitutional defect (band structure) | Graphene | Fujimoto et al. (2011)   | [Link](tutorials/materials/specific/defect-point-substitution-graphene-simulation.md) |
| Vacancy-substitution pair | GaN                 | Miceli et al. (2016)     | [Link](tutorials/materials/specific/defect-point-pair-gallium-nitride.md) |
| Vacancy defect            | h-BN                | Bertoldo et al. (2022)   | [Link](tutorials/materials/specific/defect-point-vacancy-boron-nitride.md) |
| Interstitial defect       | SnO                 | Togo et al. (2006)       | [Link](tutorials/materials/specific/defect-point-interstitial-tin-oxide.md) |
| Island surface defect     | TiN                 | Sangiovanni et al. (2018)| [Link](tutorials/materials/specific/defect-surface-island-titanium-nitride.md) |
| Step surface defect       | Pt(111)             | Šljivančanin et al. (2002)| [Link](tutorials/materials/specific/defect-surface-step-platinum.md) |
| Adatom surface defects    | Graphene            | Chan et al. (2008)       | [Link](tutorials/materials/specific/defect-surface-adatom-graphene.md) |
| Twisted bilayer           | h-BN nanoribbons    | Xian et al. (2019)       | [Link](tutorials/materials/specific/interface-bilayer-twisted-nanoribbons-boron-nitride.md) |
| Twisted bilayer           | MoS2                | Liu et al. (2014)        | [Link](tutorials/materials/specific/interface-bilayer-twisted-commensurate-lattices-molybdenum-disulfide.md) |
| 2D–2D interface           | Graphene / h-BN     | Jung et al. (2015)       | [Link](tutorials/materials/specific/interface-2d-2d-graphene-boron-nitride.md) |
| 3D–3D interface           | Cu / SiO2           | Shan et al. (2011)       | [Link](tutorials/materials/specific/interface-3d-3d-copper-silicon-dioxide.md) |
| 2D–3D interface           | Graphene / SiO2     | Kang et al. (2008)       | [Link](tutorials/materials/specific/interface-2d-3d-graphene-silicon-dioxide.md) |
| Interface optimization    | Graphene / Ni(111)  | Dahal et al. (2014)      | [Link](tutorials/materials/specific/optimization-interface-film-xy-position-graphene-nickel.md) |
| Adatom island             | Pt on MoS2          | Saidi et al. (2015)      | [Link](tutorials/materials/specific/defect-point-adatom-island-molybdenum-disulfide-platinum.md) |
| H-passivated nanowire     | Si                  | Aradi et al. (2007)      | [Link](tutorials/materials/specific/passivation-edge-nanowire-silicon.md) |
| H-passivated surface      | Si(100)             | Hansen et al. (1998)     | [Link](tutorials/materials/specific/passivation-surface-silicon.md) |
| Nanoclusters              | Au                  | Larsen et al. (2011)     | [Link](tutorials/materials/specific/nanocluster-gold.md) |
| Slab                      | SrTiO3              | Eglitis et al. (2008)    | [Link](tutorials/materials/specific/slab-strontium-titanate.md) |
| High-k metal gate stack   | Si/SiO2/HfO2/TiN   | Muller et al. (1999)     | [Link](tutorials/materials/specific/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride.md) |
| Ripple perturbation       | Graphene            | Thompson-Flagg et al. (2009) | [Link](tutorials/materials/specific/perturbation-ripples-graphene.md) |
| Grain boundary (3D)       | Cu (FCC)            | Frolov et al. (2013)     | [Link](tutorials/materials/specific/defect-planar-grain-boundary-3d-fcc-metals-copper.md) |
| Grain boundary (2D)       | h-BN                | Li et al. (2015)         | [Link](tutorials/materials/specific/defect-planar-grain-boundary-2d-boron-nitride.md) |

[^1]: Fujimoto et al., Phys. Rev. B 84, 245446 (2011). [DOI](https://doi.org/10.1103/PhysRevB.84.245446){:target='_blank'}
[^2]: Miceli et al., Phys. Rev. B 93, 165207 (2016). [DOI](https://doi.org/10.1103/PhysRevB.93.165207){:target='_blank'}
[^3]: Bertoldo et al., npj Comput. Mater. 8, 72 (2022). [DOI](https://doi.org/10.1038/s41524-022-00730-w){:target='_blank'}
[^4]: Togo et al., Phys. Rev. B 74, 195128 (2006). [DOI](https://doi.org/10.1103/PhysRevB.74.195128){:target='_blank'}
[^5]: Sangiovanni et al., Phys. Rev. B 97, 035406 (2018). [DOI](https://doi.org/10.1103/PhysRevB.97.035406){:target='_blank'}
[^6]: Šljivančanin et al., Surf. Sci. 515, 235 (2002). [DOI](https://doi.org/10.1016/s0039-6028(02)01908-8){:target='_blank'}
[^7]: Chan et al., Phys. Rev. B 77, 235430 (2008). [DOI](https://doi.org/10.1103/PhysRevB.77.235430){:target='_blank'}
[^8]: Xian et al., Nano Lett. 19, 4934 (2019). [DOI](https://doi.org/10.1021/acs.nanolett.9b00986){:target='_blank'}
[^9]: Liu et al., Nat. Commun. 5, 4966 (2014). [DOI](https://doi.org/10.1038/ncomms5966){:target='_blank'}
[^10]: Jung et al., Nat. Commun. 6, 6308 (2015). [DOI](https://doi.org/10.1038/ncomms7308){:target='_blank'}
[^11]: Shan et al., Phys. Rev. B 83, 115327 (2011). [DOI](https://doi.org/10.1103/PhysRevB.83.115327){:target='_blank'}
[^12]: Kang et al., Phys. Rev. B 78, 115404 (2008). [DOI](https://doi.org/10.1103/PhysRevB.78.115404){:target='_blank'}
[^13]: Dahal et al., Nanoscale 6, 2548 (2014). [DOI](https://doi.org/10.1039/c3nr05279f){:target='_blank'}
[^14]: Saidi et al., Cryst. Growth Des. 15, 642 (2015). [DOI](https://doi.org/10.1021/cg5013395){:target='_blank'}
[^15]: Aradi et al., Phys. Rev. B 76, 035305 (2007). [DOI](https://doi.org/10.1103/PhysRevB.76.035305){:target='_blank'}
[^16]: Hansen et al., Phys. Rev. B 57, 13295 (1998). [DOI](https://doi.org/10.1103/PhysRevB.57.13295){:target='_blank'}
[^17]: Larsen et al., Phys. Rev. B 84, 245429 (2011). [DOI](https://doi.org/10.1103/PhysRevB.84.245429){:target='_blank'}
[^18]: Eglitis et al., Phys. Rev. B 77, 195408 (2008). [DOI](https://doi.org/10.1103/PhysRevB.77.195408){:target='_blank'}
[^19]: Muller et al., Nature 399, 758 (1999). [Reference](https://docs.quantumatk.com/tutorials/hkmg_builder/hkmg_builder.html){:target='_blank'}
[^20]: Thompson-Flagg et al., EPL 85, 46002 (2009). [DOI](https://doi.org/10.1209/0295-5075/85/46002){:target='_blank'}
[^21]: Frolov et al., Nat. Commun. 4, 1899 (2013). [DOI](https://doi.org/10.1038/ncomms2919){:target='_blank'}
[^22]: Li et al., Nano Lett. 15, 6004 (2015). [DOI](https://doi.org/10.1021/acs.nanolett.5b01852){:target='_blank'}



## 2. Simulations

### 2.1. Density Functional Theory

[Density Functional Theory]({{ reference_url }}/models-directory/density-functional-theory/overview/) property calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) and [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/).

| Category      | Property                    | Method / Functional   | Software | Link |
|:--------------|:----------------------------|:----------------------|:---------|:-----|
| Electronic    | Band structure              | DFT (standard)        | QE       | [Link](tutorials/dft/electronic/band-structure.md) |
| Electronic    | Band structure              | HSE                   | QE       | [Link](tutorials/dft/electronic/hse-qe-bs.md) |
| Electronic    | Band structure              | HSE                   | VASP     | [Link](tutorials/dft/electronic/hse-vasp-bg.md) |
| Electronic    | Band structure              | GW (Full Freq.)       | QE       | [Link](tutorials/dft/electronic/gw-qe-bs-fullfreq.md) |
| Electronic    | Band structure              | GW (Plasmon Pole)     | QE       | [Link](tutorials/dft/electronic/gw-qe-bs-plasmon.md) |
| Electronic    | Band gap                    | DFT (standard)        | QE       | [Link](tutorials/dft/electronic/band-gap.md) |
| Electronic    | Band gap                    | HSE                   | QE       | [Link](tutorials/dft/electronic/hse-qe-bg.md) |
| Electronic    | Band gap                    | GW                    | VASP     | [Link](tutorials/dft/electronic/gw-vasp-bg.md) |
| Electronic    | Density of states           | DFT                   | QE       | [Link](tutorials/dft/electronic/density-of-states.md) |
| Electronic    | Density mesh                | DFT                   | QE       | [Link](tutorials/dft/electronic/electronic-density-mesh.md) |
| Electronic    | Fermi surface               | DFT                   | QE       | [Link](tutorials/dft/electronic/fermi-surface.md) |
| Electronic    | Valence band offset         | DFT                   | QE       | [Link](tutorials/dft/electronic/valence-band-offset.md) |
| Electronic    | Effective screening medium  | ESM                   | QE       | [Link](tutorials/dft/electronic/esm-qe.md) |
| Electronic    | Hubbard U correction        | DFT+U                 | QE       | [Link](tutorials/dft/electronic/hubbard.md) |
| Electronic    | Magnetic properties         | Spin-polarized        | QE       | [Link](tutorials/dft/electronic/spin-magnetic-qe.md) |
| Electronic    | Spin-orbit coupling         | SOC                   | QE       | [Link](tutorials/dft/electronic/spin-orbit-coupling-qe.md) |
| Optical       | Dielectric constant         | DFT                   | QE       | [Link](tutorials/dft/optical/epsilon-optimal-basis.md) |
| Vibrational   | Zero point energy           | DFPT                  | QE       | [Link](tutorials/dft/vibrational/zero-point-energy.md) |
| Vibrational   | Phonon dispersion / DOS     | DFPT                  | QE       | [Link](tutorials/dft/vibrational/phonon-dispersion-dos.md) |
| Vibrational   | Phonons on a grid           | DFPT                  | QE       | [Link](tutorials/dft/vibrational/phonons-grid.md) |
| Thermodynamic | Surface energy              | DFT                   | QE       | [Link](tutorials/dft/thermodynamic/surface-energy.md) |
| Chemical      | Reaction energy profile     | NEB                   | QE       | [Link](tutorials/dft/chemical/reaction-profile-qe.md) |
| Chemical      | Reaction energy profile     | NEB                   | VASP     | [Link](tutorials/dft/chemical/reaction-profile-vasp.md) |
| Workflow      | k-point convergence         | —                     | QE       | [Link](tutorials/dft/addons/kpt-convergence.md) |
| Workflow      | Structural relaxation       | —                     | QE       | [Link](tutorials/dft/addons/structural-relaxation.md) |



### 2.2. Machine Learning

[Machine Learning]({{ reference_url }}/models-directory/machine-learning/overview/) force fields and predictive models.

| Topic                    | Description                                               | Link |
|:-------------------------|:----------------------------------------------------------|:-----|
| Train a NN potential     | End-to-end workflow: QE CP → DeePMD training → LAMMPS MD  | [Link](tutorials/ml/deepmd-mlff-with-espresso-cp-and-lammps.md) |
| Python MLFF (MatterSim)  | Run MatterSim force field on a GPU node via Python workflow | [Link](tutorials/ml/run-mlff-python-workflows-mattersim.md) |


## 3. Other

### 3.1. Command-Line Jobs

Submitting and managing jobs through the [CLI]({{ cli_url }}/jobs-cli/overview/).

| Topic                       | Description                                          | Link |
|:----------------------------|:-----------------------------------------------------|:-----|
| Create + run a CLI Job      | Submit a job from the command line and monitor output | [Link](tutorials/jobs-cli/job-cli-example.md) |
| Import a CLI Job            | Register a CLI-submitted job in the web interface     | [Link](tutorials/jobs-cli/cli-job-import.md) |
| QE GPU Job                  | Run Quantum ESPRESSO on GPU-accelerated compute nodes | [Link](tutorials/jobs-cli/qe-gpu.md) |

### 3.2. Templating

Customizing simulation input files with the [template engine]({{ reference_url }}/workflows/templating/overview/).

| Topic                          | Description                                          | Link |
|:-------------------------------|:-----------------------------------------------------|:-----|
| Flags by elemental composition | Set boolean flags based on the elements present      | [Link](tutorials/templating/set-flag-by-composition.md) |
| Magnetic moment by specie      | Assign initial magnetic moments per atomic species   | [Link](tutorials/templating/set-magnetic-moment.md) |

### 3.3. Tools and Environments

Platform access, notebook environments, and software management.

| Topic              | Description                                              | Link |
|:-------------------|:---------------------------------------------------------|:-----|
| Accessing the platform | Set up an account and access the Mat3ra platform     | [Link](tutorials/platform-access.md) |
| Jupyter Notebook   | Launch and use a Jupyter notebook on the platform        | [Link](tutorials/other/jupyter.md) |
| Restart from previous job | Resume a calculation from the output of a prior job | [Link](tutorials/other/restart-job.md) |
| TensorFlow (GPU)   | Run TensorFlow workloads on GPU-enabled compute nodes    | [Link](tutorials/general-functionality/tensorflow-gpu.md) |
| Add new software   | Install custom packages via the CLI environment          | [Link]({{ cli_url }}/cli/actions/add-software/) |
| Contribute new applications | Contribute new applications to the Mat3ra platform | [Link](tutorials/contribute-new-applications.md) |


<!--
TODOs:
- add noteebooks from https://github.com/Exabyte-io/api-examples/tree/main/other/materials_designer
- add notebooks for workflows from api-examples
- add mention of "experiments" from api-examples
-->
