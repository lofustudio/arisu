import { Command } from "../../Interfaces/Command";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'help',
    description: 'Provides infomation about Cookie.',
    category: 'Core',
    aliases: [],
    visable: true,
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setColor('#ffd1dc')
            .setDescription(`
            Hello! My name is ${client.user.username} 👋
            My prefix is \`${client.config.prefix}\`
            To get a list of commands, type \`${client.config.prefix}commands\`
            `);
        
        message.channel.send({ embeds: [embed]});
    }
}