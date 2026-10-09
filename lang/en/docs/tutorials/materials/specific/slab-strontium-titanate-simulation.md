---
tags:
  - slab
  - strontium titanate
  - SrTiO3
  - terminations
  - surface
  - surface-energy
  - P-2D-SLB-S

hide:
  - tags
# YAML header
render_macros: true
---

# SrTiO3 Surface Energies of (011) and (001) Terminations

## 1. Introduction

This tutorial calculates the cleavage, relaxation and surface energies of five SrTiO<sub>3</sub> slabs, reproducing Table VII of the following manuscript:

!!!note "Manuscript"
    R. I. Eglitis and David Vanderbilt, "First-principles calculations of atomic and electronic structure of SrTiO3 (001) and (011) surfaces", Physical Review B 77, 195408 (2008).
    [DOI: 10.1103/PhysRevB.77.195408](https://doi.org/10.1103/PhysRevB.77.195408){:target='_blank'}. [@Eglitis2008]

This tutorial builds upon the [SrTiO<sub>3</sub> Slab](slab-strontium-titanate.md) tutorial, where the slabs are created. The (011) planes of SrTiO<sub>3</sub> alternate between SrTiO and O<sub>2</sub> (FIG. 2 of the manuscript), both charged, so a slab cut on whole planes is either polar or charged. The manuscript removes atoms from both outer planes of a symmetric seven-plane slab and obtains three neutral, mirror-symmetric terminations: TiO (16 atoms), Sr (14 atoms) and O (15 atoms, the only stoichiometric one). The (001) SrO- and TiO<sub>2</sub>-terminated seven-plane slabs (17 and 18 atoms) are computed as well.

![SrTiO3(011) cleavage planes](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/0-figure-from-manuscript.webp "SrTiO and O2 cleavage planes of SrTiO3(011), FIG. 2.")


## 2. Prerequisites

The notebook loads six materials from the `uploads` folder or the account's materials collection by exact name, and raises when one is missing: the bulk cell `SrTiO3, Strontium Titanate, CUB (Pm-3m) 3D (Bulk), mp-5229` and the slabs `SrTiO3(011) TiO-terminated 7 planes`, `SrTiO3(011) Sr-terminated 7 planes`, `SrTiO3(011) O-terminated 7 planes`, `SrTiO3(001) SrO-terminated 7 planes` and `SrTiO3(001) TiO2-terminated 7 planes`. All six are saved by the notebook of the [SrTiO<sub>3</sub> Slab](slab-strontium-titanate.md) tutorial, which should be run first. It also saves the two charged whole-plane (011) slabs of FIG. 3(b) and 3(c); no energy is computed for them.


## 3. Workflow overview

Every energy comes from total energy jobs and the manuscript's Eqs. (1)-(5), evaluated in the notebook. The slabs of one group are stoichiometric together: TiO + Sr contain six bulk units, SrO + TiO<sub>2</sub> seven, and the O-terminated slab three on its own. Cleaving the crystal into the slabs of a group creates two surfaces per slab, and the manuscript divides the energy equally among them:

`E_cleav = [Σ E_slab(unrelaxed) − n E_bulk] / (2 m)`

with `n` the number of bulk units and `m` the number of slabs in the group. Each slab then adds its own relaxation energy, both faces relaxing, `E_rel = [E_slab(relaxed) − E_slab(unrelaxed)] / 2`, and its surface energy is `E_surf = E_cleav + E_rel`. The equal split is a convention: the sum `E_surf(TiO) + E_surf(Sr)` does not depend on it. The steps are:

1. **Set up the environment and parameters**: material names, Density Functional Theory (DFT) model, relaxation switch, and compute settings
2. **Authenticate and initialize API client**: connect to the platform
3. **Load the materials**: the bulk cell and the five slabs, with their compositions printed
4. **Configure the shared model and k-grid**: one DFT model and one k-point density for every cell
5. **Configure compute resources**: select cluster, queue, and processor settings
6. **Run the Total Energy jobs**: one on each cell as cut
7. **Relax the slabs**: only when `RELAX` is set, at fixed cell, all atoms
8. **Retrieve the results**: the total energies, and the cleavage, relaxation and surface energies
9. **Compare with the manuscript**: our values beside Table VII, with the deviation in percent


## 4. Calculation parameters

| | this tutorial | Eglitis & Vanderbilt |
|---|---|---|
| Code | Quantum ESPRESSO | CRYSTAL-2003 |
| Functional | Perdew-Burke-Ernzerhof (PBE) | hybrid B3PW |
| Basis | plane waves, GBRV ultrasoft pseudopotentials, 40 / 200 Ry | Gaussian basis sets |
| Lattice constant | 3.913 Å (Standata, mp-5229) | 3.904 Å (B3PW) |
| Slabs | seven planes, 1×1, about 10 Å of vacuum (printed by the structure notebook) | seven planes, 1×1, no vacuum (two-dimensional slab model) |
| k-points | density 6.5 Å⁻¹: 11×8×1 (011), 11×11×1 (001), 11×11×11 bulk | 8×8 |
| Relaxation | every atom, fixed cell, Quantum ESPRESSO's default force threshold | near-surface planes (two in Sec. III.B, three in Table VII) |
| Spin | spin-restricted | not stated |

The functional is the main difference: the manuscript gives no PBE surface energies, so absolute shifts from Table VII are expected. The parameters cells hold these settings:

```python
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry, GBRV's recommended wavefunction cutoff
ECUTRHO = 200  # Ry, GBRV's recommended charge-density cutoff
KPOINT_DENSITY = 6.5  # Å⁻¹
```


## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the simulation notebook:

```
other/materials_designer/specific_examples/slab_strontium_titanate_SIMULATION.ipynb
```

### 5.2. Set the material names

Cell 1.2 names the materials and groups the slabs that share a cleavage energy:

```python
SLAB_NAMES = {
    "TiO": "SrTiO3(011) TiO-terminated 7 planes",
    "Sr": "SrTiO3(011) Sr-terminated 7 planes",
    "O": "SrTiO3(011) O-terminated 7 planes",
    "SrO": "SrTiO3(001) SrO-terminated 7 planes",
    "TiO2": "SrTiO3(001) TiO2-terminated 7 planes",
}
CLEAVAGE_GROUPS = [("TiO", "Sr"), ("O",), ("SrO", "TiO2")]
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All Cells*. The notebook [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md), then runs the steps listed in section 3.

### 5.4. Read the results

The last cell prints, per termination, our cleavage energy beside the manuscript's and, with `RELAX = True`, the relaxation and surface energies, the TiO + Sr sum and the order of the (011) surface energies:

```
Ours: pbe-us 40-200Ry k6.5, relaxed; paper: B3PW. Energies in eV.
TiO   cleavage 3.30 (paper 4.61, -28.4 %)  relaxation -1.27 (paper -1.55, +17.9 %)  surface 2.03 (paper 3.06, -33.7 %)
Sr    cleavage 3.30 (paper 4.61, -28.4 %)  relaxation -1.05 (paper -1.95, +46.2 %)  surface 2.25 (paper 2.66, -15.3 %)
O     cleavage 2.71 (paper 3.36, -19.5 %)  relaxation -1.42 (paper -1.32, -7.9 %)  surface 1.28 (paper 2.04, -37.2 %)
SrO   cleavage 1.10 (paper 1.39, -20.6 %)  relaxation -0.17 (paper -0.24, +27.4 %)  surface 0.93 (paper 1.15, -19.2 %)
TiO2  cleavage 1.10 (paper 1.39, -20.6 %)  relaxation -0.16 (paper -0.16, +0.3 %)  surface 0.94 (paper 1.23, -23.3 %)
TiO + Sr = 4.28 (paper 5.72, -25.1 %)
(011), lowest first: O < TiO < Sr (paper O < Sr < TiO)
```


## 6. Expected results

Table VII of the manuscript gives the energies per 1×1 surface cell, in eV:

| Termination | Cleavage | Relaxation | Surface |
|---|---|---|---|
| (011) TiO | 4.61 | −1.55 | 3.06 |
| (011) Sr | 4.61 | −1.95 | 2.66 |
| (011) O | 3.36 | −1.32 | 2.04 |
| (001) SrO | 1.39 | −0.24 | 1.15 |
| (001) TiO<sub>2</sub> | 1.39 | −0.16 | 1.23 |

The O-terminated (011) surface is the lowest in every method the manuscript compares, while the order of TiO and Sr differs between methods (Sec. IV).

### 6.1. Comparison with published results

Surface energies per 1×1 cell, in eV, this tutorial (PBE) beside Table VII (B3PW):

| Termination | Cleavage | Relaxation | Surface | Surface, manuscript |
|---|---|---|---|---|
| (011) TiO | 3.30 | −1.27 | 2.03 | 3.06 |
| (011) Sr | 3.30 | −1.05 | 2.25 | 2.66 |
| (011) O | 2.71 | −1.42 | 1.28 | 2.04 |
| (001) SrO | 1.10 | −0.17 | 0.93 | 1.15 |
| (001) TiO<sub>2</sub> | 1.10 | −0.16 | 0.94 | 1.23 |

The PBE cleavage energies are 20-28 % below the B3PW ones, and the surface energies 15-37 % below; the sum TiO + Sr is 4.28 eV against 5.72 eV. The O-terminated (011) surface is the lowest, as in the manuscript. TiO and Sr come out in the opposite order, which the manuscript reports as method-dependent.


## 7. Customization options

### 7.1. Run the relaxed regime

The default `RELAX = False` computes the cleavage energies from six Total Energy jobs. Setting `RELAX = True` in cell 1.3 adds one fixed-cell relaxation per slab, five jobs, and prints the relaxation and surface energies as well. The relaxed energy is the relaxation job's own.

### 7.2. Adjust computational resources

The default, `CLUSTER_NAME = None`, uses the account's first listed cluster; setting a specific name picks that cluster instead, and a name that is not available makes the notebook stop and list the ones that are.


## 8. Troubleshooting

### 8.1. Material not found

Loading raises when a name is missing from the `uploads` folder and the account's materials collection. Run the notebook of the [SrTiO<sub>3</sub> Slab](slab-strontium-titanate.md) tutorial, which saves the six materials under the names in cell 1.2.

### 8.2. A group is not stoichiometric

Section 8.2 of the notebook raises `ValueError: ... is not stoichiometric` when the slabs of a group do not add up to whole SrTiO<sub>3</sub> units, for instance after a slab name in cell 1.2 was changed to a slab with a different number of planes. Each group in `CLEAVAGE_GROUPS` has to hold complementary slabs of the same thickness.


## 9. Interactive JupyterLite notebook

The following JupyterLite notebook calculates the surface energies of the SrTiO<sub>3</sub> slabs. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/slab_strontium_titanate_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 10. References
