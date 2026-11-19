---
tags:
  - hafnium dioxide
  - HfO2
  - ferroelectric
  - polarization switching
  - energy-barrier
  - nudged-elastic-band
  - X-3D-PER

hide:
  - tags
# YAML header
render_macros: true
---

# Ferroelectric Switching of HfO₂ along the S:T Pathway (Energy Barrier)

## 1. Introduction

This tutorial calculates the energy barrier of the uniform polarization reversal of bulk orthorhombic Pca2₁ HfO₂
along the S:T pathway, reproducing a result from the following manuscript:

!!!note "Manuscript"
    X. Mu, Y. Wu, B. Zeng, J. Jiang, Y. Zhou, L. Yin, M. Liao and Q. Yang, "Polarization switching of HfO2
    ferroelectric in bulk and electrode/ferroelectric/electrode heterostructure", npj Computational Materials 11, 126
    (2025). [DOI: 10.1038/s41524-025-01633-2](https://doi.org/10.1038/s41524-025-01633-2){:target='_blank'}.
    [@Mu2025]

This tutorial builds upon the [Ferroelectric Switching of HfO₂ along the S:T Pathway](perturbation-ferroelectric-switching-hafnium-dioxide.md)
tutorial, where the initial structure and the structure with the four three-fold coordinated O shifted through the Hf
plane are created. Here, both are relaxed with the cell fixed, and a climbing-image
[nudged elastic band]({{ reference_url }}/models/auxiliary-concepts/nudged-elastic-band/) (NEB) calculation runs
between them on the platform. The barrier is compared with Table 1 of the manuscript.

The figure below shows Fig. 1 of the manuscript; the path computed here is S:T, from the initial state (a) to the final
state (c):

![Polarization reversal pathways of Pca2₁ HfO₂](../../../images/tutorials/materials/defects/perturbation_ferroelectric_switching_hafnium_dioxide/0-figure-from-manuscript.webp "The eight 180° uniform polarization reversal pathways of Pca2₁ HfO₂, Fig. 1.")

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [Ferroelectric Switching of HfO₂ along the S:T Pathway](perturbation-ferroelectric-switching-hafnium-dioxide.md)
   tutorial, using the `perturbation_ferroelectric_switching_hafnium_dioxide.ipynb` notebook embedded in its
   section 6, to create and save `HfO2 Pca21` and `HfO2 Pca21 S:T switched`, OR
2. Have the two materials saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The barrier calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure material names, the Density Functional Theory (DFT) model,
   and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the two materials by name and print their atom counts
4. **Configure the model**: One DFT model for the relaxations and the NEB
5. **Configure compute resources**: Select the cluster, queue, nodes, and processor settings
6. **Relax the end points**: Both materials are relaxed on the platform with the cell fixed
7. **Run the nudged elastic band**: One climbing-image NEB runs between the two relaxed materials
8. **Retrieve results**: The NEB energy profile, the barrier, and the largest image error
9. **Compare with the manuscript**: Print the barrier beside Table 1's and plot the profile

## 4. Calculation parameters

The manuscript takes the bulk barrier of Table 1 from Wu et al. 2023 (its ref. 24) [@Wu2023] and does not restate
the settings behind it; the right column lists the manuscript's own settings (Methods, p. 6).

| | This tutorial | Mu et al., Methods |
|---|---|---|
| Code | Quantum ESPRESSO 7.5, on the platform | VASP |
| Functional | Perdew–Burke–Ernzerhof (PBE) | PBE |
| Pseudopotentials | ultrasoft, Garrity–Bennett–Rabe–Vanderbilt (GBRV) library: `hf_pbe_gbrv_1.0` (5s 5p semicore, 12 electrons) and `o_pbe_gbrv_1.2` | projector augmented-wave (PAW) |
| Cutoff | 40 / 200 Ry | 500 eV |
| k-points | 6 × 6 × 6 Monkhorst–Pack, shifted by half a step (`1 1 1`) | 6 × 6 × 6 Monkhorst–Pack |
| Spin, smearing | not spin-polarized, 0.005 Ry | not stated |
| Cell | unit cell, 4 Hf and 8 O, fixed: 5.2195 × 5.0048 × 5.0327 Å (Standata, mp-685097) | unit cell, 4 Hf and 8 O (Table 1, p. 4), fixed: 5.256 × 5.046 × 5.073 Å |
| End points | relaxed, all atoms, cell fixed | not stated |
| Transition state | climbing image, one intermediate image, path threshold 0.1 eV/Å | climbing-image NEB, number of images not stated |

A material already relaxed with the same `KGRID`, or still relaxing, is reused, and so is an NEB job of the same path
from the same initial material that is queued, running or finished with the same `KGRID`.

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the barrier notebook:

```
other/materials_designer/specific_examples/perturbation_ferroelectric_switching_hafnium_dioxide_SIMULATION.ipynb
```

### 5.2. Configure parameters

The parameters cells of section 1 set the material names, the manuscript's barrier, the compute resources, and the
DFT model:

```python
INITIAL_MATERIAL_NAME = "HfO2 Pca21"
FINAL_MATERIAL_NAME = "HfO2 Pca21 S:T switched"
PATH_NAME = "S:T"
MANUSCRIPT_BARRIER = 0.736

CLUSTER_NAME = None
QUEUE_NAME = QueueName.OF
NODES = 1
PPN = 36
TIME_LIMIT_HOURS = 4
MAX_SECONDS = TIME_LIMIT_HOURS * 3600 - 600

APPLICATION_VERSION = "7.5"
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry
KGRID = [6, 6, 6]
KGRID_SHIFTS = [1, 1, 1]
QE_SYSTEM_SETTINGS = {"nspin": 1, "degauss": 0.005}
RELAXATION_SETTINGS = {"max_seconds": MAX_SECONDS}
N_IMAGES = 1
NEB_PATH_SETTINGS = {"nstep_path": 50, "minimum_image": True}
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Monitor progress

The notebook submits the two relaxations, then the NEB, and polls each job on the platform until it finishes.

### 5.5. Analyze results

The last cells print the barrier beside the manuscript's value, with the largest image error of the converged path,
and plot the energy profile:

```
S:T barrier, Pca2₁ HfO₂: ours 0.684 eV/u.c. | Mu et al. 2025, Table 1 (from Wu et al. 2023), 0.736 eV/u.c.
Largest image error, S:T path: 0.089 eV/Å
```

## 6. Expected results

Table 1 of the manuscript (p. 4) gives the barrier of the uniform polarization reversal along the S:T pathway in bulk,
with the cell fixed, as 0.736 eV per unit cell of four Hf and eight O atoms (u.c.).

### 6.1. Comparison with published results

| | Mu et al., Table 1 | This tutorial |
|---|---|---|
| S:T barrier, bulk, fixed cell | 0.736 eV/u.c. (from ref. 24) | 0.684 eV/u.c. |

The figure below shows the energy profile of the NEB computed here, with the manuscript's barrier, 0.736 eV/u.c., as a
gray square at the reaction coordinate of the highest image:

![S:T energy profile of Pca2₁ HfO₂](../../../images/tutorials/materials/defects/perturbation_ferroelectric_switching_hafnium_dioxide/energy-profile-comparison.webp "S:T polarization reversal of Pca2₁ HfO₂: blue line, climbing-image NEB of this tutorial, barrier 0.684 eV/u.c.; gray square, Mu et al., Table 1, barrier 0.736 eV/u.c.")

### 6.2. Difference from the manuscript

These settings differ:

| Setting | Mu et al. | This tutorial | Parameter to change |
|---|---|---|---|
| Code, pseudopotentials | VASP, PAW (p. 6) | Quantum ESPRESSO, GBRV ultrasoft | — |
| Cutoff | 500 eV (p. 6) | 40 / 200 Ry | `ECUTWFC`, `ECUTRHO` |
| Lattice | 5.256 × 5.046 × 5.073 Å, the manuscript's PBE calculation (p. 6) | 5.2195 × 5.0048 × 5.0327 Å, Standata mp-685097 | — |
| Smearing | not stated | 0.005 Ry | `degauss` in `QE_SYSTEM_SETTINGS` |
| Intermediate images | not stated | one | `N_IMAGES` |

## 7. Customization options

`N_IMAGES` sets the number of intermediate images between the two relaxed materials.

## 8. Interactive JupyterLite notebook

The following JupyterLite notebook demonstrates the workflow for calculating the S:T polarization switching barrier
of Pca2₁ HfO₂. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/perturbation_ferroelectric_switching_hafnium_dioxide_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 9. References
