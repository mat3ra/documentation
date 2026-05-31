# Data on Disk

[Unstructured]({{ reference_url }}/data/classification/#by-internal-organization) data generated on our platform consists of the input and output files of simulations. This data is stored in [block storage](../infrastructure/storage.md) (or conventional hard drive disks) connected to the [computing clusters](../infrastructure/clusters/overview.md) at the heart of the general [infrastructure](../infrastructure/overview.md).

We introduce below the key concepts associated with the disk storage of such unstructured data.

## [Directory Structure](directories.md)

We review our approach towards distributing the storage of simulation data in an organized hierarchic manner, referred to as the **directory structure**, in [this section](directories.md) of the documentation.

## [Storage Quota](quotas.md)

In order to avoid running out of space, **storage quotas** are attributed to every storage space present across our infrastructure, limiting the amount (size) of the data that may be contained in them at any moment. They are explained in detail [here](quotas.md), for each case.

## [Security](security.md)

Security policies affecting the storage of simulation files on the hard drives of our infrastructure are the object of a dedicated discussion [in this section](security.md).

## Links

[^1]: [Block Storage, Wikipedia page](https://en.wikipedia.org/wiki/Block_(data_storage))
