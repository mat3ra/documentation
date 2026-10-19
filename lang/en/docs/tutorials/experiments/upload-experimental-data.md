---
tags:
  - alphafilm
  - experimental-data
  - samples
  - measurements
hide:
  - tags
render_macros: true
---

# Upload Experimental Data to AlphaFilm

This page explains how the laboratories of the AlphaFilm project, the National Laboratory of the Rockies (NLR) and the
University of Tennessee, Knoxville (UTK), upload their measurements to
[alphafilm.mat3ra.com](https://alphafilm.mat3ra.com). A wafer is a Sample Set. Inside it sit Sample Sets for its
measurements, which come as Measurement Sets: one folder, one command, one Measurement Set. Both laboratories see
everything.


## 1. Account in the AlphaFilm organization

Everything for the project goes into one [organization]({{ reference_url }}/collaboration/organizations/overview/) on
the site, AlphaFilm: NLR creates the wafer there (section 2) and both laboratories upload their runs into it
(section 3).

Accounts are created in advance: the username and password of each lab member are in the file shared on Google Drive.
The password can be changed after signing in at [alphafilm.mat3ra.com](https://alphafilm.mat3ra.com), on the
*Preferences* tab of the account page, with **Update password**. AlphaFilm is the default account, so everything
created in the browser or with the commands below belongs to it. If the top right of the page shows another account,
open *Accounts* in the left sidebar, find AlphaFilm and choose **Set default** in its row menu.

!!!warning "Test deployment"
    alphafilm.mat3ra.com is a test deployment: nothing confidential should be uploaded there.


## 2. A wafer as a Sample Set

Each wafer is one [set]({{ reference_url }}/entities-general/sets/) of samples, a Sample Set, named by the ID on the
physical wafer, and everything measured on that wafer is uploaded under that name. NLR creates the set in the browser
when the wafer is made; another wafer gets its own set the same way.

First, open the *Samples* tab of the account page from the left sidebar. Then, click **+ SET** at the top right, give
the set the wafer's ID as its name and the synthesis notes as its description, and click **Submit**. Here the wafer is
named `Library_1`:

![Set Name dialog with the name Library_1 and the synthesis notes](../../images/tutorials/experiments/create-wafer-sample-set.webp "Creating the Sample Set Library_1")

That name is what the upload command takes. Every run uploaded into the wafer appears inside it as a Sample Set of its
own, holding that run's samples:

![Sample Set Library_1 holding one Sample Set per uploaded run](../../images/tutorials/experiments/wafer-sample-set-with-run-sets.webp "Library_1 with one Sample Set per run")


## 3. Install, sign in, parse and upload

The commands need Python 3.10 or newer, git and git-lfs, the Git Large File Storage (LFS) extension; `git lfs install`
is run once after installing git-lfs. Each step is one command in a terminal.

### 3.1. Install the commands

The installation is done once:

```bash
pip install "mat3ra-parsers[alphafilm] @ git+https://github.com/mat3ra/parsers.git@alphafilm"
```

### 3.2. Sign in

Signing in is done once. The command prints a code; confirm it in the browser signed in to alphafilm.mat3ra.com. The
command then stores an Application Programming Interface (API) token that does not expire, with the account id and
the host, in `.mat3ra/api_token_cache.json` in the home folder:

```bash
mat3ra-auth alphafilm.mat3ra.com
```

### 3.3. Parse a run

The first argument names the instrument, the second is the run as the instrument wrote it, `RUN` here, and the third
is a new folder for the output:

```bash
mat3ra-parse asylum-spm RUN upload
```

The three instruments are UTK's Asylum Research microscope for switching spectroscopy piezoresponse force microscopy
(SS-PFM), and NLR's X-ray fluorescence (XRF) and current-voltage (I-V) instruments. What `mat3ra-parse` takes for
each:

| Instrument | Input | Makes |
|:-----------|:------|:------|
| `asylum-spm` | the Asylum SS-PFM run's folder (UTK) | one measurement per pad, with its hysteresis loop and loop files |
| `xrf-instrument` | the XRF grid table (NLR) | one measurement per site, the table in its files |
| `dc-iv-instrument` | the I-V folder with `IV_Volts.txt` and `IV_Amps.txt` (NLR) | one measurement per row, the sweeps in its files |

### 3.4. Upload the folder

The folder is uploaded into the wafer's set, by the set's name:

```bash
mat3ra-upload Library_1 upload
```

The measurements go into a Measurement Set named as in the folder's `set.json`; their samples go into a Sample Set of
the same name inside the wafer's set. Files go to storage after the records. Running the same upload again sends only
what is missing, so an interrupted upload is resumed by repeating it. Another instrument needs its own parser writing
the same folder, as explained in [Contribute Experimental Data Types](contribute-experimental-data-type.md); the upload
command does not change.


## 4. Uploaded data in the browser

A measurement page has the sample, the workflow, the setup, the results and the files, each on its own tab:

![Measurement page of site r1c1 with the Sample tab open](../../images/tutorials/experiments/measurement-page-sample-tab.webp "Measurement page")

A hysteresis loop plots on the *Results* tab; without a property the tab is empty and the data is in the files:

![Hysteresis loop of pad r0c00 on the Results tab](../../images/tutorials/experiments/measurement-results-tab-hysteresis-loop.webp "Hysteresis loop on the Results tab")

A sample shows its name, id, description and metadata:

![Sample page of site r1c1 with its id, description and metadata](../../images/tutorials/experiments/sample-page.webp "Sample page")


## 5. Upload folder and its schemas

A parser writes the run into this folder:

```text
<folder>/
    set.json               name, description, metadata of the measurement set
    <measurement>/         one folder per measurement, any name
        measurement.json   name, description, status, setup, workflow, sample, properties, metadata
        files/...          optional: the measurement's files, as the instrument wrote them
```

Each file follows a schema, shown in full with a search box in the [schema explorer]({{ schemas_url }}/):
`measurement.json` is a [Measurement]({{ schemas_url }}/#schema/measurement.json), its `sample` a
[Sample]({{ schemas_url }}/#schema/sample.json), its `workflow` an
[experimental Workflow]({{ schemas_url }}/#schema/workflow/experimental.json), and each entry of `properties` the
schema of that property, [Hysteresis loop]({{ schemas_url }}/#schema/properties_directory/non_scalar/hysteresis_loop.json)
today. `set.json` has only the three fields shown. A minimal folder that uploads is
[upload_folder](https://github.com/mat3ra/api-client/tree/alphafilm/tests/py/data/upload_folder) in api-client.

A measurement is one JSON document holding everything about it, with a folder of files beside it.
`r0c00/measurement.json` from an Asylum SS-PFM run:

```json
{
  "name": "20260901_171601_alscn_01448 r0c00",
  "description": "SS-PFM hysteresis loop at site r0c00, 16 loops (8 on-field, 8 off-field)",
  "status": "finished",
  "setup": {
    "instrument": {"name": "Asylum Research"},
    "session": {"name": "20260901_171601_alscn_01448"},
    "settings": {
      "loop_settings": {"v_dc_max_v": 20.0, "frequency_hz": 0.3, "n_cycles": 3},
      "pfm_excitation": {"...": "..."}
    }
  },
  "workflow": {"...": "the workflow document, the same for every measurement of the run"},
  "sample": {
    "name": "r0c00",
    "metadata": {"position": {"x_stage_m": 0.021064, "y_stage_m": 0.020813}}
  },
  "properties": [
    {"name": "hysteresis_loop", "...": "the property document in its schema's shape"}
  ],
  "metadata": {"...": "anything else the run recorded about this measurement"}
}
```

`setup` is the instrument and its settings as the lab has them; `sample` is a name, or `{name, description, metadata}`.
Anything measured on a pad, I-V curves included, has the pad's size in the sample's `metadata`, next to its position,
for example `"pad": {"shape": "circle", "size": {"radius": 0.25, "units": "mm"}}`; the calculations need it.

`workflow` follows the experimental workflow schema: the instrument is named on the subworkflow, the units list their
results, and there is no model, method or compute. The workflow of the SS-PFM run:

```json
{
  "name": "SS-PFM Hysteresis Loop",
  "properties": ["hysteresis_loop"],
  "subworkflows": [
    {
      "name": "ss_pfm",
      "properties": ["hysteresis_loop"],
      "instrument": {"name": "asylum-spm", "shortName": "spm", "summary": "Asylum Research SPM", "version": "1.0"},
      "units": [
        {"type": "measurement", "name": "run_loop", "results": [{"name": "hysteresis_loop"}], "...": "..."}
      ]
    }
  ],
  "units": [{"type": "subworkflow", "name": "ss_pfm", "...": "..."}],
  "tags": ["afm"]
}
```

The files are uploaded as the instrument wrote them. A result becomes a property, with its plot, once the platform has
a type for it, the hysteresis loop today: an entry in `properties`, in the shape its schema shows. A property of a type
the platform does not have is refused and stops the upload at that measurement. Results of other kinds stay in the
files; their properties are built from the files once their types exist. `metadata` is for context, positions, labels,
session, never for a result.


## 6. Creating the wafer's Sample Set without the browser

The [API client]({{ developers_url }}/rest-api/api-client/) creates the set from Python, with the credentials stored
by `mat3ra-auth`:

```python
import json, os
from mat3ra.api_client import APIClient

credentials = json.load(open(os.path.expanduser("~/.mat3ra/api_token_cache.json")))
client = APIClient.authenticate(
    host="alphafilm.mat3ra.com", port=443, secure=True,
    account_id=credentials["ACCOUNT_ID"], auth_token=credentials["AUTH_TOKEN"],
)
wafer = client.samples.create_set({
    "name": "Library_1",
    "description": "AlScN combinatorial library on a 2-inch wafer, Sc-rich to Al-rich across x",
    "metadata": {"dimensions": {"shape": "square", "side": 50.8, "units": "mm"}},
})
```

A set inside another takes the parent's id as `parentSetId`. The same request without Python is
`PUT https://alphafilm.mat3ra.com/api/2018-10-01/samples/create-set` with that body and the headers `X-Account-Id` and
`X-Auth-Token` from the credentials file.


## 7. Troubleshooting

### 7.1. Wafer set not found

`mat3ra-upload` stops with `Found 0 sample sets named …` when the wafer's set does not exist, its name differs, or it
was created under another account. Create the set in the browser under AlphaFilm (section 2) and pass its exact name.

### 7.2. Error 401

`mat3ra-auth` has not been run on this computer, or was run for another host. Run `mat3ra-auth alphafilm.mat3ra.com`.

### 7.3. Data read as pointer files

`mat3ra-parse` fails with `json.decoder.JSONDecodeError`, or the data it reads starts with `version https://git-lfs`:
git-lfs was missing at installation, and the data arrived as LFS pointer files. Install git-lfs, run `git lfs install`,
then install again:

```bash
pip install --force-reinstall "mat3ra-parsers[alphafilm] @ git+https://github.com/mat3ra/parsers.git@alphafilm"
```

### 7.4. Property refused

The upload stops at a measurement whose property has a type the platform does not define. Remove the property from
`properties` in that `measurement.json`; the result stays in the files.

### 7.5. Records under the personal account

The default account was not AlphaFilm at the time of the upload. Set AlphaFilm as the default account (section 1),
create a new wafer set, and upload again.

### 7.6. Slow second run

A second run of the same folder takes minutes: the platform lists the stored files with a signed URL per file. This is
harmless; nothing is uploaded again.

### 7.7. Error 403 on a file

The signed URLs for the files expire after 15 minutes. Run the upload again; it sends only the missing files.
