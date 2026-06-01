# Python-Based Machine Learning

We provide a proof-of-concept support for [Machine Learning]({{ reference_url }}/models-directory/machine-learning/overview/)
based in [Python](../../scripting/python/overview.md) and Scikit-Learn [^1].

## Accessibility

This machine learning implementation is accessible via the
[subworkflow editor interface](../../../workflow-designer/subworkflow-editor/overview.md).
Pre-assembled ML workflows can be imported directly from the [Workflows Bank]({{ reference_url }}/workflows/bank/).

## Workflow Structure

Python ML workflows contain two subworkflows: one to set to prepare the job for model training, and another to handle
training and prediction with the model. For more details, please see [this](workflow-structure.md) page.

## Components

Machine learning subworkflows can perform a variety of operations on the data before and after training, such as 
scaling the data or creating a plot. In addition, several models covering regression, classification, and clustering are
implemented. For details on the operations available, please see [this](components.md) page.

## Links

[^1]: [Scikit-Learn Documentation](https://scikit-learn.org/stable/)
