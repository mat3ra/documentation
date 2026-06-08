# Jupyter Lab: Data

## Structured Representation

We present in what follows the [structured representation]({{ data_url }}/data-structured/overview/) for the [Jupyter Lab Application]({{ reference_url }}/software-directory/scripting/jupyter-lab/overview/).

=== "Schema"
    ```json
    --8<-- "data/esse/schema/software_directory/scripting/jupyter-lab.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/software_directory/scripting/jupyter-lab.json"
    ```

## Files/Storage Convention

1. Initially, the root of the Dropbox folder is passed to the application on the start, so the files at the root of the [Dropbox]({{ resources_url }}/data-in-objectstorage/dropbox/) directory can be accessed
2. Upon each "Save and Checkpoint" action invoked inside the notebook, the ipynb file is overwritten. A new version is stored in the file system, and a checkpoint is saved to the job inside its directory both in the [command-line]({{ cli_url }}/jobs-cli/batch-scripts/directories/#working-directory) and on the [web interface]({{ resources_url }}/data-in-objectstorage/files/).
3. All notebooks have access to the filesystem accessible to the user on the corresponding computational node, namely the [home]({{ resources_url }}/infrastructure/clusters/directories/) and [share]({{ resources_url }}/infrastructure/clusters/directories/) directories. For example, the following command will list the shared directory for the account "exabyte-io", when invoked inside the Jupyter Notebook running on "cluster-007":

    ```bash
    ls -lhta /cluster-007-share/groups/exabyte-io
    ```
