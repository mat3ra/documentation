# Structured Representations

We provide below examples of JSON-based structured representation for an application, and for each of its possible [components](overview.md#applications) (executables and flavors) and [classification categories](classification/overview.md). This structured representation is based upon the [Exabyte Data Convention](../data-structured/overview.md) implemented throughout our platform.

!!! note "Work in progress"
    Some applications are yet to be fully integrated into our platform to have a structured representation. These are only available via [Command Line Interface]({{ guide_url }}/cli/overview/).

## [Application](components.md)

=== "Schema"
    ```json
    --8<-- "data/esse/schema/software/application.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/software/application.json"
    ```

## [Executable](components.md#executables)

=== "Schema"
    ```json
    --8<-- "data/esse/schema/software/executable.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/software/executable.json"
    ```

## [Flavor](components.md#flavors)

=== "Schema"
    ```json
    --8<-- "data/esse/schema/software/flavor.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/software/flavor.json"
    ```
