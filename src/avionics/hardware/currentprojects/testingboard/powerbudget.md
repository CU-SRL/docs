# Power Budget For The Board

## Power Consumption of Testing Board

List of parts and their peak current consumption:
1. GPS Ublox_NEO-6 Module              - 67mA (47mA average during max performance acquisition mode)
2. STTS75M2F Temperature Sensor        - 100uA (75uA operational average, 1uA standby average)
3. DPS310XTSA1 Pressure Sensor         - 345uA (38uA operational average high precision, 1 temperature and 1 pressure reading per second)
4. MLX90395KGO-BBA-101-SP Magnetometer - 250mA start-up for less than 3uS (4mA operational average)
5. ADXL343BCCZ-RL Accelerometer (X2)   - (140uA typical) 
6. I3G4250D Gyroscope                  - (6.1mA typical)
7. LT3080EDD#TRPBF PMIC                - (17mA typical)

Adding all of the maximum values yields a maximum supply current consumption of 341mA.

Adding all of the average operational values yields average supply current of 75mA.

## Power Consumption of BBB

<img src="testingboardpics/BBBpower.PNG" width="650" height="400">

We are powering the device using 3.7V battery (not 5V test conditions) and not powering a display. This means we take (idle current with display - idle current without display = display current) and then take (loading a webpage AKA computational stuff IDK - display current = estimated average current consumption). This estimated average current consumption is 360mA. 

As part of a factor of safety because I don't know how current consumption changes as our voltage supply changes and they only provide data for 5V supply, I will do P = IV and solve the current consumption at 3.7V such that at 5V and 3.7V, the amount of power the BBB consumes is the same.

This is equal to 487mA.

## Available Power

A single one of our Li-ion batteries holds 1.25Ah of total supply current. 

## Factor of Safety

For a factor of safety, because of how expensive a launch is, let's call it 2.

Thus, the amount of total average current consumption is equal to (BBB power + Testing Board power = Total Power). This is 487mA + 75mA = 562mA. Multiply by 2 to account for our factor of safety and we get 1122mA. This means we get 1.25 / 1.122 = 1.1131 hours of system on-time off of one battery.

