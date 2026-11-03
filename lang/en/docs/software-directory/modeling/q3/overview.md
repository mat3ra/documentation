# Quantum 3xplorer

Quantum 3xplorer (Q3, referred to as "q3" in our platform) is a plane-wave
pseudopotential engine for
[Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/)
(DFT) calculations of periodic crystals, developed at Mat3ra. It follows the
[ESSE](https://github.com/mat3ra/esse) data standard for its inputs and outputs,
and reads norm-conserving, ultrasoft, and Projector Augmented-Wave (PAW)
[pseudopotentials]({{ reference_url }}/methods-directory/pseudopotential/overview/)
in the Unified Pseudopotential Format (UPF).

!!!warning "Pre-release"
    Q3 is in pre-release. The functionality available on our platform is limited
    to the self-consistent field total energy calculation described in the
    [components](components.md) page.

## Supported Versions

We support version `2026.10.31-0` of Q3, built with the GNU toolchain and
parallelized with the Message Passing Interface (MPI).

## Models and Methods

Q3 calculations on our platform use the
[Kohn-Sham DFT]({{ reference_url }}/models-directory/dft/overview/) model, with
the following exchange-correlation functionals.

| Functional | Type                                     |
| :--------- | :--------------------------------------- |
| `pz`       | Local Density Approximation (LDA)        |
| `pbe`      | Generalized Gradient Approximation (GGA) |
| `pbesol`   | Generalized Gradient Approximation (GGA) |

The method combines a plane-wave basis set with norm-conserving, ultrasoft (the
default), or PAW pseudopotentials, Gaussian smearing of the electronic
occupations, and Davidson diagonalization.

## [Components](components.md)

We introduce the executable and the calculation flavors of Q3 implemented on our
platform [in this page](components.md).

## Workflows

The *Total energy - Q3* workflow is available in the
[Workflows Bank](../../../workflows/bank.md). It fetches the material from the
platform, writes it to the input directory, and runs a self-consistent field
calculation with the `q3_scf` flavor, extracting the
[total energy]({{ reference_url }}/properties-directory/scalar/total-energy/) and
the [Fermi energy]({{ reference_url }}/properties-directory/scalar/fermi-energy/).

## Command Line Usage

Q3 is installed on the compute clusters as an
[Apptainer container]({{ cli_url }}/jobs-cli/batch-scripts/apptainer/), exposed
through the `q3` [environment module]({{ cli_url }}/cli/modules/). Loading the
module sets the `$EXEC_CMD` and `$EXEC_CMD_Q3` variables to the container
execution command. The MPI launcher is part of the container, so `mpirun` is
called inside it, as shown in the batch script example below.

```bash
#!/bin/bash

#PBS -N q3_scf
#PBS -l nodes=1
#PBS -l ppn=4
#PBS -q D
#PBS -j oe
#PBS -l walltime=00:10:00

cd $PBS_O_WORKDIR
module load q3
# $EXEC_CMD is set by the environment module
$EXEC_CMD mpirun -np $PBS_NP q3 q3_scf.yml > q3.out
```

Results are written to `<outdir>/<prefix>_results.json`, where `outdir` and
`prefix` are set in the `control` section of the input file.
