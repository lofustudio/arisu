import type { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: "ping",
    description: "Check if the bot is alive.",
    module: "Core",
    aliases: [],
    visable: true,
    run: (client, message) => {
        message.channel.send(`Pong! \`${client.ws.ping}\`ms`);
    },
};
