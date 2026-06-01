# Import Command Line Jobs to Web Interface

The present tutorial page explains how to import the results of a [job](../../jobs-cli/overview.md) run via [command-line interface](../../cli/overview.md) to the main [Web Interface]({{ interface_url }}/ui/overview/) of our platform. 

When this feature is employed, the user can see the job output files extracted and available for analysis in the web interface, under the [Files Tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).

## Note about Job Scripts

We use the content of the [job batch script file](../../jobs-cli/batch-scripts/overview.md) in order to collect job information and create an entry for it inside the web interface. Currently, only simple job scripts containing a single [execution command](../../jobs-cli/batch-scripts/general-structure.md#4.-commands) are supported. Hence, the user should make sure that the script's content is properly formatted and straightforward. 

[In this page](../../jobs-cli/batch-scripts/sample-scripts.md), the reader can find **sample job script files** for running  [Job simulations via Command Line Interface](../../jobs-cli/overview.md) that can be used as template. The general structure of such scripts is instead explained [here](../../jobs-cli/batch-scripts/general-structure.md).

!!!note "Keep job scripts simple"
    Please avoid using complex formatting and extra indentations or spacing in the job script.

## Open Web Terminal

First, [navigate]({{ interface_url }}/remote-connection/actions/open-terminal/) to the [Web Terminal]({{ interface_url }}/remote-connection/web-terminal/) for accessing the [command-line interface](../../cli/overview.md) of our platform.

## Import New Job Results

In order to submit a new job through [command-line interface](../../cli/overview.md), and then view the corresponding output files under the [Web Interface]({{ interface_url }}/ui/overview/), the following [directive](../../jobs-cli/batch-scripts/directives.md) should be added to the [job submission script](../../jobs-cli/batch-scripts/overview.md).

```bash
#PBS -R y
```

!!!note "Default Behavior"
    The `#PBS -R y` [directive](../../jobs-cli/batch-scripts/directives.md) is always enabled by default, but it can still be added manually as a failsafe. 

This directive instructs our software to automatically parse the output of the calculation, and send back the results to the web interface. After adding this directive, the job can then be [submitted](../../jobs-cli/actions/submit.md) as usual.

Once the job starts executing, the user should be able to see the job entry in the web interface under [Jobs Explorer]({{ interface_url }}/jobs/ui/explorer/), and thus monitor the corresponding [status]({{ reference_url }}/jobs/status/) of its execution.

This feature can conversely be disabled by inserting the following other directive option in the [job submission script](../../jobs-cli/batch-scripts/overview.md).

```bash
#PBS -R n
```

## Animation 

In the below video, we first navigate to a directory under the [command-line interface](../../cli/overview.md) where we have copied the contents of the [VASP template Job](../../jobs-cli/batch-scripts/directories.md#job-templates). Here, we edit the [job submission script](../../jobs-cli/batch-scripts/overview.md) to insert the aforementioned `#PBS -R y` [directive](../../jobs-cli/batch-scripts/directives.md) for completeness, even though as explained earlier this directive is already enabled by default.
 
This allows us to monitor the job [status]({{ reference_url }}/jobs/status/) under [Jobs Explorer]({{ interface_url }}/jobs/ui/explorer/) in [Web Interface]({{ interface_url }}/ui/overview/), which we inspect towards the end of the animation.

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/p7ex0V0husY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
