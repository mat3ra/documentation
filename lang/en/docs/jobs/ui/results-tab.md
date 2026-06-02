# Results Tab

The "Results" tab displays the results of the job's computational tasks. They are presented in a user-friendly way, including graphics when applicable.

## Panels

The results for each computational [unit]({{ interface_url }}/workflow-designer/unit-editor/) contained across the [workflow]({{ interface_url }}/workflow-designer/overview/) operations of the Job are displayed in separate **panels**. 

### Naming Convention

Panels are named according to the format convention "Subworkflow Name - Unit Name". The name of the [application]({{ reference_url }}/software-directory/overview/) implemented in the current unit is also shown directly below.
 
### Collapse / Expand
 
The option to collapse or expand a panel is offered at its top-right corner.

## Materials Properties

The panels contain the results for the computation of the [materials properties]({{ reference_url }}/properties/overview/) that were selected at the moment of the [creation of the subworkflow]({{ interface_url }}/workflow-designer/subworkflow-editor/detailed-view/), or subsequently adjusted during the [job design]({{ interface_url }}/jobs-designer/overview/) stage.

The manner in which these properties are displayed under the corresponding panels is explained in a [separate section](../../properties/ui/viewer.md) of this documentation. 

## Example Appearance

An example of appearance of the Results tab for the case of an electronic bandstructure calculation is exhibited in the image below. The first two panels have been collapsed, whereas the one displaying the dispersion curve has been kept opened. 

![Results Tab](../../images/jobs/results-tab.png "Results Tab")
