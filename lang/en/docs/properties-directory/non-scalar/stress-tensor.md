---
render_macros: true
---
# Stress Tensor

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Mechanical</span>

The stress tensor ${ oldsymbol {\sigma }}$ [^1] is a [Physical](../../properties/classification/general.md) property. It is a second-rank **tensor**, representable as a **Matrix**, which consists of nine components $\sigma _{ij}$ that completely define the state of stress at a point inside a deformed material. 

{% raw %}
$$
{ oldsymbol  {\sigma }}=\left[{{ egin{matrix}\sigma _{{xx}}&\sigma _{{xy}}&\sigma _{{xz}}\\sigma _{{yx}}&\sigma _{{yy}}&\sigma _{{yz}}\\sigma _{{zx}}&\sigma _{{zy}}&\sigma _{{zz}}\ nd{matrix}}}ight]
$$
{% endraw %}

The image below offers an explanation of the directions in which each shear and normal stress component expressed above acts upon, relative to a Cartesian coordinate system.

![Stress Tensor](../../images/properties-directory//Components_of_Stress_Tensor.png "Stress Tensor")

## Example

Under the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ guide_url }}/jobs/ui/viewer/), the components of the stress tensor are presented as follows, expressed in units of kilobars (kbar).

![Stress Tensor](../../images/properties-directory//stress-tensor.png "Stress Tensor")

## Schema 

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#stress-tensor).

## Links

[^1]: [Wikipedia Cauchy stress tensor, Website](https://en.wikipedia.org/wiki/Cauchy_stress_tensor)
