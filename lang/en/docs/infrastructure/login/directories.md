# Important Directories under Login Home 

## Top level

Each user has its own **Login Home** directory mounted on the [login node](overview.md) filesystem, under the path `/home/<username>/`, such that user `steven` has `/home/steven/` as a home directory, for example. 

The quota limit for data storage under this directory is described [here]({{ reference_url }}/data-on-disk/quotas/).

## Subdirectories
 
Upon connecting to the login home, the user is presented with the following **directory structure**.

 
```bash
.
├── cluster-001          => /cluster-001-home/<username>
├── cluster-007          => /cluster-007-home/<username>
├── Desktop
├── Documents
├── Downloads
├── dropbox              => /dropbox/<username>
├── job_script_templates => /export/compute/job_script_templates
├── Music
├── Pictures
├── Public
├── Templates
└── Videos
```

For the sake of the present discussion, the important folders are the ones labelled with an arrow to their right, indicating that they represent shortcuts pointing to the full path specified to the right of the arrow.

The "dropbox" and "job_script_templates" folders are present under both Cluster Home and [Login Home](../login/directories.md) and are explained in more detail [in this page]({{ reference_url }}/data-on-disk/directories/). Each other important folder is introduced in what follows. 

The remaining folders conform to the conventions of the [Linux distribution]({{ cli_url }}/remote-connection/remote-desktop/#linux-environment) used in our platform.

## Cluster Homes

Login node is meant for storing auxiliary data, such as source code, scripts, notes. Simulations should be executed, and bulky data should be stored, under the **Cluster Home** directories instead, indicated by the corresponding [cluster aliases](../clusters/overview.md#cluster-aliases) under the Login Home (for example, "cluster-001" and "cluster-007" in the file tree above). The contents of such cluster homes is further narrated in a [separate part](../clusters/directories.md) of the documentation.

## Job Script Templates

The Login Home also contains a folder with [Job script]({{ cli_url }}/jobs-cli/batch-scripts/overview/) template examples, necessary for [submitting jobs via the Command Line Interface]({{ cli_url }}/jobs-cli/overview/). Explained in more details [here]({{ reference_url }}/data-on-disk/directories/#job-script-templates).

## Dropbox

Explained in more details [here]({{ reference_url }}/data-on-disk/directories/#dropbox). 

## Example

The location of the login home folder under the main [remote desktop environment]({{ cli_url }}/remote-connection/remote-desktop/) is highlighted in red in the following illustration. 

![Login Home](../../images/infrastructure/login-home.png "Login Home")
