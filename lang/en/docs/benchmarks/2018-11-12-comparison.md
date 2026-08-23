---
render_macros: false
---

# 2018-11 Cloud-based Materials Modeling Benchmarks

## Overview

The purpose of this study is to understand the suitability of the high-performance computing hardware available from multiple cloud providers for running materials modeling and simulations. In order to do so, we run the following benchmarks:

- a general High-Performance Linpack (HPL[^1]), the benchmark employed to rank the world's best supercomputing systems [^2],
- network latency and bandwidth benchmarks[^5] to compare the interconnect hardware,
- application-specific cases for Vienna Ab-initio Simulation Package (VASP[^3]) and GROMACS[^4] to estimate the extent to which a "real-world" calculation can be efficiently scaled,

## Methodology

In order to make a comparison, for all the cases studied we run the benchmarks with entirely equivalent setups for the number of nodes (NODES) and cores per node (PPN). The readers should note, however, that the hardware configurations differ with respect to the PPN. We calculate the Speedup and Speedup Ratio as defined below.

### Hardware

We consider 4 cloud computing vendors, Amazon Web Services (AWS), Microsoft Azure (AZ), Oracle (OL), and Google Compute Engine (GCE). "NHT" refers to the Non-hyperthreaded[^6] scenario. "IB-H" refers to infiniband-interconnected H-series type virtual machines [^7]. The hardware specifications are listed below (we refer to physical cores as "Cores"):

| Case          | Type          | Cores | CPU Family                 | Freq. (GHz) | Memory (GB) | RDMA[^8] |
| :---:         | :---:         | :---: | :---:                      | :---:       | :---:       | :---:    |
| AWS-NHT       | c4.8xlarge    | 18    | Intel Xeon E5-2666 v3      | 2.9         | 60          | No       |
| AWS-NHT-C5    | c5.18xlarge   | 36    | Intel Xeon Platinum 8124M3 | 3           | 144         | No       |
| AZ-IB-H       | Standard_H16r | 16    | Intel Xeon E5-2667 v3      | 3.2         | 112         | Yes      |
| OL-NHT        | BM.HPC2.36    | 36    | Intel Xeon Gold 6154       | 3           | 384         | Yes      |
| GCE-NHT-H[^9] | n1-highcpu-64 | 32    | Intel Xeon E5 v3 (Haswell) | 2.3         | 57.6        | No       |

### Definitions

#### Performance Gain

The ratio of performance for a given number of nodes to the performance for a single node.

#### Speedup Ratio

The ratio of the Performance Gain for a given number of nodes to the ideal speedup.

#### Speedup

Inverse total runtime for the task (in seconds).

### Important Notes

1. We present quick estimates that are extracted based on a limited (1-3) number of runs. A more comprehensive study is needed to account for the results of the natural modulations such as the data center load and how the computing nodes are distributed in the data center at the time of benchmarking.

2. Readers may get better results by tuning the input parameters for the specific hardware and test case.

## Results

### HPL

We compare 4 cloud computing vendors as mentioned above. The following HPL configuration template is rendered with the parameters given in the table to generate the configuration and run the benchmark.

<details markdown="1">
  <summary>
    HPL.dat
  </summary>

```text
Linpack input file
Innovative Computing Laboratory, University of Tennessee
HPL.out      output file name (if any)
6            device out (6=stdout,7=stderr,file)
1            # of problems sizes (N)
{{ N }}      Ns
1            # of NBs
{{ NB }}     NBs
0            PMAP process mapping (0=Row-,1=Column-major)
1            # of process grids (P x Q)
{{ P }}      Ps
{{ Q }}      Qs
16.0         threshold
1            # of panel fact
2            PFACTs (0=left, 1=Crout, 2=Right)
1            # of recursive stopping criterium
4            NBMINs (>= 1)
1            # of panels in recursion
2            NDIVs
1            # of recursive panel fact.
1            RFACTs (0=left, 1=Crout, 2=Right)
1            # of broadcast
1            BCASTs (0=1rg,1=1rM,2=2rg,3=2rM,4=Lng,5=LnM)
1            # of lookahead depth
1            DEPTHs (>=0)
2            SWAP (0=bin-exch,1=long,2=mix)
64           swapping threshold
0            L1 in (0=transposed,1=no-transposed) form
0            U  in (0=transposed,1=no-transposed) form
1            Equilibration (0=no,1=yes)
8            memory alignment in double (> 0)
```

