import { Message, MessageEmbed } from "discord.js";
import ExtendedClient from "../Client";

export default function DisplayWarns(client: ExtendedClient, message: Message) {
    const userDB = client.userDB;
    const warnsObj = userDB.get(`${message.author.id}.warns`);
    const embed = new MessageEmbed()
        .setTitle(`${message.member.user.tag}'s warns`)
        .setThumbnail(message.author.displayAvatarURL())
    warnsObj.data.map(warn => {
        embed.addField(`[${warn.num}] - ${warn.date}`, `Reason: ${warn.reason}\nModerator: ${warn.moderator}`);
    });
    message.channel.send({ embeds: [embed] });
}