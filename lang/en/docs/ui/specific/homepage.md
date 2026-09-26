# Account Homepage (Entry Gateway)

When a user first logs into our platform, he/<wbr/>she is presented with the
**Entry Gateway**. This homepage shows a summary of various entities such as
materials, workflows and jobs.

 presented under the user's
**default Account**, which can be modified through the [Account Switcher](
../../accounts/ui/switcher.md) by following [this procedure](
../../entities-general/actions/set-default.md). The initial screen of the Entry
Gateway can be retrieved from any page by clicking the Mat3ra Company logo in
the [header](../header-footer.md).

## Initial Options

Immediately after login, the user is first presented with three main options, as
displayed in the image below.

![Platform Homepage](../../images/ui/homepage.webp "Platform Homepage")

These initial options can be navigated by clicking their panels, or `Select`
buttons. The overall result is a tree diagrams of sequential options, which will
be reviewed throughout the rest of this documentation page.

!!!note "Access to platform features"
    Numerous features can be accessed directly by opening either the
    [left-hand](../left-sidebar.md) or [account menu](../account-menu.md).
    Please [contact us](../../ui/support.md) if you have any features requests.

## Query Bar

A query bar <i class="zmdi zmdi-search zmdi-hc-border"></i> is present on top of
the page, allowing the options to be searched at any level.

### Search Tags

This Query bar is populated automatically with tags as the options are selected
by the user. The search is performed under the level of the latest tag.

All tags can be removed simultaneously by clicking the "X" button on the
right-hand side. This reverts the screen to its initial default appearance.
Alternatively, each tag can be deleted in turn, which takes the interface up by
one level each time.

### Search Suggestions

Suggestions are also displayed in real time under the query bar, as new search
keywords are being entered. They can be added as tags to the query by clicking
them.


## Modeling and Simulations <i class="zmdi zmdi-cloud-outline-alt"></i>

The first option allows for the creation of simulation workflows for material
modeling. They can be based on any of the supported theoretical [models]({{ reference_url }}/models/overview/), operated under the associated computational
[methods]({{ reference_url }}/methods/overview/) and [applications]({{ reference_url }}/software-directory/overview/).


!!!note "Note: labeling of options"
    In each flowchart presented in this page, a number or number-letter code is
    present inside each sub-component. It should be referred to in the headers
    of their dedicated explanation paragraphs.

![Modeling Flowchart](../../images/ui/modeling-flowchart.png "Modeling Flowchart")

### 1. Run Simulations

Here, the user can choose to calculate [material properties]({{ reference_url }}/properties/overview/) of interest, through the selection of the
corresponding workflow template. Examples of pre-defined templates may include
total energy calculations, phonon dispersions or electronic bandstructure
calculations.

A sample of workflow templates included under this option is portrayed in the
image below. Clicking any of these available templates creates a new job
implementing the workflow, under the default Project of the user's Account.

![Workflow Templates](../../images/ui/workflow-templates.png "Workflow Templates")


### 2. Design Workflows

Here, the possibility to design new computational workflows is offered.

#### 2A. Density Functional Theory

For example, our platform supports the [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) theoretical framework for
executing electronic structure calculations, as implemented by the
[Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/)
or [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) applications.
Plans are under way to expand the offer to new atomistic simulation approaches,
such as the classical Molecular Dynamics and Multi-scale techniques.

### 3. Connect Remotely

In this section, users can connect to our computational engine through
alternative channels, other than our graphical user interface-based platform.

In future, further remote connection interfaces will be offered to our
customers, including for example the Jupyter web-based python environment
provided with a set of pre-loaded libraries and tools.

#### 3A. Command Line Terminal

The first remote connection method consists in the [Command Line interface](
{{ cli_url }}/remote-connection/web-terminal/) (option "3A").

#### 3B. Remote Desktop

Alternatively, the [Remote Desktop environment](
{{ cli_url }}/remote-connection/remote-desktop/) (option "3B") can also be employed.


## Machine Learning <i class="zmdi zmdi-graduation-cap"></i>

The Machine Learning functionality offered by our platform can be accessed as
the second main option. Such functionality affords for the building of
data-driven statistical models, based on results of materials simulations. The
techniques implemented in our platform are the object of a [dedicated tutorial]({{ guide_url }}/tutorials/ml/overview/).

Machine Learning allows to predict new material properties by applying
previously-trained models. In addition, new models can be trained by designing
appropriate workflows, or use some of their pre-defined templates.

!!! note "Limited availability"
    Machine learning is a feature under active development and has a
    proof-of-concept status. Some items below may not be available yet.

![Machine Learning Flowchart](../../images/ui/ml-flowchart.png "Machine Learning Flowchart")

### 2. Train New Model

New models can be created under this option, by either designing new training
workflows or using a pre-defined template.

#### 2A. Regression linear

This option allows for the building of a predictive model using the linear
regression method. Selecting this option creates the corresponding workflow
under a new job inside the default Project.

## Data Analytics <i class="zmdi zmdi-search"></i>

"Data analytics" option gives the user the possibility to interact with data as
explained below.

![Data Analytics Flowchart](../../images/ui/data-flowchart.png "Data Analytics Flowchart")

### 1. Upload/import

Here, the user can upload or import a new material into the Account-owned
collection from multiple external sources.

#### 1A. Upload Material from File

This option gives the user the possibility to [upload](
../../materials/actions/upload.md) one or multiple local files containing the
relevant crystallographic information about the material under investigation. We
support the CIF, POSCAR and XYZ crystal structure data formats.

#### 1B. Import from a Web Database

We have made the third-party "Materials Project" repository of materials
available to the users of our platform. The materials contained there can thus
be [imported](../../materials/actions/import.md) into the Account-owned
collection.

Support for other databases will be added in future.

### 2. Analyze Data

This features allows materials to be [searched](
../../entities-general/actions/search.md) and inspected by the user.

#### 2A. Search my Materials

This option searches only within the limits of the Account-owned collection of
materials.

#### 2B. Search all Materials

Publicly available materials, originating from across the entire platform, can
be searched and analyzed collectively with this option.
