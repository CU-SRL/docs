# Development Notes

Collection of links to useful resources

# F prime Documentation

[Our own documentation](https://github.com/CU-SRL/srlFp/blob/documentation/docs/UsersGuide/api/c%2B%2B/latex/refman.pdf)

[JPL's documentation v3.1.0](https://nasa.github.io/fprime/v3.1.0/UsersGuide/guide.html)

Both of these links are useful in learning Fprime, as the SrlFp repo grows more sensor documentation will be present for review. 

# Fprimeprime User's Guide

[F Prime Prime Wiki](https://fprime-community.github.io/fpp/fpp-users-guide.html)

The Fpp wiki provieds a very well documented resource for learning, modifying, and developing fpp files. We use fpp to automate most of the boiler plate required for F Prime code to run.

Notes for getting familiar with Fpp (some subsections to be particularly aware of) :
 - [Formatting and setting up topologies](https://fprime-community.github.io/fpp/fpp-users-guide.html#Defining-Topologies_Connection-Graphs)


# Fixed point to Floating point conversions

[Fixed to Float](https://embeddedartistry.com/blog/2018/07/12/simple-fixed-point-conversion-in-c/)

When dealing with sensors, we commonly see output in fixed point format as opposed to the more common computing floating point format. To convert between fixed point(Also called Q format) the link above provides plenty of background on the topic.