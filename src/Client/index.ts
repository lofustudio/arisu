import { Client, Collection } from 'discord.js';
import path from 'path';
import { table } from 'quick.db';
import { readdirSync } from 'fs';
import next from 'next';
import express, { Request, Response } from 'express';
import { Command } from '../Interfaces/Command';
import { Event } from '../Interfaces/Event';
import { Config } from '../Interfaces/Config';
import ConfigJson from '../config.json';

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: Config = ConfigJson;
    public aliases: Collection<string, Command> = new Collection();

    public userDB: table = new table('roles');
    public serverDB: table = new table('server');
    public mutesDB: table = new table('mutes');
    public tempBanDB: table = new table('tempbans');

    public async init() {
        this.login(this.config.token);

        /* Command handler */
        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'));

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

        /* Dashboard */
        const dev = process.env.NODE_ENV !== "production";
        const app = next({ dev });
        const handle = app.getRequestHandler();
        const port = process.env.PORT || 3000;
    }
}

export default ExtendedClient;