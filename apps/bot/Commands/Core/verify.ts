import { permissionLevel } from "@prisma/client";
import { DiscordCommand, PermLevel } from "../../Interfaces";

export const command: DiscordCommand = {
    name: "verify",
    description: "Verify you are not a robot.",
    module: "Core",
    aliases: [],
    usage: "",
    example: "verify",
    visable: false,
    permissions: [],
    permLevel: "NOT_VERIFIED",
    run: async (client, message, args, member, prefix) => {
        if (PermLevel[member.database.guild?.permissionLevel as permissionLevel] != 0)
            return message.channel.send("You are already verified.");

        // TODO: Add a question or query to actually verify if they are a bot. (Toggleable in the config)

        await client.database.guildUser.update({
            data: {
                permissionLevel: "MEMBER",
            },
            where: {
                globalUserId_guildId: {
                    globalUserId: member.database.global?.id as string,
                    guildId: member.database.guild?.guildId as string
                }
            }
        });

        // TODO: Add verified role here.

        message.channel.send("You have successfully been verified.");
    }
}