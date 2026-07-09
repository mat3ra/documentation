# Formation Energy

<span class="btn badge b-success border-50">Scalar</span> <span class="btn badge b-info border-50">Thermodynamic</span>

The formation energy represents the energetic cost of creating a **defect** into an otherwise perfect solid structure. For example, for the case of a vacancy defect, it is calculated as the energy needed to remove the corresponding atom from the bulk. 

Below is the formula used to calculate formation energy:	
 
$$
 E_fmt = E_tot (compound) - \sum{all elements} \sum{all atoms for element} (E_zpe + E_tot)
$$	
 
 `E_fmt` and `E_tot`, `E_zpe` are the formation energy, total energy and zero point energy for the compound and lowest energy elemental structures, correspondingly.
  
  !!!note "Zero Point Energy"
     The inclusion of Zero Point Energy ($E_{zpe}$) is optional and depends on the specific computational workflow. The standard Quantum ESPRESSO workflow uses only the ground-state total energy ($E_{tot}$).

## Tutorials

- [Calculate Formation Energy]({{ reference_url }}/tutorials/dft/thermodynamic/formation-energy/)
