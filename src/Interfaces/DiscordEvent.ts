import Client from '../Client';
import { ClientEvents, Message } from 'discord.js';

interface Run {
    (client: Client, message?: Message, ...args: string[]): void;
}

export interface DiscordEvent {
    name: keyof ClientEvents;
    run: Run;
}