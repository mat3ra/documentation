---
tags:
  - grain-boundary
  - h-BN
  - 2D-materials
  - interface
  - twist-angle
  - D-2D-GBP

hide:
  - tags
# YAML header
render_macros: true
---

# 2D Grain Boundaries in Hexagonal Boron Nitride.

## 1. Introduction

This tutorial creates a grain boundary in a hexagonal boron nitride (h-BN) monolayer and relaxes it with the MACE machine-learned force field, following the manuscript below.

!!!note "Manuscript"
    Qiucheng Li, Xiaolong Zou, Mengxi Liu, Jingyu Sun, Yabo Gao, Yue Qi, Xiebo Zhou, Boris I. Yakobson, Yanfeng Zhang, and Zhongfan Liu, "Grain Boundary Structures and Electronic Properties of Hexagonal Boron Nitride on Cu(111)", Nano Lett. 2015, 15 (9), 5804-5810. [DOI: 10.1021/acs.nanolett.5b01852](https://doi.org/10.1021/acs.nanolett.5b01852){:target='_blank'}. [@Li2015]

The notebook builds the Type III boundary of Figure 3f: a continuous chain of pentagons and heptagons (5|7), with B–B and N–N bonds alternating along it. The cell holds two such boundaries, as in the manuscript's calculation.

## 2. Open the notebook

### 2.1. Launch JupyterLite session

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment. The notebook loads the h-BN monolayer (`2dm-4991`) from Standata itself.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 2.2. Open the notebook and set the parameters

Open the `specific_examples/defect_planar_grain_boundary_2d_boron_nitride.ipynb` notebook. Cell 1.1 sets the parameters:

```python
# Grain boundary parameters
NUMBER_OF_PERIODS_ACROSS = 2  # repetitions of each grain across the boundary
# Supercell matrices of the two grains in the lattice basis of the monolayer, rows: across and along the boundary
GRAIN_1_SUPERCELL_MATRIX = [[-2 * NUMBER_OF_PERIODS_ACROSS, -7 * NUMBER_OF_PERIODS_ACROSS], [4, 1]]
GRAIN_2_SUPERCELL_MATRIX = [[-5 * NUMBER_OF_PERIODS_ACROSS, -7 * NUMBER_OF_PERIODS_ACROSS], [3, -1]]
SLIDE_ALONG_BOUNDARY = 0.754  # in Angstroms, shift of the second grain along the boundary
VACUUM = 0.0  # in Angstroms

# Analysis parameters
BOND_LENGTH_CUTOFF = 1.75  # in Angstroms

# Relaxation parameters
MACE_MODEL_FAMILY = "MACE-MP-0"
MACE_MODEL = "large"
MACE_DISPERSION = False  # the manuscript uses PBE without a dispersion correction
MACE_DEFAULT_DTYPE = "float64"
MACE_DEVICE = "cpu"
FMAX = 0.01  # eV/Å, the force threshold of the manuscript

# Output parameters
UNRELAXED_MATERIAL_NAME = "h-BN 5-7 grain boundary"
MATERIAL_NAME = "h-BN 5-7 grain boundary, MACE-relaxed"

# Visualization parameters
CELL_REPETITIONS_FOR_VISUALIZATION = [1, 2, 1]
```

Each grain is a supercell of the monolayer. The rows of `GRAIN_1_SUPERCELL_MATRIX` and `GRAIN_2_SUPERCELL_MATRIX` are its vectors across and along the boundary, written in the lattice basis of the monolayer. They put the lattice vectors (3, 1) of one grain and (1, 3) of the other, in the 60° basis of the literature, along the boundary: the (3,1)|(1,3) boundary of the manuscript at 32.2°. `NUMBER_OF_PERIODS_ACROSS` sets the width of each grain, and `SLIDE_ALONG_BOUNDARY` shifts the second grain along the boundary so that the two grains meet in the 5|7 pattern. `FMAX` is the force threshold of the relaxation, 0.01 eV/Å as in the manuscript.

## 3. Create the grain boundary

### 3.1. Run the notebook

Select *Run* > *Run All*.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

The notebook joins the two grains (section 3), relaxes the atomic positions with MACE at fixed cell (section 4), and prints the number of atoms of each element and of B–B and N–N bonds before and after the relaxation:

```
208 atoms, B 104, N 104, B–B 2, N–N 2
```

### 3.2. Analyze the results

The cell is 62.7 × 9.05 Å with 208 atoms. Each of the two boundaries is a continuous 5-7 chain with one B–B and one N–N bond per period, as in the manuscript.

![Type III 5|7 boundary: Li et al. 2015 and this work](../../../images/tutorials/materials/defects/defect_planar_grain_boundary_2d_boron_nitride/boundary-structure-comparison.webp "Type III 5|7 boundary, top view: Li et al. 2015, Fig. 3f (left) and the MACE-relaxed structure of this notebook (right)")

## 4. Pass the material to Materials Designer

The notebook passes the boundary as built and its relaxed version, `h-BN 5-7 grain boundary` and `h-BN 5-7 grain boundary, MACE-relaxed`, to the current Materials Designer environment, where the user can save them. It also writes the relaxed one to the `uploads` folder; the [simulation tutorial](defect-planar-grain-boundary-2d-boron-nitride-simulation.md) loads it by this name.

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 5. Interactive JupyterLite Notebook

The following JupyterLite notebook builds and relaxes the boundary. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_planar_grain_boundary_2d_boron_nitride.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 6. References
