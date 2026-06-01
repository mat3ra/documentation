# General Classification

## Summary

[Properties](../overview.md) are classified according to the below. We explain the terms contained in the table throughout the remainder of the present documentation page. These classification criteria complement the more general ones introduced [here]({{ reference_url }}/data/classification/).

| By refinement status |  By data type | By relation to Workflow  | By Uniqueness   | By Physical Meaning      |
|:--------:|:-------------:|:------------------------:|:---------------:|:------------------------:|
|  Raw     | Scalar        | Descriptive              | Identifier      | Auxiliary                |
|  Refined | Non-scalar    | Characteristic           | Non-identifier  | Non-Auxiliary            |
|  Best    |               |                          |                 |                          |

## By refinement status

When the data is first obtained it can be raw, or unprocessed. The opposite occurs when the data is [refined](../lifecycle/refinement.md) to pass multiple filter channels. We subdivide the following categories.
 
- **Raw**, 
- **Refined**,
- **Best**.

These categories are further explained [here](../lifecycle/refinement.md).

## By Data Type

We can subdivide properties based on how they are presented to the user into the following two categories.

- **Scalar**: can be expressed as a single numerical value with an associated measurement unit.
- **Non-Scalar**: cannot be expressed as above.

We review the scalar and non-scalar classes of Materials properties in [this documentation section]({{ reference_url }}/properties-directory/overview/).

> NOTE: non-scalar properties may be further subdivided into other groups like 1-dimensional arrays or matrices, for example.

## By Relation to Workflow

We can also subdivide properties by their relation to the application / execution of a workflow. This approach results in the following distinction. 

- **Descriptive Properties**: available before executing a [Workflow](../../workflows/overview.md).
- **Characteristic Properties**: available as the results or outcomes of the [Workflow](../../workflows/overview.md).

> NOTE: workflows can be used in a recursive manner, in a way that allows them to extract the properties of another parent workflow. The characteristic properties output by the parent therefore become descriptive when considered in relation to the child workflow. 

### Example 
    
For atomistic simulations, a descriptive property can be for example the initial structural information, and a characteristic property can be the electronic conductivity. Similarly, in the context of experimental measurements, a descriptive property could be the initial information about a sample (eg. percentage of mixed compounds by mass, or other relevant conditions), and a characteristic property is what is measured as the outcome of the experiment.

## By Relation to Uniqueness

An effective way of organizing the data consists in identifying the materials themselves, rather than their properties. We do so by considering **Identifiers**, a special subset of *Descriptive* properties that helps associating each material with its ["exabyteId" keyword](../../entities-general/data.md). 

### Example 

For the case of atomistic simulations, the identifiers can be directly constructed from the structural information about the materials. At the same time, the atomistic structure may be unavailable in experimental findings or for existing datasets.
 
<!-- 

TODO: implement and uncomment the text below
 
We allow for the possibility of custom identifiers. 

As the example above demonstrates, unique identifiers can be dependent on the source of data.  

 -->


## By Physical Meaning

In the context of data obtained by simulations, it could happen that the value of a property does not hold a clear physical meaning (beyond the extent of the model applied) despite being numerically well-defined. We call such property **Auxiliary**. Otherwise, if this is not the case, a **physical meaning** is assumed.

### Example 

For atomistic simulations done using the [plane-wave pseudopotential method]({{ reference_url }}/methods-directory/pseudopotential/overview/) we can extract the Fermi energy. However, there is no physical meaning to its numerical value, as it is heavily dependent on the pseudization scheme. Conversely the electronic band gap, or the difference between electronic energies below the Fermi level and above it, has physical meaning and can be directly compared with experimental measurements. 
