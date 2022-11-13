import { Client, Collection } from "discord.js";
import type { DiscordCommand, DiscordEvent } from "../Interfaces";
import path from "path";
import { readdirSync } from "fs";
import { Logger } from "./Logger";
import { prisma } from "@arisu/database";

class Cookie extends Client {
    public commands: Collection<string, DiscordCommand> = new Collection();
    public aliases: Collection<string, DiscordCommand> = new Collection();
    public events: Collection<string, DiscordEvent<never>> = new Collection();
    public database = prisma;
    public log: {
        init: Logger,
        bot: Logger,
        event: Logger,
        command: Logger
    } = {
            init: new Logger("Init"),
            bot: new Logger("Bot"),
            event: new Logger("Event"),
            command: new Logger("Command")
        };

    public async init() {
        await this.log.init.info("Booting up...");

        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach((file) => {
            const { event } = require(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
            this.log.init.trace("Loaded event: " + event.name);
        });

        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach((dir) => {
            const commandsList = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

            for (const file of commandsList) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
                if (command.aliases.length <= 0)
                    this.log.init.trace("Loaded command: " + command.name);


                if (command?.aliases.length !== 0)
                    command.aliases.forEach((alias: string) => {
                        this.aliases.set(alias, command);
                        this.log.init.trace(`Added alias for ${command.name}: ` + `"${alias}"`);
                    });

            }
        });

        await this.login(process.env.TOKEN).then(() => {
            this.log.init.info("Connected to Discord.")
        });
    }
}

export default Cookie;