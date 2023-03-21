import type { DiscordCommand } from "@/Interfaces/Core/DiscordCommand";

export const command: DiscordCommand = {
    name: "ping",
    description: "Check if the bot is alive.",
    module: "Core",
    aliases: [],
    visable: true,
    permissions: [],
    permLevel: 1,
    usage: "ping",
    example: "ping",
    run: async (client, message) => {
        await message.channel.send(`Pong! \`${client.ws.ping}\`ms`);
    },
};