# SRL Avionics Common Practices

SRL Avionics tends to use similar components and frameworks across lots of different projects. This helps build expertise and decrease development/debug time, allowing us to build our skills and projects faster. 

## Microcontrollers:
SRL Avionics loves the STM32 line of microcontrollers. With a large selection of different specifications, there is typically an STM that is applicable for any project. It also has great documentation and wide support across software frameworks, as well as a useful HAL (Hardware Abstraction Layer) that can be used in Zephyr in addition to higher level APIs.

Typically, for "smarter" applications requiring complex matrix operations, we use an MCU in the STM32H7 line. These can have up to 208 pins and are used on the Liquids Data Acquisition System (DAQ). For "dumber" applications that simply control a peripheral we use an MCU from the STM32F4 line. These can have as low as 32 pins and are used on applications such as a stepper controller or a radio board. 

## Embedded Frameworks
We typically use the Zephyr RTOS for almost every project. Its API is extremely well documented, and it has prewritten drivers for a wide variety of communication protocols, sensors, and various other peripherals. This makes it much more beginner friendly, and speeds up the pace of development significantly. It can be a bit finicky when it comes to hardware abstraction in the devicetree, but documentation can usually straighten things out. In addition, our resources document common issues we've faced in the past, so we can move past many problems quickly. All of our software-based leads have at least a year of experience with Zephyr, and can help you debug as well!

## Programming Languages
Avionics almost always uses C or C++ for embedded applications. It is well documented and is very beginner friendly, allowing new members to jump in quickly. Python is also occasionally used for higher-level programming on a Raspberry Pi or computer, and MATLAB is typically only used for post-flight data processing.

## PCB Design Software
Electrical engineers in SRL avionics use Altium, and do version control using GitHub repositories inside the CU SRL organization. Altium is widely used in industry and is a very valuable skill to have on your resume. In addition, it is well documented with lots of informative tutorials on YouTube. CU Boulder provides a free student license, and we believe that everyone interested in PCB design should take advantage of this to build skills before entering industry.

## Computer-Aided Design (CAD)
Across all subteams (not just avionics), SRL uses a shared Fusion360 drive. Any CAD relating to a core project (Spaceshot, Liquids Engines/Vehicles, etc.) must eventually end up in the shared F360 drive to be saved for posterity. DM the current team captain to be added.

## Communication Protocol
To communicate between nodes in a distributed embedded system such as SRL's ground station or avionics bay, we typically use RS422 with RJ45 (Ethernet) connectors. It is easy to buy shielded harnesses with these connectors which is useful when routing near high-power RF systems. See more details on RS422 on the (communication protocols)[../embedded/comm_protocols.md] page.