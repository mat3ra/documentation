---
tags:
  - adatom
  - island
  - surface
  - TiN
  - titanium
  - D-2D-ADA

hide:
  - tags
# YAML header
render_macros: true
---

# Ti Adatom on a 5×5 TiN Island

## 1. Introduction

This tutorial creates the cells of the Ti adatom descent study in the following manuscript: a 5×5-atom TiN island on TiN(001), with a Ti adatom at three of its sites.

!!!note "Manuscript"
    **D. G. Sangiovanni, A. B. Mei, D. Edström, L. Hultman, V. Chirita, I. Petrov, and J. E. Greene**,
    "Effects of surface vibrations on interlayer mass transport: Ab initio molecular dynamics investigation of Ti adatom descent pathways and rates from TiN/TiN(001) islands", Physical Review B, 2018. [DOI: 10.1103/PhysRevB.97.035406](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.97.035406){:target='_blank'}. [@Sangiovanni2018]

The figure below shows the 5×5-atom island cell in plan view, from the manuscript (Figure 1b):

![5×5-atom TiN island on TiN(001)](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/0-figure-1b-from-manuscript.webp "5×5-atom TiN/TiN(001) island from Sangiovanni et al. 2018, Figure 1b")

The default cell is that of Sec. II.A of the manuscript: a TiN(001) slab of 12×12 sites and three planes with 15.3 Å of vacuum, under a 5×5-atom island one plane high with Ti corners, 457 atoms in all. The Ti adatom is added at the sites a, c and i of Fig. 6 of the manuscript, which gives three 458-atom cells. `CELL_SIZE` also offers a smaller cell, 10×10 sites and two planes, of 225 and 226 atoms. The [Ti Adatom Descent on a 5×5 TiN Island (MACE and DFT)](defect-point-adatom-island-titanium-nitride-simulation.md) tutorial relaxes them.


## 2. Open the notebook

### 2.1. Load the base material

The notebook loads TiN from [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/) by the name in `MATERIAL_NAME`, so no input material needs to be selected.

### 2.2. Launch JupyterLite session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment, or use the notebook embedded in Section 6.

### 2.3. Open `defect_point_adatom_island_titanium_nitride.ipynb` notebook

Find and open `defect_point_adatom_island_titanium_nitride.ipynb` in the `specific_examples` folder.


## 3. Configure and create the structure

### 3.1. Set parameters

Cell 1.1 of the notebook sets the cell size, the slab, the island, the adatom, and the names of the saved materials:

```python
MATERIAL_NAME = "Titanium Nitride"
MILLER_INDICES = (0, 0, 1)
# Thickness counts conventional layers of two (001) planes; bottom planes are removed after the island is added.
SLAB_THICKNESS = 2
VACUUM = 15.3  # Angstrom
NUMBER_OF_ADDED_LAYERS = 0.5

# Cell sizes as (xy supercell, island box minimum and maximum in crystal coordinates, bottom planes removed);
# x and y minima one site apart put Ti atoms at the island corners
CELL_SIZES = {
    "12x12x3": ([[6, 0], [0, 6]], [0.3233, 0.24, 0], [0.7233, 0.64, 1], 1),
    "10x10x2": ([[5, 0], [0, 5]], [0.29, 0.19, 0], [0.75, 0.65, 1], 2),
}
CELL_SIZE = "12x12x3"
XY_SUPERCELL_MATRIX, ISLAND_MIN_COORDINATE, ISLAND_MAX_COORDINATE, PLANES_REMOVED = CELL_SIZES[CELL_SIZE]

ADATOM_ELEMENT = "Ti"
# Adatom sites as (Δx, Δy, Δz) from the island's edge N atom, in units of the Ti–N site spacing;
# Δz = 0 is the island plane. Fig. 6's b and d–h are NEB images between these sites, not positions.
ADATOM_SITES = {
    "a": (0.5, -0.5, 1),  # fourfold hollow on the island beside the edge
    "c": (0, 0, 1),       # atop the edge N
    "i": (0, 1, 0),       # atop the terrace N in front of the edge
}

ISLAND_MATERIAL_NAME = f"TiN(001) {CELL_SIZE} island 5x5"
ADATOM_MATERIAL_NAMES = {
    "a": f"{ISLAND_MATERIAL_NAME} + Ti a (FFH island)",
    "c": f"{ISLAND_MATERIAL_NAME} + Ti c (atop-N edge)",
    "i": f"{ISLAND_MATERIAL_NAME} + Ti i (atop-N terrace)",
}
```

