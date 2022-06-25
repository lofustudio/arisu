import chalk from 'chalk';
import { MessageEmbed } from 'discord.js';
import { QuickDB } from 'quick.db';

export class Logger {
    private module: string;
    constructor(module: string) {
        this.module = module;
    }

    private db = new QuickDB({ table: "logs" });

    private generateID() {
        let ID = '';
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < 12; i++) {
            ID += characters.charAt(Math.floor(Math.random() * 36));
        }

        return ID;
    }

    private async log(message: string) {
        console.log(
            chalk.inverse(`[${this.module.toUpperCase()}]`) + ' ' + message
        );
    }

    async error(message: string) {
        await this.db.set(`${this.generateID()}`, {
            module: this.module,
            value: message
        });
        this.log(chalk.red('error') + ' - ' + message);

        const embed = new MessageEmbed()
            .setColor('#BF616A')
            .setTitle('❌ Something went wrong!')
            .setDescription(message);
        return { embeds: [embed] };
    }

    async warn(message: string) {
        await this.db.set(`${this.generateID()}`, {
            module: this.module,
            value: message
        });
        this.log(chalk.yellow('warn') + ' - ' + message);

        const embed = new MessageEmbed()
            .setColor('#EBCB8B')
            .setTitle('⚠️ Something went wrong!')
            .setDescription(message);
        return { embeds: [embed] };
    }

    async info(message: string) {
        await this.db.set(`${this.generateID()}`, {
            module: this.module,
            value: message
        });
        this.log(chalk.cyan('info') + ' - ' + message);
    }

    async debug(message: string) {
        await this.db.set(`${this.generateID()}`, {
            module: this.module,
            value: message
        });
        this.log(chalk.magenta('debug') + ' - ' + message);
    }

    async trace(message: string) {
        await this.db.set(`${this.generateID()}`, {
            module: this.module,
            value: message
        });
        this.log(chalk.magenta('trace') + ' - ' + message);
    }
}
