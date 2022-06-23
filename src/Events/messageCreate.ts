import { DiscordCommand } from "../Interfaces/DiscordCommand";
import { DiscordEvent } from "../Interfaces/DiscordEvent";

export const event: DiscordEvent = {
    name: 'messageCreate',
    run: (client, message) => {
        if (!message) return;
        // Check if the message is a mention of the bot
        if (message.content.includes("<@!846139750779715584>")) client.commands.get('help')!.run(client, message, []);

        // Check if the message was send by a bot, is not from a server, and make sure it starts with the prefix before we continue.
        if (message.author.bot || !message.guild || !message.content.startsWith(">")) return;

        // Get the arguments and requested query
        const args = message.content.slice(">".length).trim().split(/ +/g);
        const cmd = args.shift()!.toLowerCase();

        if (!cmd) return;

        // Run command
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) (command as DiscordCommand).run(client, message, args);
    }
}