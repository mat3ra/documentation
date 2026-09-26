# Directory Structure

We organize the [unstructured]({{ reference_url }}/data/classification/#by-internal-organization) data corresponding to simulation files under a certain **hierarchic directory structure**, as explained in the present page. The storage quotas which pertain to the folders presented herein are explained in the corresponding [documentation page](quotas.md).

## Permissions

We organize our directories under a Linux/Unix filesystem [^1], where standard permissions apply [^2]. We refer the Reader to the original sources of explanation about the Unix permissions. 

We associate [Users]({{ reference_url }}/accounts/users/) with operating system users, and [Accounts]({{ reference_url }}/accounts/overview/) with operating system groups. This way the data generated within an account is not accessible to anyone else, but the members of this account, unless explicitly shared. Shared access for the members of the same organizational account is explained further [here](../infrastructure/clusters/directories.md#shared-folders-for-organizations).

## [Login Home](../infrastructure/login/directories.md)

When first accessing the platform via any of the [remote connection methods]({{ cli_url }}/remote-connection/overview/), users initially enter the [login node](../infrastructure/login/overview.md). The directory where user lands upon login is referred to as the **Login Home**. This directory is at the head of a hierarchical directory structure further described [in this dedicated section](../infrastructure/login/directories.md) . 

## [Cluster Homes](../infrastructure/clusters/directories.md)

Each [computing cluster](../infrastructure/clusters/overview.md) has its own distinct [home folder](../infrastructure/clusters/directories.md), referred to as the **Cluster Home**, which is "mapped" under the aforementioned Login Home. The contents of cluster homes are further documented [in this page](../infrastructure/clusters/directories.md).

## Dropbox

As explained [in this dedicated section](../data-in-objectstorage/dropbox.md), Dropbox is a universally available storage, allowing data and files to be shared across the platform. The absolute path to the Dropbox folder is `/dropbox/<username>/`. A link to it is present under both the Login and Cluster home directories.

## Job Script Templates

A shortcut to a folder containing some quick examples (templates) for command line jobs is also present under both the login and cluster home directories. It contains specific examples of [batch scripts]({{ cli_url }}/jobs-cli/batch-scripts/overview/) for running [Jobs via the Command Line Interface]({{ cli_url }}/jobs-cli/overview/). This folder is stored under the absolute path `/export/compute/job_script_templates`.

## Links

[^1]: [Wikipedia Linux Filesystem Hierarchy Standard, Website](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)

[^2]: [Wikipedia Linux File system permissions, Website](https://en.wikipedia.org/wiki/File_system_permissions)
