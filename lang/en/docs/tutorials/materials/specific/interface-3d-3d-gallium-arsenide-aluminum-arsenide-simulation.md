---
tags:
  - 3D
  - interface
  - superlattice
  - strain
  - gallium arsenide
  - aluminum arsenide
  - GaAs
  - AlAs
  - valence-band-offset
  - C-2D-INT-S

hide:
  - tags
# YAML header
render_macros: true
---

# GaAs/AlAs (110) Valence Band Offset

## 1. Introduction

This tutorial calculates the valence band offset ΔE_v of the GaAs/AlAs (110) interface, reproducing the result of the
following manuscript:

!!!note "Manuscript"
    **Yoyo Hinuma, Andreas Grüneis, Georg Kresse and Fumiyasu Oba**,
    "Band alignment of semiconductors from density-functional theory and many-body perturbation theory", Physical Review B 90, 155405
    (2014). [DOI: 10.1103/PhysRevB.90.155405](https://doi.org/10.1103/PhysRevB.90.155405){:target='_blank'}.
    [@Hinuma2014]

This tutorial builds upon the [GaAs/AlAs (110) Strained Superlattice](interface-3d-3d-gallium-arsenide-aluminum-arsenide.md)
tutorial, where the superlattice and the two strained bulk cells are created. Here, the platform's
[valence band offset](../../dft/electronic/valence-band-offset.md) workflow runs Quantum ESPRESSO on all three, and
the offset is assembled as in the manuscript: each bulk's valence band maximum E_VBM is measured from its own average
potential V̄, and the superlattice gives the step in V̄ between the two materials,

```
ΔE_v = (E_VBM − V̄)_GaAs − (E_VBM − V̄)_AlAs + (V̄_GaAs − V̄_AlAs)_superlattice
```

The manuscript gives ΔE_v = 0.45 eV at the PBE level, GaAs above AlAs (Table II).

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [GaAs/AlAs (110) Strained Superlattice](interface-3d-3d-gallium-arsenide-aluminum-arsenide.md) tutorial,
   using the `interface_3d_3d_gallium_arsenide_aluminum_arsenide.ipynb` notebook embedded in its section 6, to create and
   save `GaAs/AlAs (110) superlattice 12+12`, `GaAs (110) bulk strained` and `AlAs (110) bulk strained`, OR
2. Have the three materials saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure the material names, the Density Functional Theory (DFT)
   model, and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the superlattice and the two bulks, print their plane spacings
4. **Configure the model and k-grids**: One DFT model, a k-grid per material from one k-point density
5. **Configure compute resources**: Select the cluster, queue, and processor settings
6. **Configure the workflow**: The model, a k-grid per material, and the band structures the valence band maxima
   are read from
7. **Run the job**: One Valence Band Offset job, which runs a band structure and the electrostatic potential on
   each of the three materials
8. **Retrieve results**: The valence band maxima and average potentials, the offset, and the potential across the
   superlattice
9. **Compare with the manuscript**: Print our values beside Hinuma et al.'s

## 4. Calculation parameters

| | this tutorial | Hinuma et al. |
|---|---|---|
| Code | Quantum ESPRESSO | VASP |
| Functional | PBE | PBE |
| Pseudopotentials | ultrasoft, Garrity–Bennett–Rabe–Vanderbilt (GBRV) library, Ga 3d in valence | PAW, Ga 3d frozen in the core |
| Cutoff | 40 / 200 Ry | 550 eV for the bulks, not stated for the interface |
| k-points | 3.5 points per Å⁻¹: 6×4×1 superlattice, 4×3×6 bulks | 6×4×1 interface, 6×6×6 bulks |
| Cell | 12 + 12 planes, 48 atoms, a∥ = 5.713 Å, as built | 11 + 11 layers, out-of-plane lattice and positions relaxed |
| Reference potential V̄ | planar average of the electrostatic potential | average potential in each material |
| Spin–orbit | not included | included, as an HSE correction to each valence band maximum |

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the notebook:

```
other/materials_designer/specific_examples/interface_3d_3d_gallium_arsenide_aluminum_arsenide_SIMULATION.ipynb
```

### 5.2. Configure parameters

The parameters cells set the material names, the compute resources, and the DFT model:

```python
SUPERLATTICE_NAME = "GaAs/AlAs (110) superlattice 12+12"
SUBSTRATE_BULK_NAME = "GaAs (110) bulk strained"
FILM_BULK_NAME = "AlAs (110) bulk strained"

CLUSTER_NAME = "001"
QUEUE_NAME = QueueName.OR
PPN = 16
TIME_LIMIT = "04:00:00"

MODEL_SUBTYPE = "gga"
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
VALENCE_ELECTRONS_PER_ATOM = {"Ga": 19, "Al": 3, "As": 5}
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry
ADDITIONAL_PARAMETERS = {"electrons": {"mixing_mode": "local-TF", "mixing_beta": 0.2, "electron_maxstep": 200}}
KPOINT_DENSITY = 3.5  # points per Å⁻¹
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Analyze results

Section 8.1 of the notebook prints each bulk's valence band maximum, its average potential and its gap, and the
average potential of the GaAs and the AlAs block in the superlattice:

```
GaAs (110) bulk strained: E_VBM = 6.8978 eV, V̄ = 9.3124 eV, E_VBM - V̄ = -2.4146 eV, gap +0.289 eV
  in the superlattice: V̄ = 8.4115 eV, averaged over 4.0397 Å centred at z = 0.0000 Å
AlAs (110) bulk strained: E_VBM = 4.6237 eV, V̄ = 7.6018 eV, E_VBM - V̄ = -2.9781 eV, gap +1.476 eV
  in the superlattice: V̄ = 8.5044 eV, averaged over 4.0397 Å centred at z = 24.2382 Å
```

The valence band maximum is the top of band N_electrons / 2 along each bulk's k-path, and the gap the bottom of the
next band minus it. Each block is averaged over one period of the potential, two (110) planes, at its centre, away from
both interfaces. Section 8.3 plots the potential across the superlattice with the bulk potentials overlaid.

The last cell prints the offset beside the manuscript's values:

```
ΔE_v = 0.471 eV   paper 0.45 eV   deviation +4.6 %
GaAs valence band top above AlAs's   paper above
GaAs gap = 0.289 eV   paper 0.48 eV   deviation -39.8 %
AlAs gap = 1.476 eV   paper 1.32 eV   deviation +11.8 %
(E_VBM - V̄)_GaAs - (E_VBM - V̄)_AlAs = +0.56 eV
(V̄_GaAs - V̄_AlAs)_superlattice = -0.09 eV
```

## 6. Expected results

The manuscript's Table II lists ΔE_v = 0.45 eV for GaAs/AlAs at the PBE level, GaAs above AlAs, together with the
HSE and GW values and the experimental values from 0.15 to 0.55 eV for this pair:

![GaAs/AlAs in Table II of the manuscript](../../../images/tutorials/materials/interfaces/interface_3d_3d_gallium_arsenide_aluminum_arsenide/1-table-ii-from-manuscript.webp "Table II of the manuscript: valence band offsets for A/B heterointerfaces")

The manuscript's Table I lists the PBE bulk band gaps, 0.48 eV for GaAs and 1.32 eV for AlAs, at the experimental
lattice constants (GaAs 5.654 Å). The bulk cells of this tutorial are at the mean of the two lattice constants of the
platform's GaAs and AlAs structures, 5.713 Å.

### 6.1. Comparison with published results

| | ΔE_v (eV) | GaAs gap (eV) | AlAs gap (eV) |
|---|---|---|---|
| Hinuma et al. | 0.45 | 0.48 | 1.32 |
| This tutorial | 0.471 (+4.6 %) | 0.289 (−39.8 %) | 1.476 (+11.8 %) |

The offset splits into the bulk term (E_VBM − V̄)_GaAs − (E_VBM − V̄)_AlAs = +0.564 eV and the lineup
(V̄_GaAs − V̄_AlAs)_superlattice = −0.093 eV. The manuscript does not list the two terms.

Section 8.3 of the notebook plots the electrostatic potential across one period of the superlattice, from the
AlAs→GaAs interface: each bulk's own potential (dotted) shifted onto its block, and the two block averages (dashed).
The bulk potentials coincide with the superlattice's inside both blocks and depart from it only at the interfaces:

![Potential across the GaAs/AlAs (110) superlattice, this tutorial](../../../images/tutorials/materials/interfaces/interface_3d_3d_gallium_arsenide_aluminum_arsenide/2-potential-this-notebook.webp "Electrostatic potential across the GaAs/AlAs (110) superlattice, this tutorial")

## 7. Customization options

### 7.1. Adjust computational resources

`CLUSTER_NAME` selects the cluster by its full or partial name; a name that is not available makes the notebook
stop and list the ones that are.

## 8. Troubleshooting

### 8.1. Material not found

If one of the three names is not found in the `uploads` folder or the account's materials collection, run the
[GaAs/AlAs (110) Strained Superlattice](interface-3d-3d-gallium-arsenide-aluminum-arsenide.md) tutorial first, and
check that its `uploads` folder holds the materials under those exact names.

### 8.2. No cluster available

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to. A cluster has to be
available to the account before the notebook can run.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook calculates the valence band offset. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_3d_3d_gallium_arsenide_aluminum_arsenide_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
