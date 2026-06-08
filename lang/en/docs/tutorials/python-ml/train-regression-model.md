# Machine Learning: Train a Neural Network for Regression

This tutorial demonstrates how to train a multilayer perceptron [^1] for regression using Scikit-Learn [^2].


## 1. Acquire training data

The data used in this tutorial is taken from a recent model [^3] of small molecule adsorption to transition metal nanoparticles. Specifically, the dataset contains DFT-calculated adsorption energies of ·CH<sub>3</sub>, CO, and ·OH radicals on Ag, Au, and Cu nanoparticles ranging in size from 55 to 172 atoms.

<a href="/extra/files/data_to_train_with.csv" download="data_to_train_with.csv">This file</a> contains the data used in this tutorial. A sample of the first 5 lines is shown below:

|PBE_BE_eV|CE_Local_eV|ChemPot_eV|MADS_eV
|-----|----|---|----
|-1.39|-2.38|-4.96|-2.10
|-1.11|-3.35|-4.96|-2.10
|-0.95|-4.81|-4.96|-2.10
|-0.74|-4.60|-4.96|-2.10


## 2. Upload the training data

First, click the `Dropbox` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/) to navigate to the [Dropbox Page]({{ interface_url }}/jobs/ui/files-tab/). Then click the **Upload** button, circled below:

![Dropbox Page with Upload](../../images/tutorials/pythonML/dropbox-page-with-upload-circled.png "Dropbox page with upload circled")

When the browser's upload window appears, navigate to the downloaded file from section 1 and select it for upload. If the upload was successful, the file appears in the dropbox.


## 3. Copy the regression workflow from the bank

Next, click the `Bank Workflows` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/) to navigate to the [Bank Workflows Page]({{ reference_url }}/workflows/bank/). Search for the "Python ML Train Regression" workflow owned by the "Curators" account, and [copy it to the account]({{ interface_url }}/workflows/actions/copy-bank/).

A diagram and detailed description of this workflow can be found [here]({{ reference_url }}/software-directory/machine-learning/python-ml/components/).


## 4. Create the ML job

Create a new job by clicking the `Create Job` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/). This opens a new job on the [Job Designer]({{ interface_url }}/jobs-designer/overview/) page.

First, give the job a descriptive name, such as "Python ML Tutorial" (see below). Then, click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) (the three vertical dots in the upper-right of the job designer), and choose **Select Workflow**.

![Job Designer with Circles](../../images/tutorials/pythonML/job-designer-with-python-ml-name-and-three-dots-circled.png "Job designer page")

This brings up the [Select Workflow]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) dialogue. Search for "Python ML Train Regression" and select it.


## 5. Select the dataset

The job designer changes once the ML Training workflow is selected. The *Materials* tab is replaced with a *Dataset* tab. Just as the *Materials* tab shows a preview of the materials a job uses, the *Dataset* tab shows a preview of the selected dataset.

![Dataset Tab](../../images/tutorials/pythonML/dataset-tab-visible.png "Dataset Tab")

In order to select a dataset, click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) (the three vertical dots in the upper-right of the job designer) and choose **Select Dataset**. This brings up a files explorer containing all files on the dropbox. Select the training set uploaded earlier, "data_to_train_with.csv."

A preview of the data then appears on the dataset tab, indicating that the data has been loaded successfully.


## 6. Configure the workflow

With the ML workflow and training set selected, open the [Workflows Tab]({{ interface_url }}/jobs-designer/workflow-tab/) to view the training workflow.

Two [subworkflows]({{ reference_url }}/workflows/components/subworkflows/) are available: `Set Up the Job` and `Machine Learning`.

The `Set Up the Job` subworkflow contains instructions to copy in the training data.

!!!warning "Do not modify the setup subworkflow"
    The `Set Up the Job` subworkflow is automatically configured during the training process. Modifying it can disrupt creation of the Predict workflow, leading to inaccurate results or a failure to generate a predict workflow.

Select the `Machine Learning` subworkflow by clicking on it. The following workflow units should be visible:

0. `Setup Packages and Variables` — configures the job and downloads all required packages with `pip`
1. `Data Input` — reads the training data from disk
2. `Train Test Split` — splits the data into a training set and a testing set
3. `Data Standardize` — scales the data to mean 0 and standard deviation 1
4. `Model Train and Predict` — handles model training and prediction
5. `Parity Plot` — draws a plot of model predictions versus training data and saves it to disk (displayed on the Results tab)

### 6.1. Set the target column

Open the *Important Settings* portion of the workflow editor. Set `target_column_name` to "PBE_BE_eV" to define the target column of the training set.

![Important settings with target column name set](../../images/tutorials/pythonML/important-settings-with-target-column-name-set.png "Important settings with target column name set")

### 6.2. Adjust model parameters

Return to the *Overview* portion of the workflow editor. Select the `Model Train and Predict` workflow unit, as shown below:

![Workflows tab with ML train subworkflow and train unit circled](../../images/tutorials/pythonML/workflows-tab-with-ml-train-subworkflow-and-train-unit-circled.png "Workflows tab with ML train subworkflow and train unit circled")

Scroll down and change the `hidden_layer_sizes` argument from `(100,)` to `(100,100)` to create two hidden layers of 100 neurons each. Also change `max_iter` to 5000 to train for up to 5000 iterations.

![ML Train Neural Network with 2 Hidden Layers](../../images/tutorials/pythonML/ml-train-neural-network-with-2-hidden-layers.png "ML Train Neural Network with 2 Hidden Layers")

Close the dialogue. The workflow is now configured.


## 7. Submit the job

Click the check-mark in the upper right of the job designer, in the [Header Menu]({{ interface_url }}/jobs-designer/header-menu/), to save the job. The [job explorer]({{ interface_url }}/jobs/ui/explorer/) page displays the job in a pre-submission status.

![Jobs Tab with ML Training Calculation Set Up](../../images/tutorials/pythonML/jobs-tab-with-ml-train-job-set-up.png "Jobs Tab with ML Training Calculation Set Up")

The job can now be [run]({{ interface_url }}/jobs/actions/run/).


## 8. Analyze the training results

After a few minutes, the job completes. The job's [Results tab]({{ interface_url }}/jobs/ui/results-tab/) shows two calculated properties. The first, `Machine Learning - Model Train and Predict`, is the predict workflow generated by the training job. This workflow can be used to apply the trained model to new data for additional predictions.

The second result is `Machine Learning - Parity Plot`, which contains the predicted versus actual values for the adsorption energies.

![Results Tab Showcasing Parity Plot](../../images/tutorials/pythonML/ml-train-results-tab.png "Results Tab Showcasing Parity Plot")


## 9. Video walkthrough

This tutorial is demonstrated in the following animation:

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/ExVa55FPAWg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 10. Links

[^1]: [Wikipedia, Multilayer Perceptron](https://en.wikipedia.org/wiki/Multilayer_perceptron)

[^2]: [Scikit-Learn, MLP Regressor](https://scikit-learn.org/stable/modules/generated/sklearn.neural_network.MLPRegressor.html)

[^3]: [Science Advances, Unfolding Adsorption on Metal Nanoparticles: Connecting Stability with Catalysis](http://doi.org/10.1126/sciadv.aax5101)
