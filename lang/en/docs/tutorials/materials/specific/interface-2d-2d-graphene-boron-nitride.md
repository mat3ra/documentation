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

This tutorial demonstrates the process of creating interfaces with different stacking configurations between 2D materials, specifically hexagonal boron nitride (h-BN) and graphene, based on the work presented in the following manuscript, where the electronic properties of h-BN-graphene interfaces are studied.

!!!note "Manuscript"
    **Jeil Jung, Ashley M. DaSilva, Allan H. MacDonald & Shaffique Adam**
    **Origin of the band gap in graphene on hexagonal boron nitride**
    Nature Communications volume 6, Article number: 6308 (2015)
    [DOI: 10.1038/ncomms7308](https://doi.org/10.1038/ncomms7308) [@Jung2015; @Novoselov2016; @Gupta2024]


We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create interfaces and shift the layers along the y-axis to achieve different stacking configurations.

The Figure 7 shows the different stacking configurations of graphene on h-BN.

![Graphene on Hexagonal Boron Nitride](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/0-figure-from-manuscript.webp   "Graphene on Hexagonal Boron Nitride, FIG. 7")

## 2. Load and preview materials

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the Graphene and Hexagonal BN materials from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).


![Standata Graphene and h-BN Import](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/1-standata-import-gr-hbn.webp "Standata Graphene and h-BN Import")

Then we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create the target structures.


## 3. Create interface between h-BN and Graphene

### 2.1 Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.


