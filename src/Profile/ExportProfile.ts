import Client from '../Client';
import { Message } from 'discord.js';
import ErrorEmbed from "../Embeds/ErrorEmbed";
import { MessageEmbed } from "discord.js";
import { render } from 'prettyjson';

export default async function exportProfile(client: Client, message: Message, args: string[]) {
    const userDB = client.userDB;
    const RawData = client.userDB.get(message.member.id);
    const data = render(RawData, { noColor: true });

    if (message.member.id !== '889270418786119681') return message.channel.send('You don\'t have the correct permissions to use this command.');
    if (!args[1]) {
        const rawdata = userDB.get(`${message.author.id}`);
        const data = render(rawdata);
        message.channel.send(`${message.author.tag}'s Data\n` + '```yaml\n' + data + '\n```');
    } else {
        const id = (message.mentions.members.first() || args[1]);
        message.guild.members.fetch(id).then((member) => { 
            const rawData = userDB.get(`${member.id}`);
            const data = render(rawData, { emptyArrayMsg: '[]', noColor: true });
            message.channel.send(`${member.user.tag}'s Data\n` + '```yaml\n' + data + '\n```');
        }).catch((err) => {
            return ErrorEmbed(message, 'An unexpected error occured!', err);
        });
    }
}