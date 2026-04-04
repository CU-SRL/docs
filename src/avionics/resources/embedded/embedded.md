# Resources for Embedded Systems

Topics:
- What is an embedded system?
- Application architecture
- Communication protocols
- Polling, Interrupts, and DMA
- Distributed embedded systems

## What is an Embedded System?

Everyone interacts with embedded systems countless times every single day. Anything from your refrigerator to your car can be an embedded system. The line between what is and isn't an embedded system is blurry, but generally the idea is that an embedded system has constrained resources, low(ish) size, weight, and power (SWaP), and is designed for a set of defined applications. Think garage door opener or microwave as opposed to a laptop. 

Most of what avionics does is build and test various forms of embedded systems. Our flight computer, gimbal controller, and all of our radios qualify. 

#### Typical Architecture

A typical embedded system consists of a central MCU (Microcontroller Unit), which communicates with peripherals (electronic devices like sensors, level shifters, drivers, or other embedded systems). Below is an image with some example peripherals.

<img src="Screenshot 2026-04-03 202100.png" width="500">
