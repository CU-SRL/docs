# SRL Avionics Project Development Cycle

The objective of this page is to provide a clear blueprint to guide the team through project conception to completion.

## Stage 1: Conception

In order for a project to be successful, it must have predefined
- **Motivation**
- **Scope**
- **Requirements**

Before a project can pass this stage, these 3 things MUST be fully defined and agreed upon by the project lead (and if relevant the team captains).

This stage is also where research on the current field is conducted. Questions that should be answered include
- Is there a COTS solution? 
    - If so, can we use it or modify it? 
    - If not, is it because it has yet to be done, or because there is a better way to achieve the stated goal?
- Have other student rocketry teams done something similar?
    - If so, what challenges did they face? How can we address those problems from the start to come up with a better solution?
    - If not, who could we reach out to for guidance? Are there professors at CU who would be willing to advise?
- Is the high-level system architecture/con-ops even feasible?
    - Are the interfaces possible/do they make sense?
    - Do the laws of physics allow the requirements to meet without compromising each other? (this is where link budget analysis, power budgets, weight restrictions, etc. come into play)
    - Does the club have the institutional knowledge to design, build, and test a system with the proposed complexity?
        - The simpler the project is, the higher the likelihood of completion.

This stage concludes with a Preliminary Design Review (PDR) (guidance on this presentation coming soon). Project leads should encourage other unrelated members of the club to participate, as multidisciplinary opinions can often catch overlooked design flaws.

This stage should last 1-2 months, depending on the complexity of the project. It is important to leave this stage relatively quickly both to capitalize on momentum and to get to the prototyping stage as quickly as possible.

## Stage 2: Design

Once the project has passed PDR, club resources can be devoted to the project's development. Work should start on any relevant software, PCBs, or structural hardware in parallel to avoid one specific area being in the critical path.
- Avoid the temptation to wait on software development for the PCB to be done. Often, the software development takes much longer than hardware design, so the project will suffer delays if software dev is not started immediately. This is why infrastructure such as unit testing and breakout boards for peripherals are extremely valuable.
- This is why defining strong requirements and interfaces in the coneception stage is important. A common source of truth will allow hardware and software teams to understand what the other needs to do, which will avoid blockages while one waits for the other.

As soon as the project enters the design phase, Responsible Engineers should be appointed to own every major aspect of the project (i.e. software, PCBs, antenna design, structures/mechanisms design). These REs will commit to seeing through their part of the project until completion, and will often be the members driving the project through the conception stage.
- Avoid giving an RE role to someone who has not demonstrated personal investment in the project. Ownership is something that must be intrinsically motivated, so everyone will have a better time if the person responsible for each subsystem comes to work sessions often and communicates well.

This stage is where rapid, cheap prototyping should occur. 3D printing and cheap parts off Amazon or McMaster are perfect for this, enabling the REs to determine the actual feasibility of the project as quickly as possible.

Before major POs are placed, an informal Design Review should be held. These are meetings where the RE can present their work on a subsystem to other members of the club (often not in the same subteam). These meetings help to iron out inconsistencies in the design and serve as a filter to make sure only the most robust ideas make it through to the end product.

This stage should culminate in a Critical Design Review (CDR). By the time of the CDR, the PCB must be fully designed, the software must be largely written, and the low level implementation details of the project must be resolved. **PCBs/expensive mechanical components should not be ordered before the project has passed a formal CDR.**

The CDR will be a formal presentation, detailing the low-level implementation details. The RE for each subsystem will present their portion, and feedback will be encouraged from the rest of the team. 

The design stage for a project should take about a semester. Be wary of extending past this timeline except in specific cases or extremely complex projects. Momentum is very difficult to carry between semesters, especially over the summer, and the effect of losing this momentum should not be underestimated.

## Stage 3: Assembly, Integration and Test

After CDR is passed, the project is fully greenlit. PCBs and components for any relevant structures should be ordered.
- Any large system shall have a BOM with a list of all parts for future reference, which will be a requirement before the avionics lead will place POs. 
- Any machined components shall have associated drawings in compliance with the drawing guidelines to help machinists
- Any PCB will also have an associated schematic and layout review before ordering

Components should all be ordered together, and marked off on the BOM when they are recieved. The team will assemble the project and begin to test the software. This stage is considered flight ready once testing concludes that the initial system requirements have been met.