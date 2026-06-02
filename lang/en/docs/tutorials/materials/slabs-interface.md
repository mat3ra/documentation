# Create an Interface

This tutorial demonstrates how the [Material Designer Interface]({{ interface_url }}/materials-designer/overview/) can be used to create **two slabs** and combine them to form an **interface** [^1].

The example system is a **semiconductor-metal interface** — a gold slab placed next to a silicon slab — commonly encountered in semiconducting devices.


## 1. Open Materials Designer

[Open]({{ interface_url }}/entities-general/actions/create/) an instance of the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/).


## 2. Create the slabs

In order to create the gold and silicon slabs, first [import]({{ interface_url }}/materials-designer/header-menu/input-output/import/) sample crystalline structures of the two materials into the current Materials Designer session from the account-owned [collection]({{ reference_url }}/accounts/collections/).

!!!info "Default Material"
    Silicon may have been loaded by [default]({{ reference_url }}/materials/default/) at the moment of opening Materials Designer.

Once imported, the gold and silicon crystals appear as two distinct entries in the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/).

Follow the instructions [in this page]({{ interface_url }}/materials-designer/header-menu/advanced/surface-slab/) to create a slab for each material, both with normal vector oriented along the [211] axis so as to be parallel to each other.

!!!warning "Straining needed"
    It is important to slightly strain the gold slab away from its equilibrium lattice configuration in order to ensure a better matching between the two crystal structures across the interface.


## 3. Open the Multi-Materials 3D Editor

After both slabs have been created as separate structural items, open the [Multi-Materials 3D Editor]({{ interface_url }}/materials-designer/3d-editor/edit/) via the [View Menu]({{ interface_url }}/materials-designer/header-menu/view/#multi-material-3d-editor).


## 4. Combine the two materials

The Multi-Materials 3D Editor allows the two materials to be **combined** into a new unified entity separated by a small distance across an **interface** boundary.

The two slabs should be placed on top of each other as symmetrically as possible. Relocation of each slab can be done following the instructions [in this page]({{ interface_url }}/materials-designer/3d-editor/editor-actions/move-rotate-atoms/), after selecting the slab's atom components under the [Scene sidebar list]({{ interface_url }}/materials-designer/3d-editor/edit/#3.-scene).

Since in this example the planes of the two slabs are already parallel, a [translation]({{ interface_url }}/materials-designer/3d-editor/editor-actions/move-rotate-atoms/#translation) of the gold atoms on top of the silicon slab is sufficient.


## 5. Exit the Multi-Materials 3D Editor

After correct positioning, [exit]({{ interface_url }}/materials-designer/3d-editor/edit/#exit-the-editor) the Multi-Materials 3D Editor.

A new material entry, called "New Material" by default, is created and listed in the [left-hand sidebar]({{ interface_url }}/materials-designer/sidebar-items/). It contains the combined gold-silicon interface crystallographic structure as a single material entity.

!!!tip "Toggling of Orthographic Camera"
    Toggling the [Orthographic camera]({{ interface_url }}/materials-designer/3d-editor/view/#toggle-orthographic-camera) via the [3D Editor]({{ interface_url }}/materials-designer/3d-editor/) helps verify the correct alignment and centrality of the gold slab over the silicon slab.

This new entry should be [renamed]({{ interface_url }}/materials-designer/sidebar-items/#edit-name-of-item) and [saved]({{ interface_url }}/materials-designer/header-menu/input-output/save/) into the account-owned materials [collection]({{ reference_url }}/accounts/collections/).


## 6. View the resulting material

An animation of the final combined gold-silicon interface structure can be viewed below.

<img data-gifffer="/images/tutorials/interface.gif" />


## 7. Video walkthrough

The animation below demonstrates the creation of a combined gold-silicon interface crystallographic system using [Materials Designer]({{ interface_url }}/materials-designer/overview/).

In this example, a 3×3 supercell of the primitive unit cell of gold along the x-y basal plane is used as an approximate slab. For silicon, the x-y supercell size is limited to 2×2 due to the larger silicon unit cell, ensuring the two slabs are of approximately similar sizes across their interface. For both slabs, the vertical thickness is set to 6 layers.

The gold slab is placed over the silicon slab such that the interface distance separating the two slabs along the vertical dimension is approximately 2 Å, as measured by the difference in z coordinates of the gold and silicon interface atoms. Care is taken to ensure that this separating distance also applies across the vertical periodic boundary condition.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/odvrgTmWmCo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## 8. Links

[^1]: [Wikipedia Grain boundary](https://en.wikipedia.org/wiki/Grain_boundary)
