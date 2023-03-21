import { Client, Collection } from "discord.js";
import type { DiscordCommand, DiscordEvent } from "@/Interfaces";
import path from "path";
import { readdirSync } from "fs";
import { prisma } from "@arisu/db";

class Arisu extends Client {
    public commands: Collection<string, DiscordCommand> = new Collection();
    public aliases: Collection<string, DiscordCommand> = new Collection();
    public events: Collection<string, DiscordEvent<never>> = new Collection();
    public database = prisma;

    public async init() {
        const eventPath = path.join(__dirname, "..", "Events");

        readdirSync(eventPath).forEach((file) => {
            const { event } = require(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            console.log("Loaded event: " + event.name);
            this.on(event.name, event.run.bind(null, this));
        });

        const commandPath = path.join(__dirname, "..", "Commands");

        readdirSync(commandPath).forEach((dir) => {
            const commandsList = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

            for (const file of commandsList) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
                console.log("Loaded command: " + command.name)
                if (command.aliases.length <= 0) {
                    if (command?.aliases.length !== 0) {
                        command.aliases.forEach((alias: string) => {
                            this.aliases.set(alias, command);
                        });
                    }
                }
            }
        });

        await this.login(process.env.TOKEN).then(() => {
            console.log("Logged into Discord.");
        });
    }
}

export default Arisu;