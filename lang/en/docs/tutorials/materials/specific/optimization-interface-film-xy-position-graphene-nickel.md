---
tags:
  - graphene
  - nickel
  - interface
  - optimization
  - 2D materials
  - surface science
  - Gr/Ni(111)
  - C
  - Ni
  - C-2D-INT-Z

hide:
  - tags
# YAML header
render_macros: true
---

# Graphene/Ni(111) Interface Optimization.

## Introduction.

This tutorial demonstrates how to create and optimize a Graphene/Ni(111) interface structure following the experimental observations presented in the literature. We will focus on finding the most energetically favorable position of graphene on the Ni(111) surface.

!!!note "Manuscript"
    Arjun Dahal, Matthias Batzill
    "Graphene–nickel interfaces: a review"
    Nanoscale, 6(5), 2548. (2014)
    [DOI: 10.1039/c3nr05279f](https://doi.org/10.1039/c3nr05279f){:target='_blank'}. [@Dahal2014; @Gamo1997; @Bertoni2004]

We will recreate the interface structure and optimize the film position to match the experimental findings shown in the figure below:

![Gr/Ni Interface](../../../images/tutorials/materials/optimization/optimization_interface_film_xy_position_graphene_nickel/0-figure-from-manuscript.webp "Optimal position of graphene on Ni(111)")

## 1. Create Interface Structure.

### 1.1. Load Base Materials.

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import both graphene and nickel materials from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Import Graphene and Ni](../../../images/materials-designer/import/import_from_standata.webp "Import Gr and Ni from Standata")

### 1.2. Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

### 1.3. Open `create_interface_with_min_strain_zsl.ipynb` notebook.

Find and open the `create_interface_with_min_strain_zsl.ipynb` notebook. This notebook will help us create the initial interface structure.

### 1.4. Set up interface parameters.

Edit the notebook parameters to create the Gr/Ni(111) interface:

```python
# Material selection
FILM_INDEX = 1  # Index in the list of materials, to access as materials[FILM_INDEX]
FILM_MILLER_INDICES = (0, 0, 1)
FILM_THICKNESS = 1  # in atomic layers
FILM_TERMINATION_FORMULA = None  # if None, the first termination will be used
FILM_VACUUM = 0.0  # in angstroms
FILM_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
FILM_USE_ORTHOGONAL_C = True

SUBSTRATE_INDEX = 0
SUBSTRATE_MILLER_INDICES = (1, 1, 1)
SUBSTRATE_THICKNESS = 4  # in atomic layers
SUBSTRATE_TERMINATION_FORMULA = None  # if None, the first termination will be used
SUBSTRATE_VACUUM = 0.0  # in angstroms
SUBSTRATE_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
SUBSTRATE_USE_ORTHOGONAL_C = True

INTERFACE_DISTANCE = 2.58  # Gap between substrate and film, in Angstrom
INTERFACE_VACUUM = 20.0  # Vacuum over film, in Angstrom

# Whether to convert materials to conventional cells before creating slabs.
# To create interfaces with smaller cells, set this flag to False. (and pass already conventional cells as input)
USE_CONVENTIONAL_CELL = True

# Maximum area for the superlattice search algorithm (the final interface area will be smaller)
MAX_AREA = 50  # in Angstrom^2
# Additional fine-tuning parameters (increase values to get more strained matches):
MAX_AREA_TOLERANCE = 0.09  # in Angstrom^2
MAX_LENGTH_TOLERANCE = 0.05
MAX_ANGLE_TOLERANCE = 0.02

# Whether to reduce the resulting interface cell to the primitive cell after the interface creation.
# If the reduction causes unexpected results, try increasing the `MAX_AREA` for search.
REDUCE_RESULT_CELL_TO_PRIMITIVE = True
```

![Interface Parameters](../../../images/tutorials/materials/optimization/optimization_interface_film_xy_position_graphene_nickel/2-jl-setup-nb-interface.webp "Interface parameters for Gr/Ni(111)")

### 1.5. Run interface creation.

Run the notebook using "Run > Run All Cells". This will:

1. Create slabs from both materials
2. Find the optimal lattice matching using the ZSL algorithm
3. Generate the initial interface structure

## 2. Optimize Film Position.

### 2.1. Open `optimize_film_position.ipynb` notebook.

Find and open the `optimize_film_position.ipynb` notebook which will help us find the optimal position of the graphene layer.

### 2.2. Set optimization parameters.

Configure the optimization parameters:

```python
MATERIAL_INDEX = 0  # Index of the material to optimize
# Grid parameters
GRID_SIZE = (20, 20)  # Resolution of the x-y grid
GRID_RANGE_X = (-0.5, 0.5)  # Range to search in x direction
GRID_RANGE_Y = (-0.5, 0.5)  # Range to search in y direction
USE_CARTESIAN = False  # Whether to use Cartesian coordinates

# Visualization parameters
SHOW_3D_LANDSCAPE = False  # Whether to show 3D energy landscape
STRUCTURE_REPETITIONS = [3, 3, 1]  # Repetitions for structure visualization
```

Key parameters explained:
- `GRID_SIZE`: Controls the resolution of position sampling
- `GRID_RANGE`: Search range in crystal coordinates
- `USE_CARTESIAN`: Set to False for hexagonal systems

![Optimization Parameters](../../../images/tutorials/materials/optimization/optimization_interface_film_xy_position_graphene_nickel/3-jl-setup-nb-final.webp "Optimization parameters for Gr/Ni(111)")

### 2.3. Run optimization.

Run all cells in the notebook. The optimization will:

1. Calculate energy landscape across different positions
2. Find the global minimum energy position
3. Generate visualizations of the results

![Energy Landscape](../../../images/tutorials/materials/optimization/optimization_interface_film_xy_position_graphene_nickel/4-energy-landscape.webp "Energy landscape of film positions")

![Energy Heatmap](../../../images/tutorials/materials/optimization/optimization_interface_film_xy_position_graphene_nickel/5-energy-heatmap.webp "Energy heatmap of film positions")

## 3. Analyze Results.

Compare the original and optimized interface structures to see the difference in the graphene position.

![Initial and optimized interface](../../../images/tutorials/materials/optimization/optimization_interface_film_xy_position_graphene_nickel/6-jl-result-preview-compare.webp "Initial and optimized interface structures")

![Final Interface](../../../images/tutorials/materials/optimization/optimization_interface_film_xy_position_graphene_nickel/7-wave-result-final.webp "Optimized Gr/Ni Interface")


## 4. Save Optimized Structure.

The optimized interface structure will be automatically passed back to Materials Designer where you can:
1. Save it in the workspace
2. Export it in various formats (JSON, POSCAR, etc.)
3. Use it for further calculations

## Interactive JupyterLite Notebook.

The following JupyterLite notebook demonstrates the complete process. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/optimization_interface_film_xy_position_graphene_nickel.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## Parameter Fine-tuning.

To adjust the interface optimization:

1. Interface Creation:
   - Adjust `SUBSTRATE_THICKNESS` for more Ni layers
   - Modify `MAX_AREA` to control supercell size
   - Change `INTERFACE_DISTANCE` if needed

2. Position Optimization:
   - Increase `GRID_SIZE` for finer sampling
   - Adjust `GRID_RANGE` to search different areas
   - Enable 3D visualization with `SHOW_3D_LANDSCAPE = True`

## References.
