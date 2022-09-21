import { DiscordCommand } from "../../Interfaces";

export const command: DiscordCommand = {
    name: "perm",
    description: "Manage a users permission level.",
    aliases: ["perms"],
    module: "Moderation",
    permissions: ["ADMINISTRATOR", "MANAGE_ROLES"],
    permLevel: "ADMIN",
    usage: "<@user || @role || list> [set || remove] [PermLevel]",
    example: "perm @tyger#0001 set owner",
    visable: true,
    run: async (client, message, args, member, prefix) => {
        if (!args[0]) return message.reply(`You need to provide a user or a role. Example: \`${member.database.global?.prefix ?? prefix}${command.usage}\``);

        function sendList() {
            return message.channel.send("You can either provide the permission node number or name. \nExample: `" + prefix + command.example + "`\n```\n0 = NOT_VERIFIED\n1 = MEMBER\n2 = MODERATOR\n3 = ADMIN\n4 = OWNER\n```");
        }

        if (args[0] === "list") return sendList();
        const user = await message.guild?.members.fetch(args[0]).then((member) => {
            if (member.id) return member.user;
            else return null;
        }).catch((err) => {
            return err;
        });

        const role = await message.guild?.roles.fetch(args[0]).then((role) => {
            if (role?.id) return role;
            else return null;
        }).catch((err) => {
            return err;
        });

        if (user) {
            switch (args[1]) {
                case "set": {
                    if (!args[2]) return sendList();

                    break;
                };

                case "remove": {
                    break;
                };
            }
        } else if (role) {

        } else return message.channel.send("I couldn't find that user / role. Please check the ID or mention and make sure its correct.");
    }
}