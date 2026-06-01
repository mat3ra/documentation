# Machine Learning: Predict With a Random Forest for Classification

This tutorial demonstrates how to perform predictions using a Random Forest [^1] trained for classification via
Scikit-Learn. [^2]

!!! warning "Pre-Requisites"
    In order to perform this tutorial, the [Predict with Classification](predict-with-classification.md) tutorial must
    be completed.

## 1. Acquire Data

The data we use in this example comes from the QSAR group's biodegredation database, as hosted on Kaggle. [^3]

The dataset consists of 41 unique descriptors of each molecule, and the goal of the problem is to predict whether the
molecule is biodegredable or not.

The dataset can be found on Kaggle, [here](https://www.kaggle.com/muhammetvarl/qsarbiodegradation).

Before uploading to the platform, remove the "Class" column from the dataset.
We will call this dataset "data_to_classify_with.csv"

## 2. Upload the Data

In order to upload data for predictions, we first click the `Dropbox` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/).
This will bring us to the [Dropbox Page]({{ interface_url }}/jobs/ui/files-tab/). We can then click the "Upload" button, circled
below:

![Dropbox Page with Upload Button Circled](../../images/tutorials/pythonML/dropbox-page-with-upload-circled.png "Dropbox Page with Upload Button Circled")

Then, when the browser's upload window appears, we navigate to where we downloaded the file in section 1, and select it
for upload. If the upload was successful, the file will then be visible in the dropbox.

## 3. Create the ML Job

Next, we can create a new job by selecting the `Create Job` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/). This
will bring us to a new job on the [Job Designer]({{ interface_url }}/jobs-designer/overview/) page.

First, we will give the job a friendly name, such as "Python ML Tutorial Prediction" (see below). Then, we will click
the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) (the three vertical dots in the upper-right of the job
designer), and choose "Select Workflow."

![Job Designer with Python Machine Learning Tutorial Name Set](../../images/tutorials/pythonML/job-designer-python-ml-predict-name.png "Job Designer with Python Machine Learning Tutorial Name Set")

This will bring up the [Select Workflow]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) dialogue. We then
search for "workflow:pyml_predict" and click on it to bring it into the job.

A diagram and detailed description of this workflow can be found
[here](../../software-directory/machine-learning/python-ml/components.md)

## 4. Select the Dataset

The job designer changes now that our ML Predict workflow is selected. The "Materials" tab has now been replaced with
a "Dataset" tab. Just as the "Materials" tab shows a preview of the materials the job will use, the "Dataset" tab shows
a preview of the dataset once it is selected.

To select a dataset, click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) (the three vertical dots in
the upper-right of the job designer) and choose "Select Dataset." This will bring up a files explorer containing all
files presently on the dropbox. Choose the dataset we uploaded earlier, "data_to_classify_with.csv."

![Dataset Tab with Random Forest Predictions](../../images/tutorials/classification_tutorial/dataset-tab-with-predict-data.png "Dataset Tab with Random Forest Predictions")

A preview of the data then appears on the dataset tab, indicating that the data has successfully been loaded.

## 4. Inspect the ML Workflow

We now have our ML workflow selected and our dataset has been supplied.
Select the [Workflows Tab]({{ interface_url }}/jobs-designer/workflow-tab/), and we can see our predict workflow.

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

Click the check-mark in the upper right of the job designer, in the [Header Menu]({{ interface_url }}/jobs-designer/header-menu/) to
save the job. We now return to the [job explorer]({{ interface_url }}/jobs/ui/explorer/) page with the job in a pre-submission
status.

We can now [run the job]({{ interface_url }}/jobs/actions/run/) and wait for it to complete.


## Animation

This tutorial is demonstrated in the following animation:

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/XlOmf1RvazE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## 7. Analyze the Prediction Results

After a few minutes, the job will complete. We can then visit the job's [results tab]({{ interface_url }}/jobs/ui/results-tab/),
where we will see a CSV preview of a file called `predictions.csv`. These are the row-by-row predictions generated by
the model. Under the hood, this file is generated inside the `Model Train and Predict` unit.
