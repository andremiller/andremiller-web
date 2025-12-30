Title: Raspberry Pi Pinout Diagram
Date: 2013-01-20
Category: Electronics
Tags: raspberry pi, sbc, documentation


Pinouts for the Raspberry Pi P1 header, showing pins that can be used
for general purpose IO. I used some online sources to get the naming for
the pins (source list at the bottom of this post). Some of the power and
ground pins were initially marked as ‘do not connect’, but it has now
been confirmed that these pins won’t change so I included them below as
well (Pins 4, 9, 14, 17, 20 and 25).

A few pins changed between Revision 1 and Revision 2 of the board (Pins
3, 5 and 13). The pin description in the table below shows first the
Revision 1 GPIO number followed by a slash and then the Revision 2 GPIO
number.

![image]({attach}images/RaspberryPiPinouts2.png)

| Name               | Pin |         |         | Pin | Name             |
|--------------------|-----|---------|---------|-----|------------------|
| 3.3 V              | 1   | orange  | red     | 2   | 5 V              |
| GPIO 0 / 2 I2C SDA | 3   | cyan    | red     | 4   | 5 V              |
| GPIO 1 / 3 I2C SCL | 5   | cyan    | black   | 6   | GND              |
| GPIO 4             | 7   | green   | yellow  | 8   | GPIO 14 UART TXD |
| GND                | 9   | black   | yellow  | 10  | GPIO 15 UART RXD |
| GPIO 17            | 11  | green   | green   | 12  | GPIO 18          |
| GPIO 21 / 27       | 13  | green   | black   | 14  | GND              |
| GPIO 22            | 15  | green   | green   | 16  | GPIO 23          |
| 3.3 V              | 17  | orange  | green   | 18  | GPIO 24          |
| GPIO 10 SPI MOSI   | 19  | magenta | black   | 20  | GND              |
| GPIO 9 SPI MISO    | 21  | magenta | green   | 22  | GPIO 25          |
| GPIO 11 SPI SCLK   | 23  | magenta | magenta | 24  | GPIO 8 SPI CE0   |
| GND                | 25  | black   | magenta | 26  | GPIO 7 SPI CE1   |

If you would like to use the graphics in the diagram you can [download
the source vector file in SVG format from
GitHub](https://github.com/andremiller/rpi-pinout-diagram).
