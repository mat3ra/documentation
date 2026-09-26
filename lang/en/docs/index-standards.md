# Data Standards

This section documents the data convention, JSON schemas, and structured data representations used across the Mat3ra platform.

!!!tip "Other documentation sites"
    For step-by-step tutorials and platform walkthroughs, see the [Platform Guide]({{ guide_url }}/).
    For explanations of underlying concepts, see [Concepts & Reference]({{ reference_url }}/).
    For REST API documentation, see the [Developers]({{ developers_url }}/) site.


## Overview & Convention

The [ESSE Data Convention](data-structured/convention.md) defines how structured data is organized and stored in JSON format across the platform.

- [Structured Data](data-structured/overview.md) — introduction to structured data storage
- [Convention](data-structured/convention.md) — JSON format, schemas, and examples
- [Data Classification](data/classification.md) — how data is categorized
- [Data Lifecycle](data/lifecycle.md) — stages of data from creation to archival


## Entity Schemas

JSON schemas and examples for each platform entity type.

- [General Entity](entities-general/data.md) — common fields shared by all entities
- [Materials](materials/data.md) — crystal structure representations
- [Jobs](jobs/data.md) — computational job data
- [Workflows](workflows/data/overview.md) — workflow, subworkflow, and unit schemas
- [Models](models/data.md) — model parameter schemas
- [Methods](methods/data.md) — method schemas
- [Software](software/data.md) — application, executable, and flavor schemas


## Property Schemas

Schemas for material and simulation properties.

- [Overview](properties/data/overview.md) — property data structure
- [Core Types](properties/data/core.md) — primitive and abstract schema types
- [Full List](properties/data/list.md) — all property schemas with examples
- [Periodic Table](properties/data/periodic-table.md) — element-level property data


## Entity Directories

Detailed schemas for specific model, method, and software implementations.

- **Models**: [DFT](models-directory/dft/data.md), [Machine Learning](models-directory/machine-learning/data.md)
- **Methods**: [Pseudopotential](methods-directory/pseudopotential/data.md), [Linear Regression](methods-directory/linear-regression/data.md)
- **Software**: [VASP](software-directory/modeling/vasp/data.md), [Quantum ESPRESSO](software-directory/modeling/quantum-espresso/data.md), [Python](software-directory/scripting/python/data.md), [Shell](software-directory/scripting/shell/data.md), [JupyterLab](software-directory/scripting/jupyter-lab/data.md)
