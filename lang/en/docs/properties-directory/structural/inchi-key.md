# InChIKey

<span class="btn badge b-success border-50">Non-Scalar</span> <span class="btn badge b-info border-50">Structural</span>

The International Chemical Identifier Key (InChIKey) of a material is derived from the [InChI](inchi.md). It is a 27 character non-human readable condensed digital representation of the InChI, also known as a hash.[^1]

## Notation
The InChIKey is a 14-8-1 character string. The first 14 characters represent the connectivity and charge information. The next 8 character represent the remaining sublayer information. The final character represents the kind of InChIKey being generated, including the version of InChI used.

The 14-8-1 Character string is represented as follows:

```
XXXXXXXXXXXXXX-YYYYYYYYFV-P
```

### Examples
####Methane (CH4)[^2]
*InChIKey: VNWKTOKETHGBQD-UHFFFAOYSA-N*
```
  H      0.5288      0.1610      0.9359
  C      0.0000      0.0000      0.0000
  H      0.2051      0.8240     -0.6786
  H      0.3345     -0.9314     -0.4496
  H     -1.0685     -0.0537      0.1921
```
####Water (H2O)[^3]
*InChIKey: XLYOFNOQVPJJNP-UHFFFAOYSA-N*
````
H    0.7493682    0.0000000    0.4424329
O    0.0000000    0.0000000   -0.1653507
H   -0.7493682    0.0000000    0.4424329
````
## Schema 

The JSON schema and an example representation for this property can be found [here]({{ data_url }}/properties/data/list/#InChIKey).

## Links

[^1]: [Wikipedia International Chemical Identifier (Website)](https://en.wikipedia.org/wiki/International_Chemical_Identifier)
[^2]: [NIST CH4 (Website)](https://webbook.nist.gov/cgi/cbook.cgi?Name=CH4&Units=SI)
[^3]: [NIST H2O (Website)](https://webbook.nist.gov/cgi/inchi/InChI%3D1S/H2O/h1H2#)
