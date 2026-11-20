---
tags:
  - silicon
  - hydrogen
  - adatoms
  - Si(100)
  - surface reconstruction
  - diffusion-barrier
  - nudged-elastic-band
  - D-2D-ADA

hide:
  - tags
# YAML header
render_macros: true
---

# H Adatom Intradimer Diffusion Barrier on Si(100)

## 1. Introduction

This tutorial calculates the diffusion barrier of a single hydrogen (H) adatom between the two atoms of a dimer on
the reconstructed Si(100)2×1 surface, reproducing results from the following manuscript:

!!!note "Manuscript"
    U. Hansen and P. Vogl, "Hydrogen passivation of silicon surfaces: A classical molecular-dynamics study",
    Physical Review B 57, 13295 (1998).
    [DOI:10.1103/PhysRevB.57.13295](https://doi.org/10.1103/PhysRevB.57.13295){:target='_blank'}.
    [@Hansen1998]

This tutorial builds upon the [H Adatom on Si(100)](defect-point-adatom-silicon-hydrogen.md) tutorial, where the
slabs with the H on the upper atom of a dimer (the start) and on its dimer partner (the intradimer end) are created.
Here, both are relaxed with the Perdew–Burke–Ernzerhof (PBE) functional on the platform, and a climbing-image
[nudged elastic band]({{ reference_url }}/models/auxiliary-concepts/nudged-elastic-band/) (NEB) calculation runs
between the two minima. The barrier is compared with Table V of the manuscript.

The figure below shows Fig. 1 of the manuscript (left) beside the start structure with both
H sites marked (right); the path computed here is the intradimer path (a):

![Fig. 1 of the manuscript and the H sites of this tutorial](../../../images/tutorials/materials/defects/defect_point_adatom_silicon_hydrogen/fig1-vs-our-sites.webp "Hansen and Vogl 1998, Fig. 1 (left), and the start structure with both H sites marked (right)")

## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Follow the [H Adatom on Si(100)](defect-point-adatom-silicon-hydrogen.md) tutorial, using the
   `defect_point_adatom_silicon_hydrogen.ipynb` notebook embedded in its section 6, to create and save
   `H on Si(100) start` and `H on Si(100) intradimer end`, OR
2. Have the two materials saved in the `uploads` folder or in the account's materials collection

## 3. Workflow overview

The barrier calculation consists of the following steps:

1. **Set up the environment and parameters**: Configure material names, the Density Functional Theory (DFT)
   model, and compute resources
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load materials**: Import the start and the ends by name and print their atom counts
4. **Configure the model**: One DFT model for the relaxations and the NEB
5. **Configure compute resources**: Select the cluster, queue, nodes, and processor settings
6. **Relax the start and the ends**: Each material is relaxed with PBE on the platform, every atom free
7. **Run the nudged elastic band**: One climbing-image NEB per path, from the relaxed start to the relaxed end
8. **Retrieve results**: The barrier from the start and from the end, the largest image error, and the two Si
   atoms nearest the H at the climbing image
9. **Compare with the manuscript**: Print the values beside Table V of the manuscript and plot the energy profile

## 4. Calculation parameters

| | This tutorial | Hansen & Vogl |
|---|---|---|
| Energy | PBE, Quantum ESPRESSO 7.5 | classical Si–H potential: Tersoff-3 (Si–Si), Brenner (H–H), a fitted Si–H term |
| Pseudopotentials, cutoff | ultrasoft (GBRV), 40 / 200 Ry | — |
| k-points, smearing | 2×3×1, Gaussian 0.005 Ry | — |
| Spin | spin-polarized, total magnetization 1 | — |
| Slab | 64 Si in eight layers, 2×2, bottom face bare | 144 Si in eight layers |
| Dimers | buckled by 0.65 Å (Standata) | symmetric |
| Transition state | climbing image, one intermediate image, path threshold 0.1 eV/Å | maximum along the saddle line of a map of height-minimised energies |
| Relaxation | all atoms, force components below 10⁻³ Ry/Bohr | all Si atoms and the H height, forces below 10⁻⁴ eV/Å |

## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the barrier notebook:

```
other/materials_designer/specific_examples/defect_point_adatom_silicon_hydrogen_SIMULATION.ipynb
```

### 5.2. Configure parameters

The parameters cells set the material names, the compute resources, and the DFT model:

```python
START_NAME = "H on Si(100) start"
END_NAME_BY_PATH = {
    "intradimer": "H on Si(100) intradimer end",
    # "intrarow": "H on Si(100) intrarow end",
    # "inter-row": "H on Si(100) inter-row end",
}

CLUSTER_NAME = None
QUEUE_NAME = QueueName.OF
NODES = 1
PPN = 60
TIME_LIMIT_HOURS = 12
# pw.x and neb.x stop 10 minutes before TIME_LIMIT and write their files
MAX_SECONDS = TIME_LIMIT_HOURS * 3600 - 600

APPLICATION_VERSION = "7.5"
FUNCTIONAL = "pbe"
PSEUDOPOTENTIAL_TYPE = "us"
ECUTWFC = 40   # Ry
ECUTRHO = 200  # Ry
# for the 64-Si slab; [1, 2, 1] for the manuscript's 144-Si slab
KGRID = [2, 3, 1]
QE_SYSTEM_SETTINGS = {
    "degauss": 0.005,
    "nspin": 2,
    "tot_magnetization": 1,
    "starting_magnetization": 0.5,
}
RELAXATION_SETTINGS = {"forc_conv_thr": 1e-3, "max_seconds": MAX_SECONDS}
N_IMAGES = 1
NEB_PATH_SETTINGS = {"nstep_path": 50, "minimum_image": True}
```

### 5.3. Run the notebook

Execute all cells by selecting *Run* > *Run All Cells* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Monitor progress

The notebook polls the relaxation jobs on the platform, then the NEB jobs.

### 5.5. Analyze results

The last cells print the results of each path beside the manuscript's values and plot the energy profile (section 6.1).

## 6. Expected results

Table V of the manuscript gives the relaxed intradimer barrier, path (a) of Fig. 1, as 1.1 eV with its classical
potential, and quotes 1.2 eV from the local density approximation (LDA) of Vittadini et al. (1993) and 1.9 eV from
the generalized gradient approximation (GGA) of Nachtigall and Jordan (1995). Along this path the dimer bond
stretches from 2.37 Å to 3.23 Å (p. 13298).

The notebook prints the barrier from the start and from the end; its dimer bond at the saddle is the distance between
the two Si atoms nearest the H at the climbing image.

### 6.1. Comparison with published results

The intradimer run prints:

```
Intradimer barrier, relaxed, from the start: 1.29 eV, from the end: 1.27 eV, Hansen & Vogl 1998: 1.1 eV; Vittadini et al. 1993 (LDA) 1.2, Nachtigall & Jordan 1995 (GGA) 1.9, via Hansen & Vogl Table V
Largest image error, intradimer path: 0.097 eV/Å
Two Si nearest the H at the climbing image, intradimer path: 1.73 Å and 1.81 Å
Dimer bond at the saddle, H on Si(100): 2.32 Å, Hansen & Vogl 1998: 3.23 Å
```

The figure below shows the energy profile of the NEB computed here, with the manuscript's barrier as a gray square
at the reaction coordinate of the highest image:

![Intradimer energy profile of an H adatom on Si(100)](../../../images/tutorials/materials/defects/defect_point_adatom_silicon_hydrogen/energy-profile-comparison.webp "Intradimer diffusion of an H adatom on Si(100): blue line, climbing-image NEB of this tutorial, barrier 1.29 eV; gray square, Hansen & Vogl 1998, Table V, relaxed, barrier 1.1 eV")

### 6.2. Difference from the manuscript

These settings differ from the manuscript's:

| Setting | Hansen & Vogl | This tutorial | Parameter to change |
|---|---|---|---|
| Energy | classical Si–H potential: Tersoff-3 (Si–Si), Brenner (H–H), a fitted Si–H term (Sec. II, p. 13296) | PBE, GBRV ultrasoft pseudopotentials, 40 / 200 Ry | — |
| Dimers | symmetric (Sec. III A, p. 13297) | buckled by 0.65 Å, Standata's slab as is | — |
| Slab | 144 Si in eight layers (Sec. IV, p. 13299) | 64 Si in eight layers, 2×2; H 7.73 Å from its periodic images | 3×3 `SUPERCELL_MATRIX` in the [structure notebook](defect-point-adatom-silicon-hydrogen.md) (144 Si, 11.60 Å), with `KGRID = [1, 2, 1]` |
| Transition state | maximum along the saddle line of a map of height-minimised energies over the surface cell (Sec. III C, p. 13298) | climbing-image NEB along one path, one intermediate image | — |
| Force criterion | below 10⁻⁴ eV/Å for all atoms (Sec. IV, p. 13299) | each force component below 10⁻³ Ry/Bohr in the relaxations; largest image error below 0.1 eV/Å on the path | `forc_conv_thr` in `RELAXATION_SETTINGS`; `path_thr` added to `NEB_PATH_SETTINGS` |
| Spin | none, classical potential | spin-polarized, total magnetization 1 | — |

## 7. Customization options

The [structure notebook](defect-point-adatom-silicon-hydrogen.md) creates `H on Si(100) intrarow end` and
`H on Si(100) inter-row end` when their entries in `SITE_BY_MATERIAL_NAME` are uncommented. Listing a path in
`END_NAME_BY_PATH` runs the relaxation of its end and its NEB from the relaxed start with the same settings; the
start is relaxed once.

## 8. Interactive JupyterLite notebook

The following JupyterLite notebook demonstrates the workflow for calculating the intradimer diffusion barrier of an
H adatom on Si(100). Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_adatom_silicon_hydrogen_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 9. References
