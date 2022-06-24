import { Message } from 'discord.js';
import { client } from '..';
import { DiscordCommand } from '../Interfaces/DiscordCommand';

export const command: DiscordCommand = {
    name: 'ping',
    description: 'Check if the bot is alive.',
    module: 'Core',
    aliases: [],
    visable: true,
    run: async (message: Message) => {
        message.channel.send(`Pong! \`${client.ws.ping}\`ms`);
    },
};
