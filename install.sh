#!/bin/bash

# install libcamera and gstreamer packages
readonly PCSRT_DEBS_PATH="/tmp/pcsrt_debs"

sudo rm -r "$PCSRT_DEBS_PATH"
sudo rm /tmp/pcsrt_debs.tar.gz

TAG=$(curl -s https://api.github.com/repos/JiningLiu/pcsrt/releases/latest \
    | grep '"tag_name":' \
    | head -n1 \
    | sed -E 's/.*"([^"]+)".*/\1/')

echo "Downloading packages..."
sudo curl -fSL https://github.com/JiningLiu/pcsrt/releases/download/$TAG/pcsrt_debs.tar.gz -o /tmp/pcsrt_debs.tar.gz

echo "Extracting and installing packages..."
sudo tar -xzvf /tmp/pcsrt_debs.tar.gz -C /tmp/
sudo mkdir -p /opt/pcsrt
for pkg in "$PCSRT_DEBS_PATH"/*.deb; do
    sudo dpkg-deb -xv "$pkg" /opt/pcsrt/
done

sudo rm -r "$PCSRT_DEBS_PATH"
sudo rm /tmp/pcsrt_debs.tar.gz

# install pcsrt binary
sudo curl -fSL https://github.com/JiningLiu/pcsrt/releases/download/$TAG/pcsrt -o /usr/bin/pcsrt
sudo chmod +x /usr/bin/pcsrt

echo
echo "Installation complete! You can now run 'pcsrt' from the terminal."
echo