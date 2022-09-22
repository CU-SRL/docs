# New Member On-Boarding Process Documentation

This is a journal for avionics team lead and hardware sub-team lead to document the on-boarding processes they have used in the past, noting what has gone right and what should be changed.

This year we will begin with a soldering workshop using cheap solderable breadboards, basic LEDs, resistors, and anything else the team needs to be soldered right now. The goal of the workshop is to get new members excited about creating something, introduce electronics concepts to people who have no experience, give them a framework for how they can imagine the design that they will be doing in Altium Designer.

The workshop will cover the topics of through-hole soldering, surface mount soldering, multimeter usage, circuit basics if there are new members not familiar with those concepts, explanation of what parts look like, what the parts do, what an IC is, maybe some wire stripping, splicing, etc.

Then Andrew Lee is planning on giving an introduction to Altium Designer lecture. The workshop happened on a friday evening, he will probably go over stuff on the following avionics full team on Sunday and let people get a list of things to get set up with Altium Designer on Saturday (or maybe do this on Friday if we end earlier than expected). He will record this video this time around, be in-person to help out.

Then after assessing the amount of new members, we will cater our projects to match that. If there are a lot, we may begin with development of break-out boards just to help build basic experience, or kick-off a new sensor board project with GPS module which will be seperate from the testing board. Update the documentation after the first avionics meeting with new members to develop that plan.

NOTE: There were 17 people who showed up out of the 29 that joined the slack channel. 7 out of 17ish people joined from talking at classes. In new member meeting during breakout, 3 new members went to hardware, 6 to software, 8 to RF

There were also 3 more people that joined later. 

Sub-team leads are doing new member on-boarding meetings this week (hardware on friday and software on saturday night). The attendance to each was:

- 5 new members showed up to the hardware meeting
- 10-ish new members showed up to the software meeting

The next avionics meeting, there was a lot less people who came, a lot of people sick and stuff. This was our first significant drop in retention. 

## Altium Designer Training, Andrew's Process

The agenda will roughly look like:
- 30 minutes of just talking and enjoying food
- I will go into a lecture-ish format where I'll speak on Altium, try to transmit as much information as possible, scatter breaks throughout for new members to ask questions, snack on any leftover pizza, do one-on-one set ups with Altium

There is a lot of information to cover so I'm afraid I will be doing a lot of talking, but at the same time I'll try as much as possible to be engaging and make sure that it doesn't actually feel as if you're being talked at for a straight 2.5 hours. The expectation is not that you will be masters at using Altium, but that I give you enough that you feel comfortable exploring Altium by yourselves, and you are not afraid of the tool, which has a decently difficult learning curve at first for sure. 

If you do intend on actually using Altium, bring a mouse with your laptop.

Make sure to record the following things to let people rewatch certain segments if they want.


So Andrew's more detailed agenda is going to be (I will explain the basic circuit concepts as I go through and get into some pretty nitty gritty stuff, but I'm always going to bring it back to the bigger picture. Note that in your minds make sure that the one thing that you can go back to when you get confused, is that you are designing a plastic piece that just has copper embedded into it. If you are ever feeling lost, raise your hand, I promise you that I can make things make sense for you.):
- Why PCBs? (Because they are really good at organizing your electronics projects, give an example (maybe some pictures of breadboards), able to reduce project costs, contain projects in extremely small form factor devices)
- Paint broad stokes of what you are doing in Altium Designer (the next point explain what I mean by this)
- Altium is so nice because it breaks design into phases: napkin drawing, schematic, then PCB design
    - Schematic: Useful abstraction from the real-world, right now we just want to care about if we connecting things where they are supposed to go, we don't have to care too much about parasitics, PCB design, etc.
    - PCB: We don't have to care about if we are connecting things properly, we already know from the schematic that this piece of exposed copper goes to that one. Things you do have to pay attention to: Which pins are higher priority, need isolation, need short return paths, etc. 
- Interjection: so now you know about why we do any of this at all... before getting into the more nitty gritty, know that this lecture is supposed to kind of take you through the entire cycle to be able to have a broad and full picture of how electronics development is done, you can break down the process yourselves once you kind of have that big picture, so you can mentally compartamentalize the details of electronics development into each of the design phases. 
- Note: I probably won't do too much in the PCB design phase because I find this part to be a little bit more intuitive for people, this is something that you can easily figure out yourself given online resources as long as you remember that all it is a maze game, how do you connect pathways so they don't cross on a single layer.
- Break down Altium Designer's project organization (the big project file, libraries, schematic file, pcb drawing file)
- Start on libraries 
    - Bring this back into the real world, make a drawing on the board (we are in phase of bringing a napkin drawing to real life, this is the first part of that phase)
- Then go into the schematic files
    - Ask someone why we do this part again, why it's so nice to be able to design in a schematic first
    - Go into a singular document to explain what's going on in a schematic
    - Explain the local elements of the schematic starting with netlabels and wires and ICs
    - Then go into the specifics of one IC, explain what's connected to it
    - Then explain the things that bring the schematic out of just a singular file
    - Then pull up the example of the I2C bus and redraw it onto a board
- Then go into the PCB design.
    - Explain what the colors are, layers, how to view things, how to select things, how to access properties, tie what they see back to why we need abstraction and tackle an altium project in phases.
- Bring back finally to the full picture again. Tie everything together.