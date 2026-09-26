# Calculate Valence Band Offset

This tutorial explains how to calculate the [valence band offset]({{ reference_url }}/properties-directory/scalar/valence-band-offset/) (VBO)
based on the potential lineup method [^1] [^2] [^3] using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT).
The example system is a 2D material interface MoS<sub>2</sub>/WS<sub>2</sub>, and [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) is used as the simulation engine.
The content of this tutorial was also presented in the 2021 webinar *2D Materials and their Electronic Properties* [^4].

!!!note "Simulation engine"
    The VBO workflow is currently only available for [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).


## 1. Understand the method

### 1.1. Valence band offset

The [valence band offset]({{ reference_url }}/properties-directory/scalar/valence-band-offset/) is defined by the relative position of the valence band on both sides of an interface. This property is relevant for studying charge transport across interfaces such as semiconductor heterojunctions. Related properties include the *conduction band offset* and the *Schottky barrier* (metal-semiconductor interface).

### 1.2. Potential lineup method

This tutorial employs the potential lineup method to determine the VBO, which requires the macroscopically averaged electrostatic potential and valence band maximum of the two materials. The VBO for an A/B interface is:

$$
\Delta E_{\mathrm{VBO}} = \Delta E_{v} + \Delta \overline{V}
$$

The first term, $\Delta E_{v}$, is the *band structure term* — the difference of the two valence band maxima $\varepsilon_{v}$ referenced to the macroscopically averaged electrostatic potential $\overline{V}$ in each material:

$$
\Delta E_{v} = (\varepsilon_{v}^{A} - \overline{V}^{A}) - (\varepsilon_{v}^{B} - \overline{V}^{B})
$$

![Referencing the valence band edge](../../../images/tutorials/valence-band-maximum-with-reference.png "Referencing the valence band edge"){: style="width:600px"}

The second term, $\Delta \overline{V}$, is determined from the lineup of the macroscopically averaged electrostatic potential in the interface heterostructure.

![Lineup of the macroscopically averaged electrostatic potential](../../../images/tutorials/macroscopically-averaged-potential-lineup.png "Lineup of the macroscopically averaged electrostatic potential"){: style="width:600px"}


## 2. Select the materials

Three materials are required, corresponding to the MoS<sub>2</sub>/WS<sub>2</sub> interface and the isolated monolayers of both MoS<sub>2</sub> and WS<sub>2</sub>. Each structure should be relaxed beforehand.

The initial interface structure was taken from [materialsproject.org](https://materialsproject.org/materials/mp-1023954) and optimized via variable-cell relaxation of the x- and y-components. The monolayer structures were extracted from the interface and optimized in the same way. The final structures are available on the Mat3ra platform:

- [MoS2/WS2 heterostructure](https://platform.mat3ra.com/mat3ra/materials/cxgeoQwPJQJbgA2aD)
- [WS<sub>2</sub> monolayer](https://platform.mat3ra.com/mat3ra/materials/5JcsfbBPKFWjxGXkX)
- [MoS<sub>2</sub> monolayer](https://platform.mat3ra.com/mat3ra/materials/Cyr7Y6sefZsmZo6bH)

!!!warning "Material order"
    The VBO workflow assumes the interface structure corresponds to the first material. The interface structure must be loaded first.


## 3. Select the workflow

The [workflow]({{ reference_url }}/workflows/overview/) for calculating the VBO can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).

A [representation of this workflow](https://github.com/mat3ra/wode.js/blob/2022.11.16-0/assets/workflows/espresso/valence_band_offset.yml) is also available in the Mat3ra workflow definitions repository ([wode.js](https://github.com/mat3ra/wode.js)).

[![Valence Band Offset Workflow](../../../images/tutorials/valence-band-offset-workflow.png "Valence Band Offset Workflow")](../../../images/tutorials/valence-band-offset-workflow.png)

The workflow contains two subworkflows per material that calculate the valence band maximum (via band structure), the macroscopically averaged electrostatic potential, and its minima. For monolayer heterostructures, determining $\overline{V}$ in the monolayer region corresponds to finding the minima. For multilayered heterostructures, the problem becomes equivalent to finding plateaus of $\overline{V}$. The final subworkflow collects all intermediate results and determines the VBO.


### 3.1. Configure workflow settings

Set the k-point grid to 6 × 6 × 1 for each of the three PW-SCF units and adjust the k-path to reflect the reduced dimensionality (Γ–M–K–Γ). Also adjust the macroscopic averaging window size — for this system, set it to the distance between the sulfur atoms in both monolayers (~5.7 bohr).


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) should be reviewed to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/).


## 5. Examine the results

Once all [unit]({{ reference_url }}/workflows/components/units/) computations complete, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the VBO as well as the plots of the planar and macroscopic average of the electrostatic potentials.

### 5.1. Compare with experiment

The calculated value of ~0.27 eV is below the experimental value of 0.55 eV [^5], but agrees with previous theoretical results of 0.32 eV and 0.22 eV [^6].


## 6. Video walkthrough

The animation below demonstrates the steps involved in creating and executing a VBO workflow.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/wHWEwDcARog" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 7. Links

[^1]: A. Baldereschi, S. Baroni, R. Resta, *Phys. Rev. Lett.* **61**, 734 (1988); DOI: [10.1103/PhysRevLett.61.734](https://www.doi.org/10.1103/PhysRevLett.61.734)
[^2]: L. Colombo, R. Resta, S. Baroni, *Phys. Rev. B* **44**, 5572 (1991); DOI: [10.1103/physrevb.44.5572](https://www.doi.org/10.1103/physrevb.44.5572)
[^3]: M. Peressi, N. Binggeli, A. Baldereschi, *J. Phys. D: Appl. Phys.* **31**, 1273-1299 (1998); DOI: [10.1088/0022-3727/31/11/002](https://www.doi.org/10.1088/0022-3727/31/11/002)
[^4]: [2D Materials and their Electronic Properties (Mat3ra YouTube)](https://youtu.be/5T9JMoj62P4)
[^5]: C. Lu, *et al.*, *Phys. Status Solidi A*, 1900544 (2009); DOI: [10.1002/pssa.201900544](https://www.doi.org/10.1002/pssa.201900544)
[^6]: E. Torun, H.P.C. Miranda, A. Molina-Sánchez, L. Wirtz, *Phys. Rev. B* **97**, 245427 (2018); DOI: [10.1103/PhysRevB.97.245427](https://www.doi.org/10.1103/PhysRevB.97.245427)
