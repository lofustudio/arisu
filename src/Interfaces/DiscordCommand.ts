import Client from '../Client';
import { Message } from 'discord.js';

interface Run {
    (client: Client, message: Message, args: string[]): void | Promise<void>;
}

export interface DiscordCommand {
    name: string;
    description: string;
    category: string;
    aliases?: string[];
    visable?: boolean;
    run: Run;
}