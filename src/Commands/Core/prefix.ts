import { DiscordCommand } from "../../Interfaces";

export const command: DiscordCommand = {
    name: "prefix",
    description: "Manage the prefix(s).",
    aliases: [],
    module: "Core",
    usage: "[newPrefix || typeOfPrefix]",
    visable: true,
    permissions: [],
    permLevel: "MEMBER",
    run: async (client, message, args, member) => {
        return;
    }
}