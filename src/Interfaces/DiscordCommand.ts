import { Message } from 'discord.js';
import Client from '../Modules/Client';

interface Run {
    (client: Client, message: Message, args: string[]): void | Promise<void>;
}

export interface DiscordCommand {
    name: string;
    description: string;
    module: string;
    aliases: string[];
    visable: boolean;
    run: Run;
}
