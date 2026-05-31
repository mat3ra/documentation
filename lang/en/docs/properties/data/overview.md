# Properties Data

We make use of the data convention, introduced [in this page]({{ reference_url }}/data-structured/convention/), to organize the information related to properties.

## [JSON Schemas and Examples]({{ reference_url }}/data-structured/convention/)

We provide below an example of a [**JSON schema**]({{ reference_url }}/data-structured/convention/) for a material property. The reader is referred to the JSON external documentation [^1] [^2] for the explanation of the primitive types and schema keywords.

Also listed below, is an example of a JSON representation of the [total energy]({{ reference_url }}/properties-directory/scalar/total-energy/), which can validated by the schema. It consists in a scalar numerical **value**, which is expressed in **units** of electronVolts (eV).

<details markdown="1">
  <summary>
    Data Convention
  </summary>

=== "Schema"
    ```json
    --8<-- "data/esse/schema/properties_directory/scalar/total_energy.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/properties_directory/scalar/total_energy.json"
    ```

</details>

## [Core Schema Types](core.md)

In addition to the default primitive types for JSON Schemas, we construct additional types used for constructing the representations of properties. A list of available schema types are provided [in this page](core.md).

## [List of Schemas](list.md)

[In this section](list.md), we offer a full list of schemas and examples relevant for properties. The properties relevant for each element in the Periodic Table are also listed [separately](periodic-table.md).

## Links

[^1]: [JSON Schema Core Documentation, Website](https://json-schema.org/latest/json-schema-core.html)

[^2]: [JSON Schema Validation Documentation, Website](https://json-schema.org/latest/json-schema-validation.html)
