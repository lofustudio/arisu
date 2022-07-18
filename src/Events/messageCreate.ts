import { DiscordCommand, DiscordEvent, PermLevel } from "../Interfaces";
import { Message } from "discord.js";
import { permissionLevel } from "@prisma/client";

export const event: DiscordEvent<"messageCreate"> = {
    name: "messageCreate",
    run: async (client, message: Message) => {
        if (!message) return;
        const guildPrefix = await client.database.guild.findFirst().then((data) => data?.prefix);
        const botPrefix = await client.database.bot.findFirst({ where: { id: message.guild?.id } }).then((data) => data?.prefix);
        const userPrefix = await client.database.globalUser.findFirst({ where: { id: message.author.id } }).then((data) => data?.prefix);
        const prefix = userPrefix ?? guildPrefix ?? botPrefix ?? ">"

        // Check if the message is a mention of the bot
        const mention = /^<@!?(\d{17,19})>/.exec(message.content)
        if (mention && mention[1] === client.user?.id) {
            message.reply("My prefix is `" + prefix + "`!");
        }

        // Check if the message was send by a bot, is not from a server, and make sure it starts with the prefix before we continue.
        if (
            message.author.bot ||
            !message.guild ||
            !message.content.startsWith(prefix)
        )
            return;

        // Get the arguments and requested query
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift()?.toLowerCase();
        if (!cmd) return;

        // Run command
        const command: DiscordCommand | undefined = client.commands.get(cmd) || client.aliases.get(cmd);
        const member = await message.guild.members.fetch({ user: message.author });
        let globalUser = await client.database.globalUser.findUnique({ where: { id: message.author.id }, include: { profile: true } });
        let guildUser = await client.database.guildUser.findUnique({ where: { globalUserId_guildId: { globalUserId: message.author.id, guildId: message.guild.id } }, include: { mute: true } });
        let guild = await client.database.guild.findUnique({ where: { id: message.guild.id } });

        // Check if member has guildUser and globalUser
        let loadingMessage: Message | null = null;
        if (!globalUser) {
            loadingMessage = await message.channel.send("Creating User...");
            await client.database.globalUser.create({
                data: {
                    id: member.user.id,
                }
            });

            globalUser = await client.database.globalUser.findUnique({ where: { id: message.author.id }, include: { profile: true } });
        }

        if (!guild) {
            if (loadingMessage) {
                loadingMessage.edit("Creating server config...");
            } else {
                loadingMessage = await message.channel.send("Creating server config...");
            }

            // Create the guild modal.
            await client.database.guild.create({
                data: {
                    id: message.guild.id,
                }
            });

            await client.database.moderation.create({
                data: { guildId: message.guild.id }
            });

            await client.database.economy.create({
                data: { guildId: message.guild.id }
            });

            await client.database.social.create({
                data: { guildId: message.guild.id }
            });

            guild = await client.database.guild.findUnique({ where: { id: message.guild.id } });
        }

        if (!guildUser) {
            if (loadingMessage) {
                loadingMessage.edit("Creating your profile...");
            } else {
                loadingMessage = await message.channel.send("Creating your profile...");
            }
            await client.database.guildUser.create({
                data: {
                    globalUserId: member.user.id,
                    guildId: message.guild.id
                }
            });

            guildUser = await client.database.guildUser.findUnique({ where: { globalUserId_guildId: { globalUserId: message.author.id, guildId: message.guild.id } }, include: { mute: true } });
        }

        if (typeof loadingMessage != null) {
            loadingMessage?.delete();
        }

        if (command) {
            if (PermLevel[guildUser?.permissionLevel as permissionLevel] === 0) {
                message.reply(`You need to use \`${guild?.prefix}verify\` to prove you're not a robot before you can use any commands.`);
                return;
            }

            if (PermLevel[command?.permLevel as permissionLevel] > PermLevel[guildUser?.permissionLevel as permissionLevel]) {
                message.channel.send(`You don't have permission to use this command. Permission level \`${command?.permLevel}\` is required.`);
                return;
            }

            if (
                member.permissions.has(command.permissions)
                &&
                PermLevel[command?.permLevel as permissionLevel] <= PermLevel[guildUser?.permissionLevel as permissionLevel]
            )
                command.run(client, message, args, { discord: { global: message.author, guild: member }, database: { global: globalUser, guild: guildUser } }, prefix);
        }
    },
};
