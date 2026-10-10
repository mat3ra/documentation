---
tags:
  - defects
  - island
  - surface
  - adatom
  - TiN
  - machine-learned force field
  - MACE
  - D-2D-ADA

hide:
  - tags
# YAML header
render_macros: true
---

# Ti Adatom Descent on a 5×5 TiN Island (MACE)

## 1. Introduction

This tutorial relaxes a Ti adatom at three sites on and next to a 5×5-atom island on TiN(001) and compares the energies with those of the following manuscript:

!!!note "Manuscript"
    **D. G. Sangiovanni, A. B. Mei, D. Edström, L. Hultman, V. Chirita, I. Petrov, and J. E. Greene**,
    "Effects of surface vibrations on interlayer mass transport: Ab initio molecular dynamics investigation of Ti adatom descent pathways and rates from TiN/TiN(001) islands", Physical Review B, 2018. [DOI: 10.1103/PhysRevB.97.035406](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.97.035406){:target='_blank'}. [@Sangiovanni2018]

This tutorial builds upon the [Ti Adatom on a 5×5 TiN Island](defect-point-adatom-island-titanium-nitride.md) tutorial, where the manuscript's 458-atom cell is created with the adatom at each site. The sites are labelled as in Fig. 6 of the manuscript: **a**, the fourfold hollow (FFH) on the island next to its edge; **c**, atop the N edge atom; **i**, atop the N terrace atom in front of the edge, the site that extends the island.

The figure below shows the descent path from the manuscript (Figure 6), the energies of states a to i above and the trajectory of the adatom below:

![Ti adatom descent from the 5×5 island edge](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/1-figure-6-from-manuscript.webp "Ti adatom descent from a 5×5 TiN/TiN(001) island from Sangiovanni et al. 2018, Figure 6")

The manuscript calculates these energies with Density Functional Theory (DFT). This tutorial uses the MACE-MP-0 machine-learned force field; Section 4 lists the settings.


## 2. Prerequisites

The notebook loads four materials from the `uploads` folder by exact name and raises a `KeyError` when one is missing: `TiN(001) 12x12x3 island 5x5`, the island cell without the adatom, and the three cells with the adatom at a, c and i. All four are created and saved by `defect_point_adatom_island_titanium_nitride.ipynb`, the notebook of the [Ti Adatom on a 5×5 TiN Island](defect-point-adatom-island-titanium-nitride.md) tutorial, which should be run first. No platform account is needed: every calculation runs in the notebook's own kernel.


## 3. Workflow overview

The adsorption energy at a follows Eq. (4) of the manuscript:

`E_ads(a) = E(slab + island + Ti at a) − E(slab + island) − E_Ti`

where `E_Ti` is the energy of an isolated Ti atom. The energies of c and i are taken relative to a, as on the vertical axis of Fig. 6. The steps are:

1. **Set up the environment and parameters**: install packages (JupyterLite only), material names, force field and relaxation parameters
2. **Load the materials**: the island cell and the three adatom cells from the `uploads` folder
3. **Build the MACE calculator**: from the settings in cell 1.3
4. **Relax the island cell**: then measure the island contraction and the surface ripple
5. **Relax the adatom at a, c and i**: one relaxation per site, starting from the placed site
6. **Calculate the energy of an isolated Ti atom**: the reference of the adsorption energy
7. **Compare with the manuscript**: energies relative to a, the adsorption energy at a, and the Fig. 6 plot


## 4. Calculation parameters

### 4.1. Force field and relaxation

Cell 1.3 sets the force field and the relaxation:

```python
FOLDER = "./uploads"

MACE_MODEL_FAMILY = "MACE-MP-0"
MACE_MODEL = "large"
MACE_DISPERSION = True
MACE_DEFAULT_DTYPE = "float64"
MACE_DEVICE = "cpu"

FMAX = 0.02  # eV/Å
MAX_STEPS = 1000
```

