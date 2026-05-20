# Concepts & Reference

This site explains the concepts, data models, and scientific methods underlying the Mat3ra platform. It is organized around the platform's core abstractions — entities, models, methods, software, and properties.

!!!tip "Other documentation sites"
    For step-by-step tutorials and tool walkthroughs, see the [Platform Guide](https://docs.mat3ra.com/guide/).
    For developer-focused content (REST API, CLI, infrastructure), see the [Developer Guide](https://docs.mat3ra.com/dev/).


## Core platform concepts

The platform organizes work around a set of interconnected entities. Each entity has a defined lifecycle, ownership model, and data schema.

- [Entities overview](entities-general/overview.md) — lifecycle, ownership, permissions, sets, and bank
- [Accounts](accounts/overview.md) — users, balance, quotas, service levels
- [Collaboration](collaboration/organizations/overview.md) — organizations, roles, teams, access levels


## Materials

- [Overview](materials/overview.md) — what a material is, how it is classified and stored
- [Data schema](materials/data.md) — JSON representation of materials
- [Classification](materials/classification/crystalline.md) — crystalline vs. non-periodic


## Workflows

- [Overview](workflows/overview.md) — structure, bank, defaults
- [Components](workflows/components/overview.md) — subworkflows, units, maps
- [Data](workflows/data/overview.md) — JSON schemas for workflows, subworkflows, and units
- [Templating](workflows/templating/overview.md) — Jinja/Swig templates, Exabyte convention
- [Add-ons](workflows/addons/overview.md) — convergence algorithms, structural relaxation


## Jobs

- [Overview](jobs/overview.md) — what a job is, status lifecycle
- [Projects](jobs/projects.md) — organizing jobs into projects
- [Data schema](jobs/data.md) — JSON representation of jobs


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
- [Quantum ESPRESSO](software-directory/modeling/quantum-espresso/overview.md)
- [VASP](software-directory/modeling/vasp/overview.md)
- [LAMMPS](software-directory/modeling/lammps.md), [CP2K](software-directory/modeling/cp2k.md), [Gromacs](software-directory/modeling/gromacs.md), [NWChem](software-directory/modeling/nwchem.md)
- [Python](software-directory/scripting/python/overview.md), [Shell](software-directory/scripting/shell/overview.md), [Jupyter Lab](software-directory/scripting/jupyter-lab/overview.md)
- [Python ML](software-directory/machine-learning/python-ml/overview.md), [TensorFlow](software-directory/machine-learning/tensorflow.md)


## Properties

Computed and measured properties extracted from simulations.

- [Properties overview](properties/overview.md) — lifecycle, extractors, refinement
- [Classification](properties/classification/overview.md)
- [Scalar properties](properties-directory/scalar/total-energy.md) — total energy, fermi energy, surface energy, and more
- [Non-scalar properties](properties-directory/non-scalar/bandstructure.md) — band structure, DOS, phonon dispersions
- [Structural properties](properties-directory/structural/basis.md) — basis, lattice, symmetry, forces


## Data practices

- [Data overview](data/overview.md) — classification, lifecycle
- [Structured data](data-structured/overview.md) — conventions and schemas


## Other

- [Benchmarks](benchmarks/overview.md) — throughput screening, vendor comparisons, HPL
- [Security](security/overview.md) — policies, threat analysis
- [Site policy](site-policy/privacy-statement.md) — privacy, sharing, terms of service
- [Publications](other/publications.md)
