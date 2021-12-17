import { Message, MessageEmbed } from "discord.js";

function WarnEmbed(message: Message, value: string) {
    const embed = new MessageEmbed()
        .setColor("#EBCB8B")
        .setTitle("⚠️ Something went wrong!")
        .setDescription(value);

    message.channel.send({ embeds: [embed]});
}

export default WarnEmbed;