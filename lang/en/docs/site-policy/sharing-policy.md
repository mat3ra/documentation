# Sharing Policy

> Effective date: **Aug 1, 2018**

We believe that the fastest way to work is to work collaboratively and built Exabyte to enable comprehensive data sharing enough to facilitate secure and efficient access to data for multiple users.  

## Overview

### Entities

Each item that we hold in the database (materials, workflows, jobs etc.) we further call "Entity" below.

### Accounts

We have two basic account types: **personal** and **organizational** (or "enterprise", used interchangeably). Each user of Exabyte has a personal account and can create organizational accounts in order to collaborate with others. One can consider a personal account as a one-man-organization, where the same user is an owner and admin of the organization. For the sake of simplicity we naturally only expose these for the organizational accounts.

### Permissions

Each Entity has an associated set of permissions that are granted to accounts either directly, or through teams. The following types of permissions are present:

- read
<!-- - comment -->
- edit
- execute

The "read" permission allows accounts access the data about an entity. The "edit" permission allows them to modify the data. The "execute" permission is used to isolate permission for executing simulation jobs.

### Owners and Creators

Each entity has a "creator" - the user who created the entity, and an "owner" - the account that the user belongs to. Notably, users can be members of multiple accounts simultaneously, so the owner will be assigned according to the account that is active at the moment of the entity creation. 

> In case of an organizational account the personal account for the user that creates an organization is stored as "owner".

### Sharing

By our definition, "sharing" is a process of granting a permission of a certain type to another account, or to another user within the same collaborative account.

## Who is my data accessible to?

### Within the same account

An entity is always accessible to its *owner*, therefore the administrators (and the owner) of the organizational account have all permissions on all account entities. 

Regular members of an organization can get access to an account when it is granted by an administrator. The latter can be done through [teams](../collaboration/organizations/teams.md). When an entity is added to a team with a designated set of permissions (eg. "edit"), all users that belong to the team get the corresponding access to the entity.

### With another account

When an account has "edit" permission for an entity, he/she can explicitly share this entity with another account by designating a desired level of permission and granting it through the interface. 

### Shared with me

Accounts can view the data shared with them under "Shared with me" section of the left-hand sidebar. Accounts can further perform actions on the shared items, as permitted by owners, such as clone the shared item to their private collection, for example.

## Special system-wide permissions

There are special system-wide access types on entities:

- **public**, where all logged-in users have "read" access to the entity
- **anyone with link**, where the webpage that corresponds to the entity will be visible to non-logged in users with the exact URL of the page
- **anyone on the web**, where the webpage that corresponds to the entity will be searchable and accessible to anyone on the web

> Users of "Google Drive" might find these system-wide permissions familiar, especially the last two.  

System-wide permissions allow users to publish their work when they are ready. Depending on the desired level of publicity it can be either accessible within the Exabyte platform, or outside too.

In the user interface the system-wide sharing status for the entities is be shown accordingly inside the "PUBLIC", "EXT+LNK", "EXT+WEB" columns. 

## Service levels and private data

As the page explaining the [service levels]({{ guide_url }}/pricing/service-levels/) has it, the ability to create entities that are private to an account is a premium feature and requires an elevated service level type. For the newly created accounts that use promotional credits to try our platform all created entities are public. 

### Other notes

When an "aggregator" entity is shared, so are the entities contained in it. For example, when a project is shared, so are all jobs that belong to the project.
 
<!-- TODO: TB add explanation of sharing through bank ## Bank entities -->

## Private deployments

We believe that the permission scheme explained above provides an optimal balance between the flexibility and ability to share the data, and security and confidentiality. For the enterprise accounts further concerned about data security we can suggest a private deployment with one of the following scenarios:

- on public cloud within an isolated infrastructure within the Exabyte account ("private cluster")
- on public cloud within an isolated infrastructure under the customer account ("bring-your-own-cloud")
- on the company-owned private cloud infrastructure ("on-premises")

We have experience with the first, and have designed the product to support the last two scenarios with an appropriate licensing agreement put in place and some additional work.


