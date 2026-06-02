---
tags:
  - defects
  - graphene
  - substitutional
  - point-defects
  - nitrogen
  - band-structure
  - D-0D-SUB

hide:
  - tags
# YAML header
render_macros: true
---

# Substitutional Point Defects in Graphene (Band Structure)

## 1. Introduction

This tutorial demonstrates the calculation of the band structure for graphene with vacancy and N substitutions, reproducing results from the following manuscript:

!!!note "Manuscript"
    Yoshitaka Fujimoto and Susumu Saito, "Formation, stabilities, and electronic properties of nitrogen defects in graphene", Physical Review B, 2011. [DOI: 10.1103/PhysRevB.84.245446](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.84.245446){:target='_blank'}. [@Yoshitaka2011]

This tutorial builds upon the [Substitutional Point Defects in Graphene](defect-point-substitution-graphene.md) tutorial, where the N-doped graphene structure is created. Here, the electronic band structure is calculated using Quantum ESPRESSO and compared with the published results.

The figure below shows the band structure and atomic structure of N-doped graphene from the manuscript (Figure 3a):

![Band Structure from Paper](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/band-structure-paper-figure.webp "Band structure and atomic structure of N-doped graphene from Fujimoto & Saito 2011, Figure 3a")

The calculation uses Density Functional Theory (DFT) with the Local Density Approximation (LDA) and norm-conserving pseudopotentials, following the methodology described in the manuscript.


## 2. Prerequisites

Before starting this tutorial, one of the following steps should be completed:

1. Complete the [Substitutional Point Defects in Graphene](defect-point-substitution-graphene.md) tutorial to create the N-doped graphene structure, OR
2. Have the N-doped graphene material file saved in the `uploads` folder


## 3. Workflow overview

The band structure calculation workflow consists of the following steps:

1. **Set up the environment and parameters**: Configure material, workflow, and computational settings
2. **Authenticate and initialize API client**: Connect to the platform
3. **Load material**: Import the N-doped graphene structure from file or Standata
4. **Create workflow**: Set up the band structure calculation workflow with optional relaxation
5. **Configure compute resources**: Select cluster, queue, and processor settings
6. **Create and submit job**: Assemble and run the calculation
7. **Monitor job status**: Wait for completion
8. **Retrieve and visualize results**: Display the calculated band structure


## 4. Calculation parameters

### 4.1. Run profiles

The notebook supports two run profiles:

- **Debug mode**: Quick validation run with minimal k-point sampling and no relaxation. Completes in a few minutes.
- **Production mode**: Paper-quality settings with structural relaxation and dense k-point sampling, following Fujimoto & Saito (2011).

### 4.2. DFT parameters

The calculation uses the following DFT parameters (consistent with the manuscript):

- **Functional**: LDA (Perdew-Zunger parametrization)
- **Pseudopotentials**: Norm-conserving (ONCV)
- **Energy cutoff**: 50 Ry for wavefunctions, 200 Ry for density
- **K-point grid** (production): 6×6×1 for SCF and relaxation
- **K-path**: K → Γ → M → K (high-symmetry path in hexagonal Brillouin zone)

### 4.3. Relaxation settings

In production mode, the structure is relaxed before the band structure calculation to optimize atomic positions while maintaining the cell parameters.


## 5. Step-by-step instructions

### 5.1. Open the notebook

Navigate to the API examples repository and open the band structure calculation notebook:

```
other/materials_designer/specific_examples/defect_point_substitution_graphene_simulation.ipynb
```

### 5.2. Configure parameters

In cell 1.2, set the run profile and material parameters:

```python
# Switch between "debug" and "production" modes
RUN_PROFILE = "debug"  # Change to "production" for paper-quality results

# Material parameters
FOLDER = "./uploads"
MATERIAL_NAME = "N-doped Graphene"

# Workflow parameters
APPLICATION_NAME = "espresso"
MODEL_SUBTYPE = "lda"
```

For first-time use, start with `"debug"` mode to validate the workflow. Once confirmed working, switch to `"production"` for final results.

### 5.3. Set DFT parameters

The specific DFT parameters are configured in cell 1.3:

```python
# Pseudopotential settings
PSEUDOPOTENTIAL_TYPE = "nc"
FUNCTIONAL = "pz"

# Energy cutoffs
ECUTWFC = 50
ECUTRHO = 4 * ECUTWFC

# K-point sampling and path (automatically set based on RUN_PROFILE)
```

### 5.4. Run the notebook

Execute all cells by selecting *Run* > *Run All* from the menu.

The notebook will:

1. [Authenticate with the platform]({{ interface_url }}/jupyterlite/authentication.md) and initialize the API client
2. Load the N-doped graphene material
3. Create and configure the band structure workflow
4. Submit the calculation job
5. Monitor the job status
6. Display the results when complete

### 5.5. Monitor progress

The notebook includes automatic job monitoring with status updates. In debug mode, the calculation typically completes in 5–10 minutes. Production mode may take several hours depending on the cluster load.

### 5.6. Analyze results

Once the job completes, the band structure is displayed. The plot shows:

- Energy bands along the K → Γ → M → K path
- Fermi level position
- Band gap (if present)
- Comparison with pristine graphene (if available)


## 6. Expected results

The calculated band structure should show:

- **Modified electronic structure** near the Fermi level due to nitrogen substitution
- **Breaking of symmetry** compared to pristine graphene
- **Localized states** introduced by the nitrogen defects
- **Band gap opening** (depending on defect configuration)

### 6.1. Comparison with published results

The figure below compares the band structure from the Fujimoto & Saito manuscript (left) with the calculated results (right):

![Band Structure Comparison](../../../images/tutorials/materials/defects/defect_creation_point_substitution_graphene/band-structure-comparison.webp "Comparison of band structure: manuscript (left) vs. calculated (right)")

The calculated band structure reproduces the key features from the manuscript, including:

- The overall band dispersion along the K → Γ → M → K path
- The position of bands relative to the Fermi level
- The electronic structure modifications due to nitrogen substitution
- The characteristic features near the K and Γ points


## 7. Customization options

### 7.1. Modify the K-path

In order to change the k-point path for the band structure calculation, edit the `KPATH` parameter in cell 1.3:

```python
KPATH = [
    {"point": "K", "steps": 20},
    {"point": "Г", "steps": 20},
    {"point": "M", "steps": 20},
    {"point": "K", "steps": 1},
]
```

### 7.2. Adjust computational resources

Modify the compute parameters in cell 1.2:

```python
CLUSTER_NAME = "101"  # Your cluster name
QUEUE_NAME = QueueName.D  # Queue selection
PPN = 1  # Processors per node
```

### 7.3. Add or remove relaxation

Toggle structural relaxation by changing the `ADD_RELAXATION` flag (set by `RUN_PROFILE`):

```python
ADD_RELAXATION = True  # Enable relaxation
RELAXATION_KGRID = [6, 6, 1]  # K-point grid for relaxation
```


## 8. Troubleshooting

### 8.1. Material not found

If the material is not found in the uploads folder:

1. Run the [defect creation notebook](defect-point-substitution-graphene.md) first
2. Ensure the material is saved with the exact name ("N-doped Graphene")
3. Check that the material file is in the correct `uploads` folder


## 9. Interactive JupyterLite notebook

The following JupyterLite notebook demonstrates the workflow for calculating the band structure of N-doped graphene. Select *Run* > *Run All Cells*.

{% with origin_url=config.extra.jupyterlite.origin_url_lab %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/defect_point_substitution_graphene_simulation.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}


## 10. References
