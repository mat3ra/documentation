# Machine Learning: Predict Using a Neural Network Regression Model

This tutorial demonstrates how to perform predictions using
a [multilayer perceptron](https://en.wikipedia.org/wiki/Multilayer_perceptron)
trained for regression
using [SciKit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.neural_network.MLPRegressor.html).

!!! warning "Pre-Requisites"
    In order to perform this tutorial, the [ML Training](train-regression-model.md) tutorial must be completed.

## 1. Acquire Data

The data we use in this tutorial is taken from a [recent model](http://doi.org/10.1126/sciadv.aax5101) of small molecule
adsorption to transition metal nanoparticles. Specifically, we use DFT-calculated values for the adsorption energy of
·CH<sub>3</sub>, CO, and ·OH radicals to Ag, Au, and Cu nanoparticles ranging in size from 55 to 172 atoms.

<a href="/extra/files/data_to_predict_with.csv" download="data_to_predict_with.csv">This File</a> contains the data we
will use in this tutorial for predictions. A sample of the first 5 lines in the file can be found below:

|CE_Local_eV|ChemPot_eV|MADS_eV
|----|---|----
|-2.38|-4.96|-2.10
|-3.35|-4.96|-2.10
|-4.81|-4.96|-2.10
|-4.60|-4.96|-2.10

## 2. Upload the Data

In order to upload data for predictions, we first click the `Dropbox` button in the [left sidebar](../../ui/left-sidebar.md).
This will bring us to the [Dropbox Page](../../jobs/ui/files-tab.md). We can then click the "Upload" button, circled
below:

![Dropbox Page with Upload Button Circled](../../images/tutorials/pythonML/dropbox-page-with-upload-circled.png "Dropbox Page with Upload Button Circled")

Then, when the browser's upload window appears, we navigate to where we downloaded the file in section 1, and select it
for upload. If the upload was successful, the file will then be visible in the dropbox.

## 3. Create the ML Job

Next, we can create a new job by selecting the `Create Job` button in the [left sidebar](../../ui/left-sidebar.md). This
will bring us to a new job on the [Job Designer](../../jobs-designer/overview.md) page.

First, we will give the job a friendly name, such as "Python ML Tutorial Prediction" (see below). Then, we will click
the [Actions Button](../../jobs-designer/header-menu.md#Actions) (the three vertical dots in the upper-right of the job
designer), and choose "Select Workflow."

![Job Designer with Python Machine Learning Tutorial Name Set](../../images/tutorials/pythonML/job-designer-python-ml-predict-name.png "Job Designer with Python Machine Learning Tutorial Name Set")

This will bring up the [Select Workflow](../../jobs-designer/actions-header-menu/select-workflow.md) dialogue. We then
search for "workflow:pyml_predict" and click on it to bring it into the job.

A diagram and detailed description of this workflow can be found
[here](../../software-directory/machine-learning/python-ml/components.md)

## 4. Select the Dataset

The job designer changes now that our ML Predict workflow is selected. The "Materials" tab has now been replaced with
a "Dataset" tab. Just as the "Materials" tab shows a preview of the materials the job will use, the "Dataset" tab shows
a preview of the dataset once it is selected.

To select a dataset, click the [Actions Button](../../jobs-designer/header-menu.md#Actions) (the three vertical dots in
the upper-right of the job designer) and choose "Select Dataset." This will bring up a files explorer containing all
files presently on the dropbox. Choose the training set we uploaded earlier, "data_to_predict_with.csv."

![Dataset Tab with Multilayer Perceptron Predictions Visible](../../images/tutorials/pythonML/dataset-tab-visible-predictions.png "Dataset Tab with Multilayer Perceptron Predictions Visible")

A preview of the data then appears on the dataset tab, indicating that the data has successfully been loaded.

## 4. Inspect the ML Workflow

We now have our ML workflow selected and our dataset has been supplied.
Select the [Workflows Tab](../../jobs-designer/workflow-tab.md), and we can see our predict workflow.

We can see two [subworkflows]({{ reference_url }}/workflows/components/subworkflows/) available: `Set Up the Job`
and `Machine Learning`.

The `Set Up the Job` subworkflow contains instructions to copy in the trained model as well as the data we have selected.

!!!warning "A Word of Caution"
    The `Set Up the Job` subworkflow has been automatically configured during the training process, and is not
    intended for modification by the user. Changing it can render the predict workflow inoperable, and can lead to
    inaccurate prediction results. Do not modify the `Set Up the Job` subworkflow.

The `Machine Learning` subworkflow contains the individual steps of the trained model we created previously.

There is no further configuration required: the workflow is already trained, and the prediction job is ready to submit.

## 6. Submit the Job

Click the check-mark in the upper right of the job designer, in the [Header Menu](../../jobs-designer/header-menu.md) to
save the job. We now return to the [job explorer](../../jobs/ui/explorer.md) page with the job in a pre-submission
status.

We can now [run the job](../../jobs/actions/run.md) and wait for it to complete.

## 7. Analyze the Prediction Results

After a few minutes, the job will complete. We can then visit the job's [results tab](../../jobs/ui/results-tab.md),
where we will see a CSV preview of a file called `predictions.csv`. These are the row-by-row predictions generated by
the model. Under the hood, this file is generated inside the `Model Train and Predict` unit.

## Animation

This tutorial is demonstrated in the following animation:

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/I1JNj8ZspH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

