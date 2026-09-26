# The Overview Tab

The general appearance of the typical content of the "Overview" tab is presented in the image below, where four main sections are emphasized and will be described in turn throughout the rest of this documentation page:

![The Overview Tab](../../images/workflow-designer/overview-tab.png "The Overview Tab")

## The "Properties" Section

The first line in the "Overview" tab, labeled "Properties", contains a summary of the physical properties that will be computed during the course of the present calculation. These can be selected from a list of properties on the "Detailed View" tab, which is described [here](detailed-view.md).

For a complete list of physical properties available for calculation, the reader is referred to [this page]({{ reference_url }}/properties/overview/).

### Low-fidelity Runs

Optionally, the check-box "Draft" on the left can be selected. In this case the resulting properties will not be available in the "Analytics" part of the output of the calculation. This option is convenient to choose when new prototypical workflows need to be tested in a preliminary fashion through low-fidelity runs.

## The "Application" Section

The subsequent "Application" section in the "Overview" tab allows the user to choose the computational engine (otherwise known as [application]({{ reference_url }}/software/components/)) to apply under the present Workflow.

## The "Model" Section

The concept of "Model" is documented extensively in its own dedicated [documentation section]({{ reference_url }}/models/overview/).

### Refiners

The "Refiners" drop-down menu present under the interface offers the user the possibility to display additional calculated physical properties in separate dedicated columns, once the output of the workflow computation is visualized in [Jobs Explorer](../../jobs/ui/explorer.md).

Note that the inclusion of such refiners from within the Subworkflow Editor interface does not automatically adjust the input file content for the simulation engines involved (something that still needs to be done manually by editing the corresponding input file), but rather refers exclusively to the way the resulting properties are classified.

### Modifiers

Several modifiers can also be included as part of the subworkflow under consideration, through the corresponding drop-down menu.

## The "Method" Section

Methods are also the object of a [dedicated section]({{ reference_url }}/methods/overview/) of the documentation.
