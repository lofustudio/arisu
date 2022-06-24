import { Client, ClientEvents, Collection, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { Logger } from './Modules/Core/logger';
import * as event from './Events';
import * as command from './Commands';
import { DiscordCommand, DiscordEvent } from './Interfaces';

dotenv.config();
const log = new Logger('init');
log.info('Starting Cookie...');

export const events = new Collection<string, DiscordEvent<any>>();
export const commands = new Collection<string, DiscordCommand>();
export const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    presence: {
        activities: [
            {
                name: 'Doki Doki Literature Club',
                type: 'PLAYING',
            },
        ],
    },
});

for (const e of Object.values(event)) {
    events.set(e.name, e);
    e.add();
    log.trace('Loaded event: ' + e.name);
}

for (const e of Object.values(command)) {
    commands.set(e.name, e);
    log.trace('Loaded command: ' + e.name);
    if (e.aliases.length > 0)
        e.aliases.forEach((alias) => {
            commands.set(alias, e);
            log.trace('Loaded alias: ' + alias);
        });
}

client.login(process.env.TOKEN);
