import chalk from 'chalk';

export function log(message: string, from?: string): void {
    console.log(chalk.rgb(99, 54, 162)(`[pcsrt - ${new Date().toISOString()}]`), chalk.blue(`[${from || ":"}]`), message);
}