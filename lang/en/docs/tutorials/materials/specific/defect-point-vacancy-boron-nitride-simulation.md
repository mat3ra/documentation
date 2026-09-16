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
tutorial, comparing it with QPOD's own value for the same defect.

!!!note "Manuscript"
    Fabian Bertoldo, Sajid Ali, Simone Manti & Kristian S. Thygesen, "Quantum point defects in 2D
    materials - the QPOD database", npj Computational Materials, 2022.
    [DOI:10.1038/s41524-022-00730-w](https://doi.org/10.1038/s41524-022-00730-w){:target='_blank'}.
    [@Bertoldo2022]

### 1.1. What is being reproduced

QPOD's [entry `1BN-1.2d.v_B.0.1`](https://qpod.fysik.dtu.dk/material/1BN-1.2d.v_B.0.1) gives the
neutral V_B formation energy at standard-state chemical potentials:

| | E_f (eV) |
|---|---|
| QPOD, standard states | 10.18 |
| QPOD, B-poor | 8.89 |

Only the neutral (q = 0) defect is compared; QPOD's charged states need a finite-size correction
this workflow does not apply.

## 2. Prerequisites

Run the [Vacancy Point Defect in h-BN](defect-point-vacancy-boron-nitride.md) tutorial first,
using the `defect_point_vacancy_boron_nitride.ipynb` notebook embedded in its section 6. That
notebook saves two materials into the `uploads` folder, `h-BN supercell` and `B-vacancy h-BN`;
this notebook loads both back by name and stops if either is missing.

## 3. Workflow overview

`E_f = E(defect) − E(pristine) + μ_B`, where μ_B is the total energy per atom of α-boron, the
platform's seeded elemental reference. The notebook submits one defect calculation and up to
three reference Total Energy jobs (pristine cell, α-boron, nitrogen), reusing any of the three
that a matching job already covers.

## 4. Calculation parameters

| | this tutorial | QPOD |
|---|---|---|
| Code | Quantum ESPRESSO | GPAW |
| Functional | PBE | PBE |
| Pseudopotentials | ultrasoft (GBRV) | PAW (GPAW setups) |
| Cutoff | 40 / 200 Ry | 800 eV |
| k-points | density 6 Å⁻¹ (3×5×1 for the defect cell) | 6 Å⁻¹ (relaxation), 12 Å⁻¹ (ground state) |
| Relaxation | optional, defective cell only, to 0.01 eV/Å (`RELAX_DEFECT`) | every structure, to 0.01 eV/Å |
| Spin | fixed total magnetization, 1 μB (doublet) | 1.018 μB (doublet) |
| Cell | 48 → 47 atoms, 8.69 Å defect spacing, 20 Å vacuum | 84 → 83 atoms, 15.06 Å defect spacing, 15 Å vacuum |

Divergences from the published method:

- Ultrasoft GBRV pseudopotentials, not QPOD's PAW (GPAW).
- 48 atoms, not QPOD's 84-atom cell.
- Only the defective cell is optionally relaxed; QPOD relaxes every structure.

## 5. How to run

`RELAX_DEFECT = False` (default) runs the SCF-only jobs. `RELAX_DEFECT = True` relaxes the
defective cell first, in the doublet state, before computing its formation energy — closer to the
paper, at the cost of a longer run.

## 6. Expected results

| configuration | E_f (eV) | vs QPOD 10.18 eV | verdict |
|---|---|---|---|
| unrelaxed SCF | 10.46 | +0.28 | `no (unrelaxed SCF)` |
| relaxed defect | 10.12 | −0.06 | `yes (relaxed defect)` |

The last cell prints `Reproduces Bertoldo et al. (2022):` followed by the verdict.

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
