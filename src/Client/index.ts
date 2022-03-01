import { Client, Collection, CommandInteractionOptionResolver } from 'discord.js';
import path from 'path';
import { table } from 'quick.db';
import { readdirSync } from 'fs';
import { DiscordCommand } from '../Interfaces/DiscordCommand';
import { DiscordEvent } from '../Interfaces/DiscordEvent';
import { BotConfig } from '../Interfaces/BotConfig';
import BotConfigJSON from '../config.json';
import Spinnies from 'spinnies'
import botDB from '../Database/botDB';
import userDB from '../Database/userDB';

class Cookie extends Client {
    public commands: Collection<string, DiscordCommand> = new Collection();
    public events: Collection<string, DiscordEvent> = new Collection();
    public config: BotConfig = BotConfigJSON;
    public aliases: Collection<string, DiscordCommand> = new Collection();

    public serverDB: table = new table('server', { filePath: './datbase/server.sqlite' });
    public mutesDB: table = new table('mutes', { filePath: './database/mutes.sqlite' });
    public tempBanDB: table = new table('tempbans', { filePath: './database/tempBans.sqlite' });
    public userDB: userDB = new userDB('users');
    public settings: botDB = new botDB('settings');
    public logger = new Spinnies({
        succeedPrefix: "✔",
        failPrefix: "✖",
    });

    public async init() {

        this.logger.add('login', { text: 'Logging in...', color: '' });
        this.login(this.config.token);
        this.settings.SyncSettings();
        this.logger.succeed('login', { text: 'Logged into Discord.' });


        /* Command handler */
        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.logger.add(command.name, { text: `Loading ${command.name}...`, });
                this.commands.set(command.name, command);

                if (command?.aliases.length !== 0) {
                    command.aliases.forEach((alias: string) => {
                        this.aliases.set(alias, command);
                    });
                }

                this.logger.succeed(command.name, { text: `Loaded command ${command.name}` });
            }
        });

        /* Event handler */
        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.logger.add(event.name, { text: `Loading ${event.name}...`, });
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
            this.logger.succeed(event.name, { text: `Loaded event ${event.name}` });
        });
    }
}

export default Cookie;