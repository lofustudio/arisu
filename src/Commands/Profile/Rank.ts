import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'rank',
    description: 'View your rank.',
    category: 'Profile',
    aliases: ['level'],
    visable: true,
    run: async (client, message, args) => {
        const userDB = client.userDB;
    }
}