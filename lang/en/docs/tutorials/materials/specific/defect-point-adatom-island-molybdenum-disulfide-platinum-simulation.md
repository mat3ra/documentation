---
tags:
  - MoS2
  - platinum
  - adatoms
  - binding-energy
  - D-2D-ISL

hide:
  - tags
# YAML header
render_macros: true
---

# Pt Adatoms Island on MoS2 (Binding Energy)

## 1. Introduction

This tutorial calculates binding energies of Pt on monolayer MoS₂, reproducing results from the following manuscript:

!!!note "Manuscript"
    W. A. Saidi, "Density Functional Theory Study of Nucleation and Growth of Pt Nanoparticles on MoS2(001)
    Surface", Crystal Growth & Design 15, 642–652 (2015).
    [DOI:10.1021/cg5013395](https://doi.org/10.1021/cg5013395){:target='_blank'}.
    [@Saidi2015]

This tutorial builds upon the [Pt Nanoparticles on MoS2(001) Surface via Adatoms](defect-point-adatom-island-molybdenum-disulfide-platinum.md)
tutorial, where the structures are created. Here, the binding energy is calculated using Quantum ESPRESSO with Eq. 1
of the manuscript, E_b = (1/n) [E(MoS₂ + Pt_n) − E(MoS₂) − n E(Pt atom)], against the isolated Pt atom: for the
t-(Mo)₄-S cluster (n = 4, three Pt atoms on top of Mo and the fourth above S) and for one Pt atom on top of Mo (n = 1).

The figure below shows Fig. 4 of the manuscript; the cluster computed here is panel (b):

![Pt Island on MoS₂](../../../images/tutorials/materials/defects/defect_point_adatom_island_molybdenum_disulfide_platinum/0-figure-from-manuscript.webp "Pt₄ clusters on MoS₂, Fig. 4.")

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [Pt Nanoparticles on MoS2(001) Surface via Adatoms](defect-point-adatom-island-molybdenum-disulfide-platinum.md)
   tutorial, using the `defect_point_adatom_island_molybdenum_disulfide_platinum.ipynb` notebook embedded in its section 6,
   to create and save `MoS2 5x5 monolayer` (75 atoms), `MoS2 5x5 Pt1 atop Mo` (76 atoms) and `MoS2 5x5 Pt4 t-(Mo)4-S` (79 atoms), OR
2. Have the three materials saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The binding energy calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure material names, the Pt atom box, the model, and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the three slabs, build the isolated Pt atom, print their compositions and cells
4. **Configure the model**: One Density Functional Theory (DFT) model for every job
5. **Configure compute resources**: Select the cluster, queue, and processor settings
6. **Relax the three slabs**: At fixed cell, at the Γ point, with the dipole correction
7. **Compute the isolated Pt atom**: One spin-polarized Total Energy job at the Γ point
8. **Retrieve results**: Eq. 1 for Pt₄ and Pt₁, and the mean bond lengths of the relaxed Pt₄ cluster
9. **Compare with the manuscript**: Print the binding energies beside Table 1's

## 4. Calculation parameters

| | this tutorial | Saidi |
|---|---|---|
| Code | Quantum ESPRESSO | Vienna Ab initio Simulation Package (VASP) |
| Functional | Perdew-Burke-Ernzerhof (PBE), no van der Waals correction | PBE, no van der Waals correction |
| Pseudopotentials | ultrasoft (GBRV) | projector augmented-wave (PAW) |
| Cutoff | 40 / 200 Ry | 350 eV |
| Cell | 5×5 monolayer, a = 3.18 Å; 75, 76 and 79 atoms in one 15.90 × 15.90 × 26.27 Å cell | 5×5 monolayer, a = 3.18 Å, vacuum over 10 Å |
| k-points | Γ | Γ |
| Smearing | Fermi-Dirac, 0.05 eV | Fermi-Dirac, 0.05 eV |
| Dipole correction | along z, on the three slabs | on the slabs |
| Relaxation | all atoms, fixed cell, 0.005 eV/Å, at most 10 ionic steps | all atoms, 0.005 eV/Å |
| Spin, slabs | not spin-polarized | not spin-polarized, the supported clusters being non-magnetic |
| Spin, Pt atom | `nspin = 2`, total magnetization 2 | spin-polarized, two unpaired electrons |
| Pt atom box | 12 Å cube | not stated |

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the binding energy notebook:

```
other/materials_designer/specific_examples/defect_point_adatom_island_molybdenum_disulfide_platinum_SIMULATION.ipynb
```

### 5.2. Configure parameters

Cell 1.2 sets the material names and the box of the isolated Pt atom:

```python
# Names saved by defect_point_adatom_island_molybdenum_disulfide_platinum.ipynb.
PRISTINE_NAME = "MoS2 5x5 monolayer"
PT1_NAME = "MoS2 5x5 Pt1 atop Mo"
PT4_NAME = "MoS2 5x5 Pt4 t-(Mo)4-S"
PT_ATOM_NAME = "Pt atom"
PT_ATOM_BOX = 12.0  # Å, edge of the cubic box around the isolated Pt atom; paper: box size not stated
```

Cell 1.4 sets the DFT model; each comment names the manuscript's setting:

```python
# paper: VASP PAW at 350 eV; ours GBRV ultrasoft at its own converged 40/200 Ry
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry

GAMMA_KGRID = [1, 1, 1]  # paper: Γ only, for the slabs and the isolated atom
# paper: Fermi-Dirac, k_B T = 0.05 eV = 0.003675 Ry
SMEARING_SETTINGS = {"occupations": "smearing", "smearing": "fermi-dirac", "degauss": 0.003675}
# paper: dipole correction along z; eamp = 0 keeps the sawtooth a correction, no external field
DIPOLE_SETTINGS = {"control": {"tefield": True, "dipfield": True}, "system": {"edir": 3, "eamp": 0.0, "eopreg": 0.05}}
# paper: the isolated Pt atom spin-polarized with two unpaired electrons; the slabs spin-averaged
SPIN_SETTINGS = {"nspin": 2, "tot_magnetization": 2}
# paper: all atoms relaxed to 0.005 eV/Å = 1.9e-4 Ry/Bohr. nstep ends each relaxation inside TIME_LIMIT;
# section 7 prints the force norm (all atoms). To reach the threshold, raise nstep (and TIME_LIMIT, cluster permitting).
RELAXATION_SETTINGS = {"forc_conv_thr": 1.9e-4, "nstep": 10}
MODEL_TAG = f"{FUNCTIONAL}-{PSEUDOPOTENTIAL_TYPE} {ECUTWFC}-{ECUTRHO}Ry G fd{SMEARING_SETTINGS['degauss']}"

SCF_UNIT = "pw_scf"
RELAX_UNIT = "pw_relax"
# Names the relaxation jobs; the slab energies in Eq. 1 are read from these jobs.
RELAX_TAG = f"{MODEL_TAG} dip f{RELAXATION_SETTINGS['forc_conv_thr']} n{RELAXATION_SETTINGS['nstep']}"
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu. The notebook first
[authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md), then runs the steps listed in section 3.

### 5.4. Monitor progress

The notebook polls the three relaxations, then the Total Energy job of the Pt atom.

### 5.5. Analyze results

The notebook prints the relaxed Pt₄ bond lengths and both binding energies beside Table 1, with the deviation in percent:

```
Pt-Mo: 2.892 Å, Saidi 2.91 Å
Pt-S: 2.357 Å, Saidi 2.35 Å
Pt-Pt: 2.801 Å, Saidi 2.61 Å
E_b(Pt4, t-(Mo)4-S): -3.524 eV/Pt, Saidi -3.43 eV/Pt (-2.7 %)
E_b(Pt1, atop Mo): -2.822 eV/Pt, Saidi -2.83 eV/Pt (+0.3 %)
```

## 6. Expected results

The deviation is 100 (E_b − E_b,Saidi) / |E_b,Saidi|: a positive deviation is a weaker binding than the manuscript's.

### 6.1. Comparison with published results

| | E_b (eV per Pt atom) | Pt-Mo (Å) | Pt-S (Å) | Pt-Pt (Å) |
|---|---|---|---|---|
| Pt₄, t-(Mo)₄-S (Fig. 4b), Saidi Table 1 | −3.43 | 2.91 | 2.35 | 2.61 |
| Pt₄, t-(Mo)₄-S, this tutorial | −3.52 (−2.7 %) | 2.89 | 2.36 | 2.80 |
| Pt₁, on top of Mo (Fig. 1a), Saidi Table 1 | −2.83 | 2.76 | 2.29 | — |
| Pt₁, on top of Mo, this tutorial | −2.82 (+0.3 %) | not computed | not computed | — |

Bond lengths are means over atom pairs under Table 1's 3 Å cutoff (`BOND_CUTOFF`). The printed Pt-Pt 2.801 Å is the mean
of six pairs: three apex-base pairs at 2.615 Å and three base-base pairs at 2.987 Å; Table 1 gives 2.61 Å.

## 7. Customization options

### 7.1. Adjust the isolated-atom box and the relaxation threshold

`PT_ATOM_BOX` in cell 1.2 is the edge of the cubic box around the isolated Pt atom; the manuscript does not state its
box. A new box is a new material, so the Total Energy job of the Pt atom runs again. `RELAXATION_SETTINGS` in cell 1.4
holds the manuscript's force threshold, 0.005 eV/Å written in Ry/Bohr, which stays the stopping criterion, and `nstep`,
the number of ionic steps after which each relaxation ends inside `TIME_LIMIT`; section 7.2 of the notebook prints the
residual force. In order to reach the threshold, raise `nstep` together with `TIME_LIMIT`, as far as the cluster
allows. Both values are part of the relaxation jobs' names, so a change relaxes the three slabs again.

### 7.2. Adjust computational resources

`QUEUE_NAME`, `PPN` and `TIME_LIMIT` in cell 1.3 set the queue, the cores and the time limit of every job. The default,
`CLUSTER_NAME = None`, uses the account's first listed cluster; setting a specific name picks that cluster instead,
and a name that is not available makes the notebook stop and list the ones that are.

### 7.3. Use the manuscript's settings

Apart from the code, the pseudopotentials and the cutoff, section 4 follows the manuscript wherever it states a
setting; the Pt atom box, the fixed cell and the `nstep` bound are this tutorial's. The manuscript's PAW potentials are
VASP's and cannot be matched. Quantum ESPRESSO's are selected with `PSEUDOPOTENTIAL_TYPE = "paw"`; neither they nor a
cutoff for them is tested here, and the manuscript's 350 eV does not transfer.

## 8. Troubleshooting

### 8.1. Material not found

If `MoS2 5x5 monolayer`, `MoS2 5x5 Pt1 atop Mo` or `MoS2 5x5 Pt4 t-(Mo)4-S` is not found in the `uploads` folder or
the account's materials collection, run the [structure tutorial](defect-point-adatom-island-molybdenum-disulfide-platinum.md)
first, and check that its `uploads` folder holds the three materials under these exact names.

### 8.2. No cluster available

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to, and section 5.2
stops. A cluster has to be available to the account before the notebook can run.

### 8.3. Residual force above the threshold

A relaxation that stops on `nstep` ends with forces above the manuscript's 0.005 eV/Å, and Eq. 1 then uses the energy
of its last ionic step. In order to relax further, raise `nstep` as in section 7.1.

### 8.4. Binding energy far from the published value

Check the provenance printed in section 3.1 of the notebook first: the three slabs read `Mo25S50`, `Mo25Pt1S50` and
`Mo25Pt4S50`, each in a `15.90 x 15.90 x 26.27 Å` cell, and the Pt atom `Pt1` in a `12.00 x 12.00 x 12.00 Å` cell. Then
open the Total Energy job of the Pt atom, select the [Files tab]({{ interface_url }}/jobs/ui/files-tab/), and check
that `pw_scf.in` sets `nspin = 2` and `tot_magnetization = 2`.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook calculates the binding energies of Pt on MoS₂. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_adatom_island_molybdenum_disulfide_platinum_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
