# Upload Local Files

Files can be uploaded from local disks to the [Web Terminal](../web-terminal.md) by **dragging and dropping** them directly into its interface.

!!!warning "Feature not implemented under Remote Desktop"
    The drag and drop feature for uploading files is currently unavailable for Remote Desktop. However, files uploaded in this way using the Web Terminal can also be retrieved under the same location in Remote Desktop.

This feature only works for uploading files to the [Login Home]({{ dev_url }}/infrastructure/login/directories/) directory, but not to any of its sub-folders. In case of necessity, the use of the [SCP protocol](../ssh.md#transfer-files-with-scp) is recommended for transferring files, which works under all circumstances.  

## Animation 

We show an example of how to upload a file called "remote-connection.yaml" to the Web Terminal in the below animation, by dragging and dropping it.

<img data-gifffer="/images/remote-connection/upload-wt.gif" />
