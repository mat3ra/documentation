# Effective Screening Medium (ESM) Calculation

This tutorial demonstrates how to extract **potential/charge profiles** via the [Effective Screening Medium (ESM)]({{ reference_url }}/models/auxiliary-concepts/esm/) approach for simulating **surfaces** and **interfaces**, based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT). The example system is a water (H₂O) molecule, and [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) is used as the simulation engine.

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.


## 1. Understand the ESM workflow

<details markdown="1">
  <summary>Expand to view input parameter details</summary>

The [workflow]({{ reference_url }}/workflows/overview/) for ESM calculations with Quantum ESPRESSO contains a single main computational [unit]({{ reference_url }}/workflows/components/units/). Examples of ESM in Quantum ESPRESSO are available in Ref. [^1]. The key input parameters are:

**`assume_isolated = 'esm'`** — treats the system as isolated (molecule or cluster). For polarized or charged slab calculations, this embeds the simulation cell within an effective semi-infinite medium along z. Embedding regions can be vacuum or semi-infinite metal electrodes. An optional electric field can be applied via `esm_efield`. The simulation cell must have the $c$ lattice vector along z, with the slab centered around z=0.

**`esm_bc`** — determines the [boundary conditions]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/) used for either side of the slab.

**`esm_w`** — the [position offset]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/#offset) of the start of the effective screening region, measured relative to the cell edge:

$$
z = \pm [L_z/2 + \text{esm\_w}]
$$

**`esm_efield`** — magnitude of the electric field applied between semi-infinite ESM electrodes. Applicable only with the metal-slab-metal (bc2) [boundary condition]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/).

**`lfcpopt`** — if set to `.TRUE.`, performs a constant bias potential (constant-μ) calculation [^2]. Requires `calculation = 'relax'` and bc2 or bc3 boundary conditions.

**`fcp_mu`** — target Fermi energy when `lfcpopt = .TRUE.`.

Two workflow flavors are available: a basic ground-state SCF calculation and a variant that includes [structural relaxation]({{ reference_url }}/workflows/addons/structural-relaxation/) during the ESM computation (enabled via `calculation = 'relax'`).

</details>


## 2. Prepare the water molecule

The H₂O structure can be [imported]({{ interface_url }}/materials/actions/copy-bank/) from the [Materials Bank]({{ reference_url }}/materials/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/).

The structure should then be [imported]({{ interface_url }}/materials-designer/header-menu/input-output/import/) into the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to edit its [boundary conditions]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/) via the [Advanced menu]({{ interface_url }}/materials-designer/header-menu/advanced/).

For this example, select the "Vacuum-Slab-Vacuum" (bc1) boundary condition. Leave the "Offset" to its default zero value, which shifts the vacuum boundaries by half the lattice $c$ constant.

After setting the boundary conditions, [save]({{ interface_url }}/materials-designer/header-menu/input-output/save/) the structure and exit the Materials Designer.


## 3. Create the job and import the material

Open the [Job Designer]({{ interface_url }}/jobs-designer/overview/) to create a new [Job]({{ reference_url }}/jobs/overview/). The water structure should be [selected and imported]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) via the [Materials tab]({{ interface_url }}/jobs-designer/materials-tab/).


## 4. Import the ESM workflow from the bank

[Workflows]({{ reference_url }}/workflows/overview/) for ESM calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/). Search for the "ESM" keyword in the bank. The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the job.


## 5. Configure the important settings

Open [Important Settings]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) within the [Workflow Tab]({{ interface_url }}/jobs-designer/workflow-tab/) to configure the following boundary condition parameters:

- Type of [boundary conditions]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/)
- Offset
- Electric Field
- Target Fermi Energy

For this example, keep the bc1 boundary conditions and leave the remaining options at their default zero values. Set the [k-point]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) grid to 1 × 1 × 1, since the system is a molecule rather than a periodic crystal.


## 6. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). Water is a small structure, so 4 CPUs and a few minutes of runtime are sufficient.


## 7. Examine the results

### 7.1. Potential energy profile

The [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the **potential energy profile** of the water-vacuum system, plotted as energy (eV) versus distance along the z-coordinate, away from the central water slab. The local and Hartree contributions to the potential energy are shown separately.

### 7.2. Charge density profile

The **charge density profile** is also displayed, showing the charge density (in electron charge units/Å) as a function of the z-coordinate. The 2D (xy-plane) average charge density and electrostatic potentials are printed to the file with the `.esm1` extension, accessible via the [Files tab]({{ interface_url }}/jobs/ui/files-tab/).


## 8. Video walkthrough

The animation below demonstrates the creation and execution of an ESM computation on a water molecule using the "Relax" variant of the Quantum ESPRESSO ESM workflow.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/1KOGtvEGjI8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 9. Links

[^1]: [Quantum ESPRESSO ESM Examples, Official GitHub repository](https://github.com/QEF/q-e/tree/master/PW/examples/ESM_example)
[^2]: [N. Bonnet, T. Morishita, O. Sugino, and M. Otani: "First-Principles Molecular Dynamics at a Constant Electrode Potential", Phys. Rev. Lett. 109, 266101 (2012)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.109.266101)
