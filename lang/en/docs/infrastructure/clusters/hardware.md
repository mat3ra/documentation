# Hardware Specifications

Our computing resources are hosted by trusted vendors: [Amazon Web Services](aws.md) and [Microsoft Azure](azure.md).
We support IBM SoftLayer[^1], Rackspace[^2] and Google Cloud[^3] can deploy capacity there on a short notice.

The following shows the CPU and GPU hardware specification on aforementioned vendors.

## CPU Types

The following table shows different types of CPUs available in our platform.

| Name |              Type              | Processor Base Frequency (GHz) |
|:----:|:------------------------------:|:------------------------------:|
| c-1  |   Intel Xeon E5-2667-v3[^4]    |              3.20              |
| c-2  |   Intel Xeon E5-2690-v4[^5]    |              2.60              |
| c-3  |   Intel Xeon E5-2666-v3[^6]    |              2.90              |
| c-4  |   Intel Xeon E5-2686-v4[^7]    |              2.30              |
| c-5  |    Intel Xeon Platinum[^6a]    |              3.00              |
| c-6  |  Intel Xeon Platinum 8168[^8]  |              2.70              |
| c-7  |   Intel Xeon E5-2673-v3[^11]   |              2.40              |
| c-8  | Intel Xeon Platinum 8275L[^11] |              3.00              |
| c-9  |       AMD EPYC 7R13[^12]       |              3.60              |

## GPU Types

The following table shows different types of GPUs the GPU-enabled compute nodes are provisioned with.

| Name |       Type       |
|:----:|:----------------:|
| g-3  | NVIDIA A100[^9]  |
| g-4  | NVIDIA H100[^10] |

## Available Resources

As of 2025 our major compute and storage systems (per cluster) are as explained below.
The total number of cores is administratively limited by our agreements with the cloud vendors, and
can be extended further upon request.

| Provider | Total cores | Total Memory (GB) | Total Disk (EB) |
|:---------|:-----------:|:-----------------:|:---------------:|
| AWS      |   36,000    |      60,000       |        8        |
| Azure    |   10,000    |      20,000       |        8        |

## Links

[^1]: [IBM SoftLayer, official website](http://www.softlayer.com)

[^2]: [Rackspace, official website](http://www.rackspace.com)

[^3]: [Google Cloud, official website](https://cloud.google.com)

[^4]: [Intel Xeon Processor E5-2667 v3, online product documentation](https://ark.intel.com/products/83361/Intel-Xeon-Processor-E5-2667-v3-20M-Cache-3-20-GHz-)

[^5]: [Intel Xeon Processor E5-2690 v4, online product documentation](https://ark.intel.com/products/91770/Intel-Xeon-Processor-E5-2690-v4-35M-Cache-2-60-GHz-)

[^6]: [Amazon C4 instances, AWS documentation](https://aws.amazon.com/ec2/instance-types/)

[^6a]: [Amazon C5 instances, AWS documentation](https://aws.amazon.com/ec2/instance-types/)

[^7]: [Amazon P3 instances, AWS documentation](https://aws.amazon.com/ec2/instance-types/)

[^8]: [HC-Series, Microsoft Azure documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/hc-series)

[^9]: [NVIDIA A100, online product documentation](https://www.nvidia.com/en-us/data-center/a100/)

[^10]: [NVIDIA H100, online product documentation](https://www.nvidia.com/en-us/data-center/h100/)

[^11]: [F-Series VM Sizes, Azure](https://azure.microsoft.com/en-us/blog/f-series-vm-size/)

[^11]: [p4d.24xlarge VM Sizes, AWS](https://aws.amazon.com/ec2/instance-types/p4/)

[^12]: [p5.4xlarge VM Sizes, AWS](https://aws.amazon.com/ec2/instance-types/p5/)

///FOOTNOTES GO HERE///
