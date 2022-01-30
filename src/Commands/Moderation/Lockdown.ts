import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: 'lockdown',
    description: 'Lock the entire server.',
    aliases: [],
    category: 'Moderation',
    visable: true,
    run: async (client, message) => {
        if (!message.member.roles.cache.has('924024859556712489')) return message.channel.send("You don't have the correct permissions to use this command.");
        if (client.serverDB.has(`${message.guild.id}.lockdown`) === false) client.serverDB.set(`${message.guild.id}.lockdown`, false);

        if (client.serverDB.get(`${message.guild.id}.lockdown`) === false) {
            client.serverDB.set(`${message.guild.id}.lockdown`, true);
            const categories =
                message.channel.send('Lockdown has been enabled.');
        } else {
            client.serverDB.set(`${message.guild.id}.lockdown`, false);
            message.channel.send('Lockdown has been disabled.');
        }
    }
}