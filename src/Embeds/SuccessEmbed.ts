import { Message, MessageEmbed } from "discord.js";

function SuccessEmbed(message: Message, title: string, value: string) {
    const embed = new MessageEmbed()
        .setColor("#A3BE8C")
        .setTitle(`✅ ${title}`)
        .setDescription(value)

    message.channel.send({ embeds: [embed] });
}

export default SuccessEmbed;