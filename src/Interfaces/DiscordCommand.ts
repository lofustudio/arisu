import { GlobalUser, GuildUser, permissionLevel } from "@prisma/client";
import type { GuildMember, Message, PermissionResolvable, User } from "discord.js";
import type Client from "../Modules/Client";

interface Run {
    (client: Client, message: Message, args: string[], member: { discord: { global: User, guild: GuildMember }, database: { global: GlobalUser | null, guild: GuildUser | null } }, prefix: string): unknown;
}

export interface DiscordCommand {
    name: string;
    description: string;
    module: string;
    aliases: string[];
    visable: boolean;
    usage: string;
    permissions: PermissionResolvable;
    permLevel: permissionLevel;
    run: Run;
}
