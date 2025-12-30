Title: Arduino USB Infrared Remote Receiver for Kodi
Date: 2016-11-16
Category: Electronics
Tags: arduino, infrared, kodi


# Introduction

This project uses an Arduino Pro Micro to receive button presses from an
old IR remote you might already have and sends keyboard presses via an
emulated USB keyboard.

I’m using this to control Kodi, but you could use it to send keyboard
commands to any program.

![image]({attach}images/ir_recv_usb.jpg)

# Hardware used

- Arduino Pro Micro
- TSOP31238 IR Receiver (Can use other IR receivers too, just check the
  pinouts and voltage requirements and carrier frequency. The TSOP31238
  is 38Khz and works with 3.3V and 5V)
- LED + 470 Ohm resistor (Optional, used as indicator led)
- Tactile switch (Optional, used for reset)

# Wiring it up

| Arduino Pin | Connected to                  |
|-------------|-------------------------------|
| GND         | IR Recv Pin 1 (GND)           |
| VCC         | IR Recv Pin 2 (Vs)            |
| A2          | IR Recv Pin 3 (OUT)           |
| D8          | LED +                         |
| D9          | Resistor (connected to LED -) |
| RST         | Tactile Switch                |
| GND         | Tactile Switch                |

# Sketch

The sketch can be downloaded from my [Github
page](https://github.com/andremiller/arduino-kodiremote). It requires
the IRRemote library by shirriff, which can be installed from the
Arduino IDE Library Manager. I used version 2.0.1 of the library.

The board I chose in the Arduino IDE was the Leonardo board.

# Test Mode

The sketch has two modes it can operate it. Before you flash it for the
first time, make sure this line is not commented out:

``` c++
#define TESTMODE
```

If TESTMODE is defined then all IR remote button presses will be printed
on the serial console, so you can see what the decode type and hex codes
are.

Set your COM port, open the Serial Console and set the Baudrate to 9600,
then flash the sketch in test mode.

The program will run and print “Begin test mode” on the serial console,
waiting for you to press buttons on your remote.

Each line is a decode type (the protocol type your remote is using)
followed by a dash and then the hex code for the particular button. Some
remotes will send different codes for a button press vs a release and
some will also send additional codes when you hold the button down. This
sketch is very basic, and we are only using the hex code for a single
button press.

Here is an example output using my remote:

``` ansi
Begin test mode
3 – 80E88877
3 – FFFFFFFF
3 – 80E8A857
3 – FFFFFFFF
3 – 80E828D7
3 – 80E848B7
```

Make a note of the decode type and the hex code for each button you
press.

# Run mode

After you made a note of all your hex codes comment out the test mode
define:

``` c++
//#define TESTMODE
```

Then go to the main() section and change the line that checks for the
decode type to match your remote’s protocol:

``` c++
if (results.decode_type == 0x03)
```

Then update the switch statement and replace the hex codes with your
remote’s key codes that corresponds with the keyboard button you wish to
press.

To get a complete list of the keyboard controls for Kodi, refer to the
[Kodi wiki page](http://kodi.wiki/view/keyboard_controls)

``` c++
switch (results.value) {
case 0x80E848B7 : Keyboard.write(KEY_LEFT_ARROW); break; // Left
case 0x80E828D7 : Keyboard.write(KEY_RIGHT_ARROW); break;// Right
case 0x80E88877 : Keyboard.write(KEY_UP_ARROW); break; // Up
case 0x80E8A857 : Keyboard.write(KEY_DOWN_ARROW); break; // Down
case 0x80E8C837 : Keyboard.write(KEY_RETURN); break; // OK
case 0x80E86897 : Keyboard.write(KEY_BACKSPACE); break; 
```

Flash the program again. This time there will be nothing printed to the
serial console, but the buttons you press on the remote will be
translated to keyboard button presses. You can test this by opening
Notepad and pressing buttons on your remote to see if it acts like a
keyboard.
