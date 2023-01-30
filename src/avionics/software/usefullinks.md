# Development Notes

Collection of links to useful resources

# F prime Documentation

[Our own documentation](https://github.com/CU-SRL/srlFp/blob/documentation/docs/UsersGuide/api/c%2B%2B/latex/refman.pdf)

[JPL's documentation v3.1.0](https://nasa.github.io/fprime/v3.1.0/UsersGuide/guide.html)

Both of these links are useful in learning Fprime, as the SrlFp repo grows more sensor documentation will be present for review. 

# Fprimeprime User's Guide

[F Prime Prime Wiki](https://fprime-community.github.io/fpp/fpp-users-guide.html)

The Fpp wiki provieds a very well documented resource for learning, modifying, and developing fpp files. We use fpp to automate most of the boiler plate required for F Prime code to run.

Notes for getting familiar with Fpp (some subsections to be particularly aware of) :
 - [Formatting and setting up topologies](https://fprime-community.github.io/fpp/fpp-users-guide.html#Defining-Topologies_Connection-Graphs)


# Fixed point to Floating point conversions

[Fixed to Float](https://embeddedartistry.com/blog/2018/07/12/simple-fixed-point-conversion-in-c/)

When dealing with sensors, we commonly see output in fixed point format as opposed to the more common computing floating point format. To convert between fixed point(Also called Q format) the link above provides plenty of background on the topic.

# Common Issues Faced

FPrime GDS - Version Problems
 - First purge, generate, and build. You should see a build-artifacts folder: this indicates that it built correctly. Go into this folder:
    - Ref/build-artifacts/Linux/dict
    - The dictionary file will be the xml file in there. At the top, there is a framework_version, set that version to 3.1.0
    - [Relevant github issue](https://github.com/nasa/fprime/issues/1456)

# Beaglebone Black Setup (Debian OS)
- When compiling and building on your local machine, it is possible that you have a different compiler version being used compared to that used by the bbb.
    - The beaglebone black runs Debian 10, and by default uses GLIBC version 2.28
    - To check this on any machine, run the following command:

            ldd --version

    - The compiler version of the machine that the code is compiled on needs to match the version that the executable is being run on. Currently we have a virtual machine set up with the correct compiler version being run, from which we can send over the generated binary executable
    - It is bad practice and potentially dangerous to downgrade the compiler version being used on your machine, so if you for example run GLIBC version 2.35, don't try to change what version your computer uses. Your operating system is meant to run on the compiler version that it comes with, so don't try to change it. That is why we use a VM to compile with the correct version.
    - To get the executable onto the beaglebone black, use scp:

            scp {RELEVANT DIR}/Ref debian@192.168.7.2:~
    
    - From there you need to make sure you give it the appropriate permissions to be able to run it:

            sudo chmod +x Ref
- Setting up said VM:
    - After cloning the repo, installing the tools, then building on the machine, run the following to get the proper tools installed:

            sudo apt install crossbuild-essential-armhf

    - The beagleboneblack toolchain on the github has the correct path of CMAKE already set up, so use that toolchain to generate and build


- We did try to upgrade the GLIBC version on the beaglebone, which involved several of the following tools. We never finished this process however because we got a VM working sooner. Therefore it isn't necessary, but potentially worth finishing in the future:
    - [Installing a newer GLIBC version](https://stackoverflow.com/questions/10412684/how-to-compile-my-own-glibc-c-standard-library-from-source-and-use-it)
        - Install bison
        - [Installing gawk](https://installati.one/debian/10/gawk/)
        - [If you run the bash version problem with the configure.ac file, this could be a potential fix](https://github.com/pfalcon/esp-open-sdk/issues/365)


# Internet access with host for bbb

- Checkout this [walkthrough](internet-sharaing-usb.md)
