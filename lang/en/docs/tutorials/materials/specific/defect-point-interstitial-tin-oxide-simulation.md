---
tags:
  - defects
  - interstitial
  - point-defects
  - SnO
  - tin-oxide
  - formation-energy
  - density-of-states
  - D-0D-INT

hide:
  - tags
# YAML header
render_macros: true
---

# Interstitial Point Defects in SnO (Formation Energy and Density of States)

## 1. Introduction

This tutorial calculates the formation energy of the neutral V_Sn-O_i defect pair in tin monoxide
(SnO), and compares it with the value reported in the following manuscript:

!!!note "Manuscript"
    A. Togo, F. Oba, and I. Tanaka, "First-principles calculations of native defects in tin
    monoxide", Physical Review B 74, 195128 (2006).
    [DOI:10.1103/PhysRevB.74.195128](https://doi.org/10.1103/PhysRevB.74.195128){:target='_blank'}.
    [@Togo2006]

This tutorial builds upon the [Oxygen Interstitial Defect in SnO](defect-point-interstitial-tin-oxide.md)
tutorial, where the defective structure is created. Here, the formation energy is calculated using
Quantum ESPRESSO and compared with Togo et al.'s value for the same defect.

### 1.1. What is being compared

Table II of the manuscript gives the neutral formation energies with the Fermi level at the valence band maximum:

| | E_f (eV) |
|---|---|
| V_Sn-O_i pair, models (a), (b) | 2.3 |
| V_Sn-O_i pair, model (c) | 3.9 |
| V_Sn and O_i, independent | 2.3 |

Model (a) is the pair built by the structure tutorial, and the one compared here. Table II does not name
the chemical-potential limit it uses, so the formation energy is computed at both of them. Only the neutral
(q = 0) defect is compared; its charged states need a finite-size correction this workflow does not apply.

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Complete the [Oxygen Interstitial Defect in SnO](defect-point-interstitial-tin-oxide.md)
   tutorial, using the `defect_point_interstitial_tin_oxide.ipynb` notebook embedded in its
   section 6, to create and save `SnO 2x2x2 supercell` and
   `SnO 2x2x2 V_Sn-O_i pair (Togo Fig 4a)`, OR
2. Have both materials saved in the `uploads` folder or in the account's materials collection

The chemical-potential references, α-Sn for the Sn-rich limit and SnO₂ for the O-rich one, are loaded from Standata.

## 3. Workflow overview

The defect formation energy calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure material names, the DFT model, and compute
   resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the pristine supercell and the pair, load α-Sn and SnO₂ from Standata,
   print the provenance of all four and the V_Sn-O_i distance
4. **Configure the model and k-grid**: One DFT model and a per-material k-grid for every job below
5. **Submit prerequisite jobs**: Compute (or reuse) the Total Energy jobs of the pristine supercell, α-Sn and SnO₂
6. **Relax the pair cell** (optional): Only if `RELAX` is set, reusing an existing relaxed structure
   if one is found
7. **Create and submit the Density of States job**: On the pair cell, producing its total energy and
   its density of states
8. **Retrieve and compare results**: Print the chemical potentials, the formation energy at each
   limit, the density of states and the comparison with Togo et al.

## 4. Calculation parameters

| | this tutorial | Togo et al. |
|---|---|---|
| Code | Quantum ESPRESSO | VASP |
| Functional | PBE | PW91 |
| Pseudopotentials | ultrasoft (GBRV) | PAW, Sn 5s5p in valence |
| Cutoff | 40 / 200 Ry | 500 eV |
| k-points | density 4 Å⁻¹ (4×4×3 for the 32-atom cells) | Γ-point only |
| Cell | 2×2×2, 32 atoms (Sn16O16 → Sn15O17) | 4×4×3, 192 atoms |
| Lattice | a 3.814 Å, c 4.887 Å (Standata SnO) | a 3.855 Å, c 4.983 Å |
| Chemical potentials | Sn-rich and O-rich limits, from Standata α-Sn and SnO₂ (rutile, mp-856) | Sn-rich and O-rich limits |
| Relaxation | none by default, 0.05 eV/Å with `RELAX = True` | all atoms to 0.05 eV/Å |

The settings here run in minutes; the manuscript's number needs its settings: PAW/PW91, 500 eV, a 4×4×3 cell, Γ-point.
By default (`RELAX = False`) the calculation uses the structures as given. `RELAX = True` relaxes the pair cell first
to 0.05 eV/Å, Togo et al.'s own threshold, at fixed cell: the atoms move, the Standata lattice is held.

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the defect formation energy notebook:

```
other/materials_designer/specific_examples/defect_point_interstitial_tin_oxide_SIMULATION.ipynb
```

### 5.2. Configure parameters

The parameters cells set the material names, the DFT model, and the compute resources:

```python
# Names saved by defect_point_interstitial_tin_oxide.ipynb; 2x2x2 (32 atoms) runs in minutes, Togo's cell is 4x4x3 (192).
PRISTINE_NAME = "SnO 2x2x2 supercell"
DEFECTIVE_NAME = "SnO 2x2x2 V_Sn-O_i pair (Togo Fig 4a)"
SN_REFERENCE_NAME = "Sn, Tin, FCC (Fd-3m) 3D (Bulk), mp-117"
SNO2_REFERENCE_NAME = "SnO2, Tin Dioxide, TET (P4_2/mnm) 3D (Bulk), mp-856"

# NOTE: set to True for results close to the manuscript (relaxes the pair once, ~2 h).
RELAX = False

CLUSTER_NAME = None
QUEUE_NAME = QueueName.OR
PPN = 16  # OR allows 16 cores per job
TIME_LIMIT = "12:00:00"  # covers the optional relaxation

# DFT model
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry
KPOINT_DENSITY = 4
RELAXATION_SETTINGS = {"forc_conv_thr": 1.9e-3, "nstep": 100}  # 0.05 eV/Å, Togo's convergence target
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook will:

1. [Authenticate with the platform]({{ interface_url }}/jupyterlite/authentication.md) and
   initialize the API client
2. Load the pristine supercell and the pair from the uploads folder or the account's materials
   collection, load α-Sn and SnO₂ from Standata, and print the V_Sn-O_i distance
3. Submit the prerequisite Total Energy jobs, reusing any that already match
4. Relax the pair cell first, if `RELAX` is set and no relaxed structure exists yet
5. Create, submit and monitor the Density of States job on the pair cell
6. Print the chemical potentials, the formation energy at each limit and the density of states

### 5.4. Monitor progress

The notebook includes automatic job monitoring with status updates, polling every 60 seconds
(`POLL_INTERVAL`). Jobs that already exist for the same material and workflow name are reused instead
of resubmitted, and the notebook prints `♻️` for each one. Measured on cluster-001, 40 cores:
the pristine supercell about 3.5 minutes of active time (about 11 minutes with the queue), α-Sn 13 seconds,
SnO₂ about 1 minute, the Density of States job about 5 minutes (about 7 with the queue), the relaxation 48 minutes; on OR at 16 cores expect roughly 2.5× longer (the relaxation ≈ 2 h).

### 5.5. Analyze results

The last cell prints the regime and, per limit, E_f beside Togo et al.'s value:

```
Regime: relaxed defect
E_f (Togo et al., 2006):      2.300 eV
E_f (this notebook, Sn-rich): 3.081 eV
E_f (this notebook, O-rich):  2.649 eV
```

## 6. Expected results

The chemical potentials come out of the three prerequisite jobs: Sn-rich μ_Sn = −2166.540, μ_O = −439.994 eV/atom;
O-rich μ_Sn = −2166.756, μ_O = −439.779 eV/atom — 0.216 eV apart in μ_Sn, against the manuscript's 0.23 eV.

### 6.1. Comparison with published results

| configuration | limit | E_f (eV) | difference from Togo et al. 2.3 eV (eV) | difference (%) |
|---|---|---|---|---|
| unrelaxed SCF | Sn-rich | 7.381 | +5.081 | +220.9 |
| unrelaxed SCF | O-rich | 6.949 | +4.649 | +202.1 |
| relaxed defect | Sn-rich | 3.081 | +0.781 | +34.0 |
| relaxed defect | O-rich | 2.649 | +0.349 | +15.2 |

The relaxed defect at the O-rich limit, 2.649 eV, is the closest to Togo et al.'s 2.3 eV and sits 15.2 % above it;
the remaining 0.349 eV is the cell size (32 atoms against 192) and the pseudopotentials (GBRV ultrasoft PBE against
PAW PW91). The relaxation converged in 17 BFGS steps to a maximum force of 0.036 eV/Å, lowering the energy by
4.30 eV, the oxygen interstitial moving 0.74 Å to the apex of a tin pyramid (Sn-O 1.93 Å).

The pair cell's density of states is plotted, and its band gaps printed, in section 9.2 of the notebook: 0.000 eV in
both configurations, the cell being metallic in PBE. Togo et al. report no defect transition level of O_i inside the
calculated band gap; this comparison is qualitative.

## 7. Customization options

### 7.1. Relax the pair cell

Set `RELAX = True` in the parameters cell to use the relaxed pair cell — closer to the paper. When this notebook
runs the relaxation, it saves the result in the account's materials collection under `SnO 2x2x2 V_Sn-O_i pair (Togo
Fig 4a) relaxed`; a relaxed structure found from an earlier job keeps its platform name. Later runs reuse that
relaxed structure, found by content hash, or a relaxation job still running under the same name:

```python
RELAX = True
```

To use a structure already relaxed elsewhere, set `DEFECTIVE_NAME` to its name with `RELAX = False`;
the regime line then still reads `unrelaxed SCF` — the provenance lines above the results name
the structure that was actually used.

### 7.2. Adjust computational resources

Modify the compute parameters in the parameters cell. The default, `CLUSTER_NAME = None`, uses the account's first
listed cluster; setting a specific name picks that cluster instead, and a name that is not available makes the
notebook stop and list the ones that are. `QueueName.OR` gives one node, charged by core-seconds with no flat fee; OR allows 16 cores per job:

```python
CLUSTER_NAME = None
QUEUE_NAME = QueueName.OR
PPN = 16
TIME_LIMIT = "12:00:00"
```

### 7.3. Change the supercell or the defect

The supercell size and the interstitial site are set in the
[structure notebook](defect-point-interstitial-tin-oxide.md); this notebook loads whatever it
saves, by name. Togo et al.'s own 4×4×3, 192-atom cell is reached by changing the supercell there.

## 8. Troubleshooting

### 8.1. Material not found

If a material is not found in the `uploads` folder, run the
[Oxygen Interstitial Defect in SnO](defect-point-interstitial-tin-oxide.md) tutorial first, and
check that its `uploads` folder holds both files, saved under the exact names
`SnO 2x2x2 supercell` and `SnO 2x2x2 V_Sn-O_i pair (Togo Fig 4a)`. If `SnO2, Tin Dioxide, TET (P4_2/mnm) 3D
(Bulk), mp-856` is not found, update `mat3ra-standata` to a release that includes the entry.

### 8.2. Jobs end in `error` and the results cell raises `IndexError`

The default `CLUSTER_NAME = None` takes the account's first listed cluster. If the prerequisite jobs
end in `error` and the results cell raises `IndexError: list index out of range`, open one of them in
the platform UI: if `pw_scf.out` ends in `MPI_Init` errors, that cluster cannot start it. Set
`CLUSTER_NAME` to another cluster — cluster-001 ran every job here — and re-run; finished jobs are reused.

### 8.3. No formation energy on the first `RELAX = True` run

With `RELAX = True`, the first run adds a relaxation job before the Density of States job, and waits for both. If
the session ends before they finish, re-run the notebook later: it finds the relaxed structure and any finished
jobs; the relaxation is not repeated, and a Density of States job that does not yet exist is created then.

### 8.4. Formation energy far from the published value

Check the V_Sn-O_i distance printed in section 3.2 of the notebook against Fig. 4(a) of the
manuscript first: the oxygen interstitial sits directly below the tin vacancy, in the interlayer gap.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook demonstrates the workflow for calculating the formation energy
and the density of states of the V_Sn-O_i pair in SnO. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_interstitial_tin_oxide_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