</details>


<details markdown="1">
  <summary>
    Parameters
  </summary>

| Provider   | Nodes | N      | NB    | P     | Q     |
| :---:      | :---: | :---:  | :---: | :---: | :---: |
| OL-NHT     | 1     | 200448 | 192   | 6     | 6     |
| OL-NHT     | 2     | 283776 | 192   | 8     | 9     |
| OL-NHT     | 4     | 401280 | 192   | 12    | 12    |
| OL-NHT     | 8     | 567552 | 192   | 16    | 18    |
| -          | -     | -      | -     | -     | -     |
| AZ-IB-H    | 1     | 109248 | 192   | 4     | 4     |
| AZ-IB-H    | 2     | 154560 | 192   | 4     | 8     |
| AZ-IB-H    | 4     | 218688 | 192   | 8     | 8     |
| AZ-IB-H    | 8     | 309120 | 192   | 8     | 16    |
| -          | -     | -      | -     | -     | -     |
| AWS-NHT    | 1     | 80640  | 192   | 3     | 6     |
| AWS-NHT    | 2     | 114048 | 192   | 6     | 6     |
| AWS-NHT    | 4     | 161472 | 192   | 8     | 9     |
| AWS-NHT    | 8     | 228288 | 192   | 12    | 12    |
| -          | -     | -      | -     | -     | -     |
| AWS-NHT-C5 | 1     | 121920 | 192   | 6     | 6     |
| AWS-NHT-C5 | 2     | 172416 | 192   | 8     | 9     |
| AWS-NHT-C5 | 4     | 244032 | 192   | 12    | 12    |
| AWS-NHT-C5 | 8     | 345024 | 192   | 16    | 18    |
| -          | -     | -      | -     | -     | -     |
| GCE-NHT-H  | 1     | 77952  | 192   | 4     | 8     |
| GCE-NHT-H  | 2     | 110208 | 192   | 8     | 8     |
| GCE-NHT-H  | 4     | 155904 | 192   | 8     | 16    |
| GCE-NHT-H  | 8     | 220608 | 192   | 16    | 16    |

</details>


## Results

### HPL

#### Speedup

A comparison of the speedup ratios for all cloud vendors described above are presented. As it can be seen, Oracle and Microsoft Azure have better speedup ratios because of the low latency interconnect network that facilitates efficient scaling.

![Speedup](../images/benchmarks/ol-benchmarks-speedup-ratio.png "Speedup")

#### Performance Per Core

The following figure shows a comparative plot of the performance per core in giga-FLOPS (GFLOPS) for the previously described scenarios. Oracle and Microsoft Azure outperform AWS because of faster processors and the low latency interconnect network.

![Performance Per Core](../images/benchmarks/ol-benchmarks-performance-per-core.png "Performance Per Core")


### VASP

Vienna Ab-initio Simulation Package (VASP) at version 5.3.5 with a corresponding set of default pseudo-potentials were employed for this study.

Two basic parallelization schemes were attempted:

- Parallelization over the electronic bands for large-unit-cell materials (further referred to as ELB)

- Parallelization over the sampling points in reciprocal space, or k-points (further referred to as KPT)

The number of cores per node (PPN) and the total number of nodes (NODES) were used to distinguish between parallelization levels.

#### Parallelization Over Electronic Bands

##### Input Data

<details markdown="1">
  <summary>
    INCAR
  </summary>

```fortran
ALGO = Normal
EDIFF = 0.0001
ENCUT = 520
ISIF = 3
ISMEAR = 0
SIGMA = 0.05
ISPIN = 1
LREAL = Auto
NELM = 10
PREC = Low
# Parallelism
NCORE = 1
LPLANE = .TRUE.
```

</details>

<details markdown="1">
  <summary>
    POSCAR: "Ba25 Bi15 O54" with a supercell containing 188 atoms
  </summary>

