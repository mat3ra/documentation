# Density Functional Theory Model

**Density Functional Theory (DFT)** is a quantum mechanical modeling method used to investigate the electronic structure of many-body systems, primarily atoms, molecules, and condensed matter. DFT reformulates the many-electron Schrödinger equation in terms of the electron density rather than the many-body wave function, reducing the problem from 3N to 3 spatial variables [^1].

## Theoretical Foundations

The method rests on two theorems by Hohenberg and Kohn [^2]:

1. The ground-state energy of a many-electron system is a unique functional of the electron density.
2. The electron density that minimizes the energy functional is the exact ground-state density.

In practice, the Kohn–Sham formulation [^3] maps the interacting many-electron system onto a set of non-interacting single-particle equations with an effective potential, making the problem computationally tractable.

### Exchange-Correlation Functionals

The exchange-correlation (XC) functional captures the quantum mechanical effects of electron exchange and correlation. Common approximations include:

- **Local Density Approximation (LDA)** — depends only on the local electron density; tends to overbind.
- **Generalized Gradient Approximation (GGA)** — includes density gradients; the PBE functional [^4] is the most widely used. GGA is the default on the Mat3ra platform.
- **Hybrid Functionals** — mix a fraction of exact (Hartree–Fock) exchange with GGA; HSE06 [^5] is supported for more accurate band gaps. See the [HSE tutorials]({{ guide_url }}/tutorials/dft/electronic/hse-vasp-bg/).
- **GW Approximation** — a many-body perturbation theory approach for quasiparticle energies; supported through [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) and [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/). See the [GW tutorial]({{ guide_url }}/tutorials/dft/electronic/gw-vasp-bg/).

!!!info "Known limitation: band gap underestimation"
    Standard GGA-DFT systematically underestimates electronic band gaps due to the self-interaction error and the derivative discontinuity of the XC functional. Hybrid functionals and the GW approximation provide improved accuracy at higher computational cost.


## [Parameters](parameters.md)

The list of parameters affecting DFT calculations is presented [in this page](parameters.md), including the choice of XC functional, plane-wave cutoff energy, and k-point sampling.

## [Accuracy](accuracy.md)

Factors limiting the [accuracy](../../models/accuracy.md) of DFT are discussed [here](accuracy.md), covering basis-set convergence, pseudopotential quality, and XC functional limitations.

## [References](references.md)

A comprehensive list of references reviewing the theoretical background underlying DFT is outlined [in this page](references.md).

## [Structured Representation]({{ data_url }}/models-directory/dft/data/)

[This page]({{ data_url }}/models-directory/dft/data/) contains an example [structured representation]({{ data_url }}/data-structured/overview/) for the DFT model.

## [Special Notes](notes.md)

Special precautions that need to be taken when considering the different [parameters](parameters.md) of DFT are collected [in this page](notes.md).


## Links

[^1]: [Wikipedia Density Functional Theory](https://en.wikipedia.org/wiki/Density_functional_theory)
[^2]: P. Hohenberg and W. Kohn, "Inhomogeneous Electron Gas," Phys. Rev. 136, B864 (1964). [DOI](https://doi.org/10.1103/PhysRev.136.B864)
[^3]: W. Kohn and L. J. Sham, "Self-Consistent Equations Including Exchange and Correlation Effects," Phys. Rev. 140, A1133 (1965). [DOI](https://doi.org/10.1103/PhysRev.140.A1133)
[^4]: J. P. Perdew, K. Burke, and M. Ernzerhof, "Generalized Gradient Approximation Made Simple," Phys. Rev. Lett. 77, 3865 (1996). [DOI](https://doi.org/10.1103/PhysRevLett.77.3865)
[^5]: J. Heyd, G. E. Scuseria, and M. Ernzerhof, "Hybrid functionals based on a screened Coulomb potential," J. Chem. Phys. 118, 8207 (2003). [DOI](https://doi.org/10.1063/1.1564060)
