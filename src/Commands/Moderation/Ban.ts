import { Command } from "../../Interfaces/Command";
import { Permissions } from "discord.js";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'ban',
    description: 'Bans a user from the server',
    category: 'Moderation',
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('Error! You don\'t have the correct permissions to use this command.');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0].toString());
        console.log(member);
        let reason = args.slice(1).join(' ') || 'No reason provided';
        if (!member) return message.channel.send('Error! You need to specify a user to ban.');
        if (!member.bannable) return message.channel.send('Error! I don\'t have the correct permissions to ban this user.');

        try {
            await member.ban({ reason: reason });
            const res = new MessageEmbed()
                .setDescription(`Successfully banned \`${member.user.tag}\``);
            message.channel.send({ embeds: [res] });
        } catch (err) {
            console.error(err);
            message.channel.send('Error! An error occured while trying to kick this user.');
        }
    }
}