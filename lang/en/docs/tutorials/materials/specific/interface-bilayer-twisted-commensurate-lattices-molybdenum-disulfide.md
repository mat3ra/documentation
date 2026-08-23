---
tags:
  - 2d-materials
  - layers
  - bilayer
  - twisted
  - commensurate
  - molybdenum
  - disulfide
  - C-2D-INT-C

hide:
  - tags
# YAML header
render_macros: true
---

# Twisted Bilayer Molybdenum Disulfide Structure Creation.

## 1. Introduction

This tutorial demonstrates the process of creating a twisted bilayer molybdenum disulfide (MoS2) structure based on the work presented in the following manuscript.

!!!note "Manuscript"
    **Kaihui Liu, Liming Zhang, Ting Cao, Chenhao Jin, Diana Qiu, Qin Zhou, Alex Zettl, Peidong Yang, Steve G. Louie & Feng Wang**,
    "Evolution of interlayer coupling in twisted molybdenum disulfide bilayers" Nature Communications volume 5, Article number: 4966 (2014)
    [DOI: 10.1038/ncomms5966](https://doi.org/10.1038/ncomms5966) [@Liu2014; @Zhang2016; @Cao2018]


We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create molybdenum disulfide bilayer structure configurations with multiple twist angles.

The Figure 4 shows the twisted bilayer MoS2 configurations.

![Twisted Bilayer Molybdenum Disulfide](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/MoS2-twisted-bilayers.png   "Twisted Bilayer Molybdenum Disulfide")

## 2. Load and preview MoS2 structure

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the MoS2 material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).


![Standata MoS2 Import](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/standata-import-mos2.png "Standata MoS2 Import")

Then we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create a twisted bilayer molybdenum disulfide structure.


## 3. Create the MoS2 bilayers

### 3.1. Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.


