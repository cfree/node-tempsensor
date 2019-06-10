# Temperature Sensor

Using a Raspberry Pi Zero WH, a temperature sensor, and some code, I created a device that would notify me every so often if the temps are below the set threshold.

## Walkthrough

[Cold Snap: Temperature Reporting IoT Device](http://craigfreeman.net/blog/2019/06/cold-snap-temperature-reporting-iot-device/)

## Usage

Once connected, run the Node program from within the root of the project:

```
$ node .
```

The optional CLI arguments are as follows:
1. Temperature threshold in Fahrenheit (default: 35 deg)
1. Sensor read frequency in milliseconds (default: 5 seconds)
1. Report frequency in milliseconds (default: 1 hour)


### Example

To have the program take a measurement every second and report the temperature every 10 seconds if the temperature is under 60 degrees, run the following:
```
$ node . 60 1000 10000
```

## Config Examples

*I recommend you follow along in the walkthrough if you plan on using these examples*

### config.txt

In order for the Pi to register the temperature sensor connected to GPIO pin #4, sudo add this line at the end of `/boot/config.txt` of your Pi:

```
dtoverlay=w1-gpio
```

### ngrok.yml

In order for ngrok to be run at boot time by `systemd`, you'll need to create an ngrok config:

```
authtoken: <add_your_token_here>
tunnels:
  ssh:
    proto: tcp
    addr: 22
```
