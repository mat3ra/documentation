---
tags:
  - silicon
  - nanowire
  - passivation
  - band-gap
  - density-of-states
  - X-1D-PAS

hide:
  - tags
# YAML header
render_macros: true
---

# H-Passivated Silicon Nanowire (Band Gap and Density of States)

## 1. Introduction

This tutorial calculates the band gap, the bands along the wire and the density of states of the hydrogen-passivated
⟨110⟩ silicon nanowire of radius 0.51 nm, reproducing Table II and Fig. 8 (left) of the following manuscript:

!!!note "Manuscript"
    B. Aradi, L. E. Ramos, P. Deák, Th. Köhler, F. Bechstedt, R. Q. Zhang, and Th. Frauenheim,
    "Theoretical study of the chemical gap tuning in silicon nanowires"
    Phys. Rev. B 76, 035305 (2007)
    DOI: [10.1103/PhysRevB.76.035305](https://doi.org/10.1103/PhysRevB.76.035305) [@Aradi2007]

This tutorial builds upon the [Passivation of Silicon Nanowire](passivation-edge-nanowire-silicon.md) tutorial, where
the structure is created. Here, Quantum ESPRESSO relaxes one period of the wire, Si₁₈H₁₂, with the
Perdew-Burke-Ernzerhof (PBE) functional, then calculates its bands along Γ–Z, Z being the end of the Brillouin zone
along the wire, and its density of states (DOS) with the Heyd-Scuseria-Ernzerhof hybrid functional (HSE06). The band
gap of bulk silicon, 1.16 eV with the manuscript's hybrid functional, is calculated with HSE06 as well.

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [Passivation of Silicon Nanowire](passivation-edge-nanowire-silicon.md) tutorial, using the
   `passivation_edge_nanowire_silicon.ipynb` notebook embedded in its section 6, to create and save
   `Si nanowire 110 H-passivated one period` (30 atoms), OR
2. Have the material saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The band gap and DOS calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure material names, workflows, compute resources, and k-point grids
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the one-period wire, load bulk silicon from Standata, print their compositions and cells
4. **Configure the workflows**: Variable-cell relaxation of the wire, HSE06 band structure of the wire, HSE06 band gap
   and DOS of the wire and of bulk silicon
5. **Configure compute resources**: Select the cluster, queue, and processor settings
6. **Run the jobs**: Bulk silicon and the relaxation of the wire, then the band structure and the DOS of the relaxed wire
7. **Retrieve results**: The period of the relaxed wire and the band gaps
8. **Compare with the manuscript**: Print the band gaps beside Table II's, plot the bands and the DOS beside Fig. 8 (left)

## 4. Calculation parameters

| | this tutorial | Aradi |
|---|---|---|
| Code | Quantum ESPRESSO | DFTB+, a density functional based tight-binding (DFTB) code, for the geometry; CRYSTAL for the band gaps and the bands |
| Geometry | PBE, variable-cell relaxation of one period: the atoms and the period along the wire | DFTB, two periods: the atoms and the length along the wire |
| Band gaps and bands | HSE06 | one-parameter global hybrid, developed and tested for bulk Si (1.16 eV) |
| Pseudopotentials | ultrasoft (GBRV) | not stated |
| Cutoff | 40 / 200 Ry | not stated |
| Cell | one period, Si₁₈H₁₂, c = 3.867 Å before the relaxation (Standata Si, a = 5.468 Å); about 18 Å between wire images | DFTB: two periods, Si₃₆H₂₄, 1000 Å perpendicular to the wire; CRYSTAL: one period, periodic along the wire only; lattice constant not stated |
| k-points, relaxation | 1×1×8 on one period | 1×1×4 on two periods |
| k-points, band structure | 1×1×8 and 21 points along Γ–Z; q-points 1×1×4 for the exact exchange | not stated |
| k-points, DOS | 1×1×8 for the wire, run as 2×2×8; 8×8×8 for bulk Si | not stated |
| Forces | 1×10⁻⁴ a.u. (`forc_conv_thr = 2e-4` Ry/Bohr) | 1×10⁻⁴ a.u. |

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the band gap and DOS notebook:

```
other/materials_designer/specific_examples/passivation_edge_nanowire_silicon_SIMULATION.ipynb
```

### 5.2. Configure parameters

Cell 1.2 sets the material names, the workflows, the compute resources and the energy range of the plot:

```python
from datetime import datetime
from mat3ra.ide.compute import QueueName

ORGANIZATION_NAME = None  # set to your organization name (full or partial); otherwise, your default one is used
FOLDER = "./uploads"
WIRE_NAME = "Si nanowire 110 H-passivated one period"  # saved by the structure notebook
RELAXED_WIRE_NAME = "Si nanowire 110 H-passivated relaxed one period"
BULK_NAME = "Silicon"  # Standata

APPLICATION_NAME = "espresso"
RELAX_WORKFLOW_SEARCH_TERM = "variable_cell_relaxation.json"
BANDS_WORKFLOW_SEARCH_TERM = "band_structure_hse.json"
DOS_WORKFLOW_SEARCH_TERM = "band_gap_dos_hse.json"

CLUSTER_NAME = None  # specify full or partial name i.e. "cluster-001" to select
QUEUE_NAME = QueueName.OF
PPN = None  # None uses the selected queue's maximum cores per job on the selected cluster
NPOOLS = 4  # Quantum ESPRESSO k-point pools; must divide the cores per job and not exceed any job's k-points
TIME_LIMIT = "24:00:00"

timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
POLL_INTERVAL = 60  # seconds

ENERGY_WINDOW = (-4.0, 6.0)  # eV, the energy range of Fig. 8
```

Cell 1.3 sets the cutoffs, the relaxation, the preliminary SCF verbosity, the HSE06 stress (off), and the k-point and
q-point grids; the comments name the manuscript's settings:

```python
# manuscript: geometry with DFTB, gaps with CRYSTAL and a one-parameter global hybrid fitted to bulk Si;
# ours: geometry with PBE, gaps with HSE06, GBRV ultrasoft pseudopotentials at their tested cutoffs
ECUTWFC = 40  # Ry
ECUTRHO = 200  # Ry

# forces below 1e-4 Ha/Bohr as in the manuscript, in QE's Ry/Bohr; the atoms and the period along the wire relax
RELAXATION_SETTINGS = {"control": {"forc_conv_thr": 2e-4, "nstep": 100}, "cell": {"cell_dofree": "z"}}
PRELIMINARY_SCF_SETTINGS = {"control": {"verbosity": "high"}}  # so pw.x prints the crystal k-points the HSE run uses
HSE_SETTINGS = {"control": {"tstress": False}}  # Quantum ESPRESSO computes no hybrid-functional stress with pools
RELAX_KGRID = [1, 1, 8]  # manuscript: 1x1x4 on two periods
BANDS_KGRID = [1, 1, 8]
QGRID = [1, 1, 4]  # HSE exchange q-grid; each dimension divides the one of BANDS_KGRID
KPATH_STEPS = 20  # even, so every k − q of the path stays on the path for the 1x1x4 q-grid
# a job is reused by material, this name and BANDS_KGRID, so rename it after changing QGRID or KPATH_STEPS
BANDS_WORKFLOW_NAME = "Band Structure HSE06 Si nanowire"
DOS_KGRID = [1, 1, 8]  # the workflow runs odd dimensions as the next even, so 2x2x8
BULK_KGRID = [8, 8, 8]

RELAX_UNIT = "pw_vc-relax"
PRELIMINARY_SCF_UNIT = "pw_scf"
BANDS_HSE_UNIT = "pw_scf_bands_hse"
BANDS_UNIT = "bands"
DOS_HSE_UNIT = "pw_scf_hse"
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu. The notebook first
[authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md), then runs the steps listed in section 3.

### 5.4. Monitor progress

The notebook polls the bulk silicon job and the relaxation of the wire, then the band structure and DOS jobs of the
relaxed wire.

### 5.5. Analyze results

Section 7.1 of the notebook prints the period along the wire before and after the relaxation. Section 8.1 prints the
band gaps twice: the notebook's own values first, then the same lines headed "Band gap from the manuscript". Section 8.2
shows the manuscript's Fig. 8 (left) and, below it, the same plot from the band structure and DOS jobs: the DOS mirrored
on the left, its projection on the H atoms dotted, and the bands along Γ–Z on the right, from −4 to 6 eV, with each
job's valence-band maximum (VBM) at 0.

## 6. Expected results

### 6.1. Comparison with published results

| quantity | PBE | manuscript |
|---|---|---|
| band gap of the wire | 1.48 eV, direct, VBM and conduction-band minimum (CBM) at Γ | 2.21 eV, direct (Table II, one-parameter global hybrid) |

![Bands and DOS of the H-passivated Si nanowire from the manuscript and with PBE](../../../images/tutorials/materials/passivation/passivation_edge_nanowire_silicon/8-manuscript-vs-ours-bands-dos.webp "DOS (solid), DOS projected on the H atoms (dotted) and bands along Γ–Z of the H-passivated ⟨110⟩ Si nanowire, r = 0.51 nm, −4 to 6 eV, VBM at 0: Aradi et al. 2007, Fig. 8, left (left), and PBE (right)")

## 7. Customization options

### 7.1. Adjust the k-point grids and the path

`RELAX_KGRID`, `BANDS_KGRID`, `DOS_KGRID` and `BULK_KGRID` in cell 1.3 set the k-point grids of the relaxation, of the
PBE calculation whose k-points the HSE06 band structure uses, of the DOS of the wire and of bulk silicon. The
"Band Gap + DoS - HSE" workflow runs an odd dimension as the next even one, so the wire's 1×1×8 runs as 2×2×8.

`QGRID` is the grid of q-points on which the band structure job evaluates the exact exchange, and `KPATH_STEPS` the
number of steps from Γ to Z. For every listed k-point and every q-point, Quantum ESPRESSO needs k − q among the listed
k-points. On the grid, this holds when each dimension of `QGRID` divides the one of `BANDS_KGRID`. On the path, it
holds when the third value of `QGRID` divides 2 × `KPATH_STEPS`: the path points lie 0.5 / `KPATH_STEPS` apart along
the wire, in crystal coordinates, and the q-points 1 / the third value of `QGRID` apart, a whole number of path steps.
For the default 1×1×4, `KPATH_STEPS` is even.

The notebook reuses a job with the same material, workflow name and k-point grid, so after a change to `QGRID` or
`KPATH_STEPS`, `BANDS_WORKFLOW_NAME` in cell 1.3 must change for a new job to run.

### 7.2. Adjust computational resources

`QUEUE_NAME`, `PPN`, `NPOOLS` and `TIME_LIMIT` in cell 1.2 set the queue, the cores, the k-point pools and the time
limit of every job; `NPOOLS` must divide the cores and not exceed the number of k-points of any job. The default,
`CLUSTER_NAME = None`, uses the account's first listed cluster; setting a specific name picks that cluster instead, and
a name that is not available makes the notebook stop and list the ones that are.

## 8. Troubleshooting

### 8.1. Material not found

If `Si nanowire 110 H-passivated one period` is not found in the `uploads` folder or the account's materials
collection, run the [structure tutorial](passivation-edge-nanowire-silicon.md) first; the name must match exactly.

### 8.2. No cluster available

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to, and section 5.2 stops.

### 8.3. Band gap far from the published value

The manuscript's band gaps come from a one-parameter global hybrid developed and tested for bulk Si, this tutorial's
from HSE06. The bulk silicon lines of section 8.1 of the notebook compare the two functionals on bulk Si, for which the
manuscript's hybrid gives 1.16 eV; the wire's pair is read beside the bulk pair. The HSE06 gap also depends on the
q-point grid of the exact exchange: open the band structure and the DOS jobs of the wire, select the
[Files tab]({{ interface_url }}/jobs/ui/files-tab/), and check that `pw_scf_bands_hse.in` and `pw_scf_hse.in` set
`input_dft` to `'hse'` and `nqx1`, `nqx2`, `nqx3` to 1, 1 and 4 with the default grids.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook calculates the band gap and the density of states of the H-passivated Si nanowire.
Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/passivation_edge_nanowire_silicon_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