![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 3.2. Open and modify the notebook

Open `specific_examples/interface_bilayer_twisted_commensurate_lattices_molybdenum_disulfide.ipynb`
— the notebook embedded in section 5 below.

The first cell lists the configurations to build. Each entry is a name, a twist angle, and an
interlayer separation; the notebook builds every active entry in one run, so there is no need to
edit and re-run once per angle:

```python
INTERFACE_PARAMETERS = [
    {"name": "MoS2 bilayer 21.8deg d6.5", "angle": 21.8, "d_mo_mo": 6.5},
    {"name": "MoS2 bilayer AB1 d6.1", "angle": 60.0, "d_mo_mo": 6.1},
    {"name": "MoS2 bilayer AB1 d6.5", "angle": 60.0, "d_mo_mo": 6.5},
    # {"name": "MoS2 bilayer AA3 d6.8", "angle": 0.0, "d_mo_mo": 6.8},
    # {"name": "MoS2 bilayer 13.2deg d6.5", "angle": 13.2, "d_mo_mo": 6.5},
    # {"name": "MoS2 bilayer 38.2deg d6.5", "angle": 38.2, "d_mo_mo": 6.5},
    # {"name": "MoS2 bilayer 46.8deg d6.5", "angle": 46.8, "d_mo_mo": 6.5},
]
```

!!!note "`d_mo_mo` is the Mo–Mo separation, not a gap"
    Table S1 of the manuscript tabulates the **averaged Mo–Mo separation** of the two layers, and
    `d_mo_mo` is that quantity. The notebook subtracts the monolayer thickness itself to get the gap
    the builder needs. Passing 6.5 Å straight through as a gap would put the layers roughly 3 Å
    further apart than the manuscript, which is enough to change the indirect gap substantially.

The second cell holds the cell and search parameters:

```python
# Slab creation parameters
MILLER_INDICES = (0, 0, 1)  # Miller indices for slab creation
NUMBER_OF_LAYERS = 1  # Number of layers in the slab

TOTAL_CELL_HEIGHT = 20.0  # out-of-plane cell dimension in Angstroms, as in the article

# Search algorithm parameters
MAX_REPETITION = None  # Maximum supercell matrix element value (None for automatic)
ANGLE_TOLERANCE = 0.5  # in degrees
RETURN_FIRST_MATCH = True  # If True, returns first solution within tolerance

# Visualization parameters
SHOW_INTERMEDIATE_STEPS = True
VISUALIZE_REPETITIONS = [3, 3, 1]
```

`TOTAL_CELL_HEIGHT` is the **total** out-of-plane cell dimension, matching the 20 Å the manuscript
used to separate the bilayer from its periodic images. The notebook derives the vacuum from it, so
the built cell comes out at 20 Å regardless of which interlayer separation is requested.

![Notebook setup](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/jl-set-nb.png "Notebook setup")


### 3.3. Run the Notebook

After setting the parameters, run the notebook to build every active configuration.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 3.4. Check the geometry

For each structure the notebook prints the atom count, the achieved Mo–Mo separation next to the
value that was asked for, the cell height, and — for the registered stacks at 0° and 60° — which
stacking registry the search actually produced:

```
MoS2 bilayer 21.8deg d6.5: 21.8°, 42 atoms, d(Mo-Mo) 6.500 Å (target 6.5 Å), cell c 20.00 Å
MoS2 bilayer AB1 d6.1: 60.0°, 6 atoms, d(Mo-Mo) 6.100 Å (target 6.1 Å), cell c 20.00 Å, AA1/AB1 (S over Mo)
```

The registry matters because Table S1 gives a different interlayer distance to each one: 6.1–6.2 Å
for the AA1/AB1 and AA2/AB2 stacks, 6.8 Å for AA3/AB3 where sulfur sits directly over sulfur.

### 3.5. View results and pass to Materials Designer

The generation might take some time. Each finished structure is saved to the `uploads` folder under
its `name`, and can also be passed to the Materials Designer for further analysis.

The interface for the 21.8° twist is shown below.

![Result Material, 22 degrees](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/mos2-result-wavejs-22.png "MoS2 Twisted Bilayer, 21.8 degrees")

## 4. The other twist angles

The remaining configurations are already in `INTERFACE_PARAMETERS`, commented out. Uncomment the
ones needed and re-run; the separations come from Table S1 of the manuscript.

| Entry | Angle | `d_mo_mo` | Atoms |
|---|---|---|---|
| `MoS2 bilayer AA3 d6.8` | 0° | 6.8 Å | 6 |
| `MoS2 bilayer 13.2deg d6.5` | 13.2° | 6.5 Å | 114 |
| `MoS2 bilayer 21.8deg d6.5` | 21.8° | 6.5 Å | 42 |
| `MoS2 bilayer 38.2deg d6.5` | 38.2° | 6.5 Å | 42 |
| `MoS2 bilayer 46.8deg d6.5` | 46.8° | 6.5 Å | 114 |
| `MoS2 bilayer AB1 d6.1` | 60° | 6.1 Å | 6 |

The 13.2° and 46.8° cells hold 114 atoms and take noticeably longer to build than the rest.

![Result Material, 0 degrees](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/mos2-result-wavejs-0.png "MoS2 Twisted Bilayer, 0 degrees")

![Result Material, 13 degrees](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/mos2-result-wavejs-13.png "MoS2 Twisted Bilayer, 13.2 degrees")

![Result Material, 38 degrees](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/mos2-result-wavejs-38.png "MoS2 Twisted Bilayer, 38.2 degrees")

![Result Material, 47 degrees](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/mos2-result-wavejs-47.png "MoS2 Twisted Bilayer, 46.8 degrees")

![Result Material, 60 degrees](../../../images/tutorials/materials/interfaces/twisted-bilayer-molybdenum-disulfide/mos2-result-wavejs-60.png "MoS2 Twisted Bilayer, 60 degrees")

Once the structures exist, the
[band structure tutorial](interface-bilayer-twisted-commensurate-lattices-molybdenum-disulfide-simulation.md)
loads them by name and reproduces the manuscript's band gaps.


## 5. Interactive JupyterLite Notebook

The interactive JupyterLite notebook for creating twisted bilayer MoS2 structures can be accessed below. To run the notebook, click on the "Run All" button.


{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_bilayer_twisted_commensurate_lattices_molybdenum_disulfide.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 6. References
