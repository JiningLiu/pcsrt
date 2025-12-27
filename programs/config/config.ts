import { select, input } from "@inquirer/prompts";
import chalk from 'chalk';

import { ConfigChoice } from "../../types/config.js";

export async function configWizard() {
    console.log(`${chalk.blue("pcsrt")} - Pi Camera SRT`)

    const choice = await select({
        message: 'Configuration Wizard',
        choices: [
            {
                name: 'Authentication',
                value: ConfigChoice.AUTH,
                description: 'Manage users and authentication settings',
            },
            {
                name: 'Camera',
                value: ConfigChoice.CAMERA,
                description: 'Manage camera settings',
            },
            {
                name: 'Stream',
                value: ConfigChoice.STREAM,
                description: 'Manage SRT stream settings',
            },
            {
                name: 'Exit',
                value: ConfigChoice.EXIT,
                description: 'Exit the configuration wizard',
            }
        ],
    });

    switch (choice) {
        case ConfigChoice.AUTH:
            // TODO: Add authentication configuration logic here
            break;
        case ConfigChoice.CAMERA:
            // TODO: Add camera configuration logic here
            break;
        case ConfigChoice.STREAM:
            // TODO: Add stream configuration logic here
            break;
        case ConfigChoice.EXIT:
            return
        default:
            console.error("Invalid choice, exiting.");
            process.exit(1);
    }
}