import { Permissions } from "discord.js";
import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: 'warn',
    description: 'Warn a member.',
    category: 'Moderation',
    aliases: ['wrn'],
    visable: true,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention or provide a user ID to warn.');
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You don\'t have the correct permissions to use this command.');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0].replace(/[<@!>]/g, ''));
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!member) return message.channel.send('I couldn\'t find that member. Please try warning them with their user ID instead.');

        client.database.users.addWarning(client, member, message.author.tag, reason);
        message.react('✅');
    }
}