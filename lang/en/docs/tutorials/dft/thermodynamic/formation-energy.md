# Calculate Formation Energy

This tutorial explains how to calculate the [formation energy]({{ reference_url }}/properties-directory/scalar/formation-energy/) of a compound material using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.

## Prerequisites

The formation energy of a compound is calculated with respect to its constituent elements in their standard states. For the workflow to succeed, the **elemental total energies must already exist** on the platform.

Before running the formation energy workflow for a compound (e.g., Silicon Carbide, SiC), you must first calculate the [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) for each of its constituent elements:
1. **Get Elemental Materials**: Navigate to your Materials collection and import the relevant elemental reference materials from Standata, saving them to your account.
2. **Calculate Total Energy**: For each elemental material, run a Total Energy calculation by following the [Total Energy tutorial](total-energy.md). 
   - **Crucial**: The precision settings (e.g., KPPRA, kinetic energy cutoffs) used for the elements must exactly match the settings you will use for the compound material's calculation.
   - **Crucial**: Ensure you note the **Group** under which these elemental properties are saved, as you will need to specify this group in the Formation Energy workflow.

## 1. Create a job

Open the [Job Designer]({{ interface_url }}/jobs-designer/overview/) to create a new job. 

Under the *Choose A Material* section, select the compound material for which you want to calculate the formation energy. You can import materials from external databases or upload them directly.

![Job Designer material selection for Formation Energy](/images/tutorials/formation_energy/formation-energy-material-selection.png)

## 2. Understand the workflow structure

<details markdown="1">
  <summary>Expand to view unit details</summary>

The [workflow]({{ reference_url }}/workflows/overview/) is composed of the following key [units]({{ reference_url }}/workflows/components/units/):

**pw_scf** — Performs a self-consistent field (SCF) calculation to determine the total energy of the compound material.

**assign-compound-precision** — Evaluates the grid precision (e.g., KPPRA) used in the SCF calculation to ensure consistent precision matching when retrieving elemental energies.

**init-element-index** / **check-elemental-te-loop** / **assign-current-element** — A loop construct that iterates over each unique element present in the compound.

**io-elemental-energy** — An [I/O unit]({{ reference_url }}/workflows/components/units/#i/o) that queries the platform's REST API to retrieve the pre-calculated `total_energy` property for the current element's standard state reference material. It filters by owner (e.g., public, curators, or my account) and sorts by precision to find the most appropriate reference value.

**assign-formation-energy** — Uses [Python]({{ reference_url }}/software-directory/scripting/python/overview/) logic to subtract the sum of the elemental reference energies (scaled by stoichiometry) from the compound's total energy, yielding the final formation energy.

</details>

## 3. Select the workflow

[Workflows]({{ reference_url }}/workflows/overview/) for calculating formation energy with Quantum ESPRESSO can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into your account-owned [collection]({{ reference_url }}/accounts/collections/). 

In the Job Designer, [select]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) the Formation Energy workflow and add it to the job.

![Job Designer workflow selection for Formation Energy](/images/tutorials/formation_energy/formation-energy-workflow-selection.png)

## 4. Set Group and Source of Properties

Inside the **Get Elemental Materials** subworkflow, switch to the **Detailed view** tab. There are two critical [assignment units]({{ reference_url }}/workflows/components/units/#assignment) that must be configured correctly:

**assign-group-for-material**: This unit sets the [group]({{ reference_url }}/accounts/groups/) (e.g. public, curators, or your account) where the platform will search for the elemental Total Energy results. The group selected here must match the owner group of the elemental properties you wish to use.

![Job Designer group assignment for Formation Energy](/images/tutorials/formation_energy/formation-energy-group.png)

**assign-source-of-te-for-an-element**: This unit specifies the source of the property. By default, it queries Standata for elemental energies.

## 5. Set parameters

In the workflow unit settings, ensure the [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is sufficiently dense for your desired accuracy. A high KPPRA (k-points per reciprocal atom) is typically required for accurate formation energies. 

!!!important "Precision Consistency"
    The precision settings (e.g., KPPRA, kinetic energy cutoff) used for the compound material's SCF calculation must match the precision settings used to calculate the elemental reference energies. The `io-elemental-energy` unit will attempt to find a reference material matching the target precision.

![Job Designer parameter configuration for Formation Energy](/images/tutorials/formation_energy/formation-energy-parameters.png)

## 6. Submit the job

Once all parameters are set, navigate to the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) to verify the compute resource allocation, then [submit]({{ interface_url }}/jobs/actions/run/) the job.

## 7. Examine the results

Once the job completes, navigate to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of the [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). The **Formation Energy** property will be displayed. More negative values indicate greater thermodynamic stability relative to the elemental standard states.


