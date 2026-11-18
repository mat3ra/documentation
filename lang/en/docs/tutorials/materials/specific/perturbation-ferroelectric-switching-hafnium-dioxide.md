---
tags:
  - hafnium dioxide
  - HfO2
  - ferroelectric
  - polarization switching
  - perturbation
  - Hf
  - O
  - X-3D-PER

hide:
  - tags
# YAML header
render_macros: true
---

# Ferroelectric Switching of HfO₂ along the S:T Pathway

## 1. Introduction

This tutorial creates the initial and final structures of the S:T polarization reversal of orthorhombic Pca2₁ HfO₂
from the following manuscript:

!!!note "Manuscript"
    **Xinpeng Mu, Yao Wu, Binjian Zeng, Jie Jiang, Yichun Zhou, Lu Yin, Min Liao and Qiong Yang**,
    "Polarization switching of HfO2 ferroelectric in bulk and electrode/ferroelectric/electrode heterostructure",
    npj Computational Materials 11, 126 (2025).
    [DOI: 10.1038/s41524-025-01633-2](https://doi.org/10.1038/s41524-025-01633-2){:target='_blank'}.
    [@Mu2025]

The manuscript names the pathways of the 180° polarization reversal by the way the three-fold coordinated O move
(p. 2): "the three-fold coordinated O shifting through (denoted by T) or not through (denoted by N) Hf-atomic planes
along the polarization (z-) direction leads to opposite polarization reversals. And as seen along the x-direction, the
polarization reversal may be realized by the straight z-direction shifting of three-fold coordinated O (denoted by S)
or the z-direction shifting of three-fold coordinated O accompanied with crosswise displacements along the y-direction
(denoted by C)".

Fig. 1 of the manuscript shows the unit cell, four Hf and eight O atoms, seen along x: the initial state (a) and the
final states (b)–(g). The S:T pathway takes (a) to (c), along the green arrows of (c).

![Polarization reversal pathways of Pca2₁ HfO₂](../../../images/tutorials/materials/defects/perturbation_ferroelectric_switching_hafnium_dioxide/0-figure-from-manuscript.webp "The eight 180° uniform polarization reversal pathways of Pca2₁ HfO₂, Fig. 1.")

The energy barrier between the two structures is computed in the
[simulation tutorial](perturbation-ferroelectric-switching-hafnium-dioxide-simulation.md).


## 2. Create the structures

### 2.1. Load the base material

The notebook loads Pca2₁ HfO₂ (mp-685097) from
[Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/) by its full name, so no
input material needs to be selected. The cell is oriented as in Fig. 1: a along x, the polar axis along z, the origin
on a Hf atom. The lattice is used as stored in Standata, a = 5.2195 Å, b = 5.0048 Å, c = 5.0327 Å; the manuscript's
own calculation gives a = 5.256 Å, b = 5.046 Å, c = 5.073 Å (Methods, p. 6).

### 2.2. Launch JupyterLite session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)"
menu item to launch the JupyterLite environment, or use the notebook embedded in section 6.

### 2.3. Open `perturbation_ferroelectric_switching_hafnium_dioxide.ipynb` notebook

Find and open `perturbation_ferroelectric_switching_hafnium_dioxide.ipynb` in the `specific_examples` folder.

### 2.4. Set up the parameters

Cell 1.1 of the notebook sets the material, the atoms that move, and the names of the saved materials:

```python
# Pca2₁ HfO₂ in the orientation of Fig. 1: a along x, the polarization along z
MATERIAL_NAME = "HfO2, Hafnium IV Oxide, ORC (Pca2_1) 3D (Bulk), mp-685097"

# The atoms that move: O with three Hf neighbors (three-fold coordinated)
MOVING_ELEMENT = "O"
MOVING_COORDINATION = 3
NEIGHBOR_ELEMENT = "Hf"
NEIGHBOR_RADIUS = 2.5  # in Angstroms; the O-Hf bonds are 2.02-2.23 Å, the next Hf is 3.25 Å away

INITIAL_MATERIAL_NAME = "HfO2 Pca21"
FINAL_MATERIAL_NAME = "HfO2 Pca21 S:T switched"
```

### 2.5. Run the notebook

Run the notebook by selecting "Run" > "Run All Cells" from the menu.


## 3. Follow the construction

The notebook builds the final structure from the initial one in two steps.

### 3.1. Find the three-fold coordinated O

Section 2.1 of the notebook counts, for every O atom, the Hf atoms within `NEIGHBOR_RADIUS`, periodic images
included. Four O atoms have three Hf neighbors and four have four; all O–Hf bonds are 2.02–2.23 Å long, and the nearest
other Hf is 3.25 Å away, so a 2.5 Å radius counts the bonded Hf only.

### 3.2. Shift them through the Hf plane

Section 2.2 moves the four three-fold coordinated O straight along z through the Hf plane below them, to the same
distance on the other side. Each sits 0.694 Å (0.1378 c) above that plane, so each moves by 2 (z_Hf − z_O) =
−1.387 Å. Their x and y coordinates and the order of the atoms are unchanged: atom i is the same atom in both
structures, as the nudged elastic band of the simulation tutorial requires.


## 4. Compare with the manuscript

Section 3 of the notebook shows both structures in the Wave viewer. The figure below places Fig. 1(a) and (c) of the
manuscript (left) beside the two structures built here, in Wave with bonds, seen along x (right):

![Fig. 1(a) and (c) of the manuscript beside the two structures built here](../../../images/tutorials/materials/defects/perturbation_ferroelectric_switching_hafnium_dioxide/structure-comparison.webp "Initial and S:T switched Pca2₁ HfO₂: manuscript, Fig. 1(a) and (c) (left) vs. this tutorial in Wave, seen along x (right)")

In the initial structure the three-fold coordinated O sit 0.1378 c above each Hf plane, in the final structure
0.1378 c below it; seen along x, the final structure is the initial one mirrored through the Hf plane, as Fig. 1(c).


## 5. Pass the materials to Materials Designer

Section 4 of the notebook sends `HfO2 Pca21` and `HfO2 Pca21 S:T switched` to the environment. In JupyterLite they
are passed to Materials Designer, where they can be saved on the platform; in a local Jupyter session they are written
to the `uploads` folder.


## 6. Interactive JupyterLite notebook

The following JupyterLite notebook creates the two structures. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/perturbation_ferroelectric_switching_hafnium_dioxide.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 7. References
