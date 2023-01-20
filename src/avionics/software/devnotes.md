# Developing Fprime

This page will act as a top-down walkthrough of what the deployment development process looks like. New deployments can be created for any intended purpose, however for the time-being we make our changes in Ref for simplicity, as much of the setup is already done. Within the deployment, there are a variety of components, connected with a topology. When adding a new component (say, for a sensor), we need to create a directory within the deployment:



# Adding a new sensor

The process for adding a new sensor can be broken down as follows
1. Create sensor dir with fpp, CMake, cpp, and hpp files
2. Add it to the deployment CMake file, and fill out component CMake file
3. After fully filling out the fpp, `fprime-util impl` the component (it should build without error at this point)
4. Include the component in `Top/Components.hpp` along with the extern reference
5. Include the compeonet in `Top/RefTopologyAc.hpp`
6. Add the instance to `Top/instances.fpp`
7. Add the instance and connections to `Top/topology.fpp`
8. Fill out and complete the cpp and hpp files
9. Comment the functionality, then make sure it builds


# Configuring Drivers

When implementing drivers, be sure to do the following:
1. Look into the both the driver function handlers, as well as the driver ports
2. In the component fpp file, include the corresponding driver ports, and add any relevant events if desired
3. In `topology.fpp`, include the instance of the driver, as well as add the connections for whichever devices are using it
4. In `instances.fpp`, again create the instance of the driver, but also add any and all specifications for initialization such as base id, type, and location (remember to leave room for offset for ids)
    - In this file we also chose to make our open calls for said driver,using the following syntax to insert cpp code into our fpp file:
    
        `phase Fpp.ToCpp.Phases.configComponents "" {insert code here} ""`

5. In `Component.hpp`, include componentimpl header file for the driver and add the driver extern
6. In `Topology.cpp`, add the component impl, initialize the component, and do any necessary checks for the previously metioned open call

## Buffers

An important aspecto to note about the linux communication drivers provided by Fprime is that they take Fprime Buffers as inputs, as opposed to standard buffers made in C. Using Fprime Buffers is a three step process: allocating out the required space, serializing it with the relevant data, then deallocating said memory. A more in depth explanation on this process can be found  [here](https://nasa.github.io/fprime/UsersGuide/best/dynamic-memory.html).


## Toplogies

Depending on how old the documentation you are looking at, a topology may be using direct graph specifiers. For most connections however (in the `topology.fpp`), you can use pattern graph specifiers. This will make your life a whole lot easier.