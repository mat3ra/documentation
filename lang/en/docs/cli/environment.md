# Command-line Environment

This page explains the environment setup for a [command line session](overview.md) within our platform. The **Environment** is an important concept in the Unix operating system [^1]. It is defined in terms of **environment variables** [^2], some of which are set by the system, others by the user, yet others by the shell or by any program that loads another program.

After logging into our platform via the [Command Line Interface (CLI)](overview.md), the user will by default enter the [Login Home]({{ resources_url }}/infrastructure/login/directories/) directory, from which other nodes of the [infrastructure]({{ resources_url }}/infrastructure/overview/) can be accessed.

## Customization

The CLI environment can be **customized** by the user in two respects: by choosing the **Shell type**, and through the **loading of the environment Modules**, which include numerous commonly-used simulation packages and associated libraries. Both are explained below.

### Shell Type

The **Shell type** [^3] can modify the way that the user can interact with the CLI by, for example, introducing new commands or key shortcuts. For example, Ref. [^4] explains how the "bash" shell type differs from zsh. 

The different shell types that are available as part of our product, and can be chosen from by the user, are listed below.

- **sh** [^5]
- **bash** [^6]
- **csh** [^7]
- **ksh** [^8]
- **zsh** [^9]

!!!info "ZSH"
    We use **oh-my-zsh**, a community-driven framework for managing the zsh configuration. For more information, please visit its official website [^10].

The **default shell** is set to bash. The user can change shell from this default setting by following the instructions contained [in this page](actions/customize.md).

The shell customization can be further controlled via certain **startup scripts**, which are executed when the user first logs into the CLI. The user can customize some of these scripts, which are commonly referred to as "dot files," by setting environment variables and aliases in them, as explained [in this page](actions/customize.md).

### Modules

Software packages and programming libraries, are available through the **environment modules** further explained in a [dedicated page](modules.md).

After loading the corresponding modules, the software can be used in [Job Scripts](../jobs-cli/batch-scripts/overview.md) for [Job execution via the CLI](../jobs-cli/overview.md). 

## Default Python Environment

By default, we implement **Python 2.7.5** as our global system version. 

To use a more recent Python version, [we have **environment modules** available](modules.md) which can be activated to replace the global Python interpreter for an individual session.

If a specific Python version is needed for which we don't yet provide an environment module, a wide variety of Python versions can be installed via Pyenv. [^11].

Finally, once a Python version has been chosen, we [explain how to create customized **Python virtual environments**](actions/create-python-env.md) to manage installing Python software packages.

## Links

[^1]: [Wikipedia UNIX, Website](https://en.wikipedia.org/wiki/Unix)

[^2]: [Wikipedia Environment variable, Website](https://en.wikipedia.org/wiki/Environment_variable)

[^3]: [Wikipedia Unix shell, Website](https://en.wikipedia.org/wiki/Unix_shell)

[^4]: [Zsh vs Bash, Website](https://stackabuse.com/zsh-vs-bash/)

[^5]: [Wikipedia Bourne shell, Website](https://en.wikipedia.org/wiki/Bourne_shell)

[^6]: [Wikipedia Bash (Unix shell), Website](https://en.wikipedia.org/wiki/Bash_(Unix_shell))

[^7]: [Wikipedia C shell, Website](https://en.wikipedia.org/wiki/C_shell)

[^8]: [Wikipedia Korn Shell, Website](https://en.wikipedia.org/wiki/KornShell)

[^9]: [Wikipedia Z Shell, Website](https://en.wikipedia.org/wiki/Z_shell)

[^10]: [Oh My ZSH!, Official Website](https://ohmyz.sh/)

[^11]: [Simple Python Version Management: pyenv, Official GitHub Repository](https://github.com/pyenv/pyenv#simple-python-version-management-pyenv)
