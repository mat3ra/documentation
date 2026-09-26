---
tags:
  - graphene
  - ripples
  - perturbation
  - 2D materials
  - edge effects
  - C
  - X-3D-PER

hide:
  - tags
# YAML header
render_macros: true
---

# Ripple perturbation of a Graphene sheet.

## 1. Introduction

This tutorial demonstrates the process of creating edge induced ripples in graphene nanosheet based on the work presented in the following manuscript, where the mechanical properties of graphene edges were studied.

!!!note "Manuscript"
    Thompson-Flagg, R. C., Moura, M. J. B., & Marder, M.
    "Rippling of graphene"
    EPL (Europhysics Letters), 85(4), 46002 (2009)
    [DOI: 10.1209/0295-5075/85/46002](https://doi.org/10.1209/0295-5075/85/46002){:target='_blank'}. [@ThompsonFlagg2009; @Fasolino2007; @Openov2010]

We will focus on creating graphene with edge-induced ripples that match the patterns observed in experimental studies, as shown in FIG. 1.

![Rippled Graphene](../../../images/tutorials/materials/defects/perturbation_ripple_graphene/0-figure-from-manuscript.webp "Rippled Graphene, FIG. 1.")

## 2. Create Graphene Nanoribbon

### 2.1. Load Graphene Material

Navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the graphene material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Standata Graphene Import](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/1-standata-graphene.webp "Standata Graphene Import")

### 2.2. Launch JupyterLite Session

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 2.3. Open `create_nanoribbon.ipynb` notebook

Find `create_nanoribbon.ipynb` in the list of notebooks and click/double-click to open it.

### 2.4. Set up nanoribbon parameters

Edit notebook to set the nanoribbon parameters:

```python
# Index in the list of materials, to access as materials[MATERIAL_INDEX]
MATERIAL_INDEX = 0

# Widths and lengths are in number of unit cells
WIDTH = 40 # in unit cells
LENGTH = 40 # in unit cells
VACUUM_WIDTH = 10.0 # in Angstroms
VACUUM_LENGTH = 10.0 # in Angstroms
EDGE_TYPE = "zigzag" # "zigzag" or "armchair"
```

![Setup Nanoribbon Parameters](../../../images/tutorials/materials/defects/perturbation_ripple_graphene/2-jl-setup-nb-nanoribbon.webp "Setup Nanoribbon Parameters")

### 2.5. Run the notebook

After setting the parameters, run the notebook by selecting "Run > Run All Cells" from the menu. This will create a graphene nanoribbon with the specified dimensions.

![Nanoribbon Result](../../../images/tutorials/materials/defects/perturbation_ripple_graphene/3-wave-result-nanoribbon.webp "Graphene Nanoribbon")

## 3. Create Ripples in the Nanoribbon

### 3.1. Open `create_perturbation_custom.ipynb` notebook

Find `create_perturbation_custom.ipynb` in the list of notebooks and click/double-click to open it.

### 3.2. Set up perturbation parameters

Next, we need to set up the parameters for creating rippled graphene.

Edit notebook in 1.2. to set generic perturbation parameters:

```python
import sympy as sp

# Set whether to preserve geodesic distance and scale the cell accordingly to match PBC
PRESERVE_GEODESIC_DISTANCE = False

# Set the supercell matrix to apply to original material
SUPERCELL_MATRIX = [[40, 0, 0], [0, 40, 0], [0, 0, 1]]

# Set whether to use Cartesian coordinates for the perturbation function
USE_CARTESIAN_COORDINATES = False

# Variables for the perturbation function (for SymPy)
variable_names = ["x", "y", "z"]
x, y, z = sp.symbols(variable_names)

# Set the parameters for the perturbation function
AMPLITUDE = 0.09  # Ripple amplitude
WAVELENGTH = 0.2  # Wavelength of ripples
EDGE_WIDTH = 0.25  # Width of edge effect
PHASE_X = 0.0  # Phase shift for x direction
PHASE_Y = sp.pi/2  # Phase shift for y direction

# Create edge masks for both x and y using polynomial functions
left_edge_x = sp.Max(0, (EDGE_WIDTH - x) / EDGE_WIDTH)
right_edge_x = sp.Max(0, (x - (1 - EDGE_WIDTH)) / EDGE_WIDTH)
left_edge_y = sp.Max(0, (EDGE_WIDTH - y) / EDGE_WIDTH)
right_edge_y = sp.Max(0, (y - (1 - EDGE_WIDTH)) / EDGE_WIDTH)

# Combine edge masks
edge_mask_x = left_edge_x + right_edge_x
edge_mask_y = left_edge_y + right_edge_y
edge_mask = edge_mask_x + edge_mask_y

# Wave pattern
wave_pattern = (
    sp.sin(2 * sp.pi * x / WAVELENGTH + PHASE_X) * 
    sp.sin(2 * sp.pi * y / WAVELENGTH + PHASE_Y)
)

# Combine waves with edge mask
custom_sympy_function = AMPLITUDE * wave_pattern * edge_mask
```

