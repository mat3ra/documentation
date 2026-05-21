# Pricing

> Updated pricing scheme as of July 2019. For the information about the legacy pricing scheme please contact our support team.

The pricing is dependent on the [Service Level]({{ reference_url }}/accounts/service-levels/). We aim to have a flexible scheme where customers always pay on-demand for the value they extract.

## Cost structure

The cost of using our platform is comprised of the following components, added together.

### Subscription Fee 

The cost of accessing the platform. Charged on a monthly or yearly basis. [Free]({{ reference_url }}/accounts/service-levels/#free-service-level) tier is available.

### Computing Cost

The cost of running computations. Accounts can refill their Balance on demand at any time.

### Cost of Other Resources

The cost of other resources, such as disk storage or account members.

## Comparison Table

Below is a quick comparison of our pricing for different [Service Levels]({{ reference_url }}/accounts/service-levels/).
Readers are referred to [Service Levels]({{ reference_url }}/accounts/service-levels/) page for detailed information about available features.

| Fees                                      | Free         | Pro            | Enterprise     |
| :-------------                            | :----------- | :------------- | :------------- |
| Yearly Subscription Fee                   | -            | $100           | $3,600         |
| Additional Account Members - Member/Month | -            | -              | $20            |
| Additional Account Members - Member/Year  | -            | -              | $200           |
| Additional Disk Space - GB/Month          | -            | $0.2           | $0.2           |
| Additional Dropbox Space - GB/Month       | -            | $0.2           | $0.2           |
| Ordinary Compute Price - Core-Hour        | -            | $0.12          | $0.12          |

[^1]: For organizational accounts that opt for [wire-based electronic payments]({{ reference_url }}/accounts/payments-charges/#wire-based-payments).

!!! note "Contact us for detailed pricing"
    For detailed pricing or a quotation please contact us at <a href="mailto:sales@exabyte.io" target="_blank">sales@exabyte.io</a>.

## Category-based pricing

The compute price above refers to the **Ordinary** [cost category]({{ dev_url }}/infrastructure/resource/category/#cost-categories) for each service level. One can further control the price by varying the category type. When using submission queues with "Saving" cost category, for example, the relative unit price can be as low as 1/5th of the Ordinary.

|Cost Category| Charge factor
|:---------   |:------------
|Debug        | 2.0
|Ordinary     | 1.0
|Saving       | 0.2

## Queue- and Cluster-dependent pricing

As the type of hardware and scheduling policies vary for different submission queues, the pricing is also different. For, example, GPU-enabled nodes are available within a certain subset of queues and are generally priced higher.

Detailed description of submission queues is available [here]({{ dev_url }}/infrastructure/resource/queues/). Clusters and associated hardware and pricing are explained in [this section]({{ dev_url }}/infrastructure/clusters/overview/)

!!! tip "Least expensive pricing options"
    The options explained above can be combined in order to achieve the least expensive pricing. For example, when "Enterprise" service level is used in combination with submission queues that belong to the "Saving" cost category, the resulting price per core hour can be as low as $0.024.
