# Calculate Interfacial Energy

This tutorial explains how to calculate the interfacial energy between a substrate material and a film material using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

## 1. Create the materials

To calculate interfacial energy, you need an interface structure that combines both the substrate and the film, as well as the individual substrate and film materials in their bulk forms.

1. Create the substrate and film structures using the [Materials Designer]({{ interface_url }}/materials-designer/overview/).
2. Create the combined interface structure using the [Interface Builder]({{ interface_url }}/materials-designer/header-menu/advanced/interface/).
3. Ensure that the total energy for both the standalone substrate and the standalone film has been calculated with the same precision parameters (e.g., KPPRA, kinetic energy cutoffs) that you plan to use for the interface calculation.

## 2. Understand the workflow structure

<details markdown="1">
  <summary>Expand to view unit details</summary>

The interfacial energy [workflow]({{ reference_url }}/workflows/overview/) is composed of several [subworkflows]({{ reference_url }}/workflows/components/subworkflows/) that load the materials, fetch their pre-calculated total energies, and compute the interface energy.

### 1. Load Interface Material
- Loads the combined interface material into the workflow using `set-material-index` and `io-material`.

### 2. Load Substrate Material
- Loads the standalone substrate material into the workflow to be used as a reference.

### 3. Fetch Total Energy for Substrate Material
- Queries the platform for the total energy of the substrate material and extracts it using `io-bulk-te-job` and `io-te-bulk`.

### 4. Load Film Material
- Loads the standalone film material into the workflow.

### 5. Fetch Total Energy for Film Material
- Queries the platform for the total energy of the film material and extracts it.

### 6. Compute Interfacial Energy
- **pw_scf**: Performs a self-consistent field (SCF) calculation to determine the total energy of the combined interface structure.
- **assign-interfacial-energy**: Uses [Python]({{ reference_url }}/software-directory/scripting/python/overview/) to compute the interfacial energy by subtracting the substrate and film reference energies from the total energy of the interface, normalized by the interface area.

</details>

## 3. Select the workflow and create the job

1. Open the [Job Designer]({{ interface_url }}/jobs-designer/overview/) and select your combined interface material.
![Material Selection](./images/interfacial-energy-material-selection.png)
2. [Workflows]({{ reference_url }}/workflows/overview/) for interfacial energy calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/).
3. Once imported, [select]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) the Interfacial Energy workflow and add it to your job.
![Workflow Selection](./images/interfacial-energy-workflow-selection.png)

## 4. Set Group and Source of Properties

Inside the subworkflows that fetch the substrate and film total energies, make sure the property owner groups are set correctly to match the group under which you calculated the individual total energies (e.g., your account).

## 5. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) to verify the compute parameters. Ensure that the K-point grid and cutoffs match those used for the substrate and film reference calculations.

## 6. Examine the results

Once the job completes, navigate to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of the [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). The **Interfacial Energy** property will be displayed.
