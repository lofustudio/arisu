import { DiscordCommand } from "../../Interfaces/DiscordCommand";
import { spawn } from "child_process";

export const command: DiscordCommand = {
    name: "update",
    description: "Updates the bot",
    category: "Owner",
    aliases: ["reload"],
    visable: false,
    run: async (client, message, args) => {
        if (message.member.roles.cache.find(r => r.id === '882750589350604851')) {
            message.channel.send('Executing update protocals... I will be temporarily offline as the bot updates. One moment please...').then(m => {
                spawn('node', ['./index.js'], {
                    stdio: 'inherit'
                });
            });
        } else {
            message.channel.send('You do not have permission to use this command.');
        }
    }
}