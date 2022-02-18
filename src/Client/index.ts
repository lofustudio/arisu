import { Client, Collection } from 'discord.js';
import path from 'path';
import { table } from 'quick.db';
import { readdirSync } from 'fs';
import next from 'next';
import express from 'express';
import * as dotenv from 'dotenv';
import { DiscordCommand } from '../Interfaces/DiscordCommand';
import { BotConfig } from '../Interfaces/BotConfig';
import BotConfigJSON from '../config.json';
import db from '../Database';

dotenv.config();

class Cookie extends Client {
    public commands: Collection<string, DiscordCommand> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: BotConfig = BotConfigJSON;
    public aliases: Collection<string, DiscordCommand> = new Collection();

    public serverDB: table = new table('server', { filePath: './datbase/server.sqlite' });
    public mutesDB: table = new table('mutes', { filePath: './database/mutes.sqlite' });
    public tempBanDB: table = new table('tempbans', { filePath: './database/tempBans.sqlite' });
    public userDB = new db.users('users');

    public async init() {
        this.login(this.config.token);

        /* Command handler */
        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                console.log(`Loading command: ${command.name}`);
                this.commands.set(command.name, command);

                if (command?.aliases.length !== 0) {
                    command.aliases.forEach((alias: string) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });

        /* Event handler */
        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            console.log(`Loading discord.js event: ${event.name}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });

        /* create and host an API on express with port 5000 */
        const api = express();

        api.get('/', (req, res) => {
            res.send('API is working!');
        });

        api.get('/api/users/:id', (req, res) => {
            const id = req.params.id;
            const user = this.userDB.get(id);
            res.send(user);
        });

        api.listen(4000, () => console.log('> API is running on port 4000'));

        // /* Dashboard */
        // const app = next({ dev: process.env.NODE_ENV !== 'production', dir: './dashboard', quiet: true });
        // const handle = app.getRequestHandler();

        // app.prepare().then(() => {
        //     const server = express();

        //     server.all('*', (req, res) => {
        //         return handle(req, res);
        //     });

        //     server.listen(3000, () => {
        //         console.log('> Dashboard is running on port 3000');
        //     });
        // });
    }
}

export default Cookie;