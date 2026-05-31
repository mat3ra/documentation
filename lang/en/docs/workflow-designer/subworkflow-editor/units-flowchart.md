# Units Flowchart

At the bottom of the "Overview" tab page within the Subworkflow Editor interface, under the section titled "Units", the user can inspect the **units flowchart** offering a graphical representation of the subworkflow under consideration. Each unit included in this flowchart represents a distinct elementary unit computation, which can be mainly of purely logical (eg. "if" condition) or simulation (eg. ab-initio calculation) nature. The former category is further is narrated further [in its dedicated page]({{ reference_url }}/workflows/components/units/).

An example of elementary units flowchart at the bottom of an "Overview" tab, concerning a [band structure calculation](https://platform.mat3ra.com/bank/workflows/HPcabYa3gq4BPcb2u) (with density of states) implemented with the [Quantum ESPRESSO application](../../software-directory/modeling/quantum-espresso/overview.md), is depicted in the image below:

![Units Flowchart](../../images/workflow-designer/units-flowchart.png "Units Flowchart")

## Unit Types

In the above image, the user can identify the type of the unit by the color (the colors corresponding to each unit type can be seen in the image below).

![Unit Colors](../../images/workflow-designer/unit-colors.png "Unit Colors")

## Currently selected unit

The currently selected unit is highlighted in color. Units can be selected by clicking on it, or any of its actions.

## Unit names

Each unit box is clearly labelled with the name of the elementary computation that it implements. For example, "pw_scf" is the name for a unit shown in the visual above.

## Unit Actions

Up to three action buttons are provided to the user on a unit:

1. Edit - launches the [Unit Editor](../unit-editor.md)

2. Clone - duplicates and appends the selected unit (Note: not available on Condition units)

3. Delete - removes the selected unit and re-links the remaining units where possible

## Adding units

New elementary units can be added to the flowchart by selecting _Add Unit_ from the _Select Unit Actions_ dropdown shown below. ![Add Unit Action](../../images/workflow-designer/add-unit-action.png "Add Unit Action") The following dialog will open, offering the user the possibility to choose the type of elementary unit that needs to be added in the first drop-down menu, and in the lower drop-down menu whether to append it or prepend it to the currently selected unit in the flowchart:

![New Units](../../images/workflow-designer/new-units.png "New Units")

## Opening Unit Editor

Clicking on the _Edit_ button of a unit allows the user to open the corresponding Unit Editor interface, and to inspect directly all the various input parameters and input file templates of the underlying unit elementary computation. The user is referred to [this part](../unit-editor.md) of the documentation for a detailed description of this Unit Editor interface.

## Collapsing Units

The user can expand and collapse the unit actions for a more compact view of the flowchart by selecting the _Collapse Units_/_Expand Units_ option of the _Select Unit Actions_ dropdown as shown in the image below

![Collapse Unit Action](../../images/workflow-designer/collapse-units-action.png "Collapse Units Action")

## Auto Fit View
The user can toggle the automatic fitting of the flowchart within the viewing window with the switch shown below. While _Auto fit_ is on, the flowchart will be fit to the viewing window on edit. While _Auto fit_ is off, the flowchart will maintain its viewing window on edit.

![Auto Fit View](../../images/workflow-designer/auto-fit-view.png "Auto Fit View")