---
tags:
  - 2d-materials
  - layers
  - bilayer
  - twisted
  - commensurate
  - boron
  - nitride
  - band-structure
  - flat-bands
  - C-2D-INT-C

hide:
  - tags
# YAML header
render_macros: true
---

# Twisted Bilayer h-BN Flat Bands

## 1. Introduction

This tutorial calculates the band structure of the twisted bilayer hexagonal boron nitride (h-BN)
created in the [structure creation tutorial](interface-bilayer-twisted-commensurate-lattices-boron-nitride.md)
and reads off the width of its top set of flat valence bands, as in the following manuscript.

!!!note "Manuscript"
    **Lede Xian, Dante M. Kennes, Nicolas Tancogne-Dejean, Massimo Altarelli, and Angel Rubio**,
    "Multiflat Bands and Strong Correlations in Twisted Bilayer Boron Nitride: Doping-Induced Correlated Insulator and Superconductor" Nano Lett. 19, 4934–4940 (2019)
    [DOI: 10.1021/acs.nanolett.9b00986](https://doi.org/10.1021/acs.nanolett.9b00986) [@Xian2020]

![Twisted bilayer h-BN from the manuscript and the structure notebook](../../../images/tutorials/materials/interfaces/twisted-bilayer-boron-nitride/commensurate-top-view-comparison.webp "Top view: Xian et al. 2019, Fig. 1a,b, configurations α (a) and β (b) with the moiré cell outlined (left), and the 7.34° configuration α bilayer built by the structure notebook, 244 atoms, B pink, N blue, cell outlined (right)")

### 1.1. What the manuscript found

The manuscript computes the band structure of unrelaxed twisted bilayers along Γ–K–M of the moiré
cell. The top set of valence bands is flat, and its width decreases from 101.4 meV at 7.34° to
1.6 meV at 2.64° (text p. 4936; Fig. 1g). This tutorial computes the 7.34° point.


## 2. Prerequisites

Run the
[structure creation tutorial](interface-bilayer-twisted-commensurate-lattices-boron-nitride.md)
first. Its notebook saves the bilayer into the `uploads` folder under the name
`h-BN bilayer 7.34deg alpha d3.23`, and this notebook loads it back by exactly that name.

## 3. What is calculated

One job runs the Standata "Band Structure" workflow (`band_structure.json`) on the bilayer built by
the structure notebook. It chains `pw_scf`, the self-consistent run at Γ, and `pw_bands`, the bands
along Γ–K–M of the moiré cell.

| structure | twist | interlayer distance | atoms |
|---|---|---|---|
| `h-BN bilayer 7.34deg alpha d3.23` | 60° + 7.34° (α) | 3.23 Å | 244 |

### 3.1. The structure is not relaxed

The manuscript's band widths are computed with flat layers 3.23 Å apart (p. 4935–4936). The
structure notebook builds the bilayer the same way, and the workflow has no relaxation step.

### 3.2. Which configuration the twist angle gives

Configurations α and β share one moiré cell and their twist angles differ by 60° (p. 4935). Their
unrelaxed band structures are almost identical, and the manuscript does not say which one Fig. 1g
uses (p. 4936). With the h-BN from Standata, the structure notebook's
`TARGET_TWIST_ANGLE = 60 + 7.34` gives α, and `7.34` gives β.


## 4. Calculation parameters

The manuscript used VASP with the local density approximation (LDA) and projector augmented-wave
(PAW) pseudopotentials (Supporting Information, p. 2):

| | this tutorial | manuscript |
|---|---|---|
| Code | Quantum ESPRESSO | VASP |
| Functional | LDA (`pz`) | LDA |
| Pseudopotentials | ultrasoft (GBRV) | PAW |
| Cutoff | 40 Ry wavefunction, 200 Ry density | 400 eV |
| Self-consistent k-points | Γ | Γ |
| Band path | Γ–K–M, 7 points | Γ–K–M, number of points not stated |
| Lattice constant | 2.509 Å (Standata) | 2.512 Å |
| Interlayer distance | 3.23 Å | 3.23 Å |
| Vacuum | 20 Å above the top layer | not stated |
| Spin polarization | off | not stated |
| Geometry | not relaxed | not relaxed |

Cell 1.3 sets the DFT parameters:

```python
MODEL_SUBTYPE = "lda"
FUNCTIONAL = "pz"
PSEUDOPOTENTIAL_TYPE = "us"  # GBRV
ECUTWFC = 40  # Ry
ECUTRHO = 200  # Ry; paper: VASP PAW, 400 eV

KGRID = [1, 1, 1]  # Γ only, as the paper's self-consistent run
# paper: Γ–K–M, number of points not stated; ours 7, evenly spaced (|ΓK| = 2|KM|)
KPATH = [
    {"point": "Γ", "steps": 4},
    {"point": "K", "steps": 2},
    {"point": "M", "steps": 1},
]
MODEL_TAG = (f"{FUNCTIONAL}-{PSEUDOPOTENTIAL_TYPE} {ECUTWFC}-{ECUTRHO}Ry k{KGRID[0]} "
             f"p{sum(point['steps'] for point in KPATH)}")

SCF_UNIT = "pw_scf"
BANDS_UNIT = "pw_bands"

PLOT_ENERGY_RANGE = (-0.5, 0.1)  # eV, relative to the top of the flat bands
```

### 4.1. K-point sampling

`KGRID = [1, 1, 1]` samples the Γ point only, as the manuscript's self-consistent run (Supporting
Information, p. 2). `KPATH` lists the vertices of the path and the number of steps from each to the
next; the `steps` values set how many points the bands are computed at. The manuscript does not
state its number of path points.

