# Generate Combinatorial Sets

This tutorial demonstrates how to create a **combinatorial set** of materials. III-V semiconductor compounds are used as an example, with permutations and combinations of n- and p-type dopants. Combinatorial sets of materials can be used to execute **combinatorial screening** to investigate, for example, the impact of inserting dopants on the [electronic band gap]({{ reference_url }}/properties-directory/non-scalar/band-gaps/) of such semiconductors.


## 1. Import the material into the collection

The first step is to import one of the III-V compound semiconductors, Gallium Phosphide (GaP), into the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials. This crystal structure can be **imported** directly from a remote repository by following the instructions in [this page]({{ interface_url }}/materials/actions/import/). The F-43m space group lowest-energy structure (the most stable polymorph of GaP) should be selected.


## 2. Open the material in Materials Designer

[Open]({{ interface_url }}/entities-general/actions/create/) a new instance of the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/). Import the above-mentioned Gallium Phosphide crystal structure via the [Import option]({{ interface_url }}/materials-designer/header-menu/input-output/import/) under the [Input/Output Menu]({{ interface_url }}/materials-designer/header-menu/input-output/).


## 3. Create the combinatorial set

### 3.1. Open the Generate Combinatorial Set dialog

The functionality to create combinatorial sets is accessible via the [Advanced Menu]({{ interface_url }}/materials-designer/header-menu/advanced/) of the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/). Select the "Combinatorial Set" option.

The operations available in the resulting dialog are described in detail [in this page]({{ interface_url }}/materials-designer/header-menu/advanced/combinatorial-set/).

### 3.2. Identify n- and p-type dopants for Gallium Phosphide

The following elements constitute dopant atoms when inserted into the Gallium Phosphide crystal structure:

- n-type: tellurium, selenium, sulphur (substituting phosphorus)
- p-type: zinc, magnesium (substituting Ga), tin (substituting P)

### 3.3. Generate permutations

**Permutations** change all element atoms in the [basis]({{ reference_url }}/properties-directory/structural/basis/) of the crystal structure simultaneously, and are enabled when chemical elements are separated by slashes (`/`) with no trailing spaces.

Replace the first line under the dialog, containing the Gallium atom located at the origin of the unit cell, with the following line:

```text
Zn/Mg 0.0 0.0 0.0
```

Pressing the **Generate Combinatorial Set** button generates the permutations of the Gallium Phosphide crystal structure containing p-type dopants, which are added to the [left-hand sidebar list]({{ interface_url }}/materials-designer/sidebar-items/}) of Materials Designer.

The basis atoms of the original GaP structure had the following atomic positions, expressed in fractional coordinates and viewable under the [source editor]({{ interface_url }}/materials-designer/source-editor/basis/):

```text
Ga     0.000000    0.000000    0.000000
P      0.750000    0.750000    0.750000
```

The resulting permutations consist of the following two crystal structure possibilities:

```text
Zn     0.000000    0.000000    0.000000
P      0.750000    0.750000    0.750000
```

```text
Mg     0.000000    0.000000    0.000000
P      0.750000    0.750000    0.750000
```

Permutations thus replaced the original Gallium atom at the origin with each of the Zinc and Magnesium p-type dopants.

### 3.4. Generate combinations

**Combinations** change the elements in the [basis]({{ reference_url }}/properties-directory/structural/basis/) one at a time, and are enabled when commas are used as separators (`,`) with no trailing spaces.

In order to explore combinations, replace both the Phosphorus and Gallium atoms in GaP with all possible n- and p-type dopant atoms. This can be achieved by entering the following content in the dialog:

```text
Zn,Mg           0.000000    0.000000    0.000000
Te,Se,S,Sn      0.750000    0.750000    0.750000
```

The resulting combinatorial list of atomic positions in the generated structures can be retrieved under the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/) of Materials Designer, once the **Generate Combinatorial Set** button is clicked:

```text
Zn     0.000000    0.000000    0.000000
Te     0.750000    0.750000    0.750000
```

```text
Zn     0.000000    0.000000    0.000000
Se     0.750000    0.750000    0.750000
```

```text
Zn     0.000000    0.000000    0.000000
S      0.750000    0.750000    0.750000
```

```text
Zn     0.000000    0.000000    0.000000
Sn     0.750000    0.750000    0.750000
```

```text
Mg     0.000000    0.000000    0.000000
Te     0.750000    0.750000    0.750000
```

```text
Mg     0.000000    0.000000    0.000000
Se     0.750000    0.750000    0.750000
```

```text
Mg     0.000000    0.000000    0.000000
S      0.750000    0.750000    0.750000
```

```text
Mg     0.000000    0.000000    0.000000
Sn     0.750000    0.750000    0.750000
```

### 3.5. Generate vacancy sites

When the "VAC" keyword is used instead of an element name, a vacancy is created at the corresponding crystal site. Vacancies can be added as part of the generated combinatorial set, and can be combined with either slashes for permutations or commas for combinations (with no trailing spaces).

An example of this functionality is provided [in this page]({{ interface_url }}/materials-designer/header-menu/advanced/combinatorial-set/#vacancy-sites).


## 4. Video walkthrough

The animation below demonstrates how the above-mentioned combinatorial sets can be generated within [Materials Designer]({{ interface_url }}/materials-designer/overview/), starting from the original Gallium Phosphide crystal structure.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/DJw4hwrBRnk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
