# First Steps

New to Mat3ra? This page outlines the essential steps to begin using the platform.

!!!tip "Running first simulations"
    The fastest way to get started is to follow the [first simulation walkthrough (web interface)](run-first-simulation/web-interface.md) or the [CLI job tutorial](run-first-simulation/cli-job.md).

## 1. Log In

The platform is accessed through the [login page](http://platform.mat3ra.com/login){:target='_blank'}. Two connection methods are available: the [web interface]({{ interface_url }}/ui/overview/) and the [command-line interface (CLI)]({{ cli_url }}/cli/overview/). More details are on the [connection options]({{ cli_url }}/remote-connection/overview/) page.

## 2. Create Materials

Material structures can be [designed]({{ interface_url }}/materials-designer/overview/) in the browser, [uploaded]({{ interface_url }}/materials/actions/upload/) from files (POSCAR, CIF, XYZ), or [imported]({{ interface_url }}/materials/actions/import/) from third-party databases. For step-by-step instructions, see the [materials design tutorials]({{ guide_url }}/#1-materials-design).

## 3. Set Up a Workflow

[Workflows]({{ reference_url }}/workflows/overview/) define the simulation logic — model, method, and software. Pre-built workflows for common properties are available in the [workflows bank]({{ reference_url }}/workflows/bank/). For background on models and methods, see [Key Concepts](concepts.md).

## 4. Run a Simulation

Configure [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) (queue, nodes, time limit) and submit the job. The platform supports multiple [clusters]({{ resources_url }}/infrastructure/clusters/overview/) including AWS and Azure. For a walkthrough, see [Running First Simulations](run-first-simulation/web-interface.md).

## 5. Analyze Results

Simulation data is automatically organized and searchable. Results can be viewed in the web interface or accessed programmatically via the [REST API]({{ developers_url }}/). The [data convention]({{ data_url }}/data-structured/overview/) describes how materials, workflows, and properties are stored.

## Next Steps

| Goal | Where to go |
|:-----|:------------|
| Documentation overview and useful links | [Content Highlights](content-highlights.md) |
| Understand platform concepts      | [Key Concepts](concepts.md) |
| Running first simulation (web)    | [Web Interface](run-first-simulation/web-interface.md) |
| Running first simulation (CLI)    | [Command Line](run-first-simulation/cli-job.md) |
| Follow step-by-step tutorials     | [Tutorials]({{ guide_url }}/) |
| Learn the web interface           | [User Interface]({{ interface_url }}/) |
| Understand models and methods     | [Concepts & Reference]({{ reference_url }}/) |
| Use the CLI for batch jobs        | [Command-Line Interface]({{ cli_url }}/) |
| Access the platform via code      | [REST API / Developers]({{ developers_url }}/) |
| Check pricing and service levels  | [Pricing](../pricing/service-levels.md) |

