# Extraction of Properties

The extraction of raw data from simulations computations consists in processing the [output files]({{ dev_url }}/data-on-disk/overview/) of [modeling engines]({{ reference_url }}/software/components/) with the help of post-processing software. This is typically done in order to identify the desired properties, and store them in a database for future reference. 

## Extractor Scripts

Computational scientists are usually familiar with this concept, and often have a set of **scripts** for extracting such raw numerical data from simulation outputs. We refer to such scripts as **"Extractors"**. Our platform follows exactly the same approach, and forms [structured data]({{ data_url }}/data-structured/overview/) according to the [Data Convention]({{ data_url }}/data-structured/convention/) to subsequently store Materials properties in the database.

Such raw extracted data typically needs to be further **refined** for a better comprehension of its physical relevance and accuracy. We describe how this issue is confronted on our platform [in a separate documentation page](refinement.md).

## Example

For example, the retrieval of the [total energy]({{ reference_url }}/properties-directory/scalar/total-energy/) in a [Quantum Espresso]({{ guide_url }}/software-directory/modeling/quantum-espresso/overview/) output file can be done by looking for the "!" character, and extracting the ensuing content of the same line. Alternatively, a corresponding XML file can be parsed.

Below we show an excerpt of a Quantum ESPRESSO standard output file, that can serve as input for the extractor explained above. The line containing the total energy is displayed at the center with its preceding exclamation mark. This input text is then parsed by the **Extractor**, and the resulting [structured]({{ data_url }}/properties/data/overview/) data is generated and further stored in database.

```json tab="Extractor Input"
...
     the Fermi energy is     7.5947 eV

!    total energy              =    -455.66239900 Ry
     Harris-Foulkes estimate   =    -455.66239885 Ry
     estimated scf accuracy    <       0.00000010 Ry
...
```


```json tab="Extractor Output"
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "total energy schema",
    "allOf": [
        {
            "$ref": "file:../../primitive/scalar.json"
        }
    ],
    "properties": {
        "name": {
            "enum": [
                "total energy"
            ]
        },
        "units": {
            "enum": [
                "eV",
                "rydberg",
                "hartree"
            ]
        }
    }
}
```

!!!note "User-defined Extractors"
    We plan to allow users to contribute the properties and the corresponding extractor scripts and share such scripts with others.
