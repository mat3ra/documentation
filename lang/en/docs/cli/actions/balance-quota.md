# Check Account Quota and Balance

This page explains how to retrieve [accounting information]({{ reference_url }}/accounts/overview/) for users logged-in via the [Command Line Interface](../overview.md), including information about any [Organizational Accounts]({{ reference_url }}/collaboration/organizations/overview/) that the user may be member of.
 
Each of the commands outlined in what follows can accept keyword parameters as option flags, as listed by passing the `--help` flag to them. 

## Account Balance

Information about the [Account Balance]({{ reference_url }}/accounts/balance/) (in US dollars) is accessed using the `balance` command, as demonstrated in the example below.

`# > balance`

```bash
Id Name     Amount Reserved Balance CreditLimit Available
-- -------- ------ -------- ------- ----------- ---------
1  steven  1000.00     10.00 990.00        0.00   990.00
```

The entries returned by the above command are summarized in the table below, complementing their [general discussion]({{ reference_url }}/accounts/balance/). We remind the reader that in order to perform computations on our platform, a positive balance is required.


| Entry  | Description |
|--------|-------------|
| Amount | Total combined amount of money |
| Reserved | Money already allocated for executing Jobs |
| Available | Remaining money not allocated yet |
| Credit Limit | Not applicable in our case |
| Balance | Same as Available, due to absence of credits | 


## Itemized Account Statement

We track the **usage** of our platform, or [balance]({{ reference_url }}/accounts/balance/) spent on computations per each [account]({{ reference_url }}/accounts/overview/) and each [project]({{ reference_url }}/jobs/projects/). The usage statistics of each [cluster]({{ dev_url }}/infrastructure/clusters/overview/), in terms of number of CPU hours consumed and charges incurred, is referred to as the **Account Statement**.

This statement can be inspected with the `statement` command under CLI, as demonstrated in the example below.

`# > statement -s 2018-01-01 -e 2019-01-21`

```bash
################################################################################
#
# Statement for user steven
# Includes account 2 (steven)
# Generated on Wed Feb 11 16:00:34 2016.
# Reporting account activity from 2018-01-01 to 2019-01-21.
#
################################################################################

Beginning Balance:                 0.00
------------------ --------------------
Total Credits:                  1000.00
Total Debits:                     -0.91
------------------ --------------------
Ending Balance:                  999.09

############################### Credit Detail ##################################

Object  Action  JobId Amount  Time
------- ------- ----- ------- -------------------
Account Deposit       1000.00 2019-08-06 09:29:14

############################### Debit Detail ###################################

Object Action JobId Project  User     Machine                                           Amount Time
------ ------ ----- -------- -------- ------------------------------------------------- ------ -------------------
Job    Charge 15    steven   steven   master-production-20160630-cluster-007.exabyte.io  -0.00 2019-08-08 04:09:51
Job    Charge 16    steven   steven   master-production-20160630-cluster-007.exabyte.io  -0.00 2019-08-08 04:10:35
Job    Charge 17    steven   steven   master-production-20160630-cluster-007.exabyte.io  -0.00 2019-08-08 04:28:08
Job    Charge 18    steven   steven   master-production-20160630-cluster-007.exabyte.io  -0.00 2019-08-08 04:28:21
Job    Charge 28    steven   steven   master-production-20160630-cluster-007.exabyte.io  -0.01 2019-08-08 06:48:42
Job    Charge 30    steven   steven   master-production-20160630-cluster-007.exabyte.io  -0.03 2019-08-08 09:53:29

############################### End of Report ##################################

```

It is often convenient to pass the `-s` (start) and `-e` (end) flags to the `statement` command, to narrow down the window of time over which the statement is printed. These flags should contain information about the delimiting dates, in the format "YYYY-MM-DD". So, for example, the command `statement -s 2019-01-01 -e 2019-01-08` would return the account statement starting from the 1st to the 8th of January 2019.

## Detailed List of Jobs

Information about all jobs submitted by the user to date can be retrieved as explained [here](../../jobs-cli/put-link).

## Storage Quota

Information about the [Storage Quota]({{ reference_url }}/accounts/quota/) within the available [computing clusters]({{ dev_url }}/infrastructure/clusters/overview/) can be retrieved via the `quotas` command. An example of output of this command is shown below.

```bash
>>> quotas
USED    BSOFT    BHARD      BWARN  BGRACE    IUSED      ISOFT    IHARD    IWARN  IGRACE
-------  -------  -------  -------  --------  -------  -------  -------  -------  --------
6.9G     10G      10G           00  [------]  18.7k          0        0       00  [------]
```

This output contains information about the used storage space under the first column. We don't allow for "soft" quotas (under "BSOFT" column) for temporarily exceeding the maximum allowed limit, hence "soft" and "hard" quotas match to the same total limit value, and no "Grace" period is available. The remaining columns starting with "I" concern the compute nodes as opposed to the clusters.

!!!warning "Authorization Required to Access Clusters via CLI"
    In order to use the `quotas` command, the user needs to first access the clusters via SSH. Please [submit a support request](../../ui/support.md) for gaining the necessary permissions to do this.
