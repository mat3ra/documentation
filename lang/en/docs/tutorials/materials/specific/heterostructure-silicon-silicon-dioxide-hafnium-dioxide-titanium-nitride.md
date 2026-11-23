---
tags:
  - slab-creation
  - interfaces
  - high-k
  - metal-gate
  - semiconductor
  - heterostructure
  - strain-matching
  - Si
  - SiO2
  - HfO2
  - TiN
  - C-2D-HST

hide:
  - tags
# YAML header
render_macros: true
---

# Creating High-k Metal Gate Stack: Si/SiO2/HfO2/TiN.

## 1. Introduction

This tutorial demonstrates how to create a high-k metal gate stack heterostructure consisting of four materials: Si (substrate), SiO2 (gate oxide), HfO2 (high-k dielectric), and TiN (metal gate). The process involves:

1. Creating individual slabs for HfO2 and TiN
2. Building the Si/SiO2 interface using strain matching
3. Adding the pre-created slabs sequentially using simple interface builder

!!!note "Reference"
    QuantumATK tutorial: [High-k Metal Gate Stack Builder](https://docs.quantumatk.com/tutorials/hkmg_builder/hkmg_builder.html) [@Muller1999; @Robertson2006]
    

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create the high-k metal gate stack as shown in the figure below.

![High-k Metal Gate Stack](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/original-figure.webp "High-k Metal Gate Stack")

The interface superlattices of section 7 follow the manuscripts below; their valence band offsets are calculated in the
[High-k Metal Gate Stack: Valence Band Offsets](heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride-simulation.md)
tutorial.

!!!note "Manuscripts"
    **Pierre-Yves Prodhomme, Fabien Fontaine-Vive, Abram Van Der Geest, Philippe Blaise and Jacky Even**,
    "Ab initio calculation of effective work functions for a TiN/HfO2/SiO2/Si transistor stack", Applied Physics
    Letters 99, 022101 (2011). [DOI: 10.1063/1.3609869](https://doi.org/10.1063/1.3609869){:target='_blank'}.
    [@Prodhomme2011]

    **John Robertson and Robert M. Wallace**, "High-K materials and metal gates for CMOS applications", Materials
    Science and Engineering: R: Reports 88, 1 (2015).
    [DOI: 10.1016/j.mser.2014.11.001](https://doi.org/10.1016/j.mser.2014.11.001){:target='_blank'}.
    [@Robertson2015]

## 2. Set Up Materials

First, navigate to Materials Designer and import from [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/) the following materials:

- Silicon (Si)
- Silicon dioxide (SiO2)
- Hafnium dioxide (HfO2)
- Titanium nitride (TiN)

![Standata Import](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/import-standata.webp "Standata Import")

## 3. Create HfO2 and TiN Slabs

Before building the stack, we need to create properly terminated slabs for HfO2 and TiN.

### 3.1. Create HfO2 Slab

More detailed instructions on slab creation can be found in the [SrTiO3 Slab](slab-strontium-titanate.md) tutorial.

Open `create_slab_with_termination.ipynb` and set parameters:

```python
# HfO2 slab parameters
MILLER_INDICES = (0, 0, 1)
THICKNESS = 4  # atomic layers
VACUUM = 0.5  # Angstroms
XY_SUPERCELL_MATRIX = [[1, 0], [0, 2]]
USE_ORTHOGONAL_Z = True
USE_CONVENTIONAL_CELL = True

# Select termination (usually first one is fine)
TERMINATION_INDEX = 0
```

Run the notebook to create the HfO2 slab and pass it to Materials Designer.

![HfO2 slab](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/wave-result-hfo2-slab-wave.webp "HfO2 slab")

### 3.2. Create TiN Slab

Open another instance of `create_slab_with_termination.ipynb` for TiN:

```python
# TiN slab parameters
MILLER_INDICES = (0, 0, 1)
THICKNESS = 3  # atomic layers
VACUUM = 10.0  # Angstroms - more vacuum for final layer
XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
USE_ORTHOGONAL_Z = True
USE_CONVENTIONAL_CELL = True

TERMINATION_INDEX = 0
```

Run the notebook to create and pass the TiN slab to Materials Designer.

![TiN slab](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/wave-result-tin-slab.webp "TiN slab")

## 4. Create Si/SiO2 Interface

### 4.1. Launch ZSL Interface Builder

Open `create_interface_with_min_strain_zsl.ipynb` and configure:

```python
FILM_INDEX = 1  # SiO2
FILM_MILLER_INDICES = (1, 0, 0)
FILM_THICKNESS = 3
FILM_TERMINATION_FORMULA = None  # if None, the first termination will be used
FILM_VACUUM = 0.0
FILM_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
FILM_USE_ORTHOGONAL_C = True # Changed from FILM_USE_ORTHOGONAL_Z

SUBSTRATE_INDEX = 0  # Si
SUBSTRATE_MILLER_INDICES = (1, 0, 0)
SUBSTRATE_THICKNESS = 4
SUBSTRATE_TERMINATION_FORMULA = None  # if None, the first termination will be used
SUBSTRATE_VACUUM = 5.0
SUBSTRATE_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
SUBSTRATE_USE_ORTHOGONAL_C = True # Changed from SUBSTRATE_USE_ORTHOGONAL_Z

INTERFACE_DISTANCE = 2.5  # Angstroms
INTERFACE_VACUUM = 5.0  # Angstroms

# Whether to convert materials to conventional cells before creating slabs.
# To create interfaces with smaller cells, set this flag to False. (and pass already conventional cells as input)
USE_CONVENTIONAL_CELL = True

# Maximum area for the superlattice search algorithm (the final interface area will be smaller)
MAX_AREA = 200  # in Angstrom^2
# Additional fine-tuning parameters (increase values to get more strained matches):
MAX_AREA_TOLERANCE = 0.25  # in Angstrom^2
MAX_LENGTH_TOLERANCE = 0.15
MAX_ANGLE_TOLERANCE = 0.15

# Whether to reduce the resulting interface cell to the primitive cell after the interface creation.
# If the reduction causes unexpected results, try increasing the `MAX_AREA` for search.
REDUCE_RESULT_CELL_TO_PRIMITIVE = True
```

We set a higher tolerances to achieve smaller cell with higher strain of the film (SiO2).

![Interface Setup](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/jl-setup-notebook-si-sio2.webp "Interface Setup")

### 4.2. Create Initial Interface

Run the notebook to create the Si/SiO2 interface. This is the most critical interface, so we use strain matching to optimize it.

## 5. Add HfO2 Layer

### 5.1. Configure Simple Interface Builder

Open JupyterLite Session again and select the Si/SiO2 interface and HfO2 slab as input materials.

Open `create_interface_with_no_strain.ipynb` and set:

```python
# Important: Disable slab creation since we're using pre-created slab
ENABLE_FILM_SCALING = True
CREATE_SLABS = False  # We already have our HfO2 slab

FILM_INDEX = 1  # Pre-created HfO2 slab
SUBSTRATE_INDEX = 0  # Si/SiO2 structure

# Interface parameters
INTERFACE_DISTANCE = 2.5  # Angstroms
INTERFACE_VACUUM = 0.5  # Angstroms
```

Film is the material that will be strained (scaled) to match the substrate.

![HfO2 Interface Setup](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/jl-setup-notebook-si-sio2-hfo2.webp "HfO2 Interface Setup")

### 5.2. Add HfO2

Run the notebook to add the pre-created HfO2 slab to the Si/SiO2 structure.

![Si/SiO2/HfO2](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/wave-result-si-sio2-hfo2.webp "Si/SiO2/HfO2")

## 6. Add TiN Layer

### 6.1. Configure Final Layer Addition

Similar to steps in Section 4, we add the TiN layer to the Si/SiO2/HfO2 stack.

Use `create_interface_with_no_strain.ipynb` again:

```python
# Keep slabs disabled
ENABLE_FILM_SCALING = True
CREATE_SLABS = False  # Using pre-created TiN slab

FILM_INDEX = 1  # Pre-created TiN slab
SUBSTRATE_INDEX = 0  # Si/SiO2/HfO2 structure

# Final interface parameters
INTERFACE_DISTANCE = 2.5  # Angstroms
INTERFACE_VACUUM = 10.0  # Final vacuum spacing
```

### 6.2. Complete the Stack

Run the notebook to add the TiN layer and complete the stack.

![Final Stack](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/wave-result-si-sio2-hfo2-tin.webp "Final Stack")

The user then can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 7. Create the interface superlattices

Prodhomme et al. compute the band alignment of the stack pairwise, at the Si/SiO₂, SiO₂/HfO₂ and HfO₂/TiN interfaces,
each in a cell periodic along the interface normal without vacuum, so that each cell holds two interfaces. Robertson
and Wallace give the SiO₂/HfO₂ offset of a second model, with cubic HfO₂ after Sharia et al. [@Sharia2007]. Sections
5–12 of the notebook build the four superlattices and the bulk cells the offsets are read against.

SiO₂ is β-cristobalite, cut along its (001) face, the 5.23 × 5.23 Å² square cell; Si and HfO₂ are strained onto it, and
TiN onto HfO₂. The strains follow from the Standata lattices. The publications do not give the separation of the
blocks: the builder sets the same distance between facing atomic planes at the interfaces, and the atomic positions are
relaxed in the calculation tutorial. The slabs are built longer than the blocks and trimmed by atomic layers, because
the interface builder re-creates its slabs from the bulk.

### 7.1. Set parameters

The second cell of section 1 of the notebook sets the materials, the interface distance, the layer counts, the interface
variants and the names of the saved materials. Among them:

```python
SILICON_NAME = "mp-149"  # Si, diamond, Standata
SILICON_DIOXIDE_NAME = "mp-8352"  # SiO2, beta-cristobalite (C9), Standata
MONOCLINIC_HAFNIUM_DIOXIDE_NAME = "mp-352"  # HfO2, monoclinic, Standata
CUBIC_HAFNIUM_DIOXIDE_NAME = "mp-550893"  # HfO2, cubic, Standata
TITANIUM_NITRIDE_NAME = "mp-492"  # TiN, rock salt, Standata

# in Angstrom, between the facing atomic planes at the interfaces: about the spacing of an anion plane and the next
# cation plane in the materials (0.92 Å in beta-cristobalite, 1.24 Å in TiN (111), 1.26 Å in cubic HfO2)
INTERFACE_DISTANCE = 1.0
SUPERLATTICE_VACUUM = 0.0  # in Angstrom: periodic along the stacking axis

# Si/SiO2, oxygen-rich: the SiO2 block ends in an O2 plane at both interfaces
SILICON_DIOXIDE_NUMBER_OF_LAYERS = 7  # two SiO2 layers each
SILICON_DIOXIDE_TERMINATION_FORMULA = None  # O2 on top
SILICON_DIOXIDE_ATOMIC_LAYERS_REMOVED_FROM_BOTTOM = 3  # Si, O2, Si: twelve SiO2 layers stay
# Si/SiO2, oxygen-poor: the SiO2 block ends in a Si plane at both interfaces
# SILICON_DIOXIDE_NUMBER_OF_LAYERS = 6
# SILICON_DIOXIDE_TERMINATION_FORMULA = "SiO"  # Si on top
# SILICON_DIOXIDE_ATOMIC_LAYERS_REMOVED_FROM_BOTTOM = 1  # O2

INTERFACIAL_ELEMENT_BY_ELEMENT = {"Hf": "Ti", "O": "N"}
INTERFACIAL_ATOMIC_LAYERS = 2  # nitridized: at each end, the Hf2O2 group and the O2 plane next to it
# INTERFACIAL_ATOMIC_LAYERS = 1  # oxidized: the O2 plane facing HfO2 stays O

SILICON_SUPERLATTICE_NAME = "Si/SiO2 (001) superlattice 18+12 O-rich"
# SILICON_SUPERLATTICE_NAME = "Si/SiO2 (001) superlattice 18+12 O-poor"
MONOCLINIC_SUPERLATTICE_NAME = "SiO2/HfO2 monoclinic (001) superlattice 10+7"
CUBIC_SUPERLATTICE_NAME = "SiO2/HfO2 cubic (001) superlattice 12+6"
TITANIUM_NITRIDE_SUPERLATTICE_NAME = "HfO2/TiN superlattice 6+1+6 nitridized"
# TITANIUM_NITRIDE_SUPERLATTICE_NAME = "HfO2/TiN superlattice 6+1+6 oxidized"
SILICON_BULK_NAME = "Si (001) bulk strained"
SILICON_DIOXIDE_BULK_NAME = "SiO2 beta-cristobalite (001) bulk"
MONOCLINIC_BULK_NAME = "HfO2 monoclinic (001) bulk strained"
CUBIC_BULK_NAME = "HfO2 cubic (001) bulk strained"
HAFNIUM_DIOXIDE_BULK_NAME = "HfO2 monoclinic (001) bulk 3x1"
TITANIUM_NITRIDE_BULK_NAME = "TiN (111) bulk strained"
```

### 7.2. Build the Si/SiO₂ superlattice

Section 6 of the notebook compresses Si (001) in plane onto the SiO₂ face, by 4.3 % from the Standata lattices;
Prodhomme et al. compress Si by 3 %. The cell holds twelve SiO₂ layers (22.2 Å, as in the manuscript) and eighteen Si
layers (24.6 Å; the manuscript gives 24.3 Å). The manuscript computes an oxygen-rich and an oxygen-poor interface
without describing their bonding. Here the oxygen-rich SiO₂ block ends in an O₂ plane at both interfaces, so that
Si–O–Si bridges join the blocks; the oxygen-poor block ends in a Si plane, with Si–Si bonds across the interfaces.

Section 11 of the notebook draws each superlattice seen along b, with c vertical and two cells along a and b; the dotted
box outlines the cell. The Si/SiO₂ superlattice, Si₄₈O₂₆, 74 atoms, SiO₂ at the bottom of the cell:

![Si/SiO2 (001) superlattice, oxygen-rich, built by the notebook](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/0-si-sio2-structure-this-notebook.webp "Si/SiO2 (001) superlattice 18+12, oxygen-rich, as built by the notebook"){ style="max-height:500px;width:auto;" }

### 7.3. Build the SiO₂/HfO₂ superlattice with monoclinic HfO₂

Section 7 stacks ten SiO₂ layers (one Si each) and seven monoclinic HfO₂ layers (two Hf each), Hf₁₄Si₁₀O₄₈, as
Prodhomme et al., who stretch HfO₂ by 3.7 % along [100] and 2.1 % along [010]; here the strain follows from the
Standata lattices. The slab builder counts monoclinic (001) layers in pairs, so eight HfO₂ layers are built and one is
removed. The block kept ends in one O against the SiO₂ O plane and in three O against the SiO₂ Si, so each interface
carries three O and the cell stays stoichiometric. The manuscript does not give the in-plane registry of the two
blocks; the builder's default is kept. The superlattice, 72 atoms, beside the oxygen-rich SiO₂/HfO₂ interface of
Prodhomme et al.:

![SiO2/HfO2 with monoclinic HfO2: Prodhomme et al. 2011 and this work](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/1-sio2-hfo2-monoclinic-structure-comparison.webp "SiO2/HfO2 with monoclinic HfO2: Prodhomme et al. 2011, Fig. 1(a) (left), and the superlattice 10+7 as built by the notebook (right)")

### 7.4. Build the SiO₂/HfO₂ superlattice with cubic HfO₂

Section 8 stacks twelve SiO₂ and six cubic HfO₂ layers, Hf₁₂Si₁₂O₄₈, the model of Robertson and Wallace after Sharia et
al. The HfO₂ film is shifted in plane by a quarter of the cell, so that the O of SiO₂ at the interface sit on O sites of
HfO₂. As built, one interface plane is an HfO₂ O plane with four O and the other the SiO₂ O plane with two. The first O
of the four-O plane that is not bonded to Si is removed, and an O is added at the same in-plane position in the two-O
plane. Each interface plane then carries three O, two bonded to Si and Hf and one to Hf only, so no Si–O bond is
broken: the structure of Sharia et al., who remove a different O from each of two four-O interface planes. The
interface with HfO₂ above SiO₂, beside the relaxed interface of Robertson and Wallace:

![SiO2/HfO2 with cubic HfO2: Robertson and Wallace 2015 and this work](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/2-sio2-hfo2-cubic-structure-comparison.webp "SiO2/HfO2 with cubic HfO2: Robertson and Wallace 2015, Fig. 56a, the relaxed interface (left), and the interface of the superlattice 12+6 as built by the notebook (right)")

### 7.5. Build the HfO₂/TiN superlattice

Section 9 puts TiN (111) on monoclinic HfO₂ (001), three HfO₂ cells along [100] and one along [010], as Prodhomme et
al. TiN is strained in plane onto HfO₂: the manuscript stretches it by 1.8 % along [1-10] and compresses it by 0.5 %
along [11-2], the Standata lattices give 2.9 % and 0.0 %; along [111] it is expanded by 1 %, as in the manuscript. At
each end of the HfO₂ block the outermost HfO₂ layer becomes the interfacial layer of the manuscript, with Ti on the Hf
sites and N on the O sites (nitridized); in the oxidized interface the six O facing HfO₂ stay. Six HfO₂ layers remain
between them. TiN has six Ti planes and the five N planes between them, so that Ti faces the interfacial layer on both
sides. The manuscript shows one interface; both interfaces of the cell are built as it. The superlattice is
Hf₃₆O₆₆Ti₇₂N₇₄, 248 atoms. The interface with TiN above HfO₂, beside the nitridized interface of Prodhomme et al.:

![HfO2/TiN, nitridized: Prodhomme et al. 2011 and this work](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/3-hfo2-tin-structure-comparison.webp "HfO2/TiN, nitridized: Prodhomme et al. 2011, Fig. 1(c) (left), and the interface of the superlattice 6+1+6 as built by the notebook (right)")

### 7.6. Cut the bulk reference cells and save the materials

Section 10 cuts the bulk cells. SiO₂ is used as is, one β-cristobalite period along [001]; it is the bulk reference of
both SiO₂ interfaces. Si and the two HfO₂ of the SiO₂/HfO₂ superlattices are strained in plane to the 5.23 Å cell. For
HfO₂/TiN, HfO₂ is three bulk cells with a and b in the order of the superlattice's, and TiN is one period of its (111)
planes, strained in plane as the TiN block. Atom labels are removed from all materials, because labels break the
Quantum ESPRESSO input. Section 12 passes the four superlattices and six bulk cells to the environment: in JupyterLite
to Materials Designer, where they can be saved on the platform; in a local Jupyter session to the `uploads` folder.

## 8. Interactive JupyterLite Notebook

The following JupyterLite notebook demonstrates the process of creating target material. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/heterostructure_silicon_silicon_dioxide_hafnium_dioxide_titanium_nitride.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 9. References

