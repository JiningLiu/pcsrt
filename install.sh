#!/bin/bash

# install libcamera and gstreamer packages
readonly PCSRT_DEBS_PATH="/tmp/pcsrt_debs"

mkdir -p "$PCSRT_DEBS_PATH"
cd "$PCSRT_DEBS_PATH"

apt download libcamera-apps=1.10.1-1 \
    gstreamer1.0-tools=1.26.2-2 \
    gstreamer1.0-plugins-base=1.26.2-1 \
    gstreamer1.0-plugins-good=1.26.2-1 \
    gstreamer1.0-plugins-bad=1.26.2-3 \
    gstreamer1.0-plugins-ugly=1.26.3-4 \
    gstreamer1.0-alsa=1.26.2-1 \
    gstreamer1.0-libcamera=0.6.0+rpt20251202-1 \
    cdebconf=0.280 \
    debconf=1.5.91 \
    fontconfig-config=2.15.0-2.3 \
    fontconfig=2.15.0-2.3 \
    fonts-croscore=20201225-2 \
    fonts-dejavu-core=2.37-8 \
    fonts-freefont-otf=20211204+svn4273-2 \
    fonts-freefont-ttf=20211204+svn4273-2 \
    fonts-liberation=1:2.1.5-3 \
    fonts-noto-core=20201225-2 \
    fonts-texgyre=20180621-6 \
    fonts-urw-base35=20200910-8 \
    gir1.2-gupnpigd-1.6=1.6.0-4+b1 \
    liba52-0.7.4=0.7.4-20+b3 \
    libaa1=1.4p5-51.1+b1 \
    libabsl20240722=20240722.0-4 \
    libaom3=3.12.1-1 \
    libasound2t64=1.2.14-1+rpt1 \
    libass9=1:0.17.3-1+b1 \
    libasyncns0=0.8-6+b5 \
    libatk-bridge2.0-0t64=2.56.2-1 \
    libatk1.0-0t64=2.56.2-1 \
    libatspi2.0-0t64=2.56.2-1 \
    libavc1394-0=0.5.4-5+b2 \
    libavtp0=0.2.0-2 \
    libbs2b0=3.1.0+dfsg-8+b1 \
    libbz2-1.0=1.0.8-6 \
    libc6=2.41-12+rpt1 \
    libcaca0=0.99.beta20-5 \
    libcairo-gobject2=1.18.4-1+rpt1 \
    libcairo2=1.18.4-1+rpt1 \
    libcamera0.6=0.6.0+rpt20251202-1 \
    libcdio19t64=2.2.0-4 \
    libcdparanoia0=3.10.2+debian-14+b1 \
    libchromaprint1=1.5.1-7 \
    libcloudproviders0=0.3.6-2 \
    libcpuinfo0=0.0~git20250327.39ea79a-1 \
    libcurl3t64-gnutls=8.14.1-2+deb13u2 \
    libdatrie1=0.2.13-3+b1 \
    libdav1d7=1.5.1-1 \
    libdbus-1-3=1.16.2-2 \
    libdc1394-25=2.2.6-5 \
    libdca0=0.0.7-2+b2 \
    libde265-0=1.0.15-1+b3 \
    libdecor-0-0=0.2.2-2 \
    libdrm2=2.4.124-2 \
    libdv4t64=1.0.0-17.1+b1 \
    libdvdnav4=6.1.1-3+b1 \
    libdvdread8t64=6.1.3-2 \
    libegl1=1.7.0-1+b2 \
    libepoxy0=1.5.10-2 \
    libfaad2=2.11.2-1 \
    libflac14=1.5.0+ds-2 \
    libflite1=2.2-7 \
    libfluidsynth3=2.4.4+dfsg-1+deb13u1 \
    libfontconfig1=2.15.0-2.3 \
    libfreeaptx0=0.2.2-1 \
    libfreetype6=2.13.3+dfsg-1 \
    libfribidi0=1.0.16-1 \
    libgbm1=25.0.7-2+rpt3 \
    libgcc-s1=14.2.0-19 \
    libgdk-pixbuf-2.0-0=2.42.12+dfsg-4 \
    libgl1=1.7.0-1+b2 \
    libglib2.0-0t64=2.84.4-3~deb13u1 \
    libglvnd0=1.7.0-1+b2 \
    libglx0=1.7.0-1+b2 \
    libgme0=0.6.3-7+b2 \
    libgpm2=1.20.7-11+b2 \
    libgraphite2-3=1.3.14-2+b1 \
    libgsm1=1.0.22-1+b2 \
    libgssdp-1.6-0=1.6.4-1~deb13u1 \
    libgstreamer-gl1.0-0=1.26.2-1 \
    libgstreamer-plugins-bad1.0-0=1.26.2-3 \
    libgstreamer-plugins-base1.0-0=1.26.2-1 \
    libgstreamer1.0-0=1.26.2-2 \
    libgtk-3-0t64=1:3.24.49-3+rpt8 \
    libgudev-1.0-0=238-6 \
    libgupnp-1.6-0=1.6.8-2 \
    libgupnp-igd-1.6-0=1.6.0-4+b1 \
    libharfbuzz0b=10.2.0-1+b1 \
    libiec61883-0=1.2.0-7 \
    libimath-3-1-29t64=3.1.12-1+b3 \
    libinstpatch-1.0-2=1.1.6-1+b2 \
    libjack-jackd2-0=1.9.22~dfsg-4 \
    libjpeg62-turbo=1:2.1.5-4 \
    libjson-glib-1.0-0=1.10.6+ds-2 \
    liblc3-1=1.1.3+dfsg-1 \
    liblcms2-2=2.16-2 \
    libldacbt-enc2=2.0.2.3+git20200429+ed310a0-5 \
    liblilv-0-0=0.24.26-1 \
    liblrdf0=0.6.1-4+b2 \
    libltc11=1.3.2-1+b2 \
    libmjpegutils-2.1-0t64=1:2.1.0+debian-8.1+b1 \
    libmodplug1=1:0.8.9.0-3+b2 \
    libmp3lame0=3.100-6+b3 \
    libmpcdec6=2:0.1~r495-3 \
    libmpeg2-4=0.5.1-9+b3 \
    libmpeg2encpp-2.1-0t64=1:2.1.0+debian-8.1+b1 \
    libmpg123-0t64=1.32.10-1 \
    libmplex2-2.1-0t64=1:2.1.0+debian-8.1+b1 \
    libncurses6=6.5+20250216-2 \
    libneon27t64=0.34.2-1 \
    libnettle8t64=3.10.1-1 \
    libnice10=0.1.22-1 \
    libogg0=1.3.5-3+b2 \
    libonnx1t64=1.17.0-3+b1 \
    libonnxruntime1.21=1.21.0+dfsg-1 \
    libopenal1=1:1.24.2-1 \
    libopencore-amrnb0=0.1.6-1+b2 \
    libopencore-amrwb0=0.1.6-1+b2 \
    libopenexr-3-1-30=3.1.13-2 \
    libopenh264-8=2.6.0+dfsg-2 \
    libopenjp2-7=2.5.3-2.1~deb13u1 \
    libopenmpt0t64=0.7.13-1+b1 \
    libopenni2-0=2.2.0.33+dfsg-18+b2 \
    libopus0=1.5.2-2 \
    liborc-0.4-0t64=1:0.4.41-1 \
    libpango-1.0-0=1.56.3-1 \
    libpangocairo-1.0-0=1.56.3-1 \
    libpangoft2-1.0-0=1.56.3-1 \
    libpipewire-0.3-0t64=1.4.2-1+rpt2 \
    libpixman-1-0=0.44.0-3+rpt1+b1 \
    libpng16-16t64=1.6.48-1 \
    libprotobuf32t64=3.21.12-11 \
    libpthreadpool0=0.0~git20240616.560c60d-1 \
    libpulse0=17.0+dfsg1-2+rpt1 \
    libqrencode4=4.1.1-2 \
    libraptor2-0=2.0.16-6 \
    libraw1394-11=2.1.2-2+b2 \
    libre2-11=20240702-3+b1 \
    librsvg2-2=2.60.0+dfsg-1 \
    librtmp1=2.4+20151223.gitfa8646d.1-2+b5 \
    libsbc1=2.1-1 \
    libsdl2-2.0-0=2.32.4+dfsg-1 \
    libserd-0-0=0.32.4-1 \
    libshout3=2.4.6-1+b3 \
    libsidplay1v5=1.36.60-1+b2 \
    libsndfile1=1.2.2-2+b1 \
    libsord-0-0=0.16.18-1 \
    libsoundtouch1=2.4.0+ds-1 \
    libsoup-3.0-0=3.6.5-3 \
    libspandsp2t64=0.0.6+dfsg-2.2 \
    libspeex1=1.2.1-3 \
    libsratom-0-0=0.6.18-1 \
    libsrt1.5-gnutls=1.5.4-1 \
    libsrtp2-1=2.7.0-3 \
    libssl3t64=3.5.4-1~deb13u1+rpt1 \
    libstdc++6=14.2.0-19 \
    libsvtav1enc2=2.3.0+dfsg-1 \
    libsystemd0=257.9-1~deb13u1 \
    libtag2=2.0.2-2 \
    libthai0=0.1.29-2+b1 \
    libtheora0=1.2.0~alpha1+dfsg-6 \
    libtheoradec1=1.2.0~alpha1+dfsg-6 \
    libtheoraenc1=1.2.0~alpha1+dfsg-6 \
    libtwolame0=0.4.0-2+b2 \
    libunibreak6=6.1-3 \
    libusb-1.0-0=2:1.0.28-1 \
    libv4l-0t64=1.30.1-1 \
    libva-drm2=2.22.0-3 \
    libva2=2.22.0-3 \
    libvisual-0.4-0=0.4.2-2+b2 \
    libvo-aacenc0=0.1.3-3 \
    libvo-amrwbenc0=0.1.3-2+b2 \
    libvorbis0a=1.3.7-3 \
    libvorbisenc2=1.3.7-3 \
    libvorbisfile3=1.3.7-3 \
    libvpx9=1.15.0-2.1 \
    libvulkan1=1.4.309.0-1 \
    libwavpack1=5.8.1-1 \
    libwayland-client0=1.23.1-3+rpt1+b1 \
    libwayland-cursor0=1.23.1-3+rpt1+b1 \
    libwayland-egl1=1.23.1-3+rpt1+b1 \
    libwebp7=1.5.0-0.1 \
    libwebpmux3=1.5.0-0.1 \
    libwebrtc-audio-processing-1-3=1.3-3+b1 \
    libwildmidi2=0.4.3-1+b3 \
    libx11-6=2:1.8.12-1 \
    libx11-xcb1=2:1.8.12-1 \
    libx264-164=2:0.164.3108+git31e19f9-2+b1 \
    libx265-215=4.1-2 \
    libxcb-render0=1.17.0-2+b1 \
    libxcb-shm0=1.17.0-2+b1 \
    libxcb-xkb1=1.17.0-2+b1 \
    libxcb1=1.17.0-2+b1 \
    libxcomposite1=1:0.4.6-1 \
    libxcursor1=1:1.2.3-1 \
    libxdamage1=1:1.1.6-1+b2 \
    libxext6=2:1.3.4-1+b3 \
    libxfixes3=1:6.0.0-2+b4 \
    libxi6=2:1.8.2-1 \
    libxinerama1=2:1.1.4-3+b4 \
    libxkbcommon-x11-0=1.7.0-2 \
    libxkbcommon0=1.7.0-2 \
    libxml2=2.12.7+dfsg+really2.9.14-2.1+deb13u2 \
    libxnnpack0.20241108=0.0~git20241108.4ea82e5-2 \
    libxrandr2=2:1.5.4-1+b3 \
    libxrender1=1:0.9.12-1 \
    libxslt1.1=1.1.35-1.2+deb13u2 \
    libxss1=1:1.2.3-1+b3 \
    libxtst6=2:1.2.5-1 \
    libyajl2=2.1.0-5+b2 \
    libzbar0t64=0.23.93-8 \
    libzix-0-0=0.6.2-1 \
    libzvbi0t64=0.2.44-1 \
    libzxing3=2.3.0-4 \
    pipewire=1.4.2-1+rpt2 \
    pulseaudio=17.0+dfsg1-2+rpt1 \
    rpicam-apps=1.10.1-1 \
    x11-common=1:7.7+24+deb13u1 \
    zlib1g=1:1.3.dfsg+really1.3.1-1+b1

echo "Extracting and installing packages..."
sudo mkdir -p /opt/pcsrt
for pkg in *.deb; do
    sudo dpkg-deb -x "$pkg" /opt/pcsrt/
done

cd
sudo rm -r "$PCSRT_DEBS_PATH"

# install pcsrt binary
TAG=$(curl -s https://api.github.com/repos/JiningLiu/pcsrt/releases/latest \
    | grep '"tag_name":' \
    | head -n1 \
    | sed -E 's/.*"([^"]+)".*/\1/')
sudo curl -fSL https://github.com/JiningLiu/pcsrt/releases/download/$TAG/pcsrt -o /usr/bin/pcsrt
sudo chmod +x /usr/bin/pcsrt

echo
echo "Installation complete! You can now run 'pcsrt' from the terminal."
echo