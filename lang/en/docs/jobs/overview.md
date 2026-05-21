# Jobs

In this section we review the concept of computational "Jobs", which consist in
the application of a [Workflow](../workflows/overview.md) (or simulation) on a
[Material](../materials/overview.md) to produce one or more [Properties](
../properties/overview.md).

Job is a "container" entity that is used to organize the data and track resource
allocation. The terminology and naming is commonly used for distributed resource
allocation management. A job, in the computational sense, represents the
simplest entity that has accounting set up for, and can have one or more
[Material](../materials/overview.md) and a single [Workflow](
../workflows/overview.md) associated with it.

We implement Jobs as another [entity type](../entities-general/overview.md). As
such, they have the same user interface components (with some distinct features)
as other entities, as explained [here]({{ guide_url }}/entities-general/ui/overview/).

## [Data](data.md)

The data convention applied for Jobs including, for example, their database
representation is explained [in this page](data.md).

## [Status](status.md)

Jobs have different statuses attributed to them depending on the level of
progress of the simulation. We explain the list of possible statuses [here](
status.md).

## [Projects](projects.md)

Jobs can collectively be grouped together into [Sets](
../entities-general/sets.md), which in this context are referred to as
**[Projects](projects.md)**.

## User Interface

### [Explorer]({{ guide_url }}/jobs/ui/explorer/)

Jobs Explorer is another specific implementation of the [Explorer]({{ guide_url }}/entities-general/ui/explorer/) component and is explained [in this page](
ui/explorer.md).

### [Designer]({{ guide_url }}/jobs-designer/overview/)

Jobs Designer is another specific implementation of the [Designer]({{ guide_url }}/entities-general/ui/designer/) component described in more detail [here]({{ guide_url }}/jobs-designer/overview/).

### [Viewer]({{ guide_url }}/jobs/ui/viewer/)

[This page]({{ guide_url }}/jobs/ui/viewer/) explains how the [Viewer]({{ guide_url }}/entities-general/ui/viewer/) differs from Designer component in the context
of Jobs.

## [Actions]({{ guide_url }}/jobs/actions/overview/)

Some actions pertain specifically to Jobs, and are introduced [in this page](
actions/overview.md).

## Screenshare video

Below we present a short video demonstrating how to create jobs in Mat3ra
platform.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/hT1VBFH7HHo?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
