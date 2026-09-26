# Running Jobs via Web Interface

This page explains how to run a simple [density functional theory calculation]({{ reference_url }}/models-directory/dft/overview/) to obtain [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of silicon via our main
[Web Interface]({{ interface_url }}/ui/overview/).

Before going into the detailed step-by-step instructions, first we present a
short video tutorial to get an overview of the process and look-and-feel of
various UI components of Mat3ra web platform.

<div class="video-wrapper">
<iframe class="gifffer"
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/hT1VBFH7HHo?controls=0"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>
</div>

Running simulations in Mat3ra web platform involves three main steps:

1. Specify the material system by creating or importing crystal structure
2. Create or import workflow, which specifies the simulation steps
3. Create and submit job with material(s) of interest, workflow steps and
  required compute parameters.

Each [account]({{ reference_url }}/accounts/overview/) is pre-configured with a default
[material]({{ reference_url }}/materials/overview/) and [workflow]({{ reference_url }}/workflows/overview/). Silicon with standard FCC structure is the default
material, and "Total Energy" calculation with Quantum ESPRESSO is the default
workflow added to each account on creation. However, it is possible to set a
different material and workflow as default during the account creation or later.
We maintain a ["Bank"]({{ reference_url }}/entities-general/bank/) (collection) of materials
and workflows, which includes both Mat3ra-curated and user contributed material
structures and workflows.


## 1. Material structure

There are several ways, we can add new material structures to our account
collection:

- Import crystal structures from the [Materials Bank]({{ reference_url }}/entities-general/bank/)
- Import crystal structures from a third-party source such as
  [Materials Project](https://materialsproject.org/) using [Import]({{ interface_url }}/materials/actions/import/) action
- Upload crystal structures from your local computer such as CIF, POSCAR
  formatted files using [Upload]({{ interface_url }}/materials/actions/upload/) action
- Create a new material structure from scratch using [Materials Designer]({{ interface_url }}/materials-designer/overview/).

To import a material or workflow from the Bank to user's own account collection,
select the "Bank" option in the [left-hand sidebar]({{ interface_url }}/ui/left-sidebar/),
and then select "Materials" or "Workflows" as the user prefers. Then select the
desired material or workflow entry and click "Copy" button in the Actions
column, as explained in more detail [here]({{ interface_url }}/entities-general/actions/copy-bank/). Readers can find additional
details on how to [import]({{ interface_url }}/materials/actions/import/) materials with the
aid of the incorporated Mat3ra Materials Designer tool, as well as further
setting a material as the [default]({{ interface_url }}/entities-general/actions/set-default/) for the account.


## 2. Workflow steps

A workflow can be created from scratch or imported from the Workflows Bank. In
the animation below, we demonstrate how to import the "Band Structure + Density
of States" workflow for [Quantum ESPRESSO](
{{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) from the
Workflow Bank to our account collection.

<img data-gifffer="/images/getting-started/run-first-simulation-import-workflow.gif"/>

The above task involves following steps:

  1. Navigate to the [Workflows Bank]({{ reference_url }}/workflows/bank/) page by clicking
  on the "Bank" option in the [left-hand sidebar]({{ interface_url }}/ui/left-sidebar/)
  2. Search with the text "curators" to filter workflows created by the
  Mat3ra "Curators" account
  3. Sort workflows by name, and look for the "Band Structure + Density of
  States" workflow for Quantum ESPRESSO and click on the "Copy" button to add it
  to our account collection. If the copy button is not visible, please click on
  the vertical dots in the Actions column to reveal hidden action items.

Now the workflow is added to the account collection, and can be found under the
Workflows tab. Click on the workflow name to open the workflow details page,
where further adjustments can be made to the workflow such as "Important
Settings" or modify the [input files]({{ interface_url }}/workflow-designer/unit-editor/input-templates/) for individual units.

![Edit unit](../../images/getting-started/run-first-simulation-edit-unit.webp "Subworkflow overview in the Workflow Explorer")


## 3. Job Designer

Once we have a material structure and workflow in hand, we can either use the
"Create Job" button in the [left-hand sidebar]({{ interface_url }}/ui/left-sidebar/) or
first navigate to the [Jobs Designer page]({{ interface_url }}/jobs-designer/overview/) and
then click on the "Create" job button.

![Create job button](../../images/getting-started/run-first-simulation-create-job.webp "Create job")

On the Job creation page, we can:

- Click on the "Select Job Actions" dropdown menu, and select a [material]({{ interface_url }}/jobs-designer/materials-tab/) or multiple materials from user's
  account collection (in this tutorial, we will use the default selection of
  Silicon)
- Agiain, click on the "Select Job Actions" dropdown menu, click
  "Select Workflow" and choose "Band Structure + Density of States" workflow
  that we imported earlier
- Navigate among "Materials", "Workflow" and "Compute" tabs to review and adjust
  various parameters if needed.

![Materials viewer](../../images/getting-started/run-first-simulation-tab-1-materials.webp "Materials viewer")


### 3.1. Materials Tab

[Materials Tab]({{ interface_url }}/jobs-designer/materials-tab/) lets the user choose one
or more previously imported [materials]({{ reference_url }}/materials/overview/) for use
in the calculation. We will proceed with the default structure of Silicon for
this demonstration.


### 3.2. Workflow Tab

Simulations usually have multiple steps that need to be executed in a certain
order. This sequence of steps are defined as a ["Workflow"]({{ reference_url }}/workflows/overview/).

A workflow consists of one or multiple ["Subworkflows"]({{ reference_url }}/workflows/components/subworkflows/), as such each Subworkflow can only
contain one [modeling engine]({{ reference_url }}/software/overview/) and one
[theoretical model]({{ reference_url }}/models/overview/) (eg. [Quantum ESPRESSO](
{{ reference_url }}/software-directory/modeling/quantum-espresso/overview/), or "espresso",
and [density functional theory]({{ reference_url }}/models-directory/dft/overview/)
respectively). Therefore, if a simulation involves multiple simulation engines
in the same workflow, e.g, Quantum ESPRESSO for DFT and LAMMPS for molecular
dynamics, then we must create multiple subworkflows.

The subworkflow ["Overview" tab]({{ interface_url }}/workflow-designer/subworkflow-editor/overview-tab/) contains individual
computational building blocks or ["Units"]({{ reference_url }}/workflows/components/units/).
Various simulation parameters can be reviewed and adjusted under the
["Important Settings"]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/), such as:
[k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) and
[k-point path]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/paths/)
in the [reciprocal space]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/),
relevant for a "Band Structure" calculation. Finally, "Save and Exit"
the job designer.


