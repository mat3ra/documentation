---
tags:
  - 3D
  - interface
  - superlattice
  - high-k
  - metal-gate
  - Si
  - SiO2
  - HfO2
  - TiN
  - valence-band-offset
  - C-2D-HST

hide:
  - tags
# YAML header
render_macros: true
---

# High-k Metal Gate Stack: Si/SiO2, SiO2/HfO2 and HfO2/TiN Valence Band Offsets

## 1. Introduction

This tutorial calculates the valence band offsets (VBO) ΔE_v at the interfaces of the Si/SiO₂/HfO₂/TiN high-k metal
gate stack, reproducing the results of the following manuscripts:

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
[High-k Metal Gate Stack](heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride.md) tutorial, where
the interface superlattices and their bulk cells are created. Here, the notebook anneals and relaxes the superlattices
with the MACE-MP-0 machine-learned force field, and the platform's Valence Band Offset (Bulk Method) workflow runs
Quantum ESPRESSO on each relaxed superlattice and its two bulk cells. The offset is assembled by the
[potential lineup](../../dft/electronic/valence-band-offset.md) [@VanDeWalle1986]: each bulk's valence band maximum
E_VBM is measured from its own average potential V̄, and the superlattice gives the step in V̄ between the two materials,

```
ΔE_v = (E_VBM − V̄)_left − (E_VBM − V̄)_right + (V̄_left − V̄_right)_superlattice
```

The left material is the one nearer Si in the stack, and ΔE_v is positive when its valence band maximum lies above that
of the right one, the sign convention of both manuscripts. In HfO₂/TiN the right material is a metal: the Valence Band
Offset (Bulk Method, Metal) workflow takes the Fermi energy of TiN in place of its E_VBM. The three offsets of Prodhomme
et al. add up to the offset between Si and the Fermi level of TiN (their Eq. 3), and with the electron affinity and the
band gap of Si to the effective work function of TiN on the stack (their Eq. 2).

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [High-k Metal Gate Stack](heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride.md)
   tutorial, using the `heterostructure_silicon_silicon_dioxide_hafnium_dioxide_titanium_nitride.ipynb` notebook
   embedded in its section 8, to create and save the four superlattices and six bulk cells named in section 5.2, OR
2. Have the ten materials saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure the material names, the Density Functional Theory (DFT)
   model, compute, the anneal and relaxation, and the values of the manuscripts
2. **Authenticate and initialize API client**: Connect to the platform, select the account and project
3. **Load materials**: Import the superlattices and the bulks by name, print their composition and cell
4. **Configure the model and k-grids**: One DFT model, a k-grid per material
5. **Configure compute resources**: Select the cluster, create a compute configuration per superlattice
6. **Anneal the superlattices of Prodhomme et al.**: Molecular dynamics on the MACE-MP-0 force field, from 1000 K to
   100 K in 1 ps, as in the manuscript
7. **Relax the superlattices**: Atomic positions at fixed cell on the same force field, to 0.07 eV/Å
8. **Configure the workflows**: One valence band offset workflow per superlattice, with the model and a k-grid per
   material
9. **Run the jobs**: One job per superlattice; a job that already ran on the same three materials is reused
10. **Retrieve results**: The offset of each superlattice, and the potential across it
11. **Compare with the manuscripts**: Print each offset beside its manuscript's value, then the offset between Si and
    TiN and the effective work function

## 4. Calculation parameters

A dash marks a setting the publication does not give.

| | this tutorial | Prodhomme et al. | Robertson and Wallace (review) |
|---|---|---|---|
| Interfaces | Si/SiO₂ (oxygen-rich), SiO₂/HfO₂ with monoclinic and with cubic HfO₂, HfO₂/TiN (nitridized) | Si/SiO₂ (oxygen-rich and oxygen-poor), SiO₂/HfO₂ with monoclinic HfO₂, HfO₂/TiN (nitridized and oxidized) | SiO₂/HfO₂ with cubic HfO₂, after Sharia et al. [@Sharia2007] |
| Code | Quantum ESPRESSO | SIESTA | — |
| Functional | local density approximation (LDA): Ceperley–Alder, Perdew–Zunger parametrization | LDA: Ceperley–Alder | LDA |
| Basis and pseudopotentials | plane waves, ultrasoft, Garrity–Bennett–Rabe–Vanderbilt (GBRV) LDA library | double-zeta polarized atomic orbitals, Troullier–Martins norm-conserving | — |
| Cutoff | 40 / 200 Ry | mesh cutoff of at least 100 Ha | — |
| Smearing | HfO₂/TiN: Marzari–Vanderbilt, 0.01 Ry | — | — |
| k-points | 4×4×1 for the superlattices on the 5.23 Å cell, the mesh of Sharia et al., 4×2×1 for HfO₂/TiN; 3.5 points per Å⁻¹ for the bulks | — | —; Sharia et al.: 4×4×1 for their 5.19 Å interface cell, 8×8×8 for the bulks |
| Cell | 72 to 248 atoms, periodic along the normal, as built | periodic superlattices | 4 O per HfO₂ layer, 2 per SiO₂ layer, 3 in the interface plane |
| Lattice | the Standata structures, strained in plane onto SiO₂ (TiN onto HfO₂) | —; strained in plane onto SiO₂ (TiN onto HfO₂) | — |
| Positions | MACE-MP-0, trained on Perdew–Burke–Ernzerhof (PBE) data, fixed cell: the superlattices of Prodhomme et al. annealed from 1000 K to 100 K in 1 ps, then all relaxed to 0.07 eV/Å; the cation layer on each side of an interface and the atoms between them move | LDA: anneal from 1000 K to 100 K in 1 ps, then conjugate gradient to 0.07 eV/Å | LDA, relaxed |
| Offset | potential lineup: V̄ of each bulk the mean of its electrostatic potential over its cell; V̄ in the superlattice at each block's centre, over one bulk cell | potential lineup, planar average smoothed by a double convolution | local densities of states of HfO₂ and SiO₂ layers away from the interface |
| Band-edge corrections | not computed | corrections to the bulk band edges in the first-order GW approximation (G0W0), listed separately in Table I | — |

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the notebook:

