# Data Classification

This section contains information about the general policies we use for the handling of data of different types. 

## By internal organization

- **structured**: we introduce the conventions and practices relevant the structured data in [this section of the documentation](../data-structured/overview.md). 
- **unstructured**: non-structured data is explained in two separate locations, for data [stored on the disks]({{ dev_url }}/data-on-disk/overview/) and [stored as objects]({{ dev_url }}/data-in-objectstorage/overview/) respectively. The former is employed at runtime to store data on the disk, and the latter is used for long-term storage and data access from within the Web Interface. 

!!!note "Example structured and unstructured data"
    Unstructured data generated during calculation first resides on disk. Files containing the information can further be processed as explained in [this section](../properties/lifecycle/extractor.md), and further converted to a structured JSON-based format inside our platform. 

## By relation to Entities

We identify the relation of the data as follows:

- **materials**: information uniquely associated with a certain [material](../materials/overview.md).
- **workflows**: information about a computational [Workflow](../workflows/overview.md) routine used to extract the data.
- **other**: any other information.

It is generally possible to disentangle the data about materials from that concerning the workflow that extracts the properties of such materials. The "Other" category exists for the limiting cases where such a distinction is problematic. [Properties](../properties/overview.md) represent such a case, for example. Further sub-categorization for the Properties is explained [here](../properties/classification/general.md).

The data pertaining to each of Materials and Workflows can be related together though a [Job](../jobs/overview.md). 

## By source

We further classify data into the following three main subtypes, distinguished by their source:

- **experimental**: obtained with experimental equipment.
- **model**: obtained using modeling (computational or analytical).
- **other**: data that cannot be classified according to any of the above.

## By publication status

When the data is first obtained it can be raw, or unprocessed. The opposite occurs when the data is assembled for a peer-reviewed publication, and was able to pass multiple filter channels.
 
- **raw**: directly obtained from the source.
- **published**: published in a peer-reviewed journal or analogs.
