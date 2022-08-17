# Design Process

This is the page which explains how avionics will organize its hardware projects. The objective of documenting this general process is to give students an idea of how electronics product development is often carried out by industry. Learning and becoming familiar with the design process is just as important as learning how to use Altium Designer to design a PCB.

Currently this is still considered a draft. Avionics members are encouraged to critically think about the existing design process and constantly consider ways to improve the effectiveness and robustness (if that's a word) of it. Reach out to a team lead if you think something may be improved and they will let you know if you should add it to the documentation.

## Phase 1: Requirements Breakdown

This beginning phase is to make sure everyone is on the same page of what the board should look like and do. This is an important step for any kind of project, even if you are not working on a team because you will come to realize that there is a TON of gray space. It's important to define the scope of the project before it begins.

This phase begins the new project design process. Everything from this phase should be able to be accomplished in one kick-off meeting with everyone involved with the project (team lead and any other oversight included).

In the meeting, the following should be decided/discussed and/or documented:

-What requirements of the avionics system will this board address? OR How does this board bring us closer to developing the final avionics system?

-What are the requirements of this board? Start with functional requirements and then break it down. Some things that might be easy to miss include where human interfaces shall be, what connector interfaces shall exist, what sensors should be on the board, where is power sourced from, how much power should the board produce, cost, how many to produce, etc. (NOTE: This is not at all an all-inclusive list, think as far as your imagination will allow of things you might be asking yourself later in the design process, this does get a lot easier with experience, and no student is perfect at this by any means)

## Phase 2: Preliminary Design Work

Here is the phase where you need to do the analysis that informs your design. Every single thing done in this step should be documented for later reference. Any MATLAB scripts or simulation files need to be stored. As of writing this, the google drive will the expiring soon, so we need to figure out a better way to do that... ask Andrew to update this once he figures that out (which should be soon).

Here is a list of things that might be a part of this step (currently all I can think of off of the top of my head, potentially a lot that can be added here):

-Napkin drawings of the board and block diagrams

-Power budget

-Link budget (this is RF territory, just throwing it out there)

-Circuit simulation (LT Spice)

-Interface control document

-Efficiency calculations (maybe best done as a MATLAB script)

## Phase 3: The Fun Part! Design Time!

Here is where you actually begin designing. Hopefully the prior steps have prepared you enough to tackle this comfortably... My one piece of advice is if it's your first time reading a datasheet or designing something then pick a big semiconductor manufacturer and read one of their datasheets back-to-back. It's really annoying, but just trust that I wish I had told myself that long ago. The small text and notes under tables are SO useful and can really be make-or-break in some cases. 

Because of the chip shortage, one more tip during this step is to start with all of the major ICs but don't even place them on schematics. Just pick them all out, make sure that all of the specs match (i.e. if you need all of your ICs on this board to be powered from 3.3V, then make sure that is true for all of the ICs you choose), that we can actually solder the package, that the part is going to work. Place all of the parts on a purchase order document and buy them. Often, you will be in the middle of a design and lose supply of a part, and then become stuck in a hell-loop of remaking all of your schematic symbols and footprints over and over again. It is honestly not worth stressing over 5 dollars of shipping. Make sure you update inventory as soon as you recieve the parts!

To add on a little more, the low priority parts (resistors, diodes, capacitors, etc.) should be chosen with a very common standard footprint and have huge in-stock amounts (hundreds of thousands preferred). This means that these parts will be unlikely to go out of stock, and if they do when it comes time to order them, you can just replace them with another part with the same exact footprint without having to change your design (make sure you update the BOM to match the new design item ID you are using though).

In broad strokes - and if may be worth breaking this process down further into seperate documents - the following should be done:

-As mentioned above, choose all major ICs and order them (do your due diligence, do not waste SRL money, you should write out justification for each part)

-Start making all schematic symbols and footprints. See if you can re-use footprints (or maybe even entire parts) from previous projects

-Create the structure of the PCB project, how will you organize your schematic sheets to make readability as easy as possible?

-Start and finish your schematic. Request review from the hardware team-lead and avionics lead

-Shape your PCB to the correct shape. Determine your layer stack-up. Place all components in such a way to minimize cross-talk, improve ease of routing, efficiently use space, make sure everything fits, isolate analog signals from digital signals, etc. Request review from hardware team-lead and avionics lead

-Route your PCB. Start with high-priority traces (i.e. high-speed signals). Request review from hardware team-lead and avionics lead

-Overall design review. Make sure the current design will address the requirements laid out in Phase 1.

-Bill of materials creation (BOM), and order the rest of the parts, and update inventory

## Phase 4: The Bitter-Sweet Part! Board Bring-Up!

Good work getting to this phase. This is where you solder everything together and get it to actually work. The soldering part is pretty sweet. It's a lot of fun to see the project you've been working on come to life. The bitter part is when you have to debug the board if there are any issues... if any issues do arise, it may potentially takes hours upon hours to figure out where the issue really lies. 

In another set of broad strokes...

-Make sure inventory is fully updated

-Find a time when the school lab is open and at least one other person on this project is available to help board assembly. If it's your first time, then ask the hardware team-lead to also help mentor.

-First solder on the surface mount parts using the reflow oven then hand-solder everything else. Update inventory as you go along soldering components on. This is why you want two people. One will solder and place components, the other will be on the computer telling the first person the design item ID and reference designator to place the part on and also updating inventory. It is encouraged that you switch-off to make sure that everyone gets the full experience. It's not extremely often that we are given the opportunity to actually get hands-on experience when it takes so long to develop our boards.

-Check solder joints using a microscope

-Check continuity on all power rails. Also check to make sure there are no shorts from a power rail to ground (that will ruin the board and potentially all the components as well if not caught at this stage)

-Probably at a later date, upload software and do a functional test. At this point, you should re-visit the requirements and validate that your entire project has met all the requirements listed. You're in big trouble if some of the requirements haven't (a costly mistake, but we will forgive you)