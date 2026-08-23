# ESSE Data Convention

Our approach towards storing and organizing structured data is based on the **ESSE Data Convention (EDC)** explained in the present documentation. ESSE stands for Essential Source of Schemas and Examples. The corresponding schema implementations are open-source and available in the [GitHub repository](https://github.com/mat3ra/esse) and as a package on [PyPI](https://pypi.org/project/mat3ra-esse/).

We use this convention to store and organize the information associated with the [Entities]({{ reference_url }}/entities-general/overview/) present across our platform, and their corresponding [Accounts]({{ reference_url }}/accounts/overview/) and [Permissions]({{ reference_url }}/entities-general/permissions/). The convention is designed with the aim of facilitating both the access and collaboration with regards to such entities. The fundamental practices are further elucidated in the sections below.

## JSON Representation

We make use of the **JSON format** [^1] [^2] for storing **structured data** . This structured data might for example be relevant for storing information about the [entities]({{ data_url }}/entities-general/data/) present in the [account-owned collections]({{ reference_url }}/accounts/collections/), and for storing their respective [properties]({{ data_url }}/properties/data/overview/).

### Example

Data included in the expandable section below shows an example **JSON representation** of a material sample of silicon and is presented to demonstrate the concept. The explanation of the keywords specific to [Material]({{ reference_url }}/materials/overview/) entity can be found [here]({{ data_url }}/materials/data/).

<details markdown="1">
  <summary>
    JSON representation
  </summary> 

```json 
--8<-- "esse/example/material.json"
```
</details>

## JSON Schemas

In computer science, a schema [^3] is a general concept referring to how structured data can be **stored** and **organized** within a database. **JSON schemas** [^4] [^5] in particular consist in a vocabulary that allows to **validate** JSON-based documents containing structured data, and to annotate them with **descriptions**. 

## Examples

Multiple **schemas** are deployed on our platform in order to describe the data. The reader is referred to the specific pages associated with the different [entities]({{ data_url }}/entities-general/data/) and their respective [Properties]({{ data_url }}/properties/data/overview/).
 
## Links

[^1]: [JSON specifications, Website](https://www.json.org/)

[^2]: [Wikipedia JSON, Website](https://en.wikipedia.org/wiki/JSON)

[^3]: [Introduction to Structured Data, Website](https://developers.google.com/search/docs/guides/intro-structured-data)

[^4]: [JSON Schema, Website](http://json-schema.org/)

[^5]: [Wikipedia JSON Schema, Website](https://en.wikipedia.org/wiki/JSON#Schema_and_metadata)
