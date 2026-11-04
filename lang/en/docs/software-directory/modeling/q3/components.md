# Components

We present in this page the [components]({{ reference_url }}/software/components/)
(executables and flavors) of the [Quantum 3xplorer](overview.md) (Q3) application
implemented on our platform. They can be inspected from the lists of available
executables and flavors under the
[Unit Editor Interface]({{ interface_url }}/workflow-designer/unit-editor/#application).

!!!warning "Implementation on our platform"
    The user who wishes for additional functionality to be added to our platform in future should express so via a [support request]({{ interface_url }}/ui/support/).

## Executables

The platform provides a single [executable]({{ reference_url }}/software/components/#executables),
`q3`, which runs the MPI-parallel build of the engine. The input file is passed
to it as the only positional argument.

## Flavors

The `q3` executable allows for the following calculation
[flavor]({{ reference_url }}/software/components/#flavors).

- `q3_scf`: "self-consistent field" [total ground-state energy]({{ reference_url }}/properties-directory/scalar/total-energy/) calculation.

The [properties]({{ reference_url }}/properties/overview/) extracted from the
output of `q3_scf` are the
[total energy]({{ reference_url }}/properties-directory/scalar/total-energy/) and
the [Fermi energy]({{ reference_url }}/properties-directory/scalar/fermi-energy/).

## Input Files

The `q3_scf` flavor uses two input files. The first one, `material.json`, holds
the [material]({{ reference_url }}/materials/overview/) in its
[structured representation]({{ data_url }}/materials/data/). The template of
this file is filled from the job context: the workflow fetches the material of
the job from the platform and assigns it to the `MATERIAL` variable, which is
written to `material.json` at runtime.

The content of `material.json` can also be overwritten with complete material
data, for example in the [Unit Editor]({{ interface_url }}/workflow-designer/unit-editor/)
or in a command-line job. Material data in this format is available from the
[Standata](https://github.com/mat3ra/standata/tree/main/data/materials) repository
(`@mat3ra/standata`). Structures from the
[Materials Project](https://next-gen.materialsproject.org/materials/) database
can be [imported]({{ interface_url }}/materials/actions/import/) into the
platform first, which stores them in the same format.

The second input file, `q3_scf.yml`, is the Q3 input in YAML format, which
refers to `material.json` and sets the method, the self-consistent field
parameters, and the output location.

{% raw %}
```yaml
material: material.json

method:
  type: pseudopotential
  subtype: ultrasoft

  pseudopotentials:
{%- for specie in input.ATOMIC_SPECIES %}
    {{ specie.X }}: {{ specie.PseudoPot_X }}
{%- endfor %}

  cutoffs:
    wavefunction: {{ cutoffs.wavefunction }}
    density: {{ cutoffs.density }}

  scf:
    convergence_threshold: 1.0e-9
    max_iterations: 100

    smearing:
      type: gaussian
      degauss: 0.02

    mixing:
      beta: 0.3
      mode: broyden

    kgrid:
      dimensions: [{{ kgrid.dimensions | join(', ') }}]
      shifts: [{{ kgrid.shifts | join(', ') }}]

control:
  calculation: scf
  prefix: q3
  outdir: ./outdir/
```
{% endraw %}

The input is a [template]({{ reference_url }}/workflows/templating/overview/)
rendered at job submission. The pseudopotential files are resolved from the
elements of the material, the
[plane-wave cutoffs]({{ reference_url }}/methods-directory/pseudopotential/parameters/)
(in Rydberg) from the method parameters, and the
[k-point grid]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/)
from the unit settings.

## Examples

Two sets of ready-to-run inputs are available for Q3.

- The [q3/scf](https://github.com/mat3ra/cli-job-examples/tree/main/q3/scf)
example of the [CLI job examples](https://github.com/mat3ra/cli-job-examples)
repository contains a batch script, the Q3 input, and the material file for a self-consistent field calculation of FCC silicon, the same system as the Quantum
ESPRESSO `pw.x` example. On the compute clusters, the example is located under
`~/job_script_templates/q3/scf` and can be submitted as explained in the
[command-line jobs]({{ cli_url }}/jobs-cli/actions/create/) documentation.
- The [examples](https://github.com/camsai/q3/tree/main/examples) directory of
the Q3 source repository covers the total energy of semiconductors, metals,
magnetic metals, and isolated atoms, as well as band structures (including
Wannier interpolation), densities of states, and relaxations.
