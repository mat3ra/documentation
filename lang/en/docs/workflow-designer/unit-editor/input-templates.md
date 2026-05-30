---
render_macros: true
---
# Unit input templates

[Unit input templates]({{ reference_url }}/workflows/templating/overview/) allow input text files to be rendered based on unique data per each material, and to be subsequently fed to the simulation engine being employed as part of the present unit calculation. The original input file templates, as well as their final preview appearances, can be inspected in the visual below. The typical appearance of an input template within the Unit Editor interface, for the specific example of a "pw_scf" self-consistent field total ground-state energy unit calculation using the pw.x executable of the [Quantum ESPRESSO](../../software-directory/modeling/quantum-espresso/overview.md) simulation package, is depicted on the left-hand side in the image below.

!["Example Input Template"](../../images/workflow-designer/input-template.png "Example Input Template")

The reader is referred to the Quantum ESPRESSO-specific [documentation page](../../software-directory/modeling/quantum-espresso/overview.md), and to its official online documentation page pertaining specifically to the pw.x executable code [^1], for a detailed description of the meaning of the input flags displayed in the above example.

## Template Data

By clicking on the `Template Data` button to the right of the unit input template the user can inspect the corresponding JSON representation of the data used to render the template and produce the final text. The templates themselves are built starting from this JSON data using the [Jinja template engine]({{ reference_url }}/workflows/templating/jinja/).

The user can notice that some commands are allowed as part of the template syntax, such as the "for" loop contained in the final line of the template for defining the size of the grid of k-points employed as part of the current "pw_scf" computation, according to the specific format of Quantum ESPRESSO input files [^1].

More about the logic behind templates and rendering is explained in [this part of the documentation]({{ reference_url }}/workflows/templating/overview/).

## Example JSON Representation

The example of a JSON data structure, containing the input data for the template of a "pw_scf" unit computation for FCC Silicon is shown in the expandable section below.

<details markdown="1">
  <summary>
     Expand to view
  </summary>

```json
{
    "kgridExtraData": {
        "materialHash": "a665723ef7429caef6ca89385fe25bae"
    },
    "kgrid": {
        "dimensions": [
            10,
            10,
            10
        ],
        "shifts": [
            0,
            0,
            0
        ],
        "KPPRA": 2000,
        "preferKPPRA": false
    },
    "inputExtraData": {
        "materialHash": "a665723ef7429caef6ca89385fe25bae"
    },
    "input": {
        "IBRAV": 0,
        "RESTART_MODE": "from_scratch",
        "NAT": 2,
        "NTYP": 1,
        "ATOMIC_POSITIONS": "Si 0.000000000 0.000000000 0.000000000
Si 0.250000000 0.250000000 0.250000000",
        "CELL_PARAMETERS": "3.348920236 0.000000000 1.933500000
1.116306745 3.157392278 1.933500000
0.000000000 0.000000000 3.867000000",
        "ATOMIC_SPECIES": "Si 28.0855 si_pbe_gbrv_1.0.upf"
    },
    "isInputEdited": false,
    "cutoffsExtraData": {
        "materialHash": "a665723ef7429caef6ca89385fe25bae"
    },
    "cutoffs": {
        "wavefunction": 40,
        "density": 200
    }
}
```
</details>


## Example Unit Input Template

An example of an input template matching the above JSON source data, and referring to the same "pw_scf" unit calculation, can be viewed in the expandable section below:

<details markdown="1">
  <summary>
     Expand to view
  </summary>

