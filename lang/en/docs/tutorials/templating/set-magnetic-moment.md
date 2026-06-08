---
render_macros: true
---
# Setting Magnetic Moment on Atoms by Specie

## 1. Introduction

This page explains how to set atom-specific input flags based on material data. The template source presented below can be re-used (copied and inserted) during the [workflow design]({{ interface_url }}/workflow-designer/overview/) stage.


## 2. Source

The template code below sets the value of magnetic moments for ferromagnetic elements present in a material structure to 5 and alternates the sign. Non-magnetic elements are set to zero. The rendered output is suitable for a [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) simulation.

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

Each line in the above block of statements is described in the following sections.


### 2.1. Define the MAGMOM variable

The "MAGMOM" variable [^1] is defined for inclusion in the [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) "INCAR" input parameters file. The {% raw %}`{% spaceless %}`{% endraw %} flag is explained [here]({{ reference_url }}/workflows/templating/swig/#spaceless).

### 2.2. Define ferromagnetic elements

The ferromagnetic elements that need magnetic moments assigned are defined using the [set statement]({{ reference_url }}/workflows/templating/jinja/#variables-assignment): Vanadium (V), Chromium (Cr), Manganese (Mn), Iron (Fe), Cobalt (Co), and Nickel (Ni).

### 2.3. Read POSCAR content

The content of the POSCAR file used by [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/), containing the numerical data defining the crystal structure, is read and assigned to the variable "poscar_string".

### 2.4. Read atomic coordinates

The lines containing atomic coordinates and element chemical symbols within the POSCAR file are extracted by splitting the file contents following the "direct" line, and assigned to the "coordinates" variable.

### 2.5. Set the magnetic moments

The list of atomic coordinates is looped through using a [for loop]({{ reference_url }}/workflows/templating/jinja/#for-loops).

The element symbol at the end of each coordinate line is isolated and checked against the list of ferromagnetic elements through a [conditional statement]({{ reference_url }}/workflows/templating/jinja/#conditionals). If a positive match is detected, the element is assigned a magnetic moment value of ±5 in alternating order. Otherwise, a magnetic moment of zero is assigned.

### 2.6. Return the final output

The final "MAGMOM" variable is returned once the template is rendered, as a list of magnetic moment values.


## 3. Example output

Consider the following hypothetical example of a material structure (Cobalt Oxide) in POSCAR format:

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

The rendered output for this case is the following line, since Cobalt is ferromagnetic and Oxygen is not:

```
MAGMOM = 5 -5 5 -5 5 -5 5 -5 0 0 0 0 0
```


## 4. Video walkthrough

The animation below demonstrates switching between viewing the POSCAR structure file for Cobalt Oxide within [Workflow Designer]({{ interface_url }}/workflow-designer/unit-editor/input-templates/), viewing the template for adding the MAGMOM parameter to the INCAR input file, and its rendered output.

<img data-gifffer="/images/tutorials/magmom_template.gif">


## 5. Links

[^1]: [MAGMOM Tag in VASP, Official Documentation](https://cms.mpi.univie.ac.at/vasp/vasp/MAGMOM_tag.html)
