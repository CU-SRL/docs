# Common PCB Standards for SRL Electronics

## General

Unless there is a specific engineering reason, components should only be placed on one side of the board. This makes assembly dramatically easier and faster, and removes risk of damaging components on the bottom during integration.

## Debug Capability

All PCBs that use an STM32 shall use the JLink connector, which connects to the SWD interface on the chip. This allows the software team to use the RTT viewer for debug messages, and in our experience is the easiest way to debug and flash the board.

In addition, each PCB should expose a 7-pin male header row which is connected to a debug UART. This is useful because it can be used as a sort of console which can be used to send commands to the board during testing. In addition, if the board uses RS422 (which most of ours do), the software team can test their parsers and command handlers before the rest of the distributed system is ready.

## Power Systems

All inputs to the board (RS422 ports, UART ports, analog/digital inputs, etc.) must have ESD protection diodes. 

## Silkscreen

All PCBs shall have the SRL logo placed somewhere on top layer silkscreen. Optionally, the designer can choose to include their own name and any other names of people who helped on the project on either side of the board.

