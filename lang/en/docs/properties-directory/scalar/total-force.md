# Total Force

<span class="btn badge b-success border-50">Scalar</span> <span class="btn badge b-info border-50">Mechanical</span>

Similarly to the [average pressure](pressure.md), the **Total Force** is also treated as a [Scalar](../../properties/classification/general.md) property, defined as the norm (or magnitude) of the net vector sum of the individual [atomic forces](../structural/basis.md), summed across all atoms present in the crystal structure under consideration.

## Example

This material property is displayed under the [Results Tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) as follows, in units of eV/Angstroms. It it also routinely computed as part of any total energy self-consistent field (scf) calculation using [DFT](../../models-directory/dft/overview.md).

<div class="clearfix">
    <center>
        <div class="chart"><i class="zmdi zmdi-arrows zmdi-hc-3x"></i></div>
        <div class="count">
        	<small>Total force</small>
            <h2>0.001999</h2>
        </div>
     </center>
</div>

## Schema 

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#total-force).
