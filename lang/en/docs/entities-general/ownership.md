# Account Ownership of Entities 

Every entity is owned by a single **[Account](../accounts/overview.md)**, referred to as the **Owner** of that entity. The Owner initially defaults to the Account under which the entity was **created**. 

When entities of each [type](overview.md) are treated collectively, we refer to them as **Account-owned Entity Collections**, which are the object of a [separate discussion](../accounts/collections.md)).

It is important to emphasize that the concept of Ownership applies to the Accounts themselves, and not to any of its  users/members.

## Ownership Lifecycle

An entity item may circulate between accounts, by, for example, being shared or copied. This makes the traceability of its ownership important to define.

### Sharing

When an entity is [shared]({{ interface_url }}/collaboration/sharing/ui/), its ownership remains **unaltered**: the owner remains the Account under which it was created, no matter how many times it is shared.

### Copying

When an entity is [copied]({{ interface_url }}/entities-general/actions/clone/), a new entry is created under the recipient Account-owned collection, with exactly the same contents as the original item. 

The ownership of this cloned item is then attributed to the recipient Account.

### Transfer

The Ownership of an entity can be changed only under the guidance of our [Support Service]({{ interface_url }}/ui/support/).
