# Calculate Formation Energy

This tutorial explains how to calculate the [formation energy]({{ reference_url }}/properties-directory/scalar/formation-energy/) of a compound material using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.

## Prerequisites

The formation energy of a compound is calculated with respect to its constituent elements in their standard states. For the workflow to succeed, the **elemental total energies must already exist** on the platform.

Before running the formation energy workflow for a compound (e.g., Silicon Carbide, SiC), ensure you have calculated the [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) for each of its unique elements (e.g., Si and C) using the corresponding elemental reference materials from Standata.

## 1. Create a job

Open the [Job Designer]({{ interface_url }}/jobs-designer/overview/) to create a new job. 

Under the *Choose A Material* section, select the compound material for which you want to calculate the formation energy. You can import materials from external databases or upload them directly.

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

## 4. Set parameters

In the workflow unit settings, ensure the [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is sufficiently dense for your desired accuracy. A high KPPRA (k-points per reciprocal atom) is typically required for accurate formation energies.

## 5. Submit the job

Review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) to ensure sufficient compute resources are allocated, then [submit]({{ interface_url }}/jobs/actions/run/) the job.

## 6. Examine the results

Once the job completes, navigate to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of the [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). The **Formation Energy** property will be displayed. More negative values indicate greater thermodynamic stability relative to the elemental standard states.

## Notebook Alternative

You can also run this workflow programmatically using the JupyterLite notebook. See the `formation_energy.ipynb` tutorial in the `materials_designer/workflows/` directory of the API Examples repository.
