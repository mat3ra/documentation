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
9. **Compare with the manuscript**: Print the values beside Table V of the manuscript

## 4. Calculation parameters

| | This tutorial | Hansen & Vogl |
|---|---|---|
| Energy | PBE, Quantum ESPRESSO 7.5 | classical Si–H potential: Tersoff-3 (Si–Si), Brenner (H–H), a fitted Si–H term |
| Pseudopotentials, cutoff | ultrasoft (GBRV), 40 / 200 Ry | — |
| k-points, smearing | 2×3×1, Gaussian 0.005 Ry | — |
| Spin | spin-polarized, total magnetization 1 (one unpaired electron) | — |
| Slab | 64 Si in eight layers, 2×2, bottom face bare | 144 Si in eight layers |
| Dimers | buckled by 0.65 Å (Standata) | symmetric |
| Transition state | climbing image, one intermediate image, path threshold 0.1 eV/Å | maximum along the saddle line of a map of height-minimised energies |
| Relaxation | all atoms, force components below 10⁻³ Ry/Bohr | all Si atoms and the H height, forces below 10⁻⁴ eV/Å |

A material already relaxed with the same k-grid, or still relaxing, is reused, and so is an NEB job of the same path
from the same start that is queued, running or finished with the same k-grid, also when the application version or a
setting of cell 1.4, `N_IMAGES` included, has changed.

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
PPN = 36
TIME_LIMIT_HOURS = 24
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

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook first [authenticates with the platform]({{ interface_url }}/jupyterlite/authentication.md),
then runs the steps listed in section 3.

### 5.4. Monitor progress

The notebook polls the relaxation jobs on the platform, then the NEB jobs.

### 5.5. Analyze results

The last cells print, for each path, the barriers beside Table V of the manuscript, the largest NEB image error,
the two Si atoms nearest the H at the climbing image and, for the intradimer path, the dimer bond at the saddle
(section 6.1).

## 6. Expected results

Table V of the manuscript gives the relaxed intradimer barrier, path (a) of Fig. 1, as 1.1 eV with its classical
potential, and quotes 1.2 eV from the local density approximation (LDA, its ref. 36) and 1.9 eV from the generalized
gradient approximation (GGA, its ref. 13). In relaxed intradimer diffusion the dimer bond stretches from 2.37 Å to
3.23 Å (p. 13298); the notebook compares the latter with the distance between the two Si atoms nearest the H at the
climbing image. The start and the end sit on different atoms of a buckled dimer, so the barrier is printed from each.

### 6.1. Comparison with published results

The intradimer run prints:

```
Intradimer barrier, relaxed, from the start: <J3> eV, from the end: <J3> eV, Hansen & Vogl 1998: 1.1 eV; ref. 36 (LDA) 1.2, ref. 13 (GGA) 1.9, via Hansen & Vogl Table V
Largest image error, intradimer path: <J3> eV/Å
Two Si nearest the H at the climbing image, intradimer path: <J3> Å and <J3> Å
Dimer bond at the saddle, H on Si(100): <J3> Å, Hansen & Vogl 1998: 3.23 Å
```

### 6.2. Difference from the manuscript

These settings differ from the manuscript's:

