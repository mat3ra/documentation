# Machine Learning Tutorials

This section covers [Machine Learning]({{ reference_url }}/models-directory/machine-learning/overview/) (ML) workflows on the Mat3ra platform. The tutorials are organized by approach: universal force fields for atomistic simulation, custom potential training, and statistical property prediction.


## Universal Machine-Learned Force Fields

Pre-trained interatomic potentials that predict energies, forces, and stresses across the periodic table without per-system training.

| Tutorial | Model | Description |
|----------|-------|-------------|
| [MatterSim (Python MLFF)](run-mlff-python-workflows-mattersim.md) | MatterSim | Run pre-trained MatterSim for total energy, relaxation, and phonons — covers bank workflows, custom workflows, GPU execution, and multi-threading |

!!!tip "Running other Python-based models"
    Any Python-based MLFF that can be installed via `pip` (e.g. MACE, CHGNet, SevenNet) can be run using the general Python workflow template. See Section 3 of the [MatterSim tutorial](run-mlff-python-workflows-mattersim.md#3-using-the-general-python-template) for the general approach.


## Custom Potential Training

Training a neural network potential from first-principles data, then using it for large-scale molecular dynamics.

| Tutorial | Pipeline | Description |
|----------|----------|-------------|
| [DeePMD (QE → DeePMD → LAMMPS)](deepmd-mlff-with-espresso-cp-and-lammps.md) | QE CP + DeePMD-kit + LAMMPS | End-to-end workflow: generate ab-initio MD data with Quantum ESPRESSO Car–Parrinello, train a DeePMD potential, and run production MD in LAMMPS |


## Statistical Property Prediction (Python ML)

Traditional ML models (regression, classification, clustering) using tabulated materials descriptors and [scikit-learn](https://scikit-learn.org/). These workflows use a dataset (CSV) rather than a crystal structure as input.

| Tutorial | Task | Description |
|----------|------|-------------|
| [Train a regression model](../python-ml/train-regression-model.md) | Regression | Train a neural network regressor on adsorption energies |
| [Predict with regression](../python-ml/predict-with-regression.md) | Prediction | Apply a trained regression model to new data |
| [Unsupervised clustering](../python-ml/train-clustering-model.md) | Clustering | K-means and hierarchical clustering of materials descriptors |
| [Train a classifier](../python-ml/train-classification-model.md) | Classification | Train a model to classify materials by category |
| [Predict with a classifier](../python-ml/predict-with-classification.md) | Prediction | Apply a trained classifier to new data |


## Legacy Tutorials

!!!warning "Deprecated"
    The following tutorial uses the legacy ML engine, which has been superseded by the Python ML infrastructure above.

- [Train linear regression (legacy)](train-ml-model.md) — uses the older built-in ML engine with Si/Ge band gap data
- [Predict with legacy model](predict-ml-properties.md) — applies a legacy-trained model to predict band gaps
