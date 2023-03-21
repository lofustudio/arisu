import { DiscordCommand, DiscordEvent } from "@/Interfaces";
import { Message } from "discord.js";

export const event: DiscordEvent<"messageCreate"> = {
    name: "messageCreate",
    run: async (client, message: Message) => {
        console.log(message)
        if (!message) return;
        const prefix = ">";

        // Check if the message is a mention of the bot
        const mention = /^<@!?(\d{17,19})>/.exec(message.content)
        if (mention && mention[1] === client.user?.id) {
            message.reply(`I'm currently listening for \`${prefix}\`.`);
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

        if (command) {
            command.run(client, message, args);
        }
    },
};