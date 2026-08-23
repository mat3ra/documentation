# The Module Command 

We describe in this page how [modules](../environment.md#modules) can be handled under the [Command Line Interface](../overview.md) (CLI) of our platform, via the `module` command and its corresponding keyword parameters.

## List Currently Loaded Modules

The first command of interest is `module list`, which returns the list of **currently loaded modules**. No modules are pre-loaded by default at the moment of login, so that this command will return an empty list unless new modules are loaded by the user, as explained in a forthcoming section of this page. 

Below is an example of the output of this command, showing the list of modules loaded by user "Steve".

```text
[steve@login.mat3ra.com:~]$ module list
Currently Loaded Modulefiles:
  1) intel/i-174(default)    2) mpi/impi-044(default)    3) mkl/i-174(default)    4) espresso/521-i-174-impi-044(default)
```

## Load Desired Module

The user can **load a certain desired module** from the aforementioned list of available ones via the `module load <module name>` command, in order to make it available under the CLI. Conversely, modules can also be unloaded with `module unload <module name>`.

For example, to use the [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) modelling application, the corresponding module can be loaded as follows. All other library dependencies of the desired module will also be loaded automatically in this way.


```bash
[steve@login.mat3ra.com:~]$ module load espresso/521-i-174-impi-044
The module intel/i-174 is loaded
The module mpi/impi-044 is loaded
The module intel/i-174 is loaded
The module mkl/i-174 is loaded
The module espresso/521-i-174-impi-044 is loaded
```

## Default Modules

If there is a "default" keyword next to a module name, it can be loaded without specifying the full module name, as demonstrated below.

```bash
[steve@login.mat3ra.com:~]$ module load espresso
The module intel/i-174 is loaded
The module mpi/impi-044 is loaded
The module intel/i-174 is loaded
The module mkl/i-174 is loaded
The module espresso/521-i-174-impi-044 is loaded
```

## Purge All Loaded Modules

Finally, the `module purge` command can be entered to **completely clean** the environment and **deactivate all currently loaded modules**. This functionality is illustrated by way of the following example.

```bash
[steve@login.mat3ra.com:~]$ module list
Currently Loaded Modulefiles:
  1) intel/i-174(default)    2) mpi/impi-044(default)    3) mkl/i-174(default)    4) espresso/521-i-174-impi-044(default)
[steve@login.mat3ra.com:~]$ module purge
[steve@login.mat3ra.com:~]$ module list
No Modulefiles Currently Loaded.
```
