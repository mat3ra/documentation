# Workflows: Structured Representation

In order to organize and store the information about [workflows](../overview.md), we employ the **Exabyte Data Convention**, as explained [elsewhere]({{ reference_url }}/data-structured/overview/) in this documentation.

In the expandable section below, the user can find the JSON representation of a [workflow](../overview.md) with a corresponding example. It contains a series of [subworkflows](../components/subworkflows.md), each of which contains a number of [units](../components/units.md) in turn.

<details markdown="1">
  <summary>
     Expand to view
  </summary>

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow.json"
    ```

</details>

There are a few notable points to emphasize from the example above.

## Nested data

We use top-level workflow as a "container", and separate the details of each individual section of calculation inside a subworkflow.

## Templating

We allow for using [templates](../templating/overview.md) inside the input to individual units. In this way, we can decouple material-specific information from the workflow-specific one. More explanation can be found inside the [units documentation page](../components/units.md).

## Properties

The "Properties" section serves as an aggregator of all the [properties](../../properties/overview.md) that are extracted at the workflow or subworkflow levels. The "results" key serves the same purpose, but for the case of units.
