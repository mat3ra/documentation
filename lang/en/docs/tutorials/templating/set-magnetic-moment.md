---
render_macros: true
---
# Setting Magnetic Moment on Atoms by Specie

## Introduction

In this page we review setting input atom-specific flags based on the data about material. We present the template source that can be further re-used (copied and inserted) during the [workflow design]({{ interface_url }}/workflow-designer/overview/) stage.

## Source

The template code below sets the value of magnetic moments for ferromagnetic elements present in a material structure to number `5`, and alternates the sign. Non-magnetic elements are instead set to zero. The rendered output of this template is suitable for a [VASP](../../software-directory/modeling/vasp/overview.md) simulation.

{% raw %}
```jinja
MAGMOM = {% spaceless %}
{% set magnetic_elements = ['V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni'] %}
{% set poscar_string = input.POSCAR|e("js") %}
{% set coordinates = poscar_string.split('direct')[1] %}
{% set sign = 1 %}
{% for line in coordinates.split("
") %}
  {% if loop.index0 > 0 %}
    {% set trimmed_line =  line.trim() | replace(' +(?= )','','g') %}
    {% set element = trimmed_line.split(' ')[3] %}
    {% set is_magnetic = 0 %}
    {% if magnetic_elements.includes(element) %}{{' '}}{{ 5 * sign }}
      {% set sign = sign * -1 %}
      {% set is_magnetic = 1 %}
    {% endif magnetic_elements.includes(element) %}
    {% if is_magnetic == 0 %}{{' '}}{{ 0 }}{% endif %}
  {% endif loop.index0 %}
{% endfor line in coordinates.split("
") %}
{% endspaceless %}
```
{% endraw %}

Each line number in the above block of statements is further explained in the ensuing sections.


### 1. Define MAGMOM Variable

We begin by defining the "MAGMOM" variable [^1], which will be included in the input file for a [VASP](../../software-directory/modeling/vasp/overview.md) computation, within the "INCAR" input parameters file associated with this code. `{% raw %}{% spaceless %}{% endraw %}` flag is explained [here]({{ reference_url }}/workflows/templating/swig/#spaceless)

### 2. Define Ferromagnetic Elements

In the second line, we [set]({{ reference_url }}/workflows/templating/jinja/#variables-assignment) the ferromagnetic elements, that need to have magnetic moments attributed to them, to be constituted of the following list: Vanadium (V), Chromium (Cr), Manganese (Mn), Iron (Fe), Cobalt (Co), and Nickel (Ni).

### 3. Read POSCAR Content

We then read the content ot POSCAR used by [VASP](../../software-directory/modeling/vasp/overview.md), containing the numerical data defining the crystal structure under investigation. We assign the text contents of this structure file to the variable "poscar_string".

### 4. Read Atomic Coordinates

The lines containing the atomic coordinates and element chemical symbols within the POSCAR file are then read. This is done by splitting the file contents ensuing the "direct" line, which are then passed to the "coordinates" variable.

### 5-17. Set Magnetic Moments

The list of atomic coordinates defined previously is then looped over through the use of a [for loop]({{ reference_url }}/workflows/templating/jinja/#for-loops).

The element symbol indicated at the end of each coordinate line is isolated in turn (line 8) and assigned to the variable "element", which is checked against the aforementioned list of ferromagnetic elements (line 10) through a [conditional statement]({{ reference_url }}/workflows/templating/jinja/#conditionals). If a positive match is detected, this element is assigned a magnetic moment value of +/- 5 in an alternating order (line 11). Otherwise, in case the element is found to be non-ferromagnetic, it is given a magnetic moment of zero (line 15).

### 18. Return Final Output

The final result of the "MAGMOM" variable is returned once the template is rendered, as a list of magnetic moment values.

### Example Output

Let us consider the following hypothetical example of a material structure (Cobalt Oxide), inserted under the POSCAR format.

```
Cobalt Oxide
1.0
8.151852 0.000000 0.000000
0.000000 8.151852 0.000000
0.000000 0.000000 8.151852
Co O
8 5
direct
0.000000 0.000000 0.000000 Co
0.750000 0.750000 0.250000 Co
0.500000 0.500000 0.000000 Co
0.000000 0.500000 0.500000 Co
0.250000 0.250000 0.250000 Co
0.500000 0.000000 0.500000 Co
0.250000 0.750000 0.750000 Co
0.750000 0.250000 0.750000 Co
0.111256 0.111256 0.388744 O
0.138744 0.861256 0.138744 O
0.888744 0.111256 0.611256 O
0.361256 0.861256 0.361256 O
0.611256 0.388744 0.611256 O
```

The rendered output of the above template for this particular case would be the following line, since Cobalt is ferromagnetic and Oxygen is not.

```
MAGMOM = 5 -5 5 -5 5 -5 5 -5 0 0 0 0 0
```

### Animation

In the following animation, we demonstrate how to switch between viewing the POSCAR structure file for Cobalt Oxide within [Workflow Designer]({{ interface_url }}/workflow-designer/unit-editor/input-templates/), to viewing the template for adding the MAGMOM parameter to the INCAR input file, and finally its rendered output.

<img data-gifffer="/images/tutorials/magmom_template.gif">

## Links

[^1]: [MAGMOM Tag in VASP, Official Documentation](https://cms.mpi.univie.ac.at/vasp/vasp/MAGMOM_tag.html)
