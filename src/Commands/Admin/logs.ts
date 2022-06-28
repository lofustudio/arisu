import type { DiscordCommand } from "../../Interfaces";
import Log from "../../Interfaces/Log";

export const command: DiscordCommand = {
    name: "log",
    aliases: ["logs"],
    description: "Display all logs.",
    module: "Admin",
    visable: true,
    run: async (client, message) => {
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
        } else
            message.channel.send("No logs found.");

    },
};