Every relaxation uses the [Broyden–Fletcher–Goldfarb–Shanno (BFGS) optimizer](https://wiki.fysik.dtu.dk/ase/ase/optimize.html){:target='_blank'} of the Atomic Simulation Environment (ASE) with every atom free, and stops when the largest force falls below `FMAX`. The isolated Ti atom is one Ti site at the centre of an otherwise empty cell the size of the island cell, calculated with the same calculator.

### 4.2. Method compared with the manuscript

The manuscript uses DFT with the Generalized Gradient Approximation (GGA) in the Vienna Ab initio Simulation Package (VASP), on the same cell; the site spacing here, from Standata's `mp-492`, is 2.121 Å against the manuscript's nearest-neighbour distance of 2.127 Å (Sec. II.A). This tutorial uses the [MACE-MP-0](https://github.com/ACEsuit/mace){:target='_blank'} large model with the D3 dispersion correction, in double precision (`float64`) on the CPU. Every value in Section 6 is MACE beside DFT (GGA). The manuscript cites its isolated Ti atom energy (−2.275 eV); this tutorial calculates its own. Sec. II.B of the manuscript pre-optimizes the atop-N-edge configuration (c) with the adatom's relaxation constrained along [001]; this notebook relaxes c with every atom free.

### 4.3. Dispersion and run time

In JupyterLite, the install and calculator cells run, but the first relaxation exceeds the browser's memory: the first force call on the 457-atom cell fails with `can't allocate memory: you tried to allocate 763723776 bytes`, a 0.76 GB tensor. The JupyterLite bundle also carries no `torch-dftd`, so D3 is off in the browser.

The four relaxations, on 457 and 458 atoms, run natively, with `mace-torch` and `torch-dftd` installed. The values in Section 6 are from such a run.


## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the simulation notebook:

```
other/materials_designer/specific_examples/defect_point_adatom_island_titanium_nitride_SIMULATION.ipynb
```

### 5.2. Set the material names

Cell 1.2 names the materials the notebook loads:

```python
# Names saved by defect_point_adatom_island_titanium_nitride.ipynb.
ISLAND_MATERIAL_NAME = "TiN(001) 12x12x3 island 5x5"
ADATOM_MATERIAL_NAMES = {
    "a": "TiN(001) 12x12x3 island 5x5 + Ti a (FFH island)",
    "c": "TiN(001) 12x12x3 island 5x5 + Ti c (atop-N edge)",
    "i": "TiN(001) 12x12x3 island 5x5 + Ti i (atop-N terrace)",
}
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All Cells*. The notebook then:

1. Loads the four materials and prints their atom counts
2. Builds the MACE calculator
3. Relaxes the island cell and prints the island contraction and the ripple
4. Relaxes the adatom at a, c and i, and prints each energy and the adatom's displacement from its site
5. Calculates the energy of an isolated Ti atom
6. Prints the comparison with the manuscript and plots Fig. 6

### 5.4. Monitor progress

Each relaxation prints one line per BFGS step: the step, the time, the energy, and the largest force. In the run of Section 6, each relaxation took 24 to 33 steps.

### 5.5. Read the results

Section 7.1 of the notebook prints this notebook's values beside the manuscript's: the energies of c and i relative to a, the adsorption energy at a, the isolated Ti atom energy, the island contraction, and the ripple. Section 7.2 plots the manuscript's states a to i of Fig. 6 (upper panel) as a line, with this notebook's a, c and i as markers on the same axes.


## 6. Expected results

A native run with the default parameters and D3 gives the values below, each beside the manuscript's value and its source:

| Quantity | This notebook | Manuscript |
| --- | --- | --- |
| E(c) − E(a) | 0.321 eV | −0.15 ± 0.02 eV (Fig. 6, read off the axis) |
| E(i) − E(a) | −2.252 eV | −2.65 ± 0.05 eV (Fig. 6, read off the axis) |
| E_ads(a) | −3.019 eV | −2.81 eV (Sec. III.A ¶8) |
| E_Ti, isolated atom | −3.889 eV | −2.275 eV (Sec. II.B) |
| Ti–Ti spacing along the island diagonals | −4.9 % of bulk | −6.8 % (Sec. III.A, p. 10) |
| Ti–N spacing along the island medians | −3.5 % of bulk | −5.2 % (Sec. III.A, p. 10) |
| Surface ripple, N above Ti | 0.067 Å | 0.19 Å (Sec. III.A, p. 8) |

| | a | c | i |
| --- | --- | --- | --- |
| As built | ![Site a, as built](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/3-site-a-as-built.webp "Ti adatom at site a, as built") | ![Site c, as built](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/3-site-c-as-built.webp "Ti adatom at site c, as built") | ![Site i, as built](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/3-site-i-as-built.webp "Ti adatom at site i, as built") |
| Relaxed | ![Site a, relaxed](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/3-site-a-relaxed.webp "Ti adatom at site a, relaxed") | ![Site c, relaxed](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/3-site-c-relaxed.webp "Ti adatom at site c, relaxed") | ![Site i, relaxed](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/3-site-i-relaxed.webp "Ti adatom at site i, relaxed") |

Each panel shows a top view of the island region and a side view along the island edge, with the island on the left and the terrace on the right; the Ti adatom is orange.

Relaxed a → c → i

<img data-gifffer="/images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/4-descent-a-c-i.gif" alt="Relaxed a → c → i" />

a: as built → relaxed

<img data-gifffer="/images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/4-site-a.gif" alt="a: as built → relaxed" />

Section 7.2 of the notebook draws this notebook's a, c and i on the manuscript's states a to i:

![Fig. 6 with this notebook's energies](../../../images/tutorials/materials/defects/defect-point-adatom-island-titanium-nitride/2-result-fig6-this-notebook.webp "Energies of a, c and i from this notebook beside Figure 6 of Sangiovanni et al. 2018")


## 7. Customization options

### 7.1. Change the force field model

`MACE_MODEL_FAMILY`, `MACE_MODEL`, and `MACE_DEFAULT_DTYPE` in cell 1.3 select the model. Setting `MACE_DISPERSION = False` gives MACE without D3 in a native run as well.

### 7.2. Change the relaxation threshold

`FMAX` in cell 1.3 is the force threshold in eV/Å, and `MAX_STEPS` caps the number of BFGS steps of each relaxation.


## 8. Troubleshooting

### 8.1. Material not found

Section 2 of the notebook raises a `KeyError` naming the material when one of the four names in cell 1.2 is missing from the `uploads` folder. Re-run `defect_point_adatom_island_titanium_nitride.ipynb`, the notebook of the [structure tutorial](defect-point-adatom-island-titanium-nitride.md), in the same environment; it saves the four materials under the names in cell 1.2.

### 8.2. MACE is not installed

In JupyterLite, cell 1.1 installs MACE; it has to run before any other cell. Natively it installs nothing and prints ``To install packages, run `pip install ".[all]"` in the terminal``; that extra does not include MACE. The native install is `pip install ".[all]" mace-torch torch-dftd`, followed by a kernel restart.

### 8.3. The run is without dispersion

When Section 3 of the notebook prints `torch-dftd is not available here: MACE runs WITHOUT the D3 dispersion correction.`, every energy is MACE alone and differs from Section 6. This is the case in every JupyterLite run (Section 4.3). The values of Section 6 need a native kernel with `torch-dftd` installed.

### 8.4. The relaxations take long

Every BFGS step evaluates MACE on 457 or 458 atoms, and the notebook runs four relaxations; in JupyterLite the first one stops on the browser's memory limit (Section 4.3).


## 9. Interactive JupyterLite notebook

The following JupyterLite notebook relaxes the Ti adatom at a, c and i and compares the energies with the manuscript. In the browser, the install and calculator cells run and the relaxations do not (Section 4.3).

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_adatom_island_titanium_nitride_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 10. References
