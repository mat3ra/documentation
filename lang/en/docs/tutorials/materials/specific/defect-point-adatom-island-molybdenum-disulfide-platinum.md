---
tags:
  - MoS2
  - platinum
  - adatoms
  - surface science
  - 2D materials
  - nanoparticles
  - Mo
  - S
  - Pt
  - D-2D-ISL

hide:
  - tags
# YAML header
render_macros: true
---

# Pt Nanoparticles on MoS2(001) Surface via Adatoms.

## Introduction.

This tutorial demonstrates how to create a platinum island on MoS2 by sequentially adding Pt adatoms, following the methodology described in the literature.

!!!note "Manuscript"
    Saidi, W. A.
    "Density Functional Theory Study of Nucleation and Growth of Pt Nanoparticles on MoS2(001) Surface"
    Crystal Growth & Design, 15(2), 642–652. (2015)
    [DOI: 10.1021/cg5013395](https://doi.org/10.1021/cg5013395){:target='_blank'}. [@Saidi2015; @Jiao2016; @Fichthorn2000; @Neugebauer1993; @Hortamani2007]

We will recreate the Pt island structure shown in Figure 4b:

![Pt Island on MoS2](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/0-figure-from-manuscript.webp "Pt island formation on MoS2")

## 1. Create MoS2 Substrate.

### 1.1. Load Base Material.

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the MoS2 2D material from [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

### 1.2. Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

### 1.3. Open `create_adatom_defect.ipynb` Notebook.

Find and open the `create_adatom_defect.ipynb` notebook. Select MoS2 as input material.

## 2. Configure and Create Structure.

### 2.1. Set Parameters.

Set up the slab and defect parameters in the notebook:

```python
# Index in the list of materials, to access as materials[MATERIAL_INDEX]
MATERIAL_INDEX = 0
ELEMENT = "Pt"  # Chemical element of the adatom

# Dictionaries are validated and converted to AdatomDefectDict objects below
DEFECT_CONFIGS = [
    {
        "type": "adatom",
        "coordinate_2d": [5/9, 4/9], # Crystal coordinates on the surface (x, y)
        "distance_z": 1.2,  # Method to place the adatom
        "element": ELEMENT,
    },
    {
        "type": "adatom",
        "coordinate_2d": [2/9, 4/9], # Crystal coordinates on the surface (x, y)
        "distance_z": 1.2,  # Method to place the adatom
        "element": ELEMENT,
    },
    {
        "type": "adatom",
        "coordinate_2d": [5/9, 7/9], # Crystal coordinates on the surface (x, y)
        "distance_z": 1.2,  # Method to place the adatom
        "element": ELEMENT,
    },
    {
        "type": "adatom",
        "coordinate_2d": [4/9, 5/9], # Crystal coordinates on the surface (x, y)
        "distance_z": 1.6,  # Method to place the adatom
        "element": ELEMENT,
    },
]


PLACEMENT_METHOD = "new_crystal_site"  # Method to place the adatom, e.g., "new_crystal_site", "exact_coordinate", "equidistant"


# Slab parameters
MILLER_INDICES = (0, 0, 1)  # Miller indices of the surface
SLAB_THICKNESS = 1  # Thickness of the slab in unit cells
VACUUM = 10.0  # Vacuum thickness in Angstrom
XY_SUPERCELL_MATRIX = [[3, 0], [0, 3]]  # Supercell matrix for the slab
TERMINATION_FORMULA = None  # Stoichiometric formula of the slab termination to be used.
```

Key parameters explained:

- Base layer Pt atoms (first three configs):

  * Positioned atop Mo atoms in a triangular arrangement
  * Height 1.2 Å from surface S atoms to achieve separation from Mo atoms of 2.8 A -- from publication
- Top Pt atom (fourth config):

  * Centered above the triangle, atop S atom
  * Height 1.6 Å from base Pt atoms (as they become the new surface layer)

- `distance_z` sets the distance along the z-axis from the adatom to the topmost atom directly below it

![Adatoms Setup](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/1-jl-setup-nb.webp "Pt adatoms setup")

### 2.2. Run the Notebook.

Execute the notebook to create the Pt island structure on MoS2 by selecting "Run" > "Run All Cells" from the JupyterLite menu.

![Results Preview](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/2-jl-result-preview.webp "Pt island results preview")

### 2.3. Pass the Result to Materials Designer.

The result can be passed to Materials Designer for visualization and viewed from the top:

![Complete Island](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/4-wave-result-top.webp "Complete Pt island structure")

And from the side:

![Complete Island, side view](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/5-wave-result-side.webp "Complete Pt island structure, side view")

## 3. Analyze the Structure.

After adding all Pt atoms, verify the following:

### 3.1. Base Layer Geometry.

- Three Pt atoms should form a triangular base
- Each base Pt should be positioned atop Mo atoms
- Distance from surface S atoms should be ~1.2 Å
- Relaxation is needed to achieve the exact geometry from the publication, can be performed elsewhere

### 3.2. Top Atom Position.

- Fourth Pt should be centered above the triangle
- Position should be approximately above a surface S atom
- Height should be ~2.8 Å from surface (1.6 Å from base Pt atoms)

## 4. Save the Structure.

The final structure will be automatically passed back to Materials Designer where user can:

1. Save it on the platform
2. Export it in various formats
3. Use it for further transformations

## Interactive JupyterLite Notebook.

The following embedded notebook demonstrates the complete process. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_adatom_island_molybdenum_disulfide_platinum.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## Parameter Fine-tuning.

To adjust the island structure:

1. Base Layer:
   - Adjust `APPROXIMATE_POSITION_ON_SURFACE` to shift Pt positions
   - Modify `DISTANCE_Z` to change height from surface

2. Top Atom:
   - Adjust position to change island shape
   - Modify height to change Pt-Pt spacing

## References.

