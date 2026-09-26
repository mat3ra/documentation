# Storage System

We store the raw simulation data on on block storage drives (ie. hard drives) connected to the [computational clusters](clusters/overview.md). The present page explains some of the related conventions. The policies applied to the information in the form of **unstructured data** are explained further [in this section]({{ reference_url }}/data-on-disk/overview/) of the documentation.

## Storage Diagram

A representative example of an overall storage system, such as implemented on our infrastructure, is explained visually in the flowchart below. 

![Storage System](../images/infrastructure/Storage-System.png "Storage System")

The above example includes multiple clusters connected to the same central [Login Node](login/overview.md), each one with its own corresponding main access [Master Node](clusters/directories.md) and associated storage space. Here, we also show (through color labelling) how each [Cluster Home]({{ reference_url }}/data-on-disk/directories/#cluster-home) directory present under the corresponding Master Node filesystem is **mapped (mounted)** to the [Login Home]({{ reference_url }}/data-on-disk/directories/#login-home). 

For example, the home folder for "cluster-001" under the path `/home/<username>` on the Master Node is mapped to the directory path `/cluster-001-home/<username>` under the Login Node. A similar pattern is applied for the [Shared Folders for Organizations]({{ reference_url }}/data-on-disk/directories/#shared-folders-for-organizations).

## Storage Quotas

These storage spaces are subject to certain **quotas**, limiting the size of the data that may be saved in them. These quotas are documented [here]({{ reference_url }}/data-on-disk/quotas/).
