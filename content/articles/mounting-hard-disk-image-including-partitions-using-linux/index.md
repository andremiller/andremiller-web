Title: Mounting a hard disk image including partitions using Linux
Date: 2008-01-22
Category: System Administration
Tags: linux


A while ago I thought it would be a good idea to make a backup of my Linux server by just dumping the complete disk to a file. In retrospect, it would have been much easier had I just dumped the individual filesystems.

When I finally got around to using this backup, long after the 10GB disk had perished I realized that to use the loopback device to mount a filesystem it actually needs a filesystem to mount. What I had was a disk image, including partition table and individual partitions. To further complicate matters the data partition was also not the first partition inside this image.

For reference, I created this image using the Unix ‘dd’ tool:

``` shell
# dd if=/dev/hda of=hda.img
30544113+0 records in
30544113+0 records out
# ls -lh
-rw-r--r-- 1 root    root  9.6G 2008-01-22 14:12 hda.img
```

I followed the instructions on http://www.trekweb.com/~jasonb/articles/linux_loopback.html to try and mount the partitions inside the disk image, but ran into two problems.

To mount a partition inside the disk image you need to calculate the offset of where the partition starts. You can use fdisk to show this information to you, but you need to specify the number of cylinders if you are using a disk image.

You then also need to multiply the start and end numbers with the calculated sectors to get a byte offset.

I found another tool more useful for this task, called parted. If you are using Ubuntu, you can install it with ‘apt-get install parted’

``` shell
# parted hda.img
GNU Parted 1.7.1
Using hda.img
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) unit
Unit?  [compact]? B
(parted) print
Disk hda.img: 10262568959B
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Number  Start        End           Size         Type     File system  Flags
1      32256B       106928639B    106896384B   primary  ext3         boot
2      106928640B   1184440319B   1077511680B  primary  linux-swap
3      1184440320B  10256924159B  9072483840B  primary  ext3
(parted) quit
```

Now we have the offsets and we can use those to mount the filesystems using the loopback device:

``` shell
#mount -o loop,ro,offset=32256 hda.img /mnt/rabbit
```

That mounted the first partition, the ‘boot’ partition, but this didn’t have the data on it that I was looking for. Lets try to mount partition number 3.

``` shell
#umount /mnt/rabbit
#mount -o loop,ro,offset=1184440320 hda.img /mnt/rabbit
#mount: wrong fs type, bad option, bad superblock on /dev/loop0,
missing codepage or helper program, or other error
In some cases useful info is found in syslog - try
dmesg | tail  or so
```

Oops, that doesn’t look right. According the article referred to above if you are using a util-linux below v2.12b then you cannot specify an offset higher than 32bits. I’m using util-inux 2.13 which shouldn’t have that problem, and besides, my offset is well below the 32bit limit.

The article also offers an alternative loopback implementation that supports mounting partitions within an image, but that requires patching and recompiling your kernel which I would rather not do.

Instead I decided to extra ct the filesystem from the image which would then allow me to mount it without specifying an offset.
Doing this is quite straightforward with ‘dd’. You need to give ‘dd’ a skip count, or, how far into the source to start copying, and a count, how much to copy.
Here you can either use the single byte offsets retrieved with parted or divide them by 512 and let ‘dd’ use 512 byte blocks. Copying just one byte at a time takes a very long time, so I suggest using a larger block size.

Here is the command I used to extract my filesystem. Skip is 2313360 (1184440320/512) and Count is 17719695 (9072483840/512)

``` shell
#dd if=hda.img of=hda3.img bs=512 skip=2313360 count=17719695
17719695+0 records in
17719695+0 records out
9072483840 bytes (9.1 GB) copied, 485.679 seconds, 18.7 MB/s
```

After extracting the filesystem I was able to mount it without any problems.

``` shell
# mount -o loop hda3.img /mnt/rabbit/
# df -h /mnt/rabbit
Filesystem            Size  Used Avail Use% Mounted on
/data/rabbit/image/hda3.img
8.4G  6.3G  1.7G  80% /mnt/rabbit
```

## Additional suggestions made by others on my previous blog:

- Gunnar 2008-03-17 : This is one solution, but a more elegant solution is to use the offset-flag in loop-mounting. In stead of splitting up your image you can just type inn mount -o loop,offset=[same offset as calculated above].
- Anonymous 2009-01-29 : All useful information – just a followup. If your ext3 partition has been uncleanly unmounted (or you took a dump from a live system, say running as a VM) then you won’t be able to mount it directly as the journal is unclean. Follow the “dd” instructions above to extract just the partition, then run “fsck.ext3 hda3.img” to repair the filesystem before mounting.
- David Kendall 2009-11-19 : This worked well for me. This article also applies to loading a vmware disk image that has several partitions. I used this to mount my vmware disk as a disk image "sudo vmware-mount -f Frog/Frog.vmdk /mnt/frog/" I could then mount individual partitions in the image like this "sudo mount -t ntfs -o loop,offset=10487232000B /mnt/frog/flat /mnt/toad/" Vmware-mount seems to have issues with partitioned disks. This provided a great way to work around those issues.
- Malone 2010-04-24 : The easiest way for me seems just to use the tool testdisk: "testdisk IMAGEFILE" you can simply see all partitions under advanced tools and also can extract partitions as an image file
- Mikko Rantalainen 2011-11-01 : kpartx
- fess 2012-01-26 : Do not miss @mikko’s answer! kpartx creates the device files for your image file so you can use the partitions just like a real disk. "kpartx -a hda.img" "mount /dev/mapper/hda.img3"
- variable47 2012-05-05 : For whoever searched for this solution and found this page… In regards to this error when mounting with an offset: " mount: wrong fs type, bad option, bad superblock on ", Mounting once with write-support enabled allowed for recovery.
- Mike 2013-04-02 : Great solution, here’s a way to get the offset to mount with: -o loop,offset= : fdisk -l /path/to/image.img | awk ‘{print $1,$2,$3 * 512,$4,$5,$6,$7}’
- xitation 2014-04-08 : No need to dd out the image, you can use the mount command to do all this, you do need to define the offset correctly though: Use mmls to work out your offsets and byte size to multiply by: #mmls -t dos /mnt/first-mount-point/VM-Image.vmdk.raw Then mount it! This is assuming it’s EXT4, so we have to give some extra mount options to handle the potentially dirty journal “noload” : mount -o ro,loop,noload,offset=$((391168*512)) /mnt/first-mount-point/VM-Image.vmdk.raw -t ext4 /mnt/second-mount-point
- Anonymous 2018-04-22 : There is an easier way: "sudo losetup -P /dev/loop3 hda.img" Run lsblk to make sure /dev/loop3 is not already used (otherwise use another number than 3). If successful lsblk will show a new loop block device with all partitions listed, you can then mount them normally.
