import { Permissions } from "discord.js";
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { Command } from "../../Interfaces/Command";
import { Warn } from "../../Interfaces/Warn";

export const command: Command = {
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
                const warn: Warn = {
                    num: amount,
                    reason: reason,
                    date: new Date().toLocaleString(),
                    timestamp: Date.now(),
                    moderator: message.author.tag
                };
                userDB.push(`${member.id}.warns.data`, warn);
            } catch (err) {
                console.log(err);
                ErrorEmbed(message, 'Failed to warn that member. The error has been logged. Please try again later.');
            }

            message.react('✅');

        // ID   
        } else {

        }
    }
}