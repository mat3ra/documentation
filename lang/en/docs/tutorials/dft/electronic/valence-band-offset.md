# Calculate Valence Band Offset

This tutorial page explains how to calculate the [valence band offset]({{ reference_url }}/properties-directory/scalar/valence-band-offset/) (VBO)
based on the potential lineup method[^1][^2][^3] using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/).
For this tutorial, we consider a 2D material interface MoS<sub>2</sub>/WS<sub>2</sub> and use
[Quantum Espresso]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as our main simulation engine.
The content of this tutorial was also part of our 2021 webinar *2D Materials and their Electronic Properties*[^4]

!!!note "Simulation engines considered in this tutorial"
    The workflow presented in this tutorial is currently only available for
    [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

## Definitions

### Valence Band Offset

The [valence band offset]({{ reference_url }}/properties-directory/scalar/valence-band-offset/) is defined by the relative position
of the valence band on both sides of the interface. This property is relevant to study the charge transport across
interfaces such as semiconductor heterojunctions. Other properties related to the band profile at the interface are
the *conduction band offset* and *Schottky barrier* (metal-semiconductor interface).

### Potential Lineup Method
This tutorial employs the potential lineup method in order to determine the valence band offset, which requires the
calculation of the macroscopically averaged electrostatic potential and valence band maximum of the two materials.
The valence band offset for an A/B interface can then be determined via:

$$
\Delta E_{\mathrm{VBO}} = \Delta E_{v} + \Delta \overline{V}
$$

The first term, $\Delta E_{v}$, is usually referred to as the *band structure term* and defined as the difference
of the two valence band maxima $\varepsilon_{v}$ referenced to the macroscopically averaged electrostatic potential $\overline{V}$
in each material:

$$
\Delta E_{v} = (\varepsilon_{v}^{A} - \overline{V}^{A}) - (\varepsilon_{v}^{B} - \overline{V}^{B})
$$

![Referencing the valence band edge](../../../images/tutorials/valence-band-maximum-with-reference.png){: style="width:600px"}
The second term, $\Delta \overline{V}$, is determined from the lineup of the macroscopically averaged electrostatic potential in
the interface heterostructure.
![Lineup of the macroscopically averaged electrostatic potential](../../../images//tutorials/macroscopically-averaged-potential-lineup.png){: style="width:600px"}


## Choose Materials

When creating the job, the user needs to select **three materials** corresponding to the MoS<sub>2</sub>/WS<sub>2</sub> interface
and the isolated monolayers of both MoS<sub>2</sub> and WS<sub>2</sub>. Each of the structures is expected to be relaxed.
The initial interface structure was taken from [materialsproject](https://materialsproject.org/materials/mp-1023954) and
optimized via a variable-cell relaxation of the x- and y-components. The monolayer structures were extracted from the interface
and optimized in the same way. The final structures are available on the Mat3ra platform:

  - [MoS2/WS2 heterostructure](https://platform.mat3ra.com/exabyte-io/materials/cxgeoQwPJQJbgA2aD)
  - [WS<sub>2</sub> monolayer](https://platform.mat3ra.com/exabyte-io/materials/5JcsfbBPKFWjxGXkX)
  - [MoS<sub>2</sub> monolayer](https://platform.mat3ra.com/exabyte-io/materials/Cyr7Y6sefZsmZo6bH)

!!!note "Order of Materials"
    The VBO workflow assumes the interface structure to correspond to the first material, i.e. please be sure to load the interface
    structure first.

## Choose Workflow

The [workflow]({{ reference_url }}/workflows/overview/) for calculating the valence band offset can be
[imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned
[collection]({{ reference_url }}/accounts/collections/).
This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the
[Job being created]({{ interface_url }}/jobs-designer/workflow-tab/).
A [representation of this workflow](https://github.com/Exabyte-io/wode.js/blob/2022.11.16-0/assets/workflows/espresso/valence_band_offset.yml)
is also available as part of the Mat3ra workflow definitions repository ([wode.js](https://github.com/Exabyte-io/wode.js)).

[![Valence Band Offset Workflow](../../../images/tutorials/valence-band-offset-workflow.png)](../../../images/tutorials/valence-band-offset-workflow.png)

The workflow contains two subworkflows per material calculating the valence band maximum (via band structure),
macroscopically averaged electrostatic potential, and its minima.
As the system in this tutorial is a heterostructure built of monolayers, determining the value of the macroscopically
averaged electrostatic potential in the region of the monolayer corresponds to finding the minima of $\overline{V}$.
For multilayered heterostructures the problem becomes equivalent of finding plateaus of $\overline{V}$.
The final subworkflow collects all the intermediate results and determines the value of the valence band offset.

### Workflow Settings

For the purpose of this tutorial, we set the size of the grid of k-points to 6 x 6 x 1 for each of the three PW-SCF units
and adjust the k-path to reflect the reduced dimensionality (Γ-M-K-Γ). In addition, one should also adjust the size of the window
for macroscopic averaging. For the present system we set this size to the distance between the sulfur atoms in both
monolayers (ca. 5.7 bohr).

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the
["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and inspect
the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) included therein.

## Examine results

When all [unit]({{ reference_url }}/workflows/components/units/) computations are complete at the end of Job execution, switching
to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the results
of the simulation, including the valence band offset as well as the plots of the planar and macroscopic average of
the electrostatic potentials.

### Comparison with Experimental Value

The calculated value of ~0.27 eV for the valence band offset is below the experimental[^5] value of 0.55 eV,
but agrees with previous theoretical results[^6] of 0.32 eV and 0.22 eV, respectively.

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of a Valence Band Offset workflow in the following animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/wHWEwDcARog" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: A. Baldereschi, S. Baroni, R. Resta, *Phys. Rev. Lett.* **61**, 734 (1988); DOI: [10.1103/PhysRevLett.61.734](https://www.doi.org/10.1103/PhysRevLett.61.734)
[^2]: L. Colombo, R. Resta, S. Baroni, *Phys. Rev. B* **44**, 5572 (1991); DOI: [10.1103/physrevb.44.5572](https://www.doi.org/10.1103/physrevb.44.5572)
[^3]: M. Peressi, N. Binggeli, A. Baldereschi, *J. Phys. D: Appl. Phys.* **31**, 1273-1299 (1998); DOI: [10.1088/0022-3727/31/11/002](https://www.doi.org/10.1088/0022-3727/31/11/002)
[^4]: [2D Materials and their Electronic Properties (Mat3ra YouTube)](https://youtu.be/5T9JMoj62P4)
[^5]: C. Lu, *et. al*, *Phys. Status Solidi A*, 1900544 (2009); DOI: [10.1002/pssa.201900544](https://www.doi.org/10.1002/pssa.201900544)
[^6]: E. Torun, H.P.C. Miranda, A. Molina-Sánchez, L. Wirtz, *Phys. Rev. B* **97**, 245427 (2018); DOI: [10.1103/PhysRevB.97.245427](https://www.doi.org/10.1103/PhysRevB.97.245427)