```text
50 Bi30 O108
1.0
10.866266 0.000000 -0.954010
0.000000 6.451345 0.000000
0.000000 0.000000 51.985082
Ba Bi O
50 30 108
direct
0.087932 0.000000 0.565368 Ba
0.625404 0.500000 0.646400 Ba
0.955413 0.000000 0.425732 Ba
0.340186 0.000000 0.950909 Ba
0.153840 0.500000 0.469477 Ba
0.259159 0.500000 0.126029 Ba
0.681472 0.000000 0.981631 Ba
0.125404 0.000000 0.646400 Ba
0.794831 0.500000 0.440241 Ba
0.516546 0.000000 0.318523 Ba
0.076763 0.000000 0.076531 Ba
0.949383 0.500000 0.174093 Ba
0.995789 0.000000 0.931988 Ba
0.333768 0.000000 0.512221 Ba
0.137082 0.000000 0.222918 Ba
0.653840 0.000000 0.469477 Ba
0.688638 0.500000 0.723868 Ba
0.592917 0.000000 0.821706 Ba
0.449383 0.000000 0.174093 Ba
0.385441 0.000000 0.029138 Ba
0.637082 0.500000 0.222918 Ba
0.220533 0.000000 0.365614 Ba
0.887847 0.000000 0.773393 Ba
0.720533 0.500000 0.365614 Ba
0.789340 0.000000 0.614796 Ba
0.495789 0.500000 0.931988 Ba
0.181472 0.500000 0.981631 Ba
0.576763 0.500000 0.076531 Ba
0.527676 0.000000 0.747544 Ba
0.824291 0.000000 0.272381 Ba
0.455413 0.500000 0.425732 Ba
0.980401 0.500000 0.668320 Ba
0.027676 0.500000 0.747544 Ba
0.294831 0.000000 0.440241 Ba
0.840186 0.500000 0.950909 Ba
0.833768 0.500000 0.512221 Ba
0.927808 0.000000 0.854454 Ba
0.759159 0.000000 0.126029 Ba
0.092917 0.500000 0.821706 Ba
0.885441 0.500000 0.029138 Ba
0.427808 0.500000 0.854454 Ba
0.781730 0.500000 0.873251 Ba
0.480401 0.000000 0.668320 Ba
0.324291 0.500000 0.272381 Ba
0.281730 0.000000 0.873251 Ba
0.289340 0.500000 0.614796 Ba
0.188638 0.000000 0.723868 Ba
0.016546 0.500000 0.318523 Ba
0.587932 0.500000 0.565368 Ba
0.387847 0.500000 0.773393 Ba
0.057887 0.500000 0.395436 Bi
0.104173 0.000000 0.150024 Bi
0.604173 0.500000 0.150024 Bi
0.796407 0.000000 0.199378 Bi
0.225563 0.500000 0.052079 Bi
0.711422 0.000000 0.545284 Bi
0.112287 0.500000 0.903014 Bi
0.362976 0.500000 0.349747 Bi
0.296407 0.500000 0.199378 Bi
0.987680 0.000000 0.497559 Bi
0.315493 0.500000 0.697781 Bi
0.487680 0.500000 0.497559 Bi
0.922161 0.500000 0.594720 Bi
0.219179 0.000000 0.800001 Bi
0.540108 0.500000 0.002942 Bi
0.416930 0.000000 0.101077 Bi
0.484071 0.000000 0.248330 Bi
0.984071 0.500000 0.248330 Bi
0.725563 0.000000 0.052079 Bi
0.916930 0.500000 0.101077 Bi
0.422161 0.000000 0.594720 Bi
0.815493 0.000000 0.697781 Bi
0.557887 0.000000 0.395436 Bi
0.612287 0.000000 0.903014 Bi
0.040108 0.000000 0.002942 Bi
0.719179 0.500000 0.800001 Bi
0.676341 0.500000 0.298016 Bi
0.862976 0.000000 0.349747 Bi
0.176341 0.000000 0.298016 Bi
0.211422 0.500000 0.545284 Bi
0.478903 0.264076 0.975105 O
0.794009 0.743545 0.574401 O
0.433687 0.500000 0.670087 O
0.969858 0.279329 0.892025 O
0.179468 0.726829 0.684315 O
0.580036 0.241791 0.275058 O
0.501386 0.243805 0.126414 O
0.478349 0.764772 0.625843 O
0.379555 0.276752 0.725560 O
0.824942 0.500000 0.768163 O
0.215931 0.000000 0.987806 O
0.693680 0.229357 0.927680 O
0.134064 0.729656 0.424188 O
0.203222 0.252815 0.174870 O
0.325390 0.000000 0.271903 O
0.304355 0.761555 0.828560 O
0.978349 0.264772 0.625843 O
0.105383 0.752738 0.029752 O
0.080036 0.741791 0.275058 O
0.168673 0.500000 0.363758 O
0.707662 0.000000 0.871018 O
0.304355 0.238445 0.828560 O
0.586903 0.000000 0.575600 O
0.469858 0.779329 0.892025 O
0.969858 0.720671 0.892025 O
0.879555 0.776752 0.725560 O
0.679468 0.773171 0.684315 O
0.879555 0.223248 0.725560 O
0.634064 0.770344 0.424188 O
0.469858 0.220671 0.892025 O
0.578142 0.259276 0.783096 O
0.328452 0.760817 0.075220 O
0.804355 0.261555 0.828560 O
0.379555 0.723248 0.725560 O
0.203222 0.747185 0.174870 O
0.794009 0.256455 0.574401 O
0.416818 0.257504 0.380306 O
0.294009 0.243545 0.574401 O
0.033750 0.000000 0.329333 O
0.679468 0.226829 0.684315 O
0.634064 0.229656 0.424188 O
0.102926 0.747133 0.524447 O
0.602926 0.752867 0.524447 O
0.102926 0.252867 0.524447 O
0.578142 0.740724 0.783096 O
0.828452 0.260817 0.075220 O
0.894263 0.755816 0.223836 O
0.602926 0.247133 0.524447 O
0.381754 0.263004 0.473798 O
0.792543 0.254627 0.323251 O
0.580036 0.758209 0.275058 O
0.916818 0.757504 0.380306 O
0.394263 0.255816 0.223836 O
0.193680 0.270643 0.927680 O
0.365823 0.500000 0.020410 O
0.394263 0.744184 0.223836 O
0.001386 0.256195 0.126414 O
0.634722 0.500000 0.474407 O
0.478903 0.735924 0.975105 O
0.078142 0.240724 0.783096 O
0.080036 0.258209 0.275058 O
0.292543 0.754627 0.323251 O
0.416818 0.742496 0.380306 O
0.082298 0.500000 0.080658 O
0.207662 0.500000 0.871018 O
0.645801 0.000000 0.224672 O
0.828452 0.739183 0.075220 O
0.605383 0.252738 0.029752 O
0.256293 0.000000 0.123311 O
0.134064 0.270344 0.424188 O
0.978903 0.235924 0.975105 O
0.086903 0.500000 0.575600 O
0.478349 0.235228 0.625843 O
0.693680 0.770643 0.927680 O
0.881754 0.236996 0.473798 O
0.605383 0.747262 0.029752 O
0.978903 0.764076 0.975105 O
0.328452 0.239183 0.075220 O
0.865823 0.000000 0.020410 O
0.145801 0.500000 0.224672 O
0.105383 0.247262 0.029752 O
0.294009 0.756455 0.574401 O
0.533750 0.500000 0.329333 O
0.804355 0.738445 0.828560 O
0.582298 0.000000 0.080658 O
0.179468 0.273171 0.684315 O
0.078142 0.759276 0.783096 O
0.451725 0.500000 0.175704 O
0.292543 0.245373 0.323251 O
0.703222 0.247185 0.174870 O
0.881754 0.763004 0.473798 O
0.792543 0.745373 0.323251 O
0.134722 0.000000 0.474407 O
0.756293 0.500000 0.123311 O
0.703222 0.752815 0.174870 O
0.381754 0.736996 0.473798 O
0.715931 0.500000 0.987806 O
0.894263 0.244184 0.223836 O
0.916818 0.242496 0.380306 O
0.933687 0.000000 0.670087 O
0.324942 0.000000 0.768163 O
0.193680 0.729357 0.927680 O
0.501386 0.756195 0.126414 O
0.825390 0.500000 0.271903 O
0.668673 0.000000 0.363758 O
0.978349 0.735228 0.625843 O
0.001386 0.743805 0.126414 O
0.951725 0.000000 0.175704 O
```

