import { Message } from 'discord.js';

interface Run {
    (message: Message, args: string[]): void | Promise<void>;
}

export interface DiscordCommand {
    name: string;
    description: string;
    module: string;
    aliases: string[];
    visable: boolean;
    run: Run;
}
