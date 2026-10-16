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

This tutorial demonstrates how to create a platinum island on MoS2 by sequentially adding Pt adatoms, following the methodology described in the literature.

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
MATERIAL_NAME = "MoS2, Molybdenum Disulfide, HEX (P-6m2) 2D (Monolayer), 2dm-3150"
LATTICE_CONSTANT = 3.18  # Lattice constant of MoS2 used in the publication, in Angstrom (Standata: 3.196)
MILLER_INDICES = (0, 0, 1)  # Miller indices of the surface
SLAB_THICKNESS = 1  # Thickness of the slab in unit cells
VACUUM = 0.0  # Vacuum added in Angstrom; the Standata cell already holds 20 Å above the layer
XY_SUPERCELL_MATRIX = [[5, 0], [0, 5]]

# Defect parameters
DEFECT_TYPE = "adatom"
PLACEMENT_METHOD = "exact_coordinate"  # Choose between "equidistant", "new_crystal_site",  "exact_coordinate"
CHEMICAL_ELEMENT = "Pt"  # Element to be placed at the site
USE_CARTESIAN_COORDINATES = False  # If True, the position is in Cartesian coordinates

# Relaxed mean bond lengths in the publication (Table 1, pairs within BOND_CUTOFF), in Angstrom
PT_MO_BOND_LENGTH = 2.91
PT_S_BOND_LENGTH = 2.35
PT_PT_BOND_LENGTH = 2.61
BOND_CUTOFF = 3.0

# In the unit cell of MoS2 atoms have Mo: [2/3, 1/3, 0] and S: [1/3, 2/3, 0] crystal coordinates.
# In the 5x5 supercell Mo sits at ((2/3 + i)/5, (1/3 + j)/5) and S at ((1/3 + i)/5, (2/3 + j)/5).
# Three Pt atoms atop Mo at (i, j) = (2, 2), (1, 2), (2, 3); the fourth atop S at (2, 2), the centre of that triangle:
COORDINATES = [
    [8 / 15, 7 / 15, 0],  # 1st atom, atop central Mo
    [5 / 15, 7 / 15, 0],  # 2nd atom, next clockwise atop Mo
    [8 / 15, 10 / 15, 0],  # 3rd atom, next clockwise atop Mo
    [7 / 15, 8 / 15, 0],  # 4th topmost atom, atop S
]
```

Key parameters explained:

- Base layer Pt atoms (first three entries of `COORDINATES`):

  * Positioned atop Mo atoms in a triangular arrangement
  * Height 1.34 Å above the S plane: the Pt-Mo bond length of Table 1, 2.91 Å, less the S-Mo spacing of 1.57 Å
- Top Pt atom (fourth entry of `COORDINATES`):

  * Centered above the triangle, atop S atom
  * Height 3.20 Å above the S plane, 1.86 Å above the base Pt atoms: the Pt-Pt bond length of Table 1, 2.61 Å, over a triangle of side 3.18 Å

- The notebook computes both heights in section 1.4 from `PT_MO_BOND_LENGTH`, `PT_PT_BOND_LENGTH` and the S-Mo spacing it measures, and prints them

![Adatoms Setup](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/1-jl-setup-nb.webp "Pt adatoms setup")

### 3.2. Run the Notebook

Execute the notebook to create the Pt island structure on MoS2 by selecting "Run" > "Run All Cells" from the JupyterLite menu.

![Results Preview](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/2-jl-result-preview.webp "Pt island results preview")

### 3.3. Pass the Result to Materials Designer

The result can be passed to Materials Designer for visualization and viewed from the top:

![Complete Island](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/4-wave-result-top.webp "Complete Pt island structure")

And from the side:

![Complete Island, side view](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/5-wave-result-side.webp "Complete Pt island structure, side view")

## 4. Analyze the Structure

After adding all Pt atoms, verify the following:

### 4.1. Base Layer Geometry

- Three Pt atoms should form a triangular base
- Each base Pt should be positioned atop Mo atoms
- Distance from surface S atoms should be ~1.34 Å
- These heights are starting points for the relaxation

### 4.2. Top Atom Position

- Fourth Pt should be centered above the triangle
- Position should be approximately above a surface S atom
- Height should be ~3.20 Å above the S plane (1.86 Å above the base Pt atoms)

## 5. Save the Structure

The final structure will be automatically passed back to Materials Designer where user can:

1. Save it on the platform
2. Export it in various formats
3. Use it for further transformations

The notebook passes three materials and writes them to the `uploads` folder, all in one 15.90 × 15.90 × 26.27 Å cell, since the binding energy subtracts the clean layer from the Pt slabs: `MoS2 5x5 monolayer` (75 atoms), `MoS2 5x5 Pt1 atop Mo` (76 atoms) and `MoS2 5x5 Pt4 t-(Mo)4-S` (79 atoms). The [binding energy tutorial](defect-point-adatom-island-molybdenum-disulfide-platinum-simulation.md) loads them by these names.

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

In order to adjust the island structure, edit `COORDINATES` to move the Pt sites, and `PT_MO_BOND_LENGTH` and `PT_PT_BOND_LENGTH` to move the base and top heights.

## 8. References

