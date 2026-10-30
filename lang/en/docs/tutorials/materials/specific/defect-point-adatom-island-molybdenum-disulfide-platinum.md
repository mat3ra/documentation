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

## 1. Introduction

This tutorial demonstrates how to create a platinum island on MoS2 by adding Pt adatoms, following the methodology described in the literature.

!!!note "Manuscript"
    Saidi, W. A.
    "Density Functional Theory Study of Nucleation and Growth of Pt Nanoparticles on MoS2(001) Surface"
    Crystal Growth & Design, 15(2), 642–652. (2015)
    [DOI: 10.1021/cg5013395](https://doi.org/10.1021/cg5013395){:target='_blank'}. [@Saidi2015; @Jiao2016; @Fichthorn2000; @Neugebauer1993; @Hortamani2007]

We will recreate the Pt island structure shown in Figure 4b:

![Pt Island on MoS2](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/0-figure-from-manuscript.webp "Pt island formation on MoS2")

## 2. Create MoS2 Substrate

### 2.1. Open Materials Designer

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/).

### 2.2. Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

### 2.3. Open `defect_point_adatom_island_molybdenum_disulfide_platinum.ipynb` Notebook

Find and open the `specific_examples/defect_point_adatom_island_molybdenum_disulfide_platinum.ipynb` notebook. It loads MoS2 from Standata by `MATERIAL_NAME`.

## 3. Configure and Create Structure

### 3.1. Set Parameters

Set up the slab and defect parameters in the notebook:

```python
# Slab parameters
# The publication uses a = 3.18 Å; Standata's MoS2 monolayer has 3.196 Å.
# Exact name of the material to load from Standata; the pattern "MoS2.*2D" would load bulk MoS2 (mp-2815)
MATERIAL_NAME = "MoS2, Molybdenum Disulfide, HEX (P-6m2) 2D (Monolayer), 2dm-3150"
MILLER_INDICES = (0, 0, 1)  # Miller indices of the surface
SLAB_THICKNESS = 1  # Thickness of the slab in unit cells
VACUUM = 0.0  # Vacuum added in Angstrom; the Standata cell already holds 20 Å of vacuum
# The simulation notebook uses the 5x5 materials
XY_SUPERCELL_MATRICES = {"3x3": [[3, 0], [0, 3]], "5x5": [[5, 0], [0, 5]]}

# Defect parameters
DEFECT_TYPE = "adatom"
PLACEMENT_METHOD = "exact_coordinate"  # Choose between "equidistant", "new_crystal_site",  "exact_coordinate"
CHEMICAL_ELEMENT = "Pt"  # Element to be placed at the site
USE_CARTESIAN_COORDINATES = False  # If True, the position is in Cartesian coordinates

# Starting heights for the relaxation:
DISTANCE_Z_1st_Pt_layer = 1.2  # Distance between S (MoS2) and Pt in first layer, in Angstrom
DISTANCE_Z_2nd_Pt_layer = 2.8  # Distance between S (MoS2) and Pt in second layer, in Angstrom

DISTANCE_Z_VALUES = [DISTANCE_Z_1st_Pt_layer, DISTANCE_Z_1st_Pt_layer, DISTANCE_Z_1st_Pt_layer, DISTANCE_Z_2nd_Pt_layer]

# In the unit cell of MoS2 atoms have Mo: [2/3, 1/3, 0] and S: [1/3, 2/3, 0] crystal coordinates.
# Creation of 3x3 and 5x5 supercells scales coordinates to steps of 1/9th and 1/15th between points: S, Mo and hollow.
# The adatoms are placed on the top of Mo atoms and S atoms can be obtained:
COORDINATES = {
    "3x3": [
        [5 / 9, 4 / 9, 0],  # 1st atom, atop central Mo
        [2 / 9, 4 / 9, 0],  # 2nd atom, next clockwise atop Mo
        [5 / 9, 7 / 9, 0],  # 3rd atom, next clockwise atop Mo
        [4 / 9, 5 / 9, 0],  # 4th topmost atom, atop S
    ],
    "5x5": [
        [8 / 15, 7 / 15, 0],  # 1st atom, atop central Mo
        [5 / 15, 7 / 15, 0],  # 2nd atom, next clockwise atop Mo
        [8 / 15, 10 / 15, 0],  # 3rd atom, next clockwise atop Mo
        [7 / 15, 8 / 15, 0],  # 4th topmost atom, atop S
    ],
}
```

