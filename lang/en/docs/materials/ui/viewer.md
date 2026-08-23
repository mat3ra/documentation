# Materials Viewer Interface 

The user can [open](../../entities-general/actions/open-edit.md) entities listed in the [Materials Explorer](explorer.md) in order to inspect them. This action opens the material under the corresponding Viewer page. 

## Viewer vs. Designer

As explained in the [general introduction](../../entities-general/ui/viewer.md), we reuse the [Designer]({{ interface_url }}/materials-designer/overview/) component as Viewer throughout the platform, with some adjustments and limitations on editing. For example, the ["Edit" functionality of the 3D crystal viewer]({{ interface_url }}/materials-designer/3d-editor/edit/) is missing from Viewer, due to the inapplicability of its structure-changing actions under the "viewing" circumstances. 

## Allowed Adjustments

Some minor adjustments, not related to the crystal structure (as an [identifying descriptive property]({{ data_url }}/data-structured/overview/#by-relation-to-uniqueness)) , might still be performed under the Materials Viewer. These can primarily be performed under the *header* and *footer* of Viewer, both highlighted in red in the image below.

![Materials Viewer](../../images/materials/materials-viewer.png "Materials Viewer")

### Modify Material Name 

One such permitted action is the changing of the Material's name, as it appears under the Account-owned collection. This can be accomplished by editing the name entry displayed on the left-hand side of the header. After making the desired adjustments, they can be saved by clicking "Save" <i class="zmdi zmdi-check zmdi-hc-border"></i> at the opposite extreme of the header bar. 

### Edit Metadata

[Metadata]({{ data_url }}/entities-general/data/#metadata) can also be added or modified for the material entry currently being inspected. For example, a general description can be written under the "Info" button <i class="zmdi zmdi-info-outline zmdi-hc-border"></i>  present towards the right-hand side of the header. Tags can inserted/edited in the footer, following the [these instructions](../../entities-general/actions/metadata.md).

### Toggle Privacy

Accounts with the appropriate [Service Level]({{ guide_url }}/pricing/service-levels/) can choose between making the current material private to the members of the Account only, or publicly accessible to all users of the platform. The difference between these two privacy levels is explained in more detail [here]({{ reference_url }}/collaboration/sharing/access-levels/). This choice can be made via the relevant toggle slider present in the footer as explained above. 

## Properties Explorer

The list of calculated [properties]({{ reference_url }}/properties/overview/) for the material under consideration, is displayed below the footer as explained [here](../../properties/ui/explorer.md).
