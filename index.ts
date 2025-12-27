import { env, file, argv, serve, $ } from "bun";

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

serve({
    fetch(req, server) {
        // upgrade the request to a WebSocket
        if (server.upgrade(req)) {
            return; // do not return a Response
        }
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        message(ws, message) { }, // a message is received
        open(ws) { }, // a socket is opened
        close(ws, code, message) { }, // a socket is closed
        drain(ws) { },
    }
});