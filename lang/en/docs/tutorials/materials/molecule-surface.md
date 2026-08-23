# Create a Molecule on a Surface

This tutorial demonstrates how the [Material Designer Interface]({{ interface_url }}/materials-designer/overview/) can be used to create a geometry for modeling a **surface chemical reaction**, where a **molecule interacts with a surface** and undergoes, for example, a chemical **adsorption** process [^1].

The example system is a **benzene molecule** adsorbed on a **gold (Au) (211) surface**. The chemical structure of the benzene molecule is given in the expandable section below in the POSCAR input data format.


## 1. Reference structures

<details markdown="1">
  <summary>
    Benzene molecule, POSCAR ...
  </summary>

```text
C H
1.00000000000000
20.0000000000000000 0.0000000000000000 0.0000000000000000
0.0000000000000000 20.0000000000000000 0.0000000000000000
0.0000000000000000 0.0000000000000000 20.0000000000000000
6 6
Direct
0.5000000000000000 0.4302298156365565 0.5000000000000000
0.5603808840462569 0.4651341647080757 0.5000000000000000
0.5603808840462569 0.5348658352919243 0.5000000000000000
0.5000000000000000 0.5697701843634434 0.5000000000000000
0.4396191159537430 0.5348658352919243 0.5000000000000000
0.4396191159537430 0.4651341647080757 0.5000000000000000
0.5000000000000000 0.3757603875449354 0.5000000000000000
0.6075652945069621 0.4379113406185772 0.5000000000000000
0.6075652945069621 0.5620886593814227 0.5000000000000000
0.5000000000000000 0.6242396124550644 0.5000000000000000
0.3924347054930378 0.5620886593814227 0.5000000000000000
0.3924347054930378 0.4379113406185772 0.5000000000000000
```

</details>

Alternatively, the benzene molecular structure can be retrieved from the **Pubchem** public repository [^2] and converted to POSCAR format using any online converter such as the **OpenBabel** Open Source Chemistry Toolbox [^3].


## 2. Create the benzene molecule entry in the materials collection

The chemical structure for benzene can be [imported]({{ interface_url }}/materials/actions/copy-bank/) from the [Materials Bank]({{ reference_url }}/materials/bank/) into the account-owned [collection]({{ reference_url }}/accounts/collections/), if not already present.

Alternatively, the above-mentioned POSCAR structure can be manually [uploaded]({{ interface_url }}/materials/actions/upload/) into the materials collection after saving its data contents to a new file on the local disk.


## 3. Open Materials Designer

[Open]({{ interface_url }}/entities-general/actions/create/) an instance of the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/).


## 4. Create the gold surface

In order to create a gold surface, first [import]({{ interface_url }}/materials-designer/header-menu/input-output/import/) a sample crystalline structure of pure gold into the current Materials Designer session from the account-owned [collection]({{ reference_url }}/accounts/collections/).

Follow the instructions [in this page]({{ interface_url }}/materials-designer/header-menu/advanced/surface-slab/) to create a surface of gold with normal vector oriented along the [211] axis.

!!!warning "Order of structures is important"
    The gold surface must be created first so that it appears first in the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/), ensuring its cell is used when later combining the two materials together.


## 5. Import the benzene molecule into Materials Designer

The benzene molecule should be [imported]({{ interface_url }}/materials-designer/header-menu/input-output/import/) into the current Materials Designer session from the account-owned [collection]({{ reference_url }}/accounts/collections/).

Once imported, the benzene molecule appears as a distinct entry in the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/), alongside the previously-generated gold surface.

Any other material structure entries listed in the sidebar — aside from benzene and the gold surface — should be [removed]({{ interface_url }}/materials-designer/sidebar-items/#delete-item).


## 6. Open the Multi-Materials 3D Editor

After both the benzene molecule and the gold surface are listed as separate structural items, open the [Multi-Materials 3D Editor]({{ interface_url }}/materials-designer/3d-editor/edit/) via the [View Menu]({{ interface_url }}/materials-designer/header-menu/view/#multi-material-3d-editor).


## 7. Combine the two materials

The Multi-Materials 3D Editor allows the two materials to be **combined** into a new unified entity.

The molecule should be positioned on top of the surface in as "symmetrical" a way as possible, for example by placing the center of the benzene ring over the central portion of the surface. Relocation of the benzene molecule position can be done following the instructions [in this page]({{ interface_url }}/materials-designer/3d-editor/editor-actions/move-rotate-atoms/), after selecting the benzene atom components under the [Scene sidebar list]({{ interface_url }}/materials-designer/3d-editor/edit/#3.-scene).

Since in this example the plane of the 2D benzene molecule and the gold (211) surface are already parallel, a [translation]({{ interface_url }}/materials-designer/3d-editor/editor-actions/move-rotate-atoms/#translation) of the benzene atoms onto the surface is sufficient.


## 8. Exit the Multi-Materials 3D Editor

After correct positioning of the benzene molecule on top of the gold surface, [exit]({{ interface_url }}/materials-designer/3d-editor/edit/#exit-the-editor) the Multi-Materials 3D Editor.

A new material entry, called "New Material" by default, is created and listed in the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/). It contains the combined benzene-gold surface crystallographic structure as a single material entity.

!!!tip "Toggling of Orthographic Camera"
    Toggling the [Orthographic camera]({{ interface_url }}/materials-designer/3d-editor/view/#toggle-orthographic-camera) via the [3D Editor]({{ interface_url }}/materials-designer/3d-editor/) helps verify the correct alignment and centrality of the benzene molecule over the surface.

This new entry should be [renamed]({{ interface_url }}/materials-designer/sidebar-items/#edit-name-of-item) to a more memorable form and [saved]({{ interface_url }}/materials-designer/header-menu/input-output/save/) into the account-owned materials [collection]({{ reference_url }}/accounts/collections/).


## 9. View the resulting material

An animation of the final combined benzene molecule-gold surface structure can be viewed below.

<img data-gifffer="/images/tutorials/molecule-surface-sample.gif" />


## 10. Run further analysis

The newly generated benzene-gold surface system can be used for further analysis, such as studying the adsorption energy.

The [Nudged Elastic Band (NEB)]({{ reference_url }}/models/auxiliary-concepts/nudged-elastic-band/) method can be used for reaction energy profile calculations. Two alternative approaches for implementing NEB are available, based on [VASP](../dft/chemical/reaction-profile-vasp.md) and [Quantum ESPRESSO](../dft/chemical/reaction-profile-qe.md) respectively.


## 11. Video walkthrough

The animation below demonstrates the creation of a combined benzene molecule/gold surface crystallographic system using the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/).

In this example, a 3×3×3 slab supercell of the primitive unit cell of gold is used as a surface approximation (larger supercell dimensions should be used for a more realistic surface representation). The benzene molecule is placed over the gold surface at a molecule-surface distance of approximately 3.6 Å, as measured by the difference in z coordinates of the benzene and gold surface atoms.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/aCjapKJ0y9c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 12. Links

[^1]: [Wikipedia Adsorption](https://en.wikipedia.org/wiki/Adsorption)

[^2]: [Pubchem Benzene Datasheet](https://pubchem.ncbi.nlm.nih.gov/compound/241)

[^3]: [OpenBabel Web Interface, ChemInfo](http://www.cheminfo.org/Chemistry/Cheminformatics/FormatConverter/index.html)
