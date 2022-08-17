# Testing Board

The Testing Board project is a platform we design and test software and hardware on. It involves designing a custom Printed Circuit Board (PCB), writing software to work on sensors embedded on that PCB, and testing the system.

It is designed primarily as a proof-of-concept demo platform, and will not be implemented on the final rocket. That said, practices and designs implemented on the Testing Board will likely see usage on the final product. 

# Project Personnel

Project Lead: Nyah Baltazar and Parker Lamb

Project Reviewers: Andrew Lee

## Issue Tracker

The hardware team has project tracker set up here: [https://github.com/orgs/CU-SRL/projects/1](https://github.com/orgs/CU-SRL/projects/1)

This should be used when new tasks are created, in progress, or completed. 

## Datasheets

- [MCU (ARM Cortex M33)](https://www.renesas.com/us/en/document/dst/ra4m2-group-datasheet)
- [Accelerometer (ADXL343BCCZ-RL)](https://www.analog.com/media/en/technical-documentation/data-sheets/ADXL343.pdf)
- [Gyroscope (I3G4250D)](https://www.st.com/content/ccc/resource/technical/document/datasheet/e4/b1/d1/62/1a/e6/44/2f/DM00168691.pdf/files/DM00168691.pdf/jcr:content/translations/en.DM00168691.pdf)
- [Pressure sensor (DPS310XTSA1)](https://www.infineon.com/dgdl/Infineon-DPS310-DS-v01_00-EN.pdf?fileId=5546d462576f34750157750826c42242)
- [Magnetometer (MLX90395KGO-BBA-101-SP)](https://www.melexis.com/-/media/files/documents/datasheets/mlx90395-datasheet-melexis.pdf)
- [Temperature sensor (STTS75M2F)](https://www.st.com/content/ccc/resource/technical/document/datasheet/ea/c8/ee/86/71/81/4e/d0/CD00153513.pdf/files/CD00153513.pdf/jcr:content/translations/en.CD00153513.pdf)

## Sub-pages

- [Requirements](testingboardrequirements.md)
- [Microcontroller Notes](microcontroller.md)