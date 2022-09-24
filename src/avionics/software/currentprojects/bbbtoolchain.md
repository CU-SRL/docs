# BeagleBone Black Toolchain

The beaglebone black toolchain will allow us to cross compile on our local machines or vm connections, allowing for execution of fprime on the beagle bone black. We currently have a raspberry pi toolchain already on the fprime repo, but in order to test on the hardware we develop, we will need to write a toolchain for the beaglebone black.

Immediate testing can be done on a raspberry pi, as the immediate priority is to write apps for reading data from sensors. Once we hit this development benchmark and know we are able to get some data, we can make the switch from the raspberry pi to beaglebone black.