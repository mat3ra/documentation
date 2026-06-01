[//]: # (This tutorial is deprecated)
# Machine Learning: Train Linear Regression

This tutorial demonstrates how to build a [machine learning (ML)]({{ reference_url }}/models-directory/machine-learning/overview/) **training model** based upon a set of [materials]({{ reference_url }}/materials/overview/) called **"train materials"**. This model can then be used to predict the [properties]({{ reference_url }}/properties/overview/) of another set called **"target materials"**, based on the procedure outlined in a [separate tutorial](predict-ml-properties.md). 

We consider the [Electronic Band Gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) in the present example, however the general approach can work for many different **target properties**.

## Training Set

For the sake of the present tutorial example, we will consider the following stochiometric combinations of the elements silicon (Si) and germanium (Ge) to train our ML model for predicting the band-gap. These structures all contain a total of 16 atoms, in the form of a 2x2x2 [supercell]({{ interface_url }}/materials-designer/header-menu/advanced/supercell/) of the cubic-diamond primitive unit cell, and can be generated through the help of [combinatorial sets]({{ interface_url }}/materials-designer/header-menu/advanced/combinatorial-set/) via [Materials Designer]({{ interface_url }}/materials-designer/overview/).

- Si2 Ge14
- Si6 Ge10
- Si8 Ge8
- Si10 Ge6
- Si12 Ge4
- Si14 Ge2

## Targets

In [this other tutorial](predict-ml-properties.md), we explain how the model trained with the above materials can be used to predict the band-gap of another similar target composition, consisting in Si4Ge12.

## Steps

We follow the below steps, by making use of our [Web Interface]({{ interface_url }}/ui/overview/).

1. Obtain Training Data
2. Build ML Train model based on the "train materials"
3. Inspect Trained Model

## 1. Obtain Training Data

### Copy Workflow from Bank

The user can import a pre-assembled [workflow]({{ reference_url }}/workflows/overview/) for calculating the band-gap of materials directly from the [Workflow Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). We explain the procedure for doing so [in this page]({{ interface_url }}/workflows/actions/copy-bank/).

### Create and Run Job

Once the appropriate workflow has been copied from the Bank, we can proceed with the creation of a new [Job]({{ reference_url }}/jobs/overview/)
using the [Job Designer interface]({{ interface_url }}/jobs-designer/overview/). We first need to [select]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) all the aforementioned materials containing Si and Ge from the account-owned materials [collection]({{ reference_url }}/accounts/collections/), and thus add them to the job being created. 

Under the [Workflow Tab]({{ interface_url }}/jobs-designer/workflow-tab/) of Job Designer, we then need to [select]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) the band-gap workflow imported previously. At this point, the Job can be [executed]({{ interface_url }}/jobs/actions/run/) for the computation of the band-gap for our set of Si/Ge-based materials. 

## 2. Build/Train a Model

The "ML Train Model" Workflow can be imported from the Bank into the account-owned collection by repeating the procedure outlined [here]({{ interface_url }}/workflows/actions/copy-bank/).

The user should then repeat the same procedure for [creating and executing]({{ interface_url }}/jobs-designer/overview/) a new [Job]({{ reference_url }}/jobs/overview/) as the preceding step, selecting the "ML Train Model" Workflow this time in conjunction with the Si/Ge-containing materials for which the band gap was calculated previously. This allows the Exabyte Machine Learning Engine to build the ML Train Model based upon the results of such band gap computations, which can then be used to [predict](predict-ml-properties.md) the band gaps of other similar materials.

The [target properties]({{ reference_url }}/properties/classification/machine-learning/) (the band gap in this case) can be selected by opening the [unit editor]({{ interface_url }}/workflow-designer/unit-editor/) for the "input" [unit]({{ reference_url }}/workflows/components/units/) of the "ML Train Model" Workflow, and scrolling down to the "Targets" section within the editor interface.

## 3. Inspect Trained Model

### Model Stored as Workflow

Once the ML Train Model has been built, a new [Workflow]({{ reference_url }}/workflows/overview/) called **"ml_predict"** is generated and can be retrieved under the [results tab]({{ interface_url }}/jobs/ui/results-tab/) of [job viewer]({{ interface_url }}/jobs/ui/viewer/) for the ML train job.

This "ml_predict" workflow is automatically saved to the account-owned [collection]({{ reference_url }}/accounts/collections/) of workflows, visible through [Workflow Explorer]({{ interface_url }}/workflows/ui/explorer/). It can subsequently be used at the moment of [creation of a new Job]({{ interface_url }}/jobs-designer/overview/), to **predict** the properties (such as the band-gap) of new materials based upon statistical considerations formed from the trained model, without consequently the need for further physics-based simulations. We explain the procedure to perform such predictions [in a separate tutorial page](predict-ml-properties.md).

### Model Coefficients

Opening the "ml_predict" Workflow allows the user to view the "Score" [unit]({{ reference_url }}/workflows/components/units/) under the corresponding [unit editor interface]({{ interface_url }}/workflow-designer/unit-editor/), where the model coefficients and importance are stored, together with an indication of the model **precision** [^1].

## Animation

We demonstrate the [Web Interface]({{ interface_url }}/ui/overview/)-based procedure involved in building and then inspecting the ML Train Model in the animation below.   

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/oEsL9TRZ_FQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Wikipedia Coefficient of determination, Website](https://en.wikipedia.org/wiki/Coefficient_of_determination)
