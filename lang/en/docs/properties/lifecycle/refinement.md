# Refinement of Computed Properties

The computed [Raw properties](../classification/general.md) of Materials collected by the [Extractor](extractor.md) may subsequently need to be **refined** for a better appreciation of their **physical significance** and understanding of their **numerical accuracy**. This can help to make a definite assessment of their validity, and a comparison with other similar properties previously stored in the database. It also makes the results of simulations presentable and understandable for the user.

## Visualization of Refinement Stages 

We categorize the various degrees of refinement of extracted Materials properties as **Raw**, **Refined** and **Best**, in an order of ascending evolution and reliability. These concepts are portrayed in the summary diagram below, in a sequential logical order, where the refinement process has been highlighted in orange. 

![Refinement](../../images/properties/refinement.png "Refinement")

## Raw Properties

"Raw" properties consist in **all** quantities which are [extracted](extractor.md) directly from the output files of simulation codes. They are classified as such due to the uncertainty in their physical meaning, which has to be further ascertained as explained in the ensuing section below.

## Refined Properties

"Refined" properties include those properties which are **physically meaningful**. By meaningful we mean that their values are directly comparable with **Experiments**, and are not influenced by an arbitrary choice of computational input parameters and other unphysical artifices. 

### Non-Refinable Property Example

For the case of the [pseudopotential DFT model]({{ reference_url }}/models-directory/dft/overview/) the **[Fermi Energy]({{ reference_url }}/properties-directory/scalar/total-energy/)**, for example, is excluded from being classed as Refined, and therefore remains treated as Raw. This is due to the fact that its absolute value makes no physical meaning, but rather depends heavily on the choice of the pseudopotential, on the Exchange-correlation functional approximation, and on other computational [methods]({{ reference_url }}/methods/overview/) being employed.

### Refined Property Example

The [band gap]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) is instead considered a refined property, since it is a relative energy difference between the highest electron-occupied and lowest unoccupied levels in the bandstructure of the material. Therefore its computed value can be compared directly with experiments, with a reliability limited only by its numerical precision.

> **NOTE**: exception for "Total Energy". We class the [Total Energy]({{ reference_url }}/properties-directory/scalar/total-energy/) of the material as refined property, despite its absolute value computed with DFT also being of no physical relevance. This is done due to its importance in formulating the Equation of State of the Material, where it is normally compared relative to its ground-state value under equilibrium conditions. 

## Best Properties

The property classified as "Best" is defined as the computation of a given refined material property which has achieved the best **numerical precision**. The comparison is made with all other computations for that particular property performed across the Exabyte platform per user and by all users combined.

A description of how we estimate the precision of properties can be found [in this page]({{ data_url }}/methods/data/).  

## Appearance in User Interface

Both Refined and Best properties can be displayed in [Materials Explorer]({{ interface_url }}/materials/ui/explorer/), for convenient consultation by the user, after having been suitably selected through the [columns selector]({{ interface_url }}/entities-general/ui/explorer/#columns-selector).
