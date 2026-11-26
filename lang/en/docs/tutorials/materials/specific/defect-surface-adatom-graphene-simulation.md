---
tags:
  - graphene
  - metal
  - adatoms
  - adsorption-energy
  - D-2D-ADA

hide:
  - tags
# YAML header
render_macros: true
---

# Adatom Surface Defects on Graphene (Adsorption Energy)

## 1. Introduction

This tutorial calculates adsorption energies of metal adatoms on graphene, reproducing results from the following manuscript:

!!!note "Manuscript"
    K. T. Chan, J. B. Neaton, and M. L. Cohen, "First-principles study of metal adatom adsorption on graphene",
    Phys. Rev. B 77, 235430 (2008).
    [DOI:10.1103/PhysRevB.77.235430](https://doi.org/10.1103/PhysRevB.77.235430){:target='_blank'}.
    [@Chan2008]

This tutorial builds upon the [Adatom on Graphene Surface](defect-surface-adatom-graphene.md) tutorial, where the
structures are created. Here, the adsorption energy is calculated using Quantum ESPRESSO with Eq. 1 of the manuscript,
ΔE = E_ag − E_a − E_g, from the energies of the adatom on the 4×4 graphene cell, the isolated atom and the clean 4×4
layer, and printed positive for a bound adatom, as Table I lists it, for Li on the hollow, bridge and top sites. The
adatom height h above the C plane, the nearest adatom–C distance d_AC and the total magnetization are compared with
Tables I and II.

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [Adatom on Graphene Surface](defect-surface-adatom-graphene.md) tutorial, using the
   `defect_surface_adatom_graphene.ipynb` notebook embedded in its section 5, to create and save `Graphene 4x4`
   (32 atoms) and the adatom cells (33 atoms each), such as `Li on graphene 4x4 hollow`, OR
2. Have the materials saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The adsorption energy calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure the cell names, the isolated-atom box, the model, and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the clean layer and the adatom cells, build one isolated atom per adatom element, print their compositions and cells, and save them with each adatom free to move along z only
4. **Configure the model**: One Density Functional Theory (DFT) model for every job
5. **Configure compute resources**: Select the cluster, queue, and processor settings
6. **Relax the clean layer and the adatom cells**: At fixed cell, on the 9×9×1 grid, with the dipole correction; read the total magnetization of each adatom cell
7. **Compute the isolated atoms**: One Total Energy job per element at the Γ point
8. **Retrieve results**: Eq. 1 for each adatom cell, the energy below the favored site, h and d_AC
9. **Compare with the manuscript**: Print the values beside those of Tables I and II

## 4. Calculation parameters

| | this tutorial | Chan, Neaton and Cohen |
|---|---|---|
| Code | Quantum ESPRESSO | Vienna Ab initio Simulation Package (VASP) |
| Functional | Perdew-Burke-Ernzerhof (PBE), no van der Waals correction | PBE, no van der Waals correction |
| Pseudopotentials | ultrasoft (GBRV) | projector augmented-wave (PAW) |
| Cutoff | 40 / 200 Ry | 500 eV |
| Cell | 4×4 graphene with one adatom, a = 2.465 Å (Standata; manuscript 2.47 Å); 32 and 33 atoms in one 9.86 × 9.86 × 15.00 Å cell | 4×4 graphene with one adatom, a = 2.47 Å; 9.88 Å in plane, 15 Å high |
| k-points | 9×9×1, Γ-centered; Γ for the isolated atoms | 9×9×1, Γ-centered; Γ for the isolated atom |
| Smearing | Gaussian, 0.05 eV | Gaussian, 0.05 eV |
| Dipole correction | along z, on the clean layer and the adatom cells | along z |
| Relaxation | adatom along z only, C in all directions, fixed cell, 0.05 eV/Å, at most 100 ionic steps | adatom along z only, C in all directions, fixed cell, 0.05 eV/Å |
| Spin, clean layer | not spin-polarized | spin-polarized |
| Spin, adatom cells | `nspin = 2`, starting magnetization 0.5 on the adatom | spin-polarized |
| Spin, isolated atoms | `nspin = 2`, total magnetization from Table II (Li, Na, K, Al, Ga, In, Au 1; Sn 2; Ti, Fe 4); Ca and Pd not spin-polarized | spin-polarized |
| Isolated-atom box | 14 Å cube | 14 Å cube |

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the adsorption energy notebook:

```
other/materials_designer/specific_examples/defect_surface_adatom_graphene_SIMULATION.ipynb
```

### 5.2. Configure parameters

Cell 1.2 sets the material names and the box of the isolated atoms. Only `Li on graphene 4x4 hollow` is active;
uncommenting a line of `ADATOM_CELL_NAMES` adds that cell, and the isolated atom of its element is built and computed
with it:

```python
# Names saved by defect_surface_adatom_graphene.ipynb; uncomment a line to add that adatom cell
# The Ca, Al, Ga, In, Ti, Fe and Au cells exist only after their rows are also uncommented in the structure notebook
CLEAN_LAYER_NAME = "Graphene 4x4"
ADATOM_CELL_NAMES = [
    "Li on graphene 4x4 hollow",
    # "Li on graphene 4x4 bridge",
    # "Li on graphene 4x4 top",
    # "Na on graphene 4x4 hollow",
    # "K on graphene 4x4 hollow",
    # "Ca on graphene 4x4 hollow",
    # "Al on graphene 4x4 hollow",
    # "Ga on graphene 4x4 hollow",
    # "In on graphene 4x4 hollow",
    # "Sn on graphene 4x4 top",
    # "Ti on graphene 4x4 hollow",
    # "Fe on graphene 4x4 hollow",
    # "Pd on graphene 4x4 bridge",
    # "Au on graphene 4x4 top",
]
ATOM_NAME = "{element} atom"
ATOM_BOX = 14.0  # Å, edge of the cubic box around each isolated atom, as in the manuscript
```

Cell 1.4 sets the DFT model; each comment names the manuscript's setting:

```python
# manuscript: VASP PAW at 500 eV; ours GBRV ultrasoft at its own converged 40/200 Ry
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry

SLAB_KGRID = [9, 9, 1]  # manuscript: 9x9x1 Γ-centered for the clean layer and the adatom cells
GAMMA_KGRID = [1, 1, 1]  # manuscript: Γ only for the isolated atoms
# manuscript: Gaussian, σ = 0.05 eV = 0.003675 Ry
SMEARING_SETTINGS = {"occupations": "smearing", "smearing": "gaussian", "degauss": 0.003675}
# manuscript: dipole correction along z; eamp = 0 keeps the sawtooth a correction, no external field
DIPOLE_SETTINGS = {"control": {"tefield": True, "dipfield": True}, "system": {"edir": 3, "eamp": 0.0, "eopreg": 0.05}}
# manuscript: forces below 0.05 eV/Å = 1.9e-3 Ry/Bohr, per force component;
# section 7.2 prints the force norm (all atoms)
RELAXATION_SETTINGS = {"forc_conv_thr": 1.9e-3, "nstep": 100}
# manuscript: the adatom relaxes along z only, the C atoms in all directions
ADATOM_CONSTRAINT = [False, False, True]
CARBON_CONSTRAINT = [True, True, True]
# manuscript: spin-polarized; the clean layer is non-magnetic and runs without spin.
# C is species 1 in the input and the adatom species 2, which starts with a magnetic moment.
ADATOM_SPIN_SETTINGS = {"nspin": 2, "starting_magnetization(2)": 0.5}
# Table II μ_A: total magnetization of each isolated atom in μB; Ca and Pd (μ_A = 0) run without spin
ATOM_SPIN_SETTINGS_BY_ELEMENT = {
    "Li": {"nspin": 2, "tot_magnetization": 1},
    "Na": {"nspin": 2, "tot_magnetization": 1},
    "K": {"nspin": 2, "tot_magnetization": 1},
    "Ca": {},
    "Al": {"nspin": 2, "tot_magnetization": 1},
    "Ga": {"nspin": 2, "tot_magnetization": 1},
    "In": {"nspin": 2, "tot_magnetization": 1},
    "Sn": {"nspin": 2, "tot_magnetization": 2},
    "Ti": {"nspin": 2, "tot_magnetization": 4},
    "Fe": {"nspin": 2, "tot_magnetization": 4},
    "Pd": {},
    "Au": {"nspin": 2, "tot_magnetization": 1},
}
MODEL_TAG = f"{FUNCTIONAL}-{PSEUDOPOTENTIAL_TYPE} {ECUTWFC}-{ECUTRHO}Ry g{SMEARING_SETTINGS['degauss']}"

SCF_UNIT = "pw_scf"
RELAX_UNIT = "pw_relax"
RELAX_OUTPUT_FILE = "pw_relax.out"
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu. The notebook first
[authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md), then runs the steps listed in section 3.

### 5.4. Monitor progress

The notebook polls the relaxations of the clean layer and the adatom cells, then the Total Energy jobs of the isolated
atoms.

### 5.5. Analyze results

The output comes in two groups: the residual force each relaxation ended with, one line per cell; then, one line per
adatom cell, the adsorption energy from Eq. 1, the energy below the favored site (E_max − ΔE), h, d_AC and the total
magnetization. Each quantity of the second group is printed twice: the notebook's own values first, then the same lines
headed "… from the manuscript" with the values of Tables I and II. E_max − ΔE is printed for Li on the bridge and top
sites when Li on the hollow site, the favored site in Table I, is active too; the default run, with the clean layer and
Li on the hollow site, prints the other four quantities:

```
Residual force after relaxation:
Graphene 4x4: 0.0004 eV/angstrom
Li on graphene 4x4 hollow: 0.0622 eV/angstrom

Adsorption energy:
Li on graphene 4x4 hollow: 1.057 eV

Adsorption energy from the manuscript:
Li on graphene 4x4 hollow: 1.096 eV

Adatom height above the C plane:
Li on graphene 4x4 hollow: 1.68 Å

Adatom height above the C plane from the manuscript:
Li on graphene 4x4 hollow: 1.71 Å

Nearest adatom–C distance:
Li on graphene 4x4 hollow: 2.21 Å

Nearest adatom–C distance from the manuscript:
Li on graphene 4x4 hollow: 2.23 Å

Total magnetization:
Li on graphene 4x4 hollow: 0.00 μB

Total magnetization from the manuscript:
Li on graphene 4x4 hollow: 0.00 μB
```

The residual force is Quantum ESPRESSO's total force, the norm over all atoms.

## 6. Expected results

### 6.1. Comparison with published results

| | ΔE (eV) | E_max − ΔE (eV) | h (Å) | d_AC (Å) | Total magnetization (μB) |
|---|---|---|---|---|---|
| Li, hollow, Chan Tables I and II | 1.096 | — | 1.71 | 2.23 | 0.00 |
| Li, hollow, this tutorial | 1.057 | — | 1.68 | 2.21 | 0.00 |
| Li, bridge, Chan Table I | 0.773 | 0.322 | 1.88 | 2.09 | — |
| Li, bridge, this tutorial | 0.732 | 0.325 | 1.86 | 2.06 | 0.00 |
| Li, top, Chan Table I | 0.754 | 0.342 | 1.89 | 2.02 | — |
| Li, top, this tutorial | 0.713 | 0.343 | 1.85 | 1.98 | 0.00 |

## 7. Customization options

### 7.1. Adjust the isolated-atom box and the relaxation threshold

`ATOM_BOX` in cell 1.2 is the edge of the cubic box around each isolated atom. A new box is a new material, so the
Total Energy jobs of the atoms run again. `RELAXATION_SETTINGS` in cell 1.4 holds the manuscript's force threshold,
0.05 eV/Å, and `nstep`, the largest number of ionic steps of each relaxation. A job is reused when one exists for the
same material, workflow name and k-point grid; the workflow names, `Relaxation <cell name>` and
`Total Energy <element> atom`, carry none of the settings of cell 1.4, so a change there applies to the materials
without a job.

### 7.2. Adjust computational resources

`QUEUE_NAME`, `PPN` and `TIME_LIMIT` in cell 1.3 set the queue, the cores and the time limit of every job. The default,
`CLUSTER_NAME = "001"`, picks the cluster whose name contains `001`; another name picks that cluster instead,
`CLUSTER_NAME = None` uses the account's first listed cluster, and a name that is not available makes the notebook stop
and list the ones that are.

### 7.3. Use the manuscript's settings

Apart from the code, the pseudopotentials, the cutoff and the lattice constant, section 4 follows the manuscript
wherever it states a setting; the clean layer without spin, the starting magnetization of the adatom, the total
magnetization of the isolated atoms set to Table II's values and the `nstep` bound are this tutorial's. In order to
match the manuscript's 2.47 Å instead of Standata's 2.465 Å, apply `create_strain` to graphene in the structure notebook
before the supercell is built, as in
[Graphene on h-BN](interface-2d-2d-graphene-boron-nitride.md#31-strain-the-materials). The manuscript's PAW potentials
are VASP's and cannot be matched. Quantum ESPRESSO's are selected with `PSEUDOPOTENTIAL_TYPE = "paw"`; neither they nor
a cutoff for them is tested here, and the manuscript's 500 eV does not transfer.

## 8. Troubleshooting

### 8.1. Material not found

If a material of section 2 is not found in the `uploads` folder or the account's materials collection, run the
[structure tutorial](defect-surface-adatom-graphene.md) first; the names must match exactly.
The Ca, Al, Ga, In, Ti, Fe and Au cells also need their rows uncommented there, as its [section 4.1](defect-surface-adatom-graphene.md#41-select-the-adatoms) shows.

### 8.2. No cluster available

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to, and section 5.2 stops.

### 8.3. Residual force above the threshold

A relaxation that stops on `nstep` ends with a force component above the manuscript's 0.05 eV/Å, and Eq. 1 then uses
the energy of its last ionic step. In order to relax further, raise `nstep` as in section 7.1 and change
`workflow.name` in section 6 of the notebook: the name does not carry `nstep`, so under the old name the finished
relaxation job is reused.

### 8.4. Adsorption energy far from the published value

Check the provenance printed in section 3.1 of the notebook first: the clean layer reads `C32` and each adatom cell
`C32` with its adatom, such as `C32Li1`, each in a `9.86 x 9.86 x 15.00 Å` cell, and each isolated atom one atom, such
as `Li1`, in a `14.00 x 14.00 x 14.00 Å` cell. Then open the Total Energy job of the atom, select the
[Files tab]({{ interface_url }}/jobs/ui/files-tab/), and check that `pw_scf.in` sets `nspin = 2` and
`tot_magnetization` to the atom's moment in Table II: 1 for Li, Na, K, Al, Ga, In and Au, 2 for Sn, 4 for Ti and
Fe. The Ca and Pd atoms run without spin.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook calculates the adsorption energies of metal adatoms on graphene. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_surface_adatom_graphene_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
