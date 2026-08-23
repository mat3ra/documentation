# Amazon Web Services

This page contains information about clusters hosted on Amazon Web Services[^1] (AWS) and their hardware specifications.

## Clusters

The following table provides information about available clusters on Amazon Web Services (AWS) cloud computing platform.
The latest cluster status can be found on <a href="https://platform.mat3ra.com/clusters" target="_blank">Clusters</a>
page in web application.

|     Name      |                   Master Hostname                   | Location |
|:-------------:|:---------------------------------------------------:|:--------:|
| `cluster-002` | `master-production-20250821-cluster-001.mat3ra.com` | West US  |

## Queues

The list of currently enabled queues is given below. Price per core hour is shown in relation to
the [relative unit price]({{ guide_url }}/pricing/service-levels/#comparison-table) and is subject to change at any time. Total
number of nodes can be increased upon [request]({{ interface_url }}/ui/support/).

|  Name  | Category[^2] | Mode[^3] | Charge Policy[^4] | Price | Max Nodes per Job<sup>+</sup> | Max Nodes Total |
|:------:|:------------:|:--------:|:-----------------:|:-----:|:-----------------------------:|:---------------:|
|   D    |    debug     |  debug   |   core-seconds    | 2.251 |               1               |       10        |
|   OR   |   ordinary   | regular  |   core-seconds    | 1.000 |               1               |       10        |
|   OF   |   ordinary   |   fast   |    core-hours     | 1.000 |              10               |       100       |
| OFplus |   ordinary   |   fast   |    core-hours     | 0.962 |               5               |       10        |
|   SR   |    saving    | regular  |   core-seconds    | 0.200 |               1               |       10        |
|   SF   |    saving    |   fast   |    core-hours     | 0.200 |              10               |       100       |
| SFplus |    saving    |   fast   |    core-hours     | 0.379 |               5               |       10        |
|  GOF   |   ordinary   |   fast   |    core-hours     | 8.655 |               5               |       10        |
|  GSF   |    saving    |   fast   |    core-hours     | 1.731 |               5               |       10        |
|  G4OF  |   ordinary   |   fast   |    core-hours     | 8.655 |               5               |       10        |

<sup>+</sup> please contact support to inquire about attempting a larger node count per job

## Hardware Specifications

The following table contains hardware specifications for the above queues.

|  Name  | CPU[^5] | Cores per Node | GPU[^6] | GPU per Node | Memory (GB) | Bandwidth (Gbps) |    Instance Type    |
|:------:|:-------:|:--------------:|:-------:|:------------:|:-----------:|:----------------:|:-------------------:|
|   D    |   c-3   |       4        |    -    |      -       |     15      |      &le;10      |     c4.2xlarge      |
|   OR   |   c-3   |       36       |    -    |      -       |     60      |      &le;10      |     c4.8xlarge      |
|   OF   |   c-3   |       36       |    -    |      -       |     60      |        10        |     c4.8xlarge      |
| OFplus |   c-5   |       72       |    -    |      -       |     192     |       100        |    c5n.18xlarge     |
|   SR   |   c-3   |       36       |    -    |      -       |     60      |        10        |     c4.8xlarge      |
|   SF   |   c-3   |       36       |    -    |      -       |     60      |        10        |     c4.8xlarge      |
| SFplus |   c-5   |       72       |    -    |      -       |     192     |       100        |    c5n.18xlarge     |
|  GOF   |   c-8   |       8        |   g-3   |      8       |    1152     |       400        |    p4d.24xlarge     |
|  GSF   |   c-8   |       8        |   g-3   |      8       |    1152     |       400        |    p4d.24xlarge     |
|  G4OF  |   c-4   |       32       |   g-4   |      1       |     256     |        10        |     p5.4xlarge      |

!!! note "Hyper-threading"
Hyper-threading[^7] is enabled on all AWS compute nodes by default. It is recommended to use half of available cores on
each compute node (e.g. 18 cores on OF queue) if the application does not benefit from the extra virtual cores.

## Links

[^1]: [Amazon Web Services, Official Website](https://aws.amazon.com/)

[^2]: [Queue Cost Categories, Link](../resource/category.md#cost-categories)

[^3]: [Queue Provision Modes, Link](../resource/category.md#provision-modes)

[^4]: [Charge polices, Link](../resource/queues.md#charge-policies)

[^5]: [CPU types, Link](hardware.md#cpu-types)

[^6]: [GPU types, Link](hardware.md#gpu-types)

[^7]: [Wikipedia Hyper-threading, Website](https://en.wikipedia.org/wiki/Hyper-threading)

///FOOTNOTES GO HERE///
