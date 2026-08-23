---
render_macros: true
---
# Setting Input Parameter Based on Elemental Composition

## 1. Introduction

This page explains how to set input flags based on material elemental composition data. The template source presented below can be re-used (copied and inserted) during the [workflow design]({{ interface_url }}/workflow-designer/overview/) stage.


## 2. Source

The code below sets the value of the "ENCUT" variable to a higher value for materials that contain Nitrogen than for those that do not. ENCUT is set to 600 eV if Nitrogen is present, or 450 eV otherwise. This variable is found in [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) input files and defines the cutoff energy characterizing the precision of the [DFT computation]({{ reference_url }}/models-directory/dft/parameters/).

{% raw %}
```jinja
{% spaceless %}
{% set high_cutoff_element = "N" %}
{% set poscar_string = input.POSCAR|e("js") %}
{% set atoms = poscar_string.split('direct')[0] %}
{% set lines = atoms.split("
") %}
{% set element_lines = lines[5] %}
{% if element_lines.includes(high_cutoff_element) %}
  {% set ENCUT = 600 %}
{% else %}
  {% set ENCUT = 450 %}
{% endif %}
ENCUT = {{ ENCUT }}
{% endspaceless %}
```
{% endraw %}

Each line in the above block of statements is described in the following sections.

### 2.1. Spaceless rendering

The initial {% raw %}`{% spaceless %}`{% endraw %} flag is explained [here]({{ reference_url }}/workflows/templating/swig/#spaceless).

### 2.2. Set the element requiring a higher cutoff parameter (Nitrogen)

The logic of the template begins by defining the element that needs a high plane-wave cutoff as "N" for Nitrogen, using the [set statement]({{ reference_url }}/workflows/templating/jinja/#variables-assignment).

### 2.3. Read structural data

The POSCAR input file for [VASP]({{ reference_url }}/software-directory/modeling/vasp/overview/) is then read, and the text contents of this file are assigned to the variable "poscar_string". Examples of POSCAR files are included at the end of this section.

### 2.4. Extract elements contained in the material

The lines within the POSCAR file containing the element chemical symbols are identified by using the "split" function to break up the file text at every occurrence of the argument passed to this function.

The lines are first split at the mention of the `direct` string, taking all preceding content. This content is then split at every new line (denoted by the newline unicode character). As shown in the POSCAR examples below, the line under index 5 in the POSCAR format (counting from zero at the top of the file) contains the chemical symbols. The list of elements is assigned to the variable "element_lines".

### 2.5. Check for the presence of Nitrogen in the material

An "if/else" [conditional block]({{ reference_url }}/workflows/templating/jinja/#conditionals) checks for the presence of "N" within the list of elements extracted from the POSCAR file. If a positive match is found, "ENCUT" is set to 600 eV; otherwise it is set to 450 eV.

### 2.6. Print the ENCUT variable result

The value of "ENCUT" identified in the preceding step is printed using the double curly braces notation for variable output in Jinja syntax.


## 3. Example outputs

### 3.1. Negative match

Assume the POSCAR file under consideration consists of the following crystal structure data:

```
Ga4 Sb4
1.0
6.219063 0.000000 0.000000
0.000000 6.219063 0.000000
0.000000 0.000000 6.219063
Ga Sb
4 4
direct
0.000000 0.000000 0.000000 Ga
0.000000 0.500000 0.500000 Ga
0.500000 0.000000 0.500000 Ga
0.500000 0.500000 0.000000 Ga
0.250000 0.250000 0.750000 Sb
0.250000 0.750000 0.250000 Sb
0.750000 0.250000 0.250000 Sb
0.750000 0.750000 0.750000 Sb
```

The output of the template at rendering time would be `ENCUT =450`, since no Nitrogen is present.

### 3.2. Positive match

Consider the following alternative crystal structure in POSCAR format:

```
Example
1.0
   3.128588000	   0.000000000	   0.000000000
  -1.564294000	   2.709436686	   0.000000000
   0.000000000	   0.000000000	   5.016955000
Al N
2 2
direct
   0.666667000    0.333333000    0.499287000 Al
   0.333333000    0.666667000    0.000000000 Al
   0.666667000    0.333333000    0.880713000 N
   0.333333000    0.666667000    0.380713000 N
```

The rendered output in this case is `ENCUT = 600`, since Nitrogen is present.


## 4. Video walkthrough

The animation below demonstrates switching between viewing the POSCAR structure file within the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/unit-editor/input-templates/), viewing the template for setting the "ENCUT" parameter, and its rendered output. The result is `ENCUT =600` since the material under investigation is the Nitrogen-containing Al₂N₂ structure.

<img data-gifffer="/images/tutorials/encut_template.gif">
