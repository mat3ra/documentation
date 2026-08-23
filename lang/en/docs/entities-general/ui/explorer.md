# Entity Explorer Interface

The Explorer Interface allows users to interact with entity [collections]({{ reference_url }}/accounts/collections/) and is composed of the following sub-components: 

## Entity Items List

The "Entity Items List" displays the contents of the corresponding [Account-owned entity collection]({{ reference_url }}/accounts/collections/), in a table form. It allows users to execute [actions](../../entities-general/actions/overview.md) on multiple entities at once. This component is shown below for the case of Materials.

![Entity Items List](../../images/entities-general/materials-list.png "Entity Items List")

## Sub-header

The image below shows the location of the sub-header, also present at the bottom of the interface.

![Sub-header](../../images/entities-general/sub-header.png "Sub-header")

### Columns Selector 

The user may customize the properties to be display under each column. This is done through the drop-down button labelled with three horizontal dots <i class="zmdi zmdi-more zmdi-hc-border"></i> as shown below. 

The table of displayed properties can be scrolled horizontally, by toggling the button labelled with a pair of triangular brackets <i class="zmdi zmdi-hc-rotate-90 zmdi-unfold-more"></i>.

The image below shows the location of both buttons within the sub-header. Viewable materials properties are also shown under the drop-down menu, as an example.

![Columns Selector](../../images/entities-general/properties-dropdown.png "Columns Selector")

### Toggle Reactive Updates

By default, the information displayed under the Entity Items List is updated automatically. We refer to this feature as "reactive" updates. Constant updating can occasionally cause the platform interface to slow down and become un-responsive, such as may be the case when a large number of Entities are present and updated simultaneously. The user may therefore wish to "pause" reactive updates, which can be accomplished through "Toggle Reactive Updates" button <i class="zmdi zmdi-pause-circle-outline"></i>. 

> NOTE: we currently prevent reactive updates automatically when the number of entries in the list exceeds 50.

Once paused, this button changes its icon to <i class="zmdi zmdi-play-circle"></i>. Reactive updates can be resumed by clicking the button second time. Alternatively, updating can be triggered manually through the neighboring "Trigger Update" button <i class="zmdi zmdi-rotate-left"></i>.

### Pagination of Entity Items List

Pagination of the entity items list can be customized as follows. 

Firstly, the number of entity items to be shown under each page, out of their total number, can be selected. This is done from the drop-down menu emphasized in the image below, under the section labelled "Results per Page".

![Pagination of Entity Items List](../../images/entities-general/number-items.png "Pagination of Entity Items List")

The above menu can also be used to navigate between the pages themselves, under the section labelled "Pages". If numerous pages are present, then only the ten closest to the one being currently viewed are shown.

Secondly, the left-hand checkbox allows all listed entity items to be selected simultaneously. Their total number is also displayed at all times.

## Action-related Components

### Actions Toolbar

The Actions Toolbar allows users to execute [actions](../actions/overview.md) on multiple Entities at once. Entities can be selected using the corresponding checkboxes to the left of each entry line as explained [here](../actions/select.md). 

### Actions Dropdown

The actions Dropdown menu, accessible under the three-dot-icon at the right end of each entry <i class="zmdi zmdi-more-vert zmdi-hc-border"></i>, allows one to execute the above-mentioned actions on that specific entry *only*. 

The set of allowed actions is filtered per each entry according to its [type]({{ reference_url }}/entities-general/overview/) and [permissions]({{ reference_url }}/entities-general/permissions/).

### Visual

The location of both the actions toolbar and dropdown menus, within the Explorer interface, is clarified in the panels emphasized in the image below.

![Visual](../../images/entities-general/workflow-actions-menus.png "Visual")

## Search Bar

Search Bar <i class="zmdi zmdi-search zmdi-hc-border"></i> is present in the main header, as highlighted in the image below. Users can search through the items listed in the entity collection following [this procedure](../actions/search.md).

![Search Bar](../../images/entities-general/search-bar-explorer.png "Search Bar")

### Advanced Search

Some entities offer the possibility to perform "Advanced" searches, such as in the case of [Materials](../../entities-general/actions/advanced-search.md). The appearance of the search bar can as a result expand below the header, as shown in the highlighted portion below.

![Advanced Search](../../images/entities-general/search-advanced-explorer.png "Advanced Search")

## Links

Documentation pages presenting entity-specific aspects of the Explorer Interface are available for [Materials](../../materials/ui/explorer.md), [Workflows](../../workflows/ui/explorer.md) and [Jobs](../../jobs/ui/explorer.md) respectively.
