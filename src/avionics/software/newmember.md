# New Member Guide

## Table of contents
1. [Background](#background-requirements)
2. [Pre-Install Prep](#pre-install-setup)
    - [Required Software](#software-requirements)
    - [Python install](#python-venv)
    - [Github setup](#github-setup)
3. [Installing FPrime](#fprime-install)
3. [Learning FPrime](#learning-fprime)


## Background Information

For software development we are using the FPrime framework (sometimes written as F') for C++ developed by JPL. In order to develop software you must first understand the basics of C++ as the more advaced concepts can be learened as you work through the tutorial. If you have completed CSCI1300(or equivalent) and CSCI2270(or activly taking 2270) than you will learn all the basics you need in class. If you have not completed 2270 [this video](https://www.youtube.com/watch?v=5UNuR7_hot8) is recommended for learning all of the basics. 

Windows users will have a virtualbox image provided by the Software Lead(or Avionics Lead). It will include all of the needed software, and users can skip to the [Github Setup](#github-setup) steps. To use the image follow the installation section of [this guide](http://download.virtualbox.org/virtualbox/UserManual.pdf) to install virtualbox. 

This guide will use macOS as an example, but the commands in linux will be the same unless otherwise specified.


## Pre-Install Setup

### Software Requirements
1. Unix based OS (macOS or Linux)
    
    - Windows can use wsl with a debian based image, or a virtual machine
    - See Avionics lead or Software lead for a copy of the vm image

2. git
    - [Here](https://git-scm.com/docs/gittutorial) is a good tutorial for git

3. CMake 3.16 or higher
4. GCC or Clang
5. Python 3.7+ with pip
6. Vim
    - In depth knowledge is not really need, just understand how to edit a few lines and save
    - [Here](https://www.youtube.com/watch?v=RZ4p-saaQkc) is a good vim tutorial
7. VSCode
    - While another editor could be used, most developers use VSCode and a list of recomended plugins will be provided

### Software install

#### Needed software
Ensure all software listed above is installed with your package manager of choice. On macOS brew is recomended.

```bash
brew install CMake gcc git python@3.10 vim
```

#### **Python venv**

If using a debian based image it is possible not all needed python packages are installed, fix this by installing them with
```shell
sudo apt install git cmake default-jre python3 python3-pip python3-venv
```

We can now begin the virtual enviroment creation


```shell
python3 -m pip install --user virtualenv
```

> A virtual enviroment (venv) allows for different packages to be installed at different versions within python and mitigate version conflict errors

We now pick a location to install the virtual enviroment, for the purposes of this guide we will use the `$HOME` directory as our root. If you would rather use another location feel free.

```bash
python3 -m venv $HOME/fprime-venv
source $HOME/fprime-venv/bin/activate
pip install -U setuptools setuptools_scm wheel pip
```

The first command creates the venv, the second command activates the venv, and the third command installs some needed packages.

To exit the virtual enviroment simply enter `deactivate` while the venv is active.


> Adding an alias to your shell profile can be useful to quickly activate the venv from any directory
> Using macOS and zsh as an example we can execute the following commands to add it as an alias
> ```sh
> cd $HOME
> vim .zshrc
>```
> linux users will need to modifly the file `~/.bashrc` 
> Add the following line at the end of the file and save
> ```sh
> alias fpvenv="source $HOME/fprime-venv/bin/activate"
>```
> Ensure to update your terminal with `source ~/.zshrc`
> Now typing fpvenv will activate your virtual enviroment



#### **Github Setup**

We recomend linking your student email to Github for the student pro benefits [Found Here](https://education.github.com/discount_requests/pack_application).


_If you already have a working git and github with 2FA setup skip to [**FPrime Install**](#fprime-install)_

##### Generating SSH keys
We first generate a ssh key with the line below
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
When you're prompted to "Enter a file in which to save the key", you can press Enter to accept the default file location. When prompted for a passphrase you can press Enter to skip.

Ensure the ssh agent is running

```bash
eval "$(ssh-agent -s)"
```

For macOS verify the `~/.ssh/config` file exists
> ```bash
> open ~/.ssh/config
> ```
> and add this information the the config file.
> ```text
> Host *.github.com
>   AddKeysToAgent yes
>   IdentityFile ~/.ssh/id_ed25519
>   IgnoreUnknown UseKeychain
> ```
> If the file does not exist create it with and then add the information
> ```bash
> touch ~/.ssh/config
> ```

For both macOS and Linux
```bash
ssh-add ~/.ssh/id_ed25519
```

##### Adding the SSH key to Github
copy the ssh key public information to your clipboard
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```
In Github go to `settings > Access> SSH and GPG Keys` and select new SSH key. Give it a meaningful title, ensure it is an authentication key, and paste your clipboard into the key box. Then press the `Add Key` button.

To verify that it has worked run and type `yes` when prompted
```bash
ssh -T git@github.com
```
You should see
```bash
> Hi USERNAME! You've successfully authenticated, but GitHub does not
> provide shell access.
```
> if this does not display check [here](https://docs.github.com/en/authentication/troubleshooting-ssh/error-agent-admitted-failure-to-sign)

#### **VSCode Setup**

I recomend installing the following plugins to your VSCode, along with connecting your github to VSCode for sync between devices.
- [C++ Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- [Better C++ Syntax](https://marketplace.visualstudio.com/items?itemName=jeff-hykin.better-cpp-syntax)
- [C++ extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack)
- [C++ Themes](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-themes)
- [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)
- [Doxygen Documentation Generator](https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen)
- [FPPTools](https://marketplace.visualstudio.com/items?itemName=unlv-team5.fpptools)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

For using VSCode in conjunection with F' the recomended way is opening the `srlFp` directory in VSCode, and `cd` your shell into the `srlFp/Ref` directory.
## **FPrime Install**

Note that all commands should be executed within the virtual enviroment created above
#### Clone the repo
In your prefered directory(`$HOME` or `Desktop` is recomended) clone the srl FPrime repo
```bash
git clone git@github.com:CU-SRL/srlFp.git
cd srlFp
pip install -r fprime/requirements.txt
```

#### Verify install

On the **tutorials branch** verify that the Ref deployment builds
```bash
cd Ref
fprime-util generate
fprime-util build
fprime-gds -g html
```
> use `git checkout <branch>` to switch branches


## Learning FPrime

Before begining the tutorials checkout a branch for your work from tutorials. There is no need to push this branch, this will just be for your personal use.
```bash
git fetch -a
git switch tutorials
git checkout -b <BRANCH NAME HERE>
```

You are able to now start on the **Getting Started Tutorial** found [here](https://nasa.github.io/fprime/v3.1.0/Tutorials/README.html).

There are a few extra terms that are common that should be highlighted:

- Drv: short for driver, contains a variety of different drivers including uart, i2c, and spi drivers for linux
- Fw: short for framework, provides a large number of useful data types and routines 
- Fpp: short for FPrimePrime, a modeling language to make F' development quicker and easier than before
- Svc: short for Service, provides useful runtime tools for fprime deployments
- Os: short for Operating System, provides the Operating System Abstraction Layer([OSAL](https://en.wikipedia.org/wiki/Operating_system_abstraction_layer)) for fprime


For working on the **Math Component Tutorial** found [Here](https://nasa.github.io/fprime/v3.1.0/Tutorials/MathComponent/Tutorial.html) I recomend focusing on following the steps given in in sections 1-4, then reading the goals in section 5 and attempting to impliment them without copying from the tutorial until needed.
