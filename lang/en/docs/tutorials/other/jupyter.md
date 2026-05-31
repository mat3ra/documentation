# Jupyter Notebook

This tutorial page explains how to create a Jupyter Notebook environment through [Jupyter Lab](../../software-directory/scripting/jupyter-lab/overview.md) application following the below steps.

## Generate RESTFul API Tokens

The Jupyter notebook environment in the present tutorial is used to run an IPython notebook from [Exabyte API Examples Repository]({{ dev_url }}/rest-api/api-examples/) in which a connection is made to the RESTFul API to retrieve a list of materials. In order to establish the connection, one should generate RESTFul API tokens following the steps described in [here]({{ dev_url }}/rest-api/authentication/).

## Upload IPython Notebooks

Jupyter Notebook is started on the account [Dropbox]({{ dev_url }}/data-in-objectstorage/dropbox/) directory. This directory provides users with access to previously uploaded/created IPython notebooks. Here, **settings.py** file contains the variables required to configure the RESTFul API endpoints and **get_materials_by_formula.ipynb** from the [Exabyte API Examples Github Repository]({{ dev_url }}/rest-api/api-examples/) are uploaded to Dropbox to be later used inside the Jupyter notebook environment.

## Create Jupyter Job

A simulation job is required to launch a Jupyter notebook. To create a new job, click on the **Create Job** link located on the [left-hand Sidebar](../../ui/left-sidebar.md) which takes you to the [Job Designer](../../jobs-designer/overview.md) page where you can configure Jupyter Notebook environment.

## Choose Workflow

Jupyter Notebook installation and configuration is handled through the Jupyter Notebook [workflow]({{ reference_url }}/workflows/overview/) that should be [imported](../../workflows/actions/copy-bank.md) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/) before the job is created. This workflow can later be [selected](../../jobs-designer/actions-header-menu/select-workflow.md) and added to the [job being created](../../jobs-designer/workflow-tab.md).

## Adjust Jupyter Notebook Environment

Jupyter Notebook is installed inside a Python [virtual environment](https://virtualenv.pypa.io/en/latest/) with no additional packages initially. The environment can be customized by navigating to the [workflow tab](../../jobs-designer/workflow-tab.md) and adjusting the **configure.sh** script located inside the **notebook** unit. Here, we install [Exabyte API Client]({{ dev_url }}/rest-api/api-client/) Python package to connect to Exabyte RESTFul API.

## Submit Job

Before [submitting](../../jobs/actions/run.md) the [job]({{ reference_url }}/jobs/overview/), you should click on the ["Compute" tab](../../jobs-designer/compute-tab.md) of [Job Designer](../../jobs-designer/overview.md) and inspect the [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) included therein.

## Access Jupyter Notebook

The Jupyter notebook can be accessed when the job is active by navigating to the [workflow tab](../../jobs-designer/workflow-tab.md) and opening the **notebook** unit. Wait for the Jupyter Notebook to start, as installation and configuration process takes some time, then click on the **Notebook** or **Lab** links to access the environment.

!!!note "Do not use the URL Inside the Output File"
    Do not use the URL printed in the output file as the notebooks can not be accessed via printed URL for security reasons.

## Save Jupyter Notebooks

**Make sure to save and checkpoint the notebook after introducing any changes**. The "save and checkpoint" Jupyter action overwrites the original notebook loaded from Dropbox and saves a copy of the notebook inside **checkpoints** directory located in the [job working directory](../../jobs-cli/batch-scripts/directories.md#working-directory). The checkpoints will be later accessible through the [Job Files Explorer]({{ dev_url }}/data-in-objectstorage/files/) tab.

## Stop Jupyter Environment

When don editing, the Jupyter Notebook environment can be stopped by either clicking the **Quit** button in Jupyter Notebook or [terminating](../../jobs/actions/terminate.md) the job. In either case, **make sure to save any changes you have made before stopping the notebook as unsaved changes will be lost otherwise**.

## Access Modified Files

As explained in the [dedicated section](../../software-directory/scripting/jupyter-lab/data.md) the modified IPython files, as well as the checkpoints at each save, and the other files associated with the job can be accessed from the Dropbox folder, the job and through command-line.

## Animation

We demonstrate the steps mentioned above in the animation below.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/29B1GOnZPNU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
