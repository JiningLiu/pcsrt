import { env, file, argv, serve } from "bun";
import 'zx/globals'
import chalk from 'chalk';

import { configWizard } from "./programs/config/config.js";

// User home directory
const HOME = env.HOME || env.USERPROFILE || await $`echo $HOME`.text() || "~";

// Load authentication file
const authFilePath = `${HOME}/.config/pcsrt/auth.json`;
let authFile = file(authFilePath);

if (!await authFile.exists()) {
    console.log(chalk.yellow(`Authentication file not found, creating a new one at ${authFilePath}`));

    await authFile.write(JSON.stringify({}));
    authFile = file(authFilePath);
}

// Load configuration file
const configFilePath = `${HOME}/.config/pcsrt/config.json`;
let configFile = file(configFilePath);

if (!await configFile.exists()) {
    console.log(chalk.yellow(`Configuration file not found, creating a new one at ${configFilePath}`));

    await configFile.write(JSON.stringify({}));
    configFile = file(configFilePath);
}

// Configuration wizard
if ((argv.length == 2 && argv[1] === "config") || argv[2] === "--dev-config") {
    await configWizard();
    console.log(chalk.blue("Exiting pcsrt configuration wizard..."));
    process.exit(0);
}

env.PATH = `/opt/pcsrt/gstreamer/usr/bin:${env.PATH}`
env.LD_LIBRARY_PATH = `/opt/pcsrt/gstreamer/usr/lib/aarch64-linux-gnu:${env.LD_LIBRARY_PATH || ""}`
env.GST_PLUGIN_PATH = "/opt/pcsrt/gstreamer/usr/lib/aarch64-linux-gnu/gstreamer-1.0"

let gstProcess = $`
    gst-launch-1.0 -e \
        mpegtsmux name=mux alignment=7 ! \
        srtsink \
            uri="srt://0.0.0.0:20240?mode=listener&latency=200&transtype=live" \
            wait-for-connection=false \
        libcamerasrc \
            ae-enable=true \
            ae-constraint-mode=normal \
            ae-exposure-mode=short \
            ae-metering-mode=matrix \
            exposure-time-mode=manual \
            exposure-time=88000 \
            analogue-gain-mode=manual \
            analogue-gain=8.0 \
            digital-gain=0 \
            af-mode=continuous \
            af-metering=auto \
            af-range=normal \
            af-speed=fast \
            awb-enable=true \
            awb-mode=auto \
            brightness=0.0 \
            contrast=1.05 \
            saturation=1.05 \
            sharpness=2.0 \
            gamma=2.4 ! \
        video/x-raw,format=NV12,width=2304,height=1296,framerate=56/1 ! \
        identity silent=false ! \
        queue max-size-buffers=30 flush-on-eos=true ! \
        x264enc \
            tune=zerolatency \
            speed-preset=ultrafast \
            bitrate=12000 \
            key-int-max=30 \
            bframes=0 \
            rc-lookahead=0 \
            sync-lookahead=0 \
            sliced-threads=true \
            threads=4 \
            aud=true ! \
        video/x-h264,profile=main ! \
        h264parse config-interval=1 ! \
        queue max-size-time=200000000 ! \
        mux. \
        alsasrc \
            device="hw:CARD=A,DEV=0" \
            do-timestamp=true ! \
        audioconvert ! \
        audioresample ! \
        audio/x-raw,rate=48000,channels=1 ! \
        voaacenc bitrate=128000 ! \
        aacparse ! \
        mux.
`.nothrow();

process.on("beforeExit", code => {
    gstProcess.kill("SIGKILL");
});

// setTimeout(() => {
//     gstProcess.kill('SIGINT');
// }, 20000);

// serve({
//     fetch(req, server) {
//         // upgrade the request to a WebSocket
//         if (server.upgrade(req)) {
//             return; // do not return a Response
//         }
//         return new Response("Upgrade failed", { status: 500 });
//     },
//     websocket: {
//         message(ws, message) { }, // a message is received
//         open(ws) { }, // a socket is opened
//         close(ws, code, message) { }, // a socket is closed
//         drain(ws) { },
//     }
// });