import { MessageEmbed } from "discord.js";
import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: 'profile',
    description: 'View your profile.',
    category: 'Profile',
    aliases: ['account'],
    visable: true,
    run: async (client, message, args) => {
        const userDB = client.database.users;

        if (!args[0]) {
            const nick = userDB.get(`${message.author.id}.nickname`) || 'None';
            const embed = new MessageEmbed()
                .setTitle(`${message.member.user.tag}`)
                .setThumbnail(message.author.displayAvatarURL())
                .addField('• Info', `ID: **${message.author.id}**\nNickname: \`${nick}\``);

            if (userDB.get(`${message.author.id}.warns.amount`) >= 1) {
                const warnsObj = userDB.get(`${message.author.id}.warns`);
                embed.addField('• Warns', `${warnsObj.amount}`);
            }
            message.channel.send({ embeds: [embed] });
        } else {
            console.log('bruh')
        }
    }
}
