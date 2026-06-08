# List of Available Software

We list on the present page the [software]({{ reference_url }}/software/overview/) available on our platform, accessible via the appropriate [connection method]({{ cli_url }}/remote-connection/overview/). The reader is referred to the introductory pages dedicated to each of the packages listed here by clicking the links contained below. Dedicated pages contain references to the relevant documentation explaining the operations of the corresponding software in detail.

## Access Scenarios

Tools can be accessed through one or more of the following methods:
 
 1. The main user interface (in the [subworkflow editor]({{ interface_url }}/workflow-designer/subworkflow-editor/overview/)), 
 2. Remote Desktop (we provide an example for [VESTA](analysis/vesta.md)) in [this page]({{ cli_url }}/remote-connection/actions-rd/open-app/),
 3. [Environment Modules]({{ cli_url }}/cli/modules/) in [command line interface]({{ cli_url }}/cli/overview/).


## Modeling Applications

The platform currently offers the choice between the following software engines for modeling, otherwise known as **[applications]({{ reference_url }}/software/components/)**.

| Name    |  Version(s)      | Access Scenarios (see previous section)      |
| :-------- | ----------- | -------------|
| [Quantum ESPRESSO](modeling/quantum-espresso/overview.md) | 5.1-6.8 | 1, 3|
| [VASP](modeling/vasp/overview.md)      | 5.3.5-5.4.4 | 1, 3 |
| [LAMMPS](modeling/lammps.md)    | 11-2016, 12-2018, 1-2022  | 3 |
| [NWChem](modeling/nwchem.md)    | 6.6, 7.0.2  | 3 |

<!-- TODO: consider re-adding these packages in the future
| [CP2K](modeling/cp2k.md)      | 4.1     | 3 |
| [GROMACS](modeling/gromacs.md) |   5.1.4,2021.5, 2018.3, 2018.2 | 3 |
| [Turbomole](modeling/turbomole.md) | 7.0     | 2, 3 |
| [WIEN2k](modeling/wien2k.md) | 17.1     | 3 |
-->

## Machine Learning

We have a proof-of-concept support for [machine learning]({{ reference_url }}/models-directory/machine-learning/overview/). This application is accessible via the [subworkflow editor interface]({{ interface_url }}/workflow-designer/subworkflow-editor/overview/) only.

## Analysis Tools

We support the following structural analysis and visualization tools through a [remote desktop connection]({{ cli_url }}/remote-connection/remote-desktop/). The reader may click each entry listed below to be redirected to the software's corresponding documentation introduction.

| Name      |  Version(s) | Access Scenarios (see previous section) |
| :-------- | ----------- | ------------- |
| [VMD](analysis/vmd.md) | 1.9.3 | 2, 3 |
| [XCRYSDEN](analysis/xcrysden.md) |  1.5.60 | 2, 3 |
| [VESTA](analysis/vesta.md)  | 3.3.8 | 2, 3 |
| [P4VASP](analysis/p4vasp.md) |  0.3.30 | 2, 3 |

!!!info "Opening graphical software in remote desktop."
    An example of how to open a graphical structural visualization tool in our remote desktop environment is provided [under this page]({{ cli_url }}/remote-connection/actions-rd/open-app/).

## Scripting Applications

Our platform includes support for two widely-used scripting languages, [shell scripting](scripting/shell/overview.md) and [python](scripting/python/overview.md), which are introduced in their respective documentation pages. 

For command line users, we provide a system-default Python installation and recommend users employ virtual environments for controlling the versions of Python packages in [Command Line Interface]({{ cli_url }}/cli/overview/), as explained [in this page]({{ cli_url }}/cli/actions/create-python-env/).

## Development Tools

Users of our [Command Line Interface]({{ cli_url }}/cli/overview/) have at their disposal a comprehensive set of development [compilers](development/compilers.md) and [libraries](development/libraries.md), as well as of [text editors](development/text-editors.md) for inspecting or editing the relevant scripts and simulation files.
