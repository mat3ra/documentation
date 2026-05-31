# Infrastructure

Our platform represents a comprehensive **distributed web application**. This section explains the most important components of its **computational infrastructure**.

We additionally support platform-level access via [advanced connection methods]({{ guide_url }}/remote-connection/overview/), as an alternative to the main Web Interface. Platform-level access methods are intended for expert users and also offer the ability to submit [simulation jobs]({{ guide_url }}/jobs-cli/overview/) to the [computing clusters](clusters/overview.md), for example.

## Architecture diagram

The different components forming the underlying architecture of our computational infrastructure are interconnected as demonstrated in the following diagram. The reader is referred to the number labels included here to find the component's corresponding introductory explanation in the remainder of this documentation page.

![Infrastructure](../images/infrastructure/Infrastructure.png "Infrastructure")

In the above image, we apply the following conventions for labelling the interconnecting lines.

- Blue lines indicate [remote connection methods]({{ guide_url }}/remote-connection/overview/) to our platform.
- The orange lines correspond to the transfer of [structured data]({{ reference_url }}/data-structured/overview/) between the corresponding nodes.
- Solid red lines are dedicated to data under [object representation](../data-in-objectstorage/overview.md).
- Dotted red lines label the Network File System, for accessing files over the infrastructure network.
- Finally, green lines mark the [Resource Manager](resource/overview.md) for controlling the computational resources of our platform. 

## 1. [Web Interface]({{ guide_url }}/ui/overview/)

The Web Interface of our platform is introduced separately from the rest of the computational infrastructure, [in this page]({{ guide_url }}/ui/overview/).

## 2. [Remote Desktop]({{ guide_url }}/remote-connection/remote-desktop/)

A remote desktop environment is offered for connecting to the platform and accessing the relevant data stored in its different nodes. This is explained in details [here]({{ guide_url }}/remote-connection/remote-desktop/).

## 3. [Rest API](../rest-api/overview.md)

We explain the Rest API access method [in this section](../rest-api/overview.md) of the documentation.

## 4. [SSH]({{ guide_url }}/remote-connection/ssh/)

The [Command Line Interface]({{ guide_url }}/cli/overview/) can also be accessed via an external SSH client instead of the Web Terminal. [This page]({{ guide_url }}/remote-connection/ssh/) outlines the instructions on how to do so.

## 5. [Login Node](login/overview.md)

The Login Node provides the main access gateway to the rest of the computational infrastructure, and is the object of a [separate discussion](login/overview.md).

## 6. [Web Terminal]({{ guide_url }}/remote-connection/web-terminal/)

Alternatively to the aforementioned Remote Desktop connection method, the platform can also be accessed via the Command Line Interface described [here]({{ guide_url }}/cli/overview/). We provide a [Web Terminal]({{ guide_url }}/remote-connection/web-terminal/) utility for logging in via Command Line directly from the Web Interface.

## 7. [Dropbox](../data-in-objectstorage/dropbox.md)

Dropbox is a central sharing storage space accessible from all nodes of the platform. It is reviewed in its [dedicated page](../data-in-objectstorage/dropbox.md).

## 8. [Clusters](clusters/overview.md)

The computational power of our platform is distributed across different cloud-based computing clusters, which are described [in this section](clusters/overview.md) of the documentation. 

## 9. [Storage System](storage.md)

The input and output data of simulations can be stored as [unstructured data]({{ reference_url }}/data-on-disk/overview/) on an appropriate storage system, as explained in its corresponding [documentation page](storage.md).

## 10. [Resource Management](resource/overview.md)

The computational resources offered on our platform are managed and allocated to the users by a task scheduler, operated under a system of queues, as documented [here](resource/overview.md).

## 11. [Object Storage](../data-in-objectstorage/overview.md)

The simulation files stored on the cluster hard drives can subsequently be stored as [objects](../data-in-objectstorage/overview.md) for their retrieval under the Web Interface. 

## 12. [Master Node](clusters/directories.md)

The Master Node constitutes the main entry gateway to each available computing Cluster, and is documented in its respective [section of the documentation](clusters/directories.md).

## 13. [Database]({{ reference_url }}/accounts/collections/)

The Database contains the various account-owned [collections]({{ reference_url }}/accounts/collections/) of [entities]({{ reference_url }}/entities-general/overview/) and their respective [properties]({{ reference_url }}/properties/overview/), stored in the form of [structured data]({{ reference_url }}/data-structured/overview/).

## 14. [Computational Resources](compute/overview.md)

The various settings and parameters affecting the allocation of the computational resources offered on our infrastructure, at the moment of the launching of a [Job simulation]({{ reference_url }}/jobs/overview/), can be entered from the Web Interface according to the instructions contained [in this page](compute/overview.md). 

The computational resources available as part of our services are themselves listed for each of the [Azure](clusters/azure.md) and [Amazon Web Service](clusters/aws.md) Cloud Providers.
