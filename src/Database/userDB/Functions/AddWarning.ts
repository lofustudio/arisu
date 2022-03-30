import Cookie from '../../../Client';
import { GuildMember, MessageEmbed } from 'discord.js';
import { MemberWarning } from '../../../Interfaces/MemberWarning';

async function addWarning(client: Cookie, member: GuildMember, moderator: string, reason?: string) {
    try {
        let amount = client.database.users.get(`${member.id}.warns.amount`);
        amount++;
        const warn: MemberWarning = {
            num: amount,
            reason: reason || 'No reason provided',
            date: new Date().toLocaleString(),
            timestamp: Date.now(),
            moderator
        };
        client.database.users.push(`${member.id}.warns.data`, warn);
        client.database.users.set(`${member.id}.warns.amount`, amount);

        const embed = new MessageEmbed()
            .setTitle('You have been warned.')
            .setDescription(`Reason: ${reason}\nModerator: ${moderator}\n\nYou now have ${amount} warnings.`)
            .setThumbnail(member.avatarURL({ dynamic: true }));
        member.send({ embeds: [embed] });
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

export default addWarning;