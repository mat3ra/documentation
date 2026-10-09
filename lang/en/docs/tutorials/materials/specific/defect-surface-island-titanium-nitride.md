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

## 1. Introduction

This tutorial demonstrates the process of creating material with island on the surface of TiN(001) based on the work presented in the following manuscript.

[//]: # (<embed src="https://journals.aps.org/prb/abstract/10.1103/PhysRevB.97.035406" width="100%" height="300">)

!!!note "Manuscript"
    **D. G. Sangiovanni, A. B. Mei, D. Edström, L. Hultman, V. Chirita, I. Petrov, and J. E. Greene**, 
    "Effects of surface vibrations on interlayer mass transport: Ab initio molecular dynamics investigation of Ti adatom descent pathways and rates from TiN/TiN(001) islands", Physical Review B, 2018. [DOI: 10.1103/PhysRevB.97.035406](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.97.035406){:target='_blank'}. [@Sangiovanni2018]

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create a slab of TiN, identify the crystal coordinates for an island on the surface, and build it. 

The target is the manuscript's 458-atom cell (Sec. II.A, Fig. 1b): a 5×5-atom island with Ti corners on a TiN(001) slab of 12×12 sites and three (001) planes with 15.3 Å of vacuum, and a Ti adatom at each of the sites a, c and i of Fig. 6. It is built by the notebook in Section 8; the Materials Designer steps below build the island slab before its bottom plane is removed. FIG. 2. a) of the paper, below, shows the larger 9×9-atom island:


![Surface Defect](../../../images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/0.png "Surface Defect, Island FIG. 2. a)")


## 2. Create and preview TiN Slab

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import TiN (`mp-492`) from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).


Then we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create a TiN slab.

### 2.1. Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")


### 2.2. Open and modify the notebook

Next, edit `create_slab.ipynb` notebook to modify the parameters by adding the following content to the "1.1. Set up slab parameters" cell in the notebook:

```python
# Enable interactive selection of terminations via UI prompt
IS_TERMINATIONS_SELECTION_INTERACTIVE = False 

MILLER_INDICES = (0, 0, 1)
THICKNESS = 2  # in conventional layers, each of two (001) planes
VACUUM = 15.3  # in angstroms
XY_SUPERCELL_MATRIX = [[6, 0], [0, 6]]
USE_ORTHOGONAL_C = True
USE_CONVENTIONAL_CELL = True

# Stoichiometric formula of the slab termination to be used.
SLAB_TERMINATION_FORMULA = None
# if None, the index of all possible terminations will be used
TERMINATION_INDEX = 0
```

### 2.3. Run the Notebook

Run the notebook by clicking `Run` > `Run All` in the top menu to run cells and wait for the results to appear.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 2.4. Analyze the Results

After running the notebook, the user will be able to visualize the created TiN slab.

![Review the Results](../../../images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/1.png "Review the Results")

We don't need to save the material at this point, as we will recreate the slab with island on the surface in the next notebook. This step is needed to identify the coordinates of the island vertices.

## 3. Identifying the Island vertices coordinates

The island covers 5×5 atoms of the 6×6 supercell (12×12 sites), where the site spacing is 1/12 ≈ 0.0833 crystal units along both lattice directions (a and b). A box `0.4` crystal units wide encloses five sites in each direction.

The x minimum of the box, `0.3233`, is one site spacing above its y minimum, `0.24`: this puts Ti atoms at the four island corners, as in the manuscript.

For the z-axis, the first vertex will have a z-component of `0` (starting at the base of the supercell), and the second vertex will have a z-component of `1` (reaching the top of the supercell), ensuring the island spans the entire z-direction.

The coordinates of the island vertices are: `[0.3233, 0.24, 0]` and `[0.7233, 0.64, 1]`.

These coordinates will be used in the next step to create the island on the surface.

## 4. Create Island on the Surface

### 4.1. Open `create_island_defect.ipynb` notebook

Close the current notebook. `Introduction` notebook should be open by default.

Find `create_island_defect.ipynb` in the list of notebooks and double-click open it.

### 4.2. Modify the notebook

