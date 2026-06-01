---
render_macros: true
---
# Setting Input Parameter Based on Elemental Composition

## Introduction

In this page we review setting input flags based on the data about material(s) and elemental constitution in particular. We present the template source that can be further re-used (copied and inserted) during the [workflow design]({{ interface_url }}/workflow-designer/overview/) stage.

## Source

The code below automatically sets the value of the "ENCUT" variable to higher values for materials that contain Nitrogen within their structures than for those than don't. In particular, ENCUT = 600 eV if Nitrogen is present, or ENCUT = 450 eV otherwise. This variable is found in [VASP](../../software-directory/modeling/vasp/overview.md) input file, and defines the cutoff energy characterizing the precision of the [DFT computation]({{ reference_url }}/models-directory/dft/parameters/).

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

Each line number in the above block of statements is described in what follows.

### 1. Spaceless Rendering

The initial `{% raw %}{% spaceless %}{% endraw %}` flag is explained [here]({{ reference_url }}/workflows/templating/swig/#spaceless)

### 2. Set Element Requiring Higher Cutoff Parameter (Nitrogen)

We begin the logic of our template by defining the element that needs a high plane-wave cutoff to be "N" for Nitrogen, using the [set statement]({{ reference_url }}/workflows/templating/jinja/#variables-assignment).

### 3. Read Structural Data

We then read the POSCAR input file for [VASP](../../software-directory/modeling/vasp/overview.md), and assign the text contents of this file to the variable "poscar_string". Examples of POSCAR files are included at the end of this section.

### 4 - 6. Extract Elements Contained in Material

We then identify the lines within the POSCAR file containing the element chemical symbols, by using the "split" function for breaking up the file text contents at every occurrence of the argument passed to this function.

We first break the lines at the mention of the `direct` string, and take all the preceding content. We then split this content at every new line (denoted by the newline unicode character "
"). As can be seen from the POSCAR examples shown below, the line under index 5 in the POSCAR format (starting to count from zero at the top of the file) is the line containing the chemical symbols. The list of elements contained in the material is consequently assigned to the variable "element_lines".

### 7 - 11. Check for Presence of Nitrogen in Material

An "if/else" [conditional block of statements]({{ reference_url }}/workflows/templating/jinja/#conditionals) is then included in the remainder of the above template. This checks for the presence of "Al" within the list of elements extracted from the POSCAR file of the material under investigation. If a positive match is encountered, then the variable "ENCUT" for the material simulation is correspondingly set to the higher value of 600 eV, otherwise in the contrary case it is set to a lower 450 eV.

### 12. Print Encut Variable Result

We conclude this first templating example by printing out the value of "ENCUT" identified in the preceding step, through the use of the double curly braces notation for printing the value of variables in the Jinja syntax.

### Example Outputs

#### Negative Match

Let us first assume that the POSCAR file under consideration consists in the following crystal structure data.

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

Hence, the output of the above template at the moment of rendering would in this case be `ENCUT =450`, since no Nitrogen is present in this particular material structure.

#### Positive Match

If, on the other hand, we consider the following alternative crystal structure definition, also expressed in a POSCAR format.

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

Then the rendered output of the template would in this case consist in `ENCUT = 600`, since Nitrogen is this time present within the crystal structure.

### Animation

In the animation below, we demonstrate how to switch between viewing the POSCAR structure file within the [Workflow Designer Interface]({{ interface_url }}/workflow-designer/unit-editor/input-templates/), to viewing the same template as above for setting the "ENCUT" parameter, and finally its rendered output. The final result is `ENCUT =600` in this case since the material under investigation consists in the Nitrogen-containing Al2N2 structure, shown in the above POSCAR file example.

<img data-gifffer="/images/tutorials/encut_template.gif">
