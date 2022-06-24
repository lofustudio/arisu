import chalk from 'chalk';
import { MessageEmbed } from 'discord.js';

export class Logger {
    private module: string;
    constructor(module: string) {
        this.module = module;
    }

    private log(message: string) {
        // TODO: log to dashboard
        console.log(
            chalk.inverse(`[${this.module.toUpperCase()}]`) + ' ' + message
        );
    }

    error(message: string) {
        this.log(chalk.red('error') + ' - ' + message);

        const embed = new MessageEmbed()
            .setColor('#BF616A')
            .setTitle('❌ Something went wrong!')
            .setDescription(message);
        return { embeds: [embed] };
    }

    warn(message: string) {
        this.log(chalk.yellow('warn') + ' - ' + message);

        const embed = new MessageEmbed()
            .setColor('#EBCB8B')
            .setTitle('⚠️ Something went wrong!')
            .setDescription(message);
        return { embeds: [embed] };
    }

    info(message: string) {
        this.log(chalk.cyan('info') + ' - ' + message);
    }

    debug(message: string) {
        this.log(chalk.magenta('debug') + ' - ' + message);
    }

    trace(message: string) {
        this.log(chalk.magenta('trace') + ' - ' + message);
    }
}
