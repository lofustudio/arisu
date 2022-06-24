import { ClientEvents } from 'discord.js';

export interface DiscordEvent<T extends keyof ClientEvents> {
    name: T;
    add: () => void;
    run: (...args: ClientEvents[T]) => void | PromiseLike<void>;
}
