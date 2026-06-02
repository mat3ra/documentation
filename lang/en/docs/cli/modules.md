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

The command `module avail` provides a complete list of the **modules made available on our platform**. The common stem for the module installation paths is displayed on top of each section listed in the output, whereas the rest of the path name is specified under each listed entry.

We have reproduced the output of this command below listing all currently available modules, for reference purposes. The reader is referred to the [software directory overview]({{ reference_url }}/software-directory/overview/) for an introduction to the codes, libraries and software packages listed here.

```text
---------------------------------------------------------------------------- /export/compute/modulefiles/system -----------------------------------------------------------------------------
emacs/24.5

------------------------------------------------------------------------- /export/compute/modulefiles/applications --------------------------------------------------------------------------
cp2k/4.1-i-14.0.3.174-impi-5.0.2.044                   gromacs/2021.5-g-11.2.0-ompi-4.1.1-openblas-0.3.18-gms vasp/5.3.5-g-4.8.5-ompi-1.10.0
cp2k/41-i-174-impi-044                                 gromacs/2021.5-g-11.2.0-ompi-4.1.1-openblas-0.3.18-md  vasp/5.3.5-g-4.8.5-ompi-1.10.0-nc
espresso/521-g-485-ompi-110                            gromacs/2021.5-g-11.2.0-ompi-4.1.1-openblas-0.3.18-ms  vasp/5.3.5-g-4.8.5-ompi-1.10.0-vtst
espresso/5.2.1-g-4.8.5-ompi-1.10.0                     gromacs/20215-g-11-ompi-411-openblas-0318-gms          vasp/535-g-485-ompi-110-nc
espresso/5.2.1-i-14.0.3.174-impi-5.0.2.044             gromacs/20215-g-11-ompi-411-openblas-0318-md           vasp/535-g-485-ompi-110-vtst
espresso/521-i-174-impi-044                            gromacs/20215-g-11-ompi-411-openblas-0318-ms           vasp/5.3.5-i-14.0.3.174-impi-5.0.2.044
espresso/540-g-485-ompi-110                            gromacs/5.1.4-g-4.8.5-ompi-1.10.0-md                   vasp/5.3.5-i-14.0.3.174-impi-5.0.2.044-nc
espresso/5.4.0-g-4.8.5-ompi-1.10.0                     gromacs/5.1.4-g-4.8.5-ompi-1.10.0-ms                   vasp/5.3.5-i-14.0.3.174-impi-5.0.2.044-vtst
espresso/5.4.0-i-14.0.3.174-impi-5.0.2.044             gromacs/514-g-485-ompi-110-md                          vasp/535-i-174-impi-044(default)
espresso/540-i-174-impi-044(default)                   gromacs/514-g-485-ompi-110-ms                          vasp/535-i-174-impi-044-nc
espresso/600-g-485-ompi-110                            gromacs/5.1.4-i-14.0.3.174-impi-5.0.2.044-md           vasp/535-i-174-impi-044-vtst
espresso/6.0.0-g-4.8.5-ompi-1.10.0                     gromacs/5.1.4-i-14.0.3.174-impi-5.0.2.044-ms           vasp/5.4.4-i-14.0.3.174-impi-5.0.2.044
espresso/6.0.0-i-14.0.3.174-impi-5.0.2.044             gromacs/514-i-174-impi-044-md                          vasp/5.4.4-i-14.0.3.174-impi-5.0.2.044-gamma
espresso/600-i-174-impi-044                            gromacs/514-i-174-impi-044-ms                          vasp/5.4.4-i-14.0.3.174-impi-5.0.2.044-gpu
espresso/63-g-485-ompi-110                             lammps/1116-g-485-ompi-110                             vasp/5.4.4-i-14.0.3.174-impi-5.0.2.044-nc
espresso/6.3-g-4.8.5-ompi-1.10.0                       lammps/1116-i-174-impi-044                             vasp/5.4.4-i-14.0.3.174-impi-5.0.2.044-vtst
espresso/6.3-i-14.0.3.174-impi-5.0.2.044               lammps/1218-i-174-impi-044                             vasp/5.4.4-i-14.0.3.174-impi-5.0.2.044-vtst-gamma
espresso/63-i-174-impi-044                             lammps/12Dec2018-i-14.0.3.174-impi-5.0.2.044           vasp/5.4.4-i-14.0.3.174-impi-5.0.2.044-vtst-nc
espresso/6.4.1-g-11.2.0-ompi-4.1.1                     lammps/2022.01.07-g-11.2.0-ompi-4.1.1-cuda-11.5        vasp/544-i-174-impi-044
espresso/641-g-1120-ompi-411                           lammps/5Nov16-g-4.8.5-ompi-1.10.0                      vasp/544-i-174-impi-044-gamma
espresso/6.5.0-g-11.2.0-ompi-4.1.1                     lammps/5Nov16-i-14.0.3.174-impi-5.0.2.044              vasp/544-i-174-impi-044-gpu
espresso/650-g-1120-ompi-411                           lammps/7Jan2022-g-1120-ompi-411-cuda-115               vasp/544-i-174-impi-044-nc
espresso/6.6.0-g-11.2.0-ompi-4.1.1                     nwchem/6.6-i-14.0.3.174-impi-5.0.2.044                 vasp/544-i-174-impi-044-vtst
espresso/660-g-1120-ompi-411                           nwchem/66-i-174-impi-044                               vasp/544-i-174-impi-044-vtst-gamma
espresso/6.7.0-g-11.2.0-ompi-4.1.1                     nwchem/702-g-485-ompi-110                              vasp/544-i-174-impi-044-vtst-nc
espresso/670-g-1120-ompi-411                           nwchem/7.0.2-g-4.8.5-ompi-1.10.0                       vesta/3.3.8
espresso/6.8.0-g-11.2.0-ompi-4.1.1                     nwchem/7.0.2-i-14.0.3.174-impi-5.0.2.044               vmd/1.9.3
espresso/680-g-1120-ompi-411                           nwchem/702-i-174-impi-044                              vnl-atk/2016.2
gromacs/2018.2-i-14.0.3.174-impi-5.0.2.044-gms         p4vasp/0.3.30                                          wien2k/17.1-i-14.0.3.174-impi-5.0.2.044
gromacs/20182-i-174-impi-044-gms                       sisso/sisso-1.0-g-11.2.0-ompi-4.1.1-openblas-0.3.18    wien2k/171-i-174-impi-044(default)
gromacs/2018.3-i-14.0.3.174-impi-5.0.2.044-gms         turbomole/v7.0                                         xcrysden/1.5.60
gromacs/20183-i-174-impi-044-gms                       vasp/535-g-485-ompi-110

--------------------------------------------------------------------------- /export/compute/modulefiles/compilers ---------------------------------------------------------------------------
gcc/11.2.0(default)  gcc/5.4.0            intel/14.0.3.174     intel/i-174(default)

--------------------------------------------------------------------------- /export/compute/modulefiles/libraries ---------------------------------------------------------------------------
cuda/11.5(default)       mkl/i-11.1.3.174         mpi/impi-044(default)    mpi/ompi-110             mpi/ompi-4.1.1           openblas/0.3.18-g-11.2.0
cuda/9.2                 mkl/i-174(default)       mpi/impi-5.0.2.044       mpi/ompi-1.10            openblas/0.2.18-g-5.4.0  openblas/218-g-540

--------------------------------------------------------------------------- /export/compute/modulefiles/languages ---------------------------------------------------------------------------
python/2.7.5           python/3.6.12          python/3.7.9           python/3.8.6(default)  python/3.9.1           python/anaconda3-5.2.0
```

