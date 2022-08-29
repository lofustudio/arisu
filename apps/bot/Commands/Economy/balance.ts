import type { DiscordCommand } from "../../Interfaces";
import extractID from "../../Utils/extractID";

export const command: DiscordCommand = {
    name: "balance",
    description: "Check the user's balance.",
    module: "Economy",
    aliases: ["money", "bal"],
    usage: "[mention | id]",
    visable: true,
    permissions: [],
    permLevel: "MEMBER",
    run: async (client, message, args) => {
        if (args[0]) {
            if (!message.guild) return;
            const targetId = extractID(args[0]);
            if (!targetId) return message.reply("I couldn't find the user's ID.");

            const target = await client.database.guildUser.findUnique({
                where: {
                    globalUserId_guildId: {
                        globalUserId: targetId,
                        guildId: message.guild.id
                    }
                }
            })

            if (!target) {
                message.reply("I couldn't find the user.")
                return
            }

            // TODO: make a column to store money in
            message.reply(`${"Get username"} has ${"TODO"} ${"Cookies."}`)
        } else {
            const user = await client.database.guildUser.findUnique({
                where: {
                    globalUserId_guildId: {
                        globalUserId: message.author.id,
                        guildId: message.guild!.id
                    }
                }
            })

            message.reply(`You have ${"TODO"} ${"Cookies."}`)
        }
    },
};
