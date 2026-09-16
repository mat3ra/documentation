---
tags:
  - defects
  - vacancy
  - point-defects
  - h-BN
  - boron-nitride
  - 2D-materials
  - formation-energy
  - D-0D-VAC

hide:
  - tags
# YAML header
render_macros: true
---

# Vacancy Point Defects in Hexagonal Boron Nitride (Formation Energy)

## 1. Introduction

This tutorial calculates the formation energy of a neutral boron vacancy (V_B) in the h-BN
structure created in the [Vacancy Point Defect in h-BN](defect-point-vacancy-boron-nitride.md)
tutorial, reproducing a result from the following manuscript.

!!!note "Manuscript"
    Fabian Bertoldo, Sajid Ali, Simone Manti & Kristian S. Thygesen, "Quantum point defects in 2D
    materials - the QPOD database", npj Computational Materials, 2022.
    [DOI:10.1038/s41524-022-00730-w](https://doi.org/10.1038/s41524-022-00730-w){:target='_blank'}.
    [@Bertoldo2022]

The manuscript's Quantum Point Defect (QPOD) database tabulates formation energies for point defects
in 2D materials, computed at every accessible charge state and chemical-potential limit. This
tutorial reproduces one entry of that table: the neutral boron vacancy in h-BN at the standard-state
chemical potentials, [QPOD entry `1BN-1.2d.v_B.0.1`](https://qpod.fysik.dtu.dk/material/1BN-1.2d.v_B.0.1).

## 2. Prerequisites

Run the [Vacancy Point Defect in h-BN](defect-point-vacancy-boron-nitride.md) tutorial first, using
the `defect_point_vacancy_boron_nitride.ipynb` notebook embedded in its section 6: that notebook
saves two materials into the `uploads` folder, the pristine supercell as `h-BN supercell` and the
defective structure as `B-vacancy h-BN`. This notebook loads both back by name. A name that does
not resolve stops the notebook rather than silently substituting a different material.

## 3. What is reproduced

The formation energy of a point defect X in charge state q follows QPOD's Eq. (3):

$$
E_f[X^q] = E_{\text{tot}}[X^q] - E_{\text{tot}}[\text{pristine}] - \sum_i n_i \mu_i + q E_F
$$

where $\mu_i$ is the total energy of the standard state of element $i$, per atom, and $n_i$ is the
*change* in the number of atoms of that element between the defective and the pristine cell —
negative when an atom is removed. A vacancy changes a single element, so only its $\mu$ enters the
sum; for V_B, $n_B = -1$, and the formula reduces to $E_f = E_{\text{tot}}[\text{defect}] -
E_{\text{tot}}[\text{pristine}] + \mu_B$.

That is also why the standard-state and "N-poor" rows of QPOD's table agree: both fix μ_B at the
same value, the total energy per atom of α-boron. Only the "B-poor" (nitrogen-rich) limit moves
μ_B, and it lowers the formation energy by 1.29 eV, to 8.89 eV. This tutorial reproduces the
standard-state number, 10.18 eV, and reports the B-poor number for context.

QPOD also tabulates the −1 and +1 charge states, but only q = 0 is compared here. A charged
supercell interacts with its own periodic images, and correcting for that requires a finite-size
correction that the workflow used here does not apply — it can set a nonzero total charge on the
cell, but the number that comes out could not be compared to QPOD's corrected values at the
precision this comparison is being made at.

## 4. Computational settings

| | this tutorial | QPOD |
|---|---|---|
| Code | Quantum ESPRESSO | GPAW (Grid-based Projector-Augmented Wave method) |
| Functional | PBE (Perdew-Burke-Ernzerhof) | PBE |
| Pseudopotentials | ultrasoft (GBRV, Garrity-Bennett-Rabe-Vanderbilt) | PAW (Projector-Augmented Wave; GPAW setups) |
| Plane-wave cutoff | 40 Ry / 200 Ry (GBRV's recommended pair for ultrasoft sets), identical for every job | 800 eV |
| k-point sampling | density 6 Å⁻¹, converted to a grid per cell — 3 × 5 × 1 for the defect cell | 6 Å⁻¹ (relaxation), 12 Å⁻¹ (ground state) |
| Geometry | as built by the structure notebook; optional fixed-cell relaxation of the defective cell only, to 0.01 eV/Å (`RELAX_DEFECT`, off by default) | every structure relaxed to 0.01 eV/Å |
| Spin | fixed total magnetization, 1 Bohr magneton (doublet, one unpaired electron), on the defect cell | polarized, 1.018 Bohr magnetons (doublet) |
| Cell | 48 → 47 atoms, 15.05 × 8.69 Å, 8.69 Å defect spacing, 20 Å vacuum | 84 → 83 atoms (symmetry-broken), 15.06 Å defect spacing, 15 Å vacuum |

The defect cell's magnetization is fixed to 1 Bohr magneton, the doublet QPOD reports, rather than
left to converge on its own: an unconstrained spin-polarized calculation of this cell finds a
quartet (three unpaired electrons) instead, 0.22 eV lower in energy (formation energy 10.24 eV
against the doublet's 10.46 eV, both unrelaxed). The comparison is only like-for-like in the same
spin state, and this ordering is for unrelaxed cells: QPOD's entry is the *relaxed* doublet, and
whether the quartet stays below the doublet after relaxation is not determined by this run. The
doublet is the state compared with QPOD below.

Relaxing the defective cell (fixed lattice, doublet state) moves the three nitrogens around the
vacancy 0.07–0.13 Å outward — the N–N distance across the hole goes from 2.51 Å in the unrelaxed
cell to 2.69, 2.69 and 2.55 Å, a small Jahn-Teller distortion of the doublet — while the rest of
the sheet moves only about 0.02 Å and stays flat. That 0.1 Å of movement around the vacancy is
worth 0.35 eV: the vacancy's dangling bonds settling into a lower-energy arrangement.

The relaxation converges once the largest force on any single atom drops below 0.01 eV/Å, QPOD's
own threshold, which this run met at 0.009 eV/Å. The notebook instead prints a residual total
force of about 0.03 eV/Å — Quantum ESPRESSO's norm over every atom in the cell, not the per-atom
maximum, so it reads several times larger than the 0.01 eV/Å criterion even on a converged run.

This tutorial uses ultrasoft (GBRV) pseudopotentials under PBE; QPOD used PAW, GPAW's own setups.
Plane-wave cutoffs of a PAW and an ultrasoft calculation are not comparable numbers, so the 800 eV
and the 40 Ry / 200 Ry pair above cannot be read as one converging faster than the other. The
pseudopotential family and cutoff together are one of the differences the 0.2 eV tolerance below
covers. The notebook submits Total Energy jobs for the pristine cell, α-boron and nitrogen with
the same functional, pseudopotentials and cutoff as the defect job. The elemental references are
the platform's own seeded elemental materials, selected by element tag — which is why μ_B is
specifically α-boron's total energy — and on an account where those are not seeded, the notebook
stops before submitting anything. Each reference job is named for its material and model, and a
job is reused only when an earlier finished job of this account carries that exact name —
changing the cutoff or the pseudopotential type produces fresh references rather than silently
reusing the old ones. The workflow resolves the elemental reference energies by material and
account rather than by job name, so the results cell recomputes E_f from the notebook's own three
total energies — the defect cell, the pristine cell and boron per atom — and prints it next to the
workflow's value; when the two differ, it warns that the workflow resolved a different reference
energy, and the verdict line says so as well.

The cell's defect-defect spacing, 8.69 Å, is below the >15 Å minimum QPOD applies when choosing a
supercell; the finite-size effect this introduces is estimated at 0.02 eV (machine-learned
potential, unrelaxed). The 0.2 eV tolerance below is set by that estimate together with the
pseudopotential set — ultrasoft GBRV here against QPOD's PAW GPAW setups — which is not separately
quantified.

A result within 0.2 eV of 10.18 eV counts as reproducing the manuscript.

## 5. Theory and experiment

Both the 10.18 eV target and the number this notebook produces are PBE formation energies —
a comparison between two calculations, not against a measurement. Formation energies of point
defects of this kind are not directly accessible experimentally.

The electronic side of the same defect carries the same caveat in QPOD itself: the PBE band gap
of pristine h-BN is 4.67 eV, well below the HSE hybrid-functional value of 5.68 eV, so nothing
quantitative about the defect's electronic levels relative to the band edges should be read from
either functional.

## 6. What the run does

The default run submits up to four jobs: the defect calculation, and up to three reference Total
Energy calculations, for the pristine cell, α-boron and elemental nitrogen. Nitrogen does not
enter the formation energy — its change in atom count is zero — but the workflow resolves a
reference energy for every element in the cell and stops if one is missing, so the nitrogen job
is required. The defect job is created and submitted on every run; only the three reference Total
Energy jobs are reused when the account already holds a matching one, and created and submitted
otherwise. Setting `RELAX_DEFECT = True` adds a fifth job: a fixed-cell relaxation of the
defective cell in the doublet state (about 52 minutes), whose final structure is used for the
defect calculation in place of the unrelaxed one; like the reference jobs, a finished relaxation
is reused by name on a rerun.

The jobs run on `cluster-001`, queue OF, 40 cores, with a twelve-hour time limit — long enough for
the optional relaxation's BFGS steps; the platform's default one hour is not enough even for the
unrelaxed defect cell. Setting `CLUSTER_NAME = None` uses the first cluster listed for the account;
leaving it at `cluster-001`, or any other name that is not available under the account, makes the
notebook stop and list the clusters that are, so that `CLUSTER_NAME` in the parameters cell can be
set to one of them — it does not silently move the calculation onto a different machine.

The last cell prints one line naming the configuration:
`Reproduces Bertoldo et al. (2022): no (unrelaxed SCF)` by default, or
`yes (relaxed defect)` when `RELAX_DEFECT = True`; the same line also carries a trailing
`-- reference mismatch, see warning above` when the consistency check above failed, and the
verdict should not be read until that is resolved.

By default, the run stays with the SCF-only jobs: about 15 minutes of compute the first time
(2–4 minutes per reference job plus about 6 for the defect job), or about 6 minutes on a rerun
once the references are reused. It gives a formation energy of 10.46 eV against QPOD's 10.18 eV,
+0.28 eV, outside the 0.2 eV tolerance: `Reproduces Bertoldo et al. (2022): no (unrelaxed SCF)`.
Setting `RELAX_DEFECT = True` relaxes the defective cell first (14 BFGS steps, about 52 minutes on
40 cores, printing the total force described above) and gives 10.12 eV, −0.06 eV, inside the
tolerance: `Reproduces Bertoldo et al. (2022): yes (relaxed defect)`. Run without relaxation for a
quick check of the pipeline; run with it to get closest to the paper.

## 7. Interactive JupyterLite notebook

The notebook below computes the formation energy and prints the comparison with QPOD. Select
*Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_vacancy_boron_nitride_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 8. References
