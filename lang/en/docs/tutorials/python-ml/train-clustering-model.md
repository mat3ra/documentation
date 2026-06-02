# Train a K-Means Clustering Model with Scikit-Learn

This tutorial demonstrates how to train a K-Means Clustering [^1] model using Scikit-Learn. [^2]

## 1. Acquire Training Data

Unsupervised learning [^3] is a technique that takes in unlabeled training data, and generates its own labels for a
dataset. Oftentimes, it is used as an exploratory tool to find collections of similar items. For example, to find
molecules or crystals with similar properties.

The data used in this example was acquired from Kaggle [^4].

It consists of a group of 21,263 superconductors, along with the following properties:

- Atomic Mass (AMU)
- First Ionization Energy (kJ/mol)
- Atomic Radius (pm)
- Density (kg/m^3)
- Electron Affinity (kJ/mol)
- Fusion Heat (kJ/mol)
- Thermal Conductivity (kJ/mol)
- Valence (number of bonds)

For each property, various properties including mean, the weighted mean, and standard deviation are calculated. The
dataset was originally posted to Kaggle to pose the regression problem of predicting a superconductor's critical
temperature [^5], but for our purposes, we will train a clustering model to separate the superconductors into several
groups.

Due to the filesize limits imposed by our upload system (20 MB), we will truncate at 15,000 examples,
for a 16 MB training set. For convenience, we have processed this file to meet our upload constraint; download it
<a href="/extra/files/clustering_data.csv" download="clustering_data.csv">it here</a>. 

## 2. Upload the Training Data

In order to upload training data, we first click the `Dropbox` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/).
This will bring us to the [Dropbox Page]({{ interface_url }}/jobs/ui/files-tab/). We can then click the "Upload" button, circled
below:

![Dropbox Page with Upload](../../images/tutorials/pythonML/dropbox-page-with-upload-circled.png "Dropbox page with upload circled")

Then, when the browser's upload window appears, we navigate to where we downloaded the file in section 1, and select it
for upload. If the upload was successful, the file will then be visible in the dropbox.

## 3. Copy the "Python ML Train Clustering" Workflow from the Workflow Bank

Next, we select the`Bank Worfklows` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/), which brings us to
the [Bank Workflows Page]({{ reference_url }}/workflows/bank/). We then search for the "Python ML Train Clustering" workflow owned
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
search for "Python ML Train Clustering" and select it.

## 5. Select the Dataset

The job designer changes now that our ML Training workflow is selected. The "Materials" tab has now been replaced with
a "Dataset" tab. Just as the "Materials" tab shows a preview of the materials the job will use, the "Dataset" tab shows
a preview of the dataset once it is selected.

![Dataset Tab with Data Preview](../../images/tutorials/clustering_tutorial/dataset-tab-with-data.png "Dataset Tab with Data")

To select a dataset, click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) (the three vertical dots in
the upper-right of the job designer) and choose "Select Dataset." This will bring up a files explorer containing all
files presently on the dropbox. Choose the training set we uploaded earlier, "clustering_data.csv."

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
2. `Data Standardize` - Scales the data such that it has mean 0 and standard deviation 1
3. `Model Train and Predict` - Handles model training, and prediction
4. `2D PCA Clusters Plot` - Draws a plot of the clusters in the training and testing set, projected onto the first two
principle components [^6] of the dataset.

We will begin by configuring our `Machine Learning` subworkflow. To begin, select the "Important Settings" portion of the
workflow editor. Then, set `problem_category` to "clustering" to state that we are solving a clustering problem.

![Important settings with clustering set](../../images/tutorials/clustering_tutorial/important-settings-problem-category.png "Important settings with clustering set" )

By default, the workflow will split the dataset into 4 clusters.  This can be configured within the
`Model Train and Predict` unit. We will click the `Model Train and Predict` unit to bring up the workflow unit editor.
Then, scroll down to line 27, and change `n_clusters` from 4 to 2. Then, close the unit editor.

![K Means set to two clusters](../../images/tutorials/clustering_tutorial/kmeans-set-to-two-clusters.png "K Means Set to Two Clusters")

The workflow has now been configured, and we are ready to train.

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
trained model for additional predictions on new data. In the case of clustering, this means assigning new values to the
clusters identified by the model.

The second result visible is `Machine Learning - 2D PCA Clusters Plot`, which draws the clusters projected along their
first two principle components. Each color represents a different group. Circles represent the training set, and squares
represent the testing set.

![Results Tab Showcasing Clusters Plot](../../images/tutorials/clustering_tutorial/2d-pca-clusters-plot.png "Results Tab Showcasing Clusters Plot")


## Animation

This tutorial is demonstrated in the following animation:

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/rChZ6SKOSOA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Wikipedia, K-Means Clustering](https://en.wikipedia.org/wiki/K-means_clustering)

[^2]: [Scikit-Learn, K-Means](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html)

[^3]: [Wikipedia, Unsupervised Learning](https://en.wikipedia.org/wiki/Unsupervised_learning)

[^4]: [Kaggle, Superconductors Dataset](https://www.kaggle.com/anlgrbz/super-conductors)

[^5]: [Wikipedia, Superconductivity](https://en.wikipedia.org/wiki/Superconductivity#By_critical_temperature)

[^6]: [Wikipedia, Principle Component Analysis](https://en.wikipedia.org/wiki/Principal_component_analysis)
