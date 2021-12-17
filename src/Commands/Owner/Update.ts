import { Command } from "../../Interfaces/Command";
const exec = require('child_process').exec;

export const command: Command = {
    name: "update",
    description: "Updates the bot",
    category: "Owner",
    aliases: ["reload"],
    visable: false,
    run: async (client, message, args) => {
        if (message.member.roles.cache.find(r => r.id === '882750589350604851')) {
            exec('git pull', (err, stdout) => {
                let response = (err || stdout);
                if (!err) {
                    if (response.includes('Already up to date.')) {
                        message.channel.send('Bot already up to date. No changes since last pull.');
                    } else {
                        message.channel.send('Pulled from GitHub. Restarting. \n\nLogs: \n```' + response + '```');
                        setTimeout(() => {
                            process.exit();
                        }, 1000);
                    };
                }
            });
        } else {
            message.channel.send('You do not have permission to use this command.');
        }
    }
}