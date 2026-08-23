# Storage Quota

We apply **storage quotas** to both the [directories](directories.md) on clusters. This limits the amount of storage space that can be consumed by [accounts]({{ reference_url }}/accounts/overview/), in order to avoid any problems. The concept of quota in the general context of account management is reviewed [here]({{ reference_url }}/accounts/quota/). This is an administrative limitation and can be easily extended as explained [here]({{ interface_url }}/accounts/accounting/increase-quota/)

## Conventions

The quotas are set per [cluster](../infrastructure/clusters/overview.md) and are always **hard-set** (as opposed to soft quotas) [^1]. Once the quota limit is attained on a certain [cluster](../infrastructure/clusters/overview.md), the user will be prevented from saving and storing any additional data on it.

!!! note "Service levels contain *compound* quotas"
    The explanation of the service levels [in this page]({{ guide_url }}/pricing/service-levels/) contains compound values for the disk quota for all accessible clusters. Depending on user demands we can allocate more or less quota per cluster.

Current quotas applicable to the folders available to the user can be inspected at any time via the [Command Line Interface]({{ cli_url }}/cli/overview/), using the [`quota` command]({{ cli_url }}/cli/actions/balance-quota/), or alternatively using the [Web Interface]({{ interface_url }}/accounts/accounting/check-balance-quota/).

## Login Node Home

The quota under the [login home folder](directories.md#login-home) amounts to **10 Gb**. This limited quota can be used to store and test source code or scripts.

## Cluster Home directory

The quota under the [home folders of the available clusters](directories.md#cluster-homes) depends on the [service level]({{ reference_url }}/accounts/service-levels/) associated with the account under consideration. For example, the "Promo", "Advanced" and "Pro" service levels have the storage quotas indicated [here]({{ guide_url }}/pricing/service-levels/).

## Shared Folders for Organizations

The quota under the shared folder available for [Organizations]({{ reference_url }}/collaboration/organizations/overview/) again depends on the [service level]({{ reference_url }}/accounts/service-levels/) associated with the corresponding Organizational account. For the "Enterprise" and "Enterprise-Extra" service levels the storage quota is set to the values indicated [here]({{ guide_url }}/pricing/service-levels/).

## Dropbox Folder

In order to facilitate the accessibility of the [Dropbox directory](../data-in-objectstorage/dropbox.md) on each of the components of our distributed compute system, we limit it in size to **1 Gb**. It is designed to be used for input files (for example pseudopotentials), scripts and other **non-bulky data** used during multiple calculations.

## Links

[^1]: [Disk Quota, Wikipedia](https://en.wikipedia.org/wiki/Disk_quota)
