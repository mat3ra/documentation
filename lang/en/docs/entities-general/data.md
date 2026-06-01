# Structured Data

We store each item in the Entity Collections in the form of **structured data** in JSON format. The user is referred to the corresponding [section of the documentation]({{ data_url }}/data-structured/overview/) for the explanation of the concept of structured data in the context of our platform.

## Example JSON representation

The following is an example of the JSON representation of an entity, where only the general keywords applicable to all entity types are preserved.

The reader is referred to other documentation pages for aspects that might pertain specifically to [Materials](../materials/data.md), [Workflows](../workflows/data/workflows.md) and [Jobs](../jobs/data.md) respectively.

```json
{
    "_id":"Xgtqqsr7btyCijDKe",
    "name":"Silicon FCC",
    "owner":{
        "_id":"z9zo7LmZ4hDvJKHK8",
        "slug":"demo",
        "cls":"Account"
    },
    "creator":{
        "_id":"2hFARLuq44zp3JWC9",
        "slug":"demo",
        "cls":"User"
    },
    "exabyteId":"N9euPCp4qggfGAnFT",
    "hash":"a665723ef7429caef6ca89385fe25bae",
    "schemaVersion":"0.2.0",
    "createdAt":"2018-10-15T22:45:14.280Z",
    "updatedAt":"2018-10-15T22:45:14.506Z",
    "tags":["silicon", "example"],
    ...
}

```

## Explanation of Keywords

### Top-level Keywords

| Keyword    |  Short Description      | Details        |
| :-------- |:----------- |:------------- |
| _id | Identifier in the corresponding [Collection]({{ reference_url }}/accounts/collections/) | Each entity contained in an Account-owned collection has a unique Collection Identifier code, attributed by our platform. |
| name | Name of Entity | Human-readable name |
| owner / creator | Entity Owner and Creator | Further information about both the [ownership]({{ reference_url }}/entities-general/ownership/) of the entity, and the user who created it is described separately below. |
| exabyteId      | Identifier of the corresponding [Bank Entity]({{ reference_url }}/entities-general/bank/) Collection | Only present for "Bankable" entity types. |
| hash |  Unique string produced by [Bank Mapping Function]({{ reference_url }}/entities-general/bank/) |  The entity item within the Bank collection also contains this string.   |
| schemaVersion |  Version of the JSON schema | The version of the JSON schema according to the [ESSE Data Convention]({{ data_url }}/data-structured/overview/), employed at the moment of the creation of the entity.  |
| createdAt / updatedAt  | Date and Time Information  | Information about the date and time at which the entity was first created / updated.  |
| tags | Descriptive Metadata  | See dedicated section below for further explanations. |

### Owner/Creator

| Keyword    |  Short Description      | Details        |
| :-------- |:----------- |:------------- |
| _id | Identifier in the corresponding [Collection]({{ reference_url }}/accounts/collections/) | Each user and associated Account(s) have a corresponding unique Identifier |
| slug | Name of User/Account | The human-readable name of the Account that owns the entity under consideration, or of the user who created the entity. |
| cls  | "User" or "Account" | Draws the distinction between [Accounts]({{ reference_url }}/accounts/overview/) and [Users]({{ reference_url }}/accounts/users/). The Owner of an entity is always an Account, whereas the entity creator is one of the Account's constituent users |


## Metadata

Metadata refers to information that in turn provides information about other data. In the context of our platform, Metadata is used primarily to facilitate [search]({{ guide_url }}/entities-general/actions/search/) through the [Entity collections]({{ reference_url }}/accounts/collections/). We supplement entries with additional descriptive textual information, such as tags, for example. The above example of JSON representation shows how tags are stored within the structured data, under the "tags" keyword.

Metadata can be added to an entity item in one or more of the following forms.

### Description

In some cases, the user can add a general description for reference purposes, which can be entered in plain text or using Markdown language [^1] as explained [here]({{ guide_url }}/entities-general/actions/metadata/#edit-description)

### Tags

The user can add descriptive tags to the entity in order to retrieve it more easily when searches are performed. Tags take the form of separate keyword strings, that can each contain one or multiple words. They can be inserted according to the [following instructions]({{ guide_url }}/entities-general/actions/metadata/#edit-tags).

### Metadata for surfaces / slabs

A specific kind of metadata is used to mark slabs / surfaces. Such metadata is stored in the entity on its creation and can, for example, be used for surface energy calculations. This is explained further in the [corresponding documentation section]({{ guide_url }}/materials-designer/header-menu/advanced/surface-slab/#structural-metadata).

## Slug

It is often necessary to convert keyword strings within structured data to a more machine-friendly format. Examples include strings containing whitespaces or special characters [^2]. We store machine-safe representation of the entity "name" (as explained in the table above) under "slug" keyword.

## Links

[^1]: [Markdown syntax summary, Website](https://daringfireball.net/projects/markdown/syntax)
[^2]: [Slugify library for Javascript, Website](https://www.npmjs.com/package/slugify)
