---
tags:
  - adatom
  - graphene
  - metal
  - surface
  - defect
  - D-2D-ADA

hide:
  - tags
# YAML header
render_macros: true
---

# Adatom on Graphene Surface.

## 1. Introduction

This tutorial demonstrates the process of creating a graphene structure with an adatom on the surface based on the work presented in the following manuscript.

!!!note "Manuscript"
    **Kevin T. Chan, J. B. Neaton, and Marvin L. Cohen**, 
    "First-principles study of metal adatom adsorption on graphene" Phys. Rev. B 77, 235430, 2008
    [DOI: 10.1103/PhysRevB.77.235430](https://doi.org/10.1103/PhysRevB.77.235430){:target='_blank'}. [@Chan2008]

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create a graphene structure with a metal adatom on the surface.

The image shows the adatom on the graphene surface.

![Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/me_adatom_on_hollow_graphene.webp "Fig. 1. Adatom on Graphene Surface")

## 2. Open Materials Designer

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/).

Then we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create a graphene structure with an adatom on the surface.

## 3. Add the adatoms

### 3.1. Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 3.2. Open and modify the notebook

Next, open the `specific_examples/defect_surface_adatom_graphene.ipynb` notebook. Its "1.1. Set up defects parameters" cell holds the parameters:

```python
# Name of material to find in Standata
# Standata graphene has a = 2.465 Å; the manuscript uses a = 2.47 Å
MATERIAL_NAME = "Graphene"
XY_SUPERCELL_MATRIX = [[4, 0], [0, 4]]
VACUUM = 14.0  # in Angstrom, on top of the 1 Å left by vacuum removal: the manuscript's 15 Å cell height

CLEAN_LAYER_NAME = "Graphene 4x4"
ADATOM_CELL_NAME = "{chemical_element} on graphene 4x4 {site}"

PLACEMENT_METHOD = "exact_coordinate"

# hollow: hexagon centre, bridge: C–C midpoint, top: atop a C (manuscript Fig. 2), in crystal coordinates
SITE_POSITION_BY_NAME = {"hollow": [1 / 2, 1 / 2], "bridge": [3 / 8, 1 / 2], "top": [7 / 12, 5 / 12]}

# distance_z is the height h from Table I of the manuscript, where the relaxation starts.
# Uncomment the lines to create the defect for the desired adatom.
ADATOM_PARAMETERS = [
    {"chemical_element": "Li", "site": "hollow", "distance_z": 1.71},
    {"chemical_element": "Li", "site": "bridge", "distance_z": 1.88},
    {"chemical_element": "Li", "site": "top", "distance_z": 1.89},
    {"chemical_element": "Na", "site": "hollow", "distance_z": 2.28},
    {"chemical_element": "K", "site": "hollow", "distance_z": 2.60},
    # {"chemical_element": "Ca", "site": "hollow", "distance_z": 2.29},
    # {"chemical_element": "Al", "site": "hollow", "distance_z": 2.13},
    # {"chemical_element": "Ga", "site": "hollow", "distance_z": 2.20},
    # {"chemical_element": "In", "site": "hollow", "distance_z": 2.45},
    {"chemical_element": "Sn", "site": "top", "distance_z": 2.82},
    # {"chemical_element": "Ti", "site": "hollow", "distance_z": 1.80},
    # {"chemical_element": "Fe", "site": "hollow", "distance_z": 1.53},
    {"chemical_element": "Pd", "site": "bridge", "distance_z": 2.21},
    # {"chemical_element": "Au", "site": "top", "distance_z": 2.69},
]
```

The notebook loads graphene from Standata by `MATERIAL_NAME`. Removing the vacuum leaves a 1 Å cell height, and `VACUUM` adds 14 Å to it, so every cell is 15 Å high, as in the manuscript. `distance_z` in `ADATOM_PARAMETERS` is the height above the C plane from Table I of the manuscript, where the relaxation starts.

### 3.3. Run the notebook

Run the notebook by selecting "Run > Run All Cells" from the menu.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 3.4. Analyze the Results

After running the notebook, the clean layer and the adatom cells are created, all in the same 9.86 × 9.86 × 15.00 Å cell.

The user will be able to visualize the created structure and download the corresponding files.

![Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-li.webp "Li Adatom on Graphene Surface")

### 3.5. Pass the Material to the Materials Designer

The notebook passes eight materials to Materials Designer and writes them to the `uploads` folder: `Graphene 4x4`, `Li on graphene 4x4 hollow`, `Li on graphene 4x4 bridge`, `Li on graphene 4x4 top`, `Na on graphene 4x4 hollow`, `K on graphene 4x4 hollow`, `Sn on graphene 4x4 top` and `Pd on graphene 4x4 bridge`. The [adsorption energy tutorial](defect-surface-adatom-graphene-simulation.md) loads them by these names.

![Final Material](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/wave-result-li.webp "Li Adatom on Graphene Surface")

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 4. Add other metal adatoms

### 4.1. Select the adatoms

The rows of `ADATOM_PARAMETERS` for Ca, Al, Ga, In, Ti, Fe and Au are commented out; uncommenting a row builds and saves that cell as well. Some adatoms favor the top or bridge site.

For Na adatom on hollow site:

![Na Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-na.webp "Na Adatom on Graphene Surface")

For K adatom on hollow site:

![K Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-k.webp "K Adatom on Graphene Surface")


For Ca adatom on hollow site:

![Ca Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-ca.webp "Ca Adatom on Graphene Surface")


For Al adatom on hollow site:

![Al Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-al.webp "Al Adatom on Graphene Surface")


For Ga adatom on hollow site:

![Ga Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-ga.webp "Ga Adatom on Graphene Surface")


For In adatom on hollow site:

![In Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-in.webp "In Adatom on Graphene Surface")


For Sn adatom on top site:

![Sn Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-sn.webp "Sn Adatom on Graphene Surface")


For Ti adatom on hollow site:

![Ti Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-ti.webp "Ti Adatom on Graphene Surface")
    
For Fe adatom on hollow site:

![Fe Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-fe.webp "Fe Adatom on Graphene Surface")


For Pd adatom on bridge site:


![Pd Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-pd.webp "Pd Adatom on Graphene Surface")


For Au adatom on top site:

![Au Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-au.webp "Au Adatom on Graphene Surface")

## 5. Interactive JupiterLite Notebook

The interactive JupyterLite notebook for creating Graphene structures with metal adatoms can be accessed below. To run the notebook, click on the "Run All" button.

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_surface_adatom_graphene.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 6. References
