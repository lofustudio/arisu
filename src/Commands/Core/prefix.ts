import { MessageEmbed } from "discord.js";
import { DiscordCommand } from "../../Interfaces";

export const command: DiscordCommand = {
    name: "prefix",
    description: "Manage the prefix(s).",
    aliases: [],
    module: "Core",
    usage: "[newPrefix || typeOfPrefix]",
    visable: true,
    permissions: [],
    permLevel: "MEMBER",
    run: async (client, message, args, member, prefix) => {
        if (!args[0]) {
            const botPrefix = await client.database.bot.findUnique({ where: { id: client.user?.id } }).then((data) => data?.prefix);
            const guildPrefix = await client.database.guild.findUnique({ where: { id: message.guild?.id } }).then((data) => data?.prefix);
            const userPrefix = await client.database.globalUser.findUnique({ where: { id: message.author.id } }).then((data) => data?.prefix);

            const embed = new MessageEmbed()
                .setTitle(`I'm currently listening for the prefix \`${prefix}\``)
                .setDescription(`I listen to specific prefixes depending if they have been set or not.\n\nUser prefix: \`${userPrefix ?? "None"}\`\nGuild Prefix: \`${guildPrefix ?? "None"}\`\nBot Prefix: \`${botPrefix}\``);
            message.channel.send({ embeds: [embed] });
        } else {
            if (/^[0-9]+$/.test(args[0]) === true)
                return message.channel.send("I'm sorry, numbers are not allowed.");

            switch (args[0]) {
                case "guild" || "server": {
                    if (!args[1])
                        return message.channel.send(`You need to provide a new prefix for the server. Example: \`${prefix}\`prefix guild <prefix>\``);
                    if (member.database.guild?.permissionLevel === "ADMIN") {
                        await client.database.guild.update({
                            data: {
                                prefix: args[1],
                            },
                            where: {
                                id: message.guild?.id
                            }
                        }).then(() => {
                            message.channel.send(`I have updated the guild prefix to \`${args[1]}\`.`);
                        });
                    } else {
                        message.channel.send("You do not have permission to update the guild prefix.");
                    }
                }
                    break;

                case "bot" || client.user?.username: {
                    if (!args[1])
                        return message.channel.send(`You need to provide a new prefix for the bot config. Example: \`${prefix}prefix bot <prefix>\``);
                    if (member.database.global?.owner === true) {
                        await client.database.bot.update({
                            data: {
                                prefix: args[1],
                            },
                            where: {
                                id: client.user?.id
                            }
                        }).then(() => {
                            message.channel.send(`I have updated my global prefix to \`${args[0]}\`.`);
                        });
                    } else {
                        message.channel.send(`Nice try.`);
                    }
                }
                    break;

                default: {
                    await client.database.globalUser.update({
                        data: {
                            prefix: args[0],
                        },
                        where: {
                            id: message.author.id
                        }
                    }).then(() => {
                        message.channel.send(`Your user prefix was updated to \`${args[0]}\`.`);
                    });
                }
            }
        }
    }
}