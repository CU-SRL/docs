# Sensor Apps in Development

Currently we have soldered two components onto breadboards for the sake of easy testing via jumper wires hooked up to a rasberry pi. These sensors are the MPL3115A2 and the MCP9808, whose datasheets are listed below.

The topology will consist of a single deployment with all sensor apps containted within the deployment. Work for sensors specifically will be done in the sensorDev branch, which when finalized will be merged with the dev branch. After testing is completed on the dev branch and we feel confident in a final version of our code, it can be merged into main. Be careful when merging to main, as these should be finalized versions of our programs and will autogenerate documentation. The code that goes here should also be properly commented following C-style guidelines.

## Project Assignments

The assignment process will entail the creation of a GitHub issue that will be assigned to an individual/group of individuals. They will then create a branch from the development that will contain all the code needed. Upon completion of the work a pr will be opened and meeting with software lead to review code.

## Datasheets

Link to hardware page for the future sensors, picked by the hardware team:
[testing board links](https://cu-srl.github.io/docs/avionics/hardware/currentprojects/testingboard/testingboard.html)

Link to the datasheets for the current soldered sensors:
- [MPL3115A2](https://www.nxp.com/docs/en/data-sheet/MPL3115A2.pdf)
- [MCP9808](https://ww1.microchip.com/downloads/en/DeviceDoc/25095A.pdf)
