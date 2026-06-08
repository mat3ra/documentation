# Machine Learning Model

**Machine Learning (ML)** encompasses a family of statistical and computational methods that build predictive models from data, without being explicitly programmed for the target task [^1]. On the Mat3ra platform, ML is applied in two main areas: **universal machine-learned force fields (MLFFs)** for atomistic simulations, and **property prediction models** that map materials descriptors to target properties.


## Supported Approaches

### Universal Machine-Learned Force Fields

Universal MLFFs are pre-trained interatomic potentials that predict energies, forces, and stresses for arbitrary compositions across the periodic table. They enable molecular dynamics and structural relaxation at near-DFT accuracy with orders-of-magnitude lower computational cost.

The platform supports running Python-based MLFFs through the general Python workflow infrastructure. Models that can be installed via `pip` and invoked through the [Atomic Simulation Environment (ASE)](https://wiki.fysik.dtu.dk/ase/) are compatible with the platform. See the [MatterSim tutorial]({{ guide_url }}/tutorials/ml/run-mlff-python-workflows-mattersim/) for a step-by-step example covering bank workflows, custom workflows, and GPU execution.

Specific models with pre-built workflow templates include:

| Model | Architecture | Coverage | Reference |
|-------|-------------|----------|-----------|
| [MatterSim](https://github.com/microsoft/mattersim) | Graph neural network | Periodic table | Yang et al. (2024) [^2] |

!!!tip "Running other Python-based models"
    Any Python-based MLFF (e.g. MACE, CHGNet, SevenNet) can be run using the general Python workflow template. Add the model's package to `requirements.txt` and write the inference script in `script.py`. See Section 3 of the [MatterSim tutorial]({{ guide_url }}/tutorials/ml/run-mlff-python-workflows-mattersim/#3-using-the-general-python-template) for details.


### Custom Training with DeePMD

For training custom neural network potentials from ab-initio molecular dynamics data, the platform supports end-to-end workflows combining Quantum ESPRESSO (Car–Parrinello MD), [DeePMD-kit](https://github.com/deepmodeling/deepmd-kit) (training), and [LAMMPS]({{ reference_url }}/software-directory/modeling/lammps/) (production MD). See the [DeePMD tutorial]({{ guide_url }}/tutorials/ml/deepmd-mlff-with-espresso-cp-and-lammps/).


### Statistical / Scikit-Learn Models

The platform also supports traditional ML workflows (regression, classification, clustering) through the Python ML infrastructure. These models use tabulated materials descriptors to predict target properties such as band gaps. Available tutorials:

- [Training a regression model]({{ guide_url }}/tutorials/python-ml/train-regression-model/)
- [Predictions with regression]({{ guide_url }}/tutorials/python-ml/predict-with-regression/)
- [Unsupervised learning with clustering]({{ guide_url }}/tutorials/python-ml/train-clustering-model/)
- [Training a classifier]({{ guide_url }}/tutorials/python-ml/train-classification-model/)
- [Predicting with a classifier]({{ guide_url }}/tutorials/python-ml/predict-with-classification/)


## [Parameters](parameters.md)

The list of parameters affecting ML models is presented [in this page](parameters.md).

## [Properties](../../properties/classification/machine-learning.md)

The classification of properties in the context of ML is discussed in a [separate section](../../properties/classification/machine-learning.md) of the documentation.

## [Units](units.md)

Machine Learning-specific [unit types](../../workflows/components/units.md) are introduced [here](units.md).

## [Structured Representation]({{ data_url }}/models-directory/machine-learning/data/)

[This page]({{ data_url }}/models-directory/machine-learning/data/) contains an example [structured representation]({{ data_url }}/data-structured/overview/) for the ML model.

## [Example Workflow](example-workflow.md)

The structure of an example Machine Learning [workflow](../../workflows/overview.md) is reviewed [in this page](example-workflow.md).

## [Accuracy](accuracy.md)

Important considerations when evaluating the accuracy of a machine-learned model are discussed [in this page](accuracy.md).


## Links

[^1]: [Wikipedia Machine Learning](https://en.wikipedia.org/wiki/Machine_learning)
[^2]: H. Yang et al., "MatterSim: A Deep Learning Atomistic Model Across Elements, Temperatures and Pressures," arXiv:2405.04967 (2024). [arXiv](https://arxiv.org/abs/2405.04967)
