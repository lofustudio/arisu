import { MessageEmbed, Permissions } from "discord.js";
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: 'kick',
    description: 'Kick a user from the server.',
    category: 'Moderation',
    aliases: ['k'],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('Error! You don\'t have the correct permissions to use this command.');

        if (args[0].includes('<@')) {
            const member = message.mentions.members.first();
            const reason = args.slice(1).join(' ') || 'No reason provided';
            if (!member) return message.channel.send('I could\'t find that member.');
            if (!member.kickable) return message.channel.send('I am not able to kick users that have higher privileges than me.');

            try {
                await member.kick(reason);
            } catch (err) {
                console.log(err);
                return ErrorEmbed(message, 'Failed to kick that member.', err);
            }

            let res = `Successfully kicked \`${member.user.tag}\``;
            if (reason != 'No reason provided') {
                res += ` with reason: \`${reason}\``;
            }

            const embed = new MessageEmbed()
                .setDescription(res)
                .setColor('#f3aca0');

            message.channel.send({ embeds: [embed] });
        } else {
            const reg = new RegExp('^[0-9]*$');
            if (reg.test(args[0]) === false) return message.channel.send('Please provide a valid ID.');
            const reason = args.slice(1).join(' ') || 'No reason provided';

            await message.guild.members.fetch(args[0]).then(async (member) => {
                if (!member.kickable) return message.channel.send('I am unable to kick a member with higher privileges than me.');

                try {
                    member.kick(reason);
                } catch (err) {
                    console.log(err);
                    return ErrorEmbed(message, 'Failed to kick that member.', err);
                }

                let res = `Successfully kicked \`${member.user.tag}\``;
                if (reason != 'No reason provided') {
                    res += ` with reason: \`${reason}\``;
                }

                const embed = new MessageEmbed()
                    .setDescription(res)
                    .setColor('#f3aca0');
                message.channel.send({ embeds: [embed] });
            });
        }
    }
}