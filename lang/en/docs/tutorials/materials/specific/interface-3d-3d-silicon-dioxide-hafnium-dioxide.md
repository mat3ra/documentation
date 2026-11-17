---
tags:
  - 3D
  - interface
  - superlattice
  - strain
  - high-k
  - silicon dioxide
  - hafnium dioxide
  - SiO2
  - HfO2
  - C-2D-INT-Z

hide:
  - tags
# YAML header
render_macros: true
---

# SiO2/HfO2 (001) Superlattices with Monoclinic and Cubic HfO2

## 1. Introduction

This tutorial creates two SiO₂/HfO₂ (001) superlattices, one with monoclinic and one with cubic HfO₂, after the
following manuscripts, together with the bulk cells their valence band offsets are computed from. The SiO₂/HfO₂
interface is the second interface of the
[High-k Metal Gate Stack](heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride.md).

!!!note "Manuscripts"
    **Pierre-Yves Prodhomme, Fabien Fontaine-Vive, Abram Van Der Geest, Philippe Blaise and Jacky Even**,
    "Ab initio calculation of effective work functions for a TiN/HfO2/SiO2/Si transistor stack", Applied Physics
    Letters 99, 022101 (2011). [DOI: 10.1063/1.3609869](https://doi.org/10.1063/1.3609869){:target='_blank'}.
    [@Prodhomme2011]

    **John Robertson and Robert M. Wallace**, "High-K materials and metal gates for CMOS applications", Materials
    Science and Engineering: R: Reports 88, 1 (2015).
    [DOI: 10.1016/j.mser.2014.11.001](https://doi.org/10.1016/j.mser.2014.11.001){:target='_blank'}.
    [@Robertson2015]

In both superlattices SiO₂ is ideal β-cristobalite (C9) and is the in-plane reference: its (001) face is the
5.23 × 5.23 Å² square cell, turned 45° from the cubic cell, and HfO₂ is strained onto it. Both superlattices are
periodic along [001] without vacuum, so each has two SiO₂/HfO₂ interfaces.

The monoclinic (P2₁/c) superlattice is the model of Prodhomme et al.: ten SiO₂ layers (one Si each) and seven HfO₂
layers (two Hf each), Hf₁₄Si₁₀O₄₈, with three O between the last Si and the first Hf at each interface. The
manuscript stretches HfO₂ by 3.7 % along [100] and 2.1 % along [010] from its own lattice; here the strain follows
from the lattices of the Standata structures.

The cubic (Fm-3m) superlattice is the model of Robertson and Wallace, built after Sharia et al. [@Sharia2007]:
twelve SiO₂ and six HfO₂ layers, Hf₁₂Si₁₂O₄₈. Each interface plane carries three O, two bonded to Si and Hf and one
to Hf only, so no Si–O bond is broken.

At each interface the two blocks are separated so that the closest cation–O pair across it is at the bulk bond
length of the cation's own oxide. Both manuscripts relax the atomic positions afterwards, as the
[SiO2/HfO2 (001) Valence Band Offset](interface-3d-3d-silicon-dioxide-hafnium-dioxide-simulation.md) tutorial does
before it computes the offsets. The offsets need, besides the superlattices, bulk cells with the same in-plane
lattice, so the notebook saves five materials, which that tutorial loads by name.


## 2. Open the notebook

### 2.1. Load the base materials

The notebook loads β-cristobalite SiO₂ (mp-8352), monoclinic HfO₂ (mp-352) and cubic HfO₂ (mp-550893) from
[Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/), so no input material
needs to be selected.

### 2.2. Launch JupyterLite session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)"
menu item to launch the JupyterLite environment, or use the notebook embedded in Section 6.

### 2.3. Open `interface_3d_3d_silicon_dioxide_hafnium_dioxide.ipynb` notebook

Find and open `interface_3d_3d_silicon_dioxide_hafnium_dioxide.ipynb` in the `specific_examples` folder.


## 3. Configure and create the structure

### 3.1. Set parameters

Cell 1.1 of the notebook sets the materials, the Miller indices and layer counts of each block, the atoms removed
from the monoclinic HfO₂ block, the in-plane shift of the cubic HfO₂ block, the matching tolerance, and the names of
the saved materials:

```python
SUBSTRATE_NAME = "mp-8352"  # SiO2, beta-cristobalite (C9), Standata
MONOCLINIC_FILM_NAME = "mp-352"  # HfO2, monoclinic, Standata
CUBIC_FILM_NAME = "mp-550893"  # HfO2, cubic, Standata

SUBSTRATE_MILLER_INDICES = (1, 1, 0)  # in the primitive cell: the (001) face, 5.23 Å square
FILM_MILLER_INDICES = (0, 0, 1)
VACUUM = 0.0  # in Angstrom: periodic along the stacking axis

MONOCLINIC_SUBSTRATE_NUMBER_OF_LAYERS = 5  # two SiO2 layers each: 10
MONOCLINIC_FILM_NUMBER_OF_LAYERS = 4  # two HfO2 layers each: 8, of which one is removed
MONOCLINIC_FILM_ATOMS_REMOVED_FROM_BOTTOM = 1  # the lowest O
MONOCLINIC_FILM_ATOMS_REMOVED_FROM_TOP = 5  # with the lowest O, one HfO2 layer; three O stay at each interface

CUBIC_SUBSTRATE_NUMBER_OF_LAYERS = 6  # two SiO2 layers each: 12
CUBIC_FILM_NUMBER_OF_LAYERS = 3  # two HfO2 layers each: 6
CUBIC_FILM_XY_SHIFT = (0, 0.25)  # fractions of the in-plane cell: SiO2 interface O on HfO2 O sites

SUBSTRATE_BULK_NUMBER_OF_LAYERS = 2  # one beta-cristobalite period along [001]

MAX_LENGTH_TOLERANCE = 0.05  # admits the 4 % mismatch of cubic HfO2

MONOCLINIC_SUPERLATTICE_NAME = "SiO2/HfO2 monoclinic (001) superlattice 10+7"
CUBIC_SUPERLATTICE_NAME = "SiO2/HfO2 cubic (001) superlattice 12+6"
SUBSTRATE_BULK_NAME = "SiO2 beta-cristobalite (001) bulk"
MONOCLINIC_FILM_BULK_NAME = "HfO2 monoclinic (001) bulk strained"
CUBIC_FILM_BULK_NAME = "HfO2 cubic (001) bulk strained"
```

### 3.2. Run the notebook

Execute the notebook by selecting "Run" > "Run All Cells" from the JupyterLite menu.

### 3.3. Follow the construction

The notebook builds the two superlattices and their bulk cells in five steps:

1. The SiO₂ slab is cut from the primitive cell of β-cristobalite, where the Miller indices (1, 1, 0) select the cubic
   (001) face in the 45° cell, and each HfO₂ slab along (001) from its conventional cell, both without vacuum. The
   interface builder strains HfO₂ onto the SiO₂ cell. It re-creates its slabs from the bulk, so layer counts and atoms
   are changed on the built superlattice.
2. Monoclinic HfO₂ (section 2): the slab builder counts monoclinic (001) layers in pairs, so eight HfO₂ layers are
   built and one is removed, the lowest O and the top five atoms. The block kept ends in one O against the SiO₂ O plane
   and in three O against the SiO₂ Si, so each interface carries three O and the cell stays stoichiometric. The
   in-plane registry of the two blocks is the builder's default; the manuscript does not give it.
3. Cubic HfO₂ (section 3): the HfO₂ block is shifted in plane by a quarter of the cell, so that the interface O of
   SiO₂ sit on O sites of HfO₂. As built, one interface plane is an HfO₂ O plane with four O and the other the SiO₂ O
   plane with two. The first O of the four-O plane that is not bonded to Si is removed, and an O is added at the same
   in-plane position in the two-O plane. Sharia et al. reach the same structure by removing a different O from each of
   two four-O interface planes.
4. In both superlattices, the HfO₂ block is moved along the normal, and the cell length set, so that the closest
   cation–O pair across each interface is at the bulk bond length: Si–O of SiO₂, Hf–O of the HfO₂ phase.
5. Section 4 cuts the bulk reference cells. SiO₂ is used as is, one β-cristobalite period along [001] in the 45° cell;
   each HfO₂ is strained in plane to the cell of its superlattice, with the (001) layer spacing kept. Atom labels are
   removed from all five materials, because labels break the Quantum ESPRESSO input.


## 4. Analyze the structure

Section 5 of the notebook draws the five materials, seen along b with c vertical and repeated twice along a and b;
the dotted box outlines the two cells along a. In each superlattice the SiO₂ block is at the bottom of the cell and
the HfO₂ block on top; the second interface is across the periodic boundary.

The monoclinic superlattice, Hf₁₄Si₁₀O₄₈, 72 atoms, beside the O-rich SiO₂/HfO₂ interface of Prodhomme et al.:

![SiO2/HfO2 with monoclinic HfO2: Prodhomme et al. 2011 and this work](../../../images/tutorials/materials/interfaces/interface_3d_3d_silicon_dioxide_hafnium_dioxide/0-monoclinic-structure-comparison.webp "SiO2/HfO2 with monoclinic HfO2, side view: Prodhomme et al. 2011, Fig. 1(a), the O-rich interface (left), and the superlattice 10+7 built by the notebook (right)")

The cubic superlattice, Hf₁₂Si₁₂O₄₈, 72 atoms, beside the relaxed SiO₂:HfO₂ interface of Robertson and Wallace:

![SiO2/HfO2 with cubic HfO2: Robertson and Wallace 2015 and this work](../../../images/tutorials/materials/interfaces/interface_3d_3d_silicon_dioxide_hafnium_dioxide/1-cubic-structure-comparison.webp "SiO2/HfO2 with cubic HfO2, side view: Robertson and Wallace 2015, Fig. 56a, the relaxed interface (left), and the superlattice 12+6 built by the notebook (right)")


## 5. Save the structure

Section 6 of the notebook sends the five materials to the environment. In JupyterLite they are passed to Materials
Designer, where they can be saved on the platform; in a local Jupyter session they are written to the `uploads`
folder, from which the [simulation tutorial](interface-3d-3d-silicon-dioxide-hafnium-dioxide-simulation.md) loads
them.


## 6. Interactive JupyterLite notebook

The following JupyterLite notebook creates the two superlattices and the three bulk cells. Select "Run" > "Run All
Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_3d_3d_silicon_dioxide_hafnium_dioxide.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 7. References
