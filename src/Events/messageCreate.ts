import { Event } from "../Interfaces/Event";
import { Command } from "../Interfaces/Command";
import { Message } from "discord.js";
import ProfileCheck from "../Util/ProfileCheck";

export const event: Event = {
    name: 'messageCreate',
    run: (client, message: Message) => {
        if (message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix)) return;

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (!cmd) return;
        ProfileCheck(client, message.member);
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) (command as Command).run(client, message, args);
    }
}