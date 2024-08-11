# ARM Cortex M33 Notes

These are some basic notes on the ARM Cortex M33 device we're using. 

## Cortex Details

We're using the 48-pin QFN ARM Cortex M33 - the pinout is available on figure 1.6 on page 15 of the [datasheet](https://www.renesas.com/us/en/document/dst/ra4m2-group-datasheet).

## Port Reference

- **SPI_SSLAx**: Slave selection pins (x is 0-3)
- **SPI_MOSI_A**: Data output from master (Master Out Slave In)
- **SPI_MISO_A**: Data output from slave (Master In Slave Out)
- **SPI_RSPCK_A**: Clock pin
- **I2C_SDA2**: **S**erial **Da**ta line
- **I2C_SCL2**: **S**erial **Cl**ock line


## Our Setup

We have two SPI-connected devices (accelerometer and magnetometer), and 5 I2C-connected devices (accelerometer, pressure sensor, gyroscope, magnetometer and temp sensor). 

Since 2 of the 4 SPI chip select ports double as I2C inputs on the MCU, we only have 2 accessible SPI ports. 

## SPI Notes

Serial Peripheral Interface has four relevant ports: **SSLAx** (connected to chip selects), **MOSI** (data from master to slave), **MISO** (data from slave to master), and **RSPCK** (the clock). 

Since the MCU can only communicate with *one* SPI device at a time, it must "choose" this device. It does this by activating one of the SSLA (Slave Select Low Active), by settling the SSLA for that device to *active low*.

Therefore, you need a *single* SSLA pin *per SPI device*. The MCU has 4 SSLA pins, so it is able to support up to 4 SPI devices.