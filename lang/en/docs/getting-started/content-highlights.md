# Content Highlights

This page helps users quickly grasp the content of the documentation. Use the table of contents on the left or the search bar in the header for more.

## Login

We support two main login connection methods: through [Web Interface]({{ interface_url }}/ui/overview/), and [Command Line Interface (CLI)](../cli/overview.md). One must have a valid username and password in order to log in via either. Secure shell sessions use [key-based authentication]({{ interface_url }}/remote-connection/ssh/#generate-ssh-keys). Users logged in through the web interface can, without additional authentication, also access the CLI via the [Web Terminal]({{ interface_url }}/remote-connection/web-terminal/), and have a [Remote Desktop Environment]({{ interface_url }}/remote-connection/remote-desktop/) option available to them.

The user can find out more about such connection methods under the [connection options page]({{ interface_url }}/remote-connection/overview/). The
- <a href="http://platform.mat3ra.com/login" target="_blank">login page</a> is where the platform can be accessed.

## Creating Materials

We highlight three ways to input material geometries:

- [construct new crystal geometries]({{ interface_url }}/materials-designer/overview/), using our web-based crystallographic design tools
- [upload structure]({{ interface_url }}/materials/actions/upload/) in widely used (eg. POSCAR/CIF/XYZ) format(s)
- [import structure]({{ interface_url }}/materials/actions/import/) from a third-party database (e.g. materialsproject.org)

> [Combinatorial sets]({{ interface_url }}/materials-designer/header-menu/advanced/combinatorial-set/), for example, make it possible to rapidly create a large number of material geometries.

> [Toggle "isNonPeriodic"]({{ interface_url }}/materials-designer/header-menu/edit/), for example, makes it possible to create a non-periodic structure, i.e., a molecule.

## Running Simulations

We allow users to simulate materials to extract desired [properties]({{ reference_url }}/properties/overview/). In order to do so, one needs to [construct]({{ interface_url }}/workflow-designer/overview/) a simulation [workflow]({{ reference_url }}/workflows/overview/). For many properties, we have a set of workflows available in the [workflows bank]({{ reference_url }}/workflows/bank/) that are available for [copy]({{ interface_url }}/workflows/actions/copy-bank/) by users.

### Workflows

[Workflows]({{ reference_url }}/workflows/overview/) define the logic used during simulation. Each workflow has one or more characteristic properties associated with it. Workflows are dependent on the [simulation engine]({{ reference_url }}/software/overview/), on the choice for a [model]({{ reference_url }}/models/overview/), and on its computational implementation, or [method]({{ reference_url }}/methods/overview/).

For example, [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/), as implemented in its [plane-wave pseudopotential formulation]({{ reference_url }}/methods-directory/pseudopotential/overview/) under the [Quantum ESPRESSO](../software-directory/modeling/quantum-espresso/overview.md) and [VASP](../software-directory/modeling/vasp/overview.md) codes, is supported at current.

More information about specific workflows can be found in the [tutorials](../tutorials/overview.md) section.

### Compute

Our [computational infrastructure]({{ dev_url }}/infrastructure/overview/) supports multiple [clusters/cloud providers]({{ dev_url }}/infrastructure/clusters/overview/), including [Amazon's AWS]({{ dev_url }}/infrastructure/clusters/aws/) or [Microsoft's Azure]({{ dev_url }}/infrastructure/clusters/azure/) services.

Important [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) (such as submission queue, number of nodes and processors per node, time limit, cloud provider/cluster etc...) should be set before running simulations. The user can find out more about them under the following links.

- [setting compute parameters]({{ dev_url }}/infrastructure/compute/parameters/)
- [compute platform overview]({{ dev_url }}/infrastructure/compute/overview/)
- [job submission queues]({{ dev_url }}/infrastructure/resource/queues/)
- [queue-based pricing]({{ dev_url }}/infrastructure/resource/category/)
- [storage system]({{ dev_url }}/infrastructure/storage/)
- [linpack benchmark & scalability study]({{ reference_url }}/benchmarks/hpl-benchmark/)
- [simulation benchmarks]({{ reference_url }}/benchmarks/high-throughput-screening/)

### Run Simulations via Command Line Interface (CLI)

Advanced users connecting to our CLI may [submit jobs directly through it](../jobs-cli/overview.md), through the use of [Batch Scripts](../jobs-cli/batch-scripts/overview.md). The user can read more in the following pages.

- [job submission via cli: main explanation](../jobs-cli/overview.md)
- [job submission via cli: tutorial](../tutorials/jobs-cli/job-cli-example.md)
- [batch script templates](../jobs-cli/batch-scripts/overview.md)
- [modules environment](../cli/modules.md)

<!-- TODO by GM: uncomment when tutorials are implemented

### Extra Simulation Capabilities

- [restart from previous run](../tutorials/restart-job)
- [remote desktop visualization](../tutorials/remote-desktop)

-->

## Data Convention

We employ a [data convention]({{ data_url }}/data-structured/overview/) that supports storing materials, simulations and properties in an organized and easy-to-navigate manner. It is designed with collaborative access to data in mind, and has a flexible permission scheme allowing for complete privacy or wide publicity.

We store all data about simulations and materials. Data originated from a web application is automatically organized and searchable within the web interface. Data originated on the command line is [accessible from within the web application]({{ dev_url }}/data-in-objectstorage/overview/), and can also be further imported and organized for future search and potential use in advanced analytics / data mining / machine learning applications. We further explain our approach [here]({{ data_url }}/data/overview/).

Find out more under the following pages:

- [data convention]({{ data_url }}/data-structured/overview/)
- [materials data]({{ data_url }}/materials/data/)
- [workflows data]({{ data_url }}/workflows/data/overview/)
- [properties data]({{ data_url }}/properties/data/list/)

## Account-related Items

Other considerations related to accounts, their service, and data ownership/permissions can be found under the links below:

- [accounts and their types]({{ reference_url }}/accounts/overview/)
- [service levels and pricing](../pricing/service-levels.md)
- [entities and permissions]({{ reference_url }}/entities-general/permissions/)
- [accounts and collaboration]({{ reference_url }}/collaboration/organizations/overview/)
- [storage quotas]({{ reference_url }}/accounts/quota/)
- [account balance]({{ reference_url }}/accounts/balance/)
