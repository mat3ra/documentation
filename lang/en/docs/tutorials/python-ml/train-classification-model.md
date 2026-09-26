# Machine Learning: Train a Random Forest for Classification

This tutorial demonstrates how to train a [Random Forest](https://en.wikipedia.org/wiki/Random_forest) [^1] classifier using [Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html) [^2].


## 1. Acquire training data

The data used in this example comes from the QSAR group's [biodegradation database on Kaggle](https://www.kaggle.com/muhammetvarl/qsarbiodegradation) [^3]. The dataset consists of 41 unique descriptors of each molecule, and the goal is to predict whether the molecule is biodegradable or not.

The dataset has been pre-processed to encode class labels as 0 and 1.

Download the dataset <a href="/extra/files/classification_data.csv" download="data_to_train_with.csv">here</a>. For the purposes of this tutorial, it is referred to as "data_to_train_with.csv".


## 2. Upload the training data

Click the `Dropbox` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/) to navigate to the [Dropbox Page]({{ interface_url }}/jobs/ui/files-tab/). Then click the **Upload** button:

![Dropbox Page with Upload](../../images/tutorials/pythonML/dropbox-page-with-upload-circled.png "Dropbox page with upload circled")

When the browser's upload window appears, navigate to the downloaded file and select it. If successful, the file appears in the dropbox.


## 3. Copy the classification workflow from the bank

Click the `Bank Workflows` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/) to navigate to the [Bank Workflows Page]({{ reference_url }}/workflows/bank/). Search for the "Python ML Train Classification" workflow owned by the "Curators" account, and [copy it to the account]({{ interface_url }}/workflows/actions/copy-bank/).

A diagram and detailed description of this workflow can be found [here]({{ reference_url }}/software-directory/machine-learning/python-ml/components/).


## 4. Create the ML job

Create a new job by clicking `Create Job` in the [left sidebar]({{ interface_url }}/ui/left-sidebar/). Give the job a descriptive name, such as "Python ML Tutorial". Then click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) and choose **Select Workflow**.

![Job Designer with Circles](../../images/tutorials/pythonML/job-designer-with-python-ml-name-and-three-dots-circled.png "Job designer page")

In the [Select Workflow]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) dialogue, search for "Python ML Train Classification" and select it.


## 5. Select the dataset

Once the ML Training workflow is selected, the *Materials* tab is replaced with a *Dataset* tab.

![Dataset Tab](../../images/tutorials/classification_tutorial/dataset-tab-with-data.png "Dataset Tab")

Click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) and choose **Select Dataset**. Select "data_to_train_with.csv" from the file explorer. A preview appears on the dataset tab, confirming the data has been loaded.


## 6. Configure the workflow

Open the [Workflows Tab]({{ interface_url }}/jobs-designer/workflow-tab/) to view the training workflow. Two [subworkflows]({{ reference_url }}/workflows/components/subworkflows/) are available: `Set Up the Job` and `Machine Learning`.

!!!warning "Do not modify the setup subworkflow"
    The `Set Up the Job` subworkflow is automatically configured during training. Modifying it can disrupt the Predict workflow.

Select the `Machine Learning` subworkflow. The following workflow units are visible:

0. `Setup Packages and Variables` — configures the job and downloads required packages via `pip`
1. `Data Input` — reads the training data from disk
2. `Train Test Split` — splits the data into training and testing sets
3. `Data Standardize` — scales the data to mean 0 and standard deviation 1
4. `Model Train and Predict` — handles model training and prediction
5. `ROC Curve Plot` — draws a [Receiver Operating Characteristic](https://en.wikipedia.org/wiki/Receiver_operating_characteristic) (ROC) curve [^4]

### 6.1. Set the target column and problem category

Open the *Important Settings* portion of the workflow editor. Set `target_column_name` to "Class" and `problem_category` to "classification".

![Important settings with target column name set](../../images/tutorials/classification_tutorial/important-settings-chosen.png "Important settings with target column name set")


## 7. Submit the job

Click the check-mark in the upper right of the job designer, in the [Header Menu]({{ interface_url }}/jobs-designer/header-menu/), to save the job.

![Jobs Tab with ML Training Calculation Set Up](../../images/tutorials/pythonML/jobs-tab-with-ml-train-job-set-up.png "Jobs Tab with ML Training Calculation Set Up")

The job can now be [run]({{ interface_url }}/jobs/actions/run/).


## 8. Analyze the training results

After a few minutes, the job completes. The [Results tab]({{ interface_url }}/jobs/ui/results-tab/) shows two calculated properties. The first, `Machine Learning - Model Train and Predict`, is the predict workflow generated by the training job, which can be used for predictions on new data.

The second result is `Machine Learning - ROC Curve Plot`, containing the ROC curve for model assessment.

![Results Tab Showcasing ROC Curve](../../images/tutorials/classification_tutorial/ml-train-results-tab.png "Results Tab Showcasing ROC Curve")


## 9. Video walkthrough

This tutorial is demonstrated in the following animation:

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/UJ8ISCYEbSE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 10. Links

[^1]: [Wikipedia, Random Forest](https://en.wikipedia.org/wiki/Random_forest)
[^2]: [Scikit-Learn, Random Forest Classifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)
[^3]: [Kaggle, Biodegradation Database](https://www.kaggle.com/muhammetvarl/qsarbiodegradation)
[^4]: [Wikipedia, Receiver Operating Characteristic](https://en.wikipedia.org/wiki/Receiver_operating_characteristic)
