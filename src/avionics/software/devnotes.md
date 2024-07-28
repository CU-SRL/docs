# Developing Fprime

\[TO BE UPDATED\]

This page will act as a top-down walkthrough of what the deployment development process looks like. New deployments can be created for any intended purpose, however for the time-being we make our changes in Ref for simplicity, as much of the setup is already done. Within the deployment, there are a variety of components, connected with a topology. When adding a new component (say, for a sensor), we need to create a directory within the deployment:


# Adding a new sensor

The process for adding a new sensor can be broken down as follows

1. Create sensor dir with fpp, CMake, cpp, and hpp files
2. Add it to the deployment CMake file, and fill out component CMake file
3. Run `touch <componentname>ComponentImpl.cpp` and `touch <componentname>ComponentImpl.hpp`. This creates "invisible" versions of the file, so that they exist. Trying to implement without these files touched could cause issues.
4. After fully filling out the fpp, `fprime-util impl` the component (it should build without error at this point)
   - The Tlm is recomended to run with `on change` [link](https://fprime-community.github.io/fpp/fpp-users-guide.html#Defining-Components_Telemetry_Update-Frequency)
5. This should have produced cpp and hpp file templates. Just rename these to the ComponentImpl.cpp and hpp files you had previously created.
6. Include the component in `Top/Components.hpp` along with the extern reference
7. Include the compeonet in `Top/RefTopologyAc.hpp`
8. Add the instance to `Top/instances.fpp`
9. Add the instance and connections to `Top/topology.fpp`
10. Fill out and complete the cpp and hpp files
11. Comment the functionality, then make sure it builds
12. Ensure the pins are configured correctly with `config-pin`

# Configuring Drivers

When implementing drivers, be sure to do the following:

1. Look into the both the driver function handlers, as well as the driver ports
2. In the component fpp file, include the corresponding driver ports, and add any relevant events if desired
3. In `topology.fpp`, include the instance of the driver, as well as add the connections for whichever devices are using it
4. In `instances.fpp`, again create the instance of the driver, but also add any and all specifications for initialization such as base id, type, and location (remember to leave room for offset for ids)
    - In this file we also chose to make our open calls for said driver,using the following syntax to insert cpp code into our fpp file:
    
        `phase Fpp.ToCpp.Phases.configComponents """ {insert code here} """`
    - Look [here](https://fprime-community.github.io/fpp/fpp-users-guide.html#Defining-Component-Instances_Init-Specifiers) for more information on every phase, and their intended uses
5. In `Component.hpp`, include componentimpl header file for the driver and add the driver extern
6. In `Topology.cpp`, add the component impl, initialize the component, and do any necessary checks for the previously metioned open call

# BBB Notes
The bashrc used:
```bash
alias route="sudo route add default g2 192.168.7.1"
alias runDep"chmod 777 ~/Ref; ./Ref -1 192.168.7.1 -p 50000"
```
> make sure pins are configured properly with config-pin \<pin number> \<pin mode>

check i2c device connections with 
```bash
i2c-detect -y -r <bus-number>
```

# Cross-Compilation
The bbb toolchain is now missing from the dev branches, if you are using the Deb 10 VM provided by avionics add the following to `srlFp/cmake/toolchain/bbb.cmake`

```cmake
set(CMAKE_SYSTEM_NAME           Linux)
SET(CMAKE_SYSTEM_VERSION        1)
SET(CMAKE_SYSTEM_PROCESSOR      arm)

set(CMAKE_C_COMPILER "/opt/gcc-arm-linux/bin/arm-linux-gnueabihf-gcc")
set(CMAKE_CXX_COMPILER "/opt/gcc-arm-linux/bin/arm-linux-gnueabihf-g++")

set(CMAKE_FIND_ROOT_PATH  "/opt/gcc-arm-linux/arm-linux-gnueabihf")

set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)
```
> assumes the installed binutils are found in /opt but can be installed anywhere as long as the path is adjusted

If you are interested in using Clang, look at [this](https://stackoverflow.com/questions/7031126/switching-between-gcc-and-clang-llvm-using-cmake). Currently we use gcc and the arm binutils to cross-compile but are interested in eventually switichng to clang for both performance and convenience.

# Documentation
We have a history of poor documentation in SRL, and as developers in general. We are solving that with 2 exersices: 1. Suggesting that people comment their code using the doxygen style, using plugins and 2. Realizing that FPrime is complex enough that trying to remember why you did something is hard.

Our standard style for funciton comments uses the `JAVADOC`/`C-STYLE` as shown here with a simple addition function:
```c++
/**
* \brief (Short description here)
* (Longer in depth description here)
* 
* \param x (what is this input)
* \param y (what is this input)
* \return (what is the return)
*/ 
int function(int x, int y){
        int temp; /*  What does this member var do   */
        tmp = x+y
        return tmp;
}
```

It is also important to use annotations in the fpp code in order for the autocoder to create comments for you, see [here](https://fprime-community.github.io/fpp/fpp-users-guide.html#Writing-Comments-and-Annotations) for more information.

When merged into main, doxygen automatically runs and executes on the documentation branch.

## Buffers

An important aspect to note about the linux communication drivers provided by Fprime is that they take Fprime Buffers as inputs, as opposed to standard buffers made in C. Using Fprime Buffers is a three step process: allocating out the required space, serializing it with the relevant data, then deallocating said memory. A more in depth explanation on this process can be found  [here](https://nasa.github.io/fprime/UsersGuide/best/dynamic-memory.html).


## Toplogies

Depending on how old the documentation you are looking at, a topology may be using direct graph specifiers. For most connections however (in the `topology.fpp`), you can use pattern graph specifiers. This will make your life a whole lot easier.

## Running the Groundstation on Windows

If you are trying to connect to the beaglebone and run the groundstation on your local machine, and then collect data, you will need to do a couple of things. Go to Windows Defender Firewall, then advanced settings, adn from there Inbound Rules. Select the four rules that contain

## Nice aliases to have

There are certain aliases that are nice to have that make quality life a lot better in terms of running the avionics:

For all aliases, these are just example paths, use whatever works best for you.

alias fprime="source ~/fprime-venv/bin/activate"
alias bbbconnect="ssh debian@192.168.7.2"
alias sendover="scp ~/SRL/RefTopologyAppDictionary.xml debian@192.168.7.2:~/deployment/dict; scp $HOME/SRL/Ref debian@192.168.7.2:~/deployment/bin;"
alias runGDS="fprime-gds -n --dictionary ~/SRL/RefTopologyAppDictionary.xml"
