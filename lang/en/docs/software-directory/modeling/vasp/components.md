# Components
 
We present in this page the different [components]({{ reference_url }}/software/components/) (executables and flavors) comprised within the [VASP](overview.md) distribution package. 
 
Only those components implemented on our platform to date are mentioned here, as can be inspected from the lists of available executables and flavors under the [Unit Editor Interface](../../../workflow-designer/unit-editor.md#application).
 
!!!warning "Implementation on our platform"
     The user who wishes for additional functionality to be added to our platform in future should express so via a [support request](../../../ui/support.md).
     
## Executables

the VASP package is composed of one main `vasp` [executable]({{ reference_url }}/software/components/#executables) only, through which all calculation [flavors]({{ reference_url }}/software/components/#flavors) explained in what follows can be performed.

## Flavors

The following computation [flavors]({{ reference_url }}/software/components/#flavors) are available within VASP.

- `vasp`: "self-consistent field" [total ground-state energy]({{ reference_url }}/properties-directory/scalar/total-energy/) calculation.
- `vasp_vc_relax_conv`: 
- `vasp_nscf`: for further processing of the results of non-scf calculations (for instance, in DOS calculations).
- `vasp_zpe`: for [Zero Point Energy]({{ reference_url }}/properties-directory/scalar/zero-point-energy/) calculations.
- `vasp_kpt_conv`: for performing a [k-points convergence study]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/convergence/).
- `vasp_relax`: optimization of the atomic positions to relax the inter-atomic forces. 
- `vasp_vc_relax`: "variable-cell" [structural relaxation and optimization]({{ reference_url }}/workflows/addons/structural-relaxation/).
- `vasp_bands`: [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) calculation.
- `vasp_hse`: for performing calculations using the HSE hybrid exchange-correlation functional.
- `vasp_bands_hse`: [electronic band structure]({{ reference_url }}/properties-directory/non-scalar/bandstructure/) calculations using HSE.
- `vasp_nscf_hse`: for further processing of the results of non-scf HSE calculations.
