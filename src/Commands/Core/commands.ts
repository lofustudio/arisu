import { permissionLevel } from "@prisma/client";
import { MessageEmbed } from "discord.js";
import { DiscordCommand, PermLevel } from "../../Interfaces";

export const command: DiscordCommand = {
    name: "commands",
    description: "Display all avalible commands.",
    aliases: ["cmds"],
    module: "Core",
    permissions: [],
    permLevel: "MEMBER",
    usage: "[module || command]",
    visable: true,
    run: async (client, message, args, member, prefix) => {
        if (!args[0]) {
            const AllCommands = client.commands.filter(commands => commands.visable === true).filter(commands => PermLevel[commands?.permLevel as permissionLevel] <= PermLevel[member.database.guild?.permissionLevel as permissionLevel]);
            const embed = new MessageEmbed()
                .setTitle("Commands")
                .setFooter({ text: `Use "${prefix}commands [command]" to find more infomation about a specific command.` })

            // ew
            const core = AllCommands.filter(x => x.module === "Core").map((x) => '`' + x.name + '`').join(", ");
            core.length >= 1 ? embed.addField("Core", core) : null;
            const mod = AllCommands.filter(x => x.module === "Moderation").map((x) => '`' + x.name + '`').join(", ");
            mod.length >= 1 ? embed.addField("Moderation", mod) : null;
            const utils = AllCommands.filter(x => x.module === "Utilities").map((x) => '`' + x.name + '`').join(", ");
            utils.length >= 1 ? embed.addField("Utilities", utils) : null;
            const eco = AllCommands.filter(x => x.module === "Economy").map((x) => '`' + x.name + '`').join(", ");
            eco.length >= 1 ? embed.addField("Economy", eco) : null;
            const music = AllCommands.filter(x => x.module === "Music").map((x) => '`' + x.name + '`').join(", ");
            music.length >= 1 ? embed.addField("Music", music) : null;
            const social = AllCommands.filter(x => x.module === "Social").map((x) => '`' + x.name + '`').join(", ");
            social.length >= 1 ? embed.addField("Social", social) : null;

            const owner = AllCommands.filter(x => x.module === "Owner").map((x) => '`' + x.name + '`').join(", ");
            owner.length >= 1 ? embed.addField("Owner", owner) : null;

            message.channel.send({ embeds: [embed] });
        } else {
            const commands = client.commands
                .filter(commands => commands.visable === true)
                .filter(commands => PermLevel[commands?.permLevel as permissionLevel] <= PermLevel[member.database.guild?.permissionLevel as permissionLevel])
                .filter(command => command.name === args[0]);

            if (commands.size > 1) {
                let num = 0;
                const embed = new MessageEmbed()
                    .setTitle("Which command would you like to view?")
                    .setDescription(commands.map((command) => `${num++}. \`${command.name} [${command.module}]\``).join("\n"));

                message.channel.send({ embeds: [embed] });
            } else {
                console.log(command)
                console.log(prefix)
                const embed = new MessageEmbed()
                    .setTitle(command.name)
                    .setFields([
                        { name: "Description", value: command.description },
                        { name: "Module", value: command.module },
                        { name: "Usage", value: `${prefix}${command.name} ${command.usage}` },
                        { name: "Permission Lvl", value: `${command.permLevel}` },
                    ]);

                command.permissions.length >= 1 ? embed.addField("Permissions", command.permissions.length > 1 ? command.permissions.join(", ") : command.permissions[0].toString()) : null;
                command.aliases.length >= 1 ? embed.addField("Alias(s)", command.aliases.length > 1 ? command.aliases.join(", ") : command.aliases[0]) : null;


                message.channel.send({ embeds: [embed] });
            }
        }
    }
}