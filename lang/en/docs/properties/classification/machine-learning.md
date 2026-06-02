# Classification for Machine Learning purposes

The classification criteria explained in this page complement the more general ones introduced [here]({{ data_url }}/data/classification/). 

## Motivation

On many occasions, terms "Features", "Fingerprints", "Targets" are used for materials informatics purposes. For example, when constructing a machine learning model, a dataset containing information about multiple materials is used in order to find regular patterns and inter-dependencies. Such dataset is usually split into properties that represent the known data, or *features*, and the properties to be predicted, or *targets*.

## Terminology

We clarify this terminology as follows.

- **Feature**: any [property](../overview.md) of a [material](../../materials/overview.md), eg. density or electronic band gap.
- **Fingerprint**: property of a material used as an input for a (statistical modeling) [Workflow](../../workflows/overview.md), equivalent to the concept of **[Descriptive](general.md)** property by definition

> NOTE: by default, we only store the minimal amount of information required to identify a material enough to reveal a set of its **Fingerprints**. Such minimal set of properties is called **Identity Fingerprints**, and the rest - **Derived Fingerprints**.

- **Target**: property of a material obtained as output of a (statistical modeling) Workflow, equivalent to the notion of **[Characteristic](general.md)** property by definition.

Thus, a *property-descriptive-characteristic* triad is equivalent to *feature-fingerprint-target*.
