import type { DiscordEvent } from "../Interfaces";
import type { Message } from "discord.js";

export const event: DiscordEvent<"messageCreate"> = {
    name: "messageCreate",
    run: (client, message: Message) => {
        if (!message) return;
        // Check if the message is a mention of the bot
        if (/^<@!?(\d{17,19})>/.test(message.content))
            message.reply("Use `>help`!");

        // Check if the message was send by a bot, is not from a server, and make sure it starts with the prefix before we continue.
        if (
            message.author.bot ||
            !message.guild ||
            !message.content.startsWith(">")
        )
            return;

        // Get the arguments and requested query
        const args = message.content.slice(">".length).trim().split(/ +/g);
        const cmd = args.shift()?.toLowerCase();
        if (!cmd) return;

        // Run command
        const command = client.commands.get(cmd);
        if (command) command.run(client, message, args);
    },
};
