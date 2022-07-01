import { DiscordCommand } from "../../Interfaces";

export const command: DiscordCommand = {
    name: "db",
    description: "uhhh yeah idk",
    aliases: [],
    module: "Admin",
    visable: true,
    run: async (client, message, args) => {
        const user = await client.database.globalUser.findUnique({ where: { id: message.author.id } });
        if (user === null) {
            message.channel.send("You are not in the database. <:thonkbirb:840361328744988732>");
        } else {
            message.channel.send("```" + JSON.stringify(user) + "```");
        }
    }
}