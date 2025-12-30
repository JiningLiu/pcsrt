# 📹 pcsrt 🔴

A customizable Raspberry Pi-based live-streaming solution over SRT.

> [!NOTE]
> 🚧 This project is in early development.

## Usage

### Installation

Run the following command in a terminal of the Raspberry Pi:

```bash
curl -fSL https://raw.githubusercontent.com/JiningLiu/pcsrt/HEAD/install.sh | bash
```

Make sure to configure your `/boot/firmware/config.txt` correctly for your peripherals.

### Run on Boot

An example systemd service is available at [`pcsrt-example.service`](pcsrt-example.service).

```bash
sudo curl -fSL https://raw.githubusercontent.com/JiningLiu/pcsrt/HEAD/pcsrt-example.service -o /etc/systemd/system/pcsrt.service
```

Before enabling the service, make sure to change the `User` field to your desired runtime user. If you encounter errors, check the service logs to make sure the runtime user has the required directory and file permissions.

```bash
sudo systemctl daemon-reload
sudo systemctl enable pcsrt
```

To avoid runtime conflict from multiple instances, use the following command to start the program instead of `pcsrt`:

```bash
sudo systemctl start pcsrt
```

To view program output/logs:

```bash
journalctl -u pcsrt -f
```

### Update

```bash
curl -fSL https://raw.githubusercontent.com/JiningLiu/pcsrt/HEAD/update.sh | bash
```

### Uninstall

```bash
pcsrt --uninstall
```

## Development

### Prerequisites

- Raspberry Pi running 64-bit Raspberry Pi OS based on Debian 13 Trixie.
  - This project was developed using a Raspberry Pi 5 (2 GB) running Raspberry Pi OS Lite (64-bit) based on Debian 13 Trixie released on 2025-12-04: [Image Download](https://downloads.raspberrypi.com/raspios_lite_arm64/images/raspios_lite_arm64-2025-12-04/2025-12-04-raspios-trixie-arm64-lite.img.xz).
- Camera compatible with GStreamer pipeline.
  - This project was developed using a Raspberry Pi Camera Module 3 Wide, but any camera port/UVC camera should work as long as you know how to configure it in both the system and the GStreamer pipeline.

### Project Setup

Make sure you have all the required packages installed on your Raspberry Pi. They can be found in [`fresh-install.sh`](fresh-install.sh).

To install dependencies:

```bash
bun install
```

### Running & Building

To run:

```bash
bun dev
```

To build:

```bash
bun run build
```

The binary will be built for `bun-linux-arm64`. See [`package.json`](package.json).

### Licenses

#### Third-party Software

[google/zx](https://github.com/google/zx) ([Apache License 2.0](https://github.com/google/zx/blob/main/LICENSE))

[chalk/chalk](https://github.com/chalk/chalk) ([MIT License](https://github.com/chalk/chalk/blob/main/license))

[SBoudrias/Inquirer.js](https://github.com/SBoudrias/Inquirer.js) ([MIT License](https://github.com/SBoudrias/Inquirer.js/blob/main/LICENSE))

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

#### pcsrt

© 2025 Jining Liu. [MIT License](LICENSE).
