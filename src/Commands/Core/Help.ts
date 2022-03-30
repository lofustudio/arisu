import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { DiscordCommand } from "../../Interfaces/DiscordCommand";

export const command: DiscordCommand = {
    name: "help",
    description: "An introduction to the bot",
    category: "Core",
    aliases: [],
    visable: true,
    run: async (client, message, args) => {
        const tygerObj = client.users.cache.get('889270418786119681');

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Dashboard')
                    .setStyle('LINK')
                    .setURL('https://cookie.tygr.dev')
            )
            .addComponents(
                new MessageButton()
                    .setLabel('Add me!')
                    .setStyle('LINK')
                    .setURL('https://github.com/tygerxqt/cookie/wiki')
            )

        const embed = new MessageEmbed()
            .setColor('#ffd1dc')
            .setTitle("Hello! My name is " + client.user.username)
            .setDescription('Click on one of the buttons below to get started!')
            .setFooter({ text: `Developed by ` + tygerObj.tag, iconURL: tygerObj.displayAvatarURL() })
        message.channel.send({ embeds: [embed], components: [row] });
    }
}