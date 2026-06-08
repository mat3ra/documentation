# Projects

[Jobs](overview.md) are organized into **Projects** for convenience, which represent a particular type of [Set](../entities-general/sets.md) exclusive to Jobs only. One can thus think about projects as collections of jobs, in the same manner as a file system directory is a collection of files.

Projects can only be present at the top-level, with no possibility of creating nested projects one inside the other. In the user interface they are labelled with their distinctive "folder" icon <i class="zmdi zmdi-folder zmdi-hc-border"></i>. 

## Slug

> Also referred to as "Accounting Slug".

The [Slug]({{ data_url }}/entities-general/data/#Slug-Representation) offers a computer-friendly representation of the name of the Project. This is relevant in the context of [Account Charges]({{ interface_url }}/accounts/ui/charges-payments/) and is used to identify a project inside each charge entry.

## Accounting

We isolate job sets in this manner in order to facilitate the **accounting** per project separately. For example, when [Accounts](../accounts/overview.md) are working on multiple problems (eg. multiple classes of materials, or multiple internal customers), these problems can be isolated in their own projects to better organize the data and further understand the balance spent on each.

### View Accounting Information per Project

There are two ways to track charges on each project, as explained in what follows.

#### From Charges Page

We describe how to access and navigate the main "Charges and Payments" page [here]({{ interface_url }}/accounts/ui/charges-payments/).

#### In Command Line

Alternatively, the charges incurred as part of each Project can be inspected directly on the Command Line Interface, as outlined [in this page]({{ cli_url }}/cli/overview/).


## CLI Path

The path of the Project inside the [cluster infrastructure]({{ resources_url }}/infrastructure/overview/) is formed utilizing the *slug* field explained above.

Question marks "???" might be present within this path instead of the actual cluster number label (eg. "001" for "cluster-001"), because different [clusters]({{ resources_url }}/infrastructure/clusters/overview/) are employed for executing the Project's [Jobs](overview.md) with each cluster having a dedicated directory for the project. See explanation in [directory structure]({{ resources_url }}/data-on-disk/directories/) for more information on this.

## Status

Similarly to the [status](status.md) of individual Jobs, each Project also has a general status assigned to it, according to the following conventions.

- <span class="btn badge badge-padded b-warning border-50">Active</span>: at least one job is present with an [Active](status.md#Active) status inside the Project. 
- <span class="btn badge badge-padded b-primary border-50">Stand-by</span>: at least one job in the Project is pending execution, but has been submitted to the [queue]({{ resources_url }}/infrastructure/resource/queues/) already ([Submitted](status.md#Submitted) status). 
- <span class="btn badge badge-padded b-default border-50">Idle</span>: all other possibilities, whereby all jobs contained in the project have statuses other than Active and Submitted.

The Project Status is indicated in [Project Explorer]({{ interface_url }}/jobs/ui/projects-explorer/#status), under the corresponding column.

## Default Project

Each new Account is initialized with a default project named "Default". It is initially set to be [shared publicly]({{ interface_url }}/collaboration/sharing/access-levels/) with all platform users. Higher levels of privacy for this and all [subsequently created Projects]({{ interface_url }}/jobs/actions/create-delete-project/) can be set when an appropriate [service level]({{ guide_url }}/pricing/service-levels/) is attributed to the account.

## Project Page

Each Project has its own dedicated page, listing all the contained Jobs among other properties. We review Projects Pages [here]({{ interface_url }}/jobs/ui/project-page/).

## Projects Explorer

The list of projects created under an account can be viewed under the [Projects Explorer]({{ interface_url }}/jobs/ui/projects-explorer/) interface. 

## Create / Delete

The procedure for creating or deleting Projects under [Explorer]({{ interface_url }}/jobs/ui/projects-explorer/) is explained [separately]({{ interface_url }}/jobs/actions/create-delete-project/). 
