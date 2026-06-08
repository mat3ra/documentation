# Search for Entities

Click `Search` bar  <i class="zmdi zmdi-search zmdi-hc-border"></i> in the [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar) to begin typing.

Users can enter any text string in order to search for a desired entry in the corresponding [collection]({{ reference_url }}/accounts/collections/). The search is performed as the user types, with no further action needed. To revert to the original list, the search string can be removed.

The search feature not only accepts plain text input but also allows for the use of regular expressions (regex) for more advanced searching capabilities. By leveraging regex, users can perform pattern-based searches, which can be incredibly powerful for matching strings within the collection. An example is shown below searching for jobs containing "python" or "fixed".

![Regex search](../../images/entities-general/regex-search.png "Regex Search")

## Search Criteria

Searches can be based both upon the entity's name, or upon tags and other [descriptive metadata]({{ reference_url }}/entities-general/data/#metadata) associated with it. In the specific case of Materials, the material's chemical formula can also be searched, for instance.

## Search History

Recent searches are saved and will be suggested when typing in the search bar. Saved searches can be removed from the history by clicking <i class="zmdi zmdi-close zmdi-hc-border"></i> or `Clear all items`.

![Search History](../../images/entities-general/search-history.png "Search History")

## Animation

In the example below, we demonstrate how to search for workflows containing the phrase "band structure" in the name. We enter this keyword string in the search bar at the top of the workflows collection. A few results are returned, and the screen is then reverted to its original appearance upon deletion of the search string.

 <img data-gifffer="/images/entities-general/search-workflow.gif" />
