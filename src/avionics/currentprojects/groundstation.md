# Ground Station Distributed System

The objective of this project is to improve the operational capacity of SRL during launches. The system is designed with the following architecture.

[block diagram here]

This project consists of the following subparts:

## Raspberry Pi Central Controller
The Raspberry Pi CM5 with a custom carrier board will be the central node in the system. It will interface with the peripherals (stepper controller PCB, radios) and recieve commands/forward downlinked data to and from the mission control application.

## Gimbal
Our avionics structures team has designed, manufactured, and constructed a 2-axis actuated gimbal. We will mount our antennas on it, using the Lighthouse angle of arrival functionality to automatically track the rocket. By tracking the rocket, we can use antennas with higher directionality and improve the link budget.

The gimbal stepper motors are controlled by the stepper controller PCB.


