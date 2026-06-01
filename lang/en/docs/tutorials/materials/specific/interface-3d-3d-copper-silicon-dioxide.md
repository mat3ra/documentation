---
tags:
  - 3D
  - copper
  - cristobalite
  - interface
  - termination
  - SiO2
  - Cu
  - C-2D-INT-Z

hide:
  - tags
# YAML header
render_macros: true
---

# Interfaces between 3D Materials: Copper and SiO2 (Cristobalite).

## Introduction.

This tutorial demonstrates the process of creating interfaces between 3D materials, specifically copper (Cu) and cristobalite (SiO<sub>2</sub>), based on the work presented in the following manuscript, where the electronic properties of Cu-SiO<sub>2</sub> interfaces are studied.

!!!note "Manuscript"
    **Shan, T.-R., Devine, B. D., Phillpot, S. R., & Sinnott, S. B.** 
    "Molecular dynamics study of the adhesion of Cu/SiO2interfaces using a variable-charge interatomic potential."
    Physical Review B, 83(11). 
    [DOI: 10.1103/PhysRevB.83.115327](https://doi.org/10.1103/PhysRevB.83.115327) [@Shan2011].

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create interfaces between Cu and Cristobalite with different termination pairs.

The FIG. 1. shows the interfaces with different terminations between Cu and Cristobalite.

![Copper on Cristobalite](../../../images/tutorials/materials/interfaces/interface_3d_3d_copper_cristobalite/0-figure-from-manuscript.webp   "Copper on Cristobalite, FIG. 1")


## 1. Load and Preview Materials.

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import copper and cristobalite materials from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

Then use the [JupyterLite](../../../jupyterlite/overview.md) environment to create the target structures.


## 2. Create Interface Between Copper and Cristobalite.

### 2.1 Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")


### 2.2 Open and Modify the Notebook.

Select the input materials with the first being the substrate (SiO₂) and the second being the film (Cu).

Open the `create_interface_with_min_strain_zsl.ipynb` notebook and modify the parameters as follows:

- Miller indices of both materials: `(0, 0, 1)` -- as mentioned in the publication.
- Thickness of both materials: `3` (in atomic layers, will resolve to 6 layers for Cu and 9 layers for SiO₂, as mentioned in the publication)
- Distance between materials: `2.4` Å (to achieve Cu-O bond of ~2.4 Å, as stated in the publication's results)
- Interface vacuum: `18.0` Å (as mentioned in the publication)

Let's set MAX_AREA to `150` Å² to allow for a larger search area for the superlattice search algorithm.

`TERMINATION_PAIR_INDEX` will be set to `0` to get interface with `Cu/Si` termination and `1` to get `Cu/O` termination. Terminations for the interfaces can be viewed further down in the notebook. 


Adjust the "1.1. Set up slab parameters" cell as shown:

```python
# Enable interactive selection of terminations via UI prompt
IS_TERMINATIONS_SELECTION_INTERACTIVE = False

FILM_INDEX = 1  # Index in the list of materials, to access as materials[FILM_INDEX]
FILM_MILLER_INDICES = (0, 0, 1)
FILM_THICKNESS = 3  # in atomic layers
FILM_TERMINATION_FORMULA = None  # if None, the first termination will be used
FILM_VACUUM = 0.0  # in angstroms
FILM_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
FILM_USE_ORTHOGONAL_C = True

SUBSTRATE_INDEX = 0
SUBSTRATE_MILLER_INDICES = (0, 0, 1)
SUBSTRATE_THICKNESS = 3  # in atomic layers
SUBSTRATE_TERMINATION_FORMULA = None  # if None, the first termination will be used
SUBSTRATE_VACUUM = 0.0  # in angstroms
SUBSTRATE_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
SUBSTRATE_USE_ORTHOGONAL_C = True

INTERFACE_DISTANCE = 2.4  # Gap between substrate and film, in Angstrom
INTERFACE_VACUUM = 18.0  # Vacuum over film, in Angstrom

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

![Notebook setup](../../../images/tutorials/materials/interfaces/interface_3d_3d_copper_cristobalite/1-jl-setup-notebook.webp "Notebook setup")


### 2.3. Run the Notebook.

After setting the parameters, run the notebook to create the interface between Cu and SiO₂.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 2.4. View Results.

The generation might take some time.
After that, the user can pass the material to the Materials Designer for further analysis.

Interface between Copper and Cristobalite with the specified parameters is shown below.

![Cu/SiO2 Interface](../../../images/tutorials/materials/interfaces/interface_3d_3d_copper_cristobalite/2-jl-result-preview.webp "Cu/SiO2 Interface")


## 3. Pass the Material to Materials Designer.

The user can pass the material with the interface in the current Materials Designer environment and save it.

![Final Material](../../../images/tutorials/materials/interfaces/interface_3d_3d_copper_cristobalite/3-wave-result.webp "Cu/SiO2 Interface")

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 4. Create Interfaces with other Terminations.

To create interfaces with other terminations, repeat the steps 1 - 4 and change the `TERMINATION_PAIR_INDEX` parameter to `1` to get the interface with `Cu/O` termination.

Or use the interactive selection of terminations by setting `IS_TERMINATIONS_SELECTION_INTERACTIVE = True`, rerunning the notebook, and selecting the desired termination from the list. 


## Interactive JupyterLite Notebook.

The interactive JupyterLite notebook for creating interfaces between Copper and Cristobalite is embedded below. To run the notebook, click on the "Run All" button.


{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_3d_3d_copper_cristobalite.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## References.
