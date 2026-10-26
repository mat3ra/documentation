---
tags:
  - 2D
  - Graphene
  - Hexagonal Boron Nitride
  - interface
  - stacking
  - C-2D-INT-Z

hide:
  - tags
# YAML header
render_macros: true
---

# Interfaces between 2D Materials: h-BN and Graphene.

## 1. Introduction

This tutorial creates graphene on four layers of hexagonal boron nitride (h-BN) for three stackings and a list of graphene–h-BN distances, following the manuscript below.

!!!note "Manuscript"
    **Gianluca Giovannetti, Petr A. Khomyakov, Geert Brocks, Paul J. Kelly and Jeroen van den Brink**
    **Substrate-induced band gap in graphene on hexagonal boron nitride: Ab initio density functional calculations**
    Physical Review B 76, 073103 (2007)
    [DOI: 10.1103/PhysRevB.76.073103](https://doi.org/10.1103/PhysRevB.76.073103){:target='_blank'} [@Giovannetti2007]

The [Materials Designer]({{ interface_url }}/materials-designer/overview/) imports the two materials from Standata, and the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) notebook builds the interfaces.

## 2. Load and preview materials

First, navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import graphene (`2dm-3993`) and bulk h-BN (`mp-7991`) from [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Standata Graphene and h-BN Import](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/1-standata-import-gr-hbn.webp "Standata Graphene and h-BN Import")

### 2.1. Launch JupyterLite session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment, with h-BN as the first material and graphene as the second.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 2.2. Open the notebook and set the parameters

Open the `interface_2d_2d_boron_nitride_graphene.ipynb` notebook. Cell 1.1 sets the parameters:

```python
LATTICE_CONSTANT = 2.445  # Å, graphene LDA (Giovannetti et al. 2007); h-BN is compressed to it
H_BN_LAYERS = 4
H_BN_INTERLAYER_DISTANCE = 3.24  # Å, the paper's LDA value
VACUUM = 15.0  # Å above graphene

# Giovannetti et al. 2007 compute all three stackings at every distance 2.5–3.9 Å; the defaults run
# stacking (c) at three distances around its minimum. Uncomment entries to compute more
# (one job per stacking × distance).
STACKINGS = [
    "c",
    # "a",
    # "b",
]
DISTANCES = [
    3.1, 3.2, 3.3,
    # 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
]
STACKING_SHIFTS = {"a": 0, "b": 1, "c": -1}  # in units of a/√3 along y
REGISTRY_TOLERANCE = 1e-3  # crystal units
```

`STACKINGS` and `DISTANCES` list the registries and distances to build; the defaults build stacking (c) at 3.1, 3.2 and 3.3 Å, and uncommenting the rest builds the paper's 3 × 15 set.

![Notebook setup](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/2-jl-setup-notebook.webp "Notebook setup")

## 3. Create the interfaces between h-BN and graphene

### 3.1. Strain the materials

Both materials are strained in-plane to a = 2.445 Å, and h-BN along c to 3.24 Å between layers:

```python
from mat3ra.made.tools.build_components.operations.core.modifications.strain.helpers import create_strain

film_scale = LATTICE_CONSTANT / film.lattice.a
substrate_scale = LATTICE_CONSTANT / substrate.lattice.a
substrate_c_scale = 2 * H_BN_INTERLAYER_DISTANCE / substrate.lattice.c
film = create_strain(film, strain_matrix=[[film_scale, 0, 0], [0, film_scale, 0], [0, 0, 1]])
substrate = create_strain(
    substrate, strain_matrix=[[substrate_scale, 0, 0], [0, substrate_scale, 0], [0, 0, substrate_c_scale]]
)
```

### 3.2. Set the AA' stacking of h-BN

The standata bulk h-BN entry is not AA': its boron atoms sit over hexagon centres of the next layer. The atoms of the upper layer are moved by (1/3, 2/3, 0) in crystal coordinates, so that boron sits over nitrogen in adjacent layers:

```python
from mat3ra.made.tools.analyze.other import get_atom_indices_with_condition_on_coordinates
from mat3ra.made.tools.operations.core.unary import translate_atoms

upper_layer_ids = get_atom_indices_with_condition_on_coordinates(substrate, lambda coordinate: coordinate[2] > 0.5)
substrate = translate_atoms(
    substrate, atom_ids=upper_layer_ids, vector=[1 / 3, 2 / 3, 0], use_cartesian_coordinates=False
)
```

