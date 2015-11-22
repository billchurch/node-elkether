## Welcome
This project is an attempt to create a node.js application which emulates the functionality of the [Elk M1EXP Ethernet Expander](http://www.elkproducts.com/product-catalog/elk-m1xep-m1-ethernet-interface) for the Elk M1 series of alarm panels. 

![No Elk M1EXP](http://billchurch.github.io/images/M1XEP.png)

## Why?
Well, for one the M1EXP is pretty long in the tooth. It's also fairly expensive for what it is. Devices for a fraction of the cost can do what it does, and more which is my main purpose for replacing it.

![M1EXP Port Scan](http://billchurch.github.io/images/m1expscan.png)


Another example, what the hell is tcp/26? Is it really rsftp? What's that thing doing? And tcp/21, come on... I also hate how easily identifiable it is... But hey, I'm getting ready to put some web services and all on it so, you know, I guess I can't really comment on that too much. In any case, I want more control and maybe you do too.


## Disclaimer
By using any code from this project you are doing so at your own risk and understand there exists the potential where product failure could lead to injury of persons, loss of life, or catastrophic property damage.

This project is not meant to be a turn-key solution and any support is considered best-effort.

It also bears mentioning that UL Certification includes almost every aspect of the alarm panel, the device communicating to the central office (M1EXP for instance) and any enclosures you're using. Most people use larger and upgraded enclosures which also invalidate the UL Certification. Just something to think about when insurance claims come up and the like.

The intention of this project is to augment home automation and entertainment systems and not to provide any alarm monitoring or status updates to a remote central office.

## Goals

### Short Term
* Emulate "Non-Secure Port" functionality (tcp/2101)
* Emulate "Secure Port" functionality (tcp/2601) tls1
* Emulate web access
** instead of a Java application use standards based HTML over HTTPS.
* Capable of running on a Raspberry Pi or equivalent (any model)

### Long Term
* Extend to provide a simple REST API interface
* Configurable ciphers
* Enhanced access control lists
* Client Certificate Authentication (why not)

## Project Status
If you're reading this, I just set the site up, nothing's been done except for experimenting with "socat".

## General Architecture
Intended to run on a small, lower power device like a Raspberry Pi. At this point the overall software architecture will consist of some web services and a web socket which interfaces the actual serial port. All communications from clients will ultimately converge on the web socket with the intent that this will help multiplex the serial port communication to multiple listeners, transmitters, subscribers, what have you. This is considered to be a bus topology everyone hears and sees everything. 

There are certain events, as when [ElkRP2](http://www.elkproducts.com/product-catalog/elkrp2-remote-programming-software) connects to program the panel, which must allow for a dedicated session. We'll want to figure out the best way to handle these lock events and ensure compatibility with ElkRP2.

### Software Stack
Mirroring the @lowpowerlab's approach to his Home Automation Gateway
* nginx 1.8
* Node.js
 * Socket.IO
 * node-serialport
* php? Maybe, not sure yet. I don't think we'll need it but it'll be there just in case
* some yet to be determined framework to make things pretty (low priority)
