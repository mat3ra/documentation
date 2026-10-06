---
tags:
  - 2D
  - graphene
  - boron-nitride
  - interface
  - band-structure
  - stacking
  - C-2D-INT-Z

hide:
  - tags
# YAML header
render_macros: true
---

# Graphene on h-BN (Stacking Energy and Band Gap)

## 1. Introduction

This tutorial calculates the total energy and band structure of the seven stacking configurations of graphene on h-BN created in the structure tutorial, at a fixed interlayer distance of 3.4 Å, reproducing results from the following manuscript.

!!!note "Manuscript"
    **Gianluca Giovannetti, Petr A. Khomyakov, Geert Brocks, Paul J. Kelly and Jeroen van den Brink**
    **Substrate-induced band gap in graphene on hexagonal boron nitride: Ab initio density functional calculations**
    Physical Review B 76, 073103 (2007)
    [DOI: 10.1103/PhysRevB.76.073103](https://doi.org/10.1103/PhysRevB.76.073103){:target='_blank'} [@Giovannetti2007]

The seven stackings slide between the three configurations of Fig. 1 — (a) AA, (b) AB, (c) BA; the energies and band gaps compared are Fig. 2 and Fig. 4.

![The three stackings of graphene on h-BN](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/giovannetti2007-fig1-stackings.webp "The three stackings of graphene on h-BN (Giovannetti et al. 2007, Fig. 1): (a) C over B and N, (b) C over N and a hexagon centre, (c) C over B and a hexagon centre")

![Total energy vs interlayer distance for the three stackings](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/giovannetti2007-fig2-energy-vs-distance.webp "Total energy vs interlayer distance for the three stackings (Giovannetti et al. 2007, Fig. 2; a = AA, b = AB, c = BA)")

![Gap at K vs interlayer distance for the three stackings](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/giovannetti2007-fig4-gap-vs-distance.webp "Gap at K vs interlayer distance for the three stackings (Giovannetti et al. 2007, Fig. 4; a = AA, b = AB, c = BA)")

## 2. Prerequisites

Run the [structure creation tutorial](interface-2d-2d-graphene-boron-nitride.md) first. Its `interface_2d_2d_boron_nitride_graphene.ipynb` notebook names the seven stacking configurations (listed on that page) that this notebook loads.

## 3. Workflow overview

The notebook runs the Standata `band_structure_dos.json` workflow, which chains `pw_scf` (total energy), `pw_bands` (band structure), `pw_nscf` and `projwfc` (density of states, left on the job and not plotted).

One workflow is created per material, so seven jobs run in total. The jobs run one after another: the notebook waits for each job to finish before submitting the next. Re-running the notebook finds each already-finished job by its material and workflow name and reuses it instead of resubmitting.

Both sheets are held rigid at 3.4 Å; the workflow includes no relaxation step, matching the paper's own fixed-distance calculation.

## 4. Calculation parameters

Cell 1.2 sets the materials, the cluster and the workflow name:

```python
from datetime import datetime
from mat3ra.ide.compute import QueueName

ORGANIZATION_NAME = None  # set to your organization name (full or partial); otherwise, your default one is used
FOLDER = "./uploads"

# Names saved by the structure notebook; the symmetric stackings carry their Jung 2015 / Giovannetti 2007 label
MATERIALS = {
    "Gr/hBN d3.4 shift 0of6 BA": {"shift": 0, "stacking": "BA"},
    "Gr/hBN d3.4 shift 1of6": {"shift": 1, "stacking": None},
    "Gr/hBN d3.4 shift 2of6 AA": {"shift": 2, "stacking": "AA"},
    "Gr/hBN d3.4 shift 3of6": {"shift": 3, "stacking": None},
    "Gr/hBN d3.4 shift 4of6 AB": {"shift": 4, "stacking": "AB"},
    "Gr/hBN d3.4 shift 5of6": {"shift": 5, "stacking": None},
    "Gr/hBN d3.4 shift 6of6 BA": {"shift": 6, "stacking": "BA"},
}

WORKFLOW_SEARCH_TERM = "band_structure_dos.json"
MY_WORKFLOW_NAME = "Band Structure + DOS"
APPLICATION_NAME = "espresso"

CLUSTER_NAME = "001"  # specify full or partial name i.e. "cluster-001" to select
QUEUE_NAME = QueueName.D
PPN = 1
TIME_LIMIT = "01:00:00"

timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
POLL_INTERVAL = 60  # seconds
```

Cell 1.3 sets the DFT parameters:

```python
MODEL_SUBTYPE = "lda"
FUNCTIONAL = "pz"  # Giovannetti et al. 2007 use LDA: GGA gives essentially no interlayer binding
PSEUDOPOTENTIAL_TYPE = "us"  # GBRV ultrasoft, the only LDA family the platform publishes for B, C and N
ECUTWFC = 40   # Ry, GBRV's tested cutoff
ECUTRHO = 200  # Ry, GBRV's tested charge-density cutoff

KGRID = [36, 36, 1]  # Giovannetti et al. 2007; a multiple of 3 keeps K on the mesh
SMEARING_SETTINGS = {"degauss": 0.001}  # Ry; the gaps compared are 30-80 meV
KPATH_STEPS = 40
MODEL_TAG = f"{FUNCTIONAL}-{PSEUDOPOTENTIAL_TYPE} {ECUTWFC}-{ECUTRHO}Ry k{KGRID[0]} p{KPATH_STEPS} g{SMEARING_SETTINGS['degauss']}"

SCF_UNIT = "pw_scf"
NSCF_UNIT = "pw_nscf"
BANDS_UNIT = "pw_bands"
NUMBER_OF_OCCUPIED_BANDS = 8  # 16 valence electrons: C 4 + 4, B 3, N 5

KPATH = [
    {"point": "Γ", "steps": KPATH_STEPS},
    {"point": "K", "steps": KPATH_STEPS},
    {"point": "M", "steps": KPATH_STEPS},
    {"point": "Γ", "steps": 1},
]
```

| paper | this notebook |
|---|---|
| LDA | LDA |
| VASP, plane waves, 600 eV | GBRV ultrasoft, 40/200 Ry |
| 36×36×1 | 36×36×1 |
| tetrahedron | Gaussian 0.001 Ry |
| cell a = 2.445 Å (graphene LDA, h-BN compressed) | 2.509 Å (h-BN unstrained, graphene +1.79%) |
| 4 h-BN layers | 1 |
| dipole correction | none |
| vacuum 12–15 Å | 23.4 Å |

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open:

```
other/materials_designer/specific_examples/interface_2d_2d_boron_nitride_graphene_SIMULATION.ipynb
```

### 5.2. Configure parameters

In cell 1.2, set `ORGANIZATION_NAME` and `CLUSTER_NAME` to the account's organization and cluster. `MATERIALS` already lists the seven names the structure notebook saves; leave it unchanged unless a material was renamed.

### 5.3. Run the notebook

Select *Run* > *Run All*. The notebook [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md), loads the seven materials and prints their provenance, saves them to the platform, configures one workflow per material, creates the compute configuration, then submits the seven jobs one at a time. Each job blocks the notebook until it finishes, about 2 minutes for a four-atom cell, run on queue D with one core. Once all seven have finished, the notebook retrieves the band structures, total energies and gaps at K, and prints the comparison table.

### 5.4. Re-run the notebook

Running the notebook again finds the seven jobs already finished by material and workflow name and reuses them rather than resubmitting.

## 6. Expected results

At d = 3.4 Å, Giovannetti et al. (Fig. 4) give gaps at K of AA ≈ 80 and BA ≈ 30 meV read off Fig. 4 (±5 meV), AB = 46 meV, the paper's value at its 3.40 Å equilibrium, and Fig. 2 gives the energy ordering E(BA) < E(AB) < E(AA), with Fig. 2 read at 3.4 Å as BA ≈ −0.055, AB ≈ −0.045, AA ≈ −0.035 eV per cell.

| shift | stacking | ΔE vs 0of6 (meV) | gap (meV) | paper gap (meV) | deviation |
|---|---|---|---|---|---|
| 0 | BA | 0.0 | 33.1 | 30 | +10 % |
| 1 | bridge | +11.1 | 65.5 | | |
| 2 | AA | +21.2 | 94.1 | 80 | +18 % |
| 3 | bridge | +16.7 | 77.8 | | |
| 4 | AB | +16.4 | 54.9 | 46 | +19 % |
| 5 | bridge | +9.6 | 33.3 | | |
| 6 | BA | −0.0 | 33.1 | 30 | +10 % |

Shift 6 is the same structure as shift 0 one period later and reproduces it to 1 μeV in energy and in gap.

![The seven Gr/h-BN stackings](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/5-jl-result-preview.webp "The seven stackings as built by the structure notebook, shift 0 to 6")

![Total energy along the sliding path (this notebook)](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/energy-along-sliding-path.webp "Total energy along the sliding path (this notebook)")

![Direct gap along the sliding path (this notebook)](../../../images/tutorials/materials/interfaces/interface_2d_2d_graphene_boron_nitride/gap-along-sliding-path.webp "Direct gap along the sliding path (this notebook)")

The paper's gaps at its own equilibrium distances are AA 56 meV at 3.50 Å, AB 46 meV at 3.40 Å and BA 53 meV at 3.22 Å.

The notebook's final cell prints this table with the measured ΔE, gap and deviation columns, and plots ΔE and the gap along the sliding path.

## 7. Customization options

`KGRID` and `KPATH_STEPS` control the k-point sampling of the SCF/NSCF grid and the band-structure path; `ECUTWFC` and `ECUTRHO` set the plane-wave cutoffs; `SMEARING_SETTINGS["degauss"]` controls the Gaussian smearing width. `MODEL_TAG` is built from these and is part of every workflow's name, so changing any of them creates new jobs rather than reusing the ones already run.

To add a material, add a name to `MATERIALS` with its shift index and stacking label (`"AA"`, `"AB"`, `"BA"` or `None` for a bridge point); the name must match one saved by the structure notebook.

## 8. Troubleshooting

### 8.1. Material not found

`ValueError: No material named …` means the structure notebook has not been run, or the name in `MATERIALS` does not match. Run the [structure tutorial](interface-2d-2d-graphene-boron-nitride.md) first; the names must match cell 1.2 exactly.

## 9. Interactive JupyterLite notebook

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/interface_2d_2d_boron_nitride_graphene_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
