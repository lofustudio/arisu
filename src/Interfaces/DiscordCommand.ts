import { GlobalUser, GuildUser, Mute, permissionLevel, Profile } from "@prisma/client";
import type { GuildMember, Message, PermissionResolvable, User } from "discord.js";
import type Client from "../Modules/Client";

interface Run {
    (
        client: Client,
        message: Message,
        args: string[],
        member: {
            discord: {
                global: User,
                guild: GuildMember
            },
            database: {
                global: (GlobalUser & { profile: Profile | null }) | null,
                guild: (GuildUser & { mute: Mute | null }) | null
            }
        },
        prefix: string
    ): unknown;
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
