import WarnEmbed from "../../Embeds/WarnEmbed";
import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: "prefix",
    description: "Manage the prefix for the bot.",
    category: "Moderation",
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_GUILD")) return WarnEmbed(message, "You don't have the correct permissions to use this command.");

        if (!args[0]) {
            const prefix = await client.database.settings.get('settings.prefix');
            return message.channel.send(`The current prefix is \`${prefix}\``);
        }
    }
}