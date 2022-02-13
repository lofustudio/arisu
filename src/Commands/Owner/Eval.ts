import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: 'eval',
    description: 'Execute a command in the console.',
    category: 'Owner',
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        if (message.author.id !== client.config.ownerID) return message.channel.send('nice try');

        const clean = async (text) => {
            // If our input is a promise, await it before continuing
            if (text && text.constructor.name == "Promise")
            text = await text;
            
            // If the response isn't a string, `util.inspect()`
            // is used to 'stringify' the code in a safe way that
            // won't error out on objects with circular references
            // (like Collections, for example)
            if (typeof text !== "string")
            text = require("util").inspect(text, { depth: 1 });
            
            // Replace symbols with character code alternatives
            text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
            
            return text;
        }

        try {
            // Evaluate (execute) our input
            if (args.join(" ").includes('client.token')) return message.channel.send('yeahhhhhh no.');
            const evaled = eval(args.join(" "));
      
            // Put our eval result through the function
            // we defined above
            const cleaned = await clean(evaled);
      
            // Reply in the channel with our result
            message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
        } catch (cleaned) {
            // Reply in the channel with our error
            message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
        }
    }
}