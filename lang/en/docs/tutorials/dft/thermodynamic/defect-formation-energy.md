# Calculate Defect Formation Energy

This tutorial explains how to calculate the [defect formation energy]({{ reference_url }}/properties-directory/scalar/formation-energy/) of a defective material using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/). 

## 1. Prerequisites

The defect formation energy is calculated with respect to the pristine material and its constituent elements in their standard states. For the workflow to succeed, the **elemental total energies must already exist** on the platform.

Before running the defect formation energy workflow for a defective compound (e.g., Nitrogen vacancy in GaN), you must first calculate the [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) for each of its constituent elements that are added or removed to create the defect:
1. **Get Elemental Materials**: Navigate to your Materials collection and import the relevant elemental reference materials from Standata, saving them to your account.
2. **Calculate Total Energy**: For each elemental material, run a Total Energy calculation by following the [Total Energy tutorial](total-energy.md). 
   - **Crucial**: The precision settings (e.g., KPPRA, kinetic energy cutoffs) used for the elements must exactly match the settings you will use for the defective material's calculation.
   - **Crucial**: Ensure you note the **Group** under which these elemental properties are saved, as you will need to specify this group in the Defect Formation Energy workflow.

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

### 5. Get Elemental Materials
- Contains a loop (`init-element-index` / `check-elemental-te-loop` / `assign-current-element`) that iterates over elements.
- **io-elemental-energy** retrieves the pre-calculated `total_energy` property for the current element's standard state reference material.

### 6. Compute Defect Formation Energy
- **assign-defect-formation-energy**: Uses [Python]({{ reference_url }}/software-directory/scripting/python/overview/) to compute the defect formation energy by finding the difference in total energy between the defective and pristine materials, adjusted for the chemical potentials (elemental reference energies) of any atoms added or removed.

</details>

## 4. Select the workflow and create the job

1. Open the [Job Designer]({{ interface_url }}/jobs-designer/overview/) and select your defective material.
2. [Workflows]({{ reference_url }}/workflows/overview/) for defect formation energy calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/).
3. Once imported, [select]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) the Defect Formation Energy workflow and add it to your job.

## 5. Set Group and Source of Properties

Inside the **Fetch Total Energy for Pristine Material** and **Get Elemental Materials** subworkflows, switch to the **Detailed view** tab. Check the [assignment units]({{ reference_url }}/workflows/components/units/#assignment) and ensure the groups are set correctly to match the group under which you calculated the individual total energies (e.g., your account).

## 6. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) to verify the compute parameters. Ensure that the K-point grid and cutoffs match those used for the pristine material and elemental reference calculations.

## 7. Examine the results

Once the job completes, navigate to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of the [Job Viewer]({{ interface_url }}/jobs/ui/viewer/). The **Defect Formation Energy** property will be displayed.