Then modify section 1.3 to define the custom perturbation function:

```python
import sympy as sp

# Variables for the perturbation function (for SymPy)
variable_names = ["x", "y", "z"]
x, y, z = sp.symbols(variable_names)

# Set the parameters for the perturbation function
AMPLITUDE = 0.09  # Ripple amplitude
WAVELENGTH = 0.2  # Wavelength of ripples
EDGE_WIDTH = 0.25  # Width of edge effect
PHASE_X = 0.0  # Phase shift for x direction
PHASE_Y = sp.pi/2  # Phase shift for y direction

# Create edge masks for both x and y using polynomial functions
left_edge_x = sp.Max(0, (EDGE_WIDTH - x) / EDGE_WIDTH)
right_edge_x = sp.Max(0, (x - (1 - EDGE_WIDTH)) / EDGE_WIDTH)
left_edge_y = sp.Max(0, (EDGE_WIDTH - y) / EDGE_WIDTH)
right_edge_y = sp.Max(0, (y - (1 - EDGE_WIDTH)) / EDGE_WIDTH)

# Combine edge masks
edge_mask_x = left_edge_x + right_edge_x
edge_mask_y = left_edge_y + right_edge_y
edge_mask = edge_mask_x + edge_mask_y

# Wave pattern
wave_pattern = (
    sp.sin(2 * sp.pi * x / WAVELENGTH + PHASE_X) * 
    sp.sin(2 * sp.pi * y / WAVELENGTH + PHASE_Y)
)

# Combine waves with edge mask
custom_sympy_function = AMPLITUDE * wave_pattern * edge_mask
```

![Setup Perturbation Function](../../../images/tutorials/materials/defects/perturbation_ripple_graphene/4-jl-setup-nb-final.webp "Setup Perturbation Function")

Key parameters explained:

- `AMPLITUDE` Controls the height of the ripples (0.09 Å)
- `WAVELENGTH` Controls the spacing between ripples (0.2 in crystal coordinates)
- `EDGE_WIDTH` Controls how far the ripples extend from the edges (0.25 in crystal coordinates)
- `PHASE_X`/`PHASE_Y` Controls the phase shift of the ripple pattern

### 3.3. Run the notebook

After setting the parameters, run the notebook by selecting "Run > Run All Cells" from the menu.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

## 4. Pass the Material to Materials Designer

The rippled graphene structure will be automatically passed back to the current Materials Designer environment where user can save it.

Graphene with edge-induced ripples with amplitude of 0.09 crystal units.

![Final Material](../../../images/tutorials/materials/defects/perturbation_ripple_graphene/5-wave-result-final.webp "Final Rippled Graphene, amplitude 0.09 crystal units")

Graphene with edge-induced ripples with amplitude of 0.27 crystal units.

![Final Material](../../../images/tutorials/materials/defects/perturbation_ripple_graphene/6-wave-result-final-2.webp "Final Rippled Graphene, amplitude 0.27 crystal units")

Or user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 5. Interactive JupyterLite Notebook

The following JupyterLite notebook demonstrates the process of creating rippled graphene. Select "Run" > "Run All Cells".

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/perturbation_ripple_graphene.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 6. Parameters Fine-tuning

If user need to adjust the ripple pattern, user can modify these key parameters:

1. To change ripple height:
   - Adjust AMPLITUDE (higher value = taller ripples)

2. To change ripple spacing:
   - Adjust WAVELENGTH (higher value = more spread out ripples)

3. To change how far ripples extend from edges:
   - Adjust EDGE_WIDTH (higher value = ripples extend further from edges)

4. To change the ripple pattern:
   - Adjust PHASE_X and PHASE_Y to modify the wave interference pattern

## 7. References
