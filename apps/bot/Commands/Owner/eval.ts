import { DiscordCommand } from "../../Interfaces";
import { inspect } from "util";

export const command: DiscordCommand = {
    name: "eval",
    description: "Execute Javascript code and return the result.",
    module: "Owner",
    aliases: [],
    visable: false,
    usage: "<command>",
    example: "eval message.channel.send('among us')",
    permissions: [],
    permLevel: "MEMBER",
    run: async (client, message, args, member) => {
        if (member.database.global?.owner === false) return message.channel.send("bruh 🗿");
        function clean(text: any) {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            var code = args.join(" ").replaceAll("```", "");
            if (code.length < 1) {
                return message.channel.send("Please specify something to evaluate.");
            }
            // eslint-disable-next-line no-eval
            var evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = inspect(evaled);

            message.channel.send("```xl\n" + clean(evaled) + "\n```");
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}