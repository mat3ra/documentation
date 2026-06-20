# Environment Modules

With Environment Modules, a variety of software libraries and applications are available for use in the command line interface (CLI).  These modules are selectively activated and deactivated with the Environment Module command line utility `module`.

!!! note "Module help"
    As with many other command line tools `module help` explains the usage of the module command.

## Notation

Our module naming convention provides an at-a-glance summary of the software provided by the module, its version,
and (optionally) the build information. The general format for this naming system is:

`[Application Name]/[Application Version]-[Optional Build Information]`

For example, Python 3.9.1 is listed as `python/3.9.1`, Python with version 5.2.0 of the Anaconda package manager is
listed as `python/anaconda-5.2.0`.

Many of our modules contain build information in the name. This is useful when debugging job errors, as it indicates
which compiler and libraries were used to build a version. In general, the syntax for optional build information is:

```[Compiler Abbreviation]-[Compiler Version]-[Library Abbreviation]-[Library Version]```

A list of compiler and library  abbreviations can be found in the following table:

| Name                    | Abbreviation | Description                                                                                   |
| ----                    | ------------ | -----------                                                                                   |
| GNU Compiler Collection | g            | Open-Source C / C++ / Fortran compilers from the GNU Project                                  |
| Intel Compilers         | i            | Closed-Source C / C++ / Fortran compilers from Intel                                          |
| OpenMPI                 | ompi         | Open-Source implementation of the Message Passing Interface standard from the OpenMPI Project |
| Intel MPI               | impi         | Closed-Source implementation of the Message Passing Interface standard from Intel             |

For example, Quantum Espresso version 5.2.1 built with GCC 4.8.5 and OpenMPI 1.10.0 would be labeled as
`espresso/5.2.1-g-4.8.5-ompi-1.10.0`.

Finally, several package names carry additional metadata about their build configuration at the end of the
name string. These abbreviations are specific to the application being built, and a table can be found below which lists
what they mean:

| Program | Abbreviation | Meaning                                                             |
| ------- | ------------ | -------                                                             |
| Gromacs | md           | Gromacs built with MPI double precision                             |
| Gromacs | ms           | Gromacs built with MPI single precision                             |
| Gromacs | gms          | Gromacs built for use with GPUs (MPI single precision)              |
| VASP    | nc           | VASP built for Non-Collinear calculations                           |
| VASP    | vtst         | VASP built with the Transition State Tools from the Henkelman Group |
| VASP    | gamma        | VASP built to only use gamma-points                                 |
| VASP    | gpu          | VASP built for use with GPUs                                        |

Putting it all together, if we take the `vasp/5.4.4-i-14.0.3.174-impi-5.0.2.044-vtst-gamma` module as an example,
we can easily see that this refers to VASP 5.4.4, built with version 14.0.3.174 of the Intel compiler and the Intel MPI
library version 5.0.2.044. Additionally, we can see that this is a gamma-point only version of VASP containing the
Henkelman group's transition state tools.

### Legacy Naming Convention

Several of the older packages on our system adopt a legacy naming convention. It is similar to the above notation,
except that in order to shorten the name, periods in the version numbers were removed. To protect compatibility with
existing user-made scripts, we have preserved this naming convention. For example, the
`espresso/5.2.1-g-4.8.5-ompi-1.10.0` package has a duplicate listing as `espresso/521-g-485-ompi-110`. We plan for
these packages to be hidden from the output of the `module avail` command in the future. We discourage the use
of modules with this legacy naming convention in any newly-created job submission scripts. Instead, please use the full,
current naming convention for modules.

## List Available Modules

The command `module avail` provides a complete list of the
**modules made available on our platform**. The common stem for the module
installation paths is displayed on top of each section listed in the output,
whereas the rest of the path name is specified under each listed entry.

We have reproduced the output of this command below listing all currently
available modules, for reference purposes. The reader is referred to the
[software directory overview]({{ reference_url }}/software-directory/overview/)
for an introduction to the codes, libraries and software packages listed here.

```text
mat3ra@master-production-20250821-cluster-001:~$ module avail
--------------------------- /export/compute/modulefiles/applications ---------------------------
deepmd/3.1.2-cpu
espresso/6.3-gnu
espresso/7.5-cuda-12.8
espresso/7.5-gnu
espresso/7.5-host-intel-2023.1-libxc-7.0
lammps/2025.07.22.2-gnu
lammps/2025.07.22.2-intel-2023.1
lammps/2025.07.22.2-intel-2023.1-cuda-12.8
nwchem/7.0.2-gnu
vasp/5.4.4-gnu

---------------------------- /export/compute/modulefiles/libraries -----------------------------
cuda/12.4-cudnn-9.6
intel/oneapi-2023.1.0
mpi/ompi-4.1.1
nvhpc/25.3-cuda-12.8

---------------------------- /export/compute/modulefiles/compilers -----------------------------
gcc/11.2.0

---------------------------- /export/compute/modulefiles/languages -----------------------------
python/3.10.13
```

Through the `module avail` command, the user can also **search** for available
modules, by partially inserting the module's name. This functionality is
demonstrated in the example below.

```text
[mat3ra@master-production-20250821-cluster-001:~]$ module avail espresso
--------------------------- /export/compute/modulefiles/applications ---------------------------
espresso/6.3-gnu
espresso/7.5-cuda-12.8
espresso/7.5-gnu
espresso/7.5-host-intel-2023.1-libxc-7.0
```

## Actions

See the [module actions documentation](actions/modules-actions.md) for more
information on listing, loading, and resetting software modules.


## Links

[^1]: [Wikipedia Environment Modules, Website](https://en.wikipedia.org/wiki/Environment_Modules_(software))
[^2]: [Transition state tools for VASP, Henkelman Group at the University of Texas, Website](https://theory.cm.utexas.edu/vtsttools/)
