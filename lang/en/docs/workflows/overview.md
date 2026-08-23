# Workflows

A **workflow** defines the complete sequence of computational steps needed to calculate one or more [properties](../properties/overview.md) of a [material](../materials/overview.md). Workflows encode the simulation logic — which [software](../software-directory/overview.md) to run, with what parameters, and in what order — in a reusable, shareable format.


## Key Concepts

A workflow is composed of hierarchical sub-components:

1. **[Subworkflows](components/subworkflows.md)** — self-contained computational stages (e.g. SCF calculation, band structure extraction).
2. **[Units](components/units.md)** — individual execution steps within a subworkflow (e.g. a single `pw.x` run, a Python script).

Each unit contains an [input template]({{ interface_url }}/workflow-designer/unit-editor/input-templates/) that is rendered at runtime with the specific material and compute parameters for the job.


## Workflow Sources

Workflows can be obtained in three ways:

- **[Bank](bank.md)** — pre-built, curated workflows maintained by the platform team, covering common calculations (band structure, DOS, relaxation, formation energy, ML training, etc.).
- **Account collection** — user-created or bank-imported workflows stored in the account-owned [collection](../accounts/collections.md).
- **Custom creation** — workflows assembled from scratch using the [Workflow Designer]({{ interface_url }}/workflow-designer/overview/).


## [Components](components/overview.md)

The computational sub-components of workflows — **subworkflows** and **units** — are described in detail [in this section](components/overview.md).

## [Data]({{ data_url }}/workflows/data/overview/)

The [Data]({{ data_url }}/workflows/data/overview/) section describes the structured data convention used to store workflows and their sub-components, with example JSON representations.

## [Templating](templating/overview.md)

**[Templating](templating/overview.md)** automates the generation of simulation input files by combining workflow templates with material-specific parameters (lattice constants, atomic positions, k-points, etc.) at runtime.

## [Bank](bank.md)

The [Workflows Bank](bank.md) is a curated collection of ready-to-use workflows. Bank workflows can be [copied]({{ interface_url }}/workflows/actions/copy-bank/) into an account and optionally modified before use.

## [Default](default.md)

The [default workflow](default.md) is automatically assigned to new jobs. It is set at account creation and can be changed at any time.

## User Interface

The [Explorer]({{ interface_url }}/workflows/ui/explorer/) provides an overview of all workflows in the account. The [Viewer]({{ interface_url }}/workflows/ui/viewer/) displays workflow details, and the [Designer]({{ interface_url }}/workflow-designer/overview/) enables creation and editing.

## [Actions]({{ interface_url }}/workflows/actions/overview/)

Available [actions]({{ interface_url }}/workflows/actions/overview/) include copying from the bank, creating, editing, deleting, and setting a default workflow.
