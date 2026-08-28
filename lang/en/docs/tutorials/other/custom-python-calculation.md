# Running a Custom Python Script on One or More Materials

The platform can run an arbitrary Python script against materials from an
account's [collection]({{ reference_url }}/accounts/collections/), with no
simulation engine involved. The script, its dependencies and any data files it
reads are uploaded to the account's object storage folder; a
[workflow]({{ reference_url }}/workflows/overview/) fetches them onto the
compute node next to the material, and whatever the script prints comes back as
the result.

This page describes the flow through the `custom_python_calculation.ipynb`
notebook, which performs the upload, assembles the workflow, and creates one
[job]({{ reference_url }}/jobs/overview/) per material. For a script that needs
neither a material from the collection nor data files of its own, the general
Python flavor/<wbr/>template described in
[Python MLFF](../ml/run-mlff-python-workflows-mattersim.md#3-using-the-general-python-template)
is sufficient on its own.


## 1. Prepare the script

The script runs on the compute node in a working directory that holds the
material and the uploaded files side by side, so every path in it is relative.
Nothing in the script is specific to the platform: it reads files, computes, and
prints.

### 1.1. Read the material

The job's material is written to `material.json` before the script starts, in
the [representation]({{ reference_url }}/materials/overview/) the platform
stores it in — a `lattice` object holding the cell lengths and angles, and a
`basis` object holding the elements and their coordinates. A script that reports
the number of atoms and the elements present reads it as follows:

```python title="USER_SCRIPT"
import json

material = json.load(open("material.json"))
elements = [element["value"] for element in material["basis"]["elements"]]

print(json.dumps({"n_atoms": len(elements), "elements": sorted(set(elements))}))
```

This is the default script in the notebook, and it serves as the starting point
for a custom one.

### 1.2. Print the results

The standard output of the script is the result. The notebook parses each line
that is a JSON object and renders the parsed values as a table, one row
per material, so a script that prints a single JSON object per run needs no
further formatting. Lines that are not JSON are shown as printed, which makes
`print()` usable for progress messages and debugging.

### 1.3. Add data files

A script that reads its own data — a table of radii, a set of parameters, a
pseudopotential — takes those files from the `uploads` folder of the JupyterLite
session. The files are placed there first, by dragging them into the file
browser, and named in the `USER_ASSET_FILES` parameter. The notebook then
uploads them next to the script, and the workflow fetches them into the same
working directory, where the script opens them by name.

An upload travels as a string inside a JSON request body, so the files named
here are UTF-8 text. The notebook refuses anything else with a message pointing
at the route described in Section 5 below, which is where binary data belongs.

!!!warning "Reserved file names"
    The names `script.py`, `requirements.txt` and `material.json` are written by
    the workflow itself. An upload under one of those names is refused, since it
    would be overwritten before the script runs.

### 1.4. Declare dependencies

Packages the script imports are listed in the `USER_REQUIREMENTS` parameter, in
the form used by `requirements.txt` — for example `["numpy<2"]`. The list is
installed into a Python virtual environment on the compute node before the
script starts. An empty list is valid, and is what the default script uses,
since it imports nothing beyond the standard library.

!!!info "Shared virtual environment"
    Virtual environments are shared across jobs and users. As long as the
    contents of the requirement list are unchanged, the same environment is
    reused, so the first job pays for `pip install` and later ones start
    immediately. Versions that need to be exact should be pinned explicitly.


## 2. Run the notebook

The notebook lives in the JupyterLite session that ships with the platform, and
it runs entirely in the browser until the moment it submits the jobs.

### 2.1. Open the notebook

First, open a
[JupyterLite session]({{ interface_url }}/jupyterlite/accessing-jupyterlite/)
from the account page. Then, in the file browser, open `made`, then `workflows`,
then `custom_python_calculation.ipynb`.

### 2.2. Set the parameters

The parameters sit in the cell under *1.2. Set parameters and configurations for
the workflow and job*, and the script sits on its own in the cell under *1.3.
Set the script to run*, so the two are edited independently.

`MATERIAL_NAMES` lists the materials, one job per entry. Each name is looked up
in the `uploads` folder first and in the standard materials set that ships with
the notebook environment as a fallback, then saved to the account's collection if
an identical material is not there already.
`USER_ASSET_FILES` and `USER_REQUIREMENTS` are described in Section 1 above.
`MY_WORKFLOW_NAME` names the workflow, and `save_to_collection` decides whether
it is kept. The cluster, queue and processor count are set further down the same
cell.

### 2.3. Run all cells

Click **Run** > **Run All**. The notebook authenticates in the browser, uploads
the script and the data files, assembles the workflow, creates one job per
material, submits them, and polls until each one finishes. A run against a small
material takes a few minutes, most of it spent waiting for the queue and, on the
first run with a given requirement list, for `pip install`.

### 2.4. View the results

The last cell prints the standard output of each job and renders the parsed JSON
values as a table. The same output is available in the
[Job Viewer]({{ interface_url }}/jobs/ui/viewer/): the *Workflow* tab exposes
the standard output of the script unit, and the
[*Files* tab]({{ interface_url }}/jobs/ui/files-tab/) lists the uploaded files,
the material, and everything the script wrote.


## 3. Anatomy of the workflow

The notebook does not build a workflow from nothing. It takes the *Custom Python
Script* workflow from the standard workflow set and fills in the three things
that differ per run. The same workflow is held in the
[Workflows Bank]({{ reference_url }}/workflows/bank/), where it can be inspected
in the web interface. It consists of four
[units]({{ reference_url }}/workflows/components/units/):

- **I/O unit, object storage:** fetches the uploaded script and data files into
the working directory. The notebook sets its input list from the upload it has
just performed.
- **I/O unit, material:** fetches the job's materials from the job context.
- **Assignment unit:** takes the first material and assigns it to a global
variable named `MATERIAL`.
- **Execution unit:** runs a short runner script that writes `MATERIAL` to
`material.json` and executes the uploaded script in the same process. The
notebook sets the runner and the requirement list on this unit.

The runner is what keeps the user's script untouched: the script is fetched as a
file rather than embedded in the workflow, so text in it that resembles a
template placeholder is never rendered.


## 4. Reuse the saved workflow

With `save_to_collection` left at its default, the workflow is saved to the
account's collection under the name given by `MY_WORKFLOW_NAME`. It points at
the uploaded files, so it can be selected in the
[Jobs Designer]({{ interface_url }}/jobs-designer/overview/) like any other
workflow and [run]({{ interface_url }}/jobs/actions/run/) against a different
material without opening the notebook again.

Re-running the notebook overwrites the uploaded files in place, under the same
names in the same folder. An edited script therefore reaches a saved workflow
without any change to the workflow itself.


## 5. The shell twin: run any node-side application

A sibling notebook, `custom_shell_calculation.ipynb`, carries the same flow with a shell script
in place of the Python one. A shell script runs in a `module`-capable shell, so it can invoke any
application installed on the compute node. Its default example builds Quantum ESPRESSO inputs
from `material.json` and runs an SCF and a band structure step for silicon with a pseudopotential
from the platform's library. A pseudopotential of the user's own goes up through the same upload
call as any data file — placed in the `uploads` folder, listed in `USER_ASSET_FILES`, with the
script's `PSEUDO_DIR` pointed at the working directory — and Quantum ESPRESSO's own log then names
the uploaded file as the one it read. Such a file can also be registered as a first-class
pseudopotential through the web interface, as described in
[Upload a custom pseudopotential](../dft/upload-pseudopotential.md).


## 6. Limits

Text files travel inside the request body. Anything else — a model checkpoint, an archive, a file
too large for a request — is sent to a URL the platform signs for it and lands in storage directly,
so the only bound is what the browser can hold in memory while uploading. The `uploads` folder of
the JupyterLite session is the staging area in both cases.

The script is given one material per job, as `material.json`. A calculation over
a set of materials at once is a different shape of workflow, and is not what this
notebook builds.


## 7. Links

The pages below cover the platform features this notebook builds on.

- [Dropbox]({{ resources_url }}/data-in-objectstorage/dropbox/) — the object
  storage folder the files are uploaded to.
- [Python]({{ reference_url }}/software-directory/scripting/python/overview/) —
  the application the execution unit uses.
- [JupyterLite]({{ interface_url }}/jupyterlite/overview/) — the in-browser
  notebook environment.
- [api-examples](https://github.com/mat3ra/api-examples) — the repository the
  notebook is maintained in.
