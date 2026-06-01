# Electronic Density of States

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Electronic</span>

The Density of States of the material describes the number of states per an interval of energy at each energy level available to be occupied [^1].

## Example

Example results for the computed electronic Density of States are also presented graphically in the [Results Tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).

The typical appearance of such a Density of States plot for electronic bandstructures is shown below.

![Electronic DoS](../../images/properties-directory//electronic-dos.png "Electronic DoS")

### Notation

In this graph, the total density of states is marked by the black line. Individual contributions are labelled with different colors, as explained in the legend below the graph. The [Fermi level](../scalar/total-energy.md#fermi-energy) is set by the vertical red dashed line.

### Export as Image

The possibility to export the graph is offered as mentioned [here]({{ interface_url }}/properties/ui/viewer/#export-as-images).

## Schema 

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#density-of-states).

## Links

[^1]: [Wikipedia Density of States, Website](https://en.wikipedia.org/wiki/Density_of_states)
