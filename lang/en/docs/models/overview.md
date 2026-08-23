# Model

**Models** refer to the general theoretical approach which is considered as part of the current workflow. A model is an entity that contains scientifically valuable information about the approximations used for the given simulation.

In computational science, theoretical models are typically coupled with their corresponding numerical algorithmic implementations, or [methods](../methods/overview.md).

!!! note "Example Model"
    If we use Newtonian mechanics as Model, then we can deduce that the relation between the force applied to an object and its resulting acceleration is `F = ma` (Note: no assumptions concerning the numerical calculation of such a formula in a practical example have yet been made, which is instead the role of the method).

## [Parameters](parameters.md)

We review the parameters affecting the formulation of models [in this page](parameters.md).

## [Structured Representation]({{ data_url }}/models/data/)

We offer an example of JSON structured representation for a model [here]({{ data_url }}/models/data/).

## [Accuracy](accuracy.md)

[This page](accuracy.md) explains the relevance of the concept of accuracy in the context of models, and stresses its difference from the notion of numerical precision which is instead relevant for methods only.

## [Auxiliary Concepts](auxiliary-concepts/reciprocal-space.md)

This sub-section contains auxiliary concepts related to Models. Naturally, we make extensive use of the concept of **reciprocal space**. The notion of reciprocal lattice is introduced [in this section](auxiliary-concepts/reciprocal-space.md).

## [List of Available Models](../models-directory/overview.md)

We present the list of models available within our platform in a [separate section](../models-directory/overview.md) of the documentation.
