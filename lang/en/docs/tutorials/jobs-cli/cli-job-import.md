# Import Command Line Jobs to Web Interface

This tutorial explains how to import the results of a [job]({{ cli_url }}/jobs-cli/overview/) run via [command-line interface]({{ cli_url }}/cli/overview/) to the main [Web Interface]({{ interface_url }}/ui/overview/).

When this feature is employed, the job output files are extracted and available for analysis in the web interface under the [Files Tab]({{ interface_url }}/jobs/ui/files-tab/) of [Job Viewer]({{ interface_url }}/jobs/ui/viewer/).


## 1. Understand job script requirements

The content of the [job batch script file]({{ cli_url }}/jobs-cli/batch-scripts/overview/) is used to collect job information and create an entry inside the web interface. Only simple job scripts containing a single [execution command]({{ cli_url }}/jobs-cli/batch-scripts/general-structure.md#4.-commands) are supported. The script content should be properly formatted and straightforward.

[Sample job script files]({{ cli_url }}/jobs-cli/batch-scripts/sample-scripts/) for running [Job simulations via Command Line Interface]({{ cli_url }}/jobs-cli/overview/) can be used as templates. The general structure of such scripts is explained [here]({{ cli_url }}/jobs-cli/batch-scripts/general-structure/).

!!!note "Keep job scripts simple"
    Complex formatting and extra indentations or spacing in the job script should be avoided.


## 2. Open the Web Terminal

[Navigate]({{ cli_url }}/remote-connection/actions/open-terminal/) to the [Web Terminal]({{ cli_url }}/remote-connection/web-terminal/) for accessing the [command-line interface]({{ cli_url }}/cli/overview/).


## 3. Import new job results

In order to submit a new job through the [command-line interface]({{ cli_url }}/cli/overview/) and view the corresponding output files under the [Web Interface]({{ interface_url }}/ui/overview/), the following [directive]({{ cli_url }}/jobs-cli/batch-scripts/directives/) should be added to the [job submission script]({{ cli_url }}/jobs-cli/batch-scripts/overview/):

```bash
#PBS -R y
```

!!!note "Default Behavior"
    The `#PBS -R y` [directive]({{ cli_url }}/jobs-cli/batch-scripts/directives/) is always enabled by default, but can still be added manually as a failsafe.

This directive instructs the software to parse the output of the calculation and send back the results to the web interface. After adding this directive, the job can be [submitted]({{ cli_url }}/jobs-cli/actions/submit/) as usual.

Once the job starts executing, the job entry is visible in the web interface under [Jobs Explorer]({{ interface_url }}/jobs/ui/explorer/), where the [status]({{ reference_url }}/jobs/status/) of its execution can be monitored.

This feature can be disabled by inserting the following directive instead:

```bash
#PBS -R n
```


## 4. Video walkthrough

The animation below first navigates to a directory under the [command-line interface]({{ cli_url }}/cli/overview/) where the contents of the [VASP template Job]({{ cli_url }}/jobs-cli/batch-scripts/directories.md#job-templates) have been copied. The [job submission script]({{ cli_url }}/jobs-cli/batch-scripts/overview/) is edited to insert the `#PBS -R y` [directive]({{ cli_url }}/jobs-cli/batch-scripts/directives/) for completeness (though this directive is already enabled by default).

The job [status]({{ reference_url }}/jobs/status/) is then monitored under [Jobs Explorer]({{ interface_url }}/jobs/ui/explorer/) in the [Web Interface]({{ interface_url }}/ui/overview/).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/p7ex0V0husY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
