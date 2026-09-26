# Materials Properties Classification

The classification explained below complements the more general one introduced [here]({{ data_url }}/data/classification/). We further classify the Properties of [Materials](../../materials/overview.md) according to the conventions below.

| By origin                      | By domain           |
|:------------------------------:|:------------------------------:|
| Elemental                        | Chemical                     |
| Primary                          | Electrical                   |
| Compound                         | Electronic                   |
| Custom                           | Magnetic                     |
|                                  | Mechanical                   |
|                                  | Optical                      |
|                                  | Thermal                      |
|                                  | Thermodynamic                |
|                                  | Vibrational                  |
|                                  | Other                        |

## By origin

We further make the following sub-categorization for Materials Properties, following the ESSE Data Convention.

- **elemental**: entirely defined by pure elements and inherited by compounds without modification (eg. electronegativity, atomic weight). 
- **primary**: directly available properties specific to material (can be of all types, for example [characteristic or descriptive](general.md)).
    - **structural**: we separate structural properties as the most fundamental group.
- **compound**: combined properties defined through others, eg. *(property 1 + property 2) / 2*, *Log (property 1 - property 2)*.
- **custom**: user-defined properties (eg. from imported/uploaded data). 

## By domain

The following domains of materials properties (with shortlists of examples) can be considered:

- **Chemical**: 
    - reaction barrier height
    - diffusion barrier height
- **Electrical**: 
    - resistivity
    - i-v curve
    - dielectric matrix
    - electric susceptibility
- **Electronic**: 
    - band gap(s)
    - band structure
    - density of states
    - charge density map
    - fermi surface
    - HOMO-LUMO gap
- **Magnetic**:
    - magnetic susceptibility
    - magnetic moment
- **Mechanical**:
    - hardness
    - bulk modulus
    - shear modulus
    - poisson ratio
- **Optical**:
    - absorption spectra
- **Thermal**:
    - thermopower
    - heat capacity
- **Thermodynamic**:
    - formation energy
    - melting temperature
    - superconducting transition temperature
- **Vibrational**:
    - zero point energy
    - phonon dispersions
    - phonon density of states
    - electron-phonon coupling
- **Other**:
    - other properties that do not fit the above classification 
