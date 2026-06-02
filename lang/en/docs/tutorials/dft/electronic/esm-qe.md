# Effective Screening Medium (ESM) Calculation

In this tutorial, we demonstrate how to create a [Job]({{ reference_url }}/jobs/overview/) in order to extract the **potential/charge profiles** via the [Effective Screening Medium (ESM)]({{ reference_url }}/models/auxiliary-concepts/esm/) approach for simulating **surfaces** and **interfaces**, based on [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/).

We consider a water (H2O) molecule in the present example, and use [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as our main simulation engine.

!!!note "Quantum ESPRESSO version considered in this tutorial"
    The present tutorial is written for Quantum ESPRESSO at versions 5.2.1, 5.4.0, 6.0.0 or 6.3.
    
## Workflow (Quantum ESPRESSO)

<details markdown="1">
  <summary>Expand to view ...</summary>

The [Workflow]({{ reference_url }}/workflows/overview/) implementing ESM calculations on our platform through [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) is composed of a single main computational [unit]({{ reference_url }}/workflows/components/units/). 

Examples on how ESM is enabled and supported in Quantum ESPRESSO are offered in Ref. [^1]. Here, we will offer a brief review of the most important input keywords, that are required to be included in Quantum ESPRESSO input scripts in the context of ESM calculations.

### Quantum ESPRESSO ESM Input Parameters

#### assume_isolated = 'esm'
 
This parameter is used to perform the calculation assuming the system to be isolated, such as in the cases of a molecule or a cluster, as opposed to regular periodic boundary conditions. 

For polarized or charged slab calculation, the 'esm' option embeds the simulation cell within an effective semi-
infinite medium in the perpendicular direction (along z). Embedding regions can be vacuum or semi-infinite metal electrodes.If between two electrodes, an optional electric field may be applied via the 'esm_efield' keyword described in what follows.

This requires a simulation cell with the $c$ lattice vector along z, normal to the xy plane, with the slab centered around z=0. 

#### esm_bc

This option determines the boundary conditions used for either side of the slab. The available possibilities are listed in [this page]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/).

#### esm_w

This keyword determines the [position offset]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/#offset) of the start of the effective screening region, measured relative to the edge of the simulation cell (of total vertical thickness $L_z$). The ESM region begins at (assuming the slab to be centered around z=0):

$$
 z = +/- [L_z/2 + esm_w]
$$

#### esm_efield

This other option gives the magnitude of the electric field to be applied between semi-infinite ESM electrodes (metals). It is applicable only in the case of the metal-slab-metal (bc2) [boundary condition]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/).

#### lfcpopt

If the `lfcpopt` option is set to ".TRUE.", it performs a constant bias potential (constant-mu) calculation [^2] for a static system with ESM method. This option is subject to the following two conditions:

- calculation must be of type 'relax'.
- [Boundary conditions]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/) can be of type "bc2" or "bc3" only.

Using the constant-mu method, one can control the Fermi energy, that is the applied bias, during a simulation. 

#### fcp_mu

Finally, the `fcp_mu` tag in the Quantum ESPRESSO input script sets the target Fermi energy for the simulation, if the aforementioned `lfcpopt` input parameter has been set to ".TRUE.". 

### SCF vs Relax ESM Calculations

Two different flavors of ESM workflow calculations are offered on our platform, the first one performing a basic ground state energy self-consistent field (SCF) calculation, whereas the second affording also for the [relaxation]({{ reference_url }}/workflows/addons/structural-relaxation/) of the inter-atomic forces, within the structure under consideration, during the course of the ESM computation. The latter option is enabled via the  `calculation = 'relax'` Quantum ESPRESSO input tag.

</details>

## Prepare Water Molecule

The structure of a water molecule (H2O) can readily be [imported]({{ interface_url }}/materials/actions/copy-bank/) from the [Materials Bank]({{ reference_url }}/materials/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials, if it is not already present there.  

This water structure should then be [imported]({{ interface_url }}/materials-designer/header-menu/input-output/import/) into the [Materials Designer]({{ interface_url }}/materials-designer/overview/) interface, in order to edit its [boundary conditions]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/) via the corresponding option in the ["Advanced" menu]({{ interface_url }}/materials-designer/header-menu/advanced/). 