```
other/materials_designer/specific_examples/heterostructure_silicon_silicon_dioxide_hafnium_dioxide_titanium_nitride_SIMULATION.ipynb
```

### 5.2. Configure parameters

Cells 1.2-1.5 set the material names, the compute resources, the DFT model and k-grids, and the anneal and relaxation.
Among them:

```python
# Names saved by heterostructure_silicon_silicon_dioxide_hafnium_dioxide_titanium_nitride.ipynb
SILICON_SUPERLATTICE_NAME = "Si/SiO2 (001) superlattice 18+12 O-rich"
MONOCLINIC_SUPERLATTICE_NAME = "SiO2/HfO2 monoclinic (001) superlattice 10+7"
CUBIC_SUPERLATTICE_NAME = "SiO2/HfO2 cubic (001) superlattice 12+6"
TITANIUM_NITRIDE_SUPERLATTICE_NAME = "HfO2/TiN superlattice 6+1+6 nitridized"
SILICON_BULK_NAME = "Si (001) bulk strained"
SILICON_DIOXIDE_BULK_NAME = "SiO2 beta-cristobalite (001) bulk"
MONOCLINIC_BULK_NAME = "HfO2 monoclinic (001) bulk strained"
CUBIC_BULK_NAME = "HfO2 cubic (001) bulk strained"
HAFNIUM_DIOXIDE_BULK_NAME = "HfO2 monoclinic (001) bulk 3x1"
TITANIUM_NITRIDE_BULK_NAME = "TiN (111) bulk strained"

BULK_NAMES_BY_SUPERLATTICE_NAME = {  # left, right: the left material is nearer Si in the stack
    SILICON_SUPERLATTICE_NAME: (SILICON_BULK_NAME, SILICON_DIOXIDE_BULK_NAME),
    MONOCLINIC_SUPERLATTICE_NAME: (SILICON_DIOXIDE_BULK_NAME, MONOCLINIC_BULK_NAME),
    CUBIC_SUPERLATTICE_NAME: (SILICON_DIOXIDE_BULK_NAME, CUBIC_BULK_NAME),
    TITANIUM_NITRIDE_SUPERLATTICE_NAME: (HAFNIUM_DIOXIDE_BULK_NAME, TITANIUM_NITRIDE_BULK_NAME),
}

ORGANIZATION_NAME = None  # set to your organization name (full or partial); None uses your default one

CLUSTER_NAME = None  # full or partial name
QUEUE_NAME = QueueName.OF

MODEL_SUBTYPE = "lda"
FUNCTIONAL = "pz"  # both publications use LDA
PSEUDOPOTENTIAL_TYPE = "us"  # GBRV ultrasoft, the LDA family the platform publishes for Si, O, Hf, Ti and N
ECUTWFC = 40  # Ry, GBRV's recommended wavefunction cutoff
ECUTRHO = 200  # Ry, GBRV's recommended charge-density cutoff
SMEARING = "mv"  # Marzari-Vanderbilt, for the metal
DEGAUSS = 0.01  # Ry
KPOINT_DENSITY = 3.5  # points per Å⁻¹, for the bulks
KGRID_BY_SUPERLATTICE_NAME = {  # Sharia et al.'s 4 x 4 x 1 mesh (their cell: 5.19 Å); the same spacing on HfO2/TiN
    SILICON_SUPERLATTICE_NAME: [4, 4, 1],
    MONOCLINIC_SUPERLATTICE_NAME: [4, 4, 1],
    CUBIC_SUPERLATTICE_NAME: [4, 4, 1],
    TITANIUM_NITRIDE_SUPERLATTICE_NAME: [4, 2, 1],
}

ANNEAL_START_TEMPERATURE = 1000  # K
ANNEAL_END_TEMPERATURE = 100  # K
ANNEAL_DURATION = 1000  # fs
RELAXATION_FORCE_THRESHOLD = 0.07  # eV/Å, the force threshold of Prodhomme et al.
INTERFACE_CATION_LAYERS = 1  # on each side of an interface; these and the atoms between them move, all others are fixed
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Analyze results

Section 10.1 of the notebook reads the offset of each superlattice from the valence band offset property its job
stores, and section 10.2 plots the potential across each superlattice. Section 11 prints, for each interface, the
manuscript's value and then the value of this calculation:

```
VBO, Si/SiO₂ (O-rich): Prodhomme 2011 +3.0 eV | ours +3.52 eV
VBO, SiO₂/HfO₂ (monoclinic HfO₂): Prodhomme 2011 +0.4 eV | ours +0.77 eV
VBO, SiO₂/HfO₂ (cubic HfO₂): Robertson and Wallace 2015 -0.67 eV | ours -0.42 eV
```

## 6. Expected results

Table I of Prodhomme et al. lists the offsets of each interface in LDA, VBO(LDA), and after their G0W0 corrections,
which are not computed here: +3.0 eV for oxygen-rich Si/SiO₂ and +0.4 eV for SiO₂/HfO₂:

![Table I of Prodhomme et al. 2011](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/4-table-i-from-manuscript.webp "Table I of Prodhomme et al. 2011: valence and conduction band offsets and the effective work function")

Fig. 57a of Robertson and Wallace gives −0.67 eV for the undoped SiO₂/HfO₂ interface, the "Hf" point, read off the
figure; the other points are interfaces with dopants:

![Fig. 57a of Robertson and Wallace 2015](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/5-figure-57a-from-manuscript.webp "Robertson and Wallace 2015, Fig. 57a: calculated valence band offset against the experimental flat band voltage shift")

### 6.1. Comparison with published results

| Interface | Source | ΔE_v, manuscript (eV) | ΔE_v, this tutorial (eV) |
|---|---|---|---|
| Si/SiO₂ (oxygen-rich) | Prodhomme et al., Table I | +3.0 | +3.52 |
| SiO₂/HfO₂ (monoclinic HfO₂) | Prodhomme et al., Table I | +0.4 | +0.77 |
| SiO₂/HfO₂ (cubic HfO₂) | Robertson and Wallace, Fig. 57a | −0.67 | −0.42 |

Section 10.2 of the notebook draws, for each superlattice, the planar average of the electrostatic potential along the
interface normal (black) and its macroscopic average (red), as the workflow stores them, from the bottom of the cell;
the offset is in the title. The offset uses the red curve averaged over a window as tall as each bulk's cell, centred
on its block. The Si/SiO₂ superlattice, SiO₂ on the left of the plot:

![Potential across the Si/SiO2 superlattice, this tutorial](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/6-si-sio2-potential-this-notebook.webp "Electrostatic potential across the Si/SiO2 (001) superlattice, oxygen-rich, this tutorial")

Fig. 1(b) of Prodhomme et al. shows the potential across their monoclinic SiO₂/HfO₂ superlattice (black) and its
average smoothed by a double convolution (red); the arrows mark each bulk's valence band maximum against its averaged
potential and the offset. Below it, the monoclinic superlattice of this tutorial, SiO₂ on the left as in the
manuscript, drawn at the same length scale with both axes starting at the same point (manuscript in bohr,
67 bohr ≈ 35.5 Å; this tutorial in Å):

![Potential across the SiO2/HfO2 superlattice with monoclinic HfO2: Prodhomme et al. 2011 and this tutorial](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/7-sio2-hfo2-monoclinic-potential-comparison.webp "Electrostatic potential across the SiO2/HfO2 superlattice with monoclinic HfO2: Prodhomme et al. 2011, Fig. 1(b) (top), and this tutorial (bottom)")

The cubic superlattice:

![Potential across the SiO2/HfO2 superlattice with cubic HfO2, this tutorial](../../../images/tutorials/materials/heterostructures/heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride/8-sio2-hfo2-cubic-potential-this-notebook.webp "Electrostatic potential across the SiO2/HfO2 superlattice with cubic HfO2, this tutorial")

## 7. Customization options

### 7.1. Adjust computational resources

The default, `CLUSTER_NAME = None`, uses the account's first listed cluster; setting a specific name picks that cluster
instead, and a name that is not available makes the notebook stop and list the ones that are.

## 8. Troubleshooting

### 8.1. Material not found

If one of the ten names is not found, run the
[High-k Metal Gate Stack](heterostructure-silicon-silicon-dioxide-hafnium-dioxide-titanium-nitride.md) tutorial first.
In JupyterLite, save the ten materials to the account from Materials Designer under those exact names; in a local
Jupyter session, check that the `uploads` folder holds them.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook calculates the valence band offsets. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/heterostructure_silicon_silicon_dioxide_hafnium_dioxide_titanium_nitride_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
