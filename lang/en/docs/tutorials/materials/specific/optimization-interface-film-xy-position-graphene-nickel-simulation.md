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

This tutorial computes which registry of graphene on Ni(111) is the most favourable, how far the film
sits above the surface, and the adsorption energy per carbon atom, using the interface created in the
[structure creation tutorial](optimization-interface-film-xy-position-graphene-nickel.md), and
compares the result against the following manuscript.

!!!note "Manuscript"
    **Arjun Dahal, Matthias Batzill**,
    "Graphene-nickel interfaces: a review" Nanoscale, 6(5), 2548 (2014)
    [DOI: 10.1039/c3nr05279f](https://doi.org/10.1039/c3nr05279f) [@Dahal2014]

### 1.1. What is being reproduced

Graphene and Ni(111) are lattice-matched to about one percent, so instead of a moiré pattern the
film locks into a single registry. The review's Fig. 1 sets out the four it considers, and this
tutorial computes all four under the review's own names: **hollow**, **atop/'fcc'**, **atop/'hcp'**
and **bridge**. Panel (b), atop/fcc, is the favourable position the review highlights and the one
the structure tutorial targets.

![The four registries of graphene on a close-packed metal surface](../../../images/tutorials/materials/optimization/optimization_interface_film_xy_position_graphene_nickel/0-figure-from-manuscript.webp "Registries of graphene on a close-packed metal surface")

Two numbers are quoted in the review's abstract, and they are what this tutorial reproduces:
chemisorbed graphene sits **0.21 nm** above the top Ni plane, well below the **0.33 nm** van der
Waals spacing of graphite. Together with Fig. 1b naming the atop/fcc registry as the favourable one,
that gives three checks: an atop registry is the most favourable, it chemisorbs near 2.1 Å, and the
hollow arrangement does not chemisorb at all.

!!!note "What is deliberately not claimed"
    Which of the **two** atop registries is lowest is not asserted. They come out a few meV per
    carbon atom apart, finer than either method here resolves, so they are treated as degenerate and
    the atop family is compared against the hollow arrangement rather than against one another.

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
   activating the others in the notebook's `DFT_REGISTRY_NAMES` cell computes the full DFT
   comparison and the DFT-tier verdict.

   Setting `COMPUTE_ADSORPTION_ENERGY = True` adds two further jobs — the **bare Ni slab** and the
   **free-standing graphene sheet**, both *in the same cell* — which turn the interface energies into
   an adsorption energy per carbon atom:
   `E_ads = [E(interface) − E(Ni slab) − E(graphene)] / N_C`. Sharing the cell, k-grid, cutoffs and
   smearing removes the cell- and sampling-dependent part of the error from the difference; basis-set
   and smearing errors are system-specific and do not cancel exactly, so the number is good to tens
   of meV rather than to the digit. It is off by default because it triples the job count. The result
   is a PBE+D3 value, and the review collates adsorption energies from several methods, so compare
   the ordering and magnitude rather than the digits.

| registry | Fig. 1 | carbon sublattices | expected |
|---|---|---|---|
| `atop_fcc` | (b) | atop first-layer Ni + fcc hollow | favourable; chemisorbed near 2.1 Å |
| `atop_hcp` | (c) | atop first-layer Ni + hcp hollow | degenerate with atop/fcc at this level of theory |
| `bridge` | (d) | the C–C bond straddles a first-layer Ni | chemisorbed, a little above the atop registries |
| `hollow` | (a) | fcc hollow + hcp hollow | not chemisorbed; only a dispersion-bound minimum |

The notebook derives these from the structure itself: the surface sites are located from the
substrate's top three Ni layers, and the three site-pair registries are labelled by measuring which
site the second carbon sublattice lands on — refusing to label a carbon that is equidistant from two
sites rather than picking one. The bridge registry is defined by its own geometry instead: neither
carbon is on a site, and what fixes it is that a first-layer Ni sits directly under the midpoint of a
C–C bond — the vertical bonds in Fig. 1d run through the centres of the surface atoms. The notebook
verifies that placement rather than trusting it.

## 4. Calculation parameters

| | this tutorial | manuscript |
|---|---|---|
| Fast tier | MACE-MP-0 (large, float64) + D3, rigid film | — |
| DFT functional | PBE (`pbe`) | collated vdW-corrected results |
| Pseudopotentials | ultrasoft (GBRV) | varies by cited study |
| Cutoffs | 40 Ry wavefunction, 200 Ry density | varies |
| k-grid | 12x12x1 on the 1x1 cell | varies |
| Spin | collinear, started near Ni's bulk moment (0.7 μB) | ferromagnetic Ni |
| Smearing | Marzari-Vanderbilt cold, `degauss = 0.01` Ry | varies |
| Dispersion | D3 (`vdw_corr = "grimme-d3"`) | method-dependent |
| Geometry | film rigid at the MACE-optimized separation | relaxed |

Nickel is ferromagnetic, so every DFT job runs spin-polarized. The D3 correction is applied in the
QE input because the separation of the hollow registry is a dispersion-bound minimum — without it
the physisorbed state does not bind at all. The in-plane k-grid divisions stay multiples of three so
the K point of the hexagonal cell is sampled exactly.

Every value in that table is either a platform default, the value the pseudopotential set is
published with, or something this system's physics requires. The cutoffs are the 40/200 Ry pair GBRV
publishes for its ultrasoft set. The in-plane k-point divisions are a multiple of three so that K,
at (1/3, 1/3), lies on the grid, and dense enough for a metal's Fermi surface.

A spin-polarized metal slab is the hard case for the SCF, and the platform defaults do not converge
it — a first attempt stopped at *convergence NOT achieved after 100 iterations*, with the total
energy oscillating in its fourth decimal, which is charge sloshing rather than divergence. Three
changes address that and nothing else: cold smearing, which is the standard metal choice because it
leaves the free energy insensitive to `degauss`; `local-TF` mixing, built for the long-wavelength
charge oscillation a slab supports; and a smaller mixing fraction with more iterations so the
magnetic moment can settle.

The MACE model size matters more than it looks: the **large** model at `float64` resolves the shallow
chemisorbed minimum, while the medium model at `float32` misses it entirely and reports every
registry as merely physisorbed — which inverts the result. The two dispersion-bound minima also come
out near 4 Å rather than graphite's 3.3 Å, so the hollow registry's distance is reported for context
and is not one of the checks; that it has no chemisorbed minimum is.

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
registry in `DFT_REGISTRY_NAMES`. Uncomment the other registries in that cell to submit all four; the
notebook then waits for the jobs and prints the DFT comparison. Enabling
`COMPUTE_ADSORPTION_ENERGY` adds two more jobs on top of whatever is active.

### 5.5. Read the verdict

The final cell states the two distances quoted in the review's abstract, checks the three claims, and
prints a verdict per tier:

```
Reproduces Dahal & Batzill (2014) [MACE tier]: yes
```

The DFT-tier line appears once all four registries have finished — one job cannot evaluate an
ordering, so a default run names the registries still to activate instead.

## 6. Troubleshooting

If a registry's minimum sits at the low edge of the scan, the notebook says so by name; lower
`Z_SCAN_START` before trusting that number. If every registry comes back as physisorbed only, check
`MACE_MODEL` and `MACE_DEFAULT_DTYPE` first — the medium/float32 combination reproduces exactly that
symptom. The first MACE call downloads the foundation model, which takes a moment; later runs use the
cache. If the DFT energies of different registries are identical, check that each job's material name
carries its own registry label and separation — the jobs are only as distinct as the materials
submitted.

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
