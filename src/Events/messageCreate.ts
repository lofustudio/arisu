import { DiscordCommand } from "../Interfaces/DiscordCommand";
import { Message } from "discord.js";
import Cookie from "../Client";
import { DiscordEvent } from "../Interfaces/DiscordEvent";
import ProfileSchema from "../Schemas/ProfileSchema";

export const event: DiscordEvent = {
    name: 'messageCreate',
    run: (client: Cookie, message: Message) => {
        if (message.author.bot || !message.guild || !message.content.startsWith(client.settings.get('settings.prefix'))) return;

        const args = message.content.slice(client.settings.get('settings.prefix').length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (!cmd) return;

        // Update member
        const memberID = message.author.id;

        // Check if there is any data missing for the member
        Object.keys(ProfileSchema).forEach(key => {
            if (!client.userDB.has(`${memberID}.${key}`)) {
                client.userDB.set(`${memberID}.${key}`, ProfileSchema[key]);
            }
        });

        // Fetch for the updated data
        const profile = client.userDB.get(`${memberID}`);

        // Check for any data that isn't in the schema
        Object.keys(profile).forEach(key => {
            if (!ProfileSchema.hasOwnProperty(key)) {
                client.userDB.delete(`${memberID}.${key}`);
            }
        })

        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) (command as DiscordCommand).run(client, message, args);
    }
}