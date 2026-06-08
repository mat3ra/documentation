# Calculate Electronic Band Structure with GW Approximation and Plasmon-Pole Approach

This tutorial explains how to calculate the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) of a hexagonal boron nitride (BN) monolayer [^1] using the [GW Approximation]({{ reference_url }}/models-directory/dft/notes/#the-gw-approximation) with the **Godby–Needs plasmon-pole model** and [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO version 6.3 and later.

The plasmon-pole approach [^2] samples only at zero frequency and uses the Godby–Needs model along the imaginary axis. The method is enabled via the [SternheimerGW](gw-qe-bs-fullfreq.md#1-understand-the-sternheimergw-code) code. The [full-frequency integration tutorial](gw-qe-bs-fullfreq.md) provides a more complete introduction to GW workflows. Only plasmon-pole-specific aspects are covered below.


## 1. Understand the plasmon-pole workflow

<details markdown="1">
  <summary>Expand to view detailed input parameters</summary>

The plasmon-pole-specific components of the SternheimerGW input file include:

**Truncation:** For isotropic systems, a spherical truncation is used by default. For films and other anisotropic systems (such as the BN monolayer), "2d" truncation is recommended. The Wigner-Seitz (ws) truncation is more general but computationally expensive for larger systems.

**Linear solver configuration:** The `thres_coul` and `thres_green` values control solver accuracy. The `max_iter_coul` and `max_iter_green` values set iteration limits — if exceeded, a different solver is tried automatically.

**Plasmon-pole frequencies:** When using the Godby–Needs model, exactly two frequencies must be specified:

$$
\omega_1 = 0 \qquad \omega_2 = \text{i} \omega_\text{p}
$$

These are used to construct an approximation of the screened Coulomb interaction.

</details>


## 2. Create and submit the job

Follow the instructions in the [full-frequency GW tutorial](gw-qe-bs-fullfreq.md#3-create-the-job) for creating and executing the GW workflow job and inspecting results.

For this 2D material, the z-dimension of the k-grids and q-grid is set to 1. The recommended settings are: plane-wave cutoff of 80 Ry, k-grid of 8 × 8 × 1, and q-grid of 4 × 4 × 1.


## 3. Examine the results

The indirect band gap of the BN monolayer is ~6.460 eV, between the Γ and M Brillouin Zone special points. This result is in good agreement with other first-principles calculations [^3].


## 4. Video walkthrough

The animation below demonstrates the creation and execution of a GW band structure computation on a BN monolayer using Quantum ESPRESSO with the plasmon-pole model.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/nNtnbQNA4mc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 5. Links

[^1]: [Wikipedia Boron nitride nanosheet](https://en.wikipedia.org/wiki/Boron_nitride_nanosheet)
[^2]: [J. Lischner, S. Sharifzadeh, J. Deslippe, J.B. Neaton, and S.G. Louie: "Effects of self-consistency and plasmon-pole models on GW calculations for closed-shell molecules"; Phys. Rev. B 90, 115130 (2014)](https://arxiv.org/pdf/1409.2901.pdf)
[^3]: [D. Wickramaratne, L. Weston, and C.G. Van de Walle: "Monolayer to Bulk Properties of Hexagonal Boron Nitride"; J. Phys. Chem. C, 2018, 122 (44), pp 25524–25529](https://pubs.acs.org/doi/abs/10.1021/acs.jpcc.8b09087?journalCode=jpccck&)
