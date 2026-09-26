# Import Structure

We support direct import of materials structural data from other online sources. At present the import from the Materials Project database [^1] is implemented. Below we explain how to do so step by step.

## Open Import Dialog

Under the [Account Profile](../../accounts/ui/profile-page.md) page, first [navigate]({{ interface_url }}/ui/specific/tabs-navigator/) to the "Materials" tab. Then choose import tool <i class="zmdi zmdi-cloud-upload zmdi-hc-border"></i> in the top right [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar).

## Select Entries

Import dialog allows to select one or multiple entries. The user is initially presented with a full screen overlay window with a [search box](../../entities-general/actions/search.md) at the top. He/she can then enter the element, formula or material name to search for the desired material(s). Inspection of each listed structure is done by clicking and expanding it.

!!! warning "Items are cached upon first search"
    We maintain a local cache of the items from remote database to avoid excessive requests to third-party resources. Because of that, when first opened, the number of materials in cache might be smaller than the total number of materials available from third party. This fact should not confuse the users, as all the full dataset exposed by the third party is supported. 

## Trigger Import

After selecting materials, click the "import" icon <i class="zmdi zmdi-cloud-upload zmdi-hc-border"></i> in the [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar). This saves the material into the Account-owned collection. This newly imported structure can be viewed under the corresponding [Explorer Interface](../../entities-general/ui/explorer.md). 

## Animation

The aforementioned steps are demonstrated in the animation below.

<img data-gifffer="/images/materials/ImportMaterialsProjectMaterial.gif" />

## Links

[^1]: [Materials Project, Official Website](https://materialsproject.org/)
