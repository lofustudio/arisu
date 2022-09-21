import type { DiscordCommand } from "../../Interfaces/Core/DiscordCommand";

export const command: DiscordCommand = {
    name: "ping",
    description: "Check if the bot is alive.",
    module: "Core",
    aliases: [],
    visable: true,
    permissions: [],
    permLevel: "MEMBER",
    usage: "ping",
    example: "ping",
    run: (client, message) => {
        message.channel.send(`Pong! \`${client.ws.ping}\`ms`);
    },
};
