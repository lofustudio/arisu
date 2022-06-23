import { Client, Collection } from 'discord.js';
import path from 'path';
import { readdirSync } from 'fs';
import { DiscordCommand } from '../Interfaces/DiscordCommand';
import { DiscordEvent } from '../Interfaces/DiscordEvent';

class Cookie extends Client {
    public commands: Collection<string, DiscordCommand> = new Collection();
    public events: Collection<string, DiscordEvent> = new Collection();
    public aliases: Collection<string, DiscordCommand> = new Collection();

    public async init() {
        console.log("Starting Cookie...")
        this.login(process.env.TOKEN);

        /* Command handler */
        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);
                process.env.TS_NODE_DEV === "true" || process.env.NODE_ENV === "development" ? console.log("[CMDS HANDLER] Loaded command: " + command.name) : null;

                if (command?.aliases.length !== 0) {
                    command.aliases.forEach((alias: string) => {
                        this.aliases.set(alias, command);
                        process.env.TS_NODE_DEV === "true" || process.env.NODE_ENV === "development" ? console.log("[CMDS HANDLER] Loaded aliases: " + alias + "for command: " + command) : null;
                    });
                }
            }
        });
        console.log("[BOT] Loaded commands.")

        /* Event handler */
        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            process.env.TS_NODE_DEV === "true" || process.env.NODE_ENV === "development" ? console.log("[EVNTS HANDLER] Loaded command: " + event.name) : null;
            this.on(event.name, event.run.bind(null, this));
        });
        console.log("[BOT] Loaded events.")
    }
}

export default Cookie;