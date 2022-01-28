import { MessageEmbed } from "discord.js";
import { Command } from "../../Interfaces/Command";
import deleteProfile from "../../Profile/DeleteProfile";
import DisplayWarns from "../../Profile/DisplayWarns";
import exportProfile from "../../Profile/ExportProfile";

export const command: Command = {
    name: 'profile',
    description: 'View your profile.',
    category: 'Profile',
    aliases: ['p'],
    visable: true,
    run: async (client, message, args) => {
        const userDB = client.userDB;

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
            switch (args[0].toString().toLowerCase()) {

                // Moderation
                case 'warns': {
                    DisplayWarns(client, message);
                }
                    break;

                // Management
                case 'export': {
                    exportProfile(client, message, args);
                }
                    break;

                case 'delete': {
                    deleteProfile(client, message);
                }
                    break;
            }
        }
    }
}