### 3.3. Create the slabs

The h-BN slab has four layers, two per bulk cell, and the graphene slab one layer:

```python
from mat3ra.made.tools.build.pristine_structures.two_dimensional.slab import SlabConfiguration, SlabBuilder

substrate_slab_config = SlabConfiguration.from_parameters(
    material_or_dict=substrate,
    miller_indices=(0, 0, 1),
    number_of_layers=H_BN_LAYERS // 2,  # two BN layers per bulk cell
    vacuum=0.0,
)

film_slab_config = SlabConfiguration.from_parameters(
    material_or_dict=film,
    miller_indices=(0, 0, 1),
    number_of_layers=1,
    vacuum=0.0,
)

substrate_slab = SlabBuilder().get_material(substrate_slab_config)
film_slab = SlabBuilder().get_material(film_slab_config)
```

### 3.4. Create the interface at each distance and stacking

The loop places graphene on the h-BN slab at each distance, shifts it along y by the registry shift of each stacking, names the interface and prints the measured registry:

```python
import numpy as np
from mat3ra.made.tools.analyze.other import get_average_interlayer_distance
from mat3ra.made.tools.convert.interface_parts_enum import InterfacePartsEnum
from mat3ra.made.tools.helpers import create_interface_zsl_between_slabs as create_zsl_interface_between_slabs
from mat3ra.made.tools.modify import interface_displace_part


def get_registry(interface):
    elements = np.array(interface.basis.elements.values)
    coordinates = np.array(interface.basis.coordinates.values)
    top_layer = (elements != "C") & np.isclose(coordinates[:, 2], coordinates[elements != "C", 2].max())
    registry = []
    for carbon in coordinates[elements == "C"]:
        in_plane_offsets = (coordinates[top_layer, :2] - carbon[:2] + 0.5) % 1 - 0.5
        atoms_below = elements[top_layer][np.all(np.abs(in_plane_offsets) < 1e-3, axis=1)]
        registry.append(atoms_below[0] if len(atoms_below) else "hollow")
    return registry


interfaces = []
for stacking in STACKINGS:
    for distance in DISTANCES:
        # the builder adds the gap to the vacuum above the film
        interface = create_zsl_interface_between_slabs(
            substrate_slab=substrate_slab, film_slab=film_slab, gap=distance, vacuum=VACUUM - distance
        )
        interface = interface_displace_part(
            interface=interface,
            displacement=[0, STACKING_SHIFTS[stacking] * interface.lattice.a / np.sqrt(3), 0],
            use_cartesian_coordinates=True,
        )
        interface.name = f"Gr/hBN ({stacking}) d{distance:.2f}"
        interface.lattice.type = "HEX"
        interfaces.append(interface)
        interlayer_distance = get_average_interlayer_distance(
            interface, InterfacePartsEnum.SUBSTRATE.value, InterfacePartsEnum.FILM.value
        )
        vacuum = interface.lattice.c * (1 - max(coordinate[2] for coordinate in interface.basis.coordinates.values))
        print(f"{interface.name}: {len(interface.basis.elements.ids)} atoms, a = {interface.lattice.a:.4f} Å, "
              f"gamma = {interface.lattice.gamma:.1f}°, distance = {interlayer_distance:.3f} Å, "
              f"vacuum = {vacuum:.2f} Å, C over {' / '.join(get_registry(interface))}")
```

![Gr/h-BN Interface](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/3-jl-result-preview.webp "Gr/h-BN Interface")

### 3.5. Run the notebook

Select *Run* > *Run All*.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

## 4. Pass the Material to Materials Designer

The user can pass the materials to the current Materials Designer environment and save them.

![Final Material](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/6-wave-result.webp "Graphene on Hexagonal Boron Nitride Interface")

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the materials in Material JSON format or POSCAR format.

The interfaces are named `Gr/hBN (<stacking>) d<distance>`, for example `Gr/hBN (c) d3.10`, and the [simulation tutorial](interface-2d-2d-graphene-boron-nitride-simulation.md) loads them by these names.


## 5. Interactive JupyterLite Notebook

The interactive JupyterLite notebook for creating Gr/h-BN interface can be accessed below. To run the notebook, click on the "Run All" button.


{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_2d_2d_boron_nitride_graphene.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 6. References

