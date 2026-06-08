# Templating for Input Scripts

We implement **templating** for generalizing and automating the generation of **input files**, which are necessary for executing relevant simulations through the required [simulation engine]({{ reference_url }}/software/components/). This ensures, for example, that the same template can conveniently be applied to many different [materials](../../materials/overview.md) under the same [simulation job](../../jobs/overview.md).

## [Concepts](concept.md)

We review and explain the general concept of templating in computer science in [this page](concept.md). 

## [Jinja](jinja.md)

[Under this page](jinja.md) we introduce the basic syntax of the template engine we adopt.

## [Convention](exabyte-convention.md)

The specific aspects of how templating is implemented on our platform are the object of [this discussion](exabyte-convention.md).

## [Example](examples.md)

We provide an example of input file templating for a materials science computation [here](examples.md).

## [User Interface](ui.md)

The [User Interface components](ui.md) which are pertinent to setting templating options, for the generation of input files during the [Design stage of a new Workflow]({{ interface_url }}/workflow-designer/overview/), are reviewed [in this page]({{ interface_url }}/workflow-designer/unit-editor/input-templates/).

## [Tutorials]({{ guide_url }}/tutorials/templating/overview/)

More information about how templating can be adapted to different circumstances, are discussed in the corresponding Tutorial section of our documentation [here]({{ guide_url }}/tutorials/templating/overview/).
