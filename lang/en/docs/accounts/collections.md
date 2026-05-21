# Collections

The term "Collection", in the context of our platform, refers to the broad concept of a **database of items**, whereby such items can be of any general type. These collections, comprising all the different items that they contain, are stored in our platform. The concept of a collection can be easily understood by users familiar with MongoDB [^1] database. 

The "front-end" of these collections, or in other words the way the users can visualize and interact graphically with such databases as lists of items on our platform, can typically be accessed via the [Explorer]({{ guide_url }}/entities-general/ui/explorer/) components (or alternatively through the [RESTful API]({{ dev_url }}/rest-api/overview/)).

## Entity Collections

Each Account owns a set of distinct collection items corresponding to each type of entity that exists on our platform - "Materials", "Workflows", "Jobs". The reader is referred to the [general introduction](../entities-general/overview.md) to the concept of entities for a thorough explanation of all the features and properties that pertain to them. 

## Bank Entity Collections

As we explain in their [dedicated documentation page](../entities-general/bank.md), we classify Banks as a special type of Collections. As such, all "bankable" entities (namely Materials and Workflows) are stored inside their respective Bank databases as distinct "Bank Collections".

## Auxiliary Collections

Due to its wide scope of applicability, the concept of Collections is not restricted to entities only, but rather may be applied to numerous other types of item databases present across the entirety of the Exabyte platform, such as the collection of [Pseudopotentials]({{ reference_url }}/methods-directory/pseudopotential/overview/) available for computation.

## Links

[^1]: [MongoDB Database, Official Website](https://www.mongodb.com/)
