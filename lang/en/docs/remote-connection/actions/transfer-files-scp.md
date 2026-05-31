# Transfer Files via SCP

[SCP file transfers](../../remote-connection/ssh.md#transfer-files-with-scp) can
be performed directly via any terminal instance opened in a local user machine
with OpenSSH client installed, through the following commands (the user should
replace the text inside braces below with the corresponding names/paths).

1. To transfer local files **to** mat3ra.com remote server (called "bohr"):

```bash
scp -i <path to private_key> <path to local file> <username>@login.mat3ra.com:<path inside login home>
```

2. To transfer remote files **from** mat3ra.com server to local machine:

```
scp -i <path to private_key> <username>@login.mat3ra.com:<path inside login home> <path to local file>
```

## Examples

For example, let us assume that user `steve` would like to transfer a text file
called `example.txt` under his local home directory to the remote "bohr" server,
where the final destination is his personal `data` folder in the
[Cluster Home]({{ dev_url }}/infrastructure/clusters/directories/) directory for
"cluster-001".

The command that he needs to enter to perform this file transfer, after opening
a terminal instance on his own local machine, would be the following (assuming
his private [ssh key](../ssh.md) file is stored locally under his home folder).

```bash
scp -i ~/ssh_key ~/example.txt steve@login.mat3ra.com:cluster-001/data
```

The converse operation, to retrieve the remotely stored `example.txt` file and
re-copy it under his local home directory, would consist in the following
command.

```
scp -i ~/ssh_key steve@login.mat3ra.com:cluster-001/data/example.txt ~/
```
