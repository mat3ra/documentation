---
tags:
  - graphene
  - silicon dioxide
  - interface
  - 2D
  - 3D
  - oxygen
  - termination
  - C-2D-INT-Z

hide:
  - tags
# YAML header
render_macros: true
---


# Interfaces between 2D and 3D Materials: Graphene on SiO2 (alpha-quartz).

## 1. Introduction

This tutorial demonstrates the process of creating interfaces between 2D and 3D materials, specifically graphene and silicon dioxide (SiO<sub>2</sub>), based on the work presented in the following manuscript, where the electronic properties of graphene on SiO<sub>2</sub> are studied.

!!!note "Manuscript"
    **Yong-Ju Kang, Joongoo Kang, and K. J. Chang**
    "Electronic structure of graphene and doping effect on SiO2"
    Physical Review B 78, 115404 (2008)
    [DOI: 10.1103/PhysRevB.78.115404](https://doi.org/10.1103/PhysRevB.78.115404) [@Kang2008; @Dahal2014]

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create interfaces between graphene and silicon dioxide with oxygen termination, as shown in the manuscript.

We will focus on replicating the metastable geometry of Kang et al. Sec. III: graphene 2.58 Å above the O-terminated surface, shifted from the C-over-O registry of Fig. 1(b).

![Graphene on Silicon Dioxide](../../../images/tutorials/materials/interfaces/interface_2d_3d_graphene_silicon_dioxide/0-figure-from-manuscript.webp "Graphene on Silicon Dioxide, FIG. 1(b)")

## 2. Load and Preview Materials

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import graphene and silicon dioxide materials from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

Then use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create the target structures.

## 3. Create Interface Between Graphene and Silicon Dioxide

### 2.1 Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 2.2 Open and Modify the Notebook

Select the input materials with the first being the substrate (SiO₂) and the second being the film (graphene).

Open the `create_interface_with_min_strain_zsl.ipynb` notebook and modify the parameters as follows:

- Miller indices: `(0, 0, 1)` for both materials
- Thickness: `1` layer for graphene, `5` layers for SiO₂ (5 conventional cells: 15 Si planes; the manuscript has 14 bilayers)
- Interface distance: `2.58` Å (as stated in the manuscript)
- Interface vacuum: `17.5` Å (gives about 20 Å above graphene, as specified in the manuscript)

Let's set `MAX_AREA=150` Å² to allow for a larger search area for the superlattice search algorithm.

`TERMINATION_PAIR_INDICES` will be set to `[1]` to get the O-terminated interface as shown in the manuscript.

Adjust the "1.1. Set up slab parameters" cell as shown:

```python
# Enable interactive selection of terminations via UI prompt
IS_TERMINATIONS_SELECTION_INTERACTIVE = False

FILM_INDEX = 1  # Index in the list of materials, to access as materials[FILM_INDEX]
FILM_MILLER_INDICES = (0, 0, 1)
FILM_THICKNESS = 1  # in atomic layers
FILM_TERMINATION_FORMULA = None  # if None, the first termination will be used
FILM_VACUUM = 0.0  # in angstroms
FILM_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
FILM_USE_ORTHOGONAL_C = True

SUBSTRATE_INDEX = 0
SUBSTRATE_MILLER_INDICES = (0, 0, 1)
SUBSTRATE_THICKNESS = 5  # conventional cells along c: 15 Si planes; the manuscript has 14 bilayers
SUBSTRATE_TERMINATION_FORMULA = None  # if None, the first termination will be used
SUBSTRATE_VACUUM = 0.0  # in angstroms
SUBSTRATE_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
SUBSTRATE_USE_ORTHOGONAL_C = True

INTERFACE_DISTANCE = 2.58  # Gap between substrate and film, in Angstrom
INTERFACE_VACUUM = 17.5  # in Angstrom

# Whether to convert materials to conventional cells before creating slabs.
# To create interfaces with smaller cells, set this flag to False. (and pass already conventional cells as input)
USE_CONVENTIONAL_CELL = True

# Maximum area for the superlattice search algorithm (the final interface area will be smaller)
MAX_AREA = 150  # in Angstrom^2
# Additional fine-tuning parameters (increase values to get more strained matches):
MAX_AREA_TOLERANCE = 0.09  # in Angstrom^2
MAX_LENGTH_TOLERANCE = 0.05
MAX_ANGLE_TOLERANCE = 0.02

# Whether to reduce the resulting interface cell to the primitive cell after the interface creation.
# If the reduction causes unexpected results, try increasing the `MAX_AREA` for search.
REDUCE_RESULT_CELL_TO_PRIMITIVE = True
```

The specific-example notebook `interface_2d_3d_graphene_silicon_dioxide.ipynb` continues after the ZSL step with two more cells, which the generic notebook does not have. The ZSL match leaves the registry of graphene on the quartz surface undefined. The notebook shifts the film in-plane by `REGISTRY_SHIFT` to the registry of the manuscript's metastable geometry (Sec. III), where one surface O sits near a C atom and the other near a hexagon centre, and prints each surface O's in-plane distance to the nearest C. Its parameter, set in the notebook's parameter cell, and cell 3.5:

```python
REGISTRY_SHIFT = [-1.011, -0.725, 0.0]
```

```python
import numpy as np
from mat3ra.made.tools.modify import interface_displace_part

interface = interface_displace_part(interface, displacement=REGISTRY_SHIFT, use_cartesian_coordinates=True)

interface_in_cartesian = interface.clone()
interface_in_cartesian.to_cartesian()
coordinates = np.array(interface_in_cartesian.basis.coordinates.values)
elements = np.array(interface.basis.elements.values)
cell_xy = np.array(interface.lattice.vector_arrays)[:2, :2]
carbons = coordinates[elements == "C"]
oxygens = coordinates[elements == "O"]
for oxygen in oxygens[np.argsort(-oxygens[:, 2])[:2]]:
    distances = [np.linalg.norm(oxygen[:2] - carbon[:2] - i * cell_xy[0] - j * cell_xy[1])
                 for carbon in carbons for i in (-1, 0, 1) for j in (-1, 0, 1)]
    print(f"surface O at z = {oxygen[2]:.3f} Å: nearest C in the plane {min(distances):.3f} Å")
```

Cell 3.6 puts the cell in the 120° hexagonal setting and centers the slab along z, so that no atom sits at z = 0, where a relaxation would wrap it to the top of the cell:

```python
from mat3ra.made.tools.helpers import create_supercell
from mat3ra.made.tools.modify import translate_to_center

interface = create_supercell(interface, supercell_matrix=[[1, 0, 0], [-1, 1, 0], [0, 0, 1]])
interface = translate_to_center(interface, axes=["z"])
interface.lattice.type = "HEX"
print(f"{interface.basis.number_of_atoms} atoms, a = {interface.lattice.a:.4f} Å, "
      f"gamma = {interface.lattice.gamma:.1f}°")
```

### 2.3 Run the Notebook

Run the notebook to generate the interface structure between graphene and silicon dioxide with oxygen termination.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 3.4. View Results

The generation might take some time.
After that, the user can pass the material to the Materials Designer for further analysis.

![Gr/SiO2 Interface](../../../images/tutorials/materials/interfaces/interface_2d_3d_graphene_silicon_dioxide/3-structure-5-cells.webp "Gr/SiO2 Interface, side view: graphene on 5 conventional quartz cells (Si15O30C8, 53 atoms)")

## 4. Pass the Material to Materials Designer

After generating the interface structure, pass the material to the Materials Designer for further analysis.

The interface between graphene and silicon dioxide with oxygen termination is shown below.

![Gr/SiO2 Interface](../../../images/tutorials/materials/interfaces/interface_2d_3d_graphene_silicon_dioxide/4-wave-result-material.webp "Gr/SiO2 Interface")

## 5. Interactive JupyterLite Notebook


The interactive JupyterLite notebook for creating interfaces between graphene and silicon dioxide is embedded below. To run the notebook, click on the "Run All" button.


{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_2d_3d_graphene_silicon_dioxide.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 6. References
