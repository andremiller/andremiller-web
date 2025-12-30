Title: Arduino Web Enabled Aquarium Controller
Date: 2012-07-10
Category: Electronics
Tags: arduino, microcontroller, home automation


This is a project I started, but never finished. I got distracted by the Raspberry Pi when that was released!. Even though it is unfinished maybe someone could get some value out of the current state of the project.

The idea was to create a controller for an aquarium, to measure temperature, measure water level and to turn pumps, heaters and lights on/off based on measurements and times. And, to have a web enabled interface to the controller.

In it’s current state the controller works with DS18B20 temperature sensors and displays the temperature on a webpage. The web server runs on the arduino and uses a combination of generated html and static html stored on an SD card in the ethernet shield.

Scroll down to the bottom of this post to find the download link for the project.

Hardware used

- Arduino Mega2560
- Arduino Ethernet Shield
- Waterproof DS18B20 temperature probe

I also have the following hardware, but never got around to adding them to the project:

- DS1307 Real Time Clock
- 8 Channel 250V 10A Relay Module

![Arduino Aquarium Hardware]({attach}images/arduino_aquarium_hardware.jpg)

And here are a few screenshots of the program running on the arduino with 5 temperature sensors. The temperature sensors all connect to the same pin, and the ‘Scan’ button scans for probes and sets their resolution. The ‘Temperature’ button then reports the temperature for each of the probes.

![Arduino aquarium web temp init]({attach}images/arduino_aquarium_web_temp_init.png)
![Arduino aquarium web temp 2]({attach}images/arduino_aquarium_web_temp2.png)

And this page shows that other dynamic data can also be added. In this case it shows the current values of the Analog input pins.

![Arduino aquarium web analog]({attach}images/arduino_aquarium_web_analog.png)

To build this project you will need the Arduino Mega2560 (an Uno might work, have not tested that), Ethernet Shield, MicroSD card, one or more DS18B20 temperature sensors and a 5K resistor.

## Project Source

- [AndreArduinoAquarium-2012-03-08.zip]({attach}files/AndreArduinoAquarium-2012-03-08.zip)

Also included in the download is the stylesheet. On your SD card (which goes into your Ethernet Shield), create a www directory and place the style.css file in there.

This project started out on the Marine Aquarium South Africa (MASA) forums, you might be able to pick up some more information in the thread over there: http://www.marineaquariumsa.com/showthread.php?t=32489
