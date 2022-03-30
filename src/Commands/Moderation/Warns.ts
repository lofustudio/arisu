import { MessageEmbed, Permissions } from "discord.js";
import { DiscordCommand } from "../../Interfaces/DiscordCommand";
import { MemberWarning } from "../../Interfaces/MemberWarning";
import { ServerWarnings } from "../../Interfaces/ServerWarnings";

export const command: DiscordCommand = {
    name: 'warns',
    description: 'Manage a members warnings.',
    category: 'Moderation',
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS || Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('You don\'t have the correct permissions to use this command.');

        if (!args[0]) {
            const warnObj: ServerWarnings = client.database.server.get(`${message.guild.id}.warns`);
            const embed = new MessageEmbed()
                .setTitle(`All warnings in ${message.guild.name}`)
            message.channel.send({ embeds: [embed] });
        }
        const warnsObj: ServerWarnings = client.database.users.get(`${message.member.id}.warns`);
    }
}