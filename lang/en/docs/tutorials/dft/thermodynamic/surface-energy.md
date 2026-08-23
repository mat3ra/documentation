# Calculate Surface Energy

This tutorial explains how to calculate the [surface energy]({{ reference_url }}/properties-directory/scalar/surface-energy/) of crystalline gold (Au) in its equilibrium face-centred cubic (fcc) crystal structure using [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT) with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/).

!!!note "Quantum ESPRESSO version"
    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0, 6.0.0, 6.3, and later.

Further information on surface energy calculations and results on a sample material set can be found in Ref. [^1].


## 1. Create the surface

A surface of crystalline gold is created using the [Materials Designer]({{ interface_url }}/materials-designer/overview/) following the instructions in [this page]({{ interface_url }}/materials-designer/header-menu/advanced/surface-slab/).

For this example, a simple Au (111) surface with 50% vacuum ratio is used, keeping the supercell dimensions along x-y to 1 and the slab thickness to 3 layers (~10 Å). This yields a total of 3 gold atoms.


## 2. Understand the workflow structure

<details markdown="1">
  <summary>Expand to view unit details</summary>

The [workflow]({{ reference_url }}/workflows/overview/) is composed of the following [units]({{ reference_url }}/workflows/components/units/):

**io-slab** — An [I/O unit]({{ reference_url }}/workflows/components/units/#i/o) that retrieves material identification information from the account-owned [collection]({{ reference_url }}/accounts/collections/) via the [REST API]({{ developers_url }}/rest-api/overview/).

**slab** — An [assignment unit]({{ reference_url }}/workflows/components/units/#assignment) that stores the material information as the "SLAB" variable.

**io-bulk** — Queries the collection for the bulk material identifier stored as metadata within the "SLAB" variable.

**bulk** — Assigns the bulk material data to the "BULK" variable.

**assert-bulk** — Verifies that the bulk material exists in the collection. If not, an error is raised.

!!!tip "Missing bulk data"
    If the bulk material information is not already in the collection, a [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) calculation can be prepended to the surface energy workflow.

**io-e-bulk** — Extracts the [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) property of the bulk material.

**e-bulk** — Assigns the bulk total energy to the "E_BULK" variable.

**assert-e-bulk** — Asserts that the bulk total energy exists in the collection.

**surface** — Uses [Python]({{ reference_url }}/software-directory/scripting/python/overview/) logic to compute the magnitude of the vector normal to the surface.

**n-bulk / n-slab** — Count the total number of atoms in the bulk and slab materials respectively.

**pw_scf** — Performs an SCF computation to calculate the slab energy. Since the slab is much thinner than it is wide, the [k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/) is set with a smaller z-dimension (e.g. 8 × 8 × 1).

**e-slab** — Assigns the slab energy to the "E_SLAB" variable.

**surface-energy** — Computes the final surface energy from "E_BULK" and "E_SLAB" according to the [formula]({{ reference_url }}/properties-directory/scalar/surface-energy/).

</details>


## 3. Select the workflow and create the job

[Workflows]({{ reference_url }}/workflows/overview/) for surface energy calculations with [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) can be [imported]({{ interface_url }}/workflows/actions/copy-bank/) from the [Workflows Bank]({{ reference_url }}/workflows/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/). The workflow can then be [selected]({{ interface_url }}/jobs-designer/actions-header-menu/select-workflow/) and added to the [job being created]({{ interface_url }}/jobs-designer/workflow-tab/).


## 4. Submit the job

Before [submitting]({{ interface_url }}/jobs/actions/run/) the [job]({{ reference_url }}/jobs/overview/), review the [Compute tab]({{ interface_url }}/jobs-designer/compute-tab/) of [Job Designer]({{ interface_url }}/jobs-designer/overview/) to verify the [compute parameters]({{ resources_url }}/infrastructure/compute/parameters/). The gold slab is a relatively small structure, so 4 CPUs and a few minutes of runtime are sufficient.


## 5. Examine the results

Once all [units]({{ reference_url }}/workflows/components/units/) complete, the [Results tab]({{ interface_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) displays the surface energy for Au (0.049 eV/Å²). This result is in good agreement with the tabulated value for the same surface orientation [^2].


## 6. Video walkthrough

The animation below demonstrates the full surface energy workflow on gold using Quantum ESPRESSO.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/Z8GeBovopcM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 7. Links

[^1]: [Tran R., Xu Z., Radhakrishnan B., Winston D., Sun W., Persson K.A., Ong S.P.: "Surface energies of elemental crystals"; Nature Sci. Data., 3 (2016)](https://www.nature.com/articles/sdata201680)
[^2]: [Crystalium Surfaces Database](http://crystalium.materialsvirtuallab.org/)
