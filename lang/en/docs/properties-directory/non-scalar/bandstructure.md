# Electronic Bandstructure

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Electronic</span>

The electronic bandstructure of a material describes the range of energies that an electron may have within a crystal (called energy bands) [^1].

## Example

Electronic bandstructure calculations can be performed with an appropriate [Workflow](../../workflows/overview.md). The results are portrayed in the [Results Tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) in the form of a **dispersion curve**, as illustrated in the graphic below. The visual contains the bandstructure calculated on the path "Г-X-W-K-Г-L-U-W-L-U-X" with indirect band gap realized between k-points at [0.0,0.0,0.0] and [0.4,0.0,0.4] with the value of 0.601. Similarly, the direct gap of 2.422 is found at the gamma point.

![Bandstructure](../../images/properties-directory//bandstructure.png "Bandstructure")

### Path in the reciprocal space

This dispersion plot covers the [desired path]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) in the reciprocal space of the Brillouin Zone, with its corresponding Greek letter labels indicating special symmetry points. The energy along the vertical axis is scaled relative to the [Fermi energy](../scalar/fermi-energy.md) of the material (red dashed line), marking the highest occupied energy level.

### Export as Image

The possibility to export the graph is offered as mentioned [here]({{ interface_url }}/properties/ui/viewer/#export-as-images).

## Energy Eigenvalues

The list of energy eigenvalue solutions, corresponding to each k-point in the reciprocal path under investigation, can be inspected by expanding the "Eigenvalues" section, using the three-dotted button at the bottom of the panel. Information about the weight, net electron spin, and electron occupation numbers for each solution is also included here.

## Schema

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#bandstructure).

## Links

[^1]: [Wikipedia Electronic band structure, Website](https://en.wikipedia.org/wiki/Electronic_band_structure)
