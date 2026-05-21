# Unit Editor

The workflows units for each elementary computation can be edited by means of Unit Editor interface. The latter can be accessed by clicking on the corresponding unit box from within the [units flowchart](subworkflow-editor/units-flowchart.md). 

The Unit Editor interface contains multiple sections, as shown in the following visual and reviewed further below.

!["Unit Editor"](../images/workflow-designer/unit-editor.png "Unit Editor sections")

## Name

The first line at the top of the interface, labelled with the general icon for elementary units <i class="zmdi zmdi-circle-o zmdi-hc-border"></i>, offers a reminder of the unit's name within the general flowchart, or "pw_scf" in the above example. The name can be edited following the steps explained [here](../entities-general/actions/name.md). 

This first line also contains a reminder of the unit's type (*execution* in the above example), and of the unique identification label of the unit within the overall units flowchart (the *flowchartId*). 

## Application

Similar to the "Application" settings section in the [Overview tab](subworkflow-editor/overview-tab.md) of the parent [Subworkflow Editor](subworkflow-editor/overview-tab.md), this section reviews the computational engine (otherwise known as [application](../software-directory/overview.md)) to be employed in the current unit. 

Normally, the application, its specific version and build cannot be changed by the user within the "Unit Editor" interface, as they are set at the parent subworkflow level. What can be changed inside this "Application" section of the Unit Editor is the specific **executable** of the simulation engine that is to be employed as part of the current unit calculation, under the corresponding "Executable" drop-down menu. 

We maintain a set of input templates (as further explained [here](unit-editor/input-templates.md)) for some of the most common use cases per each application and executable - **flavors**. Users may choose to pre-populate the input based one of the templates by selecting a flavor.

> NOTE: Examples "application", "executables" and "flavors. [Quantum Espresso](../software-directory/modeling/quantum-espresso/overview.md) application breaks its operations into a set of distinct executables with "pw.x" being the most commonly encountered one and "ph.x" being another example. Many different types of computations can be performed within the context of the pw.x executable itself, such as [variable-cell relaxation calculations]({{ reference_url }}/workflows/addons/structural-relaxation/) via the "pw_vc-relax" flavor, or electronic band structure calculations with "pw_bands". The input content for each of these represent the different flavors.

## Properties and Monitors

The "Properties" and "Monitors" sections of the Unit Editor interface are presented in a way which is exactly analogous to the equivalent sections under the "Detailed View" tab of the parent Subworkflow Editor interface. The reader is therefore referred to the relevant parts of the "Detailed View" [documentation page](../workflow-designer/subworkflow-editor/detailed-view.md#the-"properties"-section), and to [this general reference page]({{ reference_url }}/properties/overview/). This part allows for the selections of physical properties to be retrieved as part of the final output of the unit's computational task, and secondly a list of quantities that can be monitored for during the course of the execution. 

## Next

This section permits the user to select, under the corresponding "Next" drop-down menu, which other units contained in the overall units flowchart sequence is to be executed next inside the logical flow of the parent subworkflow. Each time a unit is selected from this drop-down menu, its corresponding identification label gets displayed under the "FlowchartId" entry to the right of the same line. 

## Unit input templates

The final section at the bottom of the Unit Editor interface is explained in detail in its own [dedicated documentation page](unit-editor/input-templates.md), due to the rather complex nature of the input file templates contained there.


