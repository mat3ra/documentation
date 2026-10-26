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
with the MACE machine-learned force field if `RELAX` is set. The barrier then comes from the manuscript's own
method, run with MACE in the notebook: the O–O distance is held at each point of a 0.2 Å grid while every other
coordinate relaxes. With `RUN_DFT_NEB` set, a climbing-image
[nudged elastic band]({{ reference_url }}/models/auxiliary-concepts/nudged-elastic-band/) (NEB) calculation
with the manuscript's functional also runs between them on the platform. The barriers are compared with Table 1
of the manuscript.

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

1. **Set up the environment and parameters**: Configure material names, the MACE force field, the scan, the
   Density Functional Theory (DFT) model, and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the four materials by name and print their atom counts
4. **Configure the model**: One DFT model for the NEB
5. **Configure compute resources**: Select the cluster, queue, nodes, and processor settings
6. **Relax and scan with MACE**: Relax the materials if `RELAX` is set, then scan the O–O distance on the grid
7. **Run the nudged elastic band** (optional): Only if `RUN_DFT_NEB` is set, one climbing-image NEB per
   surface with RPBE on the platform
8. **Retrieve results**: The NEB energy profile, barrier, O–O distance at the highest image, and image error
9. **Compare with the manuscript**: Print the MACE values, and the NEB values if run, beside the manuscript's

## 4. Calculation parameters

| | MACE scan (default) | RPBE NEB (`RUN_DFT_NEB = True`) | Šljivančanin & Hammer |
|---|---|---|---|
| Where it runs | in the notebook | on the platform, Quantum ESPRESSO 7.5: RPBE through `input_dft` needs 7.x | code not stated |
| Energy | MACE-MP-0 large, no dispersion correction | RPBE of Hammer, Hansen and Nørskov | RPBE |
| Pseudopotentials, cutoff | — | ultrasoft (GBRV), 40 / 200 Ry | ultrasoft (Vanderbilt), 25 Ry |
| k-points, smearing | — | 2×2×1, Marzari-Vanderbilt 0.01 Ry | 6×4×1, not stated |
| Spin | — | not spin-polarized | not spin-polarized for the adsorbed states |
| Transition state | highest point, O–O fixed on a 0.2 Å grid | climbing image, path threshold 0.1 eV/Å | highest point, O–O fixed on a 0.2 Å grid |
| Relaxation | all atoms, in the scan all but the O–O distance; largest force below 0.1 eV/Å | end points from the MACE relaxation if `RELAX` | upper half of the Pt atoms and the O atoms, total force below 0.1 eV/Å |
| Pt lattice constant | 3.943 Å (Standata, mp-126) | 3.943 Å | 4.02 Å |
| Pt(111) slab | 3 layers × 16 Pt | 3 layers × 16 Pt | 4 layers × 9 Pt |
| Pt(211) slab | 8 (211) planes × 4 Pt along the step | 8 (211) planes × 4 Pt | 12 (211) planes × 3 Pt along the step |

The dissociated pair, not given in the manuscript, ends the scan and the NEB: both O in neighbouring fcc hollows on Pt(111),
on step-edge bridges 2 Pt apart on Pt(211). An NEB job that is queued, running or finished on the same two end points with
the same k-grid is reused, also when the application version or a setting of cell 1.4, `N_IMAGES` included, has changed.

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the barrier notebook:

```
other/materials_designer/specific_examples/defect_surface_step_platinum_SIMULATION.ipynb
```

### 5.2. Configure parameters

The parameters cells set the material names, the k-grid of each surface, the MACE force field and the scan,
the compute resources, and the DFT model:

