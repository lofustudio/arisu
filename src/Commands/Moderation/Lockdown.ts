import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'lockdown',
    description: 'Lock the entire server.',
    aliases: [],
    category: 'Moderation',
    visable: true,
    run: async (client, message) => {
        if (!message.member.roles.cache.has('924024859556712489')) return message.channel.send("You don't have the correct permissions to use this command.");
        if (client.serverDB.has(`${message.guild.id}_lockdown`) === false) client.serverDB.set(`${message.guild.id}_lockdown`, false);

    }
}