![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 3.2. Open and modify the notebook

Select the input materials with first one being the substrate (h-BN) and the second one being the film (Graphene).

Next, open `create_interface_with_min_strain_zsl.ipynb` notebook to modify the parameters by changing:

Miller indices of both materials to `(0,0,1)`,

Thickness of both materials to `1`,

Distance between materials to `3.4` angstroms -- mentioned in the publication.

Default value for `MAX_AREA = 50` should be enough since materials have similar lattice constants.


Adjust the "1.1. Set up slab parameters" cell in the notebook according to:

```python
# Enable interactive selection of terminations via UI prompt
IS_TERMINATIONS_SELECTION_INTERACTIVE = False 

FILM_INDEX = 1  # Index in the list of materials, to access as materials[FILM_INDEX]
FILM_MILLER_INDICES = (0, 0, 1)
FILM_THICKNESS = 1  # in atomic layers
FILM_TERMINATION_FORMULA = None  # if None, the first termination will be used
FILM_VACUUM = 0.0  # in angstroms
FILM_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
FILM_USE_ORTHOGONAL_C = True

SUBSTRATE_INDEX = 0
SUBSTRATE_MILLER_INDICES = (0, 0, 1)
SUBSTRATE_THICKNESS = 1  # in atomic layers
SUBSTRATE_TERMINATION_FORMULA = None  # if None, the first termination will be used
SUBSTRATE_VACUUM = 0.0  # in angstroms
SUBSTRATE_XY_SUPERCELL_MATRIX = [[1, 0], [0, 1]]
SUBSTRATE_USE_ORTHOGONAL_C = True

INTERFACE_DISTANCE = 3.4  # Gap between substrate and film, in Angstrom
INTERFACE_VACUUM = 20.0  # Vacuum over film, in Angstrom

# Whether to convert materials to conventional cells before creating slabs.
# To create interfaces with smaller cells, set this flag to False. (and pass already conventional cells as input)
USE_CONVENTIONAL_CELL = True

# Maximum area for the superlattice search algorithm (the final interface area will be smaller)
MAX_AREA = 50  # in Angstrom^2
# Additional fine-tuning parameters (increase values to get more strained matches):
MAX_AREA_TOLERANCE = 0.09  # in Angstrom^2
MAX_LENGTH_TOLERANCE = 0.05
MAX_ANGLE_TOLERANCE = 0.02

# Whether to reduce the resulting interface cell to the primitive cell after the interface creation.
# If the reduction causes unexpected results, try increasing the `MAX_AREA` for search.
REDUCE_RESULT_CELL_TO_PRIMITIVE = True
```

![Notebook setup](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/2-jl-setup-notebook.webp "Notebook setup")


### 3.3. Run the Notebook

After setting the parameters, run the notebook to create the interface between h-BN and Graphene.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 3.4. View Results

The generation might take some time.
After that, the user can pass the material to the Materials Designer for further analysis.

Interface between h-BN and Graphene with the specified parameters is shown below.

![Gr/h-BN Interface ](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/3-jl-result-preview.webp "Gr/h-BN Interface")

### 3.5. Set the cell to the standard hexagonal setting

The ZSL interface cell comes out with γ = 60°, but the symbolic K point used by the simulation notebook assumes the standard 120° hexagonal cell. The cell is therefore re-set with a unimodular supercell matrix, and each shifted interface is typed `HEX`:

```python
from mat3ra.made.tools.helpers import create_supercell

interface = create_supercell(interface, supercell_matrix=[[1, 0, 0], [-1, 1, 0], [0, 0, 1]])
```

### 3.6. Shift the layers to generate stacking configurations

To shift graphene layer along the y-axis, the user can modify the last cell in the notebook to achieve different stacking configurations.

As mentioned in the publication, the vector to slide the layers between AA, AB and BA configurations is `a/sqrt(3)`. The notebook builds seven interfaces at half-steps of this vector, with `n` running from `2` to `8`.

The loop below builds the seven interfaces and names them from `INTERFACE_NAMES`, using the `interface_displace_part()` function from the `mat3ra.made.tools.modify` module.

```python
import numpy as np
from mat3ra.made.tools.analyze.other import get_average_interlayer_distance
from mat3ra.made.tools.convert.interface_parts_enum import InterfacePartsEnum
from mat3ra.made.tools.modify import interface_displace_part

a = interface.lattice.a
shifted_interfaces = []
for index, n in enumerate(range(2, 9)):
    shifted_interface = interface_displace_part(
        interface=interface,
        displacement=[0, n * a / np.sqrt(3) / 2, 0],
        use_cartesian_coordinates=True)
    shifted_interface.name = INTERFACE_NAMES[index]
    shifted_interface.lattice.type = "HEX"
    shifted_interfaces.append(shifted_interface)
    interlayer_distance = get_average_interlayer_distance(
        shifted_interface, InterfacePartsEnum.SUBSTRATE.value, InterfacePartsEnum.FILM.value)
    print(f"{shifted_interface.name}: {len(shifted_interface.basis.elements.ids)} atoms, "
          f"gamma = {shifted_interface.lattice.gamma:.1f}°, interlayer distance = {interlayer_distance:.3f} Å")
```

![Shift Interface](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/4-jl-setup-shift.webp "Shift Interface")

Preview of interfaces with different stacking configurations is shown below.

![Shifted Interfaces](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/5-jl-result-preview.webp "Shifted Interfaces")

## 4. Pass the Material to Materials Designer

The user can pass the material with the interface in the current Materials Designer environment and save it.

![Final Material](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/6-wave-result.webp "Graphene on Hexagonal Boron Nitride Interface")

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

The shift loop names the seven interfaces as follows, and the simulation notebook loads materials by these exact names:

- `Gr/hBN d3.4 shift 0of6 BA`
- `Gr/hBN d3.4 shift 1of6`
- `Gr/hBN d3.4 shift 2of6 AA`
- `Gr/hBN d3.4 shift 3of6`
- `Gr/hBN d3.4 shift 4of6 AB`
- `Gr/hBN d3.4 shift 5of6`
- `Gr/hBN d3.4 shift 6of6 BA`

Three of the seven are the symmetric stackings: AA (carbon over both boron and nitrogen), AB (carbon over nitrogen and over a hexagon centre) and BA (carbon over boron and over a hexagon centre); `0of6` and `6of6` are both BA, the same structure one period apart.

Once the structures exist, the [simulation tutorial](interface-2d-2d-graphene-boron-nitride-simulation.md) loads them by name and reproduces the manuscript's stacking energies and band gaps.


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

