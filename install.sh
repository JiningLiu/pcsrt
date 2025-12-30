#!/bin/bash

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

apt download liba52-0.7.4=0.7.4-20+b3
apt download libaa1=1.4p5-51.1+b1
apt download libaom3=3.12.1-1
apt download libasound2t64=1.2.14-1+rpt1
apt download libass9=1:0.17.3-1+b1
apt download libavc1394-0=0.5.4-5+b2
apt download libavtp0=0.2.0-2
apt download libbs2b0=3.1.0+dfsg-8+b1
apt download libbz2-1.0=1.0.8-6
apt download libc6=2.41-12+rpt1
apt download libcaca0=0.99.beta20-5
apt download libcairo-gobject2=1.18.4-1+rpt1
apt download libcairo2=1.18.4-1+rpt1
apt download libcamera0.6=0.6.0+rpt20251202-1
apt download libcdio19t64=2.2.0-4
apt download libcdparanoia0=3.10.2+debian-14+b1
apt download libchromaprint1=1.5.1-7
apt download libcurl3t64-gnutls=8.14.1-2+deb13u2
apt download libdc1394-25=2.2.6-5
apt download libdca0=0.0.7-2+b2
apt download libde265-0=1.0.15-1+b3
apt download libdrm2=2.4.124-2
apt download libdv4t64=1.0.0-17.1+b1
apt download libdvdnav4=6.1.1-3+b1
apt download libdvdread8t64=6.1.3-2
apt download libfaad2=2.11.2-1
apt download libflac14=1.5.0+ds-2
apt download libflite1=2.2-7
apt download libfluidsynth3=2.4.4+dfsg-1+deb13u1
apt download libfontconfig1=2.15.0-2.3
apt download libfreeaptx0=0.2.2-1
apt download libfribidi0=1.0.16-1
apt download libgcc-s1=14.2.0-19
apt download libgdk-pixbuf-2.0-0=2.42.12+dfsg-4
apt download libgl1=1.7.0-1+b2
apt download libglib2.0-0t64=2.84.4-3~deb13u1
apt download libgme0=0.6.3-7+b2
apt download libgsm1=1.0.22-1+b2
apt download libgstreamer-gl1.0-0=1.26.2-1
apt download libgstreamer-plugins-bad1.0-0=1.26.2-3
apt download libgstreamer-plugins-base1.0-0=1.26.2-1
apt download libgstreamer1.0-0=1.26.2-2
apt download libgtk-3-0t64=1:3.24.49-3+rpt8
apt download libgudev-1.0-0=238-6
apt download libharfbuzz0b=10.2.0-1+b1
apt download libiec61883-0=1.2.0-7
apt download libimath-3-1-29t64=3.1.12-1+b3
apt download libjack-jackd2-0=1.9.22~dfsg-4
apt download libjpeg62-turbo=1:2.1.5-4
apt download libjson-glib-1.0-0=1.10.6+ds-2
apt download liblc3-1=1.1.3+dfsg-1
apt download liblcms2-2=2.16-2
apt download libldacbt-enc2=2.0.2.3+git20200429+ed310a0-5
apt download liblilv-0-0=0.24.26-1
apt download liblrdf0=0.6.1-4+b2
apt download libltc11=1.3.2-1+b2
apt download libmjpegutils-2.1-0t64=1:2.1.0+debian-8.1+b1
apt download libmodplug1=1:0.8.9.0-3+b2
apt download libmp3lame0=3.100-6+b3
apt download libmpcdec6=2:0.1~r495-3
apt download libmpeg2-4=0.5.1-9+b3
apt download libmpeg2encpp-2.1-0t64=1:2.1.0+debian-8.1+b1
apt download libmpg123-0t64=1.32.10-1
apt download libmplex2-2.1-0t64=1:2.1.0+debian-8.1+b1
apt download libncurses6=6.5+20250216-2
apt download libneon27t64=0.34.2-1
apt download libnettle8t64=3.10.1-1
apt download libnice10=0.1.22-1
apt download libogg0=1.3.5-3+b2
apt download libonnxruntime1.21=1.21.0+dfsg-1
apt download libopenal1=1:1.24.2-1
apt download libopencore-amrnb0=0.1.6-1+b2
apt download libopencore-amrwb0=0.1.6-1+b2
apt download libopenexr-3-1-30=3.1.13-2
apt download libopenh264-8=2.6.0+dfsg-2
apt download libopenjp2-7=2.5.3-2.1~deb13u1
apt download libopenmpt0t64=0.7.13-1+b1
apt download libopenni2-0=2.2.0.33+dfsg-18+b2
apt download libopus0=1.5.2-2
apt download liborc-0.4-0t64=1:0.4.41-1
apt download libpango-1.0-0=1.56.3-1
apt download libpango-1.0-0=1.56.3-1
apt download libpangocairo-1.0-0=1.56.3-1
apt download libpangoft2-1.0-0=1.56.3-1
apt download libpng16-16t64=1.6.48-1
apt download libpulse0=17.0+dfsg1-2+rpt1
apt download libpulse0=17.0+dfsg1-2+rpt1
apt download libqrencode4=4.1.1-2
apt download libraptor2-0=2.0.16-6
apt download libraw1394-11=2.1.2-2+b2
apt download librsvg2-2=2.60.0+dfsg-1
apt download librtmp1=2.4+20151223.gitfa8646d.1-2+b5
apt download libsbc1=2.1-1
apt download libserd-0-0=0.32.4-1
apt download libshout3=2.4.6-1+b3
apt download libsidplay1v5=1.36.60-1+b2
apt download libsndfile1=1.2.2-2+b1
apt download libsoundtouch1=2.4.0+ds-1
apt download libsoup-3.0-0=3.6.5-3
apt download libspandsp2t64=0.0.6+dfsg-2.2
apt download libspeex1=1.2.1-3
apt download libsrt1.5-gnutls=1.5.4-1
apt download libsrtp2-1=2.7.0-3
apt download libssl3t64=3.5.4-1~deb13u1+rpt1
apt download libstdc++6=14.2.0-19
apt download libsvtav1enc2=2.3.0+dfsg-1
apt download libtag2=2.0.2-2
apt download libtheora0=1.2.0~alpha1+dfsg-6
apt download libtheoradec1=1.2.0~alpha1+dfsg-6
apt download libtheoraenc1=1.2.0~alpha1+dfsg-6
apt download libtwolame0=0.4.0-2+b2
apt download libusb-1.0-0=2:1.0.28-1
apt download libv4l-0t64=1.30.1-1
apt download libva-drm2=2.22.0-3
apt download libva2=2.22.0-3
apt download libva2=2.22.0-3
apt download libvisual-0.4-0=0.4.2-2+b2
apt download libvo-aacenc0=0.1.3-3
apt download libvo-amrwbenc0=0.1.3-2+b2
apt download libvorbis0a=1.3.7-3
apt download libvorbisenc2=1.3.7-3
apt download libvorbisfile3=1.3.7-3
apt download libvpx9=1.15.0-2.1
apt download libvulkan1=1.4.309.0-1
apt download libwavpack1=5.8.1-1
apt download libwayland-client0=1.23.1-3+rpt1+b1
apt download libwebp7=1.5.0-0.1
apt download libwebpmux3=1.5.0-0.1
apt download libwebrtc-audio-processing-1-3=1.3-3+b1
apt download libwildmidi2=0.4.3-1+b3
apt download libx11-6=2:1.8.12-1
apt download libx264-164=2:0.164.3108+git31e19f9-2+b1
apt download libx265-215=4.1-2
apt download libxdamage1=1:1.1.6-1+b2
apt download libxext6=2:1.3.4-1+b3
apt download libxfixes3=1:6.0.0-2+b4
apt download libxkbcommon0=1.7.0-2
apt download libxml2=2.12.7+dfsg+really2.9.14-2.1+deb13u2
apt download libxtst6=2:1.2.5-1
apt download libzbar0t64=0.23.93-8
apt download libzvbi0t64=0.2.44-1
apt download libzxing3=2.3.0-4
apt download pulseaudio=17.0+dfsg1-2+rpt1
apt download rpicam-apps=1.10.1-1
apt download zlib1g=1:1.3.dfsg+really1.3.1-1+b1

sudo mkdir -p /opt/pcsrt/gstreamer
for pkg in *.deb; do
    sudo dpkg-deb -x "$pkg" /opt/pcsrt/gstreamer/
done

cd
sudo rm -r "$PCSRT_GSTREAMER_DEBS"

# install pcsrt binary
TAG=$(curl -s https://api.github.com/repos/JiningLiu/pcsrt/releases/latest \
    | grep '"tag_name":' \
    | head -n1 \
    | sed -E 's/.*"([^"]+)".*/\1/')
sudo curl -fSL https://github.com/JiningLiu/pcsrt/releases/download/$TAG/pcsrt -o /usr/bin/pcsrt
sudo chmod +x /usr/bin/pcsrt

echo "Installation complete! You can now run 'pcsrt' from the terminal."