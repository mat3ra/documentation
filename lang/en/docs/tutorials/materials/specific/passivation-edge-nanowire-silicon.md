---
tags:
    - silicon
    - hydrogen
    - passivation
    - nanowire
    - Si
    - H
    - X-1D-PAS
hide:
    - tags
# YAML header
render_macros: true
---

# Passivation of Silicon Nanowire.

## Introduction.

This tutorial demonstrates the process of creating passivated silicon nanowires based on the work presented in the following manuscript, where the chemical gap tuning in silicon nanowires is studied.


!!!note "Manuscript"
    B. Aradi, L. E. Ramos, P. Deák, Th. Köhler, F. Bechstedt, R. Q. Zhang, and Th. Frauenheim,
    "Theoretical study of the chemical gap tuning in silicon nanowires"
    Phys. Rev. B 76, 035305 (2007)
    DOI: [10.1103/PhysRevB.76.035305](https://doi.org/10.1103/PhysRevB.76.035305) [@Aradi2007]


We will focus on creating silicon nanowires with hydrogen passivation from FIG. 1.

Specifically, the material from FIG. 1. of the publication:

![Passivated Silicon nanowire](../../../images/tutorials/materials/passivation/passivation_edge_nanowire_silicon/0-figure-from-manuscript.webp "Passivated Silicon nanowire, FIG. 1.")


## 1. Create Silicon Nanowire.

### 1.1. Load Silicon Material.

Since we're using Silicon, it can be already loaded as the default material and we can skip this step.

Otherwise, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the silicon material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

### 1.2. Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 1.3. Open `create_nanowire_custom_shapeipynb` notebook.

Find `create_nanowire_custom_shape.ipynb` in the list of notebooks and click/double-click open it.

### 1.4. Open and modify the notebook.

Next, we need to create a nanowire wit ha custom shape.

We'll specify the orientation of the nanowire with Miller indices of `(1,1,0)` as described in the manuscript.

Then we'll define a supercell matrix to add enough of material to cut the nanowire from: 

`[[3, 0, 0], [0, 2, 0], [0, 0, 2]]`.

Finally, we'll define a custom coordinate condition to create a rhombus-shaped nanowire with coordinates of the vertices corresponding to the corners of the rhombus.

The vertices of the rhombus are defined as follows:

Bottom:`[0.5, 0.2, 0]`, 

Left:`[0, 0.5, 0]`,

Top:`[0.5, 1, 0]`,

Right:`[1, 0.5, 0]`


For that, edit `create_nanowire_custom_shape.ipynb` notebook to modify the parameters by adding the following content to the "1.1. Set up nanowire parameters" cell:

```python
from typing import List
import numpy as np
from mat3ra.made.tools.helpers import CoordinateCondition

# Cross-section shape parameters
CENTER_COORDINATE = [0.5, 0.5, 0.5] # Center of the cylinder in units specified by flag below
MAJOR_RADIUS = 0.25 # Cylinder wire radius in units specified by the flag below
MINOR_RADIUS = 0.1 # Cylinder wire radius in units specified by the flag below
USE_CARTESIAN_COORDINATES = False # Flag to use Cartesian coordinates for the center and radii

# Wire parameters 
MILLER_INDICES= (1,1,0)  # Miller indices of the nanowire direction
SUPERCELL_MATRIX = [[3, 0, 0], [0, 2, 0], [0, 0, 2]] # Supercell matrix to cut the cylinder from
VACUUM = 10.0 # Vacuum thickness on the sides in Angstroms
ALIGN_ALONG_X = False

# Custom Coordinate Condition for a hollow cylinder shape
class CustomCoordinateCondition(CoordinateCondition):
    vertices: List[List[float]]

    def condition(self, coordinate: List[float]) -> bool:
        coord = np.array(coordinate)
        v0, v1, v2, v3 = np.array(self.vertices)
        vec0 = v1 - v0
        vec1 = v2 - v1
        vec2 = v3 - v2
        vec3 = v0 - v3

        # Calculate cross products
        cross0 = np.cross(vec0, coord[:2] - v0[:2])
        cross1 = np.cross(vec1, coord[:2] - v1[:2])
        cross2 = np.cross(vec2, coord[:2] - v2[:2])
        cross3 = np.cross(vec3, coord[:2] - v3[:2])

        # Check if point is inside the rhombus
        return (np.all(cross0 >= 0) and np.all(cross1 >= 0) and \
                np.all(cross2 >= 0) and np.all(cross3 >= 0)) or \
               (np.all(cross0 <= 0) and np.all(cross1 <= 0) and \
                np.all(cross2 <= 0) and np.all(cross3 <= 0))

# Define the vertices of the rhombus
vertices = [
    [0.5, 0.2, 0],
    [0, 0.5, 0],
    [0.5, 1, 0],
    [1, 0.5, 0]
]

condition = CustomCoordinateCondition(vertices=vertices).condition
```

## 1.5. Run the Notebook and use the Material.

Run the notebook by clicking `Run` > `Run All` in the top menu to run cells and wait for the results to appear.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

After running the notebook and submitting the material, the user will be able to visualize the structure of Silicon Nanowire.

![Silicon Nanowire](../../../images/tutorials/materials/passivation/passivation_edge_nanowire_silicon/3-silicon-nanowire.webp "Silicon Nanowire")

## 2. Passivate with Hydrogen.

### 2.1. Setup the Passivation.

Open JupyterLite Session again and select Silicon Nanowire material for Input Materials.

Next, we need to passivate the silicon nanowire with hydrogen atoms.

Open the `passivate_edge.ipynb` notebook and set:

`BOND_LENGTH = 1.46` -- Si-H bond length in Angstroms,

`COORDINATION_THRESHOLD = 3` -- Silicon that has less than 4 neighbors is undercoordinated in the silicon lattice, so all with 3 or less neighbors will be passivated,

`COORDINATION_SEARCH_RADIUS = 2.5` -- Search radius for neighbors for every atom, in Angstroms,

`MAX_BONDS_TO_PASSIVATE = 2`  -- Maximum number of bonds to saturate for undercoordinated atoms.


Copy the below content and edit the "1.1. Set up defect parameters" cell in the notebook as follows:

```python
# Enable interactive selection of coordination threshold
IS_COORDINATION_SELECTION_INTERACTIVE = False

MATERIAL_INDEX = 0

# Passivation parameters
PASSIVANT = "H"  # Chemical element for passivating atom
BOND_LENGTH = 1.46  # Distance from atom to passivant, in Angstroms

# Undercoordinated atoms search algorithm parameters
COORDINATION_THRESHOLD = 3  # Coordination threshold, below which passivation is applied to the atom
COORDINATION_SEARCH_RADIUS = 2.5  # Distance to look for neighbors for coordination, in Angstroms
NUMBER_OF_BONDS_TO_PASSIVATE = 2  # Number of bonds to passivate per undercoordinated atom

SYMMETRY_TOLERANCE = 0.1  # Tolerance for symmetry analysis of existing bonds

# Visualization parameters
SHOW_INTERMEDIATE_STEPS = True
CELL_REPETITIONS_FOR_VISUALIZATION = [1, 1, 1]  # Structure repeat in view
```

Here's the visual of the updated content:

![Notebook setup](../../../images/tutorials/materials/passivation/passivation_edge_nanowire_silicon/5-jl-setup.webp "Notebook setup")

### 2.2. Run the notebook and analyze the results.

After running the notebook, the user will be able to visualize the structure of Silicon Nanowire with substitution defects.

![Review the Results](../../../images/tutorials/materials/passivation/passivation_edge_nanowire_silicon/6-jl-result-preview.webp "Review the Results")

## 3. Pass the Material to Materials Designer.

The user can pass the material with substitution defects in the current Materials Designer environment and save it.

![Final Material](../../../images/tutorials/materials/passivation/passivation_edge_nanowire_silicon/7-wave-result.webp "H-Passivated Silicon Nanowire")

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.


## Interactive JupyterLite Notebook.

The following JupyterLite notebook demonstrates the process of creating materials with hydrogen passivation of silicon nanowire. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/passivation_edge_nanowire_silicon.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## References.

