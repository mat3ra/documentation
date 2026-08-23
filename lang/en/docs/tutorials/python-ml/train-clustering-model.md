# Train a K-Means Clustering Model with Scikit-Learn

This tutorial demonstrates how to train a [K-Means Clustering](https://en.wikipedia.org/wiki/K-means_clustering) [^1] model using [Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html) [^2].


## 1. Acquire training data

[Unsupervised learning](https://en.wikipedia.org/wiki/Unsupervised_learning) [^3] takes in unlabeled training data and generates its own labels. It is often used as an exploratory tool to find collections of similar items — for example, molecules or crystals with similar properties.

The data used in this example was acquired from [Kaggle](https://www.kaggle.com/anlgrbz/super-conductors) [^4]. It consists of a group of 21,263 superconductors with the following properties:

- Atomic Mass (AMU)
- First Ionization Energy (kJ/mol)
- Atomic Radius (pm)
- Density (kg/m³)
- Electron Affinity (kJ/mol)
- Fusion Heat (kJ/mol)
- Thermal Conductivity (kJ/mol)
- Valence (number of bonds)

For each property, various statistics including mean, weighted mean, and standard deviation are calculated. The dataset was originally posted for predicting superconductor [critical temperatures](https://en.wikipedia.org/wiki/Superconductivity#By_critical_temperature) [^5], but this tutorial uses it to separate the superconductors into clusters.

Due to the platform's upload limit (20 MB), the dataset is truncated to 15,000 examples (16 MB). A pre-processed version is available for download <a href="/extra/files/clustering_data.csv" download="clustering_data.csv">here</a>.


## 2. Upload the training data

Click the `Dropbox` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/) to navigate to the [Dropbox Page]({{ interface_url }}/jobs/ui/files-tab/). Then click **Upload**:

![Dropbox Page with Upload](../../images/tutorials/pythonML/dropbox-page-with-upload-circled.png "Dropbox page with upload circled")

When the browser's upload window appears, navigate to the downloaded file and select it. If successful, the file appears in the dropbox.


## 3. Copy the clustering workflow from the bank

Click the `Bank Workflows` button in the [left sidebar]({{ interface_url }}/ui/left-sidebar/) to navigate to the [Bank Workflows Page]({{ reference_url }}/workflows/bank/). Search for the "Python ML Train Clustering" workflow owned by the "Curators" account, and [copy it to the account]({{ interface_url }}/workflows/actions/copy-bank/).

A diagram and detailed description of this workflow can be found [here]({{ reference_url }}/software-directory/machine-learning/python-ml/components/).


## 4. Create the ML job

Create a new job by clicking `Create Job` in the [left sidebar]({{ interface_url }}/ui/left-sidebar/). Give the job a descriptive name, such as "Python ML Tutorial". Then click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) and choose **Select Workflow**.

![Job Designer with Circles](../../images/tutorials/pythonML/job-designer-with-python-ml-name-and-three-dots-circled.png "Job designer page")

In the [Select Workflow]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) dialogue, search for "Python ML Train Clustering" and select it.


## 5. Select the dataset

Once the ML Training workflow is selected, the *Materials* tab is replaced with a *Dataset* tab.

![Dataset Tab with Data Preview](../../images/tutorials/clustering_tutorial/dataset-tab-with-data.png "Dataset Tab with Data")

Click the [Actions Button]({{ interface_url }}/jobs-designer/header-menu/#Actions) and choose **Select Dataset**. Select "clustering_data.csv" from the file explorer. A preview appears on the dataset tab, confirming the data has been loaded.


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
5. `2D PCA Clusters Plot` — draws the clusters projected onto the first two [principal components](https://en.wikipedia.org/wiki/Principal_component_analysis) [^6]

### 6.1. Set the problem category

Open the *Important Settings* portion of the workflow editor. Set `problem_category` to "clustering".

![Important settings with clustering set](../../images/tutorials/clustering_tutorial/important-settings-problem-category.png "Important settings with clustering set")

### 6.2. Adjust the number of clusters

By default, the workflow splits the dataset into 4 clusters. In order to change this, click the `Model Train and Predict` unit to open the editor. Scroll to line 27 and change `n_clusters` from 4 to 2. Close the unit editor.

![K Means set to two clusters](../../images/tutorials/clustering_tutorial/kmeans-set-to-two-clusters.png "K Means Set to Two Clusters")


## 7. Submit the job

Click the check-mark in the upper right of the job designer, in the [Header Menu]({{ interface_url }}/jobs-designer/header-menu/), to save the job.

![Jobs Tab with ML Training Calculation Set Up](../../images/tutorials/pythonML/jobs-tab-with-ml-train-job-set-up.png "Jobs Tab with ML Training Calculation Set Up")

The job can now be [run]({{ interface_url }}/jobs/actions/run/).


## 8. Analyze the training results

After a few minutes, the job completes. The [Results tab]({{ interface_url }}/jobs/ui/results-tab/) shows two calculated properties. The first, `Machine Learning - Model Train and Predict`, is the predict workflow generated by the training job, which can be used to assign new data points to the identified clusters.

The second result is `Machine Learning - 2D PCA Clusters Plot`, which draws the clusters projected onto their first two principal components. Each color represents a different group; circles represent the training set and squares represent the testing set.

![Results Tab Showcasing Clusters Plot](../../images/tutorials/clustering_tutorial/2d-pca-clusters-plot.png "Results Tab Showcasing Clusters Plot")


## 9. Video walkthrough

This tutorial is demonstrated in the following animation:

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/rChZ6SKOSOA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 10. Links

[^1]: [Wikipedia, K-Means Clustering](https://en.wikipedia.org/wiki/K-means_clustering)
[^2]: [Scikit-Learn, K-Means](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html)
[^3]: [Wikipedia, Unsupervised Learning](https://en.wikipedia.org/wiki/Unsupervised_learning)
[^4]: [Kaggle, Superconductors Dataset](https://www.kaggle.com/anlgrbz/super-conductors)
[^5]: [Wikipedia, Superconductivity](https://en.wikipedia.org/wiki/Superconductivity#By_critical_temperature)
[^6]: [Wikipedia, Principal Component Analysis](https://en.wikipedia.org/wiki/Principal_component_analysis)
