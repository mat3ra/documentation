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

## Introduction.

This tutorial demonstrates the process of creating a graphene structure with an adatom on the surface based on the work presented in the following manuscript.

!!!note "Manuscript"
    **Kevin T. Chan, J. B. Neaton, and Marvin L. Cohen**, 
    "First-principles study of metal adatom adsorption on graphene" Phys. Rev. B 77, 235430, 2008
    [DOI: 10.1103/PhysRevB.77.235430](https://doi.org/10.1103/PhysRevB.77.235430){:target='_blank'}. [@Chan2008]

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create a graphene structure with a metal adatom on the surface.

The image shows the adatom on the graphene surface.

![Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/me_adatom_on_hollow_graphene.webp "Fig. 1. Adatom on Graphene Surface")

## 1. Load and preview Graphene structure.

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the Graphene material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Standata Graphene Import](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/1-standata-graphene.webp "Standata Graphene Import")

Then we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create a graphene structure with an adatom on the surface.

## 2. Add Li adatom.

### 2.1 Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 2.2. Open and modify the notebook.

Next, edit `create_adatom_defect.ipynb` notebook to modify the parameters by changing values:

 - `CHEMICAL_ELEMENT = "Li"` - the element of the adatom

 - `APPROXIMATE_POSITION_ON_SURFACE = [0.5, 0.5]` - position that corresponds to the hollow site in the center of the cell

 - `DISTANCE_Z = 1.71` - the distance between the adatom and the graphene surface (from the Table 1 in the manuscript)

 - `MILLER_INDICES = (0,0,1)` - the Miller indices of the plane of Graphene

 - `SLAB_THICKNESS = 1` - the thickness of the Graphene monolayer slab

 - `SUPERCELL_MATRIX = [[4, 0, 0], [0, 4, 0], [0, 0, 1]]` - the supercell matrix

Copy the content below and adjust the "1.1. Set up slab parameters" cell in the notebook:

```python
# Index in the list of materials, to access as materials[MATERIAL_INDEX]
MATERIAL_INDEX = 0
ELEMENT = "Li"  # Chemical element of the adatom

# Dictionaries are validated and converted to AdatomDefectDict objects below
DEFECT_CONFIGS = [
    {
        "type": "adatom",
        "coordinate_2d": [0.5, 0.5], # Crystal coordinates on the surface (x, y)
        "distance_z": 1.71,  # Method to place the adatom
        "element": ELEMENT,
    }
]


PLACEMENT_METHOD = "equidistant"  # Method to place the adatom, e.g., "new_crystal_site", "exact_coordinate", "equidistant"


# Slab parameters
MILLER_INDICES = (0, 0, 1)  # Miller indices of the surface
SLAB_THICKNESS = 1  # Thickness of the slab in unit cells
VACUUM = 6.0  # Vacuum thickness in Angstrom
XY_SUPERCELL_MATRIX = [[4, 0], [0, 4]]  # Supercell matrix for the slab
TERMINATION_FORMULA = None  # Stoichiometric formula of the slab termination to be used.
```

### 2.3. Run the notebook.

Run the notebook by selecting "Run > Run All Cells" from the menu.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 2.4. Analyze the Results.

After running the notebook, the Graphene structure with a Li adatom on the surface will be created.

The user will be able to visualize the created structure and download the corresponding files.

![Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-li.webp "Li Adatom on Graphene Surface")

### 2.5. Pass the Material to the Materials Designer.

After reviewing the results, the user can pass the material to Materials Designer for further analysis.

![Final Material](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/wave-result-li.webp "Li Adatom on Graphene Surface")

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 3. Add other metal adatoms.

### 3.1. Repeat the steps above.

To create a Graphene structure with other metal adatoms, repeat the steps above by changing the `CHEMICAL_ELEMENT`, `APPORXIMATE_POSITION_ON_SURFACE`, and `DISTANCE_Z` parameters according to he values in the table 1 of the manuscript.
Notice, that some of the adatoms have more favorable position on top or bridge sites.

For example, to create a Graphene structure with a Na adatom, adjust the parameters as follows:

```python
CHEMICAL_ELEMENT = "Na"
COORDINATE_2D = [0.5, 0.5]
DISTANCE_Z = 2.28
```

![Na Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-na.webp "Na Adatom on Graphene Surface")

For K adatom on hollow site:
```python
CHEMICAL_ELEMENT = "K"
COORDINATE_2D = [0.5, 0.5]
DISTANCE_Z = 2.60
```

![K Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-k.webp "K Adatom on Graphene Surface")


For Ca adatom on hollow site:
```python
CHEMICAL_ELEMENT = "Ca"
COORDINATE_2D = [0.5, 0.5]
DISTANCE_Z = 2.29
```

![Ca Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-ca.webp "Ca Adatom on Graphene Surface")


For Al adatom on hollow site:
```python
CHEMICAL_ELEMENT = "Al"
COORDINATE_2D = [0.5, 0.5]
DISTANCE_Z = 2.13
```

![Al Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-al.webp "Al Adatom on Graphene Surface")


For Ga adatom on hollow site:
```python
CHEMICAL_ELEMENT = "Ga"
COORDINATE_2D = [0.5, 0.5]
DISTANCE_Z = 2.20
```

![Ga Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-ga.webp "Ga Adatom on Graphene Surface")


For In adatom on hollow site:
```python
CHEMICAL_ELEMENT = "In"
COORDINATE_2D = [0.5, 0.5]
DISTANCE_Z = 2.45
```

![In Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-in.webp "In Adatom on Graphene Surface")


For Sn adatom on top site:
```python
CHEMICAL_ELEMENT = "Sn"
COORDINATE_2D = [7/12, 5/12]
DISTANCE_Z = 2.82
```

![Sn Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-sn.webp "Sn Adatom on Graphene Surface")


For Ti adatom on hollow site:
```python
CHEMICAL_ELEMENT = "Ti"
APPROXIMATE_POSITION_ON_SURFACE = [0.5, 0.5]
DISTANCE_Z = 1.80
```

![Ti Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-ti.webp "Ti Adatom on Graphene Surface")
    
For Fe adatom on hollow site:
```python
CHEMICAL_ELEMENT = "Fe"
APPROXIMATE_POSITION_ON_SURFACE = [0.5, 0.5]
DISTANCE_Z = 1.53
```

![Fe Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-fe.webp "Fe Adatom on Graphene Surface")


For Pd adatom on bridge site:
```python
CHEMICAL_ELEMENT = "Pd"
APPROXIMATE_POSITION_ON_SURFACE = [3/8, 1/2]
DISTANCE_Z = 2.21
```


![Pd Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-pd.webp "Pd Adatom on Graphene Surface")


For Au adatom on top site:
```python
CHEMICAL_ELEMENT = "Au"
APPROXIMATE_POSITION_ON_SURFACE = [7/12, 5/12]
DISTANCE_Z = 2.69
```

![Au Adatom on Graphene Surface](../../../images/tutorials/materials/defects/defect-surface-adatom-graphene/jl-result-preview-au.webp "Au Adatom on Graphene Surface")

## Interactive JupiterLite Notebook.

The interactive JupyterLite notebook for creating Graphene structures with metal adatoms can be accessed below. To run the notebook, click on the "Run All" button.

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_surface_adatom_graphene.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## References.
