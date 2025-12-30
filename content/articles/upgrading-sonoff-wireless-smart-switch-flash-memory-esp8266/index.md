Title: Upgrading Sonoff Wireless Smart Switch Flash Memory (ESP8266)
Date: 2016-09-07
Category: Electronics
tags: arduino, esp8266, microcontroller, sonoff


I’ve been playing around with the ESP8266 based Sonoff Wireless Smart
Switch and I really wanted to upgrade the flash from the 1MB it comes
with to 4MB so I can re-program it over wifi.

I’ve already have custom firmware running on it, but I don’t like the
idea of opening it op and hooking it up to my PC each time I want to
reprogram it. There is an Arduino library to allow updates via Wifi, but
it requires a flash chip bigger than the 1MB the Sonoff comes with.

Luckily it’s pretty easy to change it and the replacement flash chip is
quite cheap.

The one I used is a winbond 25Q32FVSIG

This is the Sonoff module before replacing the flash:

![image]({attach}images/sonoff_old_flash.jpg)

Using the Arduino ESP8266 example called “CheckFlashConfig” shows the
size of the flash to be 1MB:

![image]({attach}images/sonoff_upgrade_flash_check1.png)

I bent the LED out of the way and used a heat gun to remove the old
chip.

![image]({attach}images/sonoff_old_flash_removed.jpg)

Then I applied some flux to the pads and re-coated with solder, using my
soldering iron with a fine tip.

Here is the new flash chip ready to be soldered into place, with the
newly coated pads on the board.

![image]({attach}images/sonoff_new_flash_before.jpg)

Again using my soldering iron with a fine tip I heated up each leg until
the solder flowed. I used tweezers to hold the flash chip in place and
first did the two opposite corners.

![image]({attach}images/sonoff_new_flash.jpg)

Running the flash test sketch again after the change, shows I now have
4MB available:

![image]({attach}images/sonoff_upgrade_flash_check2.png)
