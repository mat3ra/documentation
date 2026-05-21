# K-point Convergence 

We consider the case of [convergence](../../../workflows/addons/convergence-algorithms.md) based on the study of the number of [sampling points (k-points)](sampling.md) in the reciprocal cell.

In most cases, in order to achieve the desired [precision](../../../methods/precision.md), the total energy should not increase significantly when the k-point density is increased. 

## Algorithm

The flowchart of the optimization algorithm used to find the optimal density is presented below.

![Convergence Algorithm](../../../images/models/KpointConvergenceDiagram.png "Convergence Algorithm")

Here, we use a uniform k-point mesh (same in each of the three spatial directions), and first initiate the number of kpoints `N_K` at 1. We then run a self-consistent [density functional theory](../../../models-directory/dft/overview.md) calculation (`pw_scf` - using [Quantum ESPRESSO's]({{ guide_url }}/software-directory/modeling/quantum-espresso/overview/) terminology), and check whether the `Output` value difference at current step and at previous one (`x`) is less than the convergence threshold. This whole process is repeated over a certain number of iterations.

Currently, the default k-point convergence algorithm systematically increments the starting k-point density by 1 in along each reciprocal lattice vector, until the total energy of the system does not increase by more than 0.001% (10^-5).

!!!note "Properties Sensitive to Convergence"
    Some properties, especially those depending on [atomic forces](../../../properties-directory/structural/atomic-forces.md), derivatives of the [total energy](../../../properties-directory/scalar/total-energy.md), and displacements or perturbations, are highly dependent upon the quality of convergence and relaxation. For example, accurate calculation of [zero point energy](../../../properties-directory/scalar/zero-point-energy.md) requires a well converged k-point grid to sample the total energy space when atoms are displaced from their equilibrium positions.

## Animation

In the following animation, we show how to insert a k-point convergence add-on to a total energy subworkflow, from the [Actions Menu]({{ guide_url }}/workflow-designer/subworkflow-editor/actions-menu/) in [Workflow Designer]({{ guide_url }}/workflow-designer/overview/). The new [compute units](../../../workflows/components/units.md) are consequently added to the subworkflow.
  
<img data-gifffer="/images/models/AddKpointConvergence.gif" />

Please see the [k-point convergence tutorial]({{ guide_url }}/tutorials/dft/addons/kpt-convergence/) for more details.
