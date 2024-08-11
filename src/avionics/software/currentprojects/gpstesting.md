# GPS testing

{TO BE UPDATED}

We will be incorporating a GPS module into our avionics setup, with the main purpose of using the data we pull from it, as well as data we pull from an altimiter, and cross compare the two sources. It will be a means of verifying whether we are collecting reasonable and accurate data, especially the peak altitude that we hit.

With using a GPS, velocity and altitude lockouts will be very prevelant, and be a reason that it doesn't go onto the final rocket. However, for intermediate testing it will serve a very important role. We currently have gps code on the repo that is provided by JPL, that will run as a sanity-check of sorts. This will be a way for the software team to start cross-compilation and deploying code as soon as possible.

## Datasheet

Link to the datasheet of the gps we will be testing:
- [NEO-6 GPS module](https://content.u-blox.com/sites/default/files/products/documents/NEO-6_ProductSummary_%28GPS.G6-HW-09003%29.pdf)