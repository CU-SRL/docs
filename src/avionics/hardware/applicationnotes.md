# Development Resources

Here is a list of useful resources that the EE team has used in the past to aid in their development. They are organized by topic.

## Altium Designer Guides
- [Eric Bogatin's Online Altium Course](https://sites.google.com/colorado.edu/practicalpcbdesignmanufacture/erics-altium-workshop)

This guide is the one that Andrew Lee vouches for. This is how he began his journey learning about electronics design. Eric Bogatin is a professor at CU who is incredibly knowledgeable and famous for his publishings on signal integrity and high speed digital design among many other topics. Altium Designer has had him as a keynote speaker at several of their AltiumLive events. With diligent work, this course will probably take around 2 weeks to complete (or beat Andrew and do it faster, I bet you won't). 


## Altium Education Student License
- [Link For Student License](https://www.altium.com/education/student-licenses)

Altium is a VERY expensive software for companies to use. Luckily, we get to use this industry standard ECAD tool as students for free.

## Understanding the I2C Bus
- [I2C guide (TI)](https://www.ti.com/lit/an/slva704/slva704.pdf?ts=1652533258322&ref_url=https%253A%252F%252Fwww.ti.com%252Fproduct%252FTCA9555%253Futm_source%253Dgoogle%2526utm_medium%253Dcpc%2526utm_campaign%253Dasc-int-null-prodfolderdynamic-cpc-pf-google-wwe%2526utm_content%253Dprodfolddynamic%2526ds_k%253DDYNAMIC%2BSEARCH%2BADS%2526DCM%253Dyes%2526gclid%253DCj0KCQjwpv2TBhDoARIsALBnVnk8O5KMyhALKIDlnBGjJ7HfEqzObzi_JllaoqqcZwmt-ouwSHQ_jfIaAliSEALw_wcB%2526gclsrc%253Daw.ds#:~:text=Reading%20From%20a%20Slave%20On%20The%20I2C%20Bus&text=This%20is%20done%20by%20the,it%20wishes%20to%20read%20from.)

## Picking a GPS...
- [uBlox neo-6m question](https://portal.u-blox.com/s/question/0D52p00009NRvHoCAL/neo6mv2-as-rocket-tracker)
- [Correlator Notes](https://www.e-education.psu.edu/geog862/node/1756)

Documentation of how we are picking our GPS... so this [link](https://shop.bigredbee.com/blogs/news/high-altitude-gps-operation) shows some basic information on GPS. Main take-aways are that u-blox MAX gps's do implement stuff as AND logic (when you exceed 1000 knots (1150mph or 514m/s) AND 18km (altitude) then your GPS shuts down). Note that for a lot of GPS modules that are sold out there, it is implemented as OR logic (which won't work because then we won't be able to get GPS data any point above 18km and therefore we can't confirm if we made it to space or not). Another important thing to consider is that it seems that basically the industry standard is to limit GPS tracking to 50km altitude, not because of COCOM limits but just because companies feel like it lmao (which once again doesn't work for us, we need something that can record up to at the very least 110km or something). Therefore we probably need to come up with a seperate solution. Right now Parker Lamb is working on a GNSS-SDR receiver which would get around both of those limitations. **NOTE - This is ITAR restricted, no non-US-citizen may help him**. 

One other point of confusion is the specifics of COCOM limits... Andrew Lee will look at the official document (hopefully soon) and see if he can figure out what exactly are the limitations. He will add that to the documentation soon. Maybe we could ask a big company super-duper-nicely and promise to advertise their company without our club and as a student org to get them to adjust one of their gps modules so that it's no longer limited to 50km. Or we can ask them if they can offer any sort of mentorship on finding any other types of solutions that we can try to implement that allow us to bypass this all. 

On the possibility that the GNSS-SDR is later determined to not be an actual solution, maybe we look into using a GPS module like the one in this [link](https://www.highaltitudescience.com/products/eagle-flight-computer) and forget about this for a while. This is still cheaper than the Kate (COTS solution we are currently going to rely on for SpaceShot and Mamba) and therefore still leaves a ton of room for us to create a custom avionics unit that does everything else besides collecting GPS data. 

The last option that we currently can think of is getting as many data points before our GPS shuts off and relying completely on accelerometer data for our position after that, and then getting a position fix as we are coming down again and comparing both of those models.

## Picking a TVS Diode

The reason why you would use a TVS diode is to protect from ESD discharge. This is an important thing to protect from as it has destroyed some of our past custom designed boards. The basics of ESD can be read in this [ESD Basics](hardware_appnotesORresources/esdbasics.pdf)

A TVS Diode basically a zener diode with a slightly adjusted slope that is specially made to protect electronics systems.

The most important parameter of a TVS diode (transient voltage suppressor diode) is the **clamping** voltage AKA V_(clamp). This is the parameter which MUST be beneath the tolerable voltage of the system. This is the voltage that the TVS Diode will regulate to when exposed to a transient current waveform that is detailed by the datasheet usually.

V_(rwm) is the same thing as V_(reverse standoff), which is the same as the reverse working maximum voltage. This describes the voltage that you can sit at and you would only have a tiny amount of leakage current (on the order of singular nano-amps which is something that no one cares about). This is generally where you want the nominal voltage of your system to sit at.

V_(breakdown) or V_(br) is the voltage at which you get 1mA (at DC) of current through the diode, and it beings to shunt current through it (provide an almost zero resistance path for current to flow through it). Usually this ends up being way higher than what your system can tolerate. 

Note, be careful of the polarity of TVS diodes. Sometimes they work both directions, sometimes they don't.


Here's an application note from Texas Instruments which describe the most important things to consider when choosing a TVS diode. 
[TI AppNote TVS Diodes](hardware_appnotesORresources/tvsdiode.pdf)

## Logic Analyzer Guide
- [Saleae Logic Analyzer](http://downloads.saleae.com/Saleae+Users+Guide.pdf)

## Navigation Resources
- [General Navigation Information](https://arxiv.org/pdf/1711.02508.pdf)
- [Error In Navigation](https://www.cl.cam.ac.uk/techreports/UCAM-CL-TR-696.pdf)

These resources came from Lyon, the avionics lead of 2019, he gives the thumbs up of approval that these are good introductory ways to familiarize yourself with the basics of navigation.

## NASA Handbook on Sounding Rockets

Zoe Roy found this amazing resource for NASA's takes on how sounding rockets should be made.

- [NASA - Sounding Rockets](hardware_appnotesORresources/nasa_soundingrockets.pdf)