### 4.2. The band structure path belongs to the moiré cell

The path is Γ–K–M of the moiré cell, as in the manuscript's Fig. 1f and Supporting Information
Fig. S2. The manuscript gives the width of "the top of the valence bands (the first set of flat
bands)" without saying where in the Brillouin zone it is taken (p. 4936). Here it is the spread of
the top valence flat set over the points of `KPATH`, vertices included. The set starts at the
highest occupied band and takes in each band below whose maximum reaches the set's minimum; its
separation is the distance from the set's minimum down to the maximum of the next band.


## 5. Step-by-step instructions

### 5.1. Create the structure

Run the
[structure creation notebook](interface-bilayer-twisted-commensurate-lattices-boron-nitride.md).
Its default parameters build the 7.34° α bilayer and save it as `h-BN bilayer 7.34deg alpha d3.23`.

### 5.2. Open the simulation notebook

```
other/materials_designer/specific_examples/interface_bilayer_twisted_commensurate_lattices_boron_nitride_SIMULATION.ipynb
```

### 5.3. Select the material

Cell 1.2 holds the material name, the workflow and the compute settings:

```python
from datetime import datetime
from mat3ra.ide.compute import QueueName

ORGANIZATION_NAME = None  # set to your organization name (full or partial); otherwise, your default one is used
FOLDER = "./uploads"
MATERIAL_NAME = "h-BN bilayer 7.34deg alpha d3.23"  # as saved by the structure notebook

WORKFLOW_SEARCH_TERM = "band_structure.json"
MY_WORKFLOW_NAME = "Band Structure"
APPLICATION_NAME = "espresso"

CLUSTER_NAME = None  # specify full or partial name i.e. "cluster-001" to select
QUEUE_NAME = QueueName.OR
PPN = 16  # OR allows 16 cores per job
TIME_LIMIT = "04:00:00"

timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
POLL_INTERVAL = 60  # seconds
```

`MATERIAL_NAME` must match the name the structure notebook saved. Set `ORGANIZATION_NAME` to the
account's organization.

### 5.4. Run the notebook

Select *Run* > *Run All*. The notebook will
[authenticate with the platform]({{ interface_url }}/jupyterlite/authentication.md), load and save
the material, submit the job and wait for it. Section 7 reads the band structure, the flat-band
width and the separation, and section 8 prints them beside the manuscript's value.


## 6. Expected results

### 6.1. Flat-band width against twist angle

The last cell prints the number of bands in the top valence flat set and its width along Γ–K–M
beside the manuscript's value, and the separation of the set from the bands below:

| quantity | this tutorial | manuscript |
|---|---|---|
| width of the top valence flat set (2 bands), along Γ–K–M | 101.3 meV | 101.4 meV (text p. 4936; Fig. 1g) |
| separation from the bands below | 57.6 meV | not given at 7.34° |

![Width of the top valence flat bands against twist angle from the manuscript, and bands near the valence-band top from the simulation notebook](../../../images/tutorials/materials/interfaces/twisted-bilayer-boron-nitride/flat-bands-results-comparison.webp "Xian et al. 2019, Fig. 1g: width of the top set of valence flat bands of unrelaxed twisted bilayer h-BN against twist angle, CC-BY (left); the simulation notebook: bands near the valence-band top of the 7.34° configuration α bilayer along Γ–K–M, energies relative to the top of the flat set (right)")

### 6.2. Band structure

Section 7.3 of the notebook plots the bands within `PLOT_ENERGY_RANGE` of the top of the flat set.
The manuscript plots such bands at 2.64° (Fig. 1f) and from 5.08° to 2.64° (Supporting Information,
Fig. S2), not at 7.34°.

## 7. Troubleshooting

### 7.1. Material not found

`ValueError: No material named …` means the structure notebook has not been run, or `MATERIAL_NAME`
differs from the name it saved. Run the
[structure tutorial](interface-bilayer-twisted-commensurate-lattices-boron-nitride.md) first.


## 8. Interactive JupyterLite notebook

The notebook below calculates the band structure and prints the comparison. Select
*Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_bilayer_twisted_commensurate_lattices_boron_nitride_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 9. References
