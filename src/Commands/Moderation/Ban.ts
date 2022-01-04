import { Command } from "../../Interfaces/Command";
import { Permissions } from "discord.js";
import { MessageEmbed } from "discord.js";
import ErrorEmbed from "../../Embeds/ErrorEmbed";

export const command: Command = {
    name: 'ban',
    description: 'Bans a user from the server',
    category: 'Moderation',
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You don\'t have the correct permissions to use this command.');

        // mentions
        if (args[0].includes('<@')) {
            const member = message.mentions.members.first();
            const reason = args.slice(1).join(' ') || 'No reason provided';

            if (!member) return message.channel.send('I couldn\'t find that member. Please try banning them with their user ID instead.');
            if (!member.bannable) return message.channel.send('I am not able to ban users that have higher privileges than me.');
            try {
                await member.ban({ reason: reason });
                let res = `Successfully banned \`${member.user.tag}\``;
                if (reason != 'No reason provided') {
                    res += ` with reason: \`${reason}\``;
                }

                const embed = new MessageEmbed()
                    .setDescription(res)
                message.channel.send({ embeds: [embed] });
            } catch (err) {
                console.log(err);
                ErrorEmbed(message, 'Failed to ban that member. The error has been logged. Please try again later.');
            }
        // ID
        } else {
            const reg = new RegExp('^[0-9]*$');
            if (reg.test(args[0]) === false) return message.channel.send('Please provide a valid ID.');
            const reason = args.slice(1).join(' ') || 'No reason provided';

            await message.guild.members.fetch(args[0]).then(async (member) => {
                if (!member.bannable) return message.channel.send('I am unable to ban a member with higher privileges than me.');

                try {
                    member.ban({ reason: reason });
                } catch (err) {
                    console.log(err);
                    ErrorEmbed(message, 'Failed to ban that member. The error has been logged. Please try again later.');
                }

                let res = `Successfully banned \`${member.user.tag}\``;
                if (reason != 'No reason provided') {
                    res += ` with reason: \`${reason}\``;
                }
                
                const embed = new MessageEmbed()
                    .setDescription(res)
                    .setColor('#f3aca0');
                message.channel.send({ embeds: [embed] });

            }).catch(err => {
                console.log(err);
                return message.channel.send('I could\'t find that member. Please check if the ID your provided is correct.');
            });
        }
    }
}