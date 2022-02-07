import { GuildMember, Message } from 'discord.js';
import Client from '../Client';

export default async function DeleteProfile(client: Client, message: Message) {
    const userDB = client.userDB;

    if (message.member.id !== '889270418786119681') return message.channel.send('You don\'t have the correct permissions to use this command.');
    const res = await message.channel.send('Are you sure you want to delete your profile? This action cannot be undone.');
    res.react('✅');
    res.react('❌');
    const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = res.createReactionCollector({ filter, time: 30000, max: 1 });
    collector.on('collect', (reaction) => {
        if (reaction.emoji.name === '✅') {
            userDB.delete(`${message.author.id}`);
            res.edit('Profile deleted.');
        } else if (reaction.emoji.name === '❌') {
            res.edit('Profile deletion cancelled.');
        }
    });
}