"""
Generate index of a sub-section from the nav data.
"""

from os.path import basename
import yaml


def _get_section_data(config, section):
    """
    Return section data given config data.
    """
    nav_data = config["nav"]
    for item in nav_data:
        if section in item:
            return item[section]
    return {}


def remove_prefix(text, prefix):
    """
    removes prefix from string
    """
    if text.startswith(prefix):
        return text[len(prefix) :]
    return text


def _format_index(data, prefix_to_remove="", level=0):
    """
    Format yaml index.
    """
    for item in data:
        for key, val in item.items():
            if isinstance(val, str):
                val_new = remove_prefix(val, prefix_to_remove)
                print("    " * level, end="")  # indentation
                print(f"- [{key}]({val_new})")
            else:  # call parent recursively
                print("    " * level, end="")
                print(f"- {key}")
                _format_index(val, prefix_to_remove, level=level + 1)


def gen_index(config, section):
    """
    Generate index in yaml format
    """
    section_data = _get_section_data(config, section)
    _format_index(section_data, section.lower() + "/")


if __name__ == "__main__":
    # get location of this script file
    SCRIPT_PATH = __file__
    # assumes mkdocs.yml resides one level up from script file
    config_path = SCRIPT_PATH.replace(basename(SCRIPT_PATH), "../mkdocs.yml")

    with open(config_path, "r", encoding="utf8") as stream:
        try:
            config = yaml.load(stream, Loader=yaml.CLoader)
        except yaml.YAMLError as exc:
            raise SystemError("Error: something went wrong while loading yaml file.") from exc

    gen_index(config, "Tutorials")

## Sample output:
# - [Overview](overview.md)
# - Jobs via Command Line
#     - [Overview](jobs-cli/overview.md)
#     - [Create + run a CLI Job](jobs-cli/job-cli-example.md)
#     - [Import a CLI Job to Web Interface](jobs-cli/cli-job-import.md)
# - Templating
#     - [Overview](templating/overview.md)
#     - [Flags by Elemental Composition](templating/set-flag-by-composition.md)
#     - [Magnetic Moment on Atoms by Specie](templating/set-magnetic-moment.md)
# - Machine Learning (ML)
#     - [Overview](ml/overview.md)
#     - ExabyteML (legacy)
#         - [Train ML Model](ml/train-ml-model.md)
#         - [Predict New Properties](ml/predict-ml-properties.md)
#     - Python ML
#         - [Training a Regression Model](python-ml/train-regression-model.md)
#         - [Predictions with Regression](python-ml/predict-with-regression.md)
#         - [Unsupervised Learning with Clustering](python-ml/train-clustering-model.md)
#         - [Training a Classifier](python-ml/train-classification-model.md)
#         - [Predicting with a Classifier](python-ml/predict-with-classification.md)
#     - [DeePMD (molecular dynamics)](ml/deepmd-mlff-with-espresso-cp-and-lammps.md)
# - Density Functional Theory
#     - Electronic Properties
#         - [Overview](dft/electronic/overview.md)
#         - [Effective Screening Medium](dft/electronic/esm-qe.md)
#         - [Electronic band structure](dft/electronic/band-structure.md)
#         - [Electronic band structure, HSE (QE)](dft/electronic/hse-qe-bs.md)
#         - [Electronic band structure, HSE (VASP)](dft/electronic/hse-vasp-bg.md)
#         - [Electronic band structure, GW, Full Freq., (QE)](dft/electronic/gw-qe-bs-fullfreq.md)
#         - [Electronic band structure, GW, Plasmon P., (QE)](dft/electronic/gw-qe-bs-plasmon.md)
#         - [Electronic band gap](dft/electronic/band-gap.md)
#         - [Electronic band gap, HSE (QE)](dft/electronic/hse-qe-bg.md)
#         - [Electronic band gap, GW (VASP)](dft/electronic/gw-vasp-bg.md)
#         - [Electronic density of states](dft/electronic/density-of-states.md)
#         - [Electronic density mesh](dft/electronic/electronic-density-mesh.md)
#         - [Fermi Surface](dft/electronic/fermi-surface.md)
#         - [Valence Band Offset](dft/electronic/valence-band-offset.md)
#         - [Hubbard U (QE)](dft/electronic/hubbard.md)
#         - [Spin-magnetic (QE)](dft/electronic/spin-magnetic-qe.md)
#         - [Spin-orbit coupling (QE)](dft/electronic/spin-orbit-coupling-qe.md)
#     - Optical Properties
#         - [Dielectric constant (QE, simple.x)](dft/optical/epsilon-optimal-basis.md)
#     - Vibrational Prop.
#         - [Overview](dft/vibrational/overview.md)
#         - [Zero Point Energy](dft/vibrational/zero-point-energy.md)
#         - [Phonons](dft/vibrational/phonon-dispersion-dos.md)
#         - [Phonons on Grid](dft/vibrational/phonons-grid.md)
#     - Thermodynamic Prop.
#         - [Surface Energy](dft/thermodynamic/surface-energy.md)
#     - Chemical Prop.
#         - [Reaction Energy Profile (QE)](dft/chemical/reaction-profile-qe.md)
#         - [Reaction Energy Profile (VASP)](dft/chemical/reaction-profile-vasp.md)
#     - Add-ons
#         - [k-point convergence](dft/addons/kpt-convergence.md)
#         - [Structural Relaxation](dft/addons/structural-relaxation.md)
# - General Functionality
#     - [Jupyter Notebook](other/jupyter.md)
#     - [Restart from Previous Job](other/restart-job.md)
#     - [TensorFlow (GPU)](general-functionality/tensorflow-gpu.md)
# - Materials
#     - [Overview](materials/overview.md)
#     - [VESTA via Remote Desktop](materials/vesta-remote-desktop.md)
#     - [Combinatorial Sets](materials/combinatorial-screening.md)
#     - [Interpolated Sets](materials/interpolated-sets.md)
#     - [Molecule on a Surface](materials/molecule-surface.md)
#     - [Interface, quick setup (3D Editor)](materials/slabs-interface.md)
#     - [Interface, no strain minimization (Python Transformation)](materials/interface-with-python.md)
#     - [Interface, minimal strain (JupyterLite Session)](materials/jupyterlite-zsl.md)
#     - [Import materials from files in various formats](materials/import-from-files.md)
