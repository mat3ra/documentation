# Cluster-101

## Overview

This cluster is hosted on [Microsoft Azure][^1] infrastructure and is intended to provide free compute resources.

|    Name     |                     Hostname                      | Location |
|:-----------:|:-------------------------------------------------:|:--------:|
| cluster-101 | master-production-20250821-cluster-101.mat3ra.com | East US  |

## Queues

The list of currently enabled queues is given below. 

The price factor is shown in relation to the [relative unit price]({{ guide_url }}/pricing/service-levels/#comparison-table).

The price factor if 10E-4 means that the cost of using this queue is 0.0001 times the cost of using the base queue (OR).
This is intended to provide free compute resources and keep the accounting of resource usage.

| Name | Category[^2] | Mode[^3] | Charge Policy[^4] | Price Factor | Max Nodes per Job<sup>+</sup> | Max Nodes Total |
|:----:|:------------:|:--------:|:-----------------:|:------------:|:-----------------------------:|:---------------:|
|  D   |    debug     | ordinary |   core-seconds    |    1.0E-4    |               1               |        1        |
|  OR  |   regular    |  saving  |   core-seconds    |    1.0E-4    |               1               |        0        |
|  SR  |   regular    |  saving  |   core-seconds    |    1.0E-4    |               1               |        1        |
|  OF  |     fast     |  saving  |    core-hours     |    1.0E-4    |               5               |        0        |
|  SF  |     fast     |  saving  |    core-hours     |    1.0E-4    |               5               |        1        |
| GPOF |     fast     |  saving  |    core-hours     |    1.0E-4    |               5               |        0        |
| GPSF |     fast     |  saving  |    core-hours     |    1.0E-4    |               5               |        1        |

<sup>+</sup> please contact support to inquire about attempting a larger node count per job

## Hardware Specifications

See [Azure Queues](azure.md) for more information.

# Links

[^1]: [Microsoft Azure, Website](https://azure.microsoft.com/en-us/)

///FOOTNOTES GO HERE///
