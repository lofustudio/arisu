import { Command } from "../../Interfaces/Command";
import ErrorEmbed from "../../Embeds/ErrorEmbed";

export const command: Command = {
    name: 'verify',
    description: 'Verify you\'re not a robot.',
    category: 'Core',
    aliases: [],
    visable: false,
    run: async (client, message) => {
        if (message.channelId !== '840354952860663858') return;
        const memberRole = message.guild.roles.cache.get('840301728817217606');
        const notVerifiedRole = message.guild.roles.cache.get('840362645085356052');
        const hasMemberRole = client.userDB.get(`${message.author.id}.roles.member`);

        if (hasMemberRole === true) return message.channel.send('You\'re already a member!');

        try {
            client.userDB.set(`${message.author.id}.roles.member`, true);
            client.userDB.set(`${message.author.id}.roles.notVerify`, false);
            message.channel.send(`Verification complete!`);
            message.member.roles.remove(notVerifiedRole);
            message.member.roles.add(memberRole);
        } catch (err) {
            message.guild.members.cache.get('889270418786119681').send('Verification process failed! Error: ```\n' + err + '\n```');
            return ErrorEmbed(message, 'Verification process failed. A log has been sent to the moderators. Please try again later.');
        }
    }
}