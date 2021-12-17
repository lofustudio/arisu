import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'mute',
    category: 'Moderation',
    description: 'Mute a member.',
    aliases: ['silence'],
    visable: true,
    run: async (client, message, args) => {
        message.react('⚠️');
    }   
}