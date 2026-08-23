# Components

We present in this page the different [components]({{ reference_url }}/software/components/) (executables and flavors)
comprised within our [Python-based](overview.md) machine learning implementation.

Only those components implemented on our platform to date are mentioned here, as can be inspected from the lists of
available executables and flavors under the
[Unit Editor Interface]({{ interface_url }}/workflow-designer/unit-editor/#application).

!!!warning "Implementation on our platform"
    The user who wishes for additional functionality to be added to our platform in future should express so via
    a [support request]({{ interface_url }}/ui/support/).

## Executable

PythonML is based on the `python` [executable]({{ reference_url }}/software/components/#executables), and through this executable
the implemented ML calculations can be performed.

## Training and Prediction

PythonML workflows can be run in either a "Train" or a "Predict" mode, performing different operations based on what the
workflow is being used to do. For example, in "Training" mode, a model may be trained and then saved to a disk. In the
"Predict" mode, the already-trained model would be loaded from the disk, and a prediction would be made using it.

The "Training" or "Predict" status is handled automatically by the platform. In general, new ML models begin in the
"Train" mode. Then, when they are trained, a new workflow is added to the user's account set to the "Predict" mode.

## Structure

PythonML [workflows]('workflow-structure') contain several units executed in a sequence. These units are organized into flavors, based on what
they accomplish when included in a workflow. Generally, flavors behave different based on whether a workflow is being
run to train or whether the workflow is being run to predict. In general, the flavors are highly modular, and act as "
Lego blocks" that can be added or removed from a workflow. We include a variety of flavors by default, to help
facilitate the construction of machine learning workflows.

Flavors are sorted into several categories:
- `setup`, which helps facilitate the initialization and setup of ML jobs
- `data_input`, which deals with data I/O and simple initial operations on the dataset
- `pre_processing`, which processes the data before the model is trained
- `model`, flavors which contain code to train and predict with different types of machine learning models
- `post_processing`, a catch-all for anything that happens after the model has been trained (such as plot generation)

Flavors are named with the following convention:

pyml:category:name-of-the-unit:source-of-the-unit.

All units begin with "pyml," to differentiate them from the existing Python flavors. The category is one of the categories
enumerated above. The name-of-the-unit refers to the type of unit being used (e.g. `lasso` or `train_test_split`). The
source-of-the-unit refers to the main package being used for the unit, such as `sklearn` or `numpy`.

---

### Setup Flavors

Setup flavors facilitate the initialization and setup of ML jobs.

pyml:**setup_variables_packages**

- General settings for PythonML jobs on the platform. This file generally shouldn't be modified directly by users. The "
  datafile" and "is_workflow_running_to_predict" variables are defined in the Important Settings portion of the Jobs
  Designer, and templated into this file. This facilitates the workflow's diverging behavior based on whether it is in
  a "
  train" or "predict" mode.

- Also in this file is the "Context" object, which helps certain python objects persist between workflow units, and
  between training / predict runs.

- Whenever a python object needs to be stored for subsequent runs (such as in the case of a trained model)
  , `context.save()` can be called to save it. The object can then be loaded again by using `context.load`

---

### Data Input Flavors

Data input flavors generally perform I/O or other initial operations on the dataset.

pyml:data_input:**read_csv**:pandas

- This workflow unit reads in data for the ML workflow. If the workflow is in training mode, it will ead in the data
  before converting it to a numpy array, and save it for use later.
- This unit will create variables for the "target" and "descriptors" used by the training set.

pyml:data_input:**train_test_split**:sklearn [^1]

- Splits the dataset into a training and testing set. The variable `percent_held_as_test` in the important settings
  controls how much of the input dataset is held back as a testing set. By default, this unit will place 20% of the
  dataset into the testing set, and 80% into the training set.
- This unit will do nothing in the case of predictions.

---

### Pre-Processing Flavors

In our machine learning platform, "Pre-Processing" is a catch-all term for anything that happens before a model is
trained but after the data has been loaded.

pyml:pre_processing:**min_max_scaler**:sklearn [^2]

- This workflow unit scales the data such that it is on interval `[0,1]`. It then saves the data for use further down
  the road in the workflow, such as un-transforming the data.
- It is important that new predictions are made by scaling the new inputs using the min and max of the original training
  set. As a result, the scaler gets saved in the training phase.
- During a predict workflow, the scaler is loaded, and the new examples are scaled using the stored scaler.

pyml:pre_processing:**remove_missing**:pandas [^3]

- This workflow unit allows missing rows and/or columns to be dropped from the dataset by configuring the `to_drop`
  parameter.
- Valid values for `to_drop` are:
    - `rows`: Rows with missing values will be removed
    - `columns`: Columns with missing values will be removed
    - `both`: Rows and columns with missing values will be removed

pyml:pre_processing:**remove_duplicates**:pandas [^4]

- This workflow unit will drop all duplicate rows, if it is running in the "train" mode.

pyml:pre_processing:**standardization**:sklearn [^5]

- This workflow unit scales the data such that it has a mean of 0 and a standard deviation of 1. It then saves the data
  for use further down the road in the workflow, for use in un-transforming the data.
- It is important that new predictions are made by scaling the new inputs using the mean and variance of the original
  training set. As a result, the scaler gets saved in the training phase.
- During a predict workflow, the scaler is loaded, and the new examples are now scaled using the stored scaler.

---

### Modeling Flavors

When a workflow is run in the training mode, the model is trained and then it is saved, along with a metric to describe
the model's performance (such as RMSE). The model also makes predictions to facilitate generation of a plot of
performance (such as a parity plot or ROC curve).

When a workflow is run in the predict mode, the model is loaded and used to make predictions. These predictions are then
written to a file named "predictions.csv"

#### **Classification**

pyml:model:**random_forest_classification**:sklearn [^6]

- Workflow unit to train a random forest classification model with Scikit-Learn. Model parameters are derived from
  Scikit-Learn's defaults.

#### **Regression**

pyml:model:**adaboosted_trees_regression**:sklearn [^7]

- Workflow unit for adaptive-boosted trees regression with Scikit-Learn. Parameters for the estimator and ensemble are
  derived from Scikit-Learn's defaults.

pyml:model:**bagged_trees_regression**:sklearn [^8]

- Workflow unit for a bagged trees regression model with Scikit-Learn. Parameters for the estimator and ensemble are
  derived from Scikit-Learn's defaults.

pyml:model:**gradboosted_trees_regression**:sklearn [^9]

- Workflow to train the gradient-boosted trees ensemble method with Scikit-Learn. Model parameters are derivedf rom
  Scikit-Learn's defaults.
- Note: In the gradient-boosted trees ensemble used, the weak learners used as estimators cannot be tuned with the same
  level of fidelity allowed in the Adaptive-Boosted Trees ensemble.

pyml:model:**kernel_ridge_regression**:sklearn [^10]

- Workflow unit for a kernelized ridge regression model with Scikit-Learn. Model parameters are derived from
  Scikit-Learn's defaults.

pyml:model:**lasso_regression**:sklearn [^11]

- Workflow unit for a LASSO-based regression model with Scikit-Learn. Model parameters are derived from Scikit-Learn's
  defaults. The alpha parameter has been lowered from a value of 1.0 to 0.1.

pyml:model:**multilayer_perceptron**:sklearn [^12]

- Workflow unit to train a simple feedforward neural network model on a regression problem using Scikit-Learn. Model
  parameters are derived from Scikit-Learn's defaults.

pyml:model:**ridge_regression**:sklearn [^13]

- Workflow unit for a ridge regression model with Scikit-Learn. Alpha is taken from Scikit-Learn's default parameters.

pyml:model:**random_forest_regression**:sklearn [^14]

- This workflow unit trains a random forest regression model with Scikit-Learn. Model parameters are derived from
  Scikit-Learn's defaults.

#### **Unsupervised Learning**

pyml:model:**k_means_clustering**:sklearn [^15]

- Workflow unit to train a k-means clustering model with Scikit-Learn. Model parameters are derived from Scikit-Learn's
  defaults.

---

### Post-Processing Flavors

In our machine learning platform, "Post-Processing" is a catch-all term for anything that happens after a model is
trained. Currently, we offer three different ways to plot training data in this section, one type of plot each for
regression, classification, or unsupervised-learning problems.

pyml:post_processing:**pca_2d_clusters**:matplotlib [^16]

- This unit takes an N-dimensional feature space, and uses Principle Component Analysis (PCA) to project it onto a 2D
  space to facilitate plotting on a 2D scatter plot.
- The 2D space we project onto is the first two principle components identified in PCA, which are the two vectors with
  the highest variance.
- We then pot the labels assigned to the train and test set, and color by class.
- This unit only runs during a training job. It does nothing if the workflow is being run in predict mode.

pyml:post_processing:**parity_plot**:matplotlib [^17]

- This unit generates a parity plot based on the known values in the training data, and the predicted values generated
  using the training (or test) data.
- This unit only runs during a training job. It does nothing if the workflow is being run in predict mode.

pyml:post_processing:**roc_curve**:sklearn [^18]

- Computes and displays the Receiver Operating Characteristic (ROC) curve. This is restricted to binary classification
  tasks.
- This unit only runs during a training job. It does nothing if the workflow is being run in predict mode.

---

### Custom Machine Learning Units

Custom machine learning units are created by selecting the pyml:**custom** flavor.

Custom machine learning units take advantage of our implementation's ability to mark Python objects as needed for
subsequent predict runs. This can be accomplished by calling the `save` and `load` methods of `settings.context`.

Additionally, by taking advantage of `settings.is_workflow_running_to_train`
or `settings.is_workflow_running_to_predict`, users can mark certain sections of code to only run during training or
prediction.

Overall, this allows workflow units to have a divergent behavior based on whether the workflow is in "train" or "
predict" mode. For example, a unit can be configured to train (and then save) a model during a training job, and then to
load the same model and perform a prediction during a predict job.

```python3
import settings

# The context manager exists to facilitate
# saving and loading objects across Python units within a workflow.

# To load an object, simply do to `context.load("name-of-the-saved-object")`
# To save an object, simply do `context.save("name-for-the-object", object_here)`
with settings.context as context:
    # Train
    if settings.is_workflow_running_to_train:
        train_descriptors = context.load("train_descriptors")
        train_target = context.load("train_target")
        test_descriptors = context.load("test_descriptors")
        test_target = context.load("test_target")

        # Do some transformations to the data here

        context.save(train_descriptors, "train_descriptors")
        context.save(train_target, "train_target")
        context.save(test_descriptors, "test_descriptors")
        context.save(train_descriptors, "train_descriptors")


    # Predict
    else:
        descriptors = context.load("descriptors")

        # Do some predictions or transformation to the data here
```

## Links

[^1]: [Train-Test Split, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html)

[^2]: [MinMax Scaler, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html)

[^3]: [DropNA, Pandas](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.dropna.html)

[^4]: [Drop Duplicates, Pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html)

[^5]: [StandardScaler, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html)

[^6]: [Random Forest Classifier, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)

[^7]: [AdaBoost Regressor, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.AdaBoostRegressor.html#sklearn.ensemble.AdaBoostRegressor)

[^8]: [Bagging Regressor, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.BaggingRegressor.html)

[^9]: [Gradient Boosting Regressor, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.GradientBoostingRegressor.html)

[^10]: [Kernel Ridge Regressor, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.kernel_ridge.KernelRidge.html)

[^11]: [LASSO, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Lasso.html)

[^12]: [MLP Regressor, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.neural_network.MLPRegressor.html)

[^13]: [Ridge Regression, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.Ridge.html)

[^14]: [Random Forest Regressor, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html)

[^15]: [K-Means Clustering, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html)

[^16]: [Dimensionality Reduction with PCA, Wikipedia](https://en.wikipedia.org/wiki/Dimensionality_reduction#Principal_component_analysis_(PCA))

[^17]: [Parity Plot, Wikipedia](https://en.wikipedia.org/wiki/Parity_plot)

[^18]: [Receiver Operating Characteristic, Wikipedia](https://en.wikipedia.org/wiki/Receiver_operating_characteristic)
