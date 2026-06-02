# Calculate Electronic Band Structure with GW Approximation and Plasmon-pole Approach

This page explains how to calculate the [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) and [GW Approximation]({{ reference_url }}/models-directory/dft/notes/#the-gw-approximation). We consider a hexagonal Boron Nitride (BN) monolayer [^1] as our sample material, and use [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at version(s) 6.3.

## Plasmon-pole Approximation

Here we employ of the **Plasmon pole** approach [^2] and only sample at zero frequency. We use a **Godby-Needs plasmon-pole model** along the imaginary axis. The plasmon-pole method is enabled within Quantum ESPRESSO via the [SternheimerGW](gw-qe-bs-fullfreq.md#the-sternheimergw-code) code. The user is referred to this latter link more more instructions on Quantum ESPRESSO-based GW Workflows in our platform. Only plasmon-pole-specific aspects of GW computations shall be explained in this page.

## Workflow Structure

<details markdown="1">
  <summary>Expand to view</summary> 

We shall now review the plasmon-pole-specific components of the input file for the second compute [unit]({{ reference_url }}/workflows/components/units/) (based on SternheimerGW), within the larger [Workflow]({{ reference_url }}/workflows/overview/) based upon the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) modeling engine.

### Truncation

If we do not specify a particular truncation (for both correlation and exchange) used to overcome the divergence of the Coulomb potential for small G vectors, a spherical truncation is employed. This relies on the system being somewhat isotropic. For films or other systems with strong anisotropy, the use of a spherical truncation is no longer appropriate. 

For films, such as the example being presently considered, using a "2d" truncation is recommended. Even more general is the Wigner-Seitz (ws) truncation, limiting the Coulomb interaction to the actual simulation box. Note that the initial setup of the ws truncation is not parallelized, so it might be quite computationally expensive for larger systems.

### Configuration of the Coulomb and Green solver

Using the values `thres_coul` and `thres_green`, the user can tweak the accuracy of the linear solver to optimize it for the system under investigation. `max_iter_coul` and `max_iter_green` allow the user to specify a maximum number of iterations, that the linear solver should try to converge upon. If this maximum is exceeded, the code will try a different linear solver.

### Configuration of W in the convolution

For comparison with other GW codes, SternheimerGW offers the possibility to evaluate the GW correction in the plasmon-pole (PP) model. When using the Godby-Needs PP model, the user must specify exactly the following two frequencies:

$$
\omega_1 = 0 \qquad \omega_2 = \text{i} \omega_\text{p}
​​$$

These two frequencies are then used to construct an approximation for the screened Coulomb interaction.

</details>

## Create and Submit Job

The user should, at this point, follow the instructions included in the [alternative GW tutorial](gw-qe-bs-fullfreq.md#create-job) for explanations on how to create and execute a GW Workflow computational [Job]({{ reference_url }}/jobs/overview/), and on how to retrieve and inspect its corresponding results.

## Animation

We demonstrate the steps involved in the creation and execution of a GW band structure computation on a BN monolayer (in its hexagonal form), using the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) simulation engine in the following animation. 

Here, we set the size along the z dimension of the k-grids and q-grid to 1, since we are considering a 2D material. In summary, we use a plane-wave cutoff of 80 Ry, k-grids size of 8 x 8 x 1 and q-grid size of 4 x 4 x 1.

The final result for the indirect band gap of the BN monolayer of 6.460 eV, between the Gamma and M Brillouin Zone special points, is in good agreement with other first-principles calculations [^3].

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/nNtnbQNA4mc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Wikipedia Boron nitride nanosheet, Website](https://en.wikipedia.org/wiki/Boron_nitride_nanosheet)

[^2]: [J. Lischner, S. Sharifzadeh, J. Deslippe, J.B. Neaton, and S.G. Louie: "Effects of self-consistency and plasmon-pole models on GW calculations for closed-shell molecules"; Phys. Rev. B 90, 115130 (2014)](https://arxiv.org/pdf/1409.2901.pdf)

[^3]: [D. Wickramaratne, L. Weston, and C.G. Van de Walle: "Monolayer to Bulk Properties of Hexagonal Boron Nitride"; J. Phys. Chem. C, 2018, 122 (44), pp 25524–25529](https://pubs.acs.org/doi/abs/10.1021/acs.jpcc.8b09087?journalCode=jpccck&)
