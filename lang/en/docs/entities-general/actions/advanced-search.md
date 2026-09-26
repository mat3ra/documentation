# Advanced Entity Search

 In order to perform a comprehensive search, and filter the Entities in the corresponding [collection]({{ reference_url }}/accounts/collections/), the Advanced Search feature can be used.. The explanation contained in this page is relevant to [Materials]({{ reference_url }}/materials/overview/). Advanced Search functionality is also available is for [Account Charges](../../accounts/ui/charges-payments.md).

## Activate Advanced Search

Click on the advanced search tool with the icon <i class="zmdi zmdi-tune zmdi-hc-border"></i> labeled `Advanced` offered in the top toolbar of the [Explorer Interface](../../entities-general/ui/explorer.md#action-related-components) to view the search query builder.

## Query Builder

Advanced search functionality is implemented through a flexible "Query Builder": an interface that allows to construct arbitrary queries using logical rules and the supported fields. The search statements are structured in the form of "Groups", each containing a series of "Rules". Both Groups and Rules can be added to the overall logical flow with the help of the `+ Rule` and `+ Group` buttons, or deleted using the `-` button. The Rules inside each Group, and the Groups themselves, can be logically combined together through the "AND/OR" logical operators.

## Rules

Each Rule is composed of three successive entries. First, an entity-related property should be selected from the initial drop-down menu. Secondly, a logical operator should be chosen from the available list in the central drop-down menu. Finally, a search string or numerical value corresponding to the sought property can be entered in the third and final text field.

## Execute Query

Once all the logical statements and operators have been inserted as part of the desired overall flow, the resulting advanced search can be executed by clicking `Apply`. The corresponding search results are then displayed.

## Save Query

If you want to be reuse a query you've built, you can save it by clicking the `Save Search` button in the query builder and providing a name when prompted. You can select from these saved searches by selecting the `saved searches` dropdown in the search toolbar.

## Reset

The entire logical flow can be reset using `Clear` button in the query builder.

## Examples

Refer to [Materials-](../../materials/actions/advanced-search.md) and [Charges-](../../accounts/accounting/charges-advanced-search.md) specific pages to see how advanced search can be performed.
