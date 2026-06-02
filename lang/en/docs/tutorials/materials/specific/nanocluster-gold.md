---
tags:
  - gold
  - cluster
  - nanoparticle
  - cuboctahedron
  - icosahedron
  - P-0D-NPR

hide:
  - tags
# YAML header
render_macros: true
---

# Gold Nanoclusters.

## Introduction.

This tutorial demonstrates the process of creating a gold nanoparticle structures based on the work presented in the following manuscript.

!!!note "Manuscript"
    > **A. H. Larsen, J. Kleis, K. S. Thygesen, J. K. Nørskov, and K. W. Jacobsen**,
    > "Electronic shell structure and chemisorption on gold nanoparticles",
    > *Phys. Rev. B 84, 245429 (2011)*,
    > [DOI: 10.1103/PhysRevB.84.245429](https://doi.org/10.1103/PhysRevB.84.245429){:target='_blank'}. [@Larsen2011]

We use the [Materials Designer]({{ interface_url }}/materials-designer/overview/) to create gold nanoparticle structures of cuboctahedral and icosahedral shapes as shown in the image below.


![Gold Nanoparticles](../../../images/tutorials/materials/0d_materials/nanocluster_gold/0-manuscript-image.webp "Fig. 2. Gold Nanoparticles")

## 1. Load and preview Gold structure.

First, we navigate to [Materials Designer]({{ interface_url }}/materials-designer/overview/) and import the Gold material from the [Standata]({{ interface_url }}/materials-designer/header-menu/input-output/standata-import/).

![Standata Gold Import](../../../images/tutorials/materials/0d_materials/nanocluster_gold/1-standata-import-gold.webp "Standata Gold Import")

Then we will use the [JupyterLite]({{ interface_url }}/jupyterlite/overview/) environment to create gold nanoparticle structures.

## 2. Create cuboctahedra.

### 2.1 Launch JupyterLite Session.

Select the "Advanced > [JupyterLite Transformation]({{ interface_url }}/materials-designer/header-menu/advanced/jupyterlite-dialog/)" menu item to launch the JupyterLite environment.

![JupyterLite Dialog](../../../images/jupyterlite/md-advanced-jl.webp "JupyterLite Dialog")

### 2.2. Open and modify the notebook.

Next, edit `create_cluster_ase.ipynb` notebook to modify the parameters by changing values:

 - `shape = ASENanoparticleShapesEnum.OCTAHEDRON` - the shape of the nanocluster
 - `parameters = {"length": 5, "cutoff": 2}` - the parameters of the nanocluster according to [ASE Cluster Octahedron](https://wiki.fysik.dtu.dk/ase/ase/cluster/cluster.html#ase.cluster.Octahedron) documentation.

Cuboctahedron shape is achieved by setting parameters of the octahedron to be in relationship: `length = 2 * cutoff + 1`

Copy the content below and adjust the "1.1. Set up slab parameters" cell in the notebook:

```python
from mat3ra.made.tools.build.pristine_structures.zero_dimensional.nanoparticle import NanoparticleShapesEnum

shape = NanoparticleShapesEnum.OCTAHEDRON
parameters = {
    "length": 5,
    "cutoff": 2
}
```

![Setup for cuboctahedron cluster](../../../images/tutorials/materials/0d_materials/nanocluster_gold/2-jl-setup.webp "Setup for cuboctahedron cluster")

### 2.3. Run the notebook.

Run the notebook by selecting "Run > Run All Cells" from the menu.

![Run All](../../../images/jupyterlite/run-all.webp "Run All")

### 2.4. Analyze the Results.

After running the notebook, the octahedral gold nanoparticle structure will be created. 

The user will be able to visualize the created structure and download the corresponding files.

For better view of the solid symmetry rotation of image might be needed like `"rotation": "45y,45x"` for the cuboctahedron.

![Cuboctahedron Gold Nanocluster](../../../images/tutorials/materials/0d_materials/nanocluster_gold/3-jl-result-preview.webp "Cuboctahedron Gold Nanocluster")

### 2.5. Pass the Material to the Materials Designer.

After reviewing the results, the user can pass the material to Materials Designer for further analysis.

![Final Material](../../../images/tutorials/materials/0d_materials/nanocluster_gold/4-wave-result.webp "Final Material")

Or the user can [save or download]({{ interface_url }}/materials-designer/header-menu/input-output/) the material in Material JSON format or POSCAR format.

## 3. Create clusters with other shapes and sizes.

### 3.1. Repeat the steps above.

Repeat the steps above to create gold nanoparticle structures with other shapes and sizes.

To create the rest of the structures set the `shape` and other parameters accordingly:

For Cuboctahedron with 147 atoms:

```python
shape = NanoparticleShapesEnum.OCTAHEDRON
parameters = {
    "length": 7,
    "cutoff": 3
}
```

![Cuboctahedron 147](../../../images/tutorials/materials/0d_materials/nanocluster_gold/jl-result-preview-cuboctahedron-147.webp "Cuboctahedron 147")

For Cuboctahedron with 309 atoms:

```python
shape = NanoparticleShapesEnum.OCTAHEDRON
parameters = {
    "length": 9,
    "cutoff": 4
}
```

![Cuboctahedron 309](../../../images/tutorials/materials/0d_materials/nanocluster_gold/jl-result-preview-cuboctahedron-309.webp "Cuboctahedron 309")

For Icosahedron with 55 atoms:

```python
shape = ASENanoparticleShapesEnum.ICOSAHEDRON
parameters = {
    "noshells": 3
}
```

![Icosahedron 55](../../../images/tutorials/materials/0d_materials/nanocluster_gold/jl-result-preview-icosahedron-55.webp "Icosahedron 55")

For Icosahedron with 147 atoms:

```python
shape = ASENanoparticleShapesEnum.ICOSAHEDRON
parameters = {
    "noshells": 4
}
```

![Icosahedron 147](../../../images/tutorials/materials/0d_materials/nanocluster_gold/jl-result-preview-icosahedron-147.webp "Icosahedron 147")

For Icosahedron with 309 atoms:

```python
shape = ASENanoparticleShapesEnum.ICOSAHEDRON
parameters = {
    "noshells": 5
}
```

![Icosahedron 309](../../../images/tutorials/materials/0d_materials/nanocluster_gold/jl-result-preview-icosahedron-309.webp "Icosahedron 309")

## Interactive JupiterLite Notebook.

The interactive JupyterLite notebook for creating Gold Nanoclusters can be accessed below. To run the notebook, click on the "Run All" button.

{% with origin_url=config.extra.jupyterlite.origin_url %}
{% with notebooks_path_root=config.extra.jupyterlite.notebooks_path_root %}
{% with notebook_name='specific_examples/nanocluster_gold.ipynb' %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}
{% endwith %}
{% endwith %}

## References.
