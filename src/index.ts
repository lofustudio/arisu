import { Intents } from 'discord.js';
import Client from './Modules/Client';
import dotenv from "dotenv";

dotenv.config();

new Client({
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
                name: 'The Cookie Jar',
                type: 'WATCHING',
            },
        ],
    },
}).init();
