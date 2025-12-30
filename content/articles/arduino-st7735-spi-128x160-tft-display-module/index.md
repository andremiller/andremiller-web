Title: Arduino ST7735 SPI 128×160 TFT Display Module
Date: 2016-11-01
Category: Electronics
Tags: arduino, microcontroller


A quick guide describing how to hook up an ST7735 128×160 SPI TFT
display to your Arduino and get the library to display something.

![image]({attach}images/tftlcd18_1.jpg)

On the back it has two sets of pins and an SD card holder. I used the
pins that already had a pin header soldered in.

There is also a jumper (J1) you can solder to select between 5V and 3V
VCC. It looks like this jumper just enables a a voltage regulator on the
VCC line for you. I could unfortunately not get the display to work
using 5V signal lines from the Arduino. Using the IO directly from the
Arduino just resulted in a white screen. Luckily this did not damage my
module.

![image]({attach}images/tftlcd18_3.jpg)

I had to use level shifters to convert the Arduino IO to 3.3V

![image]({attach}images/level_shift_module.jpg)

I used two 4 channel level shifters because that’s the only ones I had
and the display module required 5 IOs, but you also get 8 channel ones.

# Connections

For this test I used an Arduino UNO, and hooked everything up this way:

| Display | Connection    | Arduino UNO |
|---------|---------------|-------------|
| 1 – RST | Level Shifted | Digital 8   |
| 2 – CS  | Level Shifted | Digital 10  |
| 3 – D/C | Level Shifted | Digital 9   |
| 4 – DIN | Level Shifted | Digital 11  |
| 5 – CLK | Level Shifted | Digital 13  |
| 6 – VCC | Direct        | 5V          |
| 7 – BL  | Direct        | 3.3V        |
| 8 – GND | Direct        | GND         |

| Level Shifter | Connection     |
|---------------|----------------|
| GND           | Arduino GND    |
| LV            | Arduino 3.3V   |
| HV            | Arduino 5V     |
| LV\[1-4\]     | Display Module |
| HV\[1-4\]     | Arduino IO     |

# Libraries

## Adafruit TFT Library

I tried out two different libraries. The first is the Arduino IDE
built-in TFT Library (TFT Built-In by Arduino, Adafruit Version 1.0.6)

This library allows drawing text, images, and shapes on the Arduino TFT
graphical display.

This libraries examples will work without modification if hooked up as
above.

Open File -\> Examples -\> TFT -\> Arduino and choose any of the
examples, and upload the sketch.

## Ucglib by oliver

The second library I tried was Ucglib, by oliver. This library I
installed using the Library Manager in the IDE (Ucglib by oliver Version
1.3.3).

The library description is: A library for true color TFTs and OLEDs
Supported display controller: ST7735, ILI9341, PCF8833, SSD1351,
LD50T6160, ILI9163, SSD1131, SEPS225. Features: 18 Bit color depth, many
fonts.

To use the examples that come with this library you need to modify the
code a little bit to select the type of display you have. I started with
the GraphicsTest example. Since I’m using a ST7735 SPI 128×160 display
connected to the hardware SPI pins of the Arduino UNO I uncommented the
following line:

``` c++
Ucglib_ST7735_18x128x160_HWSPI ucg(/*cd=*/ 9 , /*cs=*/ 10, /*reset=*/ 8);
```

![image]({attach}images/tftlcd18_4.jpg)