Next, edit `create_island_defect.ipynb` notebook to modify the parameters by adding a list of [defect configuration objects](https://github.com/mat3ra/made/blob/3d938b4d91a31323dca7a02acb12b646dbb26634/src/py/mat3ra/made/tools/build/defect/configuration.py#L191) containing the crystal coordinates of the island vertices.

With the same TiN material selected in the materials input and coordinates for the island vertices from the previous step, the user can create the island on the surface.

Notice, that we did not create the slab yet, so it is necessary to provide slab parameters in this notebook.

Copy the below content and edit the "1.1. Set up defect parameters" cell in the notebook as follows:

```python
# Shape-specific parameters
# Choose the island shape: 'cylinder', 'sphere', 'box', or 'triangular_prism'
# and the corresponding parameters
SHAPE_PARAMETERS = {
    'shape': 'box',
    'min_coordinate': [0.3233, 0.24, 0],
    'max_coordinate': [0.7233, 0.64, 1]
}

# Common parameters
CENTER_POSITION = [0.5, 0.5, 0.5]  # Center of the island
USE_CARTESIAN_COORDINATES = False  # Use Cartesian coordinates for the island
NUMBER_OF_ADDED_LAYERS = 0.5  # Number of layers to add to the island

# Slab parameters for creating a new slab if provided material is not a slab
DEFAULT_SLAB_PARAMETERS = {
    "miller_indices": (0,0,1),
    "thickness": 2,  # conventional layers of two (001) planes
    "vacuum": 15.3,
    "use_orthogonal_c": True,
    "xy_supercell_matrix": [[6, 0], [0, 6]]
}
```

The slab built this way has four (001) planes. The combined notebook in Section 8 removes the bottom plane once the island is added and resets the vacuum to 15.3 Å, which leaves three slab planes under the island and 457 atoms:

```python
bottom_plane = get_atom_indices_by_layer(slab_with_island)[0]
slab_with_island = filter_by_ids(slab_with_island, ids=bottom_plane, invert=True, reset_ids=True)
slab_with_island = remove_vacuum(slab_with_island, fixed_padding=SLAB_PARAMETERS["vacuum"])
```

## 5. Run the Notebook

Run the notebook by clicking `Run` > `Run All` in the top menu to run cells and wait for the results to appear.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

## 6. Analyze the Results

After running the notebook, the user will be able to visualize the created material with the island on the surface.

![Review the Results](../../../images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/original-result.png "Review the Results")

### 6.1. Add the adatom at the sites of Fig. 6

The notebook in Section 8 places the Ti adatom one bulk site spacing above the plane of each site: **a**, the fourfold hollow on the island between the edge N atom with the smaller x and the edge-centre Ti, the manuscript's FFH_edge; **c**, atop that edge N; **i**, atop the terrace N in front of it:

```python
adatom_sites = {
    "a": [edge_nitrogen_x + site_spacing / 2, edge_y - site_spacing / 2, island_z + site_spacing],
    "c": [edge_nitrogen_x, edge_y, island_z + site_spacing],
    "i": [edge_nitrogen_x, edge_y + site_spacing, terrace_z + site_spacing],
}
```

## 7. Pass the Material to Materials Designer

The user can pass the resulting material to the current Materials Designer environment and save it.

<img data-gifffer="/images/tutorials/materials/defects/defect-creation-surface-island-titanium-nitride/final-material.gif" alt="Resulting Material: Island on the TiN Surface" />

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

The combined notebook in Section 8 saves four materials: `TiN(001) 12x12x3 island 5x5`, and the same cell with the Ti adatom at each site, `TiN(001) 12x12x3 island 5x5 + Ti a (FFH island)`, `TiN(001) 12x12x3 island 5x5 + Ti c (atop-N edge)`, and `TiN(001) 12x12x3 island 5x5 + Ti i (atop-N terrace)`. The [Ti Adatom Descent on a TiN Island (MACE)](defect-surface-island-titanium-nitride-simulation.md) tutorial loads them by these names.


## 8. Interactive JupyterLite Notebook

The following JupyterLite notebook demonstrates the process of creating material with island. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_surface_island_titanium_nitride.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 9. References
