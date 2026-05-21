[//]: # (This tutorial is deprecated)
# Machine Learning: Predict New Properties

In the present tutorial page, we will explore how the results of the [Train Model](train-ml-model.md) derived from [Machine Learning (ML)]({{ reference_url }}/models-directory/machine-learning/overview/) can be used to predict new material [properties]({{ reference_url }}/properties/overview/) by [linear regression]({{ reference_url }}/methods-directory/linear-regression/overview/), such as implemented by the [Exabyte Machine Learning Engine](../../software-directory/machine-learning/exabyte/overview.md).

In the present example, we consider the [Electronic Band Gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) calculated in the [previous tutorial](train-ml-model.md) for the case of Si/Ge-based materials, however the general approach exposed herein can work for many different **target properties**.

## Steps

We follow the below steps, by making use of our [Web Interface](../../ui/overview.md).

1. Pre-requisite: trained model
2. Create "ML Predict" job
3. Select trained model as workflow
4. Select target properties
5. Execute "ML Predict" job
6. View results

## 1. Pre-requisite: Trained Model

The present tutorial assumes that an ML model contained in the [workflow]({{ reference_url }}/workflows/overview/) called "ml_predict" has already been trained to predict the band-gap of Si/Ge-based materials, by following the steps outlined in this [other tutorial](train-ml-model.md).

## 2. Create "ML Predict" Job

The general instructions for [creating a new Job](../../jobs-designer/overview.md) can be followed for setting up a new "ML Predict" [Job]({{ reference_url }}/jobs/overview/), after [opening](../../jobs/actions/create.md) the relevant interface.
 
## 3. Select Trained Model as Workflow
 
The aforementioned "ml_predict" workflow should be [selected](../../jobs-designer/actions-header-menu/select-workflow.md) as the main [Workflow](../../jobs-designer/workflow-tab.md) for the "ML Predict" Job being designed, so that it can be applied to predict the properties of a new set of target [materials](../../jobs-designer/materials-tab.md) similar to the ones used originally to train the model. 

## 4. Select Target Properties

The properties which will be predicted by a trained model are the **target properties** which have been ticked and selected under the [unit editor interface](../../workflow-designer/unit-editor.md) of the "input" [unit]({{ reference_url }}/workflows/components/units/) of the "ml_predict" workflow, under the "Targets" section of the interface.

## 5. Execute "ML Predict" Job

The reader should follow [these instructions](../../jobs/actions/run.md) in order to finally execute the "ML Predict" job, following its creation with [Job Designer](../../jobs-designer/overview.md).

## 6. View Results

The newly predicted properties can finally be inspected under the [results tab](../../jobs/ui/results-tab.md) of [job viewer](../../jobs/ui/viewer.md).

## Animation

In the following animation, we demonstrate how the above steps can be followed to predict the band-gap of a new set of Si/Ge-based materials, using the model trained in a [previous tutorial](train-ml-model.md). For the sake of this example, we predict the bang-gap for the Si4Ge12 stochiometric composition. The results of the ML prediction for both the direct and indirect band gaps (0.525 and 0.490
 eV respectively) are in very good agreement with the values of their direct computation using [DFT]({{ reference_url }}/models-directory/dft/overview/) (0.517 and 0.441 eV respectively).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/JYz51Wq3yEo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
