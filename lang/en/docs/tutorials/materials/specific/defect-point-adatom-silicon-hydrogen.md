---
tags:
  - silicon
  - hydrogen
  - adatoms
  - surface science
  - Si(100)
  - surface reconstruction
  - Si
  - H
  - D-2D-ADA

hide:
  - tags
# YAML header
render_macros: true
---

# H Adatom on Si(100)

## 1. Introduction

This tutorial demonstrates how to create the reconstructed Si(100)2×1 surface with a single hydrogen (H) adatom on a dimer atom, the start and end structures of the H diffusion paths studied in the following manuscript:

!!!note "Manuscript"
    Hansen, U., & Vogl, P.
    "Hydrogen passivation of silicon surfaces: A classical molecular-dynamics study."
    Physical Review B, 57(20), 13295–13304. (1998)
    [DOI: 10.1103/PhysRevB.57.13295](https://doi.org/10.1103/PhysRevB.57.13295){:target='_blank'}. [@Hansen1998]

Fig. 1 of the manuscript shows two dimer rows of the surface, the dangling-bond sites the H adatom occupies (dotted circles), and its three diffusion paths: intradimer (a), intrarow (b) and inter-row (c):

![H adatom diffusion paths on Si(100)2×1](../../../images/tutorials/materials/defects/defect_point_adatom_silicon_hydrogen/0-figure-from-manuscript.webp "Diffusion paths of an H adatom on Si(100)2×1, Fig. 1.")

The structures created here are the end points of the [intradimer diffusion barrier tutorial](defect-point-adatom-silicon-hydrogen-simulation.md).

## 2. Create the Si(100) slab

### 2.1. Open Materials Designer

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/).

### 2.2. Launch JupyterLite session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

### 2.3. Open `defect_point_adatom_silicon_hydrogen.ipynb` notebook

Find and open the `specific_examples/defect_point_adatom_silicon_hydrogen.ipynb` notebook. It loads the reconstructed Si(100)2×1 slab from Standata by `MATERIAL_NAME`.

## 3. Configure and create the structure

### 3.1. Set parameters

Set up the slab, the passivation and the H sites in the notebook:

```python
# Si(100)2x1 slab from Standata: eight layers, buckled dimers, a = 5.469 Å;
# the manuscript's dimers are symmetric (Sec. III A) and it states no lattice constant
MATERIAL_NAME = "mavrl-si-100-r"
SUPERCELL_MATRIX = [[2, 0, 0], [0, 2, 0], [0, 0, 1]]  # 64 Si
# SUPERCELL_MATRIX = [[3, 0, 0], [0, 3, 0], [0, 0, 1]]  # the manuscript's 144 Si (Sec. IV)

# Passivation of the top face; each material keeps one of its H
PASSIVANT = "H"
BOND_LENGTH = 1.46  # Si-H distance, in Angstroms
SURFACE = "top"
SHADOWING_RADIUS = 1.8  # in Angstroms, below the 2.30 Å dimer bond, so both dimer atoms get an H
DEPTH = 1.0  # in Angstroms, reaches the lower dimer atom, 0.65 Å below the upper one

# Site of the H in each material: Cartesian (x, y) of the Si atom it caps, in Angstroms;
# the dimers lie along x, the dimer rows along y
SITE_BY_MATERIAL_NAME = {
    "H on Si(100) start": [10.11, 0.0],  # upper atom of a dimer
    "H on Si(100) intradimer end": [12.32, 0.0],  # its dimer partner, Fig. 1 path (a)
    # "H on Si(100) intrarow end": [10.11, 3.87],  # upper atom of the next dimer along the row, path (b)
    # "H on Si(100) inter-row end": [4.59, 0.0],  # facing lower atom of the neighbouring row, path (c)
}
```

The parameters are used as follows:

