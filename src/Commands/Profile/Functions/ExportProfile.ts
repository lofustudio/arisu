import Client from '../../../Client';
import { Message } from 'discord.js';
import ErrorEmbed from "../../../Embeds/ErrorEmbed";
import { render } from 'prettyjson';

export default async function exportProfile(client: Client, message: Message, args: string[]) {
    if (message.member.id !== '889270418786119681') return message.channel.send('You don\'t have the correct permissions to use this command.');
    if (!args[1]) {
        const rawdata = client.userDB.get(`${message.author.id}`);
        const data = render(rawdata, { emptyArrayMsg: '[]', noColor: true });
        message.channel.send(`${message.author.tag}'s Data\n` + '```yaml\n' + data + '\n```');
    } else {
        const id = (message.mentions.members.first() || args[1]);
        message.guild.members.fetch(id).then((member) => { 
            const rawData = client.userDB.get(`${member.id}`);
            const data = render(rawData, { emptyArrayMsg: '[]', noColor: true });
            message.channel.send(`${member.user.tag}'s Data\n` + '```yaml\n' + data + '\n```');
        }).catch((err) => {
            return ErrorEmbed(message, 'An unexpected error occured!', err);
        });
    }
}