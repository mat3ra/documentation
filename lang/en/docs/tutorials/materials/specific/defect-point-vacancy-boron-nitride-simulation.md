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

The manuscript's QPOD database tabulates formation energies for point defects in 2D materials,
computed at every accessible charge state and chemical-potential limit. This tutorial reproduces
one entry of that table: the neutral boron vacancy in h-BN at the standard-state chemical
potentials, [QPOD entry `1BN-1.2d.v_B.0.1`](https://qpod.fysik.dtu.dk/material/1BN-1.2d.v_B.0.1).

## 2. Prerequisites

Run the [Vacancy Point Defect in h-BN](defect-point-vacancy-boron-nitride.md) tutorial first. Its
notebook saves two materials into the `uploads` folder, the pristine supercell as `h-BN supercell`
and the defective structure as `B-vacancy h-BN`, and this notebook loads both back by those exact
names. A name that does not resolve stops the notebook rather than silently substituting a
different material.

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
| Code | Quantum ESPRESSO | GPAW |
| Functional | PBE | PBE |
| Pseudopotentials | PAW (PseudoDojo JTH) | PAW (GPAW setups) |
| Plane-wave cutoff | 40 Ry (544 eV) wavefunction, 320 Ry density — from the PseudoDojo JTH "high" hints for B and N, identical for every job | 800 eV |
| k-point sampling | density 6 Å⁻¹, converted to a grid per cell — 3 × 5 × 1 for the defect cell | 6 Å⁻¹ (relaxation), 12 Å⁻¹ (ground state) |
| Geometry | as built by the structure notebook, not relaxed | relaxed to 0.01 eV/Å |
| Spin | polarized (nspin = 2) on the defect cell | polarized |
| Cell | 48 atoms, 15.05 × 8.69 Å, 8.69 Å defect spacing, 20 Å vacuum | 84 atoms (symmetry-broken), 15.06 Å defect spacing, 15 Å vacuum |

Boron and nitrogen have no ultrasoft pseudopotential under PBE on the platform, so both elements
use PAW here — the same family GPAW itself is built on, though not the same set of files. The
notebook submits Total Energy jobs for the pristine cell, α-boron and nitrogen with the same
functional, pseudopotentials and cutoff as the defect job, unless the account already holds a
Total Energy for that material — then that one is reused. Rerunning from a clean project is the
way to be sure all four energies share one model.

Two further offsets are quantified for the cell used here, estimated with a machine-learned
potential: the smaller supercell shifts the neutral formation energy by 0.02 eV relative to
QPOD's cell, and skipping relaxation costs a further 0.04 eV. Both are small; the 0.5 eV tolerance
below covers pseudopotential-set and reference-phase differences, which are not estimated. The
cell's defect-defect spacing, 8.69 Å, is below the >15 Å minimum QPOD applies when choosing a
supercell — the 0.02 eV estimate says the neutral vacancy tolerates the smaller cell.

A result within 0.5 eV of 10.18 eV counts as reproducing the manuscript.

## 5. Theory and experiment

Both the 10.18 eV target and the number this notebook produces are PBE formation energies —
a comparison between two calculations, not against a measurement. Formation energies of point
defects of this kind are not directly accessible experimentally.

The electronic side of the same defect carries the same caveat in QPOD itself: the PBE band gap
of pristine h-BN is 4.67 eV, well below the HSE hybrid-functional value of 5.68 eV, so nothing
quantitative about the defect's electronic levels relative to the band edges should be read from
either functional.

## 6. What the default run does

Running the notebook end to end submits at most four jobs: the defect calculation, and up to
three reference Total Energy calculations, for the pristine cell, α-boron and elemental nitrogen.
Nitrogen does not enter the formation energy — its change in atom count is zero — but the
workflow resolves a reference energy for every element in the cell and stops if one is missing,
so the nitrogen job is required. On a rerun, jobs already finished are reused rather than
resubmitted.

The jobs run on `cluster-001`, queue OF, 40 cores, with a four-hour time limit — long enough for
the spin-polarized defect cell. If that cluster is not found under the account, the notebook falls
back to whichever cluster is listed first; the printed "Using cluster" line says which one was
used.

The last cell prints one line, `Reproduces Bertoldo et al. (2022): yes` or `no`, next to the
calculated formation energy.

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
