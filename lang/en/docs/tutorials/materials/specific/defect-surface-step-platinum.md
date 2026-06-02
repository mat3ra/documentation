---
tags:
  - surface
  - platinum
  - terrace
  - step
  - slab
  - Pt(211)
  - Pt(111)
  - D-2D-TER

hide:
  - tags
# YAML header
render_macros: true
---

# Terrace Steps on Platinum (111) Surface.

## 1. Introduction

This tutorial demonstrates two different approaches to creating terrace steps on platinum surfaces, based on the work presented in the following manuscript:

!!!note "Manuscript"
    Šljivančanin, Ž., & Hammer, B., "Oxygen dissociation at close-packed Pt terraces, Pt steps, and Ag-covered Pt steps studied with density functional theory." Surface Science, 515(1), 235–244. [DOI: 10.1016/s0039-6028(02)01908-8](https://doi.org/10.1016/s0039-6028(02)01908-8){:target='_blank'}. [@Sljivancanin2002]

We will focus on creating platinum surface with terrace steps, as shown in FIG. 1. B:

![Fig. 1.](../../../images/tutorials/materials/defects/defect_surface_step_platinum/0-figure-from-manuscript.webp "Fig. 1.")

We will demonstrate two methods:

1. Creating a Pt(211) surface which inherently contains steps
2. Creating a terrace step on a Pt(111) surface using the TerraceSlabDefectBuilder

## 2. Method I: Create Pt(211) Surface

- Creates a surface with inherent steps
- Smaller unit cell
- Fixed step geometry
- Good for studying specific crystal faces

### 2.1. Import Base Material

First, we need to import the platinum material from Standata:

1. Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/)
2. Click on "Input/Output" menu
3. Select "Import from Standata"
4. Search for "Pt" and select the bulk platinum material

![Standata Import](../../../images/tutorials/materials/defects/defect_surface_step_platinum/1-standata-import-platinum.webp "Standata Import")

### 2.2. Launch JupyterLite Environment

Select "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" to open JupyterLite.

### 2.3. Configure Slab Parameters

Open a `create_slab.ipynb` notebook and set up the slab parameters in the "1.1. Set up notebook" cell:

```python
# Enable interactive selection of terminations via UI prompt
IS_TERMINATIONS_SELECTION_INTERACTIVE = False 

MILLER_INDICES = (2, 1, 1)
THICKNESS = 6  # in atomic layers
VACUUM = 10.0  # in angstroms
XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
USE_ORTHOGONAL_C = True
USE_CONVENTIONAL_CELL = True

# Stoichiometric formula of the slab termination to be used.
SLAB_TERMINATION_FORMULA = None
# if None, the index of all possible terminations will be used
TERMINATION_INDEX = 0
```

These parameters will create a Pt(211) surface with:

- 6 atomic layers thickness
- 10 Å vacuum region
- Orthogonal z-axis
- Using the conventional unit cell

![Pt(211) Surface Setup](../../../images/tutorials/materials/defects/defect_surface_step_platinum/2-jl-setup-nb-surface.webp "Pt(211) Surface Setup")

### 2.4. Create the Slab

Run the notebook by clicking `Run` > `Run All` in the top menu. The notebook will generate the Pt(211) surface.

![Pt(211) Surface](../../../images/tutorials/materials/defects/defect_surface_step_platinum/3-wave-result-pt-211-surface.webp "Pt(211) Surface")

## 3. Method II: Create Terrace Step Defect on Pt(111)

- More flexible control over step placement
- Larger surface area available
- Customizable terrace height
- Better for complex step arrangements

### 3.1. Open Terrace Defect Notebook

First, open `create_terrace_defect.ipynb`and select Pt as the input material.

### 3.2. Configure Terrace Parameters

`CUT_DIRECTION = [0, 1, 1]`  -- Normal vector for cutting plane, which will give a perfect periodic match along x and a match along y after rotation.
`DEFAULT_SLAB_PARAMETERS["miller_indices"] = (1, 1, 1)`  -- Miller indices for Pt(111) surface
`DEFAULT_SLAB_PARAMETERS["xy_supercell_matrix"] = [[2, 0], [0, 2]]` -- Supercell matrix for final structure (which will effectively control the size of the terrace)


```python
# Material selection
MATERIAL_INDEX = 0  # Which material to use from input list

# Terrace parameters
CUT_DIRECTION = [0, 1, 1]  # Normal vector describing a plane that cuts the terrace from added layers (Miller indices)
PIVOT_COORDINATE = [0.5, 0.5, 0.5]  # Point the cutting plane passes through, in crystal coordinates
NUMBER_OF_ADDED_LAYERS = 1  # Height of terrace in atomic layers
USE_CARTESIAN_COORDINATES = False  # Use cartesian instead of crystal coordinates
ROTATE_TO_MATCH_PBC = True  # Rotate to match periodic boundary conditions

# Slab parameters for creating a new slab if provided material is not a slab
DEFAULT_SLAB_PARAMETERS = {
    "miller_indices": (1, 1, 1),
    "thickness": 6,
    "vacuum": 10.0,
    "USE_ORTHOGONAL_C": True,
    "xy_supercell_matrix": [[2, 0], [0, 2]]
}

# Visualization parameters
SHOW_INTERMEDIATE_STEPS = True
CELL_REPETITIONS_FOR_VISUALIZATION = [1, 1, 1]  # Structure repeat in view
```

![Terrace Parameters](../../../images/tutorials/materials/defects/defect_surface_step_platinum/4-jl-setup-nb-terrace.webp "Terrace Parameters")

### 3.3. Create the Terrace

Run the notebook to create the Pt(111) surface with a terrace step.

![Pt(111) Surface with Terrace Step](../../../images/tutorials/materials/defects/defect_surface_step_platinum/5-wave-result-pt-terrace.webp "Pt(111) Surface with Terrace Step")

The same material with repetitions:

![Pt(111) Surface with Terrace Step with repetitions](../../../images/tutorials/materials/defects/defect_surface_step_platinum/6-wave-result-pt-terrace-repetitions.webp "Pt(111) Surface with Terrace Step with repetitions")

The user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 4. Interactive JupyterLite Notebook

The following JupyterLite notebook demonstrates both approaches. Select "Run" > "Run All Cells" to execute the notebook.

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_surface_step_platinum.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 5. References
