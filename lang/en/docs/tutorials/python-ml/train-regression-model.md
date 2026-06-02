# Machine Learning: Train a Neural Network for Regression

This tutorial demonstrates how to train a multilayer perceptron [^1] for regression using Scikit-Learn. [^2]

## 1. Acquire Training Data

The data we use in this tutorial is taken from a recent model [^3] of small molecule
adsorption to transition metal nanoparticles. Specifically, we use DFT-calculated values for the adsorption energy of
·CH<sub>3</sub>, CO, and ·OH radicals to Ag, Au, and Cu nanoparticles ranging in size from 55 to 172 atoms.

<a href="/extra/files/data_to_train_with.csv" download="data_to_train_with.csv">This File</a> contains the data we will
use in this tutorial. A sample of the first 5 lines in the file can be found below:

|PBE_BE_eV|CE_Local_eV|ChemPot_eV|MADS_eV
|-----|----|---|----
|-1.39|-2.38|-4.96|-2.10
|-1.11|-3.35|-4.96|-2.10
|-0.95|-4.81|-4.96|-2.10
|-0.74|-4.60|-4.96|-2.10

## 2. Upload the Training Data

In order to upload training data, we first click the `Dropbox` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/).
This will bring us to the [Dropbox Page]({{ interface_url }}/jobs/ui/files-tab/). We can then click the "Upload" button, circled
below:

![Dropbox Page with Upload](../../images/tutorials/pythonML/dropbox-page-with-upload-circled.png "Dropbox page with upload circled")

Then, when the browser's upload window appears, we navigate to where we downloaded the file in section 1, and select it
for upload. If the upload was successful, the file will then be visible in the dropbox.

## 3. Copy the "Python ML Train Regression" Workflow from the Workflow Bank

Next, we select the`Bank Worfklows` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/), which brings us to
the [Bank Workflows Page]({{ reference_url }}/workflows/bank/). We then search for the "Python ML Train Regression" workflow owned
by the "Curators" account, and [copy it to our account]({{ interface_url }}/workflows/actions/copy-bank/).

A diagram and detailed description of this workflow can be found
[here]({{ reference_url }}/software-directory/machine-learning/python-ml/components/).

## 4. Create the ML Job

Next, we can create a new job by selecting the `Create Job` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/). This
will bring us to a new job on the [Job Designer]({{ interface_url }}/jobs-designer/overview/) page.

First, we will give the job a friendly name, such as "Python ML Tutorial" (see below). Then, we will click
the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) (the three vertical dots in the upper-right of the job
designer), and choose "Select Workflow."

![Job Designer with Circles](../../images/tutorials/pythonML/job-designer-with-python-ml-name-and-three-dots-circled.png "Job designer page")

This will bring up the [Select Workflow]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) dialogue. We then
search for "Python ML Train Regression" and select it.

## 5. Select the Dataset

The job designer changes now that our ML Training workflow is selected. The "Materials" tab has now been replaced with
a "Dataset" tab. Just as the "Materials" tab shows a preview of the materials the job will use, the "Dataset" tab shows
a preview of the dataset once it is selected.

![Dataset Tab](../../images/tutorials/pythonML/dataset-tab-visible.png "Dataset Tab")

To select a dataset, click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) (the three vertical dots in
the upper-right of the job designer) and choose "Select Dataset." This will bring up a files explorer containing all
files presently on the dropbox. Choose the training set we uploaded earlier, "data_to_train_with.csv."

A preview of the data then appears on the dataset tab, indicating that the data has successfully been loaded.

## 6. Configure the Workflow

We have now chosen our ML workflow and training set. Select the [Workflows Tab]({{ interface_url }}/jobs-designer/workflow-tab/), and we
can see our training workflow.

We can see two [subworkflows]({{ reference_url }}/workflows/components/subworkflows/) available: `Set Up the Job`
and `Machine Learning`.

