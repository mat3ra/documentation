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
  - valence-band-offset
  - C-2D-INT-Z

hide:
  - tags
# YAML header
render_macros: true
---

# SiO2/HfO2 (001) Valence Band Offset

## 1. Introduction

This tutorial calculates the valence band offset ΔE_v of two SiO₂/HfO₂ (001) superlattices, one with monoclinic and
one with cubic HfO₂, reproducing the results of the following manuscripts:

!!!note "Manuscripts"
    **Pierre-Yves Prodhomme, Fabien Fontaine-Vive, Abram Van Der Geest, Philippe Blaise and Jacky Even**,
    "Ab initio calculation of effective work functions for a TiN/HfO2/SiO2/Si transistor stack", Applied Physics
    Letters 99, 022101 (2011). [DOI: 10.1063/1.3609869](https://doi.org/10.1063/1.3609869){:target='_blank'}.
    [@Prodhomme2011]

    **John Robertson and Robert M. Wallace**, "High-K materials and metal gates for CMOS applications", Materials
    Science and Engineering: R: Reports 88, 1 (2015).
    [DOI: 10.1016/j.mser.2014.11.001](https://doi.org/10.1016/j.mser.2014.11.001){:target='_blank'}.
    [@Robertson2015]

This tutorial builds upon the
[SiO2/HfO2 (001) Superlattices with Monoclinic and Cubic HfO2](interface-3d-3d-silicon-dioxide-hafnium-dioxide.md)
tutorial, where the two superlattices and their three bulk cells are created. Here, the notebook anneals the
monoclinic superlattice and relaxes both with the MACE-MP-0 machine-learned force field, and the platform's
Valence Band Offset (Bulk Method) workflow runs Quantum ESPRESSO on each relaxed superlattice and its two bulk cells.
The offset is assembled by the [potential lineup](../../dft/electronic/valence-band-offset.md) [@VanDeWalle1986]:
each bulk's valence band maximum E_VBM is measured from its own average potential V̄, and the superlattice gives the
step in V̄ between the two materials,

```
ΔE_v = (E_VBM − V̄)_SiO₂ − (E_VBM − V̄)_HfO₂ + (V̄_SiO₂ − V̄_HfO₂)_superlattice
```

ΔE_v is positive when the valence band maximum of SiO₂ lies above that of HfO₂, the sign convention of both
manuscripts. In the local density approximation (LDA), Prodhomme et al. give ΔE_v = +0.4 eV for the monoclinic
model (Table I), and Robertson and Wallace −0.67 eV for the cubic model (Fig. 57a).

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [SiO2/HfO2 (001) Superlattices](interface-3d-3d-silicon-dioxide-hafnium-dioxide.md) tutorial, using
   the `interface_3d_3d_silicon_dioxide_hafnium_dioxide.ipynb` notebook embedded in its section 6, to create and save
   `SiO2/HfO2 monoclinic (001) superlattice 10+7`, `SiO2/HfO2 cubic (001) superlattice 12+6`,
   `SiO2 beta-cristobalite (001) bulk`, `HfO2 monoclinic (001) bulk strained` and `HfO2 cubic (001) bulk strained`, OR
2. Have the five materials saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure the material names, the Density Functional Theory (DFT)
   model, the anneal and relaxation, and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the two superlattices and the three bulks, print their composition and geometry
4. **Configure the model and k-grids**: One DFT model, the same k-grid for both superlattices, a k-grid per bulk from
   one k-point density
5. **Configure compute resources**: Select the cluster, queue, and processor settings
6. **Anneal the monoclinic superlattice**: Molecular dynamics on the MACE-MP-0 force field, from 1000 K to 100 K in
   1 ps, as Prodhomme et al.
7. **Relax the superlattices**: Atomic positions at fixed cell on the same force field, to 0.07 eV/Å
8. **Configure the workflow**: One Valence Band Offset (Bulk Method) workflow per superlattice, with the model and a
   k-grid per material
9. **Run the jobs**: One job per superlattice, which runs the electrostatic potential of the superlattice, the band
   structure and the electrostatic potential of each bulk, and the offset
10. **Retrieve results**: The offsets and the potential profiles, and the potential across each superlattice
11. **Compare with the manuscripts**: Print each offset beside its manuscript's value

## 4. Calculation parameters

| | this tutorial | Prodhomme et al. | Robertson and Wallace |
|---|---|---|---|
| HfO₂ phase | monoclinic and cubic | monoclinic (P2₁/c) | cubic, after Sharia et al. [@Sharia2007] |
| Code | Quantum ESPRESSO | SIESTA | not given in the review |
| Functional | LDA: Ceperley–Alder, Perdew–Zunger parametrization | LDA: Ceperley–Alder | LDA |
| Basis and pseudopotentials | plane waves, ultrasoft, Garrity–Bennett–Rabe–Vanderbilt (GBRV) LDA library | double-zeta polarized atomic orbitals, Troullier–Martins norm-conserving | not given in the review |
| Cutoff | 40 / 200 Ry | mesh cutoff of at least 100 Ha | not given in the review |
| k-points | 4×4×1 for both superlattices, as Sharia et al.; 3.5 points per Å⁻¹ for the bulks: 5×5×3 SiO₂, 5×5×5 HfO₂ | not given | not given in the review; Sharia et al.: 4×4×1 for the interface, 8×8×8 for the bulks |
| Cell | monoclinic: 10 + 7 layers, Hf₁₄Si₁₀O₄₈; cubic: 12 + 6 layers, Hf₁₂Si₁₂O₄₈; 72 atoms each, 5.2317 × 5.2317 Å² | seven HfO₂ layers, ten SiO₂ tetrahedra, 5.23 × 5.23 Å² | 4 O per HfO₂ layer, 2 per SiO₂ layer, 3 in the interface plane |
| Lattice | the Standata structures, HfO₂ strained in plane onto SiO₂ | LDA lattices, HfO₂ stretched by 3.7 % along [100] and 2.1 % along [010] | not given in the review |
| Positions | MACE-MP-0, trained on Perdew–Burke–Ernzerhof (PBE) data, fixed cell: monoclinic annealed from 1000 K to 100 K in 1 ps, then both relaxed to 0.07 eV/Å; the cation layer on each side of an interface and the atoms between them move, the block interiors stay at the bulk crystals | LDA: anneal from 1000 K to 100 K in 1 ps, then conjugate gradient to 0.07 eV/Å | LDA, relaxed |
| Offset | potential lineup: V̄ of each bulk the mean of its planar-averaged electrostatic potential; V̄ in the superlattice at each block's centre, from the planar average smoothed by a double convolution with the two bulks' (001) layer spacings | potential lineup, planar average smoothed by a double convolution | local densities of states of HfO₂ and SiO₂ layers away from the interface |
| Band-edge corrections | not computed | G0W0 corrections to the bulk band edges, listed separately in Table I | not given in the review |

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the notebook:

```
other/materials_designer/specific_examples/interface_3d_3d_silicon_dioxide_hafnium_dioxide_SIMULATION.ipynb
```

### 5.2. Configure parameters

Cells 1.2-1.5 set the material names, the compute resources, the DFT model, and the anneal and relaxation:

```python
# Names saved by interface_3d_3d_silicon_dioxide_hafnium_dioxide.ipynb.
MONOCLINIC_SUPERLATTICE_NAME = "SiO2/HfO2 monoclinic (001) superlattice 10+7"
CUBIC_SUPERLATTICE_NAME = "SiO2/HfO2 cubic (001) superlattice 12+6"
SUBSTRATE_BULK_NAME = "SiO2 beta-cristobalite (001) bulk"
MONOCLINIC_FILM_BULK_NAME = "HfO2 monoclinic (001) bulk strained"
CUBIC_FILM_BULK_NAME = "HfO2 cubic (001) bulk strained"

FILM_BULK_NAME_BY_SUPERLATTICE_NAME = {
    MONOCLINIC_SUPERLATTICE_NAME: MONOCLINIC_FILM_BULK_NAME,
    CUBIC_SUPERLATTICE_NAME: CUBIC_FILM_BULK_NAME,
}
ANNEALED_SUPERLATTICE_NAMES = [MONOCLINIC_SUPERLATTICE_NAME]  # annealed before the relaxation, as Prodhomme et al.

ORGANIZATION_NAME = None  # set to your organization name (full or partial); otherwise, your default one is used

CLUSTER_NAME = None  # specify full or partial name i.e. "cluster-001" to select
QUEUE_NAME = QueueName.OR
PPN = 16  # the OR queue allows at most 16 cores per node
TIME_LIMIT = "04:00:00"

MODEL_SUBTYPE = "lda"
FUNCTIONAL = "pz"  # both publications use LDA
PSEUDOPOTENTIAL_TYPE = "us"  # GBRV ultrasoft, the LDA family the platform publishes for Hf, Si and O
BLOCK_LABEL = {SUBSTRATE_BULK_NAME: "SiO₂", MONOCLINIC_FILM_BULK_NAME: "monoclinic HfO₂", CUBIC_FILM_BULK_NAME: "cubic HfO₂"}
BLOCK_CATION = {SUBSTRATE_BULK_NAME: "Si", MONOCLINIC_FILM_BULK_NAME: "Hf", CUBIC_FILM_BULK_NAME: "Hf"}  # marks each block
CATIONS_PER_LAYER = {"Si": 1, "Hf": 2}  # per (001) layer of the 5.23 Å cell, one period of the planar-averaged potential
ECUTWFC = 40   # Ry, GBRV's recommended wavefunction cutoff
ECUTRHO = 200  # Ry, GBRV's recommended charge-density cutoff
ADDITIONAL_PARAMETERS = {
    # Hf, the third species of the superlattices: its GBRV atomic density holds 10 of its 12 valence electrons;
    # scaled by (12 + 2.4) / 12, the starting density is neutral in both blocks
    "system": {"starting_charge(3)": -2.4},
    "electrons": {"mixing_mode": "local-TF", "mixing_beta": 0.2, "mixing_ndim": 20, "electron_maxstep": 200},  # the long cells need local-TF mixing with a long history to converge
}
KPOINT_DENSITY = 3.5  # points per Å⁻¹, for the bulks
SUPERLATTICE_KGRID = [4, 4, 1]  # Sharia et al.

MACE_MODEL_FAMILY = "MACE-MP-0"
MACE_MODEL = "large"
MACE_DISPERSION = False
MACE_DEFAULT_DTYPE = "float32"
MACE_DEVICE = "cpu"

ANNEAL_START_TEMPERATURE = 1000  # K
ANNEAL_END_TEMPERATURE = 100  # K
ANNEAL_DURATION = 1000  # fs
ANNEAL_TIMESTEP = 1  # fs
ANNEAL_FRICTION = 0.01  # 1/fs, Langevin thermostat
ANNEAL_SEED = 42  # initial velocities and thermostat noise
ANNEAL_LOG_INTERVAL = 100  # steps
RELAXATION_FORCE_THRESHOLD = 0.07  # eV/Å, the force threshold of Prodhomme et al.
INTERFACE_CATION_LAYERS = 1  # on each side of an interface; these and the atoms between them move, all others are fixed
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Analyze results

Section 3 of the notebook prints the composition and the cell of the five materials, and the (001) layer spacing of
each bulk:

```
SiO2/HfO2 monoclinic (001) superlattice 10+7: {'Si': 10, 'O': 48, 'Hf': 14}, 72 atoms, cell 5.2317 x 5.2317 x 37.4201 Å
SiO2/HfO2 cubic (001) superlattice 12+6: {'Si': 12, 'O': 48, 'Hf': 12}, 72 atoms, cell 5.2317 x 5.2317 x 37.1865 Å
SiO2 beta-cristobalite (001) bulk: {'Si': 4, 'O': 8}, 12 atoms, cell 5.2317 x 5.2317 x 7.3987 Å
  (001) layer spacing: 1.8497 Å
HfO2 monoclinic (001) bulk strained: {'Hf': 4, 'O': 8}, 12 atoms, cell 5.2317 x 5.2317 x 5.3287 Å
  (001) layer spacing: 2.6251 Å
HfO2 cubic (001) bulk strained: {'Hf': 4, 'O': 8}, 12 atoms, cell 5.2317 x 5.2317 x 5.0322 Å
  (001) layer spacing: 2.5161 Å
```

The (001) layer spacings are the widths of the double convolution in the superlattice, one period of the potential in
each block. Section 10.1 reads the offset of each superlattice from the valence band offset property its job stores,
and section 10.2 plots the potential across both superlattices with the bulk potentials overlaid.

The last cell prints, for each model, the manuscript's value and then the value of this calculation:

```
VBO, SiO₂/HfO₂ (monoclinic HfO₂): Prodhomme 2011 +0.4 eV | ours +0.69 eV
VBO, SiO₂/HfO₂ (cubic HfO₂): Robertson and Wallace 2015 -0.67 eV | ours -0.35 eV
```

## 6. Expected results

Table I of Prodhomme et al. lists the valence band offset (VBO) VBO(LDA) = +0.4 eV for SiO₂/HfO₂, the valence band of SiO₂ above that of HfO₂;
their Fig. 1(b) marks it as 0.40 eV. The same table lists −1.0 eV after their G0W0 corrections, which are not
computed here. Fig. 57a of Robertson and Wallace gives −0.67 eV for the undoped interface, the "Hf" point, read off
the figure: the valence band of HfO₂ above that of SiO₂.

### 6.1. Comparison with published results

| Model | Manuscript | ΔE_v, manuscript (eV) | ΔE_v, this tutorial (eV) |
|---|---|---|---|
| monoclinic HfO₂ | Prodhomme et al., Table I | +0.4 | +0.69 |
| cubic HfO₂ | Robertson and Wallace, Fig. 57a | −0.67 | −0.35 |

Fig. 1(b) of Prodhomme et al. shows the potential across their monoclinic superlattice, SiO₂ on the left (black),
and its double-convolution average (red); the arrows mark each bulk's valence band maximum against its averaged
potential and the offset. Section 10.2 of the notebook draws the monoclinic superlattice of this tutorial in the same
orientation, below it: one period from the HfO₂→SiO₂ interface, the planar average (black), each bulk's own potential
(dotted) shifted onto its block, and the two block averages over one (001) layer (dashed):

![Potential across the SiO2/HfO2 superlattice with monoclinic HfO2: Prodhomme et al. 2011 and this work](../../../images/tutorials/materials/interfaces/interface_3d_3d_silicon_dioxide_hafnium_dioxide/2-monoclinic-potential-comparison.webp "Electrostatic potential across the SiO2/HfO2 superlattice with monoclinic HfO2: Prodhomme et al. 2011, Fig. 1(b) (top), and this notebook (bottom)")

The cubic superlattice, drawn the same way:

![Potential across the SiO2/HfO2 superlattice with cubic HfO2, this work](../../../images/tutorials/materials/interfaces/interface_3d_3d_silicon_dioxide_hafnium_dioxide/3-cubic-potential-this-notebook.webp "Electrostatic potential across the SiO2/HfO2 superlattice with cubic HfO2, this notebook")

## 7. Customization options

### 7.1. Adjust computational resources

`CLUSTER_NAME` selects the cluster by its full or partial name; a name that is not available makes the notebook
stop and list the ones that are. Without a name, the first cluster of the account is used.

## 8. Troubleshooting

### 8.1. Material not found

If one of the five names is not found, run the
[SiO2/HfO2 (001) Superlattices](interface-3d-3d-silicon-dioxide-hafnium-dioxide.md) tutorial first. In JupyterLite,
save the five materials to the account from Materials Designer under those exact names; in a local Jupyter session,
check that the `uploads` folder holds them.

### 8.2. No cluster available

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to. A cluster has to be
available to the account before the notebook can run.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook calculates the valence band offsets. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_3d_3d_silicon_dioxide_hafnium_dioxide_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
