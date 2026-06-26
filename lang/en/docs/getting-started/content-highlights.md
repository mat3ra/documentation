# Content Highlights

This page provides a detailed overview of the documentation and helps locate key topics. The table of contents on the left and the search bar in the header can be used for further navigation.

## 1. Login

The platform supports two main connection methods: through the [Web Interface]({{ interface_url }}/ui/overview/), and the [Command Line Interface (CLI)]({{ cli_url }}/cli/overview/). A valid username and password is required to log in via either method. Secure shell sessions use [key-based authentication]({{ cli_url }}/remote-connection/ssh/#generate-ssh-keys). The web interface also provides access to the CLI via the [Web Terminal]({{ cli_url }}/remote-connection/web-terminal/), and a [Remote Desktop Environment]({{ cli_url }}/remote-connection/remote-desktop/) is available as well.

More about connection methods can be found on the [connection options page]({{ cli_url }}/remote-connection/overview/). The platform is accessed through the [login page](http://platform.mat3ra.com/login){:target='_blank'}.

## 2. Creating Materials

Three main ways to input material geometries are available:

- [Construct new crystal geometries]({{ interface_url }}/materials-designer/overview/) using the web-based crystallographic design tools
- [Upload structures]({{ interface_url }}/materials/actions/upload/) in widely-used formats (e.g. POSCAR, CIF, XYZ)
- [Import structures]({{ interface_url }}/materials/actions/import/) from a third-party database (e.g. materialsproject.org)

> [Combinatorial sets]({{ interface_url }}/materials-designer/header-menu/advanced/combinatorial-set/) make it possible to rapidly create a large number of material geometries.

> [Toggle "isNonPeriodic"]({{ interface_url }}/materials-designer/header-menu/edit/) makes it possible to create a non-periodic structure, i.e., a molecule.

## 3. Running Simulations

Materials can be simulated to extract desired [properties]({{ reference_url }}/properties/overview/). This requires [constructing]({{ interface_url }}/workflow-designer/overview/) a simulation [workflow]({{ reference_url }}/workflows/overview/). For many properties, pre-built workflows are available in the [workflows bank]({{ reference_url }}/workflows/bank/) and can be [copied]({{ interface_url }}/workflows/actions/copy-bank/) into a user account.

### 3.1. Workflows

[Workflows]({{ reference_url }}/workflows/overview/) define the logic used during simulation. Each workflow has one or more characteristic properties associated with it. Workflows depend on the [simulation engine]({{ reference_url }}/software/overview/), on the choice of [model]({{ reference_url }}/models/overview/), and on its computational implementation, or [method]({{ reference_url }}/methods/overview/).

For example, [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/), as implemented in its [plane-wave pseudopotential formulation]({{ reference_url }}/methods-directory/pseudopotential/overview/) under [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) and [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/), is supported.

More information about specific workflows can be found in the [tutorials]({{ guide_url }}/) section.

### 3.2. Compute

The [computational infrastructure]({{ resources_url }}/infrastructure/overview/) supports multiple [clusters and cloud providers]({{ resources_url }}/infrastructure/clusters/overview/), including [Amazon AWS]({{ resources_url }}/infrastructure/clusters/aws/) and [Microsoft Azure]({{ resources_url }}/infrastructure/clusters/azure/).

[Compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) (such as submission queue, number of nodes and processors per node, time limit, and cluster) should be set before running simulations. Relevant pages include:

- [Setting compute parameters]({{ resources_url }}/infrastructure/compute/parameters/)
- [Compute platform overview]({{ resources_url }}/infrastructure/compute/overview/)
- [Job submission queues]({{ resources_url }}/infrastructure/resource/queues/)
- [Queue-based pricing]({{ resources_url }}/infrastructure/resource/category/)
- [Storage system]({{ resources_url }}/infrastructure/storage/)
- [LINPACK benchmark and scalability study]({{ reference_url }}/benchmarks/hpl-benchmark/)
- [Simulation benchmarks]({{ reference_url }}/benchmarks/high-throughput-screening/)

### 3.3. Run Simulations via Command Line Interface

Advanced users connecting to the CLI may [submit jobs directly]({{ cli_url }}/jobs-cli/overview/) through the use of [batch scripts]({{ cli_url }}/jobs-cli/batch-scripts/overview/). Relevant pages include:

- [Job submission via CLI: main explanation]({{ cli_url }}/jobs-cli/overview/)
- [Job submission via CLI: tutorial]({{ guide_url }}/tutorials/jobs-cli/job-cli-example/)
- [Batch script templates]({{ cli_url }}/jobs-cli/batch-scripts/overview/)
- [Modules environment]({{ cli_url }}/cli/modules/)

## 4. Data Convention

The platform employs a [data convention]({{ data_url }}/data-structured/overview/) that supports storing materials, simulations, and properties in an organized and navigable manner. It is designed with collaborative access to data in mind and has a flexible permission scheme allowing for complete privacy or wide publicity.

All data about simulations and materials is stored. Data originating from the web application is automatically organized and searchable within the web interface. Data originating on the command line is [accessible from within the web application]({{ resources_url }}/data-in-objectstorage/overview/), and can be further imported and organized for search and potential use in advanced analytics, data mining, and machine learning applications. The approach is further explained [here]({{ data_url }}/data/overview/).

Relevant pages include:

- [Data convention]({{ data_url }}/data-structured/overview/)
- [Materials data]({{ data_url }}/materials/data/)
- [Workflows data]({{ data_url }}/workflows/data/overview/)
- [Properties data]({{ data_url }}/properties/data/list/)

## 5. Account-related Items

Considerations related to accounts, service levels, and data ownership can be found under the links below:

- [Accounts and their types]({{ reference_url }}/accounts/overview/)
- [Service levels and pricing](../pricing/service-levels.md)
- [Entities and permissions]({{ reference_url }}/entities-general/permissions/)
- [Accounts and collaboration]({{ reference_url }}/collaboration/organizations/overview/)
- [Storage quotas]({{ reference_url }}/accounts/quota/)
- [Account balance]({{ reference_url }}/accounts/balance/)


## 6. Developer Resources

### 6.1. Open-Source Packages

Python packages are available on [PyPI](https://pypi.org/search/?q=mat3ra){:target='_blank'}:

- [mat3ra-made](https://pypi.org/project/mat3ra-made/){:target='_blank'} — Materials Design library for creating and manipulating structures
- [mat3ra-esse](https://pypi.org/project/mat3ra-esse/){:target='_blank'} — Exabyte Source of Schemas and Examples (ESSE) data standard
- [mat3ra-api-examples](https://pypi.org/project/mat3ra-api-examples/){:target='_blank'} — example notebooks for REST API usage
- [mat3ra-parsers](https://pypi.org/project/mat3ra-parsers/){:target='_blank'} — parsers for computational materials science file formats
- [mat3ra-standata](https://pypi.org/project/mat3ra-standata/){:target='_blank'} — standardized material and simulation data

JavaScript packages are available on [npm](https://www.npmjs.com/search?q=%40mat3ra){:target='_blank'}:

- [@mat3ra/made](https://www.npmjs.com/package/@mat3ra/made){:target='_blank'} — Materials Design library (JavaScript / TypeScript)

### 6.2. Open-Source Repositories

- [Mat3ra GitHub organization](https://github.com/mat3ra/){:target='_blank'} — data structures for materials, workflows, and properties
- [Materials Designer](https://github.com/mat3ra/materials-designer){:target='_blank'} — JavaScript library for web-based materials design
- [API examples](https://github.com/mat3ra/api-examples){:target='_blank'} — Jupyter notebooks demonstrating REST API usage

### 6.3. Programmatic Access (REST API)

- [Upload materials](https://github.com/mat3ra/api-examples/blob/main/examples/material/create_material.ipynb){:target='_blank'}
- [Run simulations and extract properties as JSON](https://github.com/mat3ra/api-examples/blob/main/examples/job/run-simulations-and-extract-properties.ipynb){:target='_blank'}
- [All API examples (GitHub)](https://github.com/mat3ra/api-examples){:target='_blank'}


## 7. Learning Resources

### 7.1. Example Tutorials

- [Create a molecule on a surface]({{ guide_url }}/tutorials/materials/molecule-surface/)
- [NEB chemical reaction profile]({{ guide_url }}/tutorials/dft/chemical/reaction-profile-qe/)
- [Train a machine learning force field]({{ guide_url }}/tutorials/ml/deepmd-mlff-with-espresso-cp-and-lammps/)
- [Run a command-line job]({{ guide_url }}/tutorials/jobs-cli/job-cli-example/)
- [Run a Jupyter notebook connected to REST API]({{ guide_url }}/tutorials/other/jupyter/)

### 7.2. Mat3ra 2D Webinar Series

A recurring webinar series on 2D materials design, defect engineering, and DFT simulations. Recordings are available on the [Mat3ra YouTube channel](https://www.youtube.com/@Mat3ra){:target='_blank'}.

### 7.3. Online Tools

- [JupyterLite Materials Designer](https://jupyterlite.mat3ra.com){:target='_blank'} — browser-based materials design environment (no installation required)

### 7.4. Video Resources

- [Mat3ra YouTube channel](https://www.youtube.com/@Mat3ra){:target='_blank'} — tutorial voiceovers, webinar recordings, and platform walkthroughs
