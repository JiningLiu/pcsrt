#!/bin/bash

# enables data over usb-c on pi
sudo bash -c 'echo -e "\ndtoverlay=dwc2,dr_mode=host" >> /boot/firmware/config.txt'

# install libcamera and gstreamer packages
readonly PCSRT_GSTREAMER_DEBS="$XDG_RUNTIME_DIR/pcsrt/gstreamer_debs"

mkdir -p "$PCSRT_GSTREAMER_DEBS"
cd "$PCSRT_GSTREAMER_DEBS"

apt download libcamera-apps=1.10.1-1
apt download gstreamer1.0-tools=1.26.2-2
apt download gstreamer1.0-plugins-base=1.26.2-1
apt download gstreamer1.0-plugins-good=1.26.2-1
apt download gstreamer1.0-plugins-bad=1.26.2-3
apt download gstreamer1.0-plugins-ugly=1.26.3-4
apt download gstreamer1.0-alsa=1.26.2-1
apt download gstreamer1.0-libcamera=0.6.0+rpt20251202-1

sudo mkdir -p /opt/pcsrt/gstreamer
for pkg in *.deb; do
    sudo dpkg-deb -x "$pkg" /opt/pcsrt/gstreamer/
done
cd