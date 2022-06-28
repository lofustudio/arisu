import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import { MessageEmbed } from "discord.js";

export class Logger {
    private module: string;
    constructor(module: string) {
        this.module = module;
    }

    private database: PrismaClient = new PrismaClient();

    private log(message: string) {
        console.log(
            chalk.inverse(`[${this.module.toUpperCase()}]`) + " " + message,
        );
    }

    async error(message: string) {
        await this.database.logs.create({
            data: {
                module: this.module,
                message: message,
            },
        });
        this.log(chalk.red("error") + " - " + message);

        const embed = new MessageEmbed()
            .setColor("#BF616A")
            .setTitle("❌ Something went wrong!")
            .setDescription(message);
        return { embeds: [embed] };
    }

    async warn(message: string) {
        await this.database.logs.create({
            data: {
                module: this.module,
                message: message,
            },
        });
        this.log(chalk.yellow("warn") + " - " + message);

        const embed = new MessageEmbed()
            .setColor("#EBCB8B")
            .setTitle("⚠️ Something went wrong!")
            .setDescription(message);
        return { embeds: [embed] };
    }

    async info(message: string) {
        await this.database.logs.create({
            data: {
                module: this.module,
                message: message,
            },
        });
        this.log(chalk.cyan("info") + " - " + message);
    }

    async debug(message: string) {
        await this.database.logs.create({
            data: {
                module: this.module,
                message: message,
            },
        });
        this.log(chalk.magenta("debug") + " - " + message);
    }

    async trace(message: string) {
        await this.database.logs.create({
            data: {
                module: this.module,
                message: message,
            },
        });
        this.log(chalk.magenta("trace") + " - " + message);
    }
}
