---
tags:
  - slab
  - strontium titanate
  - SrTiO3
  - terminations
  - surface
  - P-2D-SLB-S

hide:
  - tags
# YAML header
render_macros: true
---

# Strontium Titanate Slabs.

## Introduction.

This tutorial demonstrates the process of creating strontium titanate (SrTiO<sub>3</sub>) slabs based on the work presented in the following manuscript, where the electronic properties of SrTiO<sub>3</sub> slabs are studied.


!!!note "Manuscript"
    R. I. Eglitis and David Vanderbilt
    "First-principles calculations of atomic and electronic structure of SrTiO3 (001) and (011) surfaces"
    Phys. Rev. B 77, 195408 (2008)
    [DOI: 10.1103/PhysRevB.77.195408](https://doi.org/10.1103/PhysRevB.77.195408) [@Eglitis2008; @Mukhopadhyay2006]


We will focus on creating SrTiO<sub>3</sub> (011) slabs with different terminations from FIG. 2.

![Strontium Titanate Slabs](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/0-figure-from-manuscript.webp "Strontium Titanate Slabs, FIG. 2.")

## 1. Create Strontium Titanate Slab.

### 1.1. Load Strontium Titanate Material.

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the strontium titanate material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Strontium Titanate Material](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/original-material.webp "Strontium Titanate Material")

### 1.2. Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 1.3. Open `create_slab.ipynb` notebook.

Find `create_slab.ipynb` in the list of notebooks and click/double-click open it.

### 1.4. Open and modify the notebook.

Next, we need to create a SrTiO<sub>3</sub> slab with the (011) orientation.

We'll specify the orientation of the slab with Miller indices of `(0,1,1)` as described in the manuscript.

The rest of the parameters can be left as default.

The notebook detects possible terminations and allows for selection.

Terminations can be selected interactively by setting the `IS_TERMINATIONS_SELECTION_INTERACTIVE` flag to `True` and after running the notebook waiting for the prompt to select the termination.


Edit notebook in 1.1. to set parameters of slab:

```python
# Enable interactive selection of terminations via UI prompt
IS_TERMINATIONS_SELECTION_INTERACTIVE = False 

MILLER_INDICES = (0, 1, 1)
THICKNESS = 3  # in atomic layers
VACUUM = 10.0  # in angstroms
XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
USE_ORTHOGONAL_C = True
USE_CONVENTIONAL_CELL = True

# Stoichiometric formula of the slab termination to be used.
SLAB_TERMINATION_FORMULA = None
# if None, the index of all possible terminations will be used
TERMINATION_INDEX = 0
```

![Setup Slab Parameters](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/jl-setup.webp "Setup Slab Parameters")


In the case of some terminations not being detected, we'll need to rotate input material before creating the configuration by adding `rotate(material, axis=[1,0,0], angle=10)` (angle set in degrees) to the cell 1.3. Get input materials:

```python
from utils.jupyterlite import get_materials
from mat3ra.made.tools.modify import rotate

materials = get_materials(globals())
material = materials[0]
material = rotate(material, axis=[1,0,0], angle=10)
``` 

This will allow for symmetry breaking and correct detection for all possible terminations.

![Rotate Material](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/jl-setup-rotation.webp "Rotate Material")

### 1.5. Run the notebook.

After setting the parameters, run the notebook by selecting "Run > Run All Cells" from the menu.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")


## 2. Analyze the Results.

After running the notebook, the slabs for different possible terminations should apper in the preview.

![Strontium Titanate Slab](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/jl-result-preview.webp "Strontium Titanate Slab")

### 2.1. Select the desired termination.

If the interactive selection of terminations is enabled, select the desired termination from the list or change the `TERMINATION_INDEX` parameter in the notebook and rerun it.

## 3. Pass the Material to Materials Designer.

The user can pass the material with the selected termination in the current Materials Designer environment and save it.

![Final Material](../../../images/tutorials/materials/2d_materials/slab_strontium_titanate/wave-result.webp "Strontium Titanate Slab")


Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## Interactive JupyterLite Notebook.

The following JupyterLite notebook demonstrates the process of creating strontium titanate slabs. Select "Run" > "Run All Cells".


{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/slab_strontium_titanate.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## References.

