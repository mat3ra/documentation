# Entity Bank

Entity **Bank** is a [collections](../accounts/collections.md) of **unique** entity items. One Bank exists for each **Bankable [Entity](overview.md)**. The corresponding list of entities is then referred to as the **Bank Entity Collection**. 

For [accounts](../accounts/overview.md) with [service levels]({{ guide_url }}/pricing/service-levels/) allowing for private data, the Bank items are private and only visible to the members of the account. For the rest - the Bank entries are visible to all platform users. These privacy notions are further explained in subsequent sections of this page. 
  
 Bankable Entities for the moment consist of Materials and Workflows.

## Mapping Function

Mapping Function produces a **hash** string (explained below) and is used to assert the uniqueness of Bank Entities. Each entity type has a different Mapping Function. It assesses certain [defining features]({{ reference_url }}/data-structured/overview/#by-relation-to-uniqueness) of the entity, as explained for the case of [Materials](../materials/bank.md) and [Workflows](../workflows/bank.md) separately.


## How Bank Entities are Generated

Any entity item of bankable type is **automatically** added to the corresponding Bank collection using the procedure further described below.

### 1. Hash Calculation

After creation, the hash for the new Entity is calculated by the **Mapping Function** and compared against those of existing Bank entries. From this point onwards, the following two alternative scenarios can emerge.

### 2a. Positive Match by Hash

If a positive match of hash strings is encountered between the new and an existing Bank entries, then the newly created Bank Entry is **merged** with an existing one within the Bank collection and the Bankable Entity in its corresponding [collection](../accounts/collections.md) is linked to the existing Bank Entity.

### 2b. No Match by Hash

If no match is found, a new Bank Entity is created and a link between it and the corresponding Bankable Entity is established.

### Flowchart/Summary

A summary depicting the above steps involved in the creation of Bank entities can be found in the expandable section below: 

<details markdown="1">
  <summary>
     Expand to view
  </summary> 
    
  ![Bank Diagram](../images/entities-general/Bank-Flowchart.png "Bank Diagram")
  
  </details>

### Visual Representation

The correspondence between the Entity and Bank entity collections is visualized below:

![Bank Diagram](../images/entities-general/Bank-diagram-Mapping.png "Bank Diagram")

Distinct Account-owned entities <i class="zmdi zmdi-close-circle-o"></i> may end up corresponding to the same **unique** Bank entry <i class="zmdi zmdi-plus-circle-o"></i>. As mentioned earlier, this happens when the underlying Bankable Entities produce the same output for the Mapping Function.

The reader may refer to this [page]({{ data_url }}/entities-general/data/) for an explanation of the structured data keywords contained in the image insets. It is worth noticing that interconnected entity items share the same "hash" keyword string, as explained in the forthcoming section.

### Hash Strings

The output of the mapping function is a **hash string**. This hash is stored inside each new Bankable Entity and compared to the pre-existing ones in the Bank collection. In case of a positive match, the entities are associated together, thus preventing the creation of duplicates.


## Entity Privacy

### Private 

If an Account has a sufficient [service level]({{ guide_url }}/pricing/service-levels/) allowing for private data, the situation displayed below will appear, whereby private items are accessible only to the Account members.

![Bank Diagram](../images/entities-general/Bank-diagram-Private.png "Bank Diagram")

### Public 

Alternatively, the lack of data privacy leads to the following scenario, whereby all other Accounts gain access to the Bank entities.

![Bank Diagram](../images/entities-general/Bank-diagram-Public.png "Bank Diagram")

> NOTE: If different Accounts happen to generate exactly the same Bank Entity, the privacy settings are nullified if any of these Accounts makes the Entity public.
  

## Importing Entities from Bank

Bank entities may be **imported** by users with appropriate access to it. This creates a copy of that item under the Account-owned collection.

Specific examples of the importing procedure can be found for both [Materials](../materials/bank.md) and [Workflows](../workflows/bank.md), whereas the general instructions are presented [here]({{ interface_url }}/entities-general/actions/copy-bank/).
