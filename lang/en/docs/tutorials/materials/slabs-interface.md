# Create an Interface

In this tutorial, the user will learn about how the [Material Designer Interface]({{ interface_url }}/materials-designer/overview/) of our platform can be used to create **two slabs**, and how to put them next to each other to create an **interface** [^1].

We consider the example of a **semiconductor-metal interface**, which is commonly encountered in a broad variety of semiconducting devices, by considering the case of a slab of gold placed next to a slab of silicon.

## Open Materials Designer 

We start with [opening]({{ interface_url }}/entities-general/actions/create/) an instance of the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/) for creating and designing new [Materials structures]({{ reference_url }}/materials/overview/) on our platform. 

## Create Slabs 

In order to create the gold and silicon slabs, the user should first [import]({{ interface_url }}/materials-designer/header-menu/input-output/import/) sample crystalline structures of the two respective materials into the current Materials Designer session, from the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials. 

!!!info "Default Material"
    Silicon may have been loaded by [default]({{ reference_url }}/materials/default/) initially at the moment of the opening of Materials Designer.
    
Once imported into Materials Designer, the gold and silicon crystals will appear as two distinct entry items within the list of structures shown on the [left-had items list sidebar]({{ interface_url }}/materials-designer/sidebar-items/) of the Designer interface.

The instructions contained [in this page]({{ interface_url }}/materials-designer/header-menu/advanced/surface-slab/) should then be followed in order to create a slab for each material, both with normal vector oriented along the [211] axis so as to be parallel to each other, using our surface/slab creator in Materials Designer, starting from the original crystalline samples. 

!!!warning "Straining needed"
    It is important to slightly strain the gold slab away from its equilibrium lattice configuration, in order to ensure a better matching between the two crystal structures across the interface.

## Open Multi-Materials 3D Editor

After both the silicon and the gold slabs have been created as two separate structural items in the current session of Materials Designer, the user should now open an instance of the [Multi-Materials 3D Editor]({{ interface_url }}/materials-designer/3d-editor/edit/) via the ["View" Menu]({{ interface_url }}/materials-designer/header-menu/view/#multi-material-3d-editor), located within the [header bar]({{ interface_url }}/materials-designer/header-menu/header-menu-intro/) of the Materials Deigner Interface.

## Combine the Two Materials

The Multi-Materials 3D Editor allows the two materials under investigation, gold and silicon, to be **combined** together into a new unified materials entity, separated by a small distance across an **interface** boundary. 

Care should be taken by the user to place the two slabs on top of each other in as "symmetrical" a way as possible, for example by positioning the center of the gold slab on the central portion of the other silicon slab. Relocation of each slab's position can be done by following the instructions contained [in this page]({{ interface_url }}/materials-designer/3d-editor/editor-actions/move-rotate-atoms/), after selecting the slab's atom components under the ["Scene" sidebar list]({{ interface_url }}/materials-designer/3d-editor/edit/#3.-scene) of the 3D Editor interface.

Since in this example the planes of the two slabs are already parallel to each other, a simple [translation]({{ interface_url }}/materials-designer/3d-editor/editor-actions/move-rotate-atoms/#translation) of the gold atoms on top of the silicon slab should suffice.

## Exit Multi-Materials 3D Editor

After the correct desired positioning of the gold slab on top of the silicon slab, the user should now [exit]({{ interface_url }}/materials-designer/3d-editor/edit/#exit-the-editor) the Multi-Materials 3D Editor, and return to the original Materials Designer interface.

The user will notice that a new material entry, called "New Material" by default, has now been created automatically and is listed within the [left-had items list sidebar]({{ interface_url }}/materials-designer/sidebar-items/) of the Materials Designer interface. It contains the combined gold-silicon interface crystallographic structure, as a new single material entity.

!!!tip "Toggling of Orthographic Camera"
    The user is recommended to toggle the use of the [Orthographic camera]({{ interface_url }}/materials-designer/3d-editor/view/#toggle-orthographic-camera) functionality, accessible via the [3D Editor interface]({{ interface_url }}/materials-designer/3d-editor/) of Materials Designer, in order to verify the correct alignment and centrality of the gold slab over the other slab made of silicon.

This new entry should first be [renamed]({{ interface_url }}/materials-designer/sidebar-items/#edit-name-of-item) to a more memorable form, and should finally be [saved]({{ interface_url }}/materials-designer/header-menu/input-output/save/) via the ["Input/Output" Menu]({{ interface_url }}/materials-designer/header-menu/input-output/) located at the top-left corner into the account-owned materials [collection]({{ reference_url }}/accounts/collections/), as a new material structure entry which is distinct from both the original isolated gold and silicon structures.

## Resulting Material

An animation of the final combined gold-silicon interface structure can be viewed below.

<img data-gifffer="/images/tutorials/interface.gif" />

## Animation

We demonstrate the above-mentioned steps which lead to the creation of a combined gold-silicon interface crystallographic system, made possible via the functionalities of the [Materials Designer Interface]({{ interface_url }}/materials-designer/overview/) of our platform, in the following animation. 

In this example, we consider a 3x3 supercell of the primitive unit cell of gold along the x-y basal plane as an approximate slab (larger supercell dimensions should be envisaged for a more realistic surface representation). For the case of silicon on the other hand, we limit the x-y supercell size of the slab to 2x2, due to the larger dimensions of the silicon unit cell compared to gold. This ensures that the two slabs are of approximately similar sizes across their interface on the x-y plane, for their easier superposition. For the case of both slabs, we define their vertical thickness to be composed of 6 layers.

We finally place the gold over the silicon slab such that the interface distance separating the two slabs along the vertical dimension is of approximately 2 Angstroms, as measured by the difference in the z coordinates of the positions of the gold and silicon interface atoms. Care needs to be taken to ensure that such separating distance applies also across the vertical periodic boundary condition of the system.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/odvrgTmWmCo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links

[^1]: [Wikipedia Grain boundary, Website](https://en.wikipedia.org/wiki/Grain_boundary)
