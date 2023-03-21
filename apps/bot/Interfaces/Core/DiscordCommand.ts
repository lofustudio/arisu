import type { Message, PermissionResolvable } from "discord.js";
import type Client from "@/Modules/Client";

interface Run {
    (
        client: Client,
        message: Message,
        args: string[],
    ): unknown;
}

export interface DiscordCommand {
    name: string;
    description: string;
    module: string;
    aliases: string[];
    visable: boolean;
    usage: string;
    example: string;
    permissions: PermissionResolvable[];
    permLevel: 0 | 1 | 2 | 3 | 4;
    run: Run;
}