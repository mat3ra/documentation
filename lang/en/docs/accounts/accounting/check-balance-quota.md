# Account Balance and Storage Quota

This page explains how users can check the current [Account Balance]({{ reference_url }}/accounts/balance/) and [Storage Quota]({{ reference_url }}/accounts/quota/) associated with the account under consideration.

There are two ways through which both pieces of information can be accessed and viewed simultaneously, listed below. The appearance of the interface components exhibiting the balance and quota information in each of these two cases is displayed in the respective images underneath each item.

## In Account Menu

The information about both balance and quota is present in the [Account Menu]({{ guide_url }}/ui/account-menu/) as shown in the visual below.

![Account Snapshot](../../images/accounts/account-snapshot.png "Account Snapshot")

## In Service Level Tab

The same information is present under the [Service Level Tab](../ui/service-level.md) as depicted in the image below.

!!!warning "Warning: restricted access"
    This tab is only viewable by account Owners and Administrators.

![Indicators](../../images/accounts/indicators.png "Indicators")

It can be seen that in both of the above panels, the information about the Balance is subdivided into the "Current" (available) and "Reserved" (already allocated to compute time) components. Similarly, the information about the Storage Quota is always displayed in the "Current Consumption / Total Limit" format.

## In Dashboard or "Bio" Tab

Furthermore, the current information about the Storage Quota across all the available supercomputing nodes can also be retrieved by itself from the main account [Dashboard]({{ guide_url }}/ui/specific/dashboard/), or alternatively from the "[Bio](../ui/bio.md)" tab of the "Account Profile" interface. In both of these cases, the typical appearance of the panel displaying such storage quota information is as shown in the below example:

![Storage Quota](../../images/accounts/storage-quota.png "Storage Quota")

Two buttons are present at the top-right corner of the above interface widget: the first on the left <i class="zmdi zmdi-plus zmdi-hc-border"></i> can be used to [increase the Storage Quota](increase-quota.md), and the second on the right <i class="zmdi zmdi-refresh-alt zmdi-hc-border"></i> to refresh the displayed information.
