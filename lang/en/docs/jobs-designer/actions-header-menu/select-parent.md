# Select Parent Job

As introduced in the [header menu page](../header-menu.md#select-parent), a completed "Parent" Job can be selected and added to a Job being [designed]({{ reference_url }}/jobs/overview/) from scratch. This new Job can in this way be based upon the Parent, and thus re-utilize its final results for further computation. These results are therefore "recycled", with the aim of optimizing the performance and computational time of the child Job.  

In order to do so, the user should select the `Select Parent` option under the drop-down menu <i class="zmdi zmdi-more-vert zmdi-hc-border"></i> of the main [header bar](../header-menu.md) of Jobs Designer. 

## "Select Job" Dialog

The "Select Job" dialog is now displayed with the following appearance, which is based on [Jobs Explorer](../../jobs/ui/explorer.md) and thus supporting the corresponding [filter/search](../../entities-general/actions/search.md) functionality.

![Select Job](../../images/jobs-designer/select-job-dialog.png "Select Job")

!!! warning "Criteria for Parent Job selection"
    Only Jobs that satisfy both of the following criteria are available for selection as "parents".
    
    - The parent Job must be under either a "Finished" <span class="btn badge b-success border-50">F</span> or "Terminated" <span class="btn badge b-default border-50">T</span> [status]({{ reference_url }}/jobs/status/).
    - The parent Job must have been executed on a [cluster]({{ resources_url }}/infrastructure/clusters/overview/) which is still available for use by the Account under consideration at the moment of the new Job creation.

## Add Parent Job

**Only one** Job can be [selected](../../entities-general/actions/select.md) as "Parent". It can be prepended to the Job being currently designed by pressing the "Select Items" button <i class="zmdi zmdi-collection-plus zmdi-hc-border"></i> located under the [top-right actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar). 

This returns the view to the main [Jobs Designer](../overview.md) interface, where the name of the selected parent Job and of its container Project are now indicated directly below the main [header menu](../header-menu.md). 

## Animation

Here, we demonstrate how to prepend a parent total energy calculation, performed on the semiconductor GaAs, to a new band structure calculation being designed for the same material.

<img data-gifffer="/images/jobs-designer/add-parent-designer.gif">
