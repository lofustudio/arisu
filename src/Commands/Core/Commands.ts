import { MessageEmbed } from "discord.js";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: "commands",
    description: "Lists all commands",
    category: "Core",
    aliases: ["cmds"],
    visable: true,
    run: async (client, message, args) => {
        if (!args[0]) {
            const core = client.commands.filter(x => x.category === "Core").map((x) => '`' + x.name + '`').join(', ');
            const moderation = client.commands.filter(x => x.category === "Moderation").map((x) => '`' + x.name + '`').join(', ');

            const embed = new MessageEmbed()
                .setColor('#ffd1dc')
                .setAuthor('Commands')
                .addField("Core", core, false)
                // .addField("Moderation", moderation, false)
                .setFooter(`To find more info on a specific command, use ${client.config.prefix}commands [command]`)
            
            message.channel.send({ embeds: [embed] }, );
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args[0].toLowerCase()));
            if (!command) return message.channel.send('That command does not exist!');

            const embed = new MessageEmbed()
                .setColor('#ffd1dc')
                .setAuthor(`Command: ${command.name}`)
                .addField("Description", command.description, false)
                .addField("Category", command.category, true)
                .addField("Aliases", command.aliases.length >= 1 ? command.aliases.join(', ') : 'None', true);
            
            message.channel.send({ embeds: [embed] });
        }
    }
}