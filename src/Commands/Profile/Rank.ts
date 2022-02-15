import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: 'rank',
    description: 'View your rank.',
    category: 'Profile',
    aliases: ['level'],
    visable: true,
    run: async (client, message, args) => {

    }
}