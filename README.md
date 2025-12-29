# 📹 pcsrt 🔴

A customizable Raspberry Pi-based live stream solution over SRT.

> [!NOTE]
> 🚧 This project is in early development.

> [!WARNING]
> This is the **development** branch. Please ensure you are on the right branch.

## Usage

### Installation

Run the following command in a terminal of the Raspberry Pi:

```bash
curl -fSL https://raw.githubusercontent.com/JiningLiu/pcsrt/HEAD/install.sh | bash
```

Make sure to configure your `/boot/firmware/config.txt` correctly for your peripherals.

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
