---
tags:
  - SnO
  - defects
  - interstitial
  - voronoi
  - oxygen
  - point defects
  - Sn
  - O
  - D-0D-INT

hide:
  - tags
# YAML header
render_macros: true
---

# Oxygen interstitial Defect(s) in SnO.

## Introduction.

This tutorial demonstrates how to create an oxygen interstitial defect in tin monoxide (SnO), following the methodology described in the literature.

!!!note "Manuscript"
    A. Togo, F. Oba, and I. Tanaka
    "First-principles calculations of native defects in tin monoxide"
    Physical Review B 74, 195128 (2006)
    [DOI: 10.1103/PhysRevB.74.195128](https://doi.org/10.1103/PhysRevB.74.195128){:target='_blank'}. [@Togo2006; @Wang2014; @Na-Phattalung2006]

We will recreate the O-interstitial defect structure shown in Fig. 4 a) using [Voronoi](https://github.com/Exabyte-io/made/blob/9e13b350eaaa5d49c81a3b30f76c165480825d72/src/py/mat3ra/made/tools/build/defect/builders.py#L125) placement method.

![SnO O-interstitial](../../../images/tutorials/materials/defects/defect_point_interstitial_tin_oxide/0-figure-from-manuscript.webp "O-interstitial defect in SnO")

## 1. Prepare Base Structure.

### 1.1. Load Base Material.

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the SnO material from [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/) using the search term "SnO".

![Original SnO](../../../images/tutorials/materials/defects/defect_point_interstitial_tin_oxide/2-wave-original-material.webp "SnO from Standata, 2x2x2 repetitions")

### 1.2. Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

### 1.3. Open `create_defect.ipynb` Notebook.

Find and open the `create_defect.ipynb` notebook. Select "SnO" input material.

We'll modify its parameters to create the Sn-vacancy O-interstitial defects according to the image above.

### 1.4. Set Defect Parameters.

Replace the default parameters in section 1.1 with:

```python
# Selected material will be used as a unit cell to create a supercell first.
SUPERCELL_MATRIX = [[2, 0, 0], [0, 2, 0], [0, 0, 2]]

DEFECT_CONFIGS = [
    {
        "type": "vacancy",
        "coordinate": [0.0, 0.25, 0.525],  # Crystal coordinates
        "placement_method": "closest_site",
    },
    {
        "type": "interstitial",
        "coordinate": [0.0, 0.25, 0.35],  # Crystal coordinates
        "element": "O",
        "placement_method": "voronoi_site",
    },
]
```
![Defect Parameters](../../../images/tutorials/materials/defects/defect_point_interstitial_tin_oxide/3-jl-setup-nb.webp "Defect parameters for O-interstitial in SnO")

Key parameters explained:

First defect:

- `defect_type`: "vacancy" for removing an atom
- `approximate_coordinate`: Position specified in crystal coordinates (Sn as in publication)

Second defect:

- `defect_type`: "interstitial" for adding an extra atom
- `coordinate`: Position specified in crystal coordinates
- `chemical_element`: "O" for oxygen interstitial
- `placement_method`: "voronoi_site" to place atom at appropriate interstitial position

## 2. Create the Defect.

### 2.1. Run Supercell Creation.

Run the notebook by selecting "Run" > "Run All Cells". This will:

1. Initialize the defect configuration
2. Create the O-interstitial at the specified position
3. Generate the final defect structure

## 3. Analyze Results.

After creating the defect, examine the structure to verify:

![SnO with O-interstitial defect](../../../images/tutorials/materials/defects/defect_point_interstitial_tin_oxide/4-wave-result-material.webp "SnO with O-interstitial defect")

### 3.1. Defect Position.

- O interstitial should be at (0.0, 0.5, 0.5) in crystal coordinates
- Position should be in a void space between Sn-O layers
- Verify symmetry of surrounding atoms

### 3.2. Local Structure.

- Check distances to nearest Sn and O atoms
- Verify no unrealistic atom overlaps
- Confirm overall crystal structure is maintained

## 4. Save Defect Structure.

The defect structure will be automatically passed back to Materials Designer where you can:

1. Save it in your workspace
2. Export it in various formats
3. Use it for further calculations

## Interactive JupyterLite Notebook.

The following embedded notebook demonstrates the complete process. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_interstitial_tin_oxide.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## Parameter Fine-tuning.

To adjust the defect creation:

1. Position Adjustment:

   - Modify `coordinate` to place interstitial at different positions
   - Try different `placement_method` options ("coordinate", "voronoi_site")
   - Adjust position to match experimental observations

2. Structure Size:

   - Change `SUPERCELL_MATRIX` for larger/smaller systems
   - Consider periodic boundary conditions effects

## References.
