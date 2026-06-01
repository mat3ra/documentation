---
tags:
  - defects
  - vacancy
  - point-defects
  - h-BN
  - boron-nitride
  - 2D-materials
  - D-0D-VAC

hide:
  - tags
# YAML header
render_macros: true
---

# Vacancy Point Defects in Hexagonal Boron Nitride.

## Introduction.

This tutorial demonstrates the process of creating materials with vacancy point defects, based on the work presented in the following manuscript:

!!!note "Manuscript"
    Fabian Bertoldo, Sajid Ali, Simone Manti & Kristian S. Thygesen, "Quantum point defects in 2D materials - the QPOD database", Nature, 2022. [DOI:10.1038/s41524-022-00730-w](https://doi.org/10.1038/s41524-022-00730-w){:target='_blank'}. [@Bertoldo2022; @Kohan2000]

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) and JupyterLite environment to create a nanoribbon of hexagonal boron nitride (h-BN) and introduce vacancy defects. The process combines the capabilities of nanoribbon creation and point defect introduction.

We will focus on creating a structure similar to Figure 6 from the manuscript, which demonstrates boron vacancy defects in hexagonal boron nitride:

![Vacancy in h-BN](../../../images/tutorials/materials/defects/defect_point_vacancy_boron_nitride/0-figure-from-manuscript.webp "Vacancy in h-BN")

## 1. Import Base Material.

First, we need to import the hexagonal boron nitride (h-BN) material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/) database.

### 1.1. Open Materials Designer.

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and click on the "Input/Output" menu.

### 1.2. Import from Standata.

1. Select "Import from Standata" in the Input/Output menu
2. In the search box, enter "Boron Nitride"
4. Click on the h-BN material to import it

![Standata h-BN Import](../../../images/tutorials/materials/interfaces/twisted-bilayer-boron-nitride/standata-import-bn.png "Standata h-BN Import")

## 2. Create h-BN Nanoribbon.

Next, we'll create a nanoribbon structure using the JupyterLite environment.

### 2.1. Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 2.2. Open and Configure Nanoribbon Notebook.

Find and open `create_nanoribbon.ipynb` in the list of notebooks. Edit the nanoribbon parameters in section 1.1 of the notebook:

```python
# Index in the list of materials, to access as materials[MATERIAL_INDEX]
MATERIAL_INDEX = 0

# Widths and lengths are in number of unit cells
WIDTH = 3 # in unit cells
LENGTH = 6 # in unit cells
VACUUM_WIDTH = 0 # in Angstroms
VACUUM_LENGTH = 0 # in Angstroms
EDGE_TYPE = "zigzag" # "zigzag" or "armchair"
```

![Nanoribbon Parameters](../../../images/tutorials/materials/defects/defect_point_vacancy_boron_nitride/2-jl-nb-setup-nanoribbon.webp "Nanoribbon Parameters")

### 2.3. Run the Notebook.

Run the notebook by clicking `Run` > `Run All` in the top menu. This will create a nanoribbon structure from the imported h-BN material.

### 2.4. Review Nanoribbon in Materials Designer.

After the notebook completes:

1. The nanoribbon structure will be passed back to Materials Designer
2. User can view the structure in the 3D editor
3. Verify the nanoribbon dimensions and edge type

![Nanoribbon Preview](../../../images/tutorials/materials/defects/defect_point_vacancy_boron_nitride/3-wave-preview-nanoribbon.webp "Nanoribbon Preview")


## 3. Create the Vacancy Defect.

After creating the nanoribbon, we'll introduce the vacancy defect using the point defect notebook.

### 3.1. Open Point Defect Notebook.

Open `create_point_defect.ipynb` and modify the defect configuration parameters:

```python
# Selected material will be used as a unit cell to create a supercell first.
SUPERCELL_MATRIX = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

DEFECT_CONFIGS = [
    {
        "type": "vacancy",
        "coordinate": [0.5, 0.5, 0.5],
        "placement_method": "closest_site",
        "use_cartesian_coordinates": False
    }
]
```

The configuration specifies:

- `defect_type`: "vacancy" for removing an atom
- `approximate_coordinate`: Position in crystal coordinates where the vacancy will be created
- `use_cartesian_coordinates`: False to use fractional coordinates

![Point Defect Parameters](../../../images/tutorials/materials/defects/defect_point_vacancy_boron_nitride/4-jl-nb-setup-point-defect.webp "Point Defect Parameters")

### 3.2. Run the Notebook.

Click `Run` > `Run All` in the top menu to run the notebook and preview the results.

![Review the Results](../../../images/tutorials/materials/defects/defect_point_vacancy_boron_nitride/5-jl-result-preview.webp "Review the Results")

## 4. Save the Material.

After running both notebooks, user can visualize the structure of h-BN with the vacancy defect in the Materials Designer 3D viewer.

![Vacancy in h-BN](../../../images/tutorials/materials/defects/defect_point_vacancy_boron_nitride/6-wave-result.webp "Vacancy in h-BN")


[Save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) in Material JSON format

## Interactive JupyterLite Notebook.

The following JupyterLite notebooks demonstrate the complete process. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_vacancy_boron_nitride.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## References.

