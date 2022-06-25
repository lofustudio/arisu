import { QuickDB } from "quick.db";
import { DiscordCommand } from "../../Interfaces";

export const command: DiscordCommand = {
    name: "log",
    aliases: ["logs"],
    description: "Display all logs.",
    module: "Admin",
    visable: true,
    run: async (client, message) => {
        const db = new QuickDB({ table: "logs" });
        const logs = await db.all();
        if (logs) {
            const modules = logs.map(log => log.value.module).filter((value, index, self) => self.indexOf(value) === index);
            let msg = "";
            modules.forEach(module => {
                const filtered: Array<string> = []
                logs.filter(log => log.value.module === module).forEach(log => {
                    filtered.push(log.value.value);
                });
                msg += `=== ${module[0].toUpperCase() + module.slice(1)} ===\n${filtered.join("\n")}\n\n`;
            });
            message.channel.send("```" + msg + "```");
        } else {
            message.channel.send("No logs found.");
        }
    }
}