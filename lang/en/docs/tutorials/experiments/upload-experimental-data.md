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

This page explains how a laboratory of the AlphaFilm project uploads its measurements to
[alphafilm.mat3ra.com](https://alphafilm.mat3ra.com). A wafer is a Sample Set. Inside it sit Sample Sets for its
measurements, which come as Measurement Sets, one per uploaded folder. Every laboratory in the organization sees
everything.


## 1. Account in the AlphaFilm organization

Everything for the project goes into one [organization]({{ reference_url }}/collaboration/organizations/overview/) on
the site, AlphaFilm: the wafer's Sample Set is created there (section 2), and every run measured on the wafer is
uploaded into it (section 3).

The Mat3ra team creates each lab member's account in advance and shares its username and password.
The password can be [changed]({{ interface_url }}/accounts/ui/preferences/password/) after signing in at
[alphafilm.mat3ra.com](https://alphafilm.mat3ra.com). AlphaFilm is the default account, so everything created in the
browser or with the commands below belongs to it. If the top right of the page shows another account,
open *Accounts* in the left sidebar, find AlphaFilm and choose **Set default** in its row menu.

!!!warning "Test deployment"
    alphafilm.mat3ra.com is a test deployment: nothing confidential should be uploaded there.


## 2. A wafer as a Sample Set

Each wafer is one [set]({{ reference_url }}/entities-general/sets/) of samples, a Sample Set, named by the ID on the
physical wafer, and everything measured on that wafer is uploaded under that name. The set is created in the browser
when the wafer is made; another wafer gets its own set the same way.

Open the *Samples* tab of the account page from the left sidebar, click **+ SET** at the top right, give the set the
wafer's ID as its name and the synthesis notes as its description, and click **Submit**. Here the wafer is named
`Library_1`:

![Set Name dialog with the name Library_1 and the synthesis notes](../../images/tutorials/experiments/create-wafer-sample-set.webp "Creating the Sample Set Library_1")

That name is what the upload command takes. Every run uploaded into the wafer appears inside it as a Sample Set of its
own, holding that run's samples:

![Sample Set Library_1 holding one Sample Set per uploaded run](../../images/tutorials/experiments/wafer-sample-set-with-run-sets.webp "Library_1 with one Sample Set per run")


## 3. Install, sign in, parse and upload

The commands run in a terminal and need Python 3.10 or newer, git and git-lfs (Git Large File Storage). Run
`git lfs install` once after installing git-lfs.

### 3.1. Install the commands

The installation is done once:

```bash
pip install "mat3ra-notebooks-utils[alphafilm] @ git+https://github.com/mat3ra/api-examples.git@alphafilm"
```

### 3.2. Sign in

Signing in is done once. The command prints a link and a code. Open the link in the browser signed in to
alphafilm.mat3ra.com and confirm the code. The command then stores an Application Programming Interface (API) token
that does not expire, with the account id and the host, in `.mat3ra/api_token_cache.json` in the home folder:

```bash
mat3ra-auth alphafilm.mat3ra.com
```

### 3.3. Parse a run

The first argument names the instrument, the second is the run's folder, `RUN` here, whose name is the run's name
(an Asylum run keeps the one in `summary.json`), and the third is a new folder for the output:

```bash
mat3ra-parse asylum-spm RUN upload
```

The instruments with a parser today, and what `mat3ra-parse` takes for each:

| Instrument | Input | Makes |
|:-----------|:------|:------|
| `asylum-spm` | the Asylum switching spectroscopy piezoresponse force microscopy (SS-PFM) run's folder | one measurement per pad, with its hysteresis loop and loop files; a pad without loops has neither |
| `xrf-instrument` | the folder with the X-ray fluorescence (XRF) table, the only `.txt` file in it | one measurement per site, with the site's row of the table |
| `dc-iv-instrument` | the current-voltage (I-V) folder: `IV_Volts.txt`, `IV_Amps.txt`, and `IV_Positions.txt` with the tab-separated `Row` and `Column` of each of their rows, in the same order | one measurement per pad, named `r<Row>c<Column>`, with its row of `IV_Volts.txt` and `IV_Amps.txt` |

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
        files/...          optional: the measurement's files
```

Each file follows a schema, shown in full with a search box in the [schema explorer]({{ schemas_url }}/):
`measurement.json` is a [Measurement]({{ schemas_url }}/#schema/measurement.json), its `workflow` an
[experimental Workflow]({{ schemas_url }}/#schema/workflow/experimental.json), and each entry of `properties` the
schema of that property,
[Hysteresis loop]({{ schemas_url }}/#schema/properties_directory/non_scalar/hysteresis_loop.json) today. The folder
carries `sample`, a [Sample]({{ schemas_url }}/#schema/sample.json), in place of the Measurement's `_sample`: the
upload creates the sample and adds `_sample`. `set.json` has only the three fields shown.

A measurement is one JSON document holding everything about it, with a folder of files beside it.
`r0c00/measurement.json` as `mat3ra-parse` writes it from an Asylum SS-PFM run, with cuts marked `"...": "..."`:

```json
{
    "name": "20260901_171601_alscn_01448 r0c00",
    "description": "SS-PFM hysteresis loop at site r0c00, 16 loops (8 on-field, 8 off-field)",
    "status": "finished",
    "setup": {
        "instrument": {
            "name": "Asylum Research"
        },
        "session": {
            "name": "20260901_171601_alscn_01448",
            "...": "..."
        },
        "settings": {
            "loop_settings": {
                "v_dc_max_v": 20.0,
                "frequency_hz": 0.30048078,
                "...": "..."
            },
            "...": "..."
        },
        "points": [
            {
                "point_index": 0,
                "probe_position": {
                    "x_m": -9.99999842279679e-07,
                    "y_m": -1.0000001587949376e-06
                },
                "drive_frequency_hz": 369811.38,
                "file_path": "C:\\Users\\Asylum User\\Documents\\Asylum Research Data\\260831\\Image0231.ibw"
            },
            {
                "point_index": 1,
                "probe_position": {
                    "x_m": 9.999999349192642e-07,
                    "y_m": -1.0000001587949376e-06
                },
                "drive_frequency_hz": 368978.03,
                "file_path": "C:\\Users\\Asylum User\\Documents\\Asylum Research Data\\260831\\Image0232.ibw"
            },
            {
                "...": "..."
            }
        ]
    },
    "workflow": {
        "metadata": {
            "per_site": [
                {
                    "kind": "loop",
                    "points_m": [
                        [
                            -1e-06,
                            -1e-06
                        ],
                        [
                            1e-06,
                            -1e-06
                        ],
                        {
                            "...": "..."
                        }
                    ],
                    "loop_settings": {
                        "v_dc_max_v": 20.0,
                        "frequency_hz": 0.3,
                        "...": "..."
                    }
                }
            ]
        },
        "...": "..."
    },
    "sample": {
        "name": "r0c00",
        "metadata": {
            "position": {
                "coordinates": [
                    0.021064,
                    0.020812999
                ],
                "units": "m"
            }
        }
    },
    "properties": [
        {
            "name": "hysteresis_loop",
            "...": "..."
        }
    ]
}
```

`setup` is the instrument, the session and the settings as the lab has them, and what the instrument did at each point
(`points`). `sample` is a name, or
`{name, description, metadata}`. Whatever describes a sample beyond its position goes into the sample's `metadata`,
for example a pad's shape and size, `"pad": {"shape": "circle", "size": {"radius": 0.25, "units": "mm"}}`. The
calculations need it. It goes into a `sample.json`, as `{"pad": …}`, in the folder with the data, before the first
upload. `mat3ra-parse` adds whatever it holds to every sample's `metadata`.
Later uploads leave existing samples as they are.

`workflow` is the instrument's workflow document, the same for every measurement of the run. For the Asylum run,
`mat3ra-parse` adds the run's point pattern as `metadata.per_site`.
[Contribute Experimental Data Types](contribute-experimental-data-type.md#33-write-the-workflow-document) shows how
one is written.

The files are the measurement's own, as the instrument wrote them. A result becomes a property once the platform has a
type for it: an entry in `properties`, in the shape its schema shows. A property of a type the platform does not have
is refused and stops the upload at that measurement. Results of other kinds stay in the files; their properties are
built from the files once their types exist. `metadata` is for context, positions and labels, never for a result.


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
`PUT https://alphafilm.mat3ra.com/api/2018-10-01/samples/create-set` with that body and the headers
`Content-Type: application/json`, `X-Account-Id` and `X-Auth-Token`, the last two from the credentials file.


## 7. Troubleshooting

### 7.1. No credentials

`mat3ra-upload` stops with `No API credentials` when `mat3ra-auth` has not been run on this computer. Run
`mat3ra-auth alphafilm.mat3ra.com`.

### 7.2. Wafer set not found

`mat3ra-upload` stops with `Found 0 sample sets named …` when the set does not exist, its name differs, or
`mat3ra-auth` was run for another host. Create the set in the browser (section 2), pass its exact name, or run
`mat3ra-auth alphafilm.mat3ra.com`.

### 7.3. Two sets with the same name

`mat3ra-upload` stops with `Found 2 sample sets named …` when two sets with that name are visible; the upload needs
exactly one.

### 7.4. Error 401

The token in use was deleted, under the *API Tokens* section of the *Preferences* tab. Run
`mat3ra-auth alphafilm.mat3ra.com` again.

### 7.5. Data read as pointer files

`mat3ra-parse` fails with `json.decoder.JSONDecodeError`. Check `sample.json` first. Otherwise git-lfs was missing at
installation, and the data arrived as LFS pointer files. Install git-lfs, run `git lfs install`, then install again:

```bash
pip install --force-reinstall "mat3ra-notebooks-utils[alphafilm] @ git+https://github.com/mat3ra/api-examples.git@alphafilm"
```

### 7.6. Property refused

The upload stops at a measurement whose property has a type the platform does not define. Remove the property from
`properties` in every `measurement.json`, or from the parser that writes it, and upload again. The result stays in the
files.

### 7.7. Records under the personal account

AlphaFilm has to be the default account before uploading (section 1). Records already created under the personal
account stay there, and a second upload finds them by name and reuses them. Write to the Mat3ra team about them.

### 7.8. Slow second upload

A second upload of the same folder takes longer than the first and changes nothing, because the platform lists the
stored files.

### 7.9. Error 403 on a file

The signed URLs for the files expire after 15 minutes. Run the upload again; it sends only the missing files.
