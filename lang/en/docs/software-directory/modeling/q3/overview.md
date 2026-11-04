# Quantum 3xplorer

Quantum 3xplorer (Q3, referred to as "q3" in our platform) [^1] [^2] is an
AI-native quantum simulation engine, written from scratch by AI coding agents
under the direction and supervision of domain scientists. Its first
implementation is a plane-wave
[pseudopotential]({{ reference_url }}/methods-directory/pseudopotential/overview/)
code for [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/)
(DFT) calculations of periodic crystals. The engine is written in C++17, with a
Python layer on top, and is distributed under the Apache License 2.0 [^3].

Q3 follows the [ESSE](https://github.com/mat3ra/esse) data standard for its
inputs and outputs. It reads its own YAML input format as well as unmodified
[Quantum ESPRESSO](../quantum-espresso/overview.md) `pw.x` namelist inputs, and
writes structured JSON results together with Quantum ESPRESSO-compatible binary
checkpoints.

## Capabilities

The capabilities of Q3 are grouped below by area. The validation status of each
feature against established plane-wave DFT codes is listed in the Q3
documentation [^2]. The subset of these capabilities available through the
platform workflows is described in the [components](components.md) page.

### Structures and symmetry

Q3 accepts the 14 Bravais lattice types as well as explicit lattice vectors.
Space-group detection, reduction of the Monkhorst-Pack
[k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/)
to the irreducible Brillouin zone, and density symmetrization are performed with
the [spglib](https://spglib.readthedocs.io/) library. Gamma-only calculations are
supported.

### Pseudopotentials and functionals

Norm-conserving, ultrasoft, and Projector Augmented-Wave (PAW) pseudopotentials
are read in the Unified Pseudopotential Format (UPF), versions 1 and 2. The
exchange-correlation functionals are provided by the
[LibXC](https://libxc.gitlab.io/) library: the Local Density Approximation (LDA)
in the Perdew-Zunger form, the Generalized Gradient Approximation (GGA) in the
PBE, PBEsol, BLYP, revPBE, and RPBE forms, and any other LDA or GGA combination
addressed by its LibXC identifier. Spin-unpolarized and collinear spin-polarized
calculations are supported.

### Ground-state calculations

The self-consistent field solver offers the following features.

- Total energy, atomic forces, and stress tensor, for all three pseudopotential types.
- Direct (LAPACK) and Davidson diagonalization.
- Broyden and Anderson density mixing, with Kerker preconditioning for metallic systems.
- Fixed occupations, and Gaussian, Methfessel-Paxton, Marzari-Vanderbilt, and Fermi-Dirac smearing.
- DFT+U in the Dudarev formulation, and DFT-D3 dispersion correction with Becke-Johnson damping.
- Charged cells, with Makov-Payne and Martyna-Tuckerman corrections for isolated systems.
- Non-self-consistent calculations and restart from binary checkpoints.

### Property workflows

The Python layer of Q3 provides workflows built on top of the engine, with an
[ASE](https://wiki.fysik.dtu.dk/ase/) calculator interface.

- Geometry relaxation, variable-cell relaxation, and relaxation at target pressure.
- [Band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/), density of states, and projected density of states with Löwdin charges.
- Equation of state (Birch-Murnaghan) and elastic constants.
- Gamma-point phonons, and phonon dispersions and thermodynamics through [Phonopy](https://phonopy.github.io/phonopy/).
- Wannier interpolation.
- Export of mean-field data for [BerkeleyGW](https://berkeleygw.org/), and of volumetric fields (density, potential, wavefunctions) in cube and XSF formats.

### Parallelization and hardware

Q3 runs in serial with OpenMP threading, and in parallel with the Message
Passing Interface (MPI) over k-point pools and band groups. GPU builds are
available for NVIDIA (CUDA, including several GPUs across MPI ranks), Apple
Silicon (Metal), AMD (HIP), and Intel (SYCL) hardware. Container images are
published for the x86-64 and ARM64 architectures.

## Supported Versions

We support version `2026.10.31-0` of Q3, built with the GNU toolchain and
parallelized with MPI.

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
`prefix` are set in the `control` section of the input file. The input format is
described in the Q3 documentation [^2]. Complete example inputs are listed in
the [Examples](components.md#examples) section of the components page.

## Links

[^1]: [Quantum 3xplorer, arXiv:2610.42108](https://arxiv.org/abs/2610.42108)

[^2]: [Quantum 3xplorer, Official Documentation](https://camsai.github.io/q3/)

[^3]: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
