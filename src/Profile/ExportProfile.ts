import Client from '../Client';
import { Message } from 'discord.js';
import ErrorEmbed from "../Embeds/ErrorEmbed";
import { MessageEmbed } from "discord.js";

export default async function exportProfile(client: Client, message: Message, args: string[]) {
    const userDB = client.userDB;

    if (message.member.id !== '889270418786119681') return message.channel.send('You don\'t have the correct permissions to use this command.');
    if (args[1]) {
        const id = (message.mentions.members.first() || args[1]);
        message.guild.members.fetch(id).then((member) => {
            const data = userDB.get(`${member.id}`);
            const embed = new MessageEmbed()
                .setTitle(`${member.user.tag}`)
                .setThumbnail(member.displayAvatarURL())
                .setDescription(JSON.stringify(data));
            message.channel.send({ embeds: [embed] });
        }).catch((err) => {
            ErrorEmbed(message, 'An unexpected error occured! ```\n' + err + '\n```');
            return console.log(err);
        });
    } else {
        const data = userDB.get(`${message.author.id}`);
        const embed = new MessageEmbed()
            .setTitle(`${message.member.user.tag}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(JSON.stringify(data));
        message.channel.send({ embeds: [embed] });
    }
}