# Materials Tab

Opening the Materials Tab within the [Jobs Designer](overview.md) presents the user with the following interface, which can be used to inspect and review the materials [added](actions-header-menu/select-materials.md) to the [Job]({{ reference_url }}/jobs/overview/) being created.

![Materials Tab](../images/jobs-designer/materials-tab.png "Materials Tab")

## Differences from Materials Viewer

The interface under Materials Tab largely mirrors the general [Materials Viewer](../materials/ui/viewer.md), except for the differences noted in the remainder of the present documentation page. These differences are concentrated within the toolbar highlighted in the above image. Please refer to the number labeling the toolbar shown below, for understanding the correspondence with the headers of the descriptions than follows. 

![Materials Tab Toolbar](../images/jobs-designer/materials-tab-toolbar.png "Materials Tab Toolbar")

Another important difference of Materials Tab from [Materials Viewer](../materials/ui/viewer.md) is that **no adjustments** are allowed to the [material]({{ reference_url }}/materials/overview/) being currently inspected.

## 1. Pager for Switching Materials

The **Materials Pager** allows for the switching between the different crystal structures added to the Job, when multiple structures have been [selected](actions-header-menu/select-materials.md) by the user. Navigation between materials is achieved by clicking the arrows <i class="zmdi zmdi-chevron-left zmdi-hc-border"></i> <i class="zmdi zmdi-chevron-right zmdi-hc-border"></i> on either side of the pager, which take the progress of the selection backwards or forward respectively. The number label of the material being currently inspected under the interface, out of the total number of structures added so far by the user, is also indicated at the center of the Pager. 

### Animation

In the animation shown here, we demonstrate how to cycle through materials by using the pager.

<img data-gifffer="/images/jobs-designer/materials-pager.gif">

## 2. Add / Delete Materials

Pressing the "Plus" icon <i class="zmdi zmdi-plus zmdi-hc-border"></i> allows the user to select and add new materials from the account-owned [collection]({{ reference_url }}/accounts/collections/) into the Job under creation, in an analogous fashion to the action described [here](actions-header-menu/select-materials.md).

Conversely, the "Minus" icon <i class="zmdi zmdi-minus zmdi-hc-border"></i> initiates for the removal of the material under current inspection. Note that at least one material has to be present at all times in Jobs Designer, which prevents the deletion of the last remaining entry. 

## 3. Open / Close Toolbar

Finally, the <i class="zmdi zmdi-close zmdi-hc-border"></i> icon can be used to close and hide the other toolbar buttons. Clicking a second time at this location then toggles and re-enables them again.
