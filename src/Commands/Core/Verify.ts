import { DiscordCommand } from "../../Interfaces/DiscordCommand";
import ErrorEmbed from "../../Embeds/ErrorEmbed";

export const command: DiscordCommand = {
    name: 'verify',
    description: 'Verify you\'re not a robot.',
    category: 'Core',
    aliases: [],
    visable: false,
    run: async (client, message) => {
        if (message.channelId !== '840354952860663858') return;
        const memberRole = message.guild.roles.cache.get('840301728817217606');
        const notVerifiedRole = message.guild.roles.cache.get('840362645085356052');
        const staffRole = message.guild.roles.cache.get('924024859556712489');
        const hasMemberRole = client.userDB.get(`${message.author.id}.roles.member`);

        if (message.member.roles.cache.has(staffRole.id)) return;

        if (hasMemberRole === true) {
            const res = await message.channel.send('You\'re already verified! Initiating verification protocals. One moment please...');
            message.member.roles.remove(notVerifiedRole);
            message.member.roles.add(memberRole);
            return setTimeout(() => {
                res.delete();
                message.delete();
            }, 10000);
        }

        try {
            client.userDB.set(`${message.author.id}.roles.member`, true);
            client.userDB.set(`${message.author.id}.roles.notVerify`, false);
            const res = await message.channel.send(`Verification complete!`);
            message.member.roles.remove(notVerifiedRole);
            message.member.roles.add(memberRole);
            res.delete();
            message.delete();
        } catch (err) {
            message.guild.members.cache.get('889270418786119681').send('Verification process failed! Error: ```\n' + err + '\n```');
            return ErrorEmbed(message, 'Verification process failed. A log has been sent to the staff team. Please try again later.');
        }
    }
}