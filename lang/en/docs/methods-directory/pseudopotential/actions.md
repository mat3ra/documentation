# Upload Custom Pseudopotential Files

Pseudopotential files can be uploaded directly to the [Subworkflow Editor Interface]({{ guide_url }}/workflow-designer/subworkflow-editor/overview/), in order to expand the default set. This can be achieved following the procedure outlined below.

## Expand Pseudopotential panel

The user can initiate the upload of a custom pseudopotential file by first expanding the subsection labelled "Pseudopotentials" within the ["Overview" tab]({{ guide_url }}/workflow-designer/subworkflow-editor/overview-tab/) of the interface (with the help of the "plus' button <i class="zmdi zmdi-plus zmdi-hc-border"></i> to its left). The `Upload` button  <i class="zmdi zmdi-upload zmdi-hc-border"></i> on the right-hand side then needs to be clicked. 

## Set Information Fields

Next all the necessary categorization information about the new pseudopotential being uploaded shall be specified from the list of drop-down menus in the resulting dialog. An example of this dialog's appearance is shown below:

![Upload Pseudopotential](../../images/methods/pp-upload.png "Upload Pseudopotential")
 
## Save File
 
Once the desired file has been uploaded to the Subworkflow Editor via the `Choose File` option at the bottom of this dialog, the `Save` button can then be pressed to save this file to the account-owned collection of pseudopotentials. The content of the file will be stored on a network shared location ("Dropbox") to be made available to the calculations during the runtime.

## Filter Pseudopotentials

In the expanded "Pseudopotentials" subsection, the user will see a first editable "filtering" text bar where text or comma-separated regular expressions (such as the examples shown on the bar itself) may be typed to search and filter pseudopotentials out of the default or user-uploaded sets.

The resulting filtered list of available pseudopotentials will then become visible by clicking on the second text bar just below this filtering text bar, and next to the current material's chemical symbol. Any pseudopotential item out of this filtered list can be clicked upon for selection. If no match is found, the default pseudopotential for the particular element under consideration will be used.

## Regular Expressions

A general review on the syntax employed by regular expressions for performing general searches can be found in Ref. [^1].

Otherwise, the use of regular expressions is best illustrated by way of a specific example. Consider the following regular expression for searching for a particular VASP pseudopotential:

```regexp
(?=[5].[4])(?=.*/GW/)(?!.*/AE/)
```

This expression first searches for pseudopotentials released under version 5.4 of VASP. It then searches for all pseudopotential files of type "GW", and therefore included in the corresponding GW folder, but at the same time excludes those of type "AE" (all-electron). 

This particular regular expression operation applied to the available set of VASP pseudopotentials is demonstrated in the animation below:

![Regular Expressions](../../images/methods/regular-expression.gif "Regular Expressions")
 
## Links

[^1]: [Wikipedia Regular expression, Website](https://en.wikipedia.org/wiki/Regular_expression)
