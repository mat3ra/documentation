---
tags:
  - slab-creation
  - interfaces
  - high-k
  - metal-gate
  - semiconductor
  - heterostructure
  - strain-matching
  - Si
  - SiO2
  - HfO2
  - TiN
  - C-2D-HST

hide:
  - tags
# YAML header
render_macros: true
---

# Creating High-k Metal Gate Stack: Si/SiO2/HfO2/TiN.

## 1. Introduction

This tutorial demonstrates how to create a high-k metal gate stack heterostructure consisting of four materials: Si (substrate), SiO2 (gate oxide), HfO2 (high-k dielectric), and TiN (metal gate). The process involves:

1. Creating individual slabs for HfO2 and TiN
2. Building the Si/SiO2 interface using strain matching
3. Adding the pre-created slabs sequentially using simple interface builder

!!!note "Reference"
    QuantumATK tutorial: [High-k Metal Gate Stack Builder](https://docs.quantumatk.com/tutorials/hkmg_builder/hkmg_builder.html) [@Muller1999; @Robertson2006]
    

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create the high-k metal gate stack as shown in the figure below.

![High-k Metal Gate Stack](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/original-figure.webp "High-k Metal Gate Stack")

## 2. Set Up Materials

First, navigate to Materials Designer and import from [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/) the following materials:

- Silicon (Si)
- Silicon dioxide (SiO2)
- Hafnium dioxide (HfO2)
- Titanium nitride (TiN)

![Standata Import](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/import-standata.webp "Standata Import")

## 3. Create HfO2 and TiN Slabs

Before building the stack, we need to create properly terminated slabs for HfO2 and TiN.

### 3.1. Create HfO2 Slab

More detailed instructions on slab creation can be found in the [SrTiO3 Slab](slab-strontium-titanate.md) tutorial.

Open `create_slab_with_termination.ipynb` and set parameters:

```python
# HfO2 slab parameters
MILLER_INDICES = (0, 0, 1)
THICKNESS = 4  # atomic layers
VACUUM = 0.5  # Angstroms
XY_SUPERCELL_MATRIX = [[1, 0], [0, 2]]
USE_ORTHOGONAL_Z = True
USE_CONVENTIONAL_CELL = True

# Select termination (usually first one is fine)
TERMINATION_INDEX = 0
```

Run the notebook to create the HfO2 slab and pass it to Materials Designer.

![HfO2 slab](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/wave-result-hfo2-slab-wave.webp "HfO2 slab")

### 3.2. Create TiN Slab

Open another instance of `create_slab_with_termination.ipynb` for TiN:

```python
# TiN slab parameters
MILLER_INDICES = (0, 0, 1)
THICKNESS = 3  # atomic layers
VACUUM = 10.0  # Angstroms - more vacuum for final layer
XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
USE_ORTHOGONAL_Z = True
USE_CONVENTIONAL_CELL = True

TERMINATION_INDEX = 0
```

Run the notebook to create and pass the TiN slab to Materials Designer.

![TiN slab](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/wave-result-tin-slab.webp "TiN slab")

## 4. Create Si/SiO2 Interface

### 4.1. Launch ZSL Interface Builder

Open `create_interface_with_min_strain_zsl.ipynb` and configure:

```python
FILM_INDEX = 1  # SiO2
FILM_MILLER_INDICES = (1, 0, 0)
FILM_THICKNESS = 3
FILM_TERMINATION_FORMULA = None  # if None, the first termination will be used
FILM_VACUUM = 0.0
FILM_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
FILM_USE_ORTHOGONAL_C = True # Changed from FILM_USE_ORTHOGONAL_Z

SUBSTRATE_INDEX = 0  # Si
SUBSTRATE_MILLER_INDICES = (1, 0, 0)
SUBSTRATE_THICKNESS = 4
SUBSTRATE_TERMINATION_FORMULA = None  # if None, the first termination will be used
SUBSTRATE_VACUUM = 5.0
SUBSTRATE_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
SUBSTRATE_USE_ORTHOGONAL_C = True # Changed from SUBSTRATE_USE_ORTHOGONAL_Z

INTERFACE_DISTANCE = 2.5  # Angstroms
INTERFACE_VACUUM = 5.0  # Angstroms

# Whether to convert materials to conventional cells before creating slabs.
# To create interfaces with smaller cells, set this flag to False. (and pass already conventional cells as input)
USE_CONVENTIONAL_CELL = True

# Maximum area for the superlattice search algorithm (the final interface area will be smaller)
MAX_AREA = 200  # in Angstrom^2
# Additional fine-tuning parameters (increase values to get more strained matches):
MAX_AREA_TOLERANCE = 0.25  # in Angstrom^2
MAX_LENGTH_TOLERANCE = 0.15
MAX_ANGLE_TOLERANCE = 0.15

# Whether to reduce the resulting interface cell to the primitive cell after the interface creation.
# If the reduction causes unexpected results, try increasing the `MAX_AREA` for search.
REDUCE_RESULT_CELL_TO_PRIMITIVE = True
```

We set a higher tolerances to achieve smaller cell with higher strain of the film (SiO2).

![Interface Setup](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/jl-setup-notebook-si-sio2.webp "Interface Setup")

### 4.2. Create Initial Interface

Run the notebook to create the Si/SiO2 interface. This is the most critical interface, so we use strain matching to optimize it.

## 5. Add HfO2 Layer

### 5.1. Configure Simple Interface Builder

Open JupyterLite Session again and select the Si/SiO2 interface and HfO2 slab as input materials.

Open `create_interface_with_no_strain.ipynb` and set:

```python
# Important: Disable slab creation since we're using pre-created slab
ENABLE_FILM_SCALING = True
CREATE_SLABS = False  # We already have our HfO2 slab

FILM_INDEX = 1  # Pre-created HfO2 slab
SUBSTRATE_INDEX = 0  # Si/SiO2 structure

# Interface parameters
INTERFACE_DISTANCE = 2.5  # Angstroms
INTERFACE_VACUUM = 0.5  # Angstroms
```

Film is the material that will be strained (scaled) to match the substrate.

![HfO2 Interface Setup](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/jl-setup-notebook-si-sio2-hfo2.webp "HfO2 Interface Setup")

### 5.2. Add HfO2

Run the notebook to add the pre-created HfO2 slab to the Si/SiO2 structure.

![Si/SiO2/HfO2](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/wave-result-si-sio2-hfo2.webp "Si/SiO2/HfO2")

## 6. Add TiN Layer

### 6.1. Configure Final Layer Addition

Similar to steps in Section 4, we add the TiN layer to the Si/SiO2/HfO2 stack.

Use `create_interface_with_no_strain.ipynb` again:

```python
# Keep slabs disabled
ENABLE_FILM_SCALING = True
CREATE_SLABS = False  # Using pre-created TiN slab

FILM_INDEX = 1  # Pre-created TiN slab
SUBSTRATE_INDEX = 0  # Si/SiO2/HfO2 structure

# Final interface parameters
INTERFACE_DISTANCE = 2.5  # Angstroms
INTERFACE_VACUUM = 10.0  # Final vacuum spacing
```

### 6.2. Complete the Stack

Run the notebook to add the TiN layer and complete the stack.

![Final Stack](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/wave-result-si-sio2-hfo2-tin.webp "Final Stack")

The user then can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 7. Interactive JupyterLite Notebook

The following JupyterLite notebook demonstrates the process of creating target material. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/heterostructure_silicon_silicon_dioxide_hafnium_dioxide_titanium_nitride.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 8. References

