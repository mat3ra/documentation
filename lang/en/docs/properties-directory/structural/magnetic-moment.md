# Magnetic Moment

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Structural</span>

The calculation of Magnetic Moments is especially relevant in the context of **Ferromagnetic Materials** [^1], such as iron, nickel, cobalt and most of their alloys. These represent any [material](../../materials/overview.md) that exhibits **spontaneous magnetization**, in the form of the presence of a **net magnetic moment** within the material in the absence of an external magnetic field.

The Magnetic Moment is a **[Vector and Physical](../../properties/classification/general.md) property** of the [Material](../../materials/overview.md) under consideration.

## Example

The magnetic moment can be computed by inserting the corresponding [Workflow Modifier]({{ guide_url }}/workflow-designer/subworkflow-editor/overview-tab/).

It is returned to the user as a set of vectors (one for each atom present in the material), as portrayed below, under the interface of the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ guide_url }}/jobs/ui/viewer/). Its final value is expressed in units of bohr magnetons.

![Magnetic Moment](../../images/properties-directory//magnetic-moment.png "Magnetic Moment")

## Schema 

The JSON schema and an example representation for this property can be found [here](../../properties/data/list.md#magnetic-moments).

## Links 

[^1]: [Wikipedia Ferromagnetism, Website](https://en.wikipedia.org/wiki/Ferromagnetism)
