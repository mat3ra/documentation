# Fermi Energy

<span class="btn badge b-success border-50">Scalar</span> <span class="btn badge b-info border-50">Electronic</span>

The Fermi Energy marks the highest occupied energy level in the [electronic bandstructure](../non-scalar/bandstructure.md) of a solid [^1]. Similarly to the [total energy](total-energy.md), it is a **[Scalar and Auxiliary](../../properties/classification/general.md) property** of the material.

## Example

Its value can be estimated with any [bandstructure](../non-scalar/bandstructure.md) [Workflow](../../workflows/overview.md), and it is returned under the [Results Tab]({{ interface_url }}/jobs/ui/results-tab/) interface with the following appearance (in eV).

<div class="clearfix">
    <center>
        <div class="chart"><i class="zmdi zmdi-flash zmdi-hc-3x"></i></div>
        <div class="count">
        	<small>Fermi energy</small>
            <h2>3.826</h2>
        </div>
     </center>
</div>

## Schema 

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#fermi-energy).

## Links

[^1]: [Wikipedia Fermi Energy, Website](https://en.wikipedia.org/wiki/Fermi_energy)
