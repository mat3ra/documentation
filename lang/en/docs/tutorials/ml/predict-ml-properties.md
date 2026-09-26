[//]: # (This tutorial is deprecated)
# Machine Learning: Predict New Properties

This tutorial demonstrates how the results of the [Train Model](train-ml-model.md) derived from [Machine Learning (ML)]({{ reference_url }}/models-directory/machine-learning/overview/) can be used to predict new material [properties]({{ reference_url }}/properties/overview/) by [linear regression]({{ reference_url }}/methods-directory/linear-regression/overview/).

The [Electronic Band Gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) calculated in the [training tutorial](train-ml-model.md) for Si/Ge-based materials is used as the example, though the approach works for many different **target properties**.


## 1. Pre-requisite: trained model

This tutorial assumes that an ML model in the [workflow]({{ reference_url }}/workflows/overview/) called "ml_predict" has already been trained to predict the band gap of Si/Ge-based materials, following the steps in the [training tutorial](train-ml-model.md).


## 2. Create the ML Predict job

A new "ML Predict" [Job]({{ reference_url }}/jobs/overview/) can be set up by following the general instructions for [creating a new Job]({{ interface_url }}/jobs-designer/overview/).


## 3. Select the trained model as workflow

The "ml_predict" workflow should be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) as the main [Workflow]({{ interface_url }}/jobs-designer/workflow-tab/) for the job. This applies the trained model to predict properties of new [materials]({{ interface_url }}/jobs-designer/materials-tab/) similar to those used in training.


## 4. Select the target properties

The properties to be predicted are the **target properties** selected under the [unit editor]({{ interface_url }}/workflow-designer/unit-editor/) of the "input" [unit]({{ reference_url }}/workflows/components/units/) of the "ml_predict" workflow, in the "Targets" section.


## 5. Submit the job

The "ML Predict" job can be [executed]({{ interface_url }}/jobs/actions/run/) after configuration in [Job Designer]({{ interface_url }}/jobs-designer/overview/).


## 6. View the results

The predicted properties are available under the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).


## 7. Video walkthrough

The animation below demonstrates predicting the band gap of Si₄Ge₁₂ using the model trained in the [training tutorial](train-ml-model.md). The ML-predicted direct and indirect band gaps (0.525 and 0.490 eV) are in good agreement with the [DFT]({{ reference_url }}/models-directory/dft/overview/)-calculated values (0.517 and 0.441 eV).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/JYz51Wq3yEo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
