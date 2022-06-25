/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Collection } from "discord.js";
import type { DiscordCommand, DiscordEvent } from "../Interfaces";
import path from "path";
import { readdirSync } from "fs";
import { QuickDB } from "quick.db";
import { Logger } from "./Logger";

class ExtendedClient extends Client {
    public commands: Collection<string, DiscordCommand> = new Collection();
    public events: Collection<string, DiscordEvent<never>> = new Collection();
    public log: {
        init: Logger,
        bot: Logger,
        event: Logger,
    } = {
            init: new Logger("Init"),
            bot: new Logger("Bot"),
            event: new Logger("Event"),
        };

    public async init() {
        // TODO: Add if no config, then set up here
        const db = new QuickDB({ table: "logs" });
        await db.deleteAll();
        this.log.init.info("Starting Cookie...");

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
                        this.commands.set(alias, command);
                        this.log.init.trace("Loaded command: " + command.name + ` (${command.aliases.join(", ")})`);
                    });

            }
        });

        this.login(process.env.TOKEN);
    }
}

export default ExtendedClient;