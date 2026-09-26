# Copy / Paste Text with Remote-connection Sidebar

The Copy/Pasting of text to/from the [Remote Desktop](../remote-desktop.md) or [Web Terminal](../web-terminal.md) to/from the clipboard can be done with the help of the [Remote-connection Sidebar](sidebar.md), available under both interfaces. This functionality is best illustrated by way of examples. 

## Paste Text into Remote Interface 

In the following animation, we show how to copy and paste the path of a simulation output file listed under [Files Explorer]({{ interface_url }}/data-in-objectstorage/ui/explorer/) to the Web Terminal (the same considerations apply also to the case of Remote Desktop). 

We first copy its path into the clipboard by performing the corresponding [action]({{ interface_url }}/data-in-objectstorage/actions/copy-path/) under Files Explorer. We then [open the Remote-connection Sidebar](sidebar.md) under Web Terminal and paste the file path in it. This in turn makes the file path available under the Web Terminal interface through a right-mouse click, which allows us for example to open the file with a command line text editor (like nano) and to inspect its contents (something which cannot be done under the Web Interface).

<img data-gifffer="/images/remote-connection/paste-wt.gif" />

## Copy Text from Remote Interface 

Conversely, we can select any text displayed under the Web Terminal, which is made immediately available to the Sidebar as soon as it is opened. This text can be copied from the sidebar to the clipboard, and as such can then be pasted anywhere, like for example in an external text editor. We demonstrate this procedure in the example animation below.

<img data-gifffer="/images/remote-connection/copy-wt.gif" />
