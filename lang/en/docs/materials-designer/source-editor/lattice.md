# Crystal Lattice

Every crystal structure has an underlying Bravais lattice. For more theoretical background, please refer to [this page]({{ reference_url }}/properties-directory/structural/lattice/). 

## Opening the Crystal Lattice editor

The parameters of a Material's Bravais lattice  can be edited and set by expanding the top "Crystal Lattice" section in the central panel of the Materials Designer interface. The appearance of this "Crystal Lattice" editor inside the interface is shown in the figure below:

![Opening the Crystal Lattice editor](../../images/materials-designer/crystal-lattice.png "Opening the Crystal Lattice editor")

## Setting Lattice Type

In order to choose the desired "Lattice type" out of the total list of 14 possibilities, click on the corresponding drop-down menu and make your selection. When an alternative lattice type is chosen, the corresponding angles and lattice constants will automatically adjust. The information about the primitive lattice vectors for each Bravais lattice type, and their relations to the conventional (Cartesian) lattice vectors, can be accessed, for example in Ref. [^1].  

!!!warning "Primitive unit cell is used instead of conventional"
    Lattice parameters are those that describe the *primitive* unit cell of the crystal containing just one lattice point. For example, for a choice of the Face-centered cubic (fcc) lattice type all unit cell angles are automatically set to 60 degrees, and not to 90 as it would be for a conventional FCC unit cell, and the lattice constant of the primitive cell is smaller by a factor of $\sqrt 2$ compared to the conventional. For example, for the case of the default material - silicon which has an underlying fcc Bravais lattice, the $a$, $b$ and $c$ lattice parameters are 3.8 $A$ by and not 5.43 $A$ as conventionally noted in the literature.

## Setting Lattice Parameters

One can set the lattice constants ($a$, $b$ and $c$) defining the size of the unit cell, as well as the angles between the lattice vectors, by editing the corresponding numerical text fields. 

> NOTE: For the moment, only Angstroms units are supported for expressing the spatial dimensions. 

!!!warning "Lattice type takes priority over lattice parameters"
    The user might notice that not all parameters can be edited manually for a given selection of lattice type. For example for FCC, all angles are 60 degrees and cannot be modified. Similarly, all three lattice constants $a$, $b$ and $c$ are bound to remain equivalent between them at all times, even when one of them is modified by the user.  If the user wishes to be free to modify all lattice parameters manually, the lattice type "Triclinic" can be chosen. 
    
### Preserve Basis Option

The option to preserve the absolute coordinates of the basis atoms space, regardless of any change brought to the crystal structure in terms of the size of its unit cell, is also offered. This feature can be activated by turning on the "Preserve Basis" slider. Otherwise, if this slider is disabled, it is the fractional crystal coordinates are maintained instead. 

## Apply changes

When you are done selecting a new lattice type and its corresponding parameters, click on the `Apply Edits` button.  The visual representation of the structure will change to reflect the newly-defined lattice type.

## Animation

Click on the animation below to see the above in action. Here we change lattice type of silicon from Face-centered Cubic to Tetragonal, and then modify the size of one of the lattice axes (the a axis), applying the changes each time.

<img data-gifffer="/images/materials-designer/ChangeMaterialLattice.gif" />

## Non-Periodic Lattice Update
When [Edit - Toggle "isNonPeriodic"](../header-menu/edit.md) is used, the lattice will be updated so that it is of **type=CUB**. Additionally, the size of the lattice will be scaled to fit the non-periodic structure. We calculate the maximum pairwise radius of the structure in Angstroms and multiply it by a factor of 2.0 to set the new basis size.

## Links

[^1]: [The AFLOW library of crystallographic prototypes, Website](http://www.aflowlib.org/CrystalDatabase/)
