import { MessageEmbed } from "discord.js";
import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: "commands",
    description: "Lists all commands",
    category: "Core",
    aliases: ["cmds"],
    visable: true,
    run: async (client, message, args) => {
        if (!args[0]) {
            if (message.author.id === client.database.settings.get(`settings.owner.id`)) {
                const core = client.commands.filter((command) => command.category === "Core").map((x) => '`' + x.name + '`').join(", ");
                const moderation = client.commands.filter((command) => command.category === "Moderation").map((x) => '`' + x.name + '`').join(", ");
                const owner = client.commands.filter((command) => command.category === "Owner").map((x) => '`' + x.name + '`').join(", ");
                const profile = client.commands.filter((command) => command.category === "Profile").map((x) => '`' + x.name + '`').join(", ");

                const embed = new MessageEmbed()
                    .setColor('#ffd1dc')
                    .setAuthor({ name: 'Commands [Admin]' })
                    .addField('Core', core, false)
                    .addField('Moderation', moderation, false)
                    .addField('Owner', owner, false)
                    .addField('Profile', profile, false)

                message.channel.send({ embeds: [embed] });

            } else {
                const core = client.commands.filter((command) => command.category === "Core" && command.visable === true).map((x) => '`' + x.name + '`').join(', ');
                const moderation = client.commands.filter((command) => command.category === "Moderation" && command.visable === true).map((x) => '`' + x.name + '`').join(', ');
                const profile = client.commands.filter((command) => command.category === "Profile" && command.visable === true).map((x) => '`' + x.name + '`').join(', ');

                const embed = new MessageEmbed()
                    .setColor('#ffd1dc')
                    .setAuthor({ name: 'Commands' })
                    .addField("Core", core, false)
                    .addField("Moderation", moderation, false)
                    .addField("Profile", profile, false)
                    .setFooter({ text: `To find more info on a specific command, use ${client.database.settings.get('settings.prefix')}commands [command]` })

                message.channel.send({ embeds: [embed] });
            }

        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args[0].toLowerCase()));
            if (!command) return message.channel.send('That command does not exist!');

            const embed = new MessageEmbed()
                .setColor('#ffd1dc')
                .setAuthor({ name: `${command.name}` })
                .addField("Description", command.description, false)
                .addField("Category", command.category, true)
                .addField("Aliases", command.aliases.length >= 1 ? command.aliases.join(', ') : 'None', true);

            message.channel.send({ embeds: [embed] });
        }
    }
}