The `Set Up the Job` subworkflow contains instructions to copy in the training data.

!!!warning "A Word of Caution"
    The `Set Up the Job` subworkflow is automatically configured during the training process. Modifying it can disrupt
    creation of the Predict workflow, leading to inaccurate results, or a failure to generate a predict workflow.

Select the `Machine Learning` subworkflow by clicking on it. The following workflow units should now be visible:

0. `Setup Packages and Variables` - Configures the job and downloads all required packages with `pip`
1. `Data Input` - Reads the training data from disk
2. `Train Test Split` - Splits the data into a training set and a testing set 
3. `Data Standardize` - Scales the data such that it has mean 0 and standard deviation 1
4. `Model Train and Predict` - Handles model training, and prediction
5. `Parity Plot` - Draws a plot of model predictions versus training data, and saves it to the disk. This plot is shown
   on the Results tab.

We will begin by configuring our `Machine Learning` subworkflow. To begin, select the "Important Settings" portion of the
workflow editor. Then, set `target_column_name` to "PBE_BE_eV" to define the target column of the training set.

![Important settings with target column name set](../../images/tutorials/pythonML/important-settings-with-target-column-name-set.png "Important settings with target column name set" )

Then, go back to the "Overview" portion of the workflow editor. We can now demonstrate how a workflow unit's parameters
can be changed.

Begin by selecting the `Model Train and Predict` workflow unit, as below:

![Workflows tab with ml train subworkflow and train unit circled](../../images/tutorials/pythonML/workflows-tab-with-ml-train-subworkflow-and-train-unit-circled.png "Workflows tab with ml train subworkflow and train unit circled")

We can then scroll down and change the `hidden_layer_sizes` argument from `(100,)` to `(100,100)` to make
our model contain two hidden layers of 100 neurons each. We also change `max_iter` to 5000 to train for up to 5000
iterations.

![ML Train Neural Network with 2 Hidden Layers](../../images/tutorials/pythonML/ml-train-neural-network-with-2-hidden-layers.png "ML Train Neural Network with 2 Hidden Layers")

Then, close the dialogue. The workflow has now been configured, and we are ready to train.

## 7. Submit the Job

Click the check-mark in the upper right of the job designer, in the [Header Menu]({{ interface_url }}/jobs-designer/header-menu/) to
save the job. We now return to the [job explorer]({{ interface_url }}/jobs/ui/explorer/) page with the job in a pre-submission
status

![Jobs Tab with ML Training Calculation Set Up](../../images/tutorials/pythonML/jobs-tab-with-ml-train-job-set-up.png "Jobs Tab with ML Training Calculation Set Up")

We can now [run the job]({{ interface_url }}/jobs/actions/run/) and wait for it to complete.

## 8. Analyze the Training Results

After a few minutes, the job will complete. We can then visit the job's [results tab]({{ interface_url }}/jobs/ui/results-tab/),
where we will see that two properties have been calculated. The first, `Machine Learning - Model Train and Predict` is
the predict workflow that was generated by the machine learning job. The predict workflow can be used to leverage the
trained model for additional predictions on new data.

The second result visible is `Machine Learning - Parity Plot`, which contains the predicted versus actual values for the
adsorption energies we trained the model on.

![Results Tab Showcasing Parity Plot](../../images/tutorials/pythonML/ml-train-results-tab.png "Results Tab Showcasing Parity Plot")

## Animation

This tutorial is demonstrated in the following animation:

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/ExVa55FPAWg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Wikipedia, Multilayer Perceptron](https://en.wikipedia.org/wiki/Multilayer_perceptron)

[^2]: [Scikit-Learn, MLP Regressor](https://scikit-learn.org/stable/modules/generated/sklearn.neural_network.MLPRegressor.html)

[^3]: [Science Advances, Unfolding Adsorption on Metal Nanoparticles: Connecting Stability with Catalysis](http://doi.org/10.1126/sciadv.aax5101)
