# Quantum Espresso: Specific Compute Parameters 

The [compute parameters]({{ dev_url }}/infrastructure/compute/parameters/) which are specific to Quantum ESPRESSO consist in the **[Advanced Options]({{ dev_url }}/infrastructure/compute/parameters/#advanced-options)**, which can be set from within the relevant [user interface]({{ dev_url }}/infrastructure/compute/overview/).

These specific parameters allow for the **parallelization** of Quantum ESPRESSO computations, as explained in what follows. Detailed explanations on how to best set the values of such parallelization parameters can be found under Ref. [^1]. 

## Parallelization of Computations

Processors can in general be divided into different **"images"**, each corresponding to a different self-consistent or linear-response calculation which are coupled together.

### k-point pools

Each image can be subpartitioned into **"pools"**, each taking care of a group of [k-points]({{ reference_url }}/models/auxiliary-concepts/reciprocal-space/sampling/).

### band pools 

Each pool is subpartitioned into **"band groups"**, each taking care of a group of Kohn-Sham orbitals (also called bands, or wavefunctions).

### FFT task groups

In order to allow good parallelization of the 3D FFT, when the number of processors exceeds the number of FFT planes, FFTs on Kohn-Sham states are redistributed to **"task" groups** so that each group can process several wavefunctions at the same time.

## Links

[^1]: [Quantum ESPRESSO Parallelization levels, Official Documentation](https://www.quantum-espresso.org/Doc/user_guide/node18.html)

