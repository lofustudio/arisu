import type { CurrencyJSON, DiscordCommand } from "../../Interfaces";
import extractID from "../../Utils/extractID";

export const command: DiscordCommand = {
    name: "balance",
    description: "Check the user's balance.",
    module: "Economy",
    aliases: ["money", "bal"],
    usage: "[mention | id]",
    example: "bal @tyger#0001",
    visable: true,
    permissions: [],
    permLevel: "MEMBER",
    run: async (client, message, args) => {
        const eco = await client.database.economy.findUnique({ where: { guildId: message.guild?.id } });
        const currency = eco?.currency as unknown as CurrencyJSON;
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

            message.reply(`${message.guild.members.cache.get(targetId)?.user.tag} has ${target.balance} ${currency.name}s.`)
        } else {
            const user = await client.database.guildUser.findUnique({
                where: {
                    globalUserId_guildId: {
                        globalUserId: message.author.id,
                        guildId: message.guild!.id
                    }
                }
            });

            message.reply(`You have ${user?.balance} ${currency.name}s.`)
        }
    },
};