```python
SURFACES = {
    "Pt(111)": {
        "precursor": "Pt(111) O2 precursor",
        "dissociated": "Pt(111) 2O dissociated",
        "kgrid": [2, 2, 1],
        "paper_barrier": 0.6,
        "paper_transition_state_oxygen_distance": 2.4,
    },
    "Pt(211)": {
        "precursor": "Pt(211) step O2 precursor",
        "dissociated": "Pt(211) step 2O dissociated",
        "kgrid": [2, 2, 1],
        "paper_barrier": 0.9,
        "paper_transition_state_oxygen_distance": 3.0,
    },
}

RELAX = True
MACE_MODEL_FAMILY = "MACE-MP-0"
MACE_MODEL = "large"
MACE_DISPERSION = False
FMAX = 0.1  # eV/Å
OXYGEN_DISTANCE_STEP = 0.2  # Å

RUN_DFT_NEB = False

CLUSTER_NAME = None
QUEUE_NAME = QueueName.OF
NODES = 1
PPN = 30
TIME_LIMIT = "12:00:00"

APPLICATION_VERSION = "7.5"
# selects the GBRV PBE pseudopotentials; QE_SYSTEM_SETTINGS sets the
# functional to RPBE
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry
QE_SYSTEM_SETTINGS = {
    "input_dft": "rpbe",
    "nspin": 1,
    "occupations": "smearing",
    "smearing": "mv",
    "degauss": 0.01,
}
QE_ELECTRONS_SETTINGS = {"mixing_mode": "local-TF", "mixing_beta": 0.2}
N_IMAGES = 1
NEB_MAXIMUM_ITERATIONS = 50
# k_max / k_min: the spring pair neb.x suggests in its output for this system
NEB_PATH_SETTINGS = {
    "nstep_path": NEB_MAXIMUM_ITERATIONS,
    "minimum_image": True,
    "k_max": 0.15,
    "k_min": 0.10,
}
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Monitor progress

The MACE relaxations and scans run in the notebook; with `RUN_DFT_NEB` set, it then polls the two NEB jobs.

### 5.5. Analyze results

The last cells print the barrier and the O–O distance at the transition state of each surface beside the
manuscript's values, and plot the scans. With the default `RUN_DFT_NEB = False`, only the `(MACE)` lines print;
with `True`, each surface's NEB lines follow its MACE lines:

```
Pt(111) barrier (MACE): 0.205 eV, Šljivančanin & Hammer 0.6 eV (-65.9 %)
Pt(111) O–O at the transition state (MACE): 1.80 Å, Šljivančanin & Hammer 2.4 Å (-25.0 %)
Pt(111) barrier: <value> eV, Šljivančanin & Hammer 0.6 eV (<value> %), largest image error <value> eV/Å
Pt(111) O–O at the climbing image: <value> Å, Šljivančanin & Hammer 2.4 Å (<value> %)
Pt(211) barrier (MACE): 0.740 eV, Šljivančanin & Hammer 0.9 eV (-17.8 %)
Pt(211) O–O at the transition state (MACE): 1.80 Å, Šljivančanin & Hammer 3.0 Å (-40.0 %)
Pt(211) barrier: <value> eV, Šljivančanin & Hammer 0.9 eV (<value> %), largest image error <value> eV/Å
Pt(211) O–O at the climbing image: <value> Å, Šljivančanin & Hammer 3.0 Å (<value> %)
```

## 6. Expected results

Table 1 of the manuscript gives the barrier from the O₂ precursor, computed with RPBE, as 0.6 eV on Pt(111)
(top–fcc–bridge, FIG. 1 A) and 0.9 eV at the Pt(211) step (top–bridge–top, FIG. 1 B), with an O–O distance at
the transition state of 2.4 Å and 3.0 Å. FIG. 2 draws the same barriers as energy levels measured from
gas-phase O₂; the scans and profiles here are measured from the precursor.

### 6.1. Comparison with published results

| | Šljivančanin & Hammer, RPBE | MACE scan (default) | RPBE NEB (`RUN_DFT_NEB = True`) |
|---|---|---|---|
| Pt(111) barrier | 0.6 eV | 0.205 eV (−65.9 %) | `<value>` eV (`<value>` %) |
| Pt(211) barrier | 0.9 eV | 0.740 eV (−17.8 %) | `<value>` eV (`<value>` %) |
| Pt(111) O–O at the transition state | 2.4 Å | 1.80 Å (−25.0 %) | `<value>` Å (`<value>` %) |
| Pt(211) O–O at the transition state | 3.0 Å | 1.80 Å (−40.0 %) | `<value>` Å (`<value>` %) |

The figure below shows the Pt(111) and Pt(211) panels of FIG. 2 of the manuscript (left) beside the MACE scans
of this tutorial (right), where the dashed lines mark the manuscript's barriers:

![O₂ dissociation energy on Pt(111) and Pt(211)](../../../images/tutorials/materials/defects/defect_surface_step_platinum/energy-profile-comparison.webp "O₂ dissociation energy: manuscript, FIG. 2 (left) vs. fixed O–O scans with MACE (right)")

## 7. Customization options

### 7.1. Choose the force field, the scan and the relaxation

`MACE_MODEL_FAMILY` and `MACE_MODEL` (cell 1.3) select the MACE force field; `MACE_DISPERSION = False` matches
the manuscript's RPBE, which has no dispersion correction. `FMAX` is the largest force on an atom at which each
relaxation stops: the manuscript's 0.1 eV/Å, which it applies to the total force. `OXYGEN_DISTANCE_STEP` is its
0.2 Å grid, from the first point above the precursor's O–O distance to below the dissociated pair's.

`RELAX = True` relaxes the four materials with MACE first, as the end points of the NEB. `RELAX = False` runs the
NEB on the structures as built; the scan always starts from the MACE-relaxed precursor.

### 7.2. Adjust computational resources

The compute settings apply to the NEB only. The default, `CLUSTER_NAME = None`, uses the account's first listed
cluster; setting a specific name picks that cluster instead, and a name that is not available makes the notebook
stop and list the ones that are. The OF queue runs one job on up to 10 nodes, the OR queue on one 16-core node;
`NODES` and `PPN` set the job's size.

### 7.3. Use the manuscript's settings

The MACE scan is the manuscript's method with a force field in place of its functional. `RUN_DFT_NEB = True`
adds the functional: one climbing-image NEB per surface with RPBE on the platform, each a multi-node job on the
OF queue. It is an NEB rather than a scan because the platform cannot hold a fixed O–O distance. Its cost
grows with `"kgrid"` in `SURFACES` (cell 1.2; the manuscript's 6×4×1 is on its own, smaller cells) and with
`N_IMAGES`; neb.x stops after `NEB_MAXIMUM_ITERATIONS`, converged or not, and the path is converged when the
largest image error on the barrier line is below 0.1 eV/Å. A new `"kgrid"` starts new NEB jobs; a new `N_IMAGES` or
`NEB_MAXIMUM_ITERATIONS` reuses the jobs already run on the same end points (section 4).

- **Pt(211) slab**: `THICKNESS = 3` in the [structure notebook](defect-surface-step-platinum.md) gives the
  manuscript's 12 (211) planes; made's (211) cell holds an even number of Pt along the step, so 3 is not reachable
- **Pt(111) slab**: stays at 3 layers, where the oxygen site of the structure notebook is the fcc hollow
- **Fixed atoms**: all atoms relax apart from the scanned O–O distance, as the platform's NEB keeps no fixed atoms

## 8. Troubleshooting

### 8.1. Material not found

If one of the four materials is not found in the `uploads` folder or the account's materials collection, run
the [Terrace Steps on Platinum (111) Surface](defect-surface-step-platinum.md) tutorial first, and check that
its `uploads` folder holds the four materials under the names of cell 1.2.

### 8.2. No cluster available

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to, and section
5.2 stops. A cluster has to be available to the account before the notebook can run.

### 8.3. No NEB barrier on the first run

The platform's access token lasts one hour and can expire while the notebook waits for the NEB jobs in section
7. The jobs keep running. Restart the kernel and run all cells again (*Kernel* > *Restart Kernel and Run All
Cells*): the notebook asks for a new login and picks up the running and finished jobs.

### 8.4. Barrier far from the published value

Check the atom counts printed in section 3 of the notebook first:

```
Pt(111) O2 precursor: 50 atoms
Pt(111) 2O dissociated: 50 atoms
Pt(211) step O2 precursor: 34 atoms
Pt(211) step 2O dissociated: 34 atoms
```

Then, if `RELAX` is set, view the relaxed materials, saved to the account as `<name> relaxed MACE-MP-0 large` when
`RUN_DFT_NEB` is set: the O atoms of each should still sit on the sites of section 4 of the structure tutorial.

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
