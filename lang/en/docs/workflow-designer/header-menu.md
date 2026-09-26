# Header Menu Actions

At the top of the Workflow Designer interface, users can find a header menu. This page explains the actions that it allows for. 

## Name

The initial name of a newly-created workflow is "Empty Workflow". It is visible at the left-end of the header menu bar next to the workflows icon <i class="zmdi zmdi-dot-circle zmdi-hc-border"></i>. Instructions on how this name can be changed are provided [here](../entities-general/actions/name.md). Immediately below this general name for the workflow under consideration, a list of the computational engines employed in the workflow displayed under the label "applications".  

## Description

The user can add a general description of the workflow's features and applications for reference purposes by toggling the workflow description switch next to the workflow action menu on the right side of the header menu.

![Workflow Header](../images/workflow-designer/workflow-header-description.png "Toggle description")

The header will expand to show a document editor[^1], where the workflow description can be entered in a direct way ("what you see is what you get", WYSIWYG) or in the Markdown scripting language[^2] according to the guidelines presented [here](../entities-general/actions/metadata.md).

The description is updated as you type and will become permanent once the workflow is saved.

## Saving the workflow

The workflow under consideration can be saved at any time following the changes made to it. Until this is done the changes are NOT permanently saved so refreshing the page will remove them, for example. 

The Save operation can be accomplished via either of two alternative buttons, both located on the right-hand side of the header menu. The user can either click directly on the button labelled with a tick-mark <i class="zmdi zmdi-check zmdi-hc-border"></i> to perform a direct save, and be subsequently re-directed to the workflows collection page, or alternatively the same action can be executed *without the redirect* via the `Save` option located under the neighbouring drop-down menu button labelled with three vertical dots.

## Inserting Add-ons

The header menu bar of the Workflows Designer interface finally gives the user the possibility to include [Add-ons]({{ reference_url }}/workflows/addons/overview/), in the form of an additional subworkflow. 

The location of this drop-down menu is highlighted below:

![Inserting Add-ons](../images/workflow-designer/addons-menu.png "Inserting Add-ons")

## Metadata

The user can furthermore add descriptive `tags` to the workflow under consideration, following the general explanation presented [here](../entities-general/actions/metadata.md). In order to add tags, scroll down to find the field labelled "Tags:".

!!!warning "Tags are not part of the Header"
    Although we included its explanation in this page, the "Tags" section is not part of the header.

[^1]: [Toast UI Editor, Website](https://ui.toast.com/tui-editor)
[^2]: [Markdown syntax summary, Website](https://daringfireball.net/projects/markdown/syntax)
