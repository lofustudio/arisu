import { Message, MessageEmbed } from "discord.js";

function ErrorEmbed(message: Message, value: string, err: Error) {
    if (err) console.log(err);
    const embed = new MessageEmbed()
        .setColor("#BF616A")
        .setTitle("❌ Something went wrong!")
        .setDescription(value + '```\n' + err + '\n```');

    message.channel.send({ embeds: [embed] });
}

export default ErrorEmbed;