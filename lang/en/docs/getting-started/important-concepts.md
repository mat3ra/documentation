# Important Concepts

In this page we introduce some important concepts explaining the operations of our platform. Links are attached to the keywords below, redirecting the user to the relevant documentation section containing more explanation.

## Relationship

Our platform enables the execution of computational **[Workflows]({{ reference_url }}/workflows/overview/)** applied upon **[Materials]({{ reference_url }}/materials/overview/)**, in order to extract a set of desired **[Properties]({{ reference_url }}/properties/overview/)**. We refer to **[Jobs]({{ reference_url }}/jobs/overview/)** as "containers" of Workflows and Materials information. 

The flowchart diagram below visualizes the general relationship between the above-mentioned entity types. Here, the Properties associated to each entity are labeled with <span class="btn badge badge-property border-50">P</span>. Those properties which are computed as output of a Job (also referred to as [Characteristic Properties]({{ reference_url }}/properties/classification/general/)), are shown in black - <span class="btn badge badge-property-inverse border-50">P</span>, and consequently have a certain numerical [precision]({{ data_url }}/methods/data/) inherited from the Workflow and Job.

![Entities Relations](../images/getting-started/entities-relations.png "Entities Relations")

Jobs also refer to the simulation tasks on the Compute platform, as illustrated in the visual below.

![Simulation Components](../images/getting-started/simulation-components.png "Simulation Components")

## Main Entities

The three above-mentioned concepts of Workflows, Materials and Jobs can be grouped together under the same general umbrella term of **[Entities]({{ reference_url }}/entities-general/overview/)**, due to the many features and user interface components that they share in common. We review the similarities under [Entities and Common Aspects]({{ reference_url }}/entities-general/overview/) and then explain the details unique to each Entity type separately. 

For example, Jobs have **[Accounting]({{ reference_url }}/accounts/overview/)** set up for. Workflows and Materials are both **["Bankable" Entities]({{ reference_url }}/entities-general/bank/)**. Workflows further consist of **[Subworkflows]({{ reference_url }}/workflows/components/subworkflows/)**, and further of the combination of individual **[Units]({{ reference_url }}/workflows/components/units/)**, such as portrayed in the example diagram below.

![Workflow Components](../images/getting-started/workflow-components.png "Workflow Components")

## Other Items

Such simulations can be performed with any of the available **[modeling Applications]({{ reference_url }}/software/components/)**, implementing the supported **[theoretical Models]({{ reference_url }}/models/overview/)** and corresponding **[computational Methods]({{ reference_url }}/methods/overview/)**.

## Data and Infrastructure

Our platform is designed to store and organize the **[simulation Data]({{ data_url }}/data/classification/)** in centralized databases, under the conventions of **[Structured Representation]({{ data_url }}/data-structured/convention/)**. A system of **[Queues]({{ dev_url }}/infrastructure/resource/queues/)** is in place for scheduling and tracking the allocation of **[computational Resources]({{ dev_url }}/infrastructure/resource/overview/)**, offered by the **[Clusters]({{ dev_url }}/infrastructure/clusters/overview/)** at the heart of our overall **[Infrastructure]({{ dev_url }}/infrastructure/overview/)**.
