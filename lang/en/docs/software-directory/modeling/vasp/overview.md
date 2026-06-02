# Vienna Ab initio Simulation Package

The Vienna Ab initio Simulation Package, better known as VASP, is a package for performing ab-initio electronic structure calculations and molecular dynamics, using either Vanderbilt ultra-soft pseudopotentials or the projector-augmented wave (PAW) method, together with a plane wave basis set. 

The underlying [theoretical model]({{ reference_url }}/models/overview/) is [Density Functional Theory (DFT)]({{ reference_url }}/models-directory/dft/overview/), but the code also allows for the use of post-DFT corrections, such as hybrid functionals mixing DFT and Hartree–Fock exchange, many-body perturbation theory (the GW method), and dynamical electronic correlations within the Random Phase Approximation (RPA).

Complete information and documentation about the VASP code can be found in its corresponding website [^1], [^2], [^3].

!!!warning "License Requirements"
    VASP is a proprietary software, and as such it requires a license in order to be operated. All users who would like to use this code are advised to send us a [support request]({{ interface_url }}/ui/support/) so that we can check their existing licenses. Contact us about an on-demand license option for interested parties.

## Supported Versions

We provide support and implementations for both the 5.3.5 and 5.4.4 versions of VASP.

!!! note "Default Pseudopotentials"
    As mentioned in the [dedicated section]({{ reference_url }}/methods-directory/pseudopotential/default/), the list of default pseudopotentials follows the versions of the VASP software itself (versions 5.2 and 5.4).
    
## [Components](components.md)

We introduce the different [components]({{ reference_url }}/software/components/) which are part of the VASP software distribution [in this page](components.md).

## [Compute Parameters](compute-parameters.md)

We explain the specific aspects of [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) [here](compute-parameters.md).

## [Data]({{ data_url }}/software-directory/modeling/vasp/data/)

The [structured representation]({{ data_url }}/data-structured/overview/) for VASP is explained [in this page]({{ data_url }}/software-directory/modeling/vasp/data/).

## Links

[^1]: [Official VASP website](https://www.vasp.at/)
[^2]: [Official VASP Documentation Manual, pdf copy](http://cms.mpi.univie.ac.at/vasp/vasp.pdf)
[^3]: [Official VASP Documentation Manual, online version](http://cms.mpi.univie.ac.at/vasp/vasp/vasp.html)
