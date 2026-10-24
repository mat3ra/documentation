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

The structure notebook also builds the two symmetric whole-plane (011) slabs that the manuscript starts from, SrTiO-terminated (FIG. 3(c)) and O<sub>2</sub>-terminated (FIG. 3(b)), shown here in the Wave viewer:

![SrTiO-terminated SrTiO3(011) slab](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/srtio3-011-srtio-terminated-slab-wave.webp "SrTiO3(011) SrTiO-terminated seven-plane slab, Wave viewer")
![O2-terminated SrTiO3(011) slab](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/srtio3-011-o2-terminated-slab-wave.webp "SrTiO3(011) O2-terminated seven-plane slab, Wave viewer")


## 2. Prerequisites

The notebook loads six materials from the `uploads` folder or the account's materials collection by exact name, and raises when one is missing: the bulk cell `SrTiO3, Strontium Titanate, CUB (Pm-3m) 3D (Bulk), mp-5229` and the slabs `SrTiO3(011) TiO-terminated 7 planes`, `SrTiO3(011) Sr-terminated 7 planes`, `SrTiO3(011) O-terminated 7 planes`, `SrTiO3(001) SrO-terminated 7 planes` and `SrTiO3(001) TiO2-terminated 7 planes`. All six are saved by the notebook of the [SrTiO<sub>3</sub> Slab](slab-strontium-titanate.md) tutorial, which should be run first. It also saves the two charged whole-plane (011) slabs of FIG. 3(b) and 3(c); no energy is computed for them.


## 3. Workflow overview

Every energy comes from total energy jobs and the manuscript's Eqs. (1)-(5), evaluated in the notebook. The slabs of one group are stoichiometric together: TiO + Sr contain six bulk units, SrO + TiO<sub>2</sub> seven, and the O-terminated slab three on its own. Cleaving the crystal into the slabs of a group creates two surfaces per slab, and the manuscript divides the energy equally among them:

`E_cleav = [Σ E_slab(unrelaxed) − n E_bulk] / (2 m)`

with `n` the number of bulk units and `m` the number of slabs in the group. Each slab then adds its own relaxation energy, both faces relaxing, `E_rel = [E_slab(relaxed) − E_slab(unrelaxed)] / 2`, and its surface energy is `E_surf = E_cleav + E_rel`. The steps are:

1. **Set up the environment and parameters**: material names, Density Functional Theory (DFT) model, relaxation switch, and compute settings
2. **Authenticate and initialize API client**: connect to the platform
3. **Load the materials**: the bulk cell and the five slabs, with their compositions printed
4. **Configure the shared model and k-grid**: one DFT model and one k-point density for every cell
5. **Configure compute resources**: select cluster, queue, and processor settings
6. **Run the Total Energy jobs**: one on each cell as cut
7. **Relax the slabs**: only when `RELAX` is set, at fixed cell, all atoms
8. **Retrieve the results**: the total energies, and the cleavage, relaxation and surface energies
9. **Compare with the manuscript**: the computed values beside Table VII


## 4. Calculation parameters

| | this tutorial | Eglitis & Vanderbilt |
|---|---|---|
| Code | Quantum ESPRESSO | CRYSTAL-2003 |
| Functional | Perdew-Burke-Ernzerhof (PBE) | hybrid Becke three-parameter Perdew-Wang (B3PW) |
| Basis | plane waves, Garrity-Bennett-Rabe-Vanderbilt (GBRV) ultrasoft pseudopotentials, 40 / 200 Ry | Gaussian basis sets |
| Lattice constant | 3.913 Å (Standata, mp-5229) | 3.904 Å (B3PW) |
| Slabs | seven planes, 1×1, 9.8 Å of vacuum (011), 13.9 Å (001) | seven planes, 1×1, no vacuum (two-dimensional slab model) |
| k-points | density 6.5 Å⁻¹: 11×8×1 (011), 11×11×1 (001), 11×11×11 bulk | 8×8 |
| Relaxation | every atom, fixed cell, Quantum ESPRESSO's default force threshold | near-surface planes (two in Sec. III.B, three in Table VII) |
| Spin | spin-restricted | not stated |

The functional is the main difference: the manuscript gives no PBE surface energies. Cell 1.4 holds these settings:

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

The last cell prints, per termination, the computed cleavage energy beside the manuscript's and, with `RELAX = True`, the relaxation and surface energies:

```
Ours: pbe-us 40-200Ry k6.5, relaxed; paper: B3PW. Energies in eV.
TiO   cleavage 3.30 (paper 4.61)  relaxation -1.27 (paper -1.55)  surface 2.03 (paper 3.06)
Sr    cleavage 3.30 (paper 4.61)  relaxation -1.05 (paper -1.95)  surface 2.25 (paper 2.66)
O     cleavage 2.71 (paper 3.36)  relaxation -1.42 (paper -1.32)  surface 1.28 (paper 2.04)
SrO   cleavage 1.10 (paper 1.39)  relaxation -0.17 (paper -0.24)  surface 0.93 (paper 1.15)
TiO2  cleavage 1.10 (paper 1.39)  relaxation -0.16 (paper -0.16)  surface 0.94 (paper 1.23)
```


## 6. Comparison with the manuscript

Energies per 1×1 surface cell, in eV: Table VII of the manuscript (B3PW) and this tutorial (PBE).

| Termination | Value | Paper | Ours |
|---|---|---|---|
| (011) TiO | Cleavage | 4.61 | 3.30 |
| | Relaxation | −1.55 | −1.27 |
| | Surface | 3.06 | 2.03 |
| (011) Sr | Cleavage | 4.61 | 3.30 |
| | Relaxation | −1.95 | −1.05 |
| | Surface | 2.66 | 2.25 |
| (011) O | Cleavage | 3.36 | 2.71 |
| | Relaxation | −1.32 | −1.42 |
| | Surface | 2.04 | 1.28 |
| (001) SrO | Cleavage | 1.39 | 1.10 |
| | Relaxation | −0.24 | −0.17 |
| | Surface | 1.15 | 0.93 |
| (001) TiO<sub>2</sub> | Cleavage | 1.39 | 1.10 |
| | Relaxation | −0.16 | −0.16 |
| | Surface | 1.23 | 0.94 |


## 7. Customization options

### 7.1. Run the relaxed regime

The default `RELAX = False` computes the cleavage energies from six Total Energy jobs. Setting `RELAX = True` in cell 1.3 adds one fixed-cell relaxation per slab, five jobs, and prints the relaxation and surface energies as well. The relaxed energy is the relaxation job's own.

### 7.2. Adjust computational resources

The default, `CLUSTER_NAME = None`, uses the account's first listed cluster; setting a specific name picks that cluster instead, and a name that is not available makes the notebook stop and list the ones that are.

### 7.3. Use thicker slabs

The manuscript checks that nine-plane slabs change the energies by less than 0.01 eV. Setting `NUMBER_OF_PLANES = 9` in the structure notebook saves the slabs as `... 9 planes`; here, the names in cell 1.2 then change to those.


## 8. Troubleshooting

### 8.1. Material not found

Loading raises when a name is missing from the `uploads` folder and the account's materials collection. Run the notebook of the [SrTiO<sub>3</sub> Slab](slab-strontium-titanate.md) tutorial, which saves the six materials under the names in cell 1.2.

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
