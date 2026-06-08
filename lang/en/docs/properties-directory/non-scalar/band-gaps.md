# Band Gap

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Electronic</span>

The Band Gap measures the finite energy difference between the highest occupied and lowest unoccupied energy levels in the valence and conduction bands, respectively, of a semiconducting or insulating material [^1]. It is one of the most fundamental electronic properties, governing optical absorption, electrical conductivity, and thermoelectric performance.


## Direct and Indirect Band Gaps

Two types of band gap are possible: **direct** and **indirect** [^2]. The platform computes both types whenever possible.

When the gap is direct, the minimum energy difference between occupied and unoccupied states occurs at the same [k-point in reciprocal space](../../models/auxiliary-concepts/reciprocal-space.md). For indirect band gaps, this minimum energy difference involves states at different k-points, and the transition requires a change in crystal momentum (typically assisted by a phonon).

The indirect band gap can be smaller than the direct gap. Classic examples include silicon (indirect gap ~1.1 eV, direct gap ~3.4 eV) and germanium.


## Methods for Computing the Band Gap

The band gap can be obtained from several levels of theory, each with different accuracy-cost tradeoffs:

| Method | Typical Accuracy | Tutorial |
|--------|-----------------|----------|
| GGA-DFT (PBE) | Underestimates by 30–50% | [Band gap tutorial]({{ guide_url }}/tutorials/dft/electronic/band-gap/) |
| HSE hybrid functional | Within ~0.2 eV of experiment | [HSE (VASP)]({{ guide_url }}/tutorials/dft/electronic/hse-vasp-bg/), [HSE (QE)]({{ guide_url }}/tutorials/dft/electronic/hse-qe-bg/) |
| GW approximation | Typically within ~0.1 eV | [GW (VASP)]({{ guide_url }}/tutorials/dft/electronic/gw-vasp-bg/) |
| ML force fields | Depends on training data | [MatterSim]({{ guide_url }}/tutorials/ml/run-mlff-python-workflows-mattersim/) |

!!!warning "GGA band gap underestimation"
    Standard DFT with the Generalized Gradient Approximation systematically underestimates band gaps due to the self-interaction error and missing derivative discontinuity in the exchange-correlation functional. For quantitative band gap predictions, hybrid functionals (HSE) or the GW approximation are recommended.


## Example

Both types of band gaps are returned under the [Results Tab]({{ interface_url }}/jobs/ui/results-tab/), immediately below the main [band structure dispersion](bandstructure.md) plot.

For indirect-gap materials, the pair of k-vectors linking the corresponding minimal energy difference is indicated. For direct-gap semiconductors, the two gap types are presented as equivalent and both located at the Gamma point.

![Band Gap Energy](../../images/properties-directory/band-gap-energy.png "Band Gap Energy")


## Schema

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#band-gaps).


## Links

[^1]: [Wikipedia Band Gap](https://en.wikipedia.org/wiki/Band_gap)

[^2]: [Wikipedia Direct and indirect band gaps](https://en.wikipedia.org/wiki/Direct_and_indirect_band_gaps)
