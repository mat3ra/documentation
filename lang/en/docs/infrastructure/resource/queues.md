# Queues

Different task scheduling **Queues** are available in order to facilitate flexible access to the [computational resources](../clusters/overview.md).

## Naming Convention

Queue name consists of the 4 main parts as demonstrated below. Only one part, denoted as 2 and enclosed by braces `{}`, is mandatory. Other parts, enclosed by brackets `[]`, are optional.

```regexp
[1a][1b][1c]{2}[3][4]
```

### Explanation

1. GPU-specific concerns:

    a. Whether queue is GPU-enabled. If yes, letter "G" is used.
    b. Type of GPU. `P` means [P100](../clusters/hardware.md#gpu-types). [V100](../clusters/hardware.md#gpu-types) is used by default for GPU-enabled queues otherwise.
    c. Number of GPUs per each node, 1 GPU if not specified.

2. Queue [cost category](category.md#cost-categories): either "D" (Debug), "O" (Ordinary) or "S" (Saving).

3. Queue [provision mode](category.md#provision-modes), R (Regular) and F (Fast).

4. Maximum number of cores per single node. Depends on the cluster and [cloud provider](../clusters/overview.md) if it is not specified.

### Examples

- **G4OF**: GPU-enabled, [V100](../clusters/hardware.md#gpu-types), 4 GPUs, Ordinary, Fast; 32 cores per node on [AWS](../clusters/aws.md) only
- **GPSF**, GPU-enabled, [P100](../clusters/hardware.md#gpu-types), 1 GPU, Saving, Fast, 6 cores per node on [Azure](../clusters/azure.md) only
- **OR16**: Ordinary, Regular, 16 cores per each compute node
- **OF**: Ordinary, Fast; 36 cores per node on [AWS](../clusters/aws.md), 16 cores on [Azure](../clusters/azure.md)
- **SFplus**: Saving, Fast; 72 later generation (compared to "SF") cores on [AWS](../clusters/aws.md) only

## Charge Policies

The [provision mode](category.md#provision-modes) determines charge policy:

**R (Regular)** *core seconds*: jobs are only charged for core-seconds consumed

**F (Fast)** *flat fee*: jobs are charged for core-seconds consumed **plus** a flat fee (*5 core-minutes*) due to increased on-demand provisioning cost

!!! warning "Failed jobs in the F (Fast) provision category will still incur a flat fee"
    We advise users to prototype calculations in other queues and only deploy production-ready large-scale runs in queues with "flat fee" charge policies.

## List of Queues

Detailed [cluster](../clusters/overview.md)-specific lists of queues are available for the [Amazon Web Services](../clusters/aws.md) and [Azure](../clusters/azure.md) separately.

## Select Queue

Queues can be selected under the Web Interface according to the instructions found [here](../compute/overview.md). Similarly, the desired queue can be specified in the [Batch Script]({{ cli_url }}/jobs-cli/batch-scripts/overview/) for the case of [Job submission via the Command Line Interface]({{ cli_url }}/jobs-cli/overview/).