- `MATERIAL_NAME` loads Standata's reconstructed slab: eight Si layers and one dimer per 7.734 × 3.867 Å cell, with the dimer buckled by 0.65 Å
- `SUPERCELL_MATRIX` repeats it 2×2: 64 Si in a 15.468 × 7.734 × 21.875 Å cell, two dimer rows of two dimers each; the commented 3×3 gives 144 Si, as in the manuscript (Sec. IV), in a 23.202 × 11.601 Å cell
- `PASSIVANT`, `BOND_LENGTH`, `SURFACE`, `SHADOWING_RADIUS` and `DEPTH` cap the dangling bond of each top-face dimer atom with an H, 1.46 Å straight up: 8 H on the 2×2 slab; the bottom face stays bare
- `SITE_BY_MATERIAL_NAME` names each material and gives the Cartesian (x, y) of the Si atom its H caps; each material keeps that H and none of the other seven
- The start has the H on the upper atom of a dimer; the intradimer end on its partner, 2.21 Å away laterally and 0.65 Å lower, path (a)
- The commented entries are the ends of path (b), the upper atom of the next dimer along the row, 3.87 Å away, and of path (c), the facing lower atom of the neighbouring row, 5.52 Å away

### 3.2. Run the notebook

Execute the notebook to create the structures by selecting "Run" > "Run All Cells" from the JupyterLite menu.

### 3.3. Pass the result to Materials Designer

The notebook shows the materials in the Wave viewer and passes them to Materials Designer. The start and the intradimer end from the top, drawn with the Atomic Simulation Environment (ASE), with the top-layer Si atoms (the dimers) dark:

![Start and intradimer end, top view](../../../images/tutorials/materials/defects/defect_point_adatom_silicon_hydrogen/1-ase-start-intradimer-end-top.webp "H on Si(100) start (left) and H on Si(100) intradimer end (right), top view")

The start with both H sites marked, beside Fig. 1 of the manuscript, with the dimer rows along the same direction:

![Fig. 1 of the manuscript and the H sites of this notebook](../../../images/tutorials/materials/defects/defect_point_adatom_silicon_hydrogen/fig1-vs-our-sites.webp "Hansen and Vogl 1998, Fig. 1 (left), and the start with the start and intradimer-end H sites marked (right)")

## 4. Analyze the structure

The structures are built from Standata's slab as is; the relaxation in the [simulation tutorial](defect-point-adatom-silicon-hydrogen-simulation.md) moves the atoms from these positions.

### 4.1. Slab

The slab is centred in its cell along z, with the dangling bonds of the bottom face left bare. Its dimers are buckled by 0.65 Å, with a dimer bond of 2.30 Å; the manuscript's are symmetric (Sec. III A, p. 13297), with a dimer bond of 2.37 Å (p. 13298). The manuscript states no Si lattice constant; the slab keeps Standata's, 5.469 Å.

### 4.2. H adatom sites

Each H sits 1.46 Å straight above the Si atom it caps. The start H is on the upper atom of a dimer; the intradimer-end H on its partner, 2.21 Å away laterally and 0.65 Å lower. Each H is 7.73 Å from its periodic images (11.60 Å on the 3×3 slab).

## 5. Save the structure

The notebook passes two materials to Materials Designer, where they can be saved on the platform, and writes them to the `uploads` folder: `H on Si(100) start` and `H on Si(100) intradimer end`, 64 Si and 1 H each in the same 15.468 × 7.734 × 21.875 Å cell. Both list their atoms in the same order, as the first and last images of the nudged elastic band need. The [intradimer diffusion barrier tutorial](defect-point-adatom-silicon-hydrogen-simulation.md) loads them by these names.

## 6. Interactive JupyterLite notebook

The following embedded notebook demonstrates the process. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_adatom_silicon_hydrogen.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 7. Parameter fine-tuning

In order to create the ends of the intrarow (b) and inter-row (c) paths, uncomment their entries in `SITE_BY_MATERIAL_NAME`: the notebook saves `H on Si(100) intrarow end` and `H on Si(100) inter-row end`. In order to build the manuscript's 144-Si slab, uncomment the 3×3 `SUPERCELL_MATRIX`; the sites in `SITE_BY_MATERIAL_NAME` keep their roles on the 3×3 slab. For another site, set the Cartesian (x, y) of another top-layer Si atom: the material keeps the topmost atom within 1 Å of it, seen from above.

## 8. References
