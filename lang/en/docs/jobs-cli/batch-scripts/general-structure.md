# Batch Script General Structure

The [Batch Scripts](overview.md) used for [job submission via CLI](../overview.md) have a general structure subdivided into several main sections, corresponding to each highlighted panel in the image below. The reader is referred to their number labels for finding their ensuing explanations.

![Batch Script General Structure](../../images/jobs-cli/jobscript_structure.png "Batch Script General Structure")

!!!tip "Recommended extensions for Batch Scripts"
    A common convention is to append the suffix ".pbs" or ".rms" or ".sh" to the filename of batch scripts.

## 1. Shebang

The **shebang** [^1] is a short character sequence at the beginning of the Batch Script. It uses the "#!" syntax to indicate an interpreter for execution of the script under UNIX / Linux operating systems. Typically, the shebang of our Batch Scripts consists in either of the following options for selecting the corresponding [environment](../../cli/environment.md#shell-type) of the shell interpreter.

- `#!/bin/sh` – Execute the file using the **Bourne shell**, or a compatible shell, with path `/bin/sh`.
- `#!/bin/bash` – Execute the file using the **Bash shell**.

## 2. Commentaries

Commentaries (annotations) can be written anywhere within the batch script at the user's discretion, by inserting the "hash" character `#` and a single space ' ' at the start of the corresponding line.
 
Commentaries may consist in any text string containing any type of character, except for placing an exclamation mark `!` or [resource-manager]({{ resources_url }}/infrastructure/resource/overview/)-specific text sequences immediately after the hash. The former character combination is reserved respectively for the above-mentioned shebang.

## 3. Directives

As introduced [here](overview.md#implementation), we make use of the **Portable Batch System (PBS)** protocol for organizing job scheduling on our platform. A comprehensive set of **PBS  Resource Management Directives** is available for setting the relevant job parameters, such as allocating the necessary [computational resources]({{ resources_url }}/infrastructure/compute/parameters/). 

These directives are the object of a [dedicated review](directives.md).

## 4. Commands

Unix commands can be inserted towards the bottom of the batch script.

## Links

[^1]: [Wikipedia Shebang (Unix), Website](https://en.wikipedia.org/wiki/Shebang_(Unix))
