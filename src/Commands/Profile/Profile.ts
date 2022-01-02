import { MessageEmbed } from "discord.js";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'profile',
    description: 'View your profile.',
    category: 'Profile',
    aliases: ['p'],
    visable: true,
    run: async (client, message, args) => {
        if (!args[0]) {
            const embed = new MessageEmbed()
                .setTitle(`${message.member.user.tag}`)
                .setThumbnail(message.author.displayAvatarURL())
                .addField('• Info', `ID: **${message.author.id}**\n
                Joined: **${message.member.joinedAt}**\n
                Created: **${message.author.createdAt}**\n
                `)
            message.channel.send({ embeds: [embed] });
        }
    }
}