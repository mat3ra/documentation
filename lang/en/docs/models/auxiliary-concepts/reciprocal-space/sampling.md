# kgrid

**kgrid** denotes the k-points sampling of the Brillouin Zone. 

## How to set?

In the "Important Settings" tab of the [Subworkflow Editor]({{ guide_url }}/workflow-designer/subworkflow-editor/important-settings/) interface lie the choice for the size and density of the grid of reciprocal k-points employed for sampling the Brillouin Zone of the electronic structure of the crystal under investigation. 

The size of the grid of k-points is typically defined in terms of its dimensions in the three-dimensional reciprocal space (for example 10 x 10 x 10), in conjunction with the distance by which the grid is shifted in reciprocal space in order to cover a wider volume of the irreducible (by symmetry) part of Brillouin Zone. Both of these settings can be entered in their respective entries, "dimensions" and "shifts", under the "kgrid" section.

## Convergence

Together with a sufficiently high plane-wave cutoff for the electronic wavefunction explained in [this page](../../../methods-directory/pseudopotential/parameters.md), a sufficiently large size for this sampling grid is of paramount importance in establishing the overall accuracy of the corresponding calculation. For instructions on how to add a preliminary convergence calculation add-on to the current workflow, see [this page]({{ guide_url }}/workflow-designer/subworkflow-editor/actions-menu/). 

## KPPRA
 
 Alternatively, the option "KPPRA" can be selected in the above procedure through the right-hand side "preferKPPRA" checkbox. It defines the density of the grid of k-points in terms of k-points per reciprocal atom. If the unit cell contains 2 atoms, then a 10 x 10 x 10 grid leads to KPPRA of 2000. The default minimum value for this KPPRA setting is indicated immediately below the "kgrid" header label.

## Other types of reciprocal space grids

 Similar considerations as the above-mentioned elements apply to other types of unit-specific settings, such as the **qgrid** settings for defining reciprocal grids of q-points for performing phonon calculations, and the associated **igrid** settings for the grids obtained through performing the transformation to and from the reciprocal and real space and subsequent interpolation (hence the "i"). The reader is referred to Ref. [^1] for an example theoretical explanation of each of these concepts. 
 
## Links

[^1]: [Calculation of Phonon Dispersions on the Grid Using Quantum ESPRESSO, Document](http://users.ictp.it/~pub_off/lectures/lns024/10-giannozzi/10-giannozzi.pdf)
