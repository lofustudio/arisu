import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { splitBar } from "string-progressbar";
import { Command } from "../../Interfaces/Command";

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
                    const warnsObj = userDB.get(`${message.author.id}.warns`);
                    const embed = new MessageEmbed()
                        .setTitle(`${message.member.user.tag}'s warns`)
                        .setThumbnail(message.author.displayAvatarURL())
                    warnsObj.data.map(warn => {
                        embed.addField(`[${warn.num}] - ${warn.date}`, `Reason: ${warn.reason}\nModerator: ${warn.moderator}`);
                    });
                    message.channel.send({ embeds: [embed] });
                }
                    break;

                // Management
                case 'export': {
                    if (message.member.id !== '889270418786119681') return message.channel.send('You don\'t have the correct permissions to use this command.');
                    const data = userDB.get(`${message.author.id}`);
                    const embed = new MessageEmbed()
                        .setTitle(`${message.member.user.tag}`)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setDescription(JSON.stringify(data));
                    message.channel.send({ embeds: [embed] });
                }
                    break;
                
                case 'delete': {
                    if (message.member.id !== '889270418786119681') return message.channel.send('You don\'t have the correct permissions to use this command.');
                    const res = await message.channel.send('Are you sure you want to delete your profile? This action cannot be undone.');
                    res.react('✅');
                    res.react('❌');
                    const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                    const collector = res.createReactionCollector({ filter, time: 30000, max: 1 });
                    collector.on('collect', (reaction) => {
                        if (reaction.emoji.name === '✅') {
                            userDB.delete(`${message.author.id}`);
                            res.edit('Profile deleted.');
                        } else if (reaction.emoji.name === '❌') {
                            res.edit('Profile deletion cancelled.');
                        }
                    });
                }
                    break;
            }
        }
    }
}