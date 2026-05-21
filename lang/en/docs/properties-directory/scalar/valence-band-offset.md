# Valence Band Offset

<span class="btn badge b-success border-50">Scalar</span> <span class="btn badge b-info border-50">Electronic</span>

The valence band offset (VBO) is the energy difference of the valence band edges $\varepsilon_{v}$ across a heterostructure interface.
Note, that the VBO is not simply given by the difference of valence band maxima of the two materials, but also depends
on the electronic distribution at the interface.
![Band offsets at an A/B heterostructure interface](../../images/properties-directory/band-offset.png){: style="width:420px"}
Regarding conduction band edges $\varepsilon_{c}$ there exists an equivalent property, termed conduction band offset (CBO).

The VBO plays an important role for the transport properties of charge
carriers in heterojunction devices (e.g. hole injection efficiency). Using first principles calculations, the VBO can be
determined through the potential lineup method [^1][^2][^3] or via the local density of states (LDOS) [^3]. For more details
regarding the potential lineup method, see also the [valence band offset tutorial]({{ guide_url }}/tutorials/dft/electronic/valence-band-offset/)

## Example

Its value can be estimated using the valence band offset [workflow](../../workflows/overview.md), and it is returned under the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) interface with the following appearance (in eV).

<div class="clearfix" style="text-align:center">
    <div class="chart"><i class="zmdi zmdi-unfold-less zmdi-hc-3x"></i></div>
    <div class="count">
        <small>Valence Band Offset</small>
        <h2>0.250</h2>
    </div>
</div>


## Schema 

The JSON schema and an example representation for this property can be found [here](../../properties/data/list.md#valence-band-offset).

## Links

[^1]: A. Baldereschi, S. Baroni, R. Resta, *Phys. Rev. Lett.* **61**, 734 (1988); DOI: [10.1103/PhysRevLett.61.734](https://www.doi.org/10.1103/PhysRevLett.61.734)
[^2]: L. Colombo, R. Resta, S. Baroni, *Phys. Rev. B* **44**, 5572 (1991); DOI: [10.1103/physrevb.44.5572](https://www.doi.org/10.1103/physrevb.44.5572)
[^3]: M. Peressi, N. Binggeli, A. Baldereschi, *J. Phys. D: Appl. Phys.* **31**, 1273-1299 (1998); DOI: [10.1088/0022-3727/31/11/002](https://www.doi.org/10.1088/0022-3727/31/11/002)

