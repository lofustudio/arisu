import { MessageEmbed, Permissions } from "discord.js";
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { DiscordCommand } from "../../Interfaces/DiscordCommand";
import { MemberWarning } from "../../Interfaces/MemberWarning";

export const command: DiscordCommand = {
    name: 'warn',
    description: 'Warn a member.',
    category: 'Moderation',
    aliases: ['wrn'],
    visable: true,
    run: async (client, message, args) => {
        const userDB = client.userDB;
        if (!args[0]) return message.channel.send('Please mention or provide a user ID to warn.');
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You don\'t have the correct permissions to use this command.');

        // Mention
        if (args[0].includes('<@')) {
            const member = message.mentions.members.first();
            const reason = args.slice(1).join(' ') || 'No reason provided';
            const oldAmount = userDB.get(`${member.id}.warns.amount`) || 0;

            if (!member) return message.channel.send('I couldn\'t find that member. Please try warning them with their user ID instead.');

            try {
                let amount = userDB.get(`${member.id}.warns.amount`);
                if (amount === undefined) amount = 0;
                amount++;
                userDB.set(`${member.id}.warns.amount`, amount);
                const warn: MemberWarning = {
                    num: amount,
                    reason: reason,
                    date: new Date().toLocaleString(),
                    timestamp: Date.now(),
                    moderator: message.author.tag
                };
                userDB.push(`${member.id}.warns.data`, warn);

                message.react('✅');
                const embed = new MessageEmbed()
                    .setTitle('You have been warned.')
                    .setDescription(`Reason: ${reason}\nModerator: ${message.author.tag}\n\nYou now have ${amount} warnings.`)
                    .setThumbnail(member.avatarURL({ dynamic: true }));
                member.send({ embeds: [embed] });
                
            } catch (err) {
                return ErrorEmbed(message, 'An unexpected error occured!', err);
            }
        } else {
            const reg = new RegExp('^[0-9]*$');
            if (reg.test(args[0]) === false) return message.channel.send('Please enter a valid ID.');
            
            message.guild.members.fetch(args[0]).then((member) => {
                const reason = args.slice(1).join(' ') || 'No reason provided';
                let amount = userDB.get(`${member.id}.warn.amount`);
                if (amount === undefined) amount = 0;
                amount++;
                userDB.set(`${member.id}.warns.amount`, amount);
                const warn: MemberWarning = {
                    num: amount,
                    reason,
                    date: new Date().toLocaleString(),
                    timestamp: Date.now(),
                    moderator: message.author.tag
                };
                userDB.push(`${member.id}.warns.data`, warn);

                message.react('✅');
                const embed = new MessageEmbed()
                    .setTitle('You have been warned.')
                    .setDescription(`Reason: ${reason}\nModerator: ${message.author.tag}\n\nYou now have ${amount} warnings.`)
                    .setThumbnail(member.avatarURL({ dynamic: true }));
                member.send({ embeds: [embed] });
            })
            .catch((err) => {
                return ErrorEmbed(message, 'An unexpected error occured!', err);
            });
        }
    }
}