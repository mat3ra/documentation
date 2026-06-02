# Machine Learning: Train Linear Regression

!!!warning "Deprecated tutorial"
    This tutorial uses the legacy ML engine. For current Machine Learning workflows, see [Python ML tutorials](../python-ml/train-regression-model.md) or the [MatterSim tutorial](run-mlff-python-workflows-mattersim.md).

This tutorial demonstrates how to build a [machine learning (ML)]({{ reference_url }}/models-directory/machine-learning/overview/) **training model** from a set of [materials]({{ reference_url }}/materials/overview/) called **"train materials"**. The model can then predict the [properties]({{ reference_url }}/properties/overview/) of another set called **"target materials"**, as described in a [separate tutorial](predict-ml-properties.md).

The [Electronic Band Gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) is the target property in this example, though the general approach works for many different properties.


## 1. Prepare the training set

The following stoichiometric combinations of silicon (Si) and germanium (Ge) are used to train the ML model. These structures each contain 16 atoms in a 2×2×2 [supercell]({{ interface_url }}/materials-designer/header-menu/advanced/supercell/) of the cubic-diamond primitive unit cell, and can be generated using [combinatorial sets]({{ interface_url }}/materials-designer/header-menu/advanced/combinatorial-set/) via [Materials Designer]({{ interface_url }}/materials-designer/overview/):

- Si₂Ge₁₄
- Si₆Ge₁₀
- Si₈Ge₈
- Si₁₀Ge₆
- Si₁₂Ge₄
- Si₁₄Ge₂

The trained model can then predict the band gap of a target composition such as Si₄Ge₁₂, as described in [this tutorial](predict-ml-properties.md).


## 2. Obtain training data

### 2.1. Copy the workflow from the bank

A pre-assembled [workflow]({{ reference_url }}/workflows/overview/) for band gap calculations can be imported from the [Workflow Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The import procedure is described [in this page]({{ interface_url }}/workflows/actions/copy-bank/).

### 2.2. Create and run the job

Create a new [Job]({{ reference_url }}/jobs/overview/) using the [Job Designer]({{ interface_url }}/jobs-designer/overview/). [Select]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) all Si/Ge materials from the account-owned [collection]({{ reference_url }}/accounts/collections/) and add them to the job. Under the [Workflow Tab]({{ interface_url }}/jobs-designer/workflow-tab/), [select]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) the band gap workflow imported in the previous step. The job can then be [executed]({{ interface_url }}/jobs/actions/run/).


## 3. Build and train the model

The "ML Train Model" workflow can be imported from the Bank by following the same [import procedure]({{ interface_url }}/workflows/actions/copy-bank/). Create a new [Job]({{ reference_url }}/jobs/overview/), selecting the "ML Train Model" workflow together with the Si/Ge materials for which the band gap was calculated. This allows the ML engine to build a model from the band gap data, which can then [predict](predict-ml-properties.md) band gaps of similar materials.

The [target properties]({{ reference_url }}/properties/classification/machine-learning/) (band gap in this case) can be selected by opening the [unit editor]({{ interface_url }}/workflow-designer/unit-editor/) for the "input" [unit]({{ reference_url }}/workflows/components/units/) and scrolling to the "Targets" section.


## 4. Inspect the trained model

### 4.1. Retrieve the predict workflow

Once the model is trained, a new [Workflow]({{ reference_url }}/workflows/overview/) called **"ml_predict"** is generated and can be retrieved under the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). This workflow is automatically saved to the account-owned [collection]({{ reference_url }}/accounts/collections/) and can be used to **predict** properties of new materials without further physics-based simulations. The prediction procedure is described [in a separate tutorial](predict-ml-properties.md).

### 4.2. View model coefficients

Open the "ml_predict" workflow and view the "Score" [unit]({{ reference_url }}/workflows/components/units/) in the [unit editor]({{ interface_url }}/workflow-designer/unit-editor/), where model coefficients, feature importance, and model **precision** [^1] are stored.


## 5. Video walkthrough

The animation below demonstrates the full procedure for building and inspecting an ML Train Model.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/oEsL9TRZ_FQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 6. Links

[^1]: [Wikipedia, Coefficient of determination](https://en.wikipedia.org/wiki/Coefficient_of_determination)
