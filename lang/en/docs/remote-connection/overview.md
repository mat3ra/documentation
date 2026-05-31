# Remote Connection Methods

We offer alternative **connection methods** other than the [Web Interface](../ui/overview.md) to submit [simulation jobs]({{ reference_url }}/jobs/overview/) to the [computing clusters]({{ dev_url }}/infrastructure/clusters/overview/) of our platform, and access the associated data via the [login node]({{ dev_url }}/infrastructure/login/overview/).

The login node can be accessed via any of the following options.

## [SSH Terminal](ssh.md) 

The user can use an **external SSH client** [^1] under any Operating System to connect to our [Command Line Interface](../cli/overview.md). We explain how to do so in [this page](ssh.md).

## [Web Terminal (WT)](web-terminal.md)

Alternatively, we offer an incorporated Terminal within our Web Interface which also takes the user to the same [Command Line Interface](../cli/overview.md). We refer to this as the [Web Terminal](web-terminal.md).

## [Remote Desktop (RD)](remote-desktop.md)

If the user wants to experience a fully graphical desktop environment, he can do so via the [Remote Desktop Application](remote-desktop.md).

## WT and RD Implementation

Both the Web Terminal and Remote Desktop are implemented via the **Apache Guacamole Server** [^2]. The full sidebar documentation can be accessed in the corresponding documentation manual [^3].
 Instructions on how to open its main Sidebar, referred to as the **Remote-connection Sidebar**, can be found [here](actions/sidebar.md).

## [Actions common to Web Terminal and Remote Desktop](actions/overview.md)

We introduce the actions common to both the Web Terminal and Remote Desktop interfaces in [this section](actions/overview.md) of the documentation.

## [Actions specific to Remote Desktop](actions-rd/overview.md)

Some actions are only available for Remote Desktop, and they are documented [here](actions-rd/overview.md).

## Links

[^1]: [Wikipedia Secure Shell, Website](https://en.wikipedia.org/wiki/Secure_Shell)

[^2]: [Apache Guacamole, Official Website](https://guacamole.apache.org/)

[^3]: [Apache Guacamole Documentation Manual, Official Website](https://guacamole.apache.org/doc/gug/)