</details>


<details markdown="1">
  <summary>
    KPOINTS
  </summary>

```text
Automatic mesh
0
Gamma
  1 1 1
  0 0 0
```

</details>

##### Outcomes

![Outcomes](../images/benchmarks/ol-benchmarks-vasp-elb-speedup.png "Outcomes")


#### Parallelization Over KPOINTS

##### Input Data

<details markdown="1">
  <summary>
    INCAR
  </summary>

```fortran
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
MAGMOM = 8*0.6 16*5
NELM = 100
NCORE = 1
KPAR = {{ NODES }}
NSW = 1
PREC = Med
SIGMA = 0.2
```

</details>


<details markdown="1">
  <summary>
    POSCAR: "Li8 V8 Mo8" with a unit cell containing 24 atoms
  </summary>

```text
Li8 V8 Mo8
1.0
11.788818 3.929606 -3.929606
-11.788818 3.929606 -3.929606
0.000000 1.964803 1.964803
Li V Mo
8 8 8
direct
0.666667 0.333333 1.000000 Li
0.958333 0.791667 0.500000 Li
0.500000 0.500000 1.000000 Li
0.208333 0.041667 0.500000 Li
0.583333 0.916667 1.000000 Li
0.333333 0.666667 1.000000 Li
0.291667 0.458333 0.500000 Li
0.125000 0.625000 0.500000 Li
0.916667 0.583333 1.000000 V
0.875000 0.375000 0.500000 V
0.625000 0.125000 0.500000 V
0.750000 0.750000 1.000000 V
0.458333 0.291667 0.500000 V
0.791667 0.958333 0.500000 V
0.083333 0.416667 1.000000 V
0.375000 0.875000 0.500000 V
0.833333 0.166667 1.000000 Mo
0.416667 0.083333 1.000000 Mo
0.708333 0.541667 0.500000 Mo
0.250000 0.250000 1.000000 Mo
1.000000 1.000000 1.000000 Mo
0.541667 0.708333 0.500000 Mo
0.041667 0.208333 0.500000 Mo
0.166667 0.833333 1.000000 Mo
```