| Setting | Hansen & Vogl | This tutorial | Parameter to change |
|---|---|---|---|
| Energy | classical Si–H potential: Tersoff-3 (Si–Si), Brenner (H–H), a fitted Si–H term (Sec. II, p. 13296) | PBE, GBRV ultrasoft pseudopotentials, 40 / 200 Ry | — |
| Dimers | symmetric (Sec. III A, p. 13297) | buckled by 0.65 Å, Standata's slab as is | — |
| Slab | 144 Si in eight layers (Sec. IV, p. 13299) | 64 Si in eight layers, 2×2; H 7.73 Å from its periodic images | 3×3 `SUPERCELL_MATRIX` in the [structure notebook](defect-point-adatom-silicon-hydrogen.md) (144 Si, 11.60 Å), with `KGRID = [1, 2, 1]`, cell 1.4 |
| Transition state | maximum along the saddle line of a map of height-minimised energies over the surface cell (Sec. III C, p. 13298) | climbing-image NEB along one path, one intermediate image | — |
| Force criterion | below 10⁻⁴ eV/Å for all atoms (Sec. IV, p. 13299) | each force component below 10⁻³ Ry/Bohr in the relaxations; largest image error below 0.1 eV/Å on the path | `forc_conv_thr` in `RELAXATION_SETTINGS`; `path_thr` added to `NEB_PATH_SETTINGS`, cell 1.4 |
| Spin | none, classical potential | spin-polarized, total magnetization 1 | — |
| Unrelaxed barriers | Table V, Si frozen: 2.6 / 2.3 / 3.2 eV for (a) / (b) / (c) (p. 13298) | not computed | —, the platform's NEB keeps no fixed atoms |

Which of these settings moves the barrier is not tested here.

## 7. Customization options

### 7.1. Run the intrarow and inter-row paths

The [structure notebook](defect-point-adatom-silicon-hydrogen.md) creates `H on Si(100) intrarow end` and
`H on Si(100) inter-row end` when their entries in `SITE_BY_MATERIAL_NAME` are uncommented. Listing a path in
`END_NAME_BY_PATH`, cell 1.2, runs the relaxation of its end and its NEB from the relaxed start with the same
settings; the start is relaxed once. On the 2×2 slab the intrarow end is half the cell length along the row away
from the start, in either direction; the two directions are mirror images through the start dimer.

### 7.2. Adjust computational resources

The compute settings apply to the relaxations and the NEBs: by default, each job runs on one node of the OF queue
with 36 cores for up to 24 hours (`TIME_LIMIT_HOURS`); pw.x and neb.x stop 10 minutes earlier (`MAX_SECONDS`) and
write their files. The default, `CLUSTER_NAME = None`, uses the account's first listed cluster; setting it to a
cluster's full host name uses that cluster without listing. The OF queue adds several compute nodes at once as jobs
arrive; `PPN` sets the cores per node, up to the queue's maximum on the cluster (36 to 60; 36 fits every cluster).

### 7.3. Use the manuscript's settings

The manuscript's slab size is the 3×3 `SUPERCELL_MATRIX` of the structure notebook, with `KGRID = [1, 2, 1]` in
cell 1.4; a new `KGRID` starts new relaxation and NEB jobs. neb.x stops after `nstep_path` steps, converged or not,
and the path is converged when the largest NEB image error is below 0.1 eV/Å.

## 8. Troubleshooting

### 8.1. Material not found

If one of the materials is not found in the `uploads` folder or the account's materials collection, run the
[H Adatom on Si(100)](defect-point-adatom-silicon-hydrogen.md) tutorial first, and check that its `uploads` folder
holds the materials under the names of cell 1.2.

### 8.2. No cluster available

If section 5.1 of the notebook prints an empty list of clusters, there is nothing to submit to, and section
5.2 stops. A cluster has to be available to the account before the notebook can run.

### 8.3. No NEB barrier on the first run

The platform's access token lasts one hour and can expire while the notebook waits for the relaxation and NEB jobs
in sections 6 and 7. The jobs keep running. Restart the kernel and run all cells again (*Kernel* > *Restart Kernel
and Run All Cells*): the notebook asks for a new login and picks up the running and finished jobs.

### 8.4. Barrier far from the published value

Check the atom counts printed in section 3 of the notebook first:

```
H on Si(100) start: 65 atoms
H on Si(100) intradimer end: 65 atoms
```

Then view the relaxed materials on the account: the H of the relaxed start should still sit on the Si atom it caps
in the structure notebook, and the H of the relaxed end on its dimer partner.

## 9. Interactive JupyterLite notebook

The following JupyterLite notebook demonstrates the workflow for calculating the intradimer diffusion barrier of an
H adatom on Si(100). Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_adatom_silicon_hydrogen_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## 10. References