Through the `module avail` command, the user can also **search** for available modules, by partially inserting the module's name. This functionality is demonstrated in the example below.

```bash
[steve@login.mat3ra.com:~]$ module avail espresso
------------------------------------------------------------------------- /export/compute/modulefiles/applications --------------------------------------------------------------------------
espresso/521-g-485-ompi-110                espresso/540-i-174-impi-044(default)       espresso/6.3-i-14.0.3.174-impi-5.0.2.044   espresso/660-g-1120-ompi-411
espresso/5.2.1-g-4.8.5-ompi-1.10.0         espresso/600-g-485-ompi-110                espresso/63-i-174-impi-044                 espresso/6.7.0-g-11.2.0-ompi-4.1.1
espresso/5.2.1-i-14.0.3.174-impi-5.0.2.044 espresso/6.0.0-g-4.8.5-ompi-1.10.0         espresso/6.4.1-g-11.2.0-ompi-4.1.1         espresso/670-g-1120-ompi-411
espresso/521-i-174-impi-044                espresso/6.0.0-i-14.0.3.174-impi-5.0.2.044 espresso/641-g-1120-ompi-411               espresso/6.8.0-g-11.2.0-ompi-4.1.1
espresso/540-g-485-ompi-110                espresso/600-i-174-impi-044                espresso/6.5.0-g-11.2.0-ompi-4.1.1         espresso/680-g-1120-ompi-411
espresso/5.4.0-g-4.8.5-ompi-1.10.0         espresso/63-g-485-ompi-110                 espresso/650-g-1120-ompi-411
espresso/5.4.0-i-14.0.3.174-impi-5.0.2.044 espresso/6.3-g-4.8.5-ompi-1.10.0           espresso/6.6.0-g-11.2.0-ompi-4.1.1
```

## Actions

See the [module actions documentation](actions/modules-actions.md) for more information on listing, loading, and resetting software modules.


## Links

[^1]: [Wikipedia Environment Modules, Website](https://en.wikipedia.org/wiki/Environment_Modules_(software))
[^2]: [Transition state tools for VASP, Henkelman Group at the University of Texas, Website](https://theory.cm.utexas.edu/vtsttools/)
