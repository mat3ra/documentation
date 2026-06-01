# Properties 

The present section of the documentation explains our approach to organizing, storing and interacting with the **properties** of the different [entities](../entities-general/overview.md) present across our platform.

## Definition
 
**"Property"** is any measurable quantity which provides information about the entity under consideration. Properties can hold information about [Materials](../materials/overview.md) and [Workflows](../workflows/overview.md) as demonstrated [here]({{ guide_url }}/getting-started/important-concepts/)

Exact set of properties that have to be supplied to, and can be extracted as a result of, a [Job](../jobs/overview.md) computation, can vary depending on the Workflow type and on the [models]({{ reference_url }}/models/overview/)/[methods]({{ reference_url }}/methods/overview/) included therein.

## [List of Properties]({{ reference_url }}/properties-directory/overview/)

We have listed and described the properties available for computation on our platform [in this section]({{ reference_url }}/properties-directory/overview/).

## [Classification](classification/overview.md)

We explain how properties can be classified into different categories [here](classification/overview.md).

## [Data]({{ data_url }}/properties/data/overview/)

For an example of a JSON structure-based representation of properties, and of the associated validating/descriptive schema, please consult the [Data section]({{ data_url }}/properties/data/overview/).

## [Lifecycle](lifecycle/overview.md)

We describe the lifecycle that properties go through in order to be extracted from simulation output, and then subsequently refined and retrieved, [in this section](lifecycle/overview.md).

## [User Interface]({{ interface_url }}/properties/ui/explorer/)

Properties are presented in special panels within the user interface of the [Job Viewer]({{ interface_url }}/jobs/ui/viewer/), as introduced [here]({{ interface_url }}/properties/ui/viewer/).

These properties can also be reviewed under a dedicated [Explorer-type interface]({{ interface_url }}/entities-general/ui/explorer/) for each Material stored in the account-owned [collection](../accounts/collections.md). We explain how to retrieve and inspect the contents of this Properties Explorer [in this page]({{ interface_url }}/properties/ui/explorer/). 
