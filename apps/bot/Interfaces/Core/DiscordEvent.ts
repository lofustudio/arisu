import type { ClientEvents } from "discord.js";
import type ExtendedClient from "@/Modules/Client";

export interface DiscordEvent<T extends keyof ClientEvents> {
    name: T;
    run: (client: ExtendedClient, ...args: ClientEvents[T]) => void | PromiseLike<void>;
}