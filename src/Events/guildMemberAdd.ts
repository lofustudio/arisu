import { GuildMember, TextChannel } from "discord.js";
import { Event } from "../Interfaces/Event";

export const event: Event = {
    name: 'guildMemberAdd',
    run: async (client, member: GuildMember) => {
        const memberRole = member.guild.roles.cache.get('840301728817217606');
        const verifyRole = member.guild.roles.cache.get('840362645085356052');

        if (client.userDB.get(`${member.id}.roles.member`) === true) {
            member.roles.add(memberRole);
            member.guild.channels.fetch('839892175961194516').then((channel: TextChannel) => {
                channel.send(`Welcome back to tyger's valley, <@!${member.id}> 🌸`)
            });
        }

        else {
            member.roles.add(verifyRole);
        }
    }
}