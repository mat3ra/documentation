# Electronic Properties Tutorials

This section covers electronic structure calculations on the Mat3ra platform, implemented through [Density Functional Theory]({{ reference_url }}/models-directory/dft/overview/) (DFT). The tutorials demonstrate how to compute band structures, band gaps, density of states, and related properties using [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) and [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/).


## Standard DFT Calculations

| Tutorial | Property | Software |
|----------|----------|----------|
| [Band structure](band-structure.md) | [Electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) | QE |
| [Band gap](band-gap.md) | [Band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) | VASP |
| [Density of states](density-of-states.md) | [Electronic DOS]({{ reference_url }}/properties-directory/non-scalar/electronic-dos/) | QE |
| [Charge density mesh](electronic-density-mesh.md) | Charge density | QE |
| [Fermi surface](fermi-surface.md) | [Fermi surface]({{ reference_url }}/properties-directory/scalar/fermi-energy/) | QE |
| [Valence band offset](valence-band-offset.md) | [Valence band offset]({{ reference_url }}/properties-directory/scalar/valence-band-offset/) | QE |
| [Effective screening medium](esm-qe.md) | ESM potential/charge profiles | QE |


## Beyond Standard DFT

These tutorials use advanced functionals or many-body methods for improved accuracy, particularly for band gap predictions.

| Tutorial | Method | Software |
|----------|--------|----------|
| [HSE band gap (VASP)](hse-vasp-bg.md) | Hybrid HSE functional | VASP |
| [HSE band gap (QE)](hse-qe-bg.md) | Hybrid HSE functional | QE |
| [HSE band structure (QE)](hse-qe-bs.md) | Hybrid HSE functional | QE |
| [GW band gap (VASP)](gw-vasp-bg.md) | [GW approximation]({{ reference_url }}/models-directory/dft/notes/#the-gw-approximation) | VASP |
| [GW band structure, full freq. (QE)](gw-qe-bs-fullfreq.md) | GW full frequency | QE |
| [GW band structure, plasmon pole (QE)](gw-qe-bs-plasmon.md) | GW plasmon pole | QE |


## Spin and Magnetic Properties

| Tutorial | Method | Software |
|----------|--------|----------|
| [Hubbard U correction](hubbard.md) | DFT+U | QE |
| [Spin-magnetic band structure](spin-magnetic-qe.md) | Spin-polarized DFT | QE |
| [Spin-orbit coupling](spin-orbit-coupling-qe.md) | SOC | QE |
