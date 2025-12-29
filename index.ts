import { env, file, argv, serve } from "bun";
import { createHash } from "crypto";

import { $, ProcessPromise } from 'zx'
import chalk from 'chalk';
import { input, password, select } from "@inquirer/prompts";

import { Configuration } from "./types/config.js";
import type { User } from "./types/auth.js";
import { log } from "./helpers/log.js";
import { setConfiguration } from "./helpers/config.js";

// Environment setup
const HOME = env.HOME || env.USERPROFILE || await $`echo $HOME`.text() || "~";
env.PATH = `/opt/pcsrt/gstreamer/usr/bin:${env.PATH}`
env.LD_LIBRARY_PATH = `/opt/pcsrt/gstreamer/usr/lib/aarch64-linux-gnu:${env.LD_LIBRARY_PATH || ""}`
env.GST_PLUGIN_PATH = "/opt/pcsrt/gstreamer/usr/lib/aarch64-linux-gnu/gstreamer-1.0"

// Load authentication file
const authFilePath = `${HOME}/.config/pcsrt/auth.json`;
let authFile = file(authFilePath);

if (!await authFile.exists()) {
    log(chalk.yellow(`Authentication file not found, creating a new one at ${authFilePath}`));

    await authFile.write(JSON.stringify([]));
    authFile = file(authFilePath);
}

let auth: User[] = await authFile.json();

// User management
if (argv.includes('--add-user') || argv.includes('-au')) {
    const username = await input({
        message: "Enter new username:",
        validate: (input) => {
            if (auth.find(u => u.username === input)) {
                return "Username already exists.";
            }
            if (input.trim().length === 0) {
                return "Username cannot be empty.";
            }
            return true;
        }
    });

    const pwd = await password({
        message: `Enter password for ${username}:`,
        mask: '*',
    });

    const passwordHash = createHash('sha256').update(pwd).digest('hex');

    auth.push({ username, passwordHash });
    await authFile.write(JSON.stringify(auth));

    log(chalk.green(`User ${username} added successfully.`));
    process.exit(0);
}

if (argv.includes('--remove-user') || argv.includes('-ru')) {
    if (auth.length === 0) {
        log(chalk.red("There are no registered users."));
        process.exit(1);
    }

    const username = await select({
        message: "Select user to remove:",
        choices: auth.map(u => u.username),
    });

    auth = auth.filter(u => u.username !== username);
    await authFile.write(JSON.stringify(auth));

    log(chalk.green(`User ${username} removed successfully.`));
    process.exit(0);
}

// Load configuration file
const configFilePath = `${HOME}/.config/pcsrt/config.json`;
let configFile = file(configFilePath);

if (!await configFile.exists()) {
    log(chalk.yellow(`Configuration file not found, creating a new one at ${configFilePath}`));

    await configFile.write(JSON.stringify(new Configuration()));
    configFile = file(configFilePath);
}

let config: Configuration = Configuration.fromJSON(await configFile.json());

$.verbose = argv.includes('--verbose') || argv.includes('-v') || config.verbose;

// CLI configuration
if (argv.includes('--set-config') || argv.includes('-sc')) {
    await input({
        message: "Enter configuration in JSON format:",
        validate: async (input) => {
            try {
                await setConfiguration(config, configFile, JSON.parse(input));
                return true;
            } catch (e) {
                return `${e}`;
            }
        }
    });

    process.exit(0);
}

// Existing GStreamer processes
let existingGstProcessesFilePath = "/tmp/pcsrt_gst_processes.json";
let existingGstProcessesFile = file(existingGstProcessesFilePath);

if (!await existingGstProcessesFile.exists()) {
    await existingGstProcessesFile.write(JSON.stringify([]));
    existingGstProcessesFile = file(existingGstProcessesFilePath);
}

let existingGstProcesses: number[] = await existingGstProcessesFile.json();

async function filterExistingGstProcesses() {
    existingGstProcesses = existingGstProcesses.filter(pid => {
        try {
            process.kill(pid, 0);
            return true;
        } catch {
            return false;
        }
    });
    await existingGstProcessesFile.write(JSON.stringify(existingGstProcesses));
}

async function killExistingGstProcesses() {
    await filterExistingGstProcesses();

    for (const pid of existingGstProcesses) {
        try {
            process.kill(pid, "SIGKILL");
            log(chalk.green(`Killed process ${pid}`));
        } catch (e) {
            log(chalk.red(`Failed to kill process ${pid}: ${e}`));
        }
    }
    await existingGstProcessesFile.write(JSON.stringify([]));
}


// Current GStreamer process
let gstProcess: ProcessPromise;

// GStreamer pipeline start
async function startGstPipeline(): Promise<boolean> {
    await filterExistingGstProcesses();
    if (existingGstProcesses.length > 0) {
        log(chalk.yellow(`Found existing GStreamer processes: ${existingGstProcesses.join(", ")}`));
        return false;
    }

    log(chalk.blue("Starting GStreamer pipeline..."));

    gstProcess = $`bash -c ${config.toGstCommand()}`.nothrow();

    existingGstProcesses.push(gstProcess.pid!);
    await existingGstProcessesFile.write(JSON.stringify(existingGstProcesses));

    return true;
}

