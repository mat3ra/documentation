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

This tutorial calculates the formation energy of a neutral boron vacancy in h-BN, reproducing
results from the following manuscript:

!!!note "Manuscript"
    Fabian Bertoldo, Sajid Ali, Simone Manti & Kristian S. Thygesen, "Quantum point defects in 2D
    materials - the QPOD database", npj Computational Materials, 2022.
    [DOI:10.1038/s41524-022-00730-w](https://doi.org/10.1038/s41524-022-00730-w){:target='_blank'}.
    [@Bertoldo2022]

This tutorial builds upon the [Vacancy Point Defect in h-BN](defect-point-vacancy-boron-nitride.md)
tutorial, where the defective structure is created. Here, the formation energy is calculated using
Quantum ESPRESSO and compared with QPOD's value for the same defect.

### 1.1. What is being reproduced

QPOD's [entry `1BN-1.2d.v_B.0.1`](https://qpod.fysik.dtu.dk/material/1BN-1.2d.v_B.0.1) gives the
neutral vacancy formation energy at standard-state chemical potentials:

| | E_f (eV) |
|---|---|
| QPOD, standard states | 10.18 |
| QPOD, B-poor | 8.89 |

Only the neutral (q = 0) defect is compared; QPOD's charged states need a finite-size correction
this workflow does not apply.

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Complete the [Vacancy Point Defect in h-BN](defect-point-vacancy-boron-nitride.md) tutorial,
   using the `defect_point_vacancy_boron_nitride.ipynb` notebook embedded in its section 6, to
   create and save `h-BN supercell` and `B-vacancy h-BN`, OR
2. Have both material files saved in the `uploads` folder

## 3. Workflow overview

The defect formation energy calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure material names, the DFT model, and
   compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the pristine and defective structures, and resolve the elemental
   reference materials
4. **Submit prerequisite jobs**: Compute (or reuse) the pristine, boron and nitrogen Total Energy
   jobs
5. **Relax the defective cell** (optional): Only if `RELAX_DEFECT` is set
6. **Create and submit the defect job**: Assemble and run the formation energy workflow
7. **Monitor job status**: Wait for completion
8. **Retrieve and compare results**: Print the formation energy and the comparison with QPOD

## 4. Calculation parameters

### 4.1. DFT parameters

| | this tutorial | QPOD |
|---|---|---|
| Code | Quantum ESPRESSO | GPAW |
| Functional | PBE | PBE |
| Pseudopotentials | ultrasoft (GBRV) | PAW (GPAW setups) |
| Cutoff | 40 / 200 Ry | 800 eV |
| k-points | density 6 Å⁻¹ (3×5×1 for the defect cell) | 6 Å⁻¹ (relaxation), 12 Å⁻¹ (ground state) |
| Spin | fixed total magnetization, 1 μB (doublet) | 1.018 μB (doublet) |
| Cell | 48 → 47 atoms, 8.69 Å defect spacing, 20 Å vacuum | 84 → 83 atoms, 15.06 Å defect spacing, 15 Å vacuum |

### 4.2. Relaxation settings

By default (`RELAX_DEFECT = False`), the calculation is SCF only. Setting `RELAX_DEFECT = True`
relaxes the defective cell first, to 0.01 eV/Å — QPOD's own threshold, and the one QPOD applies to
every structure; only the defective cell is relaxed here.

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the defect formation energy notebook:

```
other/materials_designer/specific_examples/defect_point_vacancy_boron_nitride_SIMULATION.ipynb
```

### 5.2. Configure parameters

The parameters cells set the material names, the DFT model, and the compute resources:

```python
# Material names — saved by defect_point_vacancy_boron_nitride.ipynb
PRISTINE_NAME = "h-BN supercell"
DEFECTIVE_NAME = "B-vacancy h-BN"

# False: SCF only. True: relax the defective cell first, for the paper's result.
RELAX_DEFECT = False

CLUSTER_NAME = "cluster-001"
QUEUE_NAME = QueueName.OF
PPN = 40
TIME_LIMIT = "12:00:00"

# DFT model
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry
KPOINT_DENSITY = 6
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook will:

1. [Authenticate with the platform]({{ interface_url }}/jupyterlite/authentication.md) and
   initialize the API client
2. Load the two materials and resolve the elemental reference materials
3. Submit the prerequisite Total Energy jobs, reusing any that already match
4. Relax the defective cell first, if `RELAX_DEFECT` is set
5. Create, submit and monitor the defect formation energy job
6. Print the result and the comparison with QPOD

### 5.4. Monitor progress

The notebook includes automatic job monitoring with status updates. The default run
(`RELAX_DEFECT = False`) completes in about 15 minutes the first time, or about 6 minutes once the
reference jobs are reused. Setting `RELAX_DEFECT = True` adds the relaxation job, about 52 minutes.

### 5.5. Analyze results

Once the job completes, the formation energy is displayed next to QPOD's value, and the last cell
prints the comparison:

```
Reproduces Bertoldo et al. (2022): no (unrelaxed SCF)
```

or, with `RELAX_DEFECT = True`:

```
Reproduces Bertoldo et al. (2022): yes (relaxed defect)
```

## 6. Expected results

The defect formation energy job produces one number, printed next to QPOD's target and QPOD's
B-poor value for context.

### 6.1. Comparison with published results

| configuration | E_f (eV) | vs QPOD 10.18 eV | verdict |
|---|---|---|---|
| unrelaxed SCF | 10.46 | +0.28 | `no (unrelaxed SCF)` |
| relaxed defect | 10.12 | −0.06 | `yes (relaxed defect)` |

## 7. Customization options

### 7.1. Relax the defective cell

Set `RELAX_DEFECT = True` in the parameters cell to relax the defective cell before computing its
formation energy — closer to the paper, at the cost of a longer run:

```python
RELAX_DEFECT = True
```

### 7.2. Adjust computational resources

Modify the compute parameters in the parameters cell:

```python
CLUSTER_NAME = None  # or a specific cluster name
QUEUE_NAME = QueueName.OF
PPN = 40
TIME_LIMIT = "12:00:00"
```

### 7.3. Change the supercell or the defect

The supercell size and the vacancy site are set in the
[structure notebook](defect-point-vacancy-boron-nitride.md); this notebook loads whatever it
saves, by name.

## 8. Troubleshooting

### 8.1. Material not found

If a material is not found in the `uploads` folder:

1. Run the [Vacancy Point Defect in h-BN](defect-point-vacancy-boron-nitride.md) tutorial first
2. Ensure the materials are saved with the exact names (`h-BN supercell`, `B-vacancy h-BN`)
3. Check that the material files are in the correct `uploads` folder

### 8.2. Missing elemental reference materials

If boron or nitrogen has no platform material tagged `elemental`, the notebook stops before
submitting anything — seed one for the missing element first.

### 8.3. Job errors or time limit

The optional relaxation needs the full 12-hour time limit; increase `TIME_LIMIT` if a job runs out
of time before finishing.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook demonstrates the workflow for calculating the formation energy
of a boron vacancy in h-BN. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_vacancy_boron_nitride_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 10. References
