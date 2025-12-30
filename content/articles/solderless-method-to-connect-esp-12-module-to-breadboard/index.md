Title: Solderless method to connect ESP-12 module to breadboard
Date: 2016-04-17
Category: Electronics
Tags: esp8266, microcontroller, prototyping


The ESP8266 ESP-12 module has a 2mm pitch, making it difficult to use on
a breadboard with a 2.54mm pitch. Usually you are required to solder the
module to a breakout board first.

This is just a quick ‘hack’ to connect the module to a breadboard for
some testing without soldering it to a breakout board first.

The cheap prototyping jumper wires you can find on eBay or sites like
Banggood.com, the ones with the round pins, fit through the holes in the
ESP-12 module (probably some others too). Because the holes are
through-hole plated the jumper pins make contact, even if they’re a bit
loose.

Now all you need is a way to secure them so they don’t all fall out. For
this, a piece of foam works great!

Some IC’s are shipped in conductive foam, so test the resistance of the
foam with your multimeter first!

EDIT: I initially said here to avoid the conductive foam, but a message
left below by a user suggests that the conductive foam usually has a
very high resistance and should be OK to use and would also be
beneficial because it provides ESD protection. I have not tested using
this foam though.

I find this is a quick way to test new modules before soldering them
into a more permanent project.

![image]({attach}images/solderless_esp12_breakout.jpg)
