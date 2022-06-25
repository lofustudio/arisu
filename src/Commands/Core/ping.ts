import { DiscordCommand } from '../../Interfaces/DiscordCommand';

export const command: DiscordCommand = {
    name: 'ping',
    description: 'Check if the bot is alive.',
    module: 'Core',
    aliases: [],
    visable: true,
    run: async (client, message) => {
        message.channel.send(`Pong! \`${client.ws.ping}\`ms`);
    },
};