```jinja
{% raw %}&CONTROL
    calculation = 'scf'
    title = ''
    verbosity = 'low'
    restart_mode = '{{ input.RESTART_MODE }}'{% endraw %}
    wf_collect = .true.
    tstress = .true.
    tprnfor = .true.
    outdir = {% raw %}'{{ JOB_WORK_DIR }}/outdir'{% endraw %}
    wfcdir = {% raw %}'{{ JOB_WORK_DIR }}/outdir'{% endraw %}
    prefix = '__prefix__'
    pseudo_dir = {% raw %}'{{ JOB_WORK_DIR }}/pseudo'{% endraw %}
{% raw %}/
&SYSTEM
    ibrav = {{ input.IBRAV }}
    nat = {{ input.NAT }}
    ntyp = {{ input.NTYP }}
    ecutwfc = {{ cutoffs.wavefunction }}
    ecutrho = {{ cutoffs.density }}
    occupations = 'smearing'
    degauss = 0.005
/
&ELECTRONS
    diagonalization = 'david'
    diago_david_ndim = 4
    diago_full_acc = .true.
    mixing_beta = 0.3
    startingwfc = 'atomic+random'
/
&IONS
/
&CELL
/
ATOMIC_SPECIES
{{ input.ATOMIC_SPECIES }}
ATOMIC_POSITIONS crystal
{{ input.ATOMIC_POSITIONS }}
CELL_PARAMETERS angstrom
{{ input.CELL_PARAMETERS }}
K_POINTS automatic
{% for d in kgrid.dimensions %}{{d}} {% endfor %}{% for s in kgrid.shifts %}{{s}} {% endfor %}{% endraw %}
```
</details>


## Preview of the input file

By clicking on the "Preview" tab next to "Template" at the bottom of the Unit Editor interface, the user can visualize a preview of the corresponding input file, in its final form to be stored in the database and sent to the computational infrastructure for execution. Such process completes the [design time render]({{ reference_url }}/workflows/templating/examples/#design-time-render) This text will be further processed during the [runtime render]({{ reference_url }}/workflows/templating/examples/#run-time-render) into the final text to be passed directly to the application executable.

An example of input text, resulting from the above-mentioned JSON data structure and input template is displayed in the expandable section below:

<details markdown="1">
  <summary>
     "Expand to view": ...
  </summary>

{% raw %}
```Fortran
&CONTROL
    calculation = 'scf'
    title = ''
    verbosity = 'low'
    restart_mode = 'from_scratch'
    wf_collect = .true.
    tstress = .true.
    tprnfor = .true.
    outdir = '{{ JOB_WORK_DIR }}/outdir'
    wfcdir = '{{ JOB_WORK_DIR }}/outdir'
    prefix = '__prefix__'
    pseudo_dir = '{{ JOB_WORK_DIR }}/pseudo'
/
&SYSTEM
    ibrav = 0
    nat = 2
    ntyp = 1
    ecutwfc = 40
    ecutrho = 200
    occupations = 'smearing'
    degauss = 0.005
/
&ELECTRONS
    diagonalization = 'david'
    diago_david_ndim = 4
    diago_full_acc = .true.
    mixing_beta = 0.3
    startingwfc = 'atomic+random'
/
&IONS
/
&CELL
/
ATOMIC_SPECIES
Si 28.0855 si_pbe_gbrv_1.0.upf
ATOMIC_POSITIONS crystal
Si 0.000000000 0.000000000 0.000000000
Si 0.250000000 0.250000000 0.250000000
CELL_PARAMETERS angstrom
3.348920236 0.000000000 1.933500000
1.116306745 3.157392278 1.933500000
0.000000000 0.000000000 3.867000000
K_POINTS automatic
10 10 10 0 0 0
```
{% endraw %}
</details>

## Selecting different materials

In case multiple materials are present, they can each be selected from the list of radio buttons on the right-hand side of the "Preview" tab page in order to review their corresponding input files in turn. The appearance of such radio buttons, when silicon is the only material being considered in the subworkflow calculation, is highlighted as an example in the image below:

!["Input Preview"](../../images/workflow-designer/input-preview.png "Input Preview")

## Links

[^1]: [Input file of the PWSCF, Website](https://www.quantum-espresso.org/Doc/INPUT_PW.html)
