# Average Pressure

<span class="btn badge b-success border-50">Scalar</span> <span class="btn badge b-info border-50">Thermodynamic</span>

We define the **Average Pressure** $p_{avg}$ of a Material as a **[Scalar and Physical](../../data-structured/overview.md) property** obtained from the following conventional formula.

$$
p_{avg}=-\frac{1}{3} \mathrm{Tr} \hspace{1pt} {\boldsymbol{\sigma}}
$$ 

where ${\boldsymbol{\sigma}}$ is the [internal stress tensor](../non-scalar/stress-tensor.md) of the solid, and $\mathrm{Tr}$ indicates the Trace operator in linear algebra [^1]. 

## Example

The average pressure can be computed as part of any [Workflow](../../workflows/overview.md) involving at least one basic "self-consistent field" (scf) total energy calculation in [DFT](../../models-directory/dft/overview.md). 

It is then presented to the user, as part of the output of a [Job](../../jobs/overview.md), with the following appearance under the interface of the [Results Tab]({{ guide_url }}/jobs/ui/results-tab/) of [Job Viewer]({{ guide_url }}/jobs/ui/viewer/). Its final value is expressed in units of kilobars (kbar).

<div class="clearfix">
    <center>
        <div class="chart"><i class="zmdi zmdi-square-down zmdi-hc-3x"></i></div>
        <div class="count">
        	<small>Pressure</small>
            <h2>284</h2>
        </div>
     </center>
</div>

## Schema 

The JSON schema and an example representation for this property can be found [here](../../properties/data/list.md#pressure).

## Links

[^1]: [Wikipedia Trace (linear algebra), Website](https://en.wikipedia.org/wiki/Trace_(linear_algebra))
