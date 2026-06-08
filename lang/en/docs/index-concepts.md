# Concepts & Reference

This site explains the concepts, data models, and scientific methods underlying the Mat3ra platform. It is organized around the platform's core abstractions — entities, models, methods, software, and properties.

!!!tip "Other documentation sites"
    For step-by-step tutorials, tool walkthroughs, CLI usage, and software reference, see the [Platform Guide]({{ guide_url }}/).
    For interface walkthroughs and platform actions, see the [User Interface]({{ interface_url }}/).
    For infrastructure and compute resources, see [Platform Resources]({{ resources_url }}/).
    For REST API documentation, see the [Developers]({{ developers_url }}/) site.
    For JSON schemas and data convention, see the [Data Standards]({{ data_url }}/).


## Core platform concepts

The platform organizes work around a set of interconnected entities. Each entity has a defined lifecycle, ownership model, and data schema.

- [Entities overview](entities-general/overview.md) — lifecycle, ownership, permissions, sets, and bank
- [Accounts](accounts/overview.md) — users, balance, quotas, service levels
- [Collaboration](collaboration/organizations/overview.md) — organizations, roles, teams, access levels


## Materials

- [Overview](materials/overview.md) — what a material is, how it is classified and stored
- [Classification](materials/classification/crystalline.md) — crystalline vs. non-periodic


## Workflows

- [Overview](workflows/overview.md) — structure, bank, defaults
- [Components](workflows/components/overview.md) — subworkflows, units, maps
- [Templating](workflows/templating/overview.md) — Jinja/Swig templates, Exabyte convention
- [Add-ons](workflows/addons/overview.md) — convergence algorithms, structural relaxation


## Jobs

- [Overview](jobs/overview.md) — what a job is, status lifecycle
- [Projects](jobs/projects.md) — organizing jobs into projects


## Models & methods

Physical models and computational methods used for simulations.

- [Models overview](models/overview.md) — accuracy, data, parameters
- [DFT](models-directory/dft/overview.md) — Density Functional Theory parameters, accuracy, and notes
- [Machine Learning](models-directory/machine-learning/overview.md) — ML model parameters, units, and workflows
- [Methods overview](methods/overview.md) — precision, parameters
- [Pseudopotentials](methods-directory/pseudopotential/overview.md) — plane-wave settings and defaults


## Software

Simulation engines and scripting environments available on the platform.

- [Software overview](software/overview.md) — components, classification
- [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/)
- [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/)
- [LAMMPS]({{ reference_url }}/software-directory/modeling/lammps/), [CP2K]({{ reference_url }}/software-directory/modeling/cp2k/), [Gromacs]({{ reference_url }}/software-directory/modeling/gromacs/), [NWChem]({{ reference_url }}/software-directory/modeling/nwchem/)
- [Python]({{ reference_url }}/software-directory/scripting/python/overview/), [Shell]({{ reference_url }}/software-directory/scripting/shell/overview/), [Jupyter Lab]({{ reference_url }}/software-directory/scripting/jupyter-lab/overview/)
- [Python ML]({{ reference_url }}/software-directory/machine-learning/python-ml/overview/), [TensorFlow]({{ reference_url }}/software-directory/machine-learning/tensorflow/)


## Properties

Computed and measured properties extracted from simulations.

- [Properties overview](properties/overview.md) — lifecycle, extractors, refinement
- [Classification](properties/classification/overview.md)
- [Scalar properties](properties-directory/scalar/total-energy.md) — total energy, fermi energy, surface energy, and more
- [Non-scalar properties](properties-directory/non-scalar/bandstructure.md) — band structure, DOS, phonon dispersions
- [Structural properties](properties-directory/structural/basis.md) — basis, lattice, symmetry, forces




## Other

- [Benchmarks](benchmarks/overview.md) — throughput screening, vendor comparisons, HPL
- [Security](security/overview.md) — policies, threat analysis
- [Site policy](site-policy/privacy-statement.md) — privacy, sharing, terms of service
- [Publications](other/publications.md)
