import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'ban',
    description: 'Bans a user from the server',
    category: 'Moderation',
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        message.react('⚠️');
    }
}