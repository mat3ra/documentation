# Microsoft Azure

This page contains information about clusters hosted on Microsoft Azure[^1] and their hardware specifications.

## Clusters

The following table provides information about available clusters on Microsoft Azure cloud computing platform. The
latest cluster status can be found on <a href="https://platform.mat3ra.com/clusters" target="_blank">Clusters</a> page
in web application.

|    Name     |                     Hostname                      | Location |
|:-----------:|:-------------------------------------------------:|:--------:|
| cluster-003 | master-production-20250821-cluster-003.mat3ra.com | East US  |

## Queues

The list of currently enabled queues is given below. Price per core hour is shown in relation to
the [relative unit price]({{ guide_url }}/pricing/service-levels/#comparison-table) and is subject to change at any time. Total
number of nodes can be increased upon [request]({{ guide_url }}/ui/support/).

|  Name  | Category[^2] | Mode[^3] | Charge Policy[^4] | Price | Max Nodes per Job<sup>+</sup> | Max Nodes Total |
|:------:|:------------:|:--------:|:-----------------:|:-----:|:-----------------------------:|:---------------:|
|   D    |    debug     | ordinary |   core-seconds    | 4.002 |               1               |       10        |
|   OR   |   regular    | ordinary |   core-seconds    | 1.275 |               1               |       10        |
|   SR   |   regular    |  saving  |   core-seconds    | 0.379 |               1               |       10        |
|   OF   |     fast     | ordinary |    core-hours     | 1.275 |               5               |       100       |
|   SF   |     fast     |  saving  |    core-hours     | 0.379 |               5               |       100       |
|  GPOF  |     fast     | ordinary |    core-hours     | 6.110 |               5               |       10        |
|  GPSF  |     fast     |  saving  |    core-hours     | 1.222 |               5               |       10        |

<sup>+</sup> please contact support to inquire about attempting a larger node count per job

## Hardware Specifications

The following table contains hardware specifications for the above queues.

|  Name  | Cores per Node | GPU per Node | Memory (GB) | Bandwidth (Gb/sec) |         VM Size          |
|:------:|:--------------:|:------------:|:-----------:|:------------------:|:------------------------:|
|   D    |       8        |      -       |      2      |       &le;10       |     Standard_F8s_v2      |
|   OR   |       44       |      -       |     352     |        100         |     Standard_HC44rs      |
|   OF   |       44       |      -       |     352     |        100         |     Standard_HC44rs      |
|   SR   |       44       |      -       |     352     |        100         |     Standard_HC44rs      |
|   SF   |       44       |      -       |     352     |        100         |     Standard_HC44rs      |
|  GPOF  |       40       |      1       |     320     |         40         | Standard_NC40ads_H100_v5 |
|  GPSF  |       40       |      1       |     320     |         40         | Standard_NC40ads_H100_v5 |

## Links

[^1]: [Microsoft Azure, Website](https://azure.microsoft.com/en-us/)

[^2]: [Queue Cost Categories, this documentation](../resource/category.md#cost-categories)

[^3]: [Queue Provision Modes, this documentation](../resource/category.md#provision-modes)

[^4]: [Charge polices, this documentation](../resource/queues.md#charge-policies)

[^5]: [CPU types, this documentation](hardware.md#cpu-types)

[^6]: [GPU types, this documentation](hardware.md#gpu-types)

[^7]: [Azure high performance compute virtual machines, Website](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/sizes-hpc)

///FOOTNOTES GO HERE///
