#!/bin/bash

sudo rm -rf /opt/pcsrt
sudo rm -f /usr/bin/pcsrt

sudo rm -rf ~/.config/pcsrt

sudo rm -f /tmp/pcsrt_gst_processes.json
sudo rm -rf "${XDG_RUNTIME_DIR:-/tmp}/pcsrt/gstreamer_debs"

echo "pcsrt and its dependencies have been uninstalled."