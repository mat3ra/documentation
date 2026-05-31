# Default Entities

Some Entities, such as [Materials](../materials/overview.md) and [Workflows](../workflows/overview.md) allow for setting a "default" item per [Account](../accounts/overview.md) in their respective [collections](../accounts/collections.md). 

## Usage

The default material, for example, is used to pre-initiate the [job]({{ guide_url }}/jobs-designer/overview/) and [workflow]({{ guide_url }}/workflow-designer/overview/) designer interfaces. The workflow templating context may adjust depending on the material, and users can tune the adjustments by changing the default material. Similarly, users can set the most frequently used workflow as default in order to avoid changing it during the job creation.

## Marking

The user can recognize the entity as being the default one for future operations by the check-mark assigned to it under the "Default" column of the [Explorer]({{ guide_url }}/entities-general/ui/explorer/) interface.

## Change

The action of changing the default entity is explained [here]({{ guide_url }}/entities-general/actions/set-default/).
