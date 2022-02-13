import { DiscordCommand } from "../Interfaces/DiscordCommand";
import { Message } from "discord.js";
import Cookie from "../Client";

export const event: Event = {
    name: 'messageCreate',
    run: (client: Cookie, message: Message) => {
        if (message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix)) return;

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (!cmd) return;
        // Update member
        client.userDB.SyncMember(message);
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) (command as DiscordCommand).run(client, message, args);
    }
}