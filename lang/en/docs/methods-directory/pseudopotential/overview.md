# Plane-wave Pseudopotential Method

The Plane-wave Pseudopotential Method is based upon the implementation of plane-waves as a basis set for representing the electronic wavefunctions of a material [^1], as well as the adoption of pseudopotentials [^2].
 
This method is widely used as an effective algorithmic recipe for the computational formulation and implementation of the [DFT theoretical model](../../models-directory/dft/overview.md).  


## [Default](default.md)

[This page](default.md) explains the default conventions used for the method.

## [Parameters](parameters.md)

[This page](parameters.md) contains a list of the fundamental computational parameters involved in the Plane-wave Pseudopotential Method.

## [Actions](actions.md)

We introduce [here](actions.md) the action for uploading a custom Pseudopotential file to our platform via the [Subworkflow Editor Interface]({{ guide_url }}/workflow-designer/subworkflow-editor/overview/). 

## [Precision](precision.md)

We discuss the parameters that limit the [numerical precision](../../methods/precision.md) of the plane-wave pseudopotential method [here](precision.md).

## [Structured Representation]({{ data_url }}/methods-directory/pseudopotential/data/)

[This page]({{ data_url }}/methods-directory/pseudopotential/data/) contains an example [structured representation]({{ data_url }}/data-structured/overview/) for the method.

## [Important Settings](important-settings.md)

We explain [under this page](important-settings.md) how important settings concerning the method can be set under the [Subworkflow Editor Interface]({{ guide_url }}/workflow-designer/subworkflow-editor/overview/) of [Workflow Designer]({{ guide_url }}/workflow-designer/overview/).

## Links

[^1]: [Plane Waves as a Basis, Durham University Website](http://cmt.dur.ac.uk/sjc/thesis_dbj/node16.html)

[^2]: [Wikipedia Pseudopotential, Website](https://en.wikipedia.org/wiki/Pseudopotential)
