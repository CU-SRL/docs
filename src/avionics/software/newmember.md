# New Member Guide

## Table of contents
1. [Background](#background-requirements)
2. [Installing FPrime](#installing-fprime)
2. [Learning FPrime](#learning-fprime)


## Background Information

For software development we are using the FPrime framework (sometimes written as F') for C++ developed by JPL. In order to develop software you must first understand the basics of C++ as the more advaced concepts can be learened as you work through the tutorial. If you have completed CSCI1300(or equivalent) and CSCI2270(or activly taking 2270) than you will learn all the basics you need in class. If you have not completed 2270 [this video](https://www.youtube.com/watch?v=5UNuR7_hot8) is recommended for learning all of the basics. 


## Installing FPrime

### Software Requirements
1. Unix based OS (macOS or Linux)
    
    - Windows can use wsl with a debian based image, or a virtual machine
    - (VM IMAGE LINK HERE)

2. git

    - [This](https://git-scm.com/docs/gittutorial) is a good tutorial for git

3. CMake 3.16 or higher
4. GCC or Clang
5. Python 3.7+ with pip

### Software install

**Python venv**
```bash
python3 -m pip install --user virtualenv
```
> A virtual enviroment (venv) allows for different packages to be installed at different versions within python and mitigate version conflict errors

We now pick a location to install the virtual enviroment, for the purposes of this guide we will use the `$HOME` directory as our root. If you would rather use another location feel free.

```bash
python3 -m venv $HOME/fprime-venv
source $Home/fprime-venv/bin/activate
pip install -U setuptools setuptools_scm wheel pip
```



## Learning FPrime