`CELL_SIZE` picks one of the two entries of `CELL_SIZES`, which carry the xy supercell, the island box and the number of bottom planes removed. `"12x12x3"` is the manuscript's cell, 12×12 sites over three slab planes; `"10x10x2"` is a smaller one, 10×10 sites over two, which the simulation tutorial uses for its Density Functional Theory (DFT) jobs. The island is 5×5 atoms with Ti corners in both: the box spans 0.4 crystal units along a and b in the 6×6 supercell and 0.46 in the 5×5, which encloses five sites in each direction either way.

`ADATOM_MATERIAL_NAMES` carry `CELL_SIZE`, and the simulation notebook loads them under the same setting.

### 3.2. Run the notebook

Execute the notebook by selecting "Run" > "Run All Cells" from the JupyterLite menu.


## 4. Analyze the structure

### 4.1. Island cell

Section 2 of the notebook builds the slab with the island, removes as many bottom planes as `CELL_SIZE` asks for, resets the vacuum, and prints, for the default cell:

```
TiN(001) 12x12x3 island 5x5: 457 atoms (229 Ti, 228 N) in 4 planes, c = 21.662 Å
Island: 25 atoms, corners ['Ti', 'Ti', 'Ti', 'Ti']
```

The four planes are the three slab planes and the island.

### 4.2. Adatom sites

Section 3 of the notebook places the Ti adatom at each entry of `ADATOM_SITES`, measured from the edge N atom with the smaller x: **a**, the fourfold hollow between that N and the edge-centre Ti, the manuscript's FFH_edge; **c**, atop that edge N; **i**, atop the terrace N in front of it. The first lines of its cell turn the offsets into coordinates on the island built in Section 2:

```python
site_spacing = material.lattice.a / 2
edge_y = island_y.max()
edge_nitrogen_x = min(atoms.positions[index, 0] for index in island
                      if symbols[index] == "N" and np.isclose(atoms.positions[index, 1], edge_y))
island_z = atoms.positions[island, 2].mean()

adatom_sites = {
    site: [edge_nitrogen_x + offset_x * site_spacing, edge_y + offset_y * site_spacing, island_z + offset_z * site_spacing]
    for site, (offset_x, offset_y, offset_z) in ADATOM_SITES.items()
}
```

Each site is added with `create_defect_point_interstitial` at that exact cartesian coordinate, and the notebook prints the adatom's three shortest distances:

```
TiN(001) 12x12x3 island 5x5 + Ti a (FFH island): 458 atoms, adatom's three shortest distances [2.597 2.597 2.597] Å
TiN(001) 12x12x3 island 5x5 + Ti c (atop-N edge): 458 atoms, adatom's three shortest distances [2.121 2.999 2.999] Å
TiN(001) 12x12x3 island 5x5 + Ti i (atop-N terrace): 458 atoms, adatom's three shortest distances [2.121 2.121 2.999] Å
```


## 5. Save the structure

Section 5 of the notebook passes the four materials named in cell 1.1 to Materials Designer, where they can be saved on the platform, and writes them to the `uploads` folder, from which the [simulation tutorial](defect-point-adatom-island-titanium-nitride-simulation.md) loads them.


## 6. Interactive JupyterLite notebook

The following JupyterLite notebook creates the island cell and the three adatom cells. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_adatom_island_titanium_nitride.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 7. Parameter fine-tuning

The cell is changed with `CELL_SIZE` in cell 1.1, and a cell of another size is a new entry in `CELL_SIZES`. A start point is changed by editing its entry in `ADATOM_SITES` in cell 1.1, a triple (Δx, Δy, Δz) relative to the island's edge N atom in units of the site spacing. A new site, such as the fourfold hollow at the island corner of Fig. 1(b), is a new entry in `ADATOM_SITES` with the matching name in `ADATOM_MATERIAL_NAMES`. The island size follows the box in `ISLAND_MIN_COORDINATE` and `ISLAND_MAX_COORDINATE`, and the terrace size follows `XY_SUPERCELL_MATRIX`.


## 8. References
