# Reaction Energy Profile

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Chemical</span>

Any chemical reaction or process can be characterized by its **Reaction Energy Profile** [^1]. This profile is a theoretical representation of the reaction's energetic pathway, followed by the reactants as they are transformed into products during the course of the reaction. It is typically plotted along the main **reaction coordinate**, a parametric curve that follows the pathway of a reaction, and that indicates its overall progress.
 
The purpose of energy profiles is to provide a qualitative representation of how potential energy varies with molecular motion for a given chemical reaction.

## Example

Reaction Energy Profile calculations can be performed with an appropriate [Workflow](../../workflows/overview.md), based on the [**Nudged Elastic Bands** method](../../models/auxiliary-concepts/nudged-elastic-band.md)  such as [implemented]({{ guide_url }}/tutorials/dft/chemical/reaction-profile-qe/) by the [Quantum ESPRESSO modeling application]({{ guide_url }}/software-directory/modeling/quantum-espresso/overview/). 

The final results are portrayed in the [Results Tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) in the form of a **profile curve**, as illustrated in the graphic below. The visual contains the reaction energy profile for a chemical reaction with [activation energy barrier](../scalar/reaction-energy-barrier.md) of approximately 0.2 eV.

![Reaction Profile](../../images/properties-directory/reaction-profile.png "Reaction Profile")

### Export as Image

The possibility to export the graph is offered as mentioned [here]({{ interface_url }}/properties/ui/viewer/#export-as-images).

## Transition State

The highest potential energy molecular configuration across a reaction energy profile is often referred to as the **transition state** [^2] for the chemical reaction under investigation.
 
[In this section](../../workflows/addons/structural-relaxation.md#initial/final-structures-set), we explain how the transition state of a chemical reaction investigated with the NEB method can be inspected, both in its original and fully relaxed final molecular configurations, via our user interface at the end of the NEB job execution.

## Schema

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#reaction-energy-profile).

## Links

[^1]: [Wikipedia Energy profile (chemistry), Website](https://en.wikipedia.org/wiki/Energy_profile_(chemistry))

[^2]: [Wikipedia Transition state, Website](https://en.wikipedia.org/wiki/Transition_state)
