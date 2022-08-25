import { GuildScheduledEventEntityTypes } from "discord.js/typings/enums";
import { DiscordCommand } from "../../Interfaces";
import extractID from "../../Utils/extractID";
import { GuildUser, Mute } from "@prisma/client";
import ms from "ms";

export const command: DiscordCommand = {
    name: "mute",
    description: "Mute a member in the server.",
    module: "Moderation",
    aliases: ["silence"],
    visable: true,
    permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
    permLevel: "MODERATOR",
    usage: "<user> <time> [reason] (-s)",
    run: async (client, message, args, member) => {
        const modModule = await client.database.moderation.findUnique({ where: { guildId: message.guild?.id } });
        if (modModule?.enabled === false) return message.channel.send("The `Moderation` module isn't enabled. Please enable the module and try again.");
        // TODO: consider <time> persistence (after restart)

        const targetId = extractID(args[0]);
        if (!targetId) return message.reply("I couldn't fetch that user.");

        const target = await message.guild?.members.fetch(targetId);
        if (!target) return message.channel.send("I couldn't find that user.");
        // TODO: check if user can be muted?

        const targetGuild = await client.database.guildUser.findUnique({ where: { globalUserId_guildId: { globalUserId: target.user.id, guildId: message.guild?.id as string } }, include: { mute: true } })
        if (targetGuild?.mute) {
            // TODO: ask if they want to add more time to the mute. Maybe return the mute editor or smth?
        }

        // if (/^\d+$/.test(args[1])) {
        const time = ms(args[1])
        console.log(time)
        // if (time >= 1) {
        //     setTimeout(() => {
        //         console.log("removing mute")
        //         target.roles.remove("997541110253637693")
        //     }, time * 1000)
        // }
        // }
    }
}