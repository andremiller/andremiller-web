Title: Arduino interface to MPU9250 / MPU9255 gyroscope, accelerometer, and compass
Date: 2016-11-09
Category: Electronics
Tags: arduino, microcontroller


This post is a quick introduction to get an MPU9250 gyroscope,
accelerometer, and compass module (so called 9 axis) connected and
talking to an Arduino. I’m using a 5V Arduino Nano, because the
description of this module says that it is 5V tolerant.

![image]({attach}images/mpu9250_1_r.jpg)

Markings on chip is: MP92 / W864A1 / 1410

![image]({attach}images/mpu9250_2_r.jpg)

The library I used is one included in the Arduino IDE Library manager.
When I searched for 9250 there were couple of different ones, but the
one I chose was called “SparkFun MPU-9250 9 DOF IMU Breakout”, version
1.0.

I connected it in the following way:

| Arduino | MPU9250 Module |
|---------|----------------|
| GND     | GND            |
| 5V      | VCC            |
| D12     | INT            |
| A4      | SDA            |
| A5      | SCL            |

I then tried the included example from the library, called
“MPU9250BasicAHRS”, which you can find in the File-\>Examples menu in
the Arduino IDE after installing the library.

After uploading this example, I got the following output on the Serial
console:

``` ansi
MPU9250 I AM 73 I should be 71
Could not connect to MPU9250: 0x73
```

After doing a bit of research, it looks like the chip on this module
might in fact be a MPU9255 and not a MPU9250.

According to the register map datasheet for the MPU9250, register 117
should contain the value 0x71 for WHO_AM_I

And according the register map datasheet for the MPU9255, register 117
contains the value 0x73 for WHO_AM_I

These two chips are very similar and after replacing 0x71 with 0x73 in
the example sketch, it worked:

Output on Serial:

``` ansi
rate = 225.58 Hz
ax = -41.32 ay = -77.21 az = 908.75 mg
gx = 0.18 gy = -0.08 gz = -0.07 deg/s
mx = -363 my = 282 mz = -677 mG
q0 = 0.88 qx = -0.05 qy = -0.00 qz = 0.48
Yaw, Pitch, Roll: 49.04, 2.53, -4.83
```
