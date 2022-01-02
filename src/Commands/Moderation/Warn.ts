import { Permissions } from "discord.js";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'warn',
    description: 'Warn a member.',
    category: 'Moderation',
    aliases: ['wrn'],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You don\'t have the correct permissions to use this command.');

        // Mention
        if (args[0].includes('<@')) {
            
        // ID   
        } else {

        }
    }
}