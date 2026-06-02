---
tags:
  - defects
  - island
  - surface
  - surface-defects
  - TiN
  - nitrogen
  - titanium
  - D-2D-ISL

hide:
  - tags
# YAML header
render_macros: true
---

# Island Surface Defect Formation in TiN.

## Introduction.

This tutorial demonstrates the process of creating material with island on the surface of TiN(001) based on the work presented in the following manuscript.

[//]: # (<embed src="https://journals.aps.org/prb/abstract/10.1103/PhysRevB.97.035406" width="100%" height="300">)

!!!note "Manuscript"
    **D. G. Sangiovanni, A. B. Mei, D. Edström, L. Hultman, V. Chirita, I. Petrov, and J. E. Greene**, 
    "Effects of surface vibrations on interlayer mass transport: Ab initio molecular dynamics investigation of Ti adatom descent pathways and rates from TiN/TiN(001) islands", Physical Review B, 2018. [DOI: 10.1103/PhysRevB.97.035406](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.97.035406){:target='_blank'}. [@Sangiovanni2018]

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create a slab of TiN, identify the cartesian coordinates for an island on the surface, and build it. 

We will focus on creating graphene-nitrogen structures from FIG. 2.
Specifically, the material from FIG. 2. a) of the paper: 


![Surface Defect](../../../images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/0.png "Surface Defect, Island FIG. 2. a)")


## 1. Create and preview TiN Slab.

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the graphene material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Standata Graphene Import](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/1-standata-graphene.webp "Standata Graphene Import")


Then we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create a TiN slab.

### 1.1. Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")


### 1.2. Open and modify the notebook.

Next, edit `create_slab.ipynb` notebook to modify the parameters by adding the following content to the "1.1. Set up slab parameters" cell in the notebook:

```python
# Enable interactive selection of terminations via UI prompt
IS_TERMINATIONS_SELECTION_INTERACTIVE = False 

MILLER_INDICES = (0, 0, 1)
THICKNESS = 3  # in atomic layers
VACUUM = 10.0  # in angstroms
XY_SUPERCELL_MATRIX = [[10, 0], [0, 10]]
USE_ORTHOGONAL_C = True
USE_CONVENTIONAL_CELL = True

# Stoichiometric formula of the slab termination to be used.
SLAB_TERMINATION_FORMULA = None
# if None, the index of all possible terminations will be used
TERMINATION_INDEX = 0
```

### 1.3. Run the Notebook.

Run the notebook by clicking `Run` > `Run All` in the top menu to run cells and wait for the results to appear.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 1.4. Analyze the Results.

After running the notebook, the user will be able to visualize the created TiN slab.

![Review the Results](../../../images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/1.png "Review the Results")

We don't need to save the material at this point, as we will recreate the slab with island on the surface in the next notebook. This step is needed to identify the coordinates of the island vertices.

## 2. Identifying the Island vertices coordinates.

We are creating an island defect that covers an area of 4.5x4.5 unit cells (which corresponds to 9x9 atoms). This island will be placed inside a 10x10 supercell (20x20 atoms). 
To position the island correctly, we need to select coordinates that are `0.45` crystal units apart along both lattice directions (a and b), ensuring the island is centered. 

The initial coordinates for this are `[0.0, 0.0]` and `[0.45, 0.45]`.

To ensure the island starts from the Ti atom on the edge in the next layer, we will slightly adjust the coordinates:

- Shift the left border by `0.05` (1/20 of the distance between atoms),
- Shift the top border by `-0.05` (also 1/20 of the atom spacing). 

For the z-axis, the first vertex will have a z-component of `0` (starting at the base of the supercell), and the second vertex will have a z-component of `1` (reaching the top of the supercell), ensuring the island spans the entire z-direction.

The coordinates after these adjustments are: `[0.05, 0.0, 0]` and `[0.45, 0.4, 1]`.

Finally, to move the island to the center of the supercell, add 2 unit cells (2/10 of the supercell size) to both island vertex coordinates.

The final centered coordinates of the island are: `[0.25, 0.2, 0]` and `[0.65, 0.6, 1]`.

These coordinates will be used in the next step to create the island on the surface.

## 3. Create Island on the Surface.

### 3.1. Open `create_point_defect.ipynb` notebook.

Close the current notebook. `Introduction` notebook should be open by default.

Find `create_island_defect.ipynb` in the list of notebooks and double-click open it.

### 3.2. Modify the notebook.

Next, edit `create_island_defect.ipynb` notebook to modify the parameters by adding a list of [defect configuration objects](https://github.com/Exabyte-io/made/blob/3d938b4d91a31323dca7a02acb12b646dbb26634/src/py/mat3ra/made/tools/build/defect/configuration.py#L191) containing the cartesian coordinates of the island vertices.

With the same TiN material selected in the materials input and coordinates for the island vertices from the previous step, the user can create the island on the surface.

Notice, that we did not create the slab yet, so it is necessary to provide slab parameters in this notebook.

Copy the below content and edit the "1.1. Set up defect parameters" cell in the notebook as follows:

```python
# Shape-specific parameters
# Choose the island shape: 'cylinder', 'sphere', 'box', or 'triangular_prism'
# and the corresponding parameters
SHAPE_PARAMETERS = {
    'shape': 'box',
    'min_coordinate': [0.25, 0.2, 0],
    'max_coordinate': [0.65, 0.6, 1]
}

# Common parameters
CENTER_POSITION = [0.5, 0.5, 0.5]  # Center of the island
USE_CARTESIAN_COORDINATES = False  # Use Cartesian coordinates for the island
NUMBER_OF_ADDED_LAYERS = 0.5  # Number of layers to add to the island

# Vacuum parameters for builder
AUTO_ADD_VACUUM = True  # Automatically add vacuum to the slab
VACUUM_THICKNESS = 10.0  # Thickness of the vacuum

# Slab parameters for creating a new slab if provided material is not a slab
DEFAULT_SLAB_PARAMETERS = {
    "miller_indices": (0,0,1),
    "thickness": 3,
    "vacuum": 0.0,
    "use_orthogonal_c": True,
    "xy_supercell_matrix": [[10, 0], [0, 10]]
}
```

Here's the visual of the updated content:

![Notebook setup](../../../images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/island-setup.png "Notebook setup")

## 4. Run the Notebook.

Run the notebook by clicking `Run` > `Run All` in the top menu to run cells and wait for the results to appear.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

## 5. Analyze the Results.

After running the notebook, the user will be able to visualize the created material with the island on the surface.

![Review the Results](../../../images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/original-result.png "Review the Results")

## 6. Pass the Material to Materials Designer.

The user can pass the resulting material to the current Materials Designer environment and save it.

<img data-gifffer="/images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/final-material.gif" alt="Resulting Material: Island on the TiN Surface" />

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.


## Interactive JupyterLite Notebook.

The following JupyterLite notebook demonstrates the process of creating material with island. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_surface_island_titanium_nitride.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## References.
