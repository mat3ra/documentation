# Create Interpolated Sets

This tutorial explains how to create an [interpolated set]({{ interface_url }}/materials-designer/header-menu/advanced/interpolated-set/), necessary for calculating the energy profile and activation barrier for chemical reactions via the Nudged Elastic Bands (NEB) method, which is described in a [separate tutorial](../dft/chemical/reaction-profile-qe.md).

The example system is a one-dimensional, three-atom molecule of Hydrogen (H3).


## 1. Upload initial and final images to the materials collection

The datafiles containing the structural information for the initial and final states of the H3 molecule should first be [uploaded]({{ interface_url }}/materials/actions/upload/) to the account-owned collection of materials.

The following two POSCAR files contain the structural parameters for the initial and final molecular configurations respectively:

```text
initial
1.0
   6.350127000	   0.000000000	   0.000000000
   0.000000000	   2.645886000	   0.000000000
   0.000000000	   0.000000000	   2.645886000
H
3
direct
   0.619441600    0.000000000    0.000000000 H
   0.000000000    0.000000000    0.000000000 H
   0.129813900    0.000000000    0.000000000 H
```

```text
final
1.0
   6.350127000	   0.000000000	   0.000000000
   0.000000000	   2.645886000	   0.000000000
   0.000000000	   0.000000000	   2.645886000
H
3
direct
   0.870186100    0.000000000    0.000000000 H
   0.000000000    0.000000000    0.000000000 H
   0.380558400    0.000000000    0.000000000 H
```


## 2. Create an interpolated set via Materials Designer

### 2.1. Open Materials Designer and import the configurations

[Open]({{ interface_url }}/entities-general/actions/create/) an instance of the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/). Import the initial and final configurations by following [these instructions]({{ interface_url }}/materials-designer/header-menu/input-output/import/). It is essential to [clone]({{ interface_url }}/materials-designer/header-menu/edit/#clone) both initial and final images before generating the interpolated set, and to [delete]({{ interface_url }}/materials-designer/sidebar-items/#delete-item) the original structures from the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/) for correct index attribution within the resulting ordered set.

### 2.2. Generate the interpolated set

Before creating a new interpolated set, the active structure selected on the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/) must be the initial image (not the final). This ensures that intermediate images are correctly injected between the initial and final configurations.

The Interpolated Set can be generated via the [corresponding option]({{ interface_url }}/materials-designer/header-menu/advanced/interpolated-set/) within the [Advanced Menu]({{ interface_url }}/materials-designer/header-menu/advanced/) of the [header bar]({{ interface_url }}/materials-designer/header-menu/header-menu-intro/).

In the resulting dialog, the total number of intermediate images to generate can be selected — 3 intermediate images are used in this example.

### 2.3. Add atomic constraints

**Atomic Constraints**, specifying the constraints on atom movement, can be defined as explained [in this page]({{ reference_url }}/properties-directory/structural/basis/#atomic-constraints).

These constraints need only be added to the initial image before the creation of the interpolated set, under the [basis panel]({{ interface_url }}/materials-designer/source-editor/basis/) of the [source editor]({{ interface_url }}/materials-designer/source-editor/) in [Materials Designer]({{ interface_url }}/materials-designer/overview/). Once the interpolated set is generated, the same constraints are applied to all other intermediate images.

Adding atomic constraints can help make the ensuing NEB calculation more computationally efficient.

### 2.4. Inspect intermediate images

The structures for all resulting intermediate images are listed alongside the initial and final molecular configurations in the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/). These images can be visualized and cycled through using the [3D structure editor]({{ interface_url }}/materials-designer/3d-editor/).


## 3. Save all images in an NEB SET

All generated images should be [saved]({{ interface_url }}/materials-designer/header-menu/input-output/save/) into an ordered set called "NEB SET", as described below. The creation and selection of sets is made possible by the appropriate option of the "Save Items" dialog.

### 3.1. Create an ordered set

[These instructions]({{ interface_url }}/entities-general/actions/create-sets/) demonstrate how to create a [Set]({{ reference_url }}/entities-general/sets/) within the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials, named "NEB SET". After creation, the type of this set should be [changed]({{ interface_url }}/entities-general/actions/change-set-type/) to **ordered**.


## 4. Video walkthroughs

### 4.1. General interpolated set creation

The animation below demonstrates the steps involved in generating an Interpolated Set for the linear H3 molecule. The video concludes by inspecting the full list of images under the [Explorer Interface]({{ interface_url }}/entities-general/ui/explorer/) of the newly-created "NEB SET".

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/ijn-SKEojLU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### 4.2. Constrained interpolated set creation

The animation below demonstrates how to add atomic constraints to a new "Constrained" Interpolated Set for NEB applications. The movement of atoms is confined to the x-direction since the H3 molecules are entirely one-dimensional. This is done by adding the "1 0 0" line next to the atoms in the initial image, except for the atom located at the origin, for which a "0 0 0" constraint suffices since it remains fixed at all times.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/je1CgaMOFQ4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
