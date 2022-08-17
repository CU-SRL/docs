# Testing Board Requirements

## Sensor Requirements

The following sensors should exist on the board.

- Accelerometer
- Gyroscope
- Magnetometer
- Temperature sensor (digital)
- Thermistor
- Barometer

There shall be at least one sensor that is used for SPI AND I2C.

There shall be switches to change which microcontroller (BBB or Renesas) the sensors are isolated to.

Each sensor shall be broken out into their own respective connectors.

## Other ICs

There must be a CAN bus transceiver. This must be broken out into a connector. 

Microcontroller must be broken out for the programming connector.

Microcontroller should have two LEDs connected to two seperate GPIO pins.

## System Requirements

- All devices run on 3.3V
- Decoupling capacitor on all devices
- ESD protected
- 4 layer board (signal, ground, power, signal)
- All devices must have a datasheet
- Have an LED power indicator

## Purchasing Requirements

- Entire bill of materials should be under 50 dollars (not including PCB or shipping or 0603 components already in inventory)