</details>


<details markdown="1">
  <summary>
    KPOINTS
  </summary>

```text
Automatic mesh
0
Gamma
  6 6 6
  0 0 0
```

</details>

##### Outcomes

![Outcomes](../images/benchmarks/ol-benchmarks-vasp-kpt-speedup.png "Outcomes")


### Network Benchmarks

The following shows the result of Intel MPI Benchmarks running on Amazon Web Services C5 instances, Azure H-series VMs and Oracle hardware. As it can be seen Oracle interconnect network is faster and has the lowest latency.

#### Latency

![Latency](../images/benchmarks/ol-benchmarks-latency.png "Latency")

#### Bandwidth

![Bandwidth](../images/benchmarks/ol-benchmarks-bandwidth.png "Bandwidth")


### GROMACS

We use the below, one of our customer use cases to study the extent to which a GROMACS calculation can be efficiently scaled. As it can be seen this particular use case is very well scaled.

#### Polystyrene

##### Input Data

The visual below demonstrates the model studied - a box with 418,402 total atoms. Input files are available upon request.

![Input Data](../images/benchmarks/ol-benchmarks-gromacs-model.png "Input Data")

##### Results

![Results](../images/benchmarks/ol-benchmarks-gromacs-speedup.png "Results")


## Conclusion

We benchmark the performance of the latest cloud hardware with HPL, two VASP simulation cases, one GROMACS case and MPI Benchmarks. Our findings demonstrate that Oracle Cloud outperforms other cloud vendors due to the latest generation of the hardware and fast interconnect network.


## Links

[^1]: [High-Performance Linpack, official website](http://www.netlib.org/benchmark/hpl/)
[^2]: [Top 500 supercomputers in the world, official website](https://www.top500.org/)
[^3]: [Vienna Ab-initio Simulation Package, official website](https://www.vasp.at/)
[^4]: [GROMACS, official website](http://www.gromacs.org/)
[^5]: [MPI Benchmarks, Documentation](https://software.intel.com/en-us/articles/intel-mpi-benchmarks)
[^6]: [Intel hyper-threading technology overview, website](https://www.intel.com/content/www/us/en/architecture-and-technology/hyper-threading/hyper-threading-technology.html)
[^7]: [Microsoft Azure H-series Virtual Machines, official documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes-hpc)
[^8]: [Remote Direct Memory Access, Wikipedia article](https://en.wikipedia.org/wiki/Remote_direct_memory_access)
[^9]: [Google Compute Engine CPU Platforms, official website](https://cloud.google.com/compute/docs/cpu-platforms)

///FOOTNOTES GO HERE///
