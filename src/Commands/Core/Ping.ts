import { Command } from '../../Interfaces/Command';

export const command: Command = {
    name: 'ping',
    description: 'Check if the bot is alive.',
    category: 'Core',
    aliases: [],
    visable: true,
    run: async (client, message) => {
        message.channel.send(`Pong! \`${client.ws.ping}\`ms`);
    }
}