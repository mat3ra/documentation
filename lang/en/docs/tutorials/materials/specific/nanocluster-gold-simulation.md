---
tags:
  - gold
  - cluster
  - nanoparticle
  - cuboctahedron
  - icosahedron
  - energy per atom
  - P-0D-NPR

hide:
  - tags
# YAML header
render_macros: true
---

# Energy per Atom of Gold Nanoclusters

## 1. Introduction

This tutorial calculates the energy per atom of cuboctahedral and icosahedral gold clusters with N = 30 to 60 atoms, relative to bulk gold, reproducing Fig. 4 of the following manuscript:

!!!note "Manuscript"
    A. H. Larsen, J. Kleis, K. S. Thygesen, J. K. Nørskov, and K. W. Jacobsen, "Electronic shell structure and chemisorption on gold nanoparticles", Physical Review B 84, 245429 (2011).
    [DOI: 10.1103/PhysRevB.84.245429](https://doi.org/10.1103/PhysRevB.84.245429){:target='_blank'}. [@Larsen2011]

This tutorial builds upon the [Gold Nanoclusters](nanocluster-gold.md) tutorial, where the clusters are created. The closed shells of 55 and 147 atoms are the regular shapes of FIG. 2 of the manuscript; every size in between is made from the next larger closed shell by removing a randomly chosen lowest-coordinated atom, one at a time (Sec. III C of the manuscript).

![Gold Nanoparticles](../../../images/tutorials/materials/0d_materials/nanocluster_gold/0-manuscript-image.webp "Cuboctahedra and icosahedra of 55, 147 and 309 atoms, FIG. 2.")


## 2. Prerequisites

The notebook loads each cluster from the `uploads` folder or the account's materials collection by exact name, `Au<N> <Shape>`, e.g. `Au55 Icosahedron`, and raises when one is missing. The clusters are saved by the notebook of the [Gold Nanoclusters](nanocluster-gold.md) tutorial, which should be run first with the same shapes and sizes. Bulk gold, `Gold`, is loaded from Standata.


## 3. Workflow overview

Every energy comes from the platform's jobs: a Total Energy job on bulk gold and one fixed-cell relaxation per cluster. As in Fig. 4 of the manuscript, the energy of an N-atom cluster is measured from N atoms of bulk gold, per atom:

`ΔE(N) = [E(Au_N) − N E_bulk] / N`

with `E(Au_N)` the final energy of the cluster's relaxation and `E_bulk` the total energy per atom of bulk gold. The steps are:

1. **Set up the environment and parameters**: cluster names, Density Functional Theory (DFT) model, relaxation settings, and compute settings
2. **Authenticate and initialize API client**: connect to the platform
3. **Load the materials**: the clusters by name and bulk gold, with their sizes and cells printed
4. **Configure the DFT model**: one model for bulk gold and every cluster
5. **Configure compute resources**: select cluster, queue, and processor settings
6. **Run the Total Energy job**: on bulk gold
7. **Relax the clusters**: every atom, at fixed cell
8. **Retrieve the results**: the total energies and the energy per atom relative to bulk
9. **Compare with the manuscript**: the computed values over Fig. 4


## 4. Calculation parameters

| | this tutorial | Larsen et al. |
|---|---|---|
| Code | Quantum ESPRESSO | GPAW |
| Functional | Perdew-Burke-Ernzerhof (PBE) | revised PBE (RPBE) |
| Basis | plane waves, Garrity-Bennett-Rabe-Vanderbilt (GBRV) ultrasoft pseudopotentials, 40 / 200 Ry | localized double-zeta polarized (DZP) basis, 0.2 Å real-space grid |
| Au valence electrons | 11 | 11 |
| Clusters | stripped from the 55- and 147-atom shells, one random seed, 5.0 Å of vacuum on each side | stripped from the 55- and 147-atom shells, four random seeds, 5.0 Å of vacuum |
| Bulk gold | face-centered cubic, a = 4.171 Å (Standata, mp-81), 16×16×16 k-points | not stated |
| k-points (clusters) | Γ point | Γ point (non-periodic cell) |
| Relaxation | every atom, fixed cell, forces below 0.075 eV/Å | forces below 0.075 eV/Å |
| Smearing | 0.005 Ry | Fermi temperature 0.01 eV (p. 245429-2); 0.1 eV (p. 245429-6) |
| Spin | spin-paired | spin-paired |

The platform's Quantum ESPRESSO has no RPBE, so the calculation uses PBE. Cell 1.4 holds these settings:

```python
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry, GBRV's recommended wavefunction cutoff
ECUTRHO = 200  # Ry, GBRV's recommended charge-density cutoff

BULK_KGRID = [16, 16, 16]
CLUSTER_KGRID = [1, 1, 1]  # Γ point, the clusters are isolated
RELAXATION_SETTINGS = {"forc_conv_thr": 2.9e-3, "nstep": 100}  # Ry/Bohr, the manuscript's 0.075 eV/Å
```

`forc_conv_thr` is the force threshold of Quantum ESPRESSO, in Ry/Bohr; `nstep` is the largest number of ionic steps of one relaxation.


## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the simulation notebook:

```
other/materials_designer/specific_examples/nanocluster_gold_SIMULATION.ipynb
```

### 5.2. Set the shapes and sizes

Cell 1.2 selects the clusters. By default it relaxes the 55-atom icosahedron only; the commented-out values select both shapes and every size from 30 to 60:

```python
ELEMENT = "Au"
SHAPES = ["icosahedron"]  # , "cuboctahedron"
CLUSTER_SIZES = [55]  # list(range(30, 61))
BULK_NAME = "Gold"
COMPARISON_SIZES = [34, 40, 55, 58, 60]  # sizes printed beside the manuscript's values
```

### 5.3. Set the compute resources

Cell 1.3 sets the cluster, queue, number of cores and time limit of every job:

```python
CLUSTER_NAME = None
QUEUE_NAME = QueueName.OR
PPN = 16  # OR allows 16 cores per job
TIME_LIMIT = "04:00:00"
```

### 5.4. Run the notebook

Execute all cells by selecting *Run* > *Run All Cells*. The notebook [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md), then runs the steps listed in section 3.

### 5.5. Read the results

Section 8.1 of the notebook prints the total energy per atom of bulk gold and, per cluster, the final energy of the relaxation and Quantum ESPRESSO's total force, the norm over all atoms. Section 9 plots ΔE(N) of each relaxed cluster over the manuscript's Fig. 4, where the four random seeds of each shape form a band, and the last cell prints, per cluster in `COMPARISON_SIZES`, the manuscript's value beside ours. With the default settings:

```
ΔE, Au55 Icosahedron: Larsen 2011 0.602 eV/atom | ours TODO(run) eV/atom
```

Between the closed shells the manuscript's value is the range over its four seeds.


## 6. Comparison with the manuscript

Energy per atom relative to bulk gold, in eV/atom: Fig. 4 of the manuscript (RPBE; lowest–highest over four seeds) and this tutorial (PBE; one seed).

| Cluster | Manuscript | Ours |
|---|---|---|
| Au34 Cuboctahedron | 0.683–0.720 | TODO(run) |
| Au40 Cuboctahedron | 0.683–0.715 | TODO(run) |
| Au55 Cuboctahedron | 0.616 | TODO(run) |
| Au58 Cuboctahedron | 0.559–0.578 | TODO(run) |
| Au60 Cuboctahedron | 0.584–0.585 | TODO(run) |
| Au34 Icosahedron | 0.666–0.703 | TODO(run) |
| Au40 Icosahedron | 0.690–0.706 | TODO(run) |
| Au55 Icosahedron | 0.602 | TODO(run) |
| Au58 Icosahedron | 0.556–0.558 | TODO(run) |
| Au60 Icosahedron | 0.554–0.555 | TODO(run) |


## 7. Customization options

### 7.1. Run the whole series

Setting `SHAPES = ["icosahedron", "cuboctahedron"]` and `CLUSTER_SIZES = list(range(30, 61))` in cell 1.2 relaxes both shapes at every size from 30 to 60, 62 relaxations, and plots the whole curve. The structure notebook saves the same clusters when its own `SHAPES` and `CLUSTER_SIZES` are set the same way.

### 7.2. Adjust computational resources

The default, `CLUSTER_NAME = None`, uses the account's first listed cluster; setting a specific name picks that cluster instead, and a name that is not available makes the notebook stop and list the ones that are. `PPN` and `TIME_LIMIT` in cell 1.3 set the cores and wall time of every job.


## 8. Troubleshooting

### 8.1. Material not found

Loading raises when a name is missing from the `uploads` folder and the account's materials collection. Run the notebook of the [Gold Nanoclusters](nanocluster-gold.md) tutorial with the same `SHAPES` and `CLUSTER_SIZES`; it saves the clusters under the names `Au<N> <Shape>`.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook calculates the energy per atom of the gold clusters. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/nanocluster_gold_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 10. References
