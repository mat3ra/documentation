# Reaction Energy Barrier

<span class="btn badge b-success border-50">Scalar</span> <span class="btn badge b-info border-50">Chemical</span>

The Reaction Energy Barrier (also known as Activation Barrier) marks the highest energy state encountered during the course of the progress of a chemical reaction [^1], as visualized through its corresponding [Reaction Energy Profile](../non-scalar/reaction-energy-profile.md). It is a **[Scalar and Auxiliary](../../properties/classification/general.md) property** of the chemical reaction under consideration. It therefore effectively measures the **energetic requirement** that the reactants need to overcome in order to undergo a complete transformation into the products of the chemical reaction.

## Example

Its value can be estimated with any [Nudged Elastic Band]({{ guide_url }}/tutorials/dft/chemical/reaction-profile-qe/) (NEB) [Workflow](../../workflows/overview.md), and it is returned under the [Results Tab]({{ interface_url }}/jobs/ui/results-tab/) interface with the following appearance (in eV).

<div class="clearfix">
    <center>
        <div class="chart"><i class="zmdi zmdi-battery-flash zmdi-hc-3x"></i></div>
        <div class="count">
        	<small>Reaction energy barrier (eV)</small>
            <h2>0.201</h2>
        </div>
     </center>
</div>

## Schema 

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#reaction-energy-barrier).

## Links

[^1]: [Wikipedia Activation energy, Website](https://en.wikipedia.org/wiki/Activation_energy)