Key parameters explained:

- Base layer Pt atoms (first three entries of each size in `COORDINATES`):
    * Positioned atop Mo atoms in a triangular arrangement
    * Height 1.2 Å from surface S atoms to achieve separation from Mo atoms of 2.8 Å -- a starting height for the relaxation

- Top Pt atom (fourth entry of each size in `COORDINATES`):
    * Centered above the triangle, atop S atom
    * Height 2.8 Å from surface S atoms (1.6 Å from base Pt atoms) -- a starting height for the relaxation

- `DISTANCE_Z_VALUES` sets the distance along the z-axis from each adatom to the top S plane
- `XY_SUPERCELL_MATRICES` holds the two cell sizes, 3x3 and 5x5; the slab and defect cells run once for each size
- The publication uses a = 3.18 Å; the notebook keeps Standata's 3.196 Å. In order to match the publication, strain the substrate with `create_strain` before the slab is built, as in [Graphene on h-BN](interface-2d-2d-graphene-boron-nitride.md#31-strain-the-materials)

![Adatoms Setup](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/1-jl-setup-nb.webp "Pt adatoms setup")

### 3.2. Run the Notebook

Execute the notebook to create the Pt island structure on MoS2 by selecting "Run" > "Run All Cells" from the JupyterLite menu.

![Results Preview](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/2-jl-result-preview.webp "Pt island results preview")

### 3.3. Pass the Result to Materials Designer

The result can be passed to Materials Designer for visualization and viewed from the top:

![Complete Island](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/4-wave-result-top.webp "Complete Pt island structure")

And from the side:

![Complete Island, side view](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/5-wave-result-side.webp "Complete Pt island structure, side view")

The 3x3 and 5x5 slabs from the top, beside Fig. 4(b) of the manuscript:

![Pt₄ on MoS₂ from the manuscript and this notebook](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/7-manuscript-vs-built-3x3-5x5-top.webp "Top view of the t-(Mo)₄-S cluster: Saidi 2015, Fig. 4(b) (left), and the 3×3 and 5×5 slabs built by this notebook")

## 4. Analyze the Structure

After adding all Pt atoms, verify the following:

### 4.1. Base Layer Geometry

- Three Pt atoms should form a triangular base
- Each base Pt should be positioned atop Mo atoms
- Distance from surface S atoms should be ~1.2 Å
- Relaxation is needed to achieve the exact geometry from the publication, performed in the [binding energy tutorial](defect-point-adatom-island-molybdenum-disulfide-platinum-simulation.md)

### 4.2. Top Atom Position

- Fourth Pt should be centered above the triangle
- Position should be approximately above a surface S atom
- Height should be ~2.8 Å from surface (1.6 Å from base Pt atoms)

## 5. Save the Structure

The final structure will be automatically passed back to Materials Designer where user can:

1. Save it on the platform
2. Export it in various formats
3. Use it for further transformations

The notebook passes six materials and writes them to the `uploads` folder, three per size: `MoS2 3x3 monolayer`, `MoS2 3x3 Pt1 atop Mo` and `MoS2 3x3 Pt4 t-(Mo)4-S` (27, 28 and 31 atoms, in a 9.59 × 9.59 × 26.27 Å cell), and the same three named `5x5` (75, 76 and 79 atoms, in a 15.98 × 15.98 × 26.27 Å cell). The three of a size share one cell, since the binding energy subtracts the clean layer from the Pt slabs. The [binding energy tutorial](defect-point-adatom-island-molybdenum-disulfide-platinum-simulation.md) loads the 5x5 ones by these names.

## 6. Interactive JupyterLite Notebook

The following embedded notebook demonstrates the complete process. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_adatom_island_molybdenum_disulfide_platinum.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 7. Parameter Fine-tuning

In order to adjust the island structure, edit `COORDINATES` to move the Pt sites of each size, and `DISTANCE_Z_1st_Pt_layer` and `DISTANCE_Z_2nd_Pt_layer` to move the base and top heights.

## 8. References

