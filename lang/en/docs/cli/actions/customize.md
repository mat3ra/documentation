# Customize Shell Environment

The action of customizing the [shell environment](../environment.md#shell-type) from the default "bash" setting can in general be performed by running the `change_shell` command, together with the path to the shell executable present under the `/bin` system folder. 

## Change shell to ZSH

Here, we offer a specific example of the command necessary to change the shell from the default "bash" to the "zsh" option.

```
change_shell /bin/zsh
```

## Dot Files

There exist several hidden system configuration files, or "dot-files", within the [Login Home]({{ resources_url }}/infrastructure/login/directories/), such as the `.bashrc` and `.bash_profile` files. Caution is advised when modifying such files, since they can significantly affect the functionality of the shell environment. In case of uncertainty, we recommend the reader to consult relevant documentation manuals on the general Linux environment before implementing any change to these files.

!!!warning "NEVER remove the system content of the ".ssh" folder"
    We urge the user not to remove the default content of the files in the ".ssh" folder, since doing so can break the operations of the platform for the user. 

## Install a different version of python

It is sometimes necessary to use multiple versions or distributions of Python. The routines below demonstrate how to do it. We can also recommend using the `pyenv` [^1] tool, as an alternative.

### via PyEnv

1. Install `pyenv` versioning tool into the user home directory using `pyenv-installer` [^2]:

    ```bash
    curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
    ```

2. As the installation rountine directs, add the following likes to ~/.bashrc file:

    ```bash
    # Load pyenv automatically by adding
    # the following to ~/.bashrc:
    
    export PATH="/home/<REPLACE_WITH_YOUR_USERNAME>/.pyenv/bin:$PATH"
    eval "$(pyenv init -)"
    eval "$(pyenv virtualenv-init -)"
    ```

3. Now pyenv can be used to manage python versions all within the user home folder `~/.pyenv`. Below we install python 3.8.0, and then create and source a virtual environment with it, that can be further managed with `pip`, for example:

    ```bash
    pyenv install 3.5.0
    pyenv virtualenv 3.5.0 .venv-3.5.0
    source ~/.pyenv/versions/.venv-3.5.0/bin/activate
    pip install matplotlib
    ...
    # Deactivate the Virtual Environment when done
    deactivate
    ```

### python

Below is a quick tutorial on how to install python and pip in the userspace. This is helpful when prototyping and trying packages not yet supported system-wide.  

1. Install Python to local directory

    ```bash
    mkdir ~/python
    cd ~/python
    wget https://www.python.org/ftp/python/2.7.11/Python-2.7.11.tgz
    tar zxfv Python-2.7.11.tgz
    find ~/python -type d | xargs chmod 0755
    cd Python-2.7.11
    ```

2. Compile the source following the official guidelines

    ```bash
    ./configure --prefix=$HOME/python
    make && make install
    ```

    Notice the prefix option, it is mandatory for this to work. The value of prefix option is to specify where to put the related output of make command, by default it is in the /usr/local/ but we use our home directory instead.

3. Next, update the environment variables to use our new Python. Edit ~/.bashrc_profile and add the following lines:

    ```bash
    export PATH=$HOME/python/Python-2.7.11/:$PATH
    export PYTHONPATH=$HOME/python/Python-2.7.11
    ```

4. Refresh the current session by running the command:

    ```bash
    source ~/.bashrc_profile
    ```

    One might need to logout and login again for the environment to update properly. 
    
5. At this point, one should be able to see the new python. To check, run this command:

    ```bash
    python --version
    ```

### pip

Pip is a python package manager, as explained in the references [here](create-python-env.md#links). Below are directives that allow for its installation to be used with the newly installed python above.

1. After installing Python locally, install pip.

    ```bash
    wget --no-check-certificate https://bootstrap.pypa.io/get-pip.py -O - | python - --user
    ```

2. After finishing the installation, update PATH variable. Open ~/.bashrc_profile and add the following line:

    ```bash
    export PATH=$HOME/.local/bin:$PATH
    ```

3. Reload the session by the command source ~/.bashrc_profile or logout and login again. Then, check if pip command is available:

    ```bash
    which pip
    ```

It should show a path pointing to your local directory: `~/.local/bin`


<!-- TODO by MM: implement functionality and uncomment the below

There exist several "standard" dot-files within the [Login Home]({{ resources_url }}/infrastructure/login/directories/), including one for each shell type that we support, that represent symbolic links to read-only files controlled by the platform administrator. Thus, the user should **NEVER** attempt to modify these files. Examples include the .bash_profile, .bashrc, .cshrc, .kshrc, .login, .profile, or .zshrc files. 

Instead, the user should put his/her customizations to the shell environment into the corresponding files that have an ".ext" suffix, such as .bashrc.ext, .cshrc.ext, .kshrc.ext, .login.ext, .profile.ext, and .zshrc.ext (depending on the choice of shell).

!!!warning "Feature not implemented yet"
    The above-mentioned customizations via dot files with ".ext" suffix are not supported on our platform yet.
-->

## Links

[^1]: [PyEnv: Simple Python Version Management, Github Source](https://github.com/pyenv/pyenv#uninstalling-python-versions)
[^2]: [PyEnv Installer](https://github.com/pyenv/pyenv-installer#install)