In the present example, we shall opt for the "Vacuum-Slab-Vacuum" (bc1) boundary condition option. The vacuum boundaries should be shifted by half of the lattice $c$ constant, by leaving the "Offset" option of the ["Set Boundary Conditions" dialog]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/) to its default zero value.

After finishing setting up the boundary conditions for our water molecule structure, the user should [Save]({{ interface_url }}/materials-designer/header-menu/input-output/save/) the changes to the structure into the account-owned materials collection, and then exit Materials Designer.

## Create Job

The user should then open an instance of the [Job Designer interface]({{ interface_url }}/jobs-designer/overview/) in order to create a new simulation [Job]({{ reference_url }}/jobs/overview/), via the corresponding option in the main [left-hand sidebar]({{ interface_url }}/ui/left-sidebar/#create-job) of our [Web interface]({{ interface_url }}/ui/overview/).

## Import Water Molecule in Job Designer

The previously-created water structure should now be [selected and imported]({{ interface_url }}/jobs-designer/actions-header-menu/select-materials/) via the ["Materials" tab]({{ interface_url }}/jobs-designer/materials-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/), in order to be made the main simulation system under consideration.

## Copy ESM Workflow from Bank

[Workflows]({{ reference_url }}/workflows/overview/) for performing [Effective Screening Medium (ESM)]({{ reference_url }}/models/auxiliary-concepts/esm/) computations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can readily be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The user should search for the "ESM" keyword whilst performing a [search]({{ interface_url }}/entities-general/actions/search/) within the Bank.

This workflow can later be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [Job being created]({{ interface_url }}/jobs-designer/overview/). 

## Change Important Settings

Opening ["Important Settings"]({{ interface_url }}/workflow-designer/subworkflow-editor/important-settings/) within the [Workflow Tab]({{ interface_url }}/jobs-designer/workflow-tab/) of Job Designer allows the user to customize the following Boundary Conditions-related settings:

- Type of [boundary conditions]({{ interface_url }}/materials-designer/header-menu/advanced/boundary-conditions/)
- Offset
- Electric Field
- Target Fermi Energy 

In the present example, we shall keep the previously-defined 'bc1' boundary conditions, and leave the remaining three options to their default zero values.

In addition, the user should set the size of the grid of [k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) to 1x1x1 in this case, also under "Important Settings", since we are dealing with a water molecule as opposed to a periodic crystal.

## Submit Job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), the user should click on the ["Compute" tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) and examine the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/) included therein.  Water is a small structure, so 4 CPUs and a few minutes of calculation runtime should be sufficient.

## Examine Final Results

### Potential Energy Profile

When the ESM computation is complete at the end of Job execution, switching to the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) will show the **Potential Energy profile** of our water-vacuum system, plotted as an energy curve (in eV) as a function of the distance along the vertical perpendicular direction (the "z" coordinate), away from the central water slab. The "local" and "Hartree" contributions to the Potential energy are also given separately.

### Charge Density Profile

Similarly, the Charge Density profile is also displayed under the [Results tab]({{ interface_url }}/jobs/ui/results-tab/), showing the evolution of the charge density (in electron charge units/Angstrom) as a function of the same vertical "z" coordinate mentioned previously.

The two dimensional (xy-plane) average charge density and electrostatic potentials are printed out into the file with the '.esm1' extension, accessible via the ["Files" tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).

## Animation

We demonstrate the above-mentioned steps involved in the creation and execution of an ESM computation on a water molecule, using the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) simulation engine, in the following animation. Here, we shall make use of the "Relax" variant of the Quantum ESPRESSO ESM workflow.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/1KOGtvEGjI8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Quantum ESPRESSO ESM Examples, Official GitHub repository](https://github.com/QEF/q-e/tree/master/PW/examples/ESM_example)

[^2]: [N. Bonnet, T. Morishita, O. Sugino, and M. Otani: "First-Principles Molecular Dynamics at a Constant Electrode Potential", Phys. Rev. Lett. 109, 266101 (2012)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.109.266101)
