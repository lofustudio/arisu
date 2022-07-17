import type { DiscordCommand } from "../../Interfaces";
import extractID from "../../Utils/extractID";

export const command: DiscordCommand = {
    name: "unban",
    description: "Unan a user from the server.",
    module: "Moderation",
    aliases: [],
    usage: "<mention | id> [reason]",
    visable: true,
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    permLevel: "ADMIN",
    run: async (client, message, args) => {
        if (!message.member?.permissions.has(["ADMINISTRATOR", "BAN_MEMBERS"]))
            return message.channel.send("Sorry, you don't have the correct permissions to use this command.");
        if (!args[0]) return message.channel.send("Oops, you forgot to specify a user to unban.");

        const targetId = extractID(args[0]);
        if (!targetId) return message.reply("I couldn't find the user's ID.");

        const ban = await message.guild?.bans.fetch(targetId);
        if (!ban) return message.channel.send("I couldn't find that banned user.");

        let reason = args.length <= 1 ? args.slice(1).join(" ") : "No reason specified.";

        message.guild?.bans.remove(targetId, reason).then(() => {
            reason === "No reason specified." ?
                message.channel.send(`<@!${targetId}> has been unbanned.`) :
                message.channel.send(`<@!${targetId}> has been unbanned for \`${reason}\`.`);
        });
    }
}