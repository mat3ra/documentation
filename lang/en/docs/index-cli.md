# Command-Line Interface

This site covers the command-line environment, batch job management, and remote connection methods for the Mat3ra platform.

!!!tip "Other documentation sites"
    For step-by-step tutorials, see the [Tutorials]({{ guide_url }}/).
    For web interface documentation, see [User Interface]({{ interface_url }}/).
    For explanations of underlying concepts, see [Concepts & Reference]({{ reference_url }}/).
    For infrastructure and compute resources, see [Resources / Infrastructure]({{ resources_url }}/).


## CLI Environment

The platform provides a Linux-based [command-line environment](cli/overview.md) with pre-installed simulation software, compilers, and libraries. The environment supports [modules](cli/modules.md) for managing software versions and [Python virtual environments](cli/actions/create-python-env.md) for custom packages.

- [CLI overview](cli/overview.md) — shell environment, default tools
- [Environment modules](cli/modules.md) — load/unload software packages
- [CLI actions](cli/actions/overview.md) — common operations


## Batch Jobs

Computational jobs are submitted through a [resource manager](jobs-cli/overview.md) using [batch scripts](jobs-cli/batch-scripts/overview.md). The batch system supports PBS/Slurm-style [directives](jobs-cli/batch-scripts/directives.md) for requesting compute resources.

- [Jobs via CLI overview](jobs-cli/overview.md) — job submission and management
- [Batch script structure](jobs-cli/batch-scripts/general-structure.md) — script layout and conventions
- [Sample scripts](jobs-cli/batch-scripts/sample-scripts.md) — ready-to-use examples


## Remote Connection

The platform supports multiple methods for [remote access](remote-connection/overview.md): [SSH](remote-connection/ssh.md), [Web Terminal](remote-connection/web-terminal.md), and [Remote Desktop](remote-connection/remote-desktop.md).

- [Remote connection overview](remote-connection/overview.md) — connection methods
- [SSH terminal](remote-connection/ssh.md) — direct SSH access
- [Remote desktop](remote-connection/remote-desktop.md) — graphical environment
