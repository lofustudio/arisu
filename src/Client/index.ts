import { Client, Collection } from 'discord.js';
import path from 'path';
import { readdirSync } from 'fs';
import { DiscordCommand } from '../Interfaces/DiscordCommand';
import { DiscordEvent } from '../Interfaces/DiscordEvent';
import { BotConfig } from '../Interfaces/BotConfig';
import BotConfigJSON from '../config.json';
import Spinnies from 'spinnies';
import botDB from '../Database/botDB';
import userDB from '../Database/userDB';
import mutesDB from '../Database/mutesDB';
import tempBanDB from '../Database/tempBanDB';
import serverDB from '../Database/serverDB';
import SetUp from './setup';

class Cookie extends Client {
    public commands: Collection<string, DiscordCommand> = new Collection();
    public events: Collection<string, DiscordEvent> = new Collection();
    public config: BotConfig = BotConfigJSON;
    public aliases: Collection<string, DiscordCommand> = new Collection();

    private serverDB: serverDB = new serverDB('server');
    private mutesDB: mutesDB = new mutesDB('mutes');
    private tempBanDB: tempBanDB = new tempBanDB('tempbans');
    private usersDB: userDB = new userDB('users');
    private botDB: botDB = new botDB('settings');

    public database = {
        server: this.serverDB,
        mutes: this.mutesDB,
        tempBans: this.tempBanDB,
        users: this.usersDB,
        settings: this.botDB
    }

    public logger = new Spinnies({
        succeedPrefix: "✔",
        failPrefix: "✖",
    });

    public async init() {
        if (this.database.settings.has('settings.firstTime') === false) return SetUp(this);
        this.logger.add('login', { text: 'Logging in...' });
        this.login(this.config.token);
        this.database.settings.SyncSettings();
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