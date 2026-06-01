# InChI

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Structural</span>

The International Chemical Identifier (InChI) of a material is derived mainly from the **Chemical Formula**, **Atom Connections**, **Hydrogen Atoms**, **Charge**, **Stereochemistry**, and **Isotope** information for a non-periodic chemical structure.[^1][^2][^3]

## Notation

### Examples
####Methane (CH4)[^4]
*InChI=1S/CH4/h1H4*
```
  H      0.5288      0.1610      0.9359
  C      0.0000      0.0000      0.0000
  H      0.2051      0.8240     -0.6786
  H      0.3345     -0.9314     -0.4496
  H     -1.0685     -0.0537      0.1921
```
####Water (H2O)[^5]
*InChI=1S/H2O/h1H2*
````
H    0.7493682    0.0000000    0.4424329
O    0.0000000    0.0000000   -0.1653507
H   -0.7493682    0.0000000    0.4424329
````
## Schema 

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#InChI).

## Links

[^1]: [IUPAC International Chemical Identifier (Website)](https://iupac.org/who-we-are/divisions/division-details/inchi/)
[^2]: [Wikipedia International Chemical Identifier (Website)](https://en.wikipedia.org/wiki/International_Chemical_Identifier)
[^3]: [ACS JChemEd, The InChI Code (Website/Article)](https://pubs.acs.org/doi/10.1021/acs.jchemed.8b00090)
[^4]: [NIST CH4 (Website)](https://webbook.nist.gov/cgi/cbook.cgi?Name=CH4&Units=SI)
[^5]: [NIST H2O (Website)](https://webbook.nist.gov/cgi/inchi/InChI%3D1S/H2O/h1H2#)
