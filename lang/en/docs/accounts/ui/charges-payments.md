# Charges, Payments, and Payment Methods

Click `Billing and Payments` <i class="zmdi zmdi-card zmdi-hc-border"></i> in the [Account Menu]({{ guide_url }}/ui/account-menu/) to review the list of charges incurred by the account, and the payments executed to address them. The possibility to view or add Payment Methods is also offered.

An example of a "Billing" page is exhibited below. We have highlighted in red the tabs for viewing charges, payments, and payments methods.

![Billing Page](../../images/accounts/billing-page.png "Billing Page")

## Charges

Under the tab labelled "Charges" <i class="zmdi zmdi-file zmdi-hc-border"></i> the user can review the charges applied to the [Account Balance]({{ reference_url }}/accounts/balance/) while using our platform.

## Payments

Under the "Payments" tab <i class="zmdi zmdi-file-text zmdi-hc-border"></i>, the user can review the money paid so far by crediting the [Account Balance]({{ reference_url }}/accounts/balance/).

## Actions

Both Charges and Payments sheets are presented under the standard [Explorer-type](../../entities-general/ui/explorer.md) interface. The total sum of all the entries under each list is also indicated at the top of the page.

### Search

#### Quick Search

A [Search](../../entities-general/actions/search.md) bar <i class="zmdi zmdi-search zmdi-hc-border"></i> is present at the top of both balance sheets.

#### Advanced Search

An [Advanced Search](../../entities-general/actions/advanced-search.md) <i class="zmdi zmdi-search-for zmdi-hc-border"></i> feature is further offered in the Charges page, in order to filter them more effectively. We offer an example of this action [here](../accounting/charges-advanced-search.md).

The following properties of Charges are available to be searched under the advanced method.

| Property    |   Description      |
| :-------- |:----------- |
| jobTitle |   Name of the Job, as defined at the moment of its [creation]({{ guide_url }}/jobs-designer/header-menu/)   |
| queue |  Type of [Queue]({{ dev_url }}/infrastructure/resource/queues/) on the computing [cluster]({{ guide_url }}/pricing/service-levels/#clusters-and-premium-hardware) used for the computational task |
| jid | A combination of the job number assigned by the task scheduler, and the machine name, as explained below. For example "142.master-production-20160630-cluster-007.exabyte.io" refers to job no. 142 executed on the cluster 007 with the machine name "master-production-20160630-cluster-007.exabyte.io" |
| machine  |  A [Fully Qualified Domain Name] [^1] of the [cluster]({{ guide_url }}/pricing/service-levels/#clusters-and-premium-hardware) used for the computation, for example: "master-production-20160630-cluster-007.exabyte.io"  |
| project |   [Slug]({{ reference_url }}/entities-general/data/#Slug-Representation), or computer-friendly representation of the name of the project containing the Job, in the format "<username>-project-year-month-computation". For example "demo-project-2018-10-bandstructures"   |
| type |  The type of task being charged, for example "Job"  |
| wallDuration  | Time duration of the computation  |
| charge |  Charge amount incurred as part of the computational task   |
| username | Name of the user that performed the computation  |
| description | Short description of what the charge is for, assigned automatically by the accounting system. For example "charge for whole hour", relevant to the [fast queues]({{ dev_url }}/infrastructure/resource/queues/) |
| startTime |  Date and time at which the Job was submitted, eg. "12-31-2017 22:33:00" |
| endTime | Date and time of Job termination following its completion in a similar format as the startTime above |

## Payment Methods

The user can inspect the relevant information regarding all available Payment Methods by navigating to the "Payment Methods" tab <i class="zmdi zmdi-card zmdi-hc-border"></i>.

## Actions

### Add Payment Method

New Payment Methods (ie. Credit Cards) can be added as it is explained [in this page](../accounting/payment-methods.md) to make them available as future payment options.

## Links

[^1]: [Fully Qualified Domain Names, explanation, Indiana University Website](https://kb.iu.edu/d/aiuv)

!!!warning "Restricted access"
    The information contained under the present documentation page is relevant to Account [Owners or Administrators]({{ reference_url }}/collaboration/organizations/roles/), since only they have sufficient rights to view and modify the content (a user is always the Owner and Administrator of his personal account).
