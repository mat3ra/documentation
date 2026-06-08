# Header Menu

The main header menu at the top of the [Jobs Designer](overview.md) interface is comprised of the following items enumerated below. Please refer to further explanations under the same number labels.

![Header Menu](../images/jobs-designer/header-jobs-designer.png "Header Menu")

## 1. Job Name

The name of the Job being created is shown here and can be edited in-place. 

### Project Name

The name of the Project container is also displayed in smaller characters directly underneath it, however unlike Jobs it **cannot** be modified following Project creation.

## 2. Description

A **Description** of the Job is shown and can be edited in-place through the corresponding icon button <i class="zmdi zmdi-info-outline zmdi-hc-border"></i>. The reader is referred to [this page](../entities-general/actions/metadata.md#edit-description) for a full explanation of how to do this.

## 3. Actions

The second button <i class="zmdi zmdi-more-vert zmdi-hc-border"></i> towards the right of the header menu allows the user primarily to add new entities to the Job being created. The following options are available under the corresponding drop-down menu.

### [Select Materials](actions-header-menu/select-materials.md)

**Multiple** [Materials]({{ reference_url }}/materials/overview/) can be selected from the account-owned [collection]({{ reference_url }}/accounts/collections/), and added to the Job under creation. This procedure is described separately [in this page](actions-header-menu/select-materials.md).

### [Select  Workflow](actions-header-menu/select-workflow.md)

A **single** [Workflow]({{ reference_url }}/workflows/overview/) can also be selected and added to the Job, for performing computations on **all** materials selected in the above step. If the user wishes to execute multiple computational tasks sequentially, he/she should consider the possibility of creating a sequence of [Subworkflows](../workflow-designer/subworkflow-editor/overview-tab.md) within the same Workflow instead.

Instructions on how to select Workflows from the account-owned collection and add them to the Job being designed can be found [here](actions-header-menu/select-workflow.md).

### [Select Parent](actions-header-menu/select-parent.md)

This option is convenient when the Job being created is intended to be run on top of the results obtained from a previous "parent" Job. Some examples where such a scenario is plausible include the re-calculation of a property with slight modifications, or obtaining the same results but with a higher precision. In both cases, the same preliminary calculations performed in the preceding parent job can be re-utilized, thus saving computational time.  

The action of selecting a parent job is explained in detail [here](actions-header-menu/select-parent.md).

### Submit

The `Submit` option is only present for the case of Jobs with a "Pre-submission" [status]({{ reference_url }}/jobs/status/), which have been opened in Designer directly from [Explorer](../jobs/ui/explorer.md). Pressing `Submit` first saves the Job to the account-owned collection, and then directly [submits](../jobs/actions/run.md) it for execution. 

## 4. Save Job

The Job being currently designed can finally be saved, after all appropriate changes have been made, by clicking the "Save" button <i class="zmdi zmdi-check zmdi-hc-border"></i>. 

When multiple materials are selected, by default (unless the workflow is multi-material in nature) a single job will be created per **each** material. The name of the resulting Job will have the material formula appended to it when more than one material is selected during its design phase.

Once the new Job has been saved, the view is returned to the corresponding [Project page](../jobs/ui/project-page.md). Here, the new Job is now listed as a top entry under [Jobs Explorer](../jobs/ui/explorer.md) and has a "Pre-submission" [status]({{ reference_url }}/jobs/status/), indicating its readiness to be [submitted for execution](../jobs/actions/run.md).
