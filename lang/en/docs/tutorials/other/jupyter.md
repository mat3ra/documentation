# Jupyter Notebook

This tutorial explains how to create a Jupyter Notebook environment through the [Jupyter Lab]({{ reference_url }}/software-directory/scripting/jupyter-lab/overview/) application.


## 1. Generate RESTful API tokens

The Jupyter notebook environment in this tutorial is used to run an IPython notebook from the [Exabyte API Examples Repository]({{ developers_url }}/rest-api/api-examples/) in which a connection is made to the RESTful API to retrieve a list of materials. In order to establish the connection, RESTful API tokens must be generated following the steps described [here]({{ developers_url }}/rest-api/authentication/).


## 2. Upload IPython notebooks

Jupyter Notebook is started on the account [Dropbox]({{ resources_url }}/data-in-objectstorage/dropbox/) directory. This directory provides access to previously uploaded or created IPython notebooks. The **settings.py** file contains the variables required to configure the RESTful API endpoints, and **get_materials_by_formula.ipynb** from the [Exabyte API Examples GitHub Repository]({{ developers_url }}/rest-api/api-examples/) should be uploaded to Dropbox for later use inside the Jupyter notebook environment.


## 3. Create the Jupyter job

A simulation job is required to launch a Jupyter notebook. Click the **Create Job** link on the [left-hand Sidebar]({{ interface_url }}/ui/left-sidebar/) to open the [Job Designer]({{ interface_url }}/jobs-designer/overview/) page.


## 4. Select the workflow

The Jupyter Notebook [workflow]({{ reference_url }}/workflows/overview/) should be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/) before the job is created. This workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 5. Adjust the Jupyter Notebook environment

Jupyter Notebook is installed inside a Python [virtual environment](https://virtualenv.pypa.io/en/latest/) with no additional packages initially. The environment can be customized by navigating to the [workflow tab]({{ interface_url }}/jobs-designer/workflow-tab/) and adjusting the **configure.sh** script located inside the **notebook** unit. In this example, the [Exabyte API Client]({{ developers_url }}/rest-api/api-client/) Python package is installed to connect to the RESTful API.


## 6. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), click the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) to inspect the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/).


## 7. Access the Jupyter Notebook

The Jupyter notebook can be accessed when the job is active by navigating to the [workflow tab]({{ interface_url }}/jobs-designer/workflow-tab/) and opening the **notebook** unit. After the installation and configuration process completes, click the **Notebook** or **Lab** links to access the environment.

!!!note "Do not use the URL inside the output file"
    The URL printed in the output file cannot be used, as notebooks are not accessible via that URL for security reasons.


## 8. Save Jupyter notebooks

**It is essential to save and checkpoint the notebook after introducing any changes.** The "save and checkpoint" Jupyter action overwrites the original notebook loaded from Dropbox and saves a copy inside the **checkpoints** directory located in the [job working directory]({{ cli_url }}/jobs-cli/batch-scripts/directories.md#working-directory). The checkpoints are later accessible through the [Job Files Explorer]({{ resources_url }}/data-in-objectstorage/files/) tab.


## 9. Stop the Jupyter environment

When editing is complete, the Jupyter Notebook environment can be stopped by either clicking the **Quit** button in Jupyter Notebook or [terminating]({{ interface_url }}/jobs/actions/terminate/) the job. **Any unsaved changes are lost when the notebook is stopped.**


## 10. Access modified files

As explained in the [dedicated section]({{ data_url }}/software-directory/scripting/jupyter-lab/data/), the modified IPython files, checkpoints at each save, and other files associated with the job can be accessed from the Dropbox folder, the job, and through the command-line.


## 11. Video walkthrough

The animation below demonstrates all steps described above.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/29B1GOnZPNU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
