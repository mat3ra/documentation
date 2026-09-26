# Workflow Structure

PythonML workflows contain two subworkflows. The first, called "Set Up the Job" performs actions such as copying data
and setting environment variables necessary for the job to run. The second, called "Machine Learning," contains the
actual machine learning units.

## Example

A diagram of an example workflow can be found below, based on the bank workflow located
[here](https://platform.mat3ra.com/analytics/workflows/rg3HcXd9Rg7hTa5Q3):

![Machine Learning Subworkflow Diagram with Automated Calculation Setup and Pipeline](../../../images/software-directory/machine-learning/python-ml/ml-train-diagram.png "Machine Learning Subworkflow Diagram with Automated Calculation Setup and Pipeline")

### Subworkflow: Set Up the Job

This subworkflow facilitates setting up the PythonML job. Users should not need to edit this workflow. The configuration
of this workflow is handled automatically on the
when [the predict workflow is generated]({{ reference_url }}/properties-directory/non-scalar/workflow/).

### Subworkflow: Machine Learning

This subworkflow is where a user's requested machine learning units reside. This subworkflow is generally the one that
users are expected to modify, to add or remove different machine learning workflow units. In the above diagram, we find
the following units:

| Unit Name                     | Flavor                                       | Description |
|-------------------------------|----------------------------------------------|-------------|
| `Setup Packages and Variables`| `pyml:setup_variables_packages`              |Contains functions and configuration essential for all python-ML Workflows|
| ` Data Input`                 | `pyml:data_input:read_csv:pandas`            |for reading in CSV data using Pandas [^1]|
| `Data Standardize`            | `pyml:pre_processing:standardization:sklearn`|scales the data [^2] such that it has a mean of 0 and a standard deviation of 1, as implemented in Scikit-Learn [^3]|
| `Model Train and Predict`     | `pyml:model:multilayer_perceptron:sklearn`   |a Multilayer Perceptron [^4] implemented in Scikit-Learn [^5]|
| `Parity Plot`                 | `pyml:post_processing:parity_plot:matplotlib`|generates a parity plot [^6] using Matplotlib [^7]|

## Links

[^1]: [read_csv function, Pandas](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html)

[^2]: [Feature Scaling, Wikipedia](https://en.wikipedia.org/wiki/Feature_scaling#Standardization_(Z-score_Normalization))

[^3]: [Standard Scaler, Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html)

[^4]: [Multilayer Perceptron, Wikipedia](https://en.wikipedia.org/wiki/Multilayer_perceptron)

[^5]: [MLPRegressor class Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.neural_network.MLPRegressor.html)

[^6]: [Parity Plot, Wikipedia](https://en.wikipedia.org/wiki/Parity_plot)

[^7]: [Matpotlib Documentation](https://matplotlib.org/)
