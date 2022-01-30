import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: 'mute',
    category: 'Moderation',
    description: 'Mute a member.',
    aliases: ['silence'],
    visable: true,
    run: async (client, message, args) => {
        message.react('⚠️');
    }
}