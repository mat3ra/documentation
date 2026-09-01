---
tags:
  - graphene
  - nickel
  - interface
  - registry
  - adsorption
  - total-energy
  - machine-learned force field
  - MACE
  - C-2D-INT-Z

hide:
  - tags
# YAML header
render_macros: true
---

# Gr/Ni(111) Registry and Separation

## 1. Introduction

This tutorial computes which registry of graphene on Ni(111) is the most favorable and how far the
film sits above the surface, using the interface created in the
[structure creation tutorial](optimization-interface-film-xy-position-graphene-nickel.md), and
compares the result against the following manuscript.

!!!note "Manuscript"
    **Arjun Dahal, Matthias Batzill**,
    "Graphene-nickel interfaces: a review" Nanoscale, 6(5), 2548 (2014)
    [DOI: 10.1039/c3nr05279f](https://doi.org/10.1039/c3nr05279f) [@Dahal2014]

### 1.1. What the manuscript reports

Graphene and Ni(111) are lattice-matched to about one percent, so instead of a moiré pattern the
film locks into one of a few high-symmetry registries: **top-fcc**, **top-hcp**, **bridge-top**, and
the **hollow (fcc-hcp)** arrangement. The manuscript's key structural facts:

* chemisorbed graphene sits ~0.21 nm above the top Ni plane — far below the ~0.33 nm van der Waals
  spacing of graphite — with top-fcc the favorable registry;
* the hollow registry does not chemisorb: its minimum lies out near the van der Waals distance;
* the registries are separated by only tens of meV per carbon atom, which is why each one must be
  evaluated at its own optimal separation rather than at a shared height.

### 1.2. What is compared, and what is not

The manuscript's adsorption energies come from dispersion-corrected calculations beyond semi-local
DFT, so absolute binding energies are not comparable here. What survives transfer between methods —
and what this tutorial reproduces — are the **ordering of the registries** and the **equilibrium
separations**, both computed as differences or geometric quantities with identical settings across
every configuration.

## 2. Prerequisites

Run the
[structure creation tutorial](optimization-interface-film-xy-position-graphene-nickel.md) first.
Its notebook builds the Gr/Ni(111) interface and saves it into the `uploads` folder as
`Graphene_Nickel_interface`. The simulation notebook loads it back by exactly that name and stops
if it is missing rather than substituting a different material. The reduced interface cell is the
1x1 match: 2 carbon and 4 nickel atoms.

## 3. What is calculated

The comparison runs in two tiers:

1. **Energy vs. separation with MACE (fast, local).** The film is placed at each of the four
   registries — the surface sites are located from the top three Ni layers of the structure itself —
   and rigidly moved through a range of film-substrate distances. The
   [MACE-MP](https://github.com/ACEsuit/mace) machine-learned force field with D3 dispersion
   evaluates each configuration. A chemisorbing registry produces **two minima** — chemisorbed near
   2 A and dispersion-bound further out — so the registry comparison reads the chemisorbed branch,
   each registry at its own minimum; the hollow registry has no chemisorbed minimum at all. This
   tier runs in minutes and produces the energy-vs-distance curves, the minima, and the ordering.
2. **Total energy with DFT (platform jobs).** Each registry, held at its own MACE-optimized
   separation, is submitted as a `Total Energy` job. A default run submits **one** registry;
   activating the remaining three in the notebook's `DFT_REGISTRY_NAMES` cell computes the full
   DFT comparison and the final verdict line.

| registry | carbon sublattice A | carbon sublattice B | expectation from the manuscript |
|---|---|---|---|
| `top_fcc` | atop first-layer Ni | fcc hollow | favorable, chemisorbed near 2.1 A |
| `top_hcp` | atop first-layer Ni | hcp hollow | close to top-fcc |
| `bridge_top` | bridge between two Ni | mixed | close to top-fcc |
| `hollow_fcc_hcp` | fcc hollow | hcp hollow | not chemisorbed; only a dispersion-bound minimum |

## 4. Calculation parameters

| | this tutorial | manuscript |
|---|---|---|
| Fast tier | MACE-MP-0 (medium) + D3, rigid film | — |
| DFT functional | PBE (`pbe`) | collated vdW-corrected results |
| Pseudopotentials | ultrasoft (GBRV) | varies by cited study |
| Cutoffs | 50 Ry wavefunction, 400 Ry density | varies |
| k-grid | 12x12x1 on the 1x1 cell | varies |
| Spin | collinear, starting moment 0.7 on Ni | ferromagnetic Ni |
| Dispersion | D3 (`vdw_corr = "d3_grimme"`) | method-dependent |
| Geometry | film rigid at the MACE-optimized separation | relaxed |

Nickel is ferromagnetic, so every DFT job runs spin-polarized. The D3 correction is applied in the
QE input because the separation of the hollow registry is a dispersion-bound minimum — without it
the physisorbed state does not bind at all. The in-plane k-grid divisions stay multiples of three so
the K point of the hexagonal cell is sampled exactly.

The DFT jobs do not relax the film: each registry is computed at the separation the MACE scan
found for it. That keeps the DFT tier to single self-consistent calculations and avoids the
semi-local functional pulling the film away from the dispersion-bound geometry.

## 5. Step-by-step instructions

### 5.1. Create the structure

Run the [structure creation notebook](optimization-interface-film-xy-position-graphene-nickel.md).
It saves `Graphene_Nickel_interface` into `uploads`.

### 5.2. Open the simulation notebook

```
other/materials_designer/specific_examples/optimization_interface_film_xy_position_graphene_nickel_SIMULATION.ipynb
```

### 5.3. Run the fast tier

*Run* > *Run All Cells*. Sections 2-4 need no platform account: they load the interface, derive
the registry placements (printing which surface site each carbon sublattice lands on), scan the
separations with MACE, and print the equilibrium distance and relative energy of every registry.

### 5.4. Run the DFT tier

Section 5 authenticates against the platform and submits one `Total Energy` job for the first
registry in `DFT_REGISTRY_NAMES`. Uncomment the remaining registries in that cell to submit all
four; the notebook then waits for the jobs and prints the DFT comparison.

### 5.5. Read the verdict

The final cell restates the manuscript's reference values, checks the favorable registry, the
chemisorption distance, and that the hollow registry does not chemisorb — the hollow's
dispersion-bound distance is reported for context but not gated, since MACE-MP + D3 places such
minima ~0.5 A beyond graphite's 3.3 A spacing — and, once all four DFT jobs have run, prints one
line:

```
Reproduces Dahal & Batzill (2014): yes
```

A default one-job run prints the fast-tier checks and names the registries still to activate
instead of a verdict — one DFT point cannot evaluate an ordering.

## 6. Troubleshooting

If a registry reports its minimum at the edge of the scan window, widen `Z_SCAN_START` /
`Z_SCAN_STOP`; the notebook prints a warning naming the registry. The first MACE call downloads the
foundation model, which takes a moment; subsequent runs use the cache. If the DFT energies of
different registries are identical, check that each job's material name carries a different
registry label and separation — the jobs are only as distinct as the materials submitted.

## 7. Interactive JupyterLite notebook

The notebook below runs the full comparison. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/optimization_interface_film_xy_position_graphene_nickel_SIMULATION.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 8. References
