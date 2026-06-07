# DAQ for Liquids' DIABLO Liquid Engine Test Stand

In order to test liquids' new LOX engines Taipan and Scorpion, they built a new test stand called Diablo. Fedor Bezzubtsev created a number of PCBs for the data acquisition system, and Alex Reich wrote the embedded software.

This page will focus largely on the high level architecture of the DAQ and then go into the details of the current software system.

## High Level Architecture

The DAQ consists of a main controller board with an STM32H743BIT6 MCU, which then connects to numerous "small module" boards which contain amplifiers and other analog circuitry, as well as motor drivers and relays. This central STM is responsible for aggregating the data to send it back to the LabView control, as well as receiving commands from LabView and acting upon them.

This makes the job of the software relatively simple:
1. Read ADCs when requested
2. Read digital inputs when requested
3. Set digital outputs when requested
4. Actuate stepper motors as dictated by LabView commands

The system is designed to be as "dumb" as possible. The idea is that all of the data interpretation happens in the LabView (converting ADC values to pressures, etc.), which allows the DAQ itself to be agnostic and support test stand upgrades in the future. 

**NOTE: THE SOFTWARE IS NOT FULLY COMPLETE.** 
- From time to time you will probably find very critical errors in some of it-- I didn't have time to flesh everything out before I left Colorado. Feel free to change whatever you need to in order to make it work.

The software itself has the following architecture:
1. `main.c` starts and spawns three threads: a TCP thread, a data aggregation thread, and a stepper control thread
2. The TCP thread opens a connection.
3. Based on messages that come through the TCP connection, the system samples data or moves the steppers

## Software Implementation Details

### Ethernet connection

The ethernet thread 