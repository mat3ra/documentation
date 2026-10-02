---
tags:
  - defects
  - defect-pair
  - substitutional
  - vacancy
  - point-defects
  - GaN
  - gallium-nitride
  - formation-energy
  - D-0D-DFP

hide:
  - tags
# YAML header
render_macros: true
---

# Vacancy-Substitution Pair Defects in GaN (Formation Energy)

## 1. Introduction

This tutorial calculates the formation energy E_f of the neutral Mg_Ga-V_N defect pair in GaN, reproducing
results from the following manuscript:

!!!note "Manuscript"
    Giacomo Miceli and Alfredo Pasquarello, "Self-compensation due to point defects in Mg-doped GaN",
    Physical Review B 93, 165207 (2016).
    [DOI:10.1103/PhysRevB.93.165207](https://doi.org/10.1103/PhysRevB.93.165207){:target='_blank'}.
    [@Miceli2016]

This tutorial builds upon the [Vacancy-Substitution Pair Defects in GaN](defect-point-pair-gallium-nitride.md)
tutorial, where the defective structure is created. Here, the formation energy is calculated using
Quantum ESPRESSO at the Ga-rich and the N-rich limits, and compared with Table I of the manuscript.

The figure below shows FIG. 2 of the manuscript; the pair computed here is panel (c):

![Point Pair Defects: Mg Substitution and Vacancy in GaN](../../../images/tutorials/materials/defects/defect_point_pair_gallium_nitride/0-figure-from-manuscript.webp "Point Defect Pair: Substitution, Vacancy in GaN, FIG. 2.")

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [Vacancy-Substitution Pair Defects in GaN](defect-point-pair-gallium-nitride.md) tutorial,
   using the `defect_point_pair_gallium_nitride.ipynb` notebook embedded in its section 8, to create and
   save `GaN 3x3x2 Mg_Ga-V_N axial pair`, OR
2. Have the material saved in the `uploads` folder or in the account's materials collection

The GaN unit cell (the pristine reference) and the chemical-potential references Ga (mp-142), solid N₂
(mp-154) and Mg₃N₂ (mp-1559) are loaded from Standata.

## 3. Workflow overview

The defect formation energy calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure material names, the energy k-grid, the Density
   Functional Theory (DFT) model, and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the pair and the four Standata references, print their compositions and the
   Mg-N distances
4. **Configure the model and k-grids**: One DFT model, a relaxation and an energy k-grid per material
5. **Configure compute resources**: Select the cluster, queue, and processor settings
6. **Relax every cell**: At fixed cell, reusing a relaxed structure if one is found
7. **Compute total energies**: One Total Energy job on each relaxed structure
8. **Retrieve results**: Print the chemical potentials, the formation enthalpy of GaN, and E_f at each limit
9. **Compare with the manuscript**: Print the comparison with Miceli & Pasquarello and the verdict

## 4. Calculation parameters

| | this tutorial | Miceli & Pasquarello |
|---|---|---|
| Code | Quantum ESPRESSO | Quantum ESPRESSO |
| Functional | Perdew-Burke-Ernzerhof (PBE) | Heyd-Scuseria-Ernzerhof (HSE), 31 % Fock exchange |
| Pseudopotentials | ultrasoft (GBRV), Ga 3d in valence | norm-conserving, Ga 3d in core |
| Cutoff | 40 / 200 Ry | 45 Ry |
| Cell | 3×3×2, 71 atoms with the pair; pristine as 18 GaN unit cells | 96 atoms |
| k-points, pair | Γ for the relaxation, `ENERGY_KGRID` for the energy | Γ for the relaxation, 2×2×2 for the energy |
| μ_N, N-rich limit | solid N₂ (mp-154) | N₂ molecule |
| μ_Mg | Mg₃N₂ equilibrium, Mg₃N₂ (mp-1559) | Mg₃N₂ equilibrium |
| Relaxation | atoms only, fixed cell, 0.05 eV/Å | "fully relaxed"; cell and threshold not stated |
| Spin | spin-restricted, the neutral pair being closed-shell (0.00 μB) | spin-unrestricted where unpaired electrons occur |

A relaxed structure already in the account is reused whatever model produced it, and its name is printed;
a model change therefore does not trigger a fresh relaxation.

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the defect formation energy notebook:

```
other/materials_designer/specific_examples/defect_point_pair_gallium_nitride_SIMULATION.ipynb
```

### 5.2. Configure parameters

The parameters cells set the material names, the energy k-grid, the compute resources, and the DFT model:

```python
# Name saved by defect_point_pair_gallium_nitride.ipynb.
DEFECTIVE_NAME = "GaN 3x3x2 Mg_Ga-V_N axial pair"
GAN_REFERENCE_NAME = "GaN"                                          # Standata, mp-804 unit cell, mu_GaN
GA_REFERENCE_NAME = "Ga-[Gallium]-ORC_[Cmce]_3D_[Bulk]-[mp-142]"    # Standata, mu_Ga at the Ga-rich limit
N2_REFERENCE_NAME = "N2-[Nitrogen]-FCC_[P2_13]_3D_[Bulk]-[mp-154]"  # Standata, mu_N at the N-rich limit
MG3N2_REFERENCE_NAME = "Mg3N2-[Magnesium_Nitride]-BCC_[Ia-3]_3D_[Bulk]-[mp-1559]"

ENERGY_KGRID = [4, 4, 3]

CLUSTER_NAME = None
QUEUE_NAME = QueueName.OR
PPN = 16  # OR allows 16 cores per job
TIME_LIMIT = "04:00:00"  # longest job: the Mg3N2 relaxation, about 1 h 40 min on 16 cores
TOLERANCE_FRACTION = 0.15  # fractional agreement with the paper that counts as reproduced

FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry

KPOINT_DENSITY = 4  # Å⁻¹, for the Ga, N2 and Mg3N2 references; the grid it gives is printed per material
SUPERCELL_KGRID = [3, 3, 2]   # GaN unit-cell relaxation grid, and the factor folding ENERGY_KGRID onto the unit cell
RELAXATION_SETTINGS = {"forc_conv_thr": 1.9e-3, "nstep": 100}
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Monitor progress

The notebook polls the jobs every 60 seconds (`POLL_INTERVAL`) and marks each reused structure or job
`♻️`. Measured on cluster-001, 16 cores in the OR queue, as job time without the queue: from scratch about
2 h 10 min (default `ENERGY_KGRID`) and 1 h 50 min (`[1, 1, 1]`), longer than one login lasts (section
8.3); with the relaxations reused, about 35 and 12 min (the default run took 42 min with the queue);
with every job finished, about a minute.

### 5.5. Analyze results

The last cell prints E_f at each limit and the formation enthalpy |ΔH_f(GaN)| beside the manuscript's
values, then the verdict, here for the default and for `ENERGY_KGRID = [1, 1, 1]`:

```
Reproduces Miceli & Pasquarello (2016): yes (E_f N-rich +4%, Ga-rich +31%; PBE, energy k 4x4x3)
Reproduces Miceli & Pasquarello (2016): no (E_f N-rich -49%, Ga-rich -54%; PBE, energy k 1x1x1)
```

`yes` requires E_f(N-rich) within `TOLERANCE_FRACTION` of 2.1 eV and E_f(Ga-rich) below E_f(N-rich).

## 6. Expected results

Table I of the manuscript gives the formation energy of the neutral pair, computed with HSE with the
Fermi level at the valence band maximum, as 1.2 eV (Ga-rich) and 2.1 eV (N-rich). Table I labels this row
and the q = +2 row (−0.4 / 0.5 eV) both `E_f^{+2}`, in the published version and in the arXiv source.
FIG. 3 resolves it: the pair's line rises with slope +2 from −0.4 / 0.5 eV and is flat at 1.2 / 2.1 eV
above the +2/0 transition at E_F = 0.80 eV, so the flat values are the neutral ones. Only the neutral pair
is compared. The formation enthalpy, |ΔH_f(GaN)| = 1.4 eV, is Table I's V_N rows, 4.7 eV (N-rich) − 3.3 eV (Ga-rich).

### 6.1. Comparison with published results

| | E_f, N-rich (eV) | E_f, Ga-rich (eV) | \|ΔH_f(GaN)\| (eV) |
|---|---|---|---|
| Miceli & Pasquarello, HSE | 2.1 | 1.2 | 1.4 |
| `ENERGY_KGRID = [4, 4, 3]` (default) | 2.185 (+4 %) | 1.570 (+31 %) | 0.922 (−34 %) |
| `ENERGY_KGRID = [1, 1, 1]` (fast) | 1.066 (−49 %) | 0.550 (−54 %) | 0.773 (−45 %) |

## 7. Customization options

### 7.1. Choose the energy k-grid

`ENERGY_KGRID` is the k-grid of the pair's total energy; the GaN unit cell's follows it, multiplied by
`SUPERCELL_KGRID`. `[1, 1, 1]` is faster and not converged:

```python
ENERGY_KGRID = [1, 1, 1]
```

Both values share the relaxations: switching re-runs only the pair's and the GaN unit cell's Total Energy
jobs. The manuscript's own mesh, 2×2×2 on its 96-atom cell, is untested here.

### 7.2. Adjust computational resources

The default, `CLUSTER_NAME = None`, uses the account's first listed cluster; setting a specific name picks
that cluster instead, and a name that is not available makes the notebook stop and list the ones that are.

### 7.3. Use the manuscript's settings

The functional stays PBE: HSE on these cells exceeded the platform's time and memory. The other settings
can be moved toward the manuscript's in the parameters cells:

- **Pseudopotentials**: set `PSEUDOPOTENTIAL_TYPE = "nc"`, at a cutoff untested here; the manuscript's 45 Ry
  does not transfer, an HSE job with PseudoDojo norm-conserving at 45 Ry giving forces up to 0.68 eV/Å on
  the perfect crystal. The platform's norm-conserving Ga keeps 3d in valence, unlike the manuscript's
- **Cell**: build a 96-atom cell with `SUPERCELL_MATRIX` in the
  [structure notebook](defect-point-pair-gallium-nitride.md) and save the pair under a new name there;
  here, set `DEFECTIVE_NAME` to that name and fold the cell's k-grid in `SUPERCELL_KGRID`
- **Spin**: in section 7 of the notebook, patch `{"nspin": 2, "starting_magnetization(2)": 0.5}`
  (species 2 = N) into the pair's `&SYSTEM` with `patch_workflow_qe_input` and change its `workflow.name`:
  the name does not carry `nspin`, so under the old name the finished `nspin = 1` job is reused

## 8. Troubleshooting

### 8.1. Material not found

If `GaN 3x3x2 Mg_Ga-V_N axial pair` is not found in the `uploads` folder or the account's materials
collection, run the [Vacancy-Substitution Pair Defects in GaN](defect-point-pair-gallium-nitride.md)
tutorial first, and check that its `uploads` folder holds the pair under that exact name. If
`Mg3N2-[Magnesium_Nitride]-BCC_[Ia-3]_3D_[Bulk]-[mp-1559]` is not found, update `mat3ra-standata` to a
release that includes the entry.

### 8.2. No cluster available, or jobs end in `error`

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to, and
section 5.2 stops with `IndexError: list index out of range`. A cluster has to be available to the
account before the notebook can run. If the relaxations end in `error` on the default cluster, section 7
of the notebook stops with `RuntimeError: Job … reported no 'final_structure'`. Set `CLUSTER_NAME` to
another cluster — cluster-001 ran every job here — and re-run; finished jobs are reused.

### 8.3. No formation energy on the first run

The platform's access token lasts one hour and expires during the Mg₃N₂ relaxation: on a first run from
scratch, the wait in section 6 of the notebook stops with `HTTPError 401: You must be logged in`. The jobs
keep running. About 1 h 40 min after the start, restart the kernel and run all cells again (*Kernel* >
*Restart Kernel and Run All Cells*): the notebook asks for a new login and picks up the running and
finished jobs.

### 8.4. Formation energy far from the published value

Check the provenance printed in section 3 of the notebook first. The pair is 71 atoms, Ga 35 / N 35 /
Mg 1, with three Mg-N bonds at 1.968 Å:

```
GaN 3x3x2 Mg_Ga-V_N axial pair: Ga35Mg1N35, 71 atoms, cell 9.65 x 9.65 x 10.48 Å
Mg-N distances: 1.968, 1.968, 1.968, 3.270 Å
```

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook demonstrates the workflow for calculating the formation energy of the
Mg_Ga-V_N pair in GaN. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_pair_gallium_nitride_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
