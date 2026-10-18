---
tags:
  - 2d-materials
  - layers
  - bilayer
  - twisted
  - commensurate
  - boron
  - nitride
  - C-2D-INT-C

hide:
  - tags
# YAML header
render_macros: true
---

# Twisted Bilayer Boron Nitride Commensurate Lattice Structure Creation.

## 1. Introduction

This tutorial demonstrates the process of creating a periodic twisted bilayer hexagonal boron nitride (h-BN) structure based on the work presented in the following manuscript.

!!!note "Manuscript"
    **Lede Xian, Dante M. Kennes, Nicolas Tancogne-Dejean, Massimo Altarelli, and Angel Rubio**,
    "Multiflat Bands and Strong Correlations in Twisted Bilayer Boron Nitride: Doping-Induced Correlated Insulator and Superconductor" Nano Lett. 19, 4934–4940 (2019)
    [DOI: 10.1021/acs.nanolett.9b00986](https://doi.org/10.1021/acs.nanolett.9b00986) [@Xian2020]


We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create the periodic twisted bilayer at 7.34°, one of the cells the manuscript computes (Fig. 1g; text p. 4936). The built cell has 244 atoms.

The manuscript's two configurations, α and β, share one moiré cell and their twist angles differ by 60° (p. 4935). With the h-BN from Standata, a twist of 60° + 7.34° gives configuration α and 7.34° gives β; this tutorial builds α.

Figure 1a,b of the manuscript shows both configurations (left); the cell built in this tutorial is shown next to it in the same top view (right).

![Twisted bilayer h-BN from the manuscript and the structure notebook](../../../images/tutorials/materials/interfaces/twisted-bilayer-boron-nitride/commensurate-top-view-comparison.webp "Top view: Xian et al. 2019, Fig. 1a,b, configurations α (a) and β (b) with the moiré cell outlined, CC-BY (left), and the 7.34° configuration α bilayer built by the structure notebook, 244 atoms, B pink, N blue, cell outlined (right)")

## 2. Load and preview h-BN structure

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the h-BN monolayer from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Standata BN Import](../../../images/tutorials/materials/interfaces/twisted-bilayer-boron-nitride/standata-import-bn.png "Standata BN Import")

Standata's lattice constant of 2.509 Å is used as is; the manuscript uses 2.512 Å (Supporting Information, p. 2).

Then we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create the twisted bilayer h-BN structure.


## 3. Create the h-BN bilayer

### 3.1. Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 3.2. Open and modify the notebook

Open `specific_examples/interface_bilayer_twisted_commensurate_lattices_boron_nitride.ipynb`
— the notebook embedded in section 4 below.

The first cell sets the twist angle, the interlayer distance, and the name the structure is saved
under:

```python
TARGET_TWIST_ANGLE = 60 + 7.34  # degrees; configuration α of Xian et al. 2019 Fig. 1a, 7.34 gives β
INTERFACE_DISTANCE = 3.23  # Å, the article's
MATERIAL_NAME = "h-BN bilayer 7.34deg alpha d3.23"
```

The interlayer distance of 3.23 Å is the manuscript's, the optimized distance of the bilayer without
twist (p. 4935–4936).

The second cell holds the vacuum and visualization parameters:

```python
VACUUM = 20.0  # Å of empty space above the top layer; paper: not stated

# Visualization parameters
SHOW_INTERMEDIATE_STEPS = True
VISUALIZE_REPETITIONS = [3, 3, 1]
```

### 3.3. Run the Notebook

After setting the parameters, run the notebook to build the bilayer.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 3.4. Check the geometry

The notebook prints the atom count, the composition, the cell, the interlayer distance, and the
target twist angle of the built structure:

```
h-BN bilayer 7.34deg alpha d3.23: 244 atoms (B122N122), a = 19.596 Å, gamma = 120.0°, interlayer distance 3.230 Å, target twist 67.34°
```

### 3.5. View results and pass to Materials Designer

The notebook shows the bilayer from the top and from the side. The structure is saved to the
`uploads` folder under `MATERIAL_NAME`, and can also be passed to the Materials Designer for further
analysis. The right panel of the figure in section 1 is this cell's structure, rotated to the
orientation of the manuscript's Fig. 1a.

Once the structure exists, the
[band structure tutorial](interface-bilayer-twisted-commensurate-lattices-boron-nitride-simulation.md)
loads it by name and computes the width of its top valence flat bands.


## 4. Interactive JupyterLite Notebook

The interactive JupyterLite notebook for creating the twisted bilayer h-BN structure can be accessed below. To run the notebook, click the "Run All" button.

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_bilayer_twisted_commensurate_lattices_boron_nitride.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 5. References
