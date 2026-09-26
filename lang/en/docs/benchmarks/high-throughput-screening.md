# High-throughput scalability study

> Date: 2016/03

## Overview

A team of scientists from a public enterprise company used exabyte.io to study equilibrium geometries and formation energies for a set of promising metallic alloys. 

The team employed quantum mechanical modeling approaches based on density functional theory and vast compute power available on public cloud. During a single run researchers were able to scale to 10,656 CPUs within a few minutes from the start, and obtain accurate results for 296 compounds that represent ternary metallic alloys within 38 hours. 

The purpose of this study was to estimate the extent to which compute resources can be efficiently scaled while sustaining a constant level of performance.

!!! note "Hardware configuration"
    Amazon Web Services with the hardware configuration explained [here]({{ resources_url }}/infrastructure/clusters/aws/) were used for benchmarking

## Model and Method

Plane-wave Pseudopotential Density Functional Theory formalism as implemented in Vienna Ab-initio Simulation Package (VASP) at version 5.3.5 with a corresponding set of atomic pseudo-potentials was employed in this run.

<!-- ## Visualization

Below is an example visualization of a structure employed in this run.

![High-Throughput Scalability Structure](../images/benchmarks/HighThroughputScalabilityStructure.png "High-Throughput Scalability Structure")
 -->

## Inputs

<details markdown="1">
  <summary>**INCAR**</summary>

```text
ALGO = Normal
EDIFF = 0.0001
ENCUT = 520
IBRION = 2
ICHARG = 1
ISIF = 3
ISMEAR = 1
ISPIN = 2
LORBIT = 11
LREAL = Auto
LWAVE = False
MAGMOM = 24*0.6
NELM = 100
NPAR = 1
NSW = 50
PREC = Accurate
SIGMA = 0.2
```
</details>

<details markdown="1">
  <summary>**POSCAR**</summary>

```text
Li8 Al8 Cu8
1.0
11.687317 3.895772 -3.895772
-11.687317 3.895772 -3.895772
0.000000 1.947886 1.947886
Al Cu Li
8 8 8
direct
0.666667 0.333333 1.000000 Al
0.958333 0.791667 0.500000 Al
0.500000 0.500000 1.000000 Al
0.208333 0.041667 0.500000 Al
0.583333 0.916667 1.000000 Al
0.333333 0.666667 1.000000 Al
0.291667 0.458333 0.500000 Al
0.125000 0.625000 0.500000 Al
0.916667 0.583333 1.000000 Cu
0.875000 0.375000 0.500000 Cu
0.625000 0.125000 0.500000 Cu
0.750000 0.750000 1.000000 Cu
0.458333 0.291667 0.500000 Cu
0.791667 0.958333 0.500000 Cu
0.083333 0.416667 1.000000 Cu
0.375000 0.875000 0.500000 Cu
0.833333 0.166667 1.000000 Li
0.416667 0.083333 1.000000 Li
0.708333 0.541667 0.500000 Li
0.250000 0.250000 1.000000 Li
1.000000 1.000000 1.000000 Li
0.541667 0.708333 0.500000 Li
0.041667 0.208333 0.500000 Li
0.166667 0.833333 1.000000 Li
```
</details>

<details markdown="1">
  <summary>**KPOINTS**</summary>

```text
0
Gamma
1 1 2
```
</details>


## Results

High-performance computing resources were assembled on-demand using the infrastructure available at one of the public cloud vendors. For the first run, a total of 296 tasks (one-per-material) were submitted to exabyte.io cloud-scale resource-management system. Within 7 minutes after submission 296 compute nodes with 10,656 cores total were provisioned, configured and had compute tasks running on them.

![High-Throughput Scalability](../images/benchmarks/HighThroughputScalability.png "High-Throughput Scalability")

All tasks were finished within 38 hours from the start, with the shortest ones taking about 2 hours. The size of compute system was dynamically scaled with the number of active calculations. The total cost of the calculation was within a few thousand dollars (for comparison - the cost of buying 10,000 CPU can be estimated at several million dollars).


## Conclusion

A "real-world" example high-throughput materials discovery run scaling to nearly 300 materials (each with an advanced geometrical configuration involving 24 atoms inside a crystal unit cell) and nearly 11 thousand CPU was successfully attempted by an enterprise customer. Without large upfront expenditures and while using familiar environments and tools, they were able to quickly obtain the necessary data about the formation energies of metallic alloys. This data is now being used by the customer to guide their experimental search for better alloys. The scale of this run was, however, is far from the limit on the resources available at exabyte.io, and we have internal data in possession that shows significantly higher scale reached by our engineering team in development (contact us in case you would like to learn more).
