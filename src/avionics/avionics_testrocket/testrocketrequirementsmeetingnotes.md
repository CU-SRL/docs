## This is a page to document how we made decisions on the avionics test rocket

# Reasoning Behind Not Using Smaller Rocket

It's cheaper to use a smaller rocket, but here is our engineering justification behind not going with that. The main goal of these flights is to test our avionics system to see if it will achieve proper performance on space shot. As far as basic functionality, we will do that on the ground, read data sheets carefully, and be thorough with documentation of our system. For survivability and reliability, this is where we need to test on a real rocket. The goal is to get our system to break. Our system is cheap enough to where we don’t have to care about testing slowly and upwards. We already know we have hardware that, if properly soldered together, can survive an obsidian level flight as well (our previous big rocket flight). Thus, I still believe the cheapest and most time efficient way to have accurate testing is to get our system to break as fast as possible and fix problems from there.

# List of considerations:

- Size
- Speed
- Parachute Mechanism?
- Heat
- Pressure Range
- g-loading
- ESD Requirements
- Timeline


# Discussion about considerations...

SIZE - 

For the size, we must be able to fit our entire avionics system, a back-up avionics system (the one that will deploy parachutes and stuff for the first few flights while we are testing basic functionality), and have space to route any thermistors, connectors, battteries, etc. 

The Beagle Bone Black (hereby referred to as BBB in this document) has dimensions of 3.4 inches x 2.15 inches x ~ 1 inch. We wanted a 5-inch diameter rocket at first, but soon realized that this would be extremely expensive in terms of the quality of the fuel, amount of fuel, and cost of rocket kit in order to make and launch this rocket (look to the next section about speed for more details on this). Thus, we are going to use a 4-inch diameter rocket which will be able to fit the BBB and BBB cape board (custom electronics attatched onto the BBB) extremely easily when they are positioned vertically. This should offer enough space for even testing more boards at once as well.

SPEED - 

For the speed, we want to reach the COCOM limit of the GPS module we are using (which is 1000 knots, or 514m/s, or 1150mph) in order to be able to see how the GPS will turn off, and then also see if it will turn back on again by the time we reach apogee. We originally wanted to see this rocket go above that speed for over 10 seconds. This is because typical GPS modules have a refresh rate of 1 second. We will have to look deeper into the datasheet of the GPS we currently have, determine if we need one with a higher refresh rate or not. The simulations of the 4-inch diameter rocket we are likely to choose results in a speed above 514m/s for only about 1.5 seconds. 

PARACHUTE MECHANISM - 

For the parachute, we won't be able to deploy them on our early on. For first few flights we want to record when we WOULD deploy our drogue and see how accurate we are with the actual deployment of the COTS solution. The avionics test rocket will have COTS avionics system as the main avionics system until we deem ourselves capable of doing it ourselves.

HEAT - 

We want to be able to survive the ambient heat. Not much to consider here for now, the avionics bay of our rocket likely won't get that hot. We will have temperature sensors to measure exactly how hot things are getting.

PRESSURE RANGE - 

We want to test what our pressure readings are at each height, while we are moving at the speed we are. This will offer very valuable information on how we can use pressure data readings in the future, and how accurate of a model they may provide of our trajectory if we don't adjust them for the speed we move at, or if we do, or if we need to make additional considerations when we reach speeds higher than mach 1. 

G-LOADING -

The g-loading requirement is still up for debate. Current rockets we are looking at will have a max-g of around 22g. Currently, we should figure out how we can coat the board, make sure thermals won't go crazy if we do that, and then also test another board inside the rocket that doesn't have coating and see how each performs (do parts fly off during flight).

ESD REQUIREMENTS - 

Previous flights have taught us that ESD protection is important for our system (duh, my bad for not implementing something like that on the last board - Andrew Lee), but because this is the first time we are designing something like this, we don't have a perfectly informed idea of the current counter-measures are going to work, and perfectly protect our electronics. Thus, we will first do testing on the ground of the effects of ESD on our system, and then we will decide whether we need some sort of grounding to the rocket frame or something like that.

TIMELINE - 

The intention of this rocket is to be able to fly and test custom avionics. It offers some type of real-situation testing without costing the club an arm and leg, and allows us to test more frequently, as opposed to waiting for the yearly big rocket launch. Currently, the team allocates around 1500 dollars a year for our avionics test rocket launches. Each reload of the motor costs around 400 dollars. The first rocket launch will ideally occur at the beginning of the spring semester of 2022. This will be for the absolute minimum viable product, with the core requirement that we are able to take and log data. Afterwards, we will do a lot of testing on the avionics electronics and software (plan in our testing process documentation), and then hopefully launch again with an avionics system we are confident of operating correctly by the end of the semester. 