if (config.startStreamOnLaunch) {
    await startGstPipeline();
}

let server: Bun.Server<{ user: string }>;

startup();

async function startup() {
    if (server) {
        log(chalk.red("Rebooting server..."));
        server.publish("connected", "REBOOT");
        await new Promise(res => setTimeout(res, 1000));
        server.stop(true);
        try {
            process.kill(gstProcess.pid!, 0);
            gstProcess.kill("SIGINT");
        } catch { }
        auth = await authFile.json();
        config = Configuration.fromJSON(await configFile.json());
        existingGstProcesses = await existingGstProcessesFile.json();
    }

    server = serve({
        port: config.port,

        fetch(req, server) {
            // Basic auth
            const credentials = atob(req.headers.get("Authorization")?.substring(6).trim() || "")?.split(":");
            const user = auth.find(u => u.username === credentials[0]);

            if (config.auth) {
                if (user?.passwordHash !== createHash('sha256').update(credentials[1] || "").digest('hex')) {
                    return new Response("Unauthorized", {
                        status: 401,
                        headers: {
                            "WWW-Authenticate": 'Basic realm="PCSRT"',
                        },
                    });
                }
            }

            // WebSocket upgrade
            if (server.upgrade(req, {
                data: {
                    user: user?.username || createHash('sha256').update(Math.random().toString()).digest('hex').substring(0, 8),
                }
            })) {
                return;
            }

            return new Response("Upgrade failed", { status: 500 });
        },
        websocket: {
            data: {} as { user: string },

            async message(ws, message) {
                const msg = message.toString().trim();
                log(msg, `${ws.data.user}@${ws.remoteAddress}`);

                switch (msg) {
                    case "START":
                        ws.send(`${await startGstPipeline()}`);
                        return;
                    case "STOP":
                        try {
                            process.kill(gstProcess.pid!, 0);
                            gstProcess.kill("SIGINT");
                        } catch { }
                        return;
                    case "RESTART":
                        try {
                            process.kill(gstProcess.pid!, 0);
                            gstProcess.kill("SIGINT");

                            for (let i = 0; i <= 50; i++) {
                                try {
                                    process.kill(gstProcess.pid!, 0);
                                } catch {
                                    break;
                                }

                                if (i === 50) {
                                    gstProcess.kill("SIGKILL");
                                }

                                await new Promise(res => setTimeout(res, 100));
                            }
                        } catch { }

                        ws.send(`${await startGstPipeline()}`);
                        return;
                    case "KILLALL":
                        await killExistingGstProcesses();
                        return;
                    case "RESET":
                        config = new Configuration();
                        await configFile.write(JSON.stringify(config));
                        return;
                    case "URIS":
                        let ipAddresses: string[] = [];
                        for (const ip of (await $`hostname -I`.text()).trim().split(" ")) {
                            ipAddresses.push(ip.includes(":") ? `[${ip}]` : ip);
                        }

                        function oppositeSrtMode(mode: string): string {
                            switch (mode) {
                                case "listener": return "caller";
                                case "caller": return "listener";
                                case "rendezvous": return "rendezvous";
                                default: return "listener";
                            }
                        }

                        const uris = ipAddresses.map(ip => `srt://${ip}:${config.stream.srtPort}?mode=${oppositeSrtMode(config.stream.srtMode)}&latency=${config.stream.srtLatency}`);
                        ws.send(JSON.stringify(uris));
                        return;
                    case "SHUTDOWN":
                        process.exit(0);
                    case "REBOOT":
                        startup();
                        return;
                    case "SYSTEM.SHUTDOWN":
                        await $`sudo shutdown -h now`;
                        process.exit(0);
                    case "SYSTEM.REBOOT":
                        await $`sudo reboot`;
                        process.exit(0);
                }

                if (msg.startsWith("SET ")) {
                    try {
                        await setConfiguration(config, configFile, JSON.parse(msg.substring(4)), startup);
                    } catch (e) {
                        const error = `Failed to set configuration: ${e}`
                        log(chalk.red(error), `${ws.data.user}@${ws.remoteAddress}`);
                        ws.send(error);
                        return;
                    }
                }
            },

            open(ws) {
                log(chalk.green("[WebSocket connection opened]"), `${ws.data.user}@${ws.remoteAddress}`);
                ws.subscribe("connected");
            },

            close(ws, code, _) {
                log(chalk.red(`[WebSocket connection closed ${code}]`), `${ws.data.user}@${ws.remoteAddress}`);
                ws.unsubscribe("connected");
            }
        }
    });
}

log(chalk.green(`pcsrt server running on port ${config.port}`));

process.on("beforeExit", _ => {
    try {
        gstProcess.kill("SIGINT");
    } catch (_) { }
});