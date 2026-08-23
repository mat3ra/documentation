# Units: Structured Representation

The JSON [structured representations]({{ data_url }}/data-structured/overview/) for the different [types of units]({{ reference_url }}/workflows/components/units/) supported on our platform are contained in the expandable sections presented throughout the present page, accompanied each time by a corresponding example.

For a description of unit input templating, the reader is referred to [this section]({{ reference_url }}/workflows/templating/overview/) of the documentation.

## General Case

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit.json"
    ```

## Execution

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/execution.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/execution.json"
    ```

## Processing

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/processing.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/processing.json"
    ```

## I/O

### DataFrame
=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/io.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/io.json"
    ```

### API

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/io/api.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/io/api.json"
    ```

### Database

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/io/db.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/io/db.json"
    ```

### Object Storage

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/io/object_storage.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/io/object_storage.json"
    ```

## Assignment

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/assignment.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/assignment.json"
    ```

## Conditional

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/condition.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/condition.json"
    ```

## Map

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/map.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/map.json"
    ```

## Reduce

=== "Schema"
    ```json
    --8<-- "data/esse/schema/workflow/unit/reduce.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/workflow/unit/reduce.json"
    ```
