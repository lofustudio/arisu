import type { DiscordCommand } from "../../Interfaces";
import Log from "../../Interfaces/Core/Log";

export const command: DiscordCommand = {
    name: "logs",
    description: "Display all logs.",
    module: "Owner",
    aliases: [],
    usage: "[module]",
    permissions: ["ADMINISTRATOR", "VIEW_AUDIT_LOG"],
    permLevel: "OWNER",
    visable: true,
    run: async (client, message, args) => {
        if (args.length >= 1) {
            const logs = await client.database.logs.findMany({ orderBy: { id: "asc" }, where: { module: args.join(" ") } });
            if (logs.length >= 1) {
                let msg = "";
                msg += `=== ${args.join(" ")[0].toUpperCase() + args.join(" ").slice(1)} ===\n${logs.map(log => log.message).join("\n")}`;
                if (msg.length > 1950) {
                    msg = msg.substring(0, 1950) + "..." + "\n\nFull list on dashboard.";
                }
                message.channel.send("```" + msg + "```");
            } else
                message.channel.send(`No logs found in the \`${args.join(" ")}\` module.`);

        } else {
            const logs = await client.database.logs.findMany({ orderBy: { id: "asc" } });
            if (logs) {
                const modules = logs.map((log: Log) => log.module).filter((value, index, self) => self.indexOf(value) === index);
                let msg = "";
                modules.forEach((module: string) => {
                    const filtered: Array<string> = [];
                    logs.filter(log => log.module === module).forEach(log => {
                        filtered.push(log.message);
                    });
                    msg += `=== ${module} ===\n${filtered.join("\n")}\n\n`;
                });
                if (msg.length > 1950) {
                    msg = msg.substring(0, 1950) + "..." + "\n\nFull list on dashboard.";
                }
                message.channel.send("```" + msg + "```");
            } else message.channel.send("No logs found.");
        }
    },
};