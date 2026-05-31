# Download Remote Files

## Instructions for Remote Desktop

Starting from [Remote Desktop](../remote-desktop.md), the user can download files (of limited size) by putting them in the [Dropbox]({{ dev_url }}/data-in-objectstorage/dropbox/) folder first, which has an overall capacity of 1 Gb. Such files can later be downloaded from the [Web Interface](../../ui/overview.md) by clicking their corresponding entries listed under the [Files Explorer](../../data-in-objectstorage/ui/explorer.md) interface of the [Dropbox Page](../../data-in-objectstorage/ui/dropbox-page.md), as explained [here](../../data-in-objectstorage/actions/download.md).

## Animation 

We demonstrate how to download a file called "remote-connection.yaml", present under the [Login Home]({{ dev_url }}/infrastructure/login/directories/) directory, starting from the Remote Desktop interface. After copying the file to the Dropbox folder, we then retrieve it under the Web Interface.

<img data-gifffer="/images/remote-connection/download-rd.gif" />

## Instructions for Web Terminal

From the [Web Terminal](../web-terminal.md) on the other hand, the user can download any remotely stored file under any directory to his/her local disk with the following command. 

```bash
exadownload <filepath/filename>
```

Typing this command under the [Command Line Interface](../../cli/overview.md) downloads the file directly to the default location for saving Downloaded content set by the web browser being employed.

## Animation

Here, we show the equivalent animation as before, but for the case of Web Terminal. We download the same "remote-connection.yaml" file by entering the corresponding `exadownload` command.

<img data-gifffer="/images/remote-connection/download-wt.gif" />
