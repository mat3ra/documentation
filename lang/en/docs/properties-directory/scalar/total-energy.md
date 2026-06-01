# Total Energy

<span class="btn badge b-success border-50">Scalar</span> <span class="btn badge b-info border-50">Electronic</span>

The "Total Energy" refers to the total electronic ground state energy of a material with a fixed lattice (with no thermal vibrations of the atoms). It is an important example of an **[Auxiliary](../../properties/classification/general.md) property** of [Materials](../../materials/overview.md), and is routinely calculated during the course of material science simulations. 

## Examples

The total energy can be calculated by a corresponding workflow. For [DFT](../../models-directory/dft/overview.md) calculations, for example, any [Workflow](../../workflows/overview.md) containing a unit with a "self-consistent field" (scf) type can extract total energy. 

It is presented to the user, as part of the output of a [Job](../../jobs/overview.md), with the appearance displayed below, under the interface of the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) of the [Job Viewer]({{ guide_url }}/jobs/ui/viewer/). Its final value is expressed in units of electronVolt (eV).

<div class="clearfix">
    <center>
        <div class="chart"><i class="zmdi zmdi-battery-flash zmdi-hc-3x"></i></div>
        <div class="count">
        	<small>Total energy</small>
            <h2>-8.922</h2>
        </div>
     </center>
</div>

## Total Energy Contributions

The Total Energy of a Material is comprised of several **Energy Contributions**. They are returned as a list of [Scalar and Auxiliary](../../properties/classification/general.md) quantities.

### Example Contributions in DFT

Specific types of energy contributions are commonly encountered in [DFT](../../models-directory/dft/overview.md) computations [^1], [^2]. The types included in the final results depend specifically on the modeling [application](../../software/components.md) employed, as explained in what follows.

The reader is referred to the links presented at the bottom of the page for a theoretical review of the energy contributions presented herein.

#### Generic Applications

The following contributions, displayed in the image below, are computed and returned to the user under the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ guide_url }}/jobs/ui/viewer/), for the cases of both [VASP]({{ guide_url }}/software-directory/modeling/vasp/overview/) and [Quantum ESPRESSO]({{ guide_url }}/software-directory/modeling/quantum-espresso/overview/) calculations. In all instances, the results are returned in units of eV.

![Common Contributions](../../images/properties-directory/common-contributions.png "Common Contributions")

#### Quantum ESPRESSO

Two additional energy contributions can be evaluated with Quantum ESPRESSO-based Workflows: the "One-electron" and "Harris-Foulkes" contributions [^3]. They are both returned as values expressed in eV, in a similar format to the other properties listed in the above image. 

## Schema 

The JSON schema and an example representation for the total energy can be found [here](../../properties/data/list.md#total-energy), whereas that for its contributions [here](../../properties/data/list.md#total-energy-contributions).
 
## Links 

[^1]: [Wikipedia Ewald summation, Website](https://en.wikipedia.org/wiki/Ewald_summation)

[^2]: [Wikipedia Hartree–Fock method, Website](https://en.wikipedia.org/wiki/Hartree%E2%80%93Fock_method)

[^3]: [Wikipedia Harris functional, Website](https://en.wikipedia.org/wiki/Harris_functional)
