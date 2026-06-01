# Precision of Plane-Wave Pseudopotential Method

At present, we limit the estimation of the [numerical precision](../../methods/precision.md) of plane-wave pseudopotential computations to the following list of parameters, as contained within the [data structure]({{ data_url }}/methods/data/) for methods.

## Plane-wave

### Wavefunction Cutoff

The user can enter the **kinetic energy cutoff** of the **plane-waves** used to represent the electronic wavefunctions. 

### Charge Density Cutoff

The user can also set the **kinetic energy cutoff** for the **electronic charge density and potential**. 

## Reciprocal Space

### k-point Sampling

The k-points in the [reciprocal space](../../models/auxiliary-concepts/reciprocal-space.md) of the crystal structure need to be [sampled](../../models/auxiliary-concepts/reciprocal-space/sampling.md), in order to reproduce the electronic structure of the symmetry-irreducible wedge of the Brillouin Zone.

### Electronic Occupations and Smearing

We review the importance of introducing an additional **smearing factor**, applied to the electron occupancies within crystal structures, [in this page](../../models/auxiliary-concepts/reciprocal-space/electronic-occupations.md).

## Links

For a more in-depth explanation of the theory cited above, the reader is referred to the general review literature on the plane-wave pseudopotential formulation of Density Functional Theory listed in the corresponding [references page](../../models-directory/dft/references.md).
