import { DiscordCommand } from '../../Interfaces/DiscordCommand';

export const command: DiscordCommand = {
    name: 'ping',
    description: 'Check if the bot is alive.',
    category: 'Core',
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        message.channel.send(`Pong! \`${client.ws.ping}\`ms`);
    }
}