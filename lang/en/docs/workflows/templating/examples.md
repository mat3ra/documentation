---
render_macros: true
---

# Template Examples

The present page contains example(s) of [unit](../components/units.md) input [templates](overview.md), implemented using the [templating engine](jinja.md), in order to generate the input files for the [simulation engines]({{ reference_url }}/software/overview/) supported on our platform.

## Quantum ESPRESSO Example

For example, the input file template shown in the expandable section below, for a sample [Quantum ESPRESSO]({{ guide_url }}/software-directory/modeling/quantum-espresso/overview/) calculation.

### Template

The text below contains references to data that will be different for different materials, such as the number of atoms (`nat` flag).

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

### Context

```jinja
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
        "ATOMIC_POSITIONS": "Si 0.000000000 0.000000000 0.000000000\nSi 0.250000000 0.250000000 0.250000000",
        "CELL_PARAMETERS": "3.348920236 0.000000000 1.933500000\n1.116306745 3.157392278 1.933500000\n0.000000000 0.000000000 3.867000000",
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

### Rendered Output

#### Design-time Render

For Silicon FCC as a default material, the resulting text of the unit input, will be as shown as below:

{% raw %}
```fortran
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

#### Runtime Render

In the rendered text of the unit above, there are still flags that are not resolved, such as `{{JOB_WORK_DIR}}`, for example. These will be rendered during the Run time, as explained [here](exabyte-convention.md#raw-syntax).
