# Temperature Sensor

On October 14th, 2019, I was out of town and the temperature in Denver dropped to the point an inch or two of snow fell. I arrived back home that evening and in the morning I went to work. Around 5pm, my neighbor texted me a photo of my backyard, saying "you have spouting water in your backyard.." Unbeknownst to me, the backflow preventer in my yard had frozen in the cold snap and when my sprinklers turned on that morning, it had cracked. Water had sprayed against the brick of the house for close to 8 hours and a lot of it ended up spilling into my finished basement.

Fast forward a few months and the basement is still not yet put back to its original state. I would very much like to avoid this from happening again, so I decided to do something about it. Using a Raspberry Pi Zero WH, a temperature sensor, and some code, I created a device that would notify me every so often if the temps are below the set threshold.

**Parts**:
* [Raspberry Pi Zero WH](https://www.amazon.com/Raspberry-Pi-Zero-WH-Pre-soldered/dp/B07B8MMD3V)
* [Raspberry Pi AC power supply](https://www.amazon.com/Raspberry-Power-Supply-Adapter-Charger/dp/B0719SX3GC/)
* [DS18B20 temperature sensor kit](https://www.amazon.com/gp/product/B07434MB77)
* [120pcs Multicolored Dupont Wire 40pin](https://www.amazon.com/gp/product/B01EV70C78/)
* [Mini HDMI to HDMI adapter](https://www.amazon.com/gp/product/B01HQ2H6OW)
* [Micro USB to USB adapter](https://www.amazon.com/gp/product/B00N9S9Z0G/)
* USB keyboard w/ hub
* USB mouse
* HDMI-capable monitor

**Resources**:
* [Install OS w/ Etcher](https://www.raspberrypi.org/documentation/installation/installing-images/)
* [Configure, RDC, SSH](https://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/)
* [Install Node on Pi Zero](https://www.thepolyglotdeveloper.com/2018/03/install-nodejs-raspberry-pi-zero-w-nodesource/)
* [Connect temp sensor for Raspberry Pi (Python)](https://www.youtube.com/watch?v=j7LLVkPpQ78)
	
## Setup

Coming soon

## Usage

Once connected, run the Node program from within the root of the project:

```
$ node .
```

The options are as follows:
1. Temperature threshold in Fahrenheit (default: 35 deg)
1. Sensor read frequency in milliseconds (default: 5 seconds)
1. Report frequency in milliseconds (default: 1 hour)


### Example

To have the program take a measurement every second and report the temperature every 10 seconds if the temperature is under 60 degrees, run the following:
```
$ node . 60 1000 10000
```
