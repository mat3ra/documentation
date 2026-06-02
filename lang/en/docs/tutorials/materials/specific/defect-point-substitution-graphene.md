---
tags:
  - defects
  - graphene
  - substitutional
  - point-defects
  - nitrogen
  - D-0D-SUB

hide:
  - tags
# YAML header
render_macros: true
---

# Substitutional Point Defects in Graphene.

## 1. Introduction

This tutorial demonstrates the process of creating materials with substitution defects, based on the work presented in the following manuscript, where nitrogen defects in graphene are studied.

[//]: # (<embed src="https://journals.aps.org/prb/abstract/10.1103/PhysRevB.84.245446" width="100%" height="300">)

!!!note "Manuscript"
    Yoshitaka Fujimoto and Susumu Saito, "Formation, stabilities, and electronic properties of nitrogen defects in graphene", Physical Review B, 2011. [DOI: 10.1103/PhysRevB.84.245446](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.84.245446){:target='_blank'}. [@Yoshitaka2011]

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create a supercell of graphene, identify the crystal site positions for defects, and introduce nitrogen atoms and vacancies accordingly.

We will focus on creating graphene-nitrogen structures from FIG. 1.
Specifically, the material from FIG. 1. b) of the paper: 


![Point Defect, Substitution, 0](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/0-figure-from-manuscript.webp "Point Defect, Substitution, FIG. 1.")


## 2. Create Graphene Supercell

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the graphene material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Standata Graphene Import](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/1-standata-graphene.webp "Standata Graphene Import")

We then use the [Advanced]({{ interface_url }}/materials-designer/header-menu/advanced/supercell/) menu to create a supercell of graphene with a size of 4x4x1.

![Supercell Creation for Graphene](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/2-advanced-supercell.webp "Supercell Graphene")

## 3. Identify Defect Sites
Next, we can toggle the coordinates measurement in the editor to identify the crystal site positions for the defects.

![Coordinates Measurement](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/4-toggle-measure-coordinates.webp "3D Editor Toggle Coordinates")

Clicking on each atom will copy the coordinates of the atom to the clipboard as an array, which can then be pasted into the cell of the notebook and used to assign the defect coordinates.

![3D Editor Coordinates](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/4-3d-editor-coordinates.webp "3D Editor Coordinates Copying")


## 4. Create Nitrogen Defects and Vacancies

For the defect creation, we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment with the corresponding notebook.

### 4.1. Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 4.2. Open `create_point_defect.ipynb` notebook

Find `create_point_defect.ipynb` in the list of notebooks and click/double-click open it.

### 4.3. Open and modify the notebook

Next, edit `create_point_defect.ipynb` notebook to modify the parameters by adding a list of [defect configuration objects](https://github.com/Exabyte-io/made/blob/3d938b4d91a31323dca7a02acb12b646dbb26634/src/py/mat3ra/made/tools/build/defect/configuration.py#L32) containing the approximate coordinates of the atoms to replace.

Copy the below content and edit the "1.1. Set up defect parameters" cell in the notebook as follows:

```python
# Selected material will be used as a unit cell to create a supercell first.
SUPERCELL_MATRIX = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

DEFECT_CONFIGS = [
    {
        "type": "substitution",
        "coordinate": [4.9, 2.85, 10],
        "element": "N",
        "placement_method": "closest_site",
        "use_cartesian_coordinates": True
    },
      {
        "type": "substitution",
        "coordinate": [3.7, 4.9, 10],
        "element": "N",
        "placement_method": "closest_site",
        "use_cartesian_coordinates": True
    },
      {
        "type": "substitution",
        "coordinate": [2.45, 2.85, 10],
        "element": "N",
        "placement_method": "closest_site",
        "use_cartesian_coordinates": True
    },
      {
        "type": "vacancy",
        "coordinate": [3.7, 3.55, 10],
        "placement_method": "closest_site",
        "use_cartesian_coordinates": True
    },
]
```

Here's the visual of the updated content:

![Notebook setup](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/5-jl-setup.webp "Notebook setup")

## 5. Run the Notebook

Run the notebook by clicking `Run` > `Run All` in the top menu to run cells and wait for the results to appear.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

## 6. Analyze the Results

After running the notebook, the user will be able to visualize the structure of Graphene with substitution defects.

![Review the Results](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/6-jl-result-preview.webp "Review the Results")

## 7. Pass the Material to Materials Designer

The user can pass the material with substitution defects in the current Materials Designer environment and save it.

![Final Material](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/7-wave-result.webp "N-doped Graphene")

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.


## 8. Interactive JupyterLite Notebook

The following JupyterLite notebook demonstrates the process of creating materials with substitution defects in graphene. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_substitution_graphene.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 9. References
