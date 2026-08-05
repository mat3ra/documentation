# Calculate Defect Formation Energy

This tutorial explains how to calculate the [defect formation energy]({{ reference_url }}/properties-directory/scalar/formation-energy/) of a defective material using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/). 

## 1. Prerequisites

The defect formation energy is calculated with respect to the pristine material and its constituent elements in their standard states. For the workflow to succeed, the **elemental total energies must already exist** on the platform.

Before running the defect formation energy workflow for a defective compound (e.g., Nitrogen vacancy in GaN), you must first calculate the [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) for each of its constituent elements that are added or removed to create the defect:
1. **Get Elemental Materials**: Navigate to your Materials collection and import the relevant elemental reference materials from Standata, saving them to your account.
2. **Calculate Total Energy**: For each elemental material, run a standard SCF [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) job on it. 
   - **Crucial**: The precision settings (e.g., KPPRA, kinetic energy cutoffs) used for the elements must exactly match the settings you will use for the defective material's calculation.
   - **Crucial**: Ensure you note the property **Group** (e.g., `qe:dft:gga:pbe`) under which the elemental Total Energies were calculated, as you will need to specify this group in the Defect Formation Energy workflow.

## 2. Create the materials

1. Create the pristine bulk material structure using the [Materials Designer]({{ interface_url }}/materials-designer/overview/).
2. Create the defective structure. You can follow tutorials on creating defects, such as [Create Point Defect Pair in GaN](../../materials/specific/defect-point-pair-gallium-nitride.md).
3. Ensure that the total energy for the pristine material has been calculated with the same precision parameters that you plan to use for the defect calculation.

## 3. Understand the workflow structure

<details markdown="1">
  <summary>Expand to view unit details</summary>

The defect formation energy [workflow]({{ reference_url }}/workflows/overview/) is composed of several [subworkflows]({{ reference_url }}/workflows/components/subworkflows/) that load the materials, fetch their pre-calculated total energies, and compute the final energy.

### 1. Load Defective Material
- Loads the defective material into the workflow.

### 2. Compute Total Energy for Defective Material
- **pw_scf**: Performs an SCF calculation on the defective structure.

### 3. Load Pristine Material
- Loads the standalone pristine bulk material into the workflow.

### 4. Fetch Total Energy for Pristine Material
- Queries the platform for the total energy of the pristine material and extracts it using `io-bulk-te-job` and `io-te-bulk`.

### 5. Resolve Elemental Materials
- Resolves the Standata elemental reference materials for every element present in either the defective or the pristine structure.

### 6. Resolve Total Energies for Elemental Materials
- **assign-source-of-te-for-an-element** / **assign-group-for-material** set which elemental reference records to search for (see [step 5](#5-set-group-and-source-of-properties) below).
- Contains a loop (`init-element-index` / `check-te-for-elemental-materials-loop` / `assign-current-element`) that iterates over elements.
- **io-te-for-an-element** retrieves the pre-calculated `total_energy` property for the current element's standard state reference material, filtered by that Group and Source.

### 7. Compute Defect Formation Energy
- **assign-defect-formation-energy**: Uses [Python]({{ reference_url }}/software-directory/scripting/python/overview/) to compute the defect formation energy by finding the difference in total energy between the defective and pristine materials, adjusted for the chemical potentials (elemental reference energies) of any atoms added or removed.

</details>

## 4. Select the workflow and create the job

This is a **multi-material** workflow: the job must be submitted with exactly two materials, in this order:

1. **Defective supercell** (position 0) — its total energy is computed by the job itself.
2. **Pristine supercell** (position 1) — its total energy is fetched from that material's own most recently finished Total Energy job, so it must already exist on the platform (see [step 2](#2-create-the-materials)).

To set this up:

1. Open the [Job Designer]({{ interface_url }}/jobs-designer/overview/) and add the defective material first, then the pristine material, so they occupy positions 0 and 1 respectively.
2. [Workflows]({{ reference_url }}/workflows/overview/) for defect formation energy calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/).
3. Once imported, [select]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) the Defect Formation Energy workflow and add it to your job.

## 5. Set Group and Source of Properties

This step only applies to the **elemental reference** lookup — the pristine material's total energy (fetched in the **Fetch Total Energy for Pristine Material** subworkflow) is read directly from that material's own most recent finished Total Energy job and does not use a Group or Source setting.

Inside the **Resolve Total Energies for Elemental Materials** subworkflow, switch to the **Detailed view** tab and check two assignment units:

- **assign-source-of-te-for-an-element**: who owns the elemental Total Energy record to search for — `'public'` by default, or `'my_account'`/`'curators'` if you calculated the elemental references yourself or want curated results only.
- **assign-group-for-material**: the property group (e.g., `qe:dft:gga:pbe`) to filter the elemental Total Energy results by computational method. This must match the property group of the individual elemental total energies you calculated previously.

This is the same **Resolve Total Energies for Elemental Materials** subworkflow used by the Formation Energy workflow:

![Job Designer source assignment for Defect Formation Energy](/images/tutorials/formation_energy/formation-energy-assign-te-source-unit.png)

![Unit settings for assign-source-of-te-for-an-element](/images/tutorials/formation_energy/formation-energy-assign-te-source.png)

## 6. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) to verify the compute parameters. Ensure that the K-point grid and cutoffs match those used for the pristine material and elemental reference calculations.

## 7. Examine the results

Once the job completes, navigate to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of the [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). The **Defect Formation Energy** property will be displayed.

![Job Viewer results for Defect Formation Energy](/images/tutorials/defect_formation_energy/defect-formation-energy-result.png)
