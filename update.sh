#!/bin/bash

# update pcsrt binary
TAG=$(curl -s https://api.github.com/repos/JiningLiu/pcsrt/releases/latest \
    | grep '"tag_name":' \
    | head -n1 \
    | sed -E 's/.*"([^"]+)".*/\1/')
sudo rm -f /usr/bin/pcsrt
sudo curl -fSL https://github.com/JiningLiu/pcsrt/releases/download/$TAG/pcsrt -o /usr/bin/pcsrt
sudo chmod +x /usr/bin/pcsrt

echo
echo "pcsrt update complete!"
echo