# Method Parameters

Our platform supports the following method parameters, which can be edited by the user within the "Overview" tab of the [Subworkflow Editor Interface]({{ interface_url }}/workflow-designer/subworkflow-editor/overview-tab/).
 
## Type
  
Type of the method (eg. [Plane-wave pseudopotential](../methods-directory/pseudopotential/overview.md), for example).

## Subtype

We refer to **Subtypes** as a generic sub-classification of the main method type.
 
## [Precision](precision.md)

[Precision](precision.md) is a complex general parameter that contains multiple other datapoints and has specific implementation for each supported method type.

## Method Data

**Method Data** is a complex general parameter that contains multiple other data items that specific for each supported method type. 

!!! note "Example Method Data"
    For example, in case of the [Plane-wave pseudopotential method](../methods-directory/pseudopotential/overview.md), Method Data contains the pseudopotentials themselves.

## Specific Implementation

Consult [Methods Directory](../methods-directory/overview.md) for specifics about the parameters of each supported method.