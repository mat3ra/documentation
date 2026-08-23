# Key Concepts

This page introduces the core concepts behind the Mat3ra platform. Each term links to the relevant reference page for a detailed explanation.

## Core Entities

The platform operates around three main entity types:

- **[Materials]({{ reference_url }}/materials/overview/)** — a combination of chemical elements in a particular geometric arrangement, defined by [descriptive properties]({{ reference_url }}/properties/classification/overview/) (e.g. crystal lattice, basis) and having [characteristic properties]({{ reference_url }}/properties/classification/overview/) that can be computed (e.g. band gap, formation energy). Both periodic and non-periodic structures are supported.

- **[Workflows]({{ reference_url }}/workflows/overview/)** — define the simulation logic. Each workflow has one or more characteristic properties associated with it. Workflows depend on the [simulation engine]({{ reference_url }}/software/overview/), the [model]({{ reference_url }}/models/overview/), and the [method]({{ reference_url }}/methods/overview/) (numerical implementation of the model). Workflows consist of [subworkflows]({{ reference_url }}/workflows/components/subworkflows/) and individual [units]({{ reference_url }}/workflows/components/units/).

- **[Jobs]({{ reference_url }}/jobs/overview/)** — containers of workflow and material information that represent a computation. Jobs are organized into [projects]({{ reference_url }}/jobs/projects/) and can be under any of the possible [statuses]({{ reference_url }}/jobs/status/).

These three concepts are grouped under the general term **[entities]({{ reference_url }}/entities-general/overview/)**, as they share many features and user interface components.

![Entities Relations](../images/getting-started/entities-relations.png "Entities Relations")

## Relationships Between Entities

Computational workflows are applied to materials in order to extract a set of desired properties. The diagram below shows the general relationship between entity types. Properties associated with each entity are labeled with <span class="btn badge badge-property border-50">P</span>. Properties that are computed as output of a job (also referred to as [characteristic properties]({{ reference_url }}/properties/classification/general/)) are shown in black — <span class="btn badge badge-property-inverse border-50">P</span>, and have a certain numerical [precision]({{ data_url }}/methods/data/) inherited from the workflow and job.

![Simulation Components](../images/getting-started/simulation-components.png "Simulation Components")

## Models, Methods, and Software

Simulations can be performed with any of the available [modeling applications]({{ reference_url }}/software/components/), implementing the supported [theoretical models]({{ reference_url }}/models/overview/) and corresponding [computational methods]({{ reference_url }}/methods/overview/).

!!!note "Example: model and method"
    [Density Functional Theory (DFT)]({{ reference_url }}/models-directory/dft/overview/) is an example of a model. Its [plane-wave pseudopotential formulation]({{ reference_url }}/methods-directory/pseudopotential/overview/) is an example of a method.

### Travel Analogy

In order to better understand the difference between a model, method, and simulation, consider a travel analogy:

1. Setting out to travel from San Francisco to New York — the destination is known. By analogy, a specific address in New York is the **characteristic property** to be obtained.
2. Choosing to travel by flight, train, car, or ship — by analogy, this corresponds to choosing the **model**.
3. Boarding a specific class of aircraft (jet, propeller) or automobile (sedan, SUV) — by analogy, this corresponds to choosing the **method**.
4. The plane could take multiple routes with intermediate stops — by analogy, a method can be realized through multiple **workflows** containing specifically arranged **units**.

The process of traveling from San Francisco to New York, by this analogy, is the **simulation**.

> A note on simulation engines: just as there are multiple airplane manufacturers, there are many [software applications]({{ reference_url }}/software/overview/) that implement specific models and methods.

## Data and Infrastructure

The platform is designed to store and organize [simulation data]({{ data_url }}/data/classification/) in centralized databases under the conventions of [structured representation]({{ data_url }}/data-structured/convention/). A system of [queues]({{ resources_url }}/infrastructure/resource/queues/) is in place for scheduling and tracking the allocation of [computational resources]({{ resources_url }}/infrastructure/resource/overview/), offered by the [clusters]({{ resources_url }}/infrastructure/clusters/overview/) at the core of the overall [infrastructure]({{ resources_url }}/infrastructure/overview/).
