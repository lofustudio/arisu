import type { DiscordEvent } from "../Interfaces";
import type { Message } from "discord.js";

export const event: DiscordEvent<"messageCreate"> = {
    name: "messageCreate",
    run: async (client, message: Message) => {
        if (!message) return;

        const guildPrefix = await client.database.guild.findFirst().then((data) => data?.prefix);
        const botPrefix = await client.database.bot.findFirst({ where: { id: message.guild?.id } }).then((data) => data?.prefix);
        const prefix = guildPrefix ?? botPrefix ?? ">"

        // Check if the message is a mention of the bot
        if (/^<@!?(\d{17,19})>/.test(message.content)) {
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
        const command = client.commands.get(cmd);
        if (command) command.run(client, message, args);
    },
};
