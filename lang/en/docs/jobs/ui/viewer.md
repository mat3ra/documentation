# Jobs Viewer Interface

In order to inspect the content of a Job, the user can [open it](../../entities-general/actions/open-edit.md) from [Jobs Explorer](explorer.md). This action opens the Job under the corresponding Viewer, except for the case of Jobs in the [pre-submitted status]({{ reference_url }}/jobs/status/) where the [Designer]({{ interface_url }}/jobs-designer/overview/) is opened instead.

The image below shows how the Viewer contains two extra highlighted tabs, in addition to the three main tabs of [Designer]({{ interface_url }}/jobs-designer/overview/). They are labelled [**"Results"**](results-tab.md) and [**"Files"**](files-tab.md), and are reviewed separately in their respective pages. The name of the Job and that of the containing [Project]({{ reference_url }}/jobs/projects/) is also indicated at the top-left corner of the page.

![Extra Jobs Viewer](../../images/jobs/extra-jobs-viewer.png "Extra Jobs Viewer")

## No Adjustments Allowed

Under Jobs Viewer, it is impossible to make **any** kind of adjustments to either [Materials]({{ interface_url }}/jobs-designer/materials-tab/), [Workflow]({{ interface_url }}/jobs-designer/workflow-tab/) or [Compute]({{ interface_url }}/jobs-designer/compute-tab/) settings contained in their respective tabs. This is in contrast to [Designer]({{ interface_url }}/jobs-designer/overview/).

The only change which can be made to the Job under Viewer is the insertion of descriptive [metadata](../../entities-general/actions/metadata.md), under the corresponding button <i class="zmdi zmdi-info-outline"></i> at the top-right corner of the interface.
