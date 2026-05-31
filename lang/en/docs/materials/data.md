# Structured Representation of Materials

We present an example of our approach towards defining and storing structured data for materials. The aspects presented herein complement the [general introduction](../entities-general/data.md).

## Example Representation

In the expandable section below, the user can find an example JSON representation of a face-centered cubic Silicon:

<details markdown="1">
  <summary>
     Expand to view
  </summary>

=== "Schema"

    ```json
    --8<-- "data/esse/schema/material.json"
    ```

=== "Example"

    ```json
    --8<-- "data/esse/example/material.json"
    ```

</details>

## Explanation of Keywords

| Keyword    |  Short Description      | Details        |
| :-------- |:----------- |:------------- |
| basis   | Crystal [basis]({{ reference_url }}/properties-directory/structural/basis/) with explicit identification per atom  | The information about the atomic type and coordinates |
| lattice | Crystal [lattice]({{ reference_url }}/properties-directory/structural/lattice/) in both Bravais and vector notations  | Crystal lattice parameters - lattice constants and angles. Components of the corresponding lattice vectors are also included. |
| derivedProperties | [descriptive properties]({{ reference_url }}/data-structured/overview/#by-relation-to-workflow) derived from lattice/basis (only one example shown above) | Additional properties of the crystal structure under investigation as explained in the section ensuing the present table. |
| hash | Hash string calculated by the [Bank Mapping Function](bank.md)  |   Structure-based hash string for the primitive standard representation of this material, calculated when checking this material against existing entries within the Materials Bank |
| scaledHash | As above, but for the lattice axis scaled to 1.0 (i.e. to identify same structures under different uniform pressure) | This hash string is calculated by scaling all the dimensions of the primitive unit cell representation of the material by the $a$ lattice constant |
| isNonPeriodic | Boolean value used to describing whether a structure exists in a single unit or repeating units. | The isNonPeriodic Boolean value is assumed to be false by default, indicating that a material is **periodic**. The value of isNonPeriodic, determines which derivedProperties are calculated for a structure. For example: unit cell volume is calculated for periodic, but not non-periodic structures. Conversely, International Chemical Identifier (InChI)[^1] are calculated for non-periodic, but not periodic structures.

## Derived Properties

As seen above, we use the crystal **lattice** and **basis** JSON objects as the main [identifying properties]({{ reference_url }}/data-structured/overview/#by-relation-to-uniqueness). Based upon them, we calculate the **derivedProperties**, that may include such information as:

 - the unit cell volume,
 - density,
 - chemical formula,
 - and a large number of other possibilities.

 For every material imported/uploaded to our platform, we pre-calculate a set of such descriptors, and store them inside this "derivedProperties" section. This information can be further used during data analysis or the construction of statistical predictive models.

## Links
[^1]: [Wikipedia: International Chemical Identifer (InChI) Website](https://en.wikipedia.org/wiki/International_Chemical_Identifier)
