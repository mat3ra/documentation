# Clusters

We offer a set of **high-performance computing clusters** to facilitate materials modeling with high throughput and high fidelity. Our infrastructure contains multiple clusters at any point in time, deployed at multiple cloud providers as referenced at the end of the present page. The modular character of our system allows for the on-premises and hybrid cloud deployments, as well as a managed cloud scenario.

## Current State

The [clusters](https://platform.mat3ra.com/clusters) page summarizes the state of each cluster and the status of its [queues](../resource/queues.md) (requires logged-in user).
![ClustersTable](../../images/infrastructure/clusters-table-page.png "Clusters table page")

### The following table summarizes cluster capacity states

| Capacity    | Description                       |
| :---:       | :---:                                             |
| FULL        | all zones are available and jobs will run immediately |
| DEGRADED    | some zones are unavailable which may lead to longer time in queue |
| UNAVAILABLE | all zones are unavailable and jobs will not run |
| --          | for saving (S) queues, this also indicates that spot instance pricing is currently too high |


## Cluster Aliases

In order to make the identification of cluster aliases more user-friendly we use human-readable names or "Aliases" instead of their fully-qualified domain names [^1] for the cluster Master Nodes.

| Name/Alias  | Fully-qualified domain name                       |
| :---:       | :---:                                             |
| cluster-007 | master-production-20160630-cluster-007.exabyte.io |


## Architecture Diagram

The architecture of a cluster is explained in the diagram below, comprising a **Master Node**, a set of **Compute Nodes** a **Storage System**. The allocation of these computational resources is handled by the **Resource Manager**, which is the object of a [separate discussion](../resource/overview.md).

![Cluster](../../images/infrastructure/Cluster.png "Cluster")

## [Storage](../storage.md)

Clusters also offer a certain amount of **storage space** for [storing](../storage.md) simulation files as [unstructured data]({{ reference_url }}/data-on-disk/overview/), subject to certain **quotas** as explained [here]({{ reference_url }}/data-on-disk/quotas/).

### [Directory Structure](directories.md)

We discuss the directory structure which can be found inside the home folder of each cluster [in this section](directories.md) of the documentation.

## [Performance Benchmarks]({{ reference_url }}/benchmarks/overview/)

The clusters offered as part of the [infrastructure of our platform](../overview.md) have been subject to an extensive set of **tests and benchmarks**, in order to measure their reliability and performance for different [hardware types](hardware.md) and for the [simulation engines]({{ reference_url }}/software/components/) used. They are reviewed and assessed in a [separate section]({{ reference_url }}/benchmarks/overview/) of the present documentation.

### Cloud Providers

We rely on multiple cloud providers for delivering the computational resources that we offer. The current choice consists in either [Azure](azure.md) and [Amazon Web Services](aws.md) .

## Links

[^1]: [Fully Qualified Domain Names, explanation, Indiana University Website](https://kb.iu.edu/d/aiuv)
