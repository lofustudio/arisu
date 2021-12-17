import { MessageEmbed, Permissions } from "discord.js";
import SuccessEmbed from "../../Embeds/SuccessEmbed";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'kick',
    description: 'Kick a user from the server.',
    category: 'Moderation',
    aliases: ['k'],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('Error! You don\'t have the correct permissions to use this command.');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0].toString());
        console.log(member);
        let reason = args.slice(1).join(' ') || 'No reason provided';
        if (!member) return message.channel.send('Error! You need to specify a user to kick.');
        if (!member.kickable) return message.channel.send('Error! I don\'t have the correct permissions to kick this user.');

        try {
            await member.kick(reason);
            const res = new MessageEmbed()
                .setDescription(`Successfully kicked \`${member.user.tag}\``);
            message.channel.send({ embeds: [res] });
        } catch (err) {
            console.error(err);
            message.channel.send('Error! An error occured while trying to kick this user.');
        }
    }
}