![Workflow Tab](../../images/getting-started/run-first-simulation-tab-2-workflow.webp "Important Settings in Workflow Tab of Job Designer")


### 3.3. Compute Tab

The ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) lets the user set
various compute parameters, such as cluster, queue, number of nodes and
number of processor cores per node to be used for the simulation, maximum time
limit and other relevant [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). We set the maximum time limit for
the calculation to properly schedule the allocation of resources. The format is
HH:MM:SS, so that `01:00:00` corresponds to up to 1 hour runtime. One can also
choose to be notified of the job status by clicking on his/her name in the
["Notifications" section]({{ resources_url }}/infrastructure/compute/parameters/#notifications).

![Compute Tab](../../images/getting-started/run-first-simulation-tab-3-compute.webp "Compute Tab")


## 4. Run Calculation

After saving the job, the user is redirected back to the default
["Project" page]({{ interface_url }}/jobs/ui/project-page/). Here, the user can
[submit the job]({{ interface_url }}/jobs/actions/run/) and track its [status]({{ reference_url }}/jobs/status/).

### 4.1. Submit and Track Progress

The user can run the job by clicking on the "Run" button in the Actions column,
or clicking on the three vertical dots and choosing ["Run"]({{ interface_url }}/jobs/actions/run/) action.

The [status]({{ reference_url }}/jobs/status/) will change from "pre-submission" to
"submitted". This means that the job is finally submitted to our
[computing clusters]({{ resources_url }}/infrastructure/clusters/overview/). Depending on
the load, it may take some time for it to become "Active" and thus start
executing.

The user can click on the job name to monitor the progress of the job in real
time within the [Job Viewer Interface]({{ interface_url }}/jobs/ui/viewer/).


### 4.2. View Results and Access Files

The [Job Viewer screen]({{ interface_url }}/jobs/ui/viewer/) tracks the input parameters,
output text, and convergence parameters involved in the computation (total
energy in this tutorial). Once the job is completed, user can navigate to the
[Results Tab]({{ interface_url }}/jobs/ui/results-tab/) to [view summary of results]({{ interface_url }}/jobs/ui/results-tab/), and preview or download [output files]({{ interface_url }}/jobs/ui/files-tab/) from the "Files" tab.


## 5. Done

We have demonstrated in the present page how a simple electronic band structure
calculation can be run using Mat3ra web interface. For a more comprehensive
tutorials, readers may refer to the dedicated ["Tutorials" section](
../../tutorials/overview.md) of our documentation.

![simple electronic band structure calculation](
../../images/getting-started/run-first-simulation-view-bandstructure.webp "simple electronic band structure calculation")
