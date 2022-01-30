import { MessageEmbed, Permissions } from "discord.js"
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { DiscordCommand } from "../../Interfaces/DiscordCommand"

export const command: DiscordCommand = {
    name: 'unban',
    description: 'Unbans a user from the server',
    category: 'Moderation',
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You don\'t have the correct permissions to use this command.');

        if (args[0].includes('<@')) return message.channel.send('Please provide a member ID instead on mentioning the member.')
        const user = await client.users.fetch(args[0].toString());
        const member = message.guild.members.cache.get(user.id);

        let reason = args.slice(1).join(' ') || 'No reason provided';

        if (!user) return message.channel.send('Error! You need to specify the user\'s ID to unban them.');
        if (member) return message.channel.send('The user you specified isn\'t banned.');

        let res = `Successfully unbanned \`${user.tag}\``
        if (reason != 'No reason provided') {
            res += ` with reason: \`${reason}\``;
        }

        try {
            message.guild.members.unban(user, reason);
            const embed = new MessageEmbed()
                .setDescription(res)
                .setColor('#f3aca0');
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            ErrorEmbed(message, 'Failed to unban the user. Please try again later.');
        }
    }
}