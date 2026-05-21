# Google Cloud Platform

This page contains information about clusters hosted on Google Cloud Platform[^1] and their hardware specifications.

## Clusters

The following table provides information about available clusters on Google Cloud Platform cloud computing platform. The
latest cluster status can be found on <a href="https://platform.mat3ra.com/clusters" target="_blank">Clusters</a> page
in web application.

|    Name     |                     Hostname                      |  Location  |
|:-----------:|:-------------------------------------------------:|:----------:|
| cluster-001 | master-production-20250821-cluster-001.mat3ra.com | US-Central |

## Queues

The list of currently enabled queues is given below. Price per core hour is shown in relation to
the [relative unit price]({{ guide_url }}/pricing/service-levels/#comparison-table) and is subject to change at any time. Total
number of nodes can be increased upon [request]({{ guide_url }}/ui/support/).

|  Name  | Category[^2] | Mode[^3] | Charge Policy[^4] | Price | Max Nodes per Job<sup>+</sup> | Max Nodes Total |
|:------:|:------------:|:--------:|:-----------------:|:-----:|:-----------------------------:|:---------------:|
|   D    |    debug     | ordinary |   core-seconds    | 4.002 |               1               |        1        |
|   OR   |   regular    | ordinary |   core-seconds    | 1.275 |               1               |        1        |
|   OF   |     fast     | ordinary |    core-hours     | 1.275 |               5               |        5        |
| OFplus |     fast     | ordinary |    core-hours     | 1.275 |               5               |        5        |
|  GOF   |     fast     | ordinary |    core-hours     | 6.110 |               2               |        2        |

<sup>+</sup> please contact support to inquire about attempting a larger node count per job

## Hardware Specifications

The following table contains hardware specifications for the above queues.

|  Name  | Cores per Node | GPU per Node | Memory (GB) | Bandwidth (Gb/sec) |     VM Size      |
|:------:|:--------------:|:------------:|:-----------:|:------------------:|:----------------:|
|   D    |       2        |      -       |     15      |       &le;10       |  n1-standard-4   |
|   OR   |       16       |      -       |     64      |       &le;10       |  c2-standard-16  |
|   OF   |       60       |      -       |     240     |         10         |  c2-standard-60  |
| OFplus |      192       |      -       |     720     |         10         | h4d-standard-192 |
|  GOF   |       12       |      1       |     170     |        100         |  a2-highgpu-1g   |

## Links

[^1]: [Google Cloud Platform, Website](https://cloud.google.com/)

[^2]: [Queue Cost Categories, this documentation](../resource/category.md#cost-categories)

[^3]: [Queue Provision Modes, this documentation](../resource/category.md#provision-modes)

[^4]: [Charge polices, this documentation](../resource/queues.md#charge-policies)

[^5]: [CPU types, this documentation](hardware.md#cpu-types)

[^6]: [GPU types, this documentation](hardware.md#gpu-types)

[^7]: [Google Cloud VM instances, Website](https://cloud.google.com/compute/docs/machine-types)

///FOOTNOTES GO HERE///
