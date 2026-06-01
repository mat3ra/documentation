# Platform Guide

This guide provides step-by-step instructions for using the Mat3ra platform through its web interface. It covers tutorials, tool walkthroughs, and common actions.

!!!tip "Other documentation sites"
    For explanations of underlying concepts, see [Concepts & Reference]({{ reference_url }}/).
    For developer-focused content (REST API, CLI, infrastructure), see the [Developer Guide]({{ dev_url }}/).


## Quick start

New to the platform? Start here:

- [Run a first simulation (web interface)](getting-started/run-first-simulation/web-interface.md)
- [Run a first simulation (command line)](getting-started/run-first-simulation/cli-job.md)
- [Content highlights](getting-started/content-highlights.md)
- [Frequently asked questions](other/faq.md)


## Tutorials

Step-by-step guides for specific calculations and workflows.

- **Density Functional Theory (DFT)**: band structure, band gap, density of states, phonons, surface energy, and more — see [DFT tutorials overview](tutorials/dft/electronic/overview.md)
- **Machine Learning**: train regression/classification models, run MLFF workflows with MatterSim — see [ML tutorials overview](tutorials/ml/overview.md)
- **Materials construction**: build interfaces, slabs, combinatorial sets, and import from files — see [Materials tutorials overview](tutorials/materials/overview.md)
- **Reproducing manuscripts**: detailed recipes reproducing published structures (defects, grain boundaries, heterostructures) — see [Manuscripts overview](tutorials/materials/specific/overview.md)
- **Command-line jobs**: create and run CLI jobs, import results to the web interface — see [CLI jobs tutorials](tutorials/jobs-cli/overview.md)
- **Templating**: parameterize workflows with Jinja templates — see [Templating tutorials](tutorials/templating/overview.md)


## Tool guides

Detailed walkthroughs for each major platform tool.

- [Materials Designer](materials-designer/overview.md) — create and edit crystal structures
- [Workflow Designer](workflow-designer/overview.md) — build and configure simulation workflows
- [Jobs Designer](jobs-designer/overview.md) — set up and submit computational jobs
- [JupyterLite Environment](jupyterlite/overview.md) — run Python notebooks in the browser
- [Remote Connection](remote-connection/overview.md) — access via SSH, web terminal, or remote desktop


## Software directory

Reference pages for the simulation engines and scripting environments available on the platform.

- [Quantum ESPRESSO](software-directory/modeling/quantum-espresso/overview.md), [VASP](software-directory/modeling/vasp/overview.md), [LAMMPS](software-directory/modeling/lammps.md), [CP2K](software-directory/modeling/cp2k.md), [Gromacs](software-directory/modeling/gromacs.md)
- [Python](software-directory/scripting/python/overview.md), [Shell](software-directory/scripting/shell/overview.md), [Jupyter Lab](software-directory/scripting/jupyter-lab/overview.md)
- [Python ML](software-directory/machine-learning/python-ml/overview.md), [TensorFlow](software-directory/machine-learning/tensorflow.md)


## Command-line interface

For users who prefer terminal access to the platform.

- [CLI overview](cli/overview.md) — environment, modules, accounting
- [Jobs via command line](jobs-cli/overview.md) — batch scripts, job submission, status checks


## Account management

- [Account preferences and settings](accounts/ui/overview.md)
- [Accounting actions (balance, quota, payments)](accounts/accounting/overview.md)
- [Organizations and teams](collaboration/actions/organization/overview.md)
- [Entity sharing](collaboration/sharing/actions.md)


## Support

The support team responds to requests within 24 hours during working hours (Pacific Time). See [Help & Support](other/support.md) for ways to get assistance.

!!!tip "Help improve this documentation"
    If something is missing or unclear, open the [Help & Support](other/support.md) page and get in touch.
