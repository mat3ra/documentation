# Band Gap

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Electronic</span>

The Bang Gap measures the finite energy difference between the highest occupied and lowest unoccupied energy levels in, respectively, the valence and conduction bands of a semiconducting or insulating material [^1]. 

## Direct and Indirect Band Gaps

Two types of band gap are possible: **direct** and **indirect** [^2]. The latter is always computed on our platform, and is equivalent to the former for the direct gap semiconductors.

When the gap is direct, the minimum change in energy between occupied and unoccupied states occurs at the same [k-point in reciprocal space](../../models/auxiliary-concepts/reciprocal-space.md), whereas for the case of indirect band-gaps this change is instead located at different k-points. 

The indirect band gap can be smaller than the direct one in some cases.
 
## Example

Both types of band gaps are returned under the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) as portrayed in the following image, immediately below the main [bandstructure dispersion](bandstructure.md) plot. 

In case the material is of indirect-gap nature, the pair of k-vectors linking the corresponding minimal energy difference is indicated. Otherwise, for direct-gap semiconductors, the two types of gap are presented as being equivalent and being both located across the Gamma point.

![Band Gap Energy](../../images/properties-directory//bang-gap-energy.png "Band Gap Energy")

## Schema

The JSON schema and an example representation for this property can be found [here](../../properties/data/list.md#band-gaps).

## Links

[^1]: [Wikipedia Bang Gap, Website](https://en.wikipedia.org/wiki/Band_gap)

[^2]: [Wikipedia Direct and indirect band gaps, Website](https://en.wikipedia.org/wiki/Direct_and_indirect_band_gaps)
