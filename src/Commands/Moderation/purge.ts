import { DiscordCommand } from "../../Interfaces";
import extractID from "../../Utils/extractID";

export const command: DiscordCommand = {
    name: "purge",
    description: "Bulk delete a set number of messages.",
    module: "Moderation",
    aliases: [],
    permissions: ["MANAGE_MESSAGES"],
    permLevel: "MODERATOR",
    usage: "<amount> [user] -f",
    visable: true,
    run: async (client, message, args, member, prefix) => {
        if (!args[0])
            return message.channel.send(`You need to specify the amount of messages to purge. Example: \`${prefix}purge 10\``);

        else {
            if (!/^\d+$/.test(args[0]))
                return message.channel.send("You need to specify a number of messages to delete.");

            let amount = parseInt(args[0]);

            // I love you most <3 - nyan
            // me more smh - ty

            let loadingMessage = await message.channel.send(`Please wait...`);
            const messages = await (await message.channel.messages.fetch({ limit: amount, before: message.id })).filter(messages => !messages.pinned);

            if (args[1]) {
                const user = message.guild?.members.cache.get(extractID(args[1]) as string);
                if (!user) return loadingMessage.edit("I couldn't find that user.");

                messages.filter(messages => messages.author.id === user?.id).map(message => {
                    if (message.deletable) {
                        message.delete();
                    }
                });

                return loadingMessage.edit(`I have deleted ${amount} messages that was sent by ${user?.user.tag}.`);
            } else {
                messages.map(message => {
                    if (message.deletable) {
                        message.delete();
                    }
                });

                return loadingMessage.edit(`I have deleted ${amount} messages.`);
            }
        }
    }
}