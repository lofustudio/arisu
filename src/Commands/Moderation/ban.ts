import { permissionLevel } from "@prisma/client";
import type { DiscordCommand } from "../../Interfaces";
import extractID from "../../Utils/extractID";

export const command: DiscordCommand = {
    name: "ban",
    description: "Ban a user from the server.",
    module: "Moderation",
    aliases: [],
    usage: "<mention | id> [reason] [-s]",
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    permLevel: "ADMIN",
    visable: true,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("Oops, you forgot to specify a user to ban.");

        const targetId = extractID(args[0]);
        if (!targetId) return message.reply("I couldn't find the user's ID.");

        const member = await message.guild?.members.fetch(targetId);
        if (!member) return message.channel.send("I couldn't find that user.");
        if (!member.bannable) return message.channel.send("I don't have the correct permissions to ban that user.");

        let reason = args.slice(1).length >= 1 ? args[args.length - 1] === "-s" ? args.slice(1, args.length - 1).join(" ") : args.slice(1).join(" ") : "No reason specified.";
        if (args[args.length - 1] !== "-s") {
            member.send(`You have been banned from ${message.guild?.name}.\nReason: ${reason}`).catch((err) => {
                client.log.command.warn("Unable to DM a user being banned.");
            });
        }

        member.ban({ reason }).then(() => {
            reason === "No reason specified." ?
                message.channel.send(`<@!${targetId}> has been banned.`) :
                message.channel.send(`<@!${targetId}> has been banned for \`${reason}\`.`);
        });
    }
}