---
tags:
  - surface
  - platinum
  - step
  - Pt(111)
  - Pt(211)
  - oxygen
  - dissociation-barrier
  - nudged-elastic-band
  - D-2D-TER

hide:
  - tags
# YAML header
render_macros: true
---

# O₂ Dissociation on Pt(111) and at the Pt(211) Step (Energy Barrier)

## 1. Introduction

This tutorial calculates the dissociation barrier of an adsorbed O₂ molecule on the flat Pt(111) surface and at
the Pt(211) step, reproducing results from the following manuscript:

!!!note "Manuscript"
    Ž. Šljivančanin and B. Hammer, "Oxygen dissociation at close-packed Pt terraces, Pt steps, and Ag-covered
    Pt steps studied with density functional theory", Surface Science 515, 235 (2002).
    [DOI:10.1016/S0039-6028(02)01908-8](https://doi.org/10.1016/S0039-6028(02)01908-8){:target='_blank'}.
    [@Sljivancanin2002]

This tutorial builds upon the [Terrace Steps on Platinum (111) Surface](defect-surface-step-platinum.md)
tutorial, where the slabs with the O₂ precursor and the dissociated O pair are created. Here, both are relaxed
with Quantum ESPRESSO if `RELAX` is set; a climbing-image
[nudged elastic band]({{ reference_url }}/models/auxiliary-concepts/nudged-elastic-band/) (NEB) calculation
runs between them on each surface, and the barriers are compared with Table 1 of the manuscript.

The figure below shows FIG. 1 of the manuscript; the paths computed here are panels A (Pt(111),
top–fcc–bridge) and B (Pt(211) step, top–bridge–top):

![O₂ precursor and transition state on Pt surfaces](../../../images/tutorials/materials/defects/defect_surface_step_platinum/0-figure-from-manuscript.webp "O₂ precursor (solid) and transition state (dotted), FIG. 1.")

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [Terrace Steps on Platinum (111) Surface](defect-surface-step-platinum.md) tutorial, using the
   `defect_surface_step_platinum.ipynb` notebook embedded in its section 5, to create and save
   `Pt(111) O2 precursor`, `Pt(111) 2O dissociated`, `Pt(211) step O2 precursor` and
   `Pt(211) step 2O dissociated`, OR
2. Have the four materials saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The barrier calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure material names, the k-grid of each surface, the
   Density Functional Theory (DFT) model, and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the four materials by name and print their atom counts
4. **Configure the model**: One DFT model for every workflow below
5. **Configure compute resources**: Select the cluster, queue, and processor settings
6. **Relax the four materials** (optional): Only if `RELAX` is set, at fixed cell, reusing a relaxation job
   if one is found
7. **Run the nudged elastic band**: One climbing-image NEB per surface, from the precursor to the dissociated
   pair, both relaxed if `RELAX` is set
8. **Retrieve results**: The energy profile, the barrier, the O–O distance at the highest image, the image error
9. **Compare with the manuscript**: Print our values beside Šljivančanin & Hammer's

## 4. Calculation parameters

| | this tutorial | Šljivančanin & Hammer |
|---|---|---|
| Code | Quantum ESPRESSO 7.5: the functional below, set through `input_dft`, needs 7.x | not stated |
| Functional | RPBE of Hammer, Hansen and Nørskov | RPBE |
| Pseudopotentials | ultrasoft (GBRV) | ultrasoft (Vanderbilt) |
| Cutoff | 40 / 200 Ry | 25 Ry |
| Pt lattice constant | 3.943 Å (Standata, mp-126) | 4.02 Å |
| Pt(111) slab | 3 layers × 16 Pt | 4 layers × 9 Pt |
| Pt(211) slab | 8 (211) planes × 4 Pt along the step | 12 (211) planes × 3 Pt along the step |
| k-points | 2×2×1 | 6×4×1 |
| Smearing | Marzari-Vanderbilt, 0.01 Ry | not stated |
| Spin | not spin-polarized | not spin-polarized for the adsorbed states |
| Relaxation | all atoms, fixed cell, force components below 0.1 eV/Å | upper half of the Pt atoms and the O atoms, total force below 0.1 eV/Å |
| Transition state | climbing-image NEB, path threshold 0.1 eV/Å | relaxations at fixed O–O distance, on a 0.2 Å grid |
| Dissociated pair | Pt(111): two neighbouring fcc hollows; Pt(211): two step-edge bridges, 2 Pt apart | not given |

A job whose workflow has the same name and k-grid on the same material is reused. The workflow names carry
the application version and the DFT settings, so changing one starts new jobs.

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the barrier notebook:

```
other/materials_designer/specific_examples/defect_surface_step_platinum_SIMULATION.ipynb
```

### 5.2. Configure parameters

The parameters cells set the material names, the k-grid of each surface, the compute resources, and the
DFT model:

```python
SURFACES = {
    "Pt(111)": {"precursor": "Pt(111) O2 precursor", "dissociated": "Pt(111) 2O dissociated",
                "kgrid": [2, 2, 1], "paper_barrier": 0.6, "paper_transition_state_oxygen_distance": 2.4},
    "Pt(211)": {"precursor": "Pt(211) step O2 precursor", "dissociated": "Pt(211) step 2O dissociated",
                "kgrid": [2, 2, 1], "paper_barrier": 0.9, "paper_transition_state_oxygen_distance": 3.0},
}

# RPBE, set in 1.4, needs Quantum ESPRESSO 7.x
APPLICATION_VERSION = "7.5"

RELAX = True

CLUSTER_NAME = None
QUEUE_NAME = QueueName.OR
PPN = 16  # OR allows 16 cores per job
TIME_LIMIT = "04:00:00"

# selects the GBRV PBE pseudopotentials; QE_SYSTEM_SETTINGS sets the functional to RPBE
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry
QE_SYSTEM_SETTINGS = {"input_dft": "rpbe", "nspin": 1, "occupations": "smearing", "smearing": "mv", "degauss": 0.01}
RELAXATION_SETTINGS = {"forc_conv_thr": 3.9e-3, "nstep": 100}
N_IMAGES = 1
# neb.x stops here, converged or not; the largest image error is printed in 9
NEB_MAXIMUM_ITERATIONS = 50
NEB_PATH_SETTINGS = {"nstep_path": NEB_MAXIMUM_ITERATIONS, "minimum_image": True}
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Monitor progress

The notebook polls the jobs: the four relaxations if `RELAX` is set, then the two NEB jobs.

### 5.5. Analyze results

The last cells print the barrier and the O–O distance at the climbing image of each surface beside the
manuscript's values, and plot both energy profiles:

```
Pt(111) barrier: <value> eV, Šljivančanin & Hammer 0.6 eV (<value> %), largest image error <value> eV/Å
Pt(111) O–O at the climbing image: <value> Å, Šljivančanin & Hammer 2.4 Å (<value> %)
Pt(211) barrier: <value> eV, Šljivančanin & Hammer 0.9 eV (<value> %), largest image error <value> eV/Å
Pt(211) O–O at the climbing image: <value> Å, Šljivančanin & Hammer 3.0 Å (<value> %)
```

## 6. Expected results

Table 1 of the manuscript gives the barrier from the O₂ precursor, computed with RPBE, as 0.6 eV on Pt(111)
(top–fcc–bridge, FIG. 1 A) and 0.9 eV at the Pt(211) step (top–bridge–top, FIG. 1 B), with an O–O distance at
the transition state of 2.4 Å and 3.0 Å. FIG. 2 draws the same barriers as energy levels measured from
gas-phase O₂; the profiles here are measured from the precursor.

### 6.1. Comparison with published results

| | Šljivančanin & Hammer, RPBE | this tutorial, `"kgrid": [2, 2, 1]` (default) |
|---|---|---|
| Pt(111) barrier | 0.6 eV | `<value>` eV (`<value>` %) |
| Pt(211) barrier | 0.9 eV | `<value>` eV (`<value>` %) |
| Pt(111) O–O at the transition state | 2.4 Å | `<value>` Å (`<value>` %) |
| Pt(211) O–O at the transition state | 3.0 Å | `<value>` Å (`<value>` %) |

The figure below shows the Pt(111) and Pt(211) panels of FIG. 2 of the manuscript (left) beside the NEB energy
profiles of this tutorial (right), where the dashed lines mark the manuscript's barriers:

![O₂ dissociation energy on Pt(111) and Pt(211)](../../../images/tutorials/materials/defects/defect_surface_step_platinum/energy-profile-comparison.webp "O₂ dissociation energy: manuscript, FIG. 2 (left) vs. NEB energy profiles (right)")

## 7. Customization options

### 7.1. Choose the k-grid, the number of images and the relaxation

`"kgrid"` in `SURFACES` (cell 1.2) is the k-grid of the relaxations and of the NEB on that surface; `[2, 2, 1]`
is fast and not converged. `N_IMAGES` (cell 1.4) is the number of images between the end points: with
one, the path is the precursor, one climbing image, and the dissociated pair. neb.x stops after
`NEB_MAXIMUM_ITERATIONS`, converged or not; the path is converged when the largest image error printed on
the barrier line is below 0.1 eV/Å. A new k-grid re-runs the relaxations and the NEB of that surface; a new
`N_IMAGES` or `NEB_MAXIMUM_ITERATIONS` re-runs the NEB jobs only.

`RELAX = True` (cell 1.3) relaxes the four materials before the NEB, as the manuscript does. `RELAX = False` runs
the NEB between the structures as built, without the relaxations: faster, and the barrier is then measured from
an unrelaxed precursor. Switching it starts new NEB jobs, as the end points change.

### 7.2. Adjust computational resources

The default, `CLUSTER_NAME = None`, uses the account's first listed cluster; setting a specific name picks
that cluster instead, and a name that is not available makes the notebook stop and list the ones that are.

### 7.3. Use the manuscript's settings

The functional and the spin treatment are the manuscript's. The other settings can be moved toward the
manuscript's in the [structure notebook](defect-surface-step-platinum.md) and in section 7.1:

- **Pt(211) slab**: `THICKNESS = 3` gives the manuscript's 12 (211) planes; made's (211) cell holds an even
  number of Pt along the step, so the manuscript's 3 is not reachable
- **Pt(111) slab**: stays at 3 layers, where the oxygen site of the structure notebook is the fcc hollow
- **Fixed atoms**: all atoms relax, as the platform does not keep fixed atoms

## 8. Troubleshooting

### 8.1. Material not found

If one of the four materials is not found in the `uploads` folder or the account's materials collection, run
the [Terrace Steps on Platinum (111) Surface](defect-surface-step-platinum.md) tutorial first, and check that
its `uploads` folder holds the four materials under the names of cell 1.2.

### 8.2. No cluster available

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to, and section
5.2 stops. A cluster has to be available to the account before the notebook can run.

### 8.3. No barrier on the first run

The platform's access token lasts one hour and can expire while the notebook waits for the relaxations or the
NEB jobs in sections 6 and 7. The jobs keep running. Restart the kernel and run all cells again (*Kernel* >
*Restart Kernel and Run All Cells*): the notebook asks for a new login and picks up the running and finished
jobs.

### 8.4. Barrier far from the published value

Check the atom counts printed in section 3 of the notebook first:

```
Pt(111) O2 precursor: 50 atoms
Pt(111) 2O dissociated: 50 atoms
Pt(211) step O2 precursor: 34 atoms
Pt(211) step 2O dissociated: 34 atoms
```

Then, if `RELAX` is set, open the relaxed end points, saved to the account as `<name> relaxed <relaxation tag>`:
the O atoms of each should still sit on the sites of section 4 of the structure tutorial.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook demonstrates the workflow for calculating the O₂ dissociation barrier on
Pt(111) and at the Pt(211) step. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_surface_step_platinum_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
