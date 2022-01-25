import { MessageEmbed, TextChannel } from "discord.js";
import Client from '../Client';
import ms from "ms";

export default async function muteSync(client: Client) {
    console.log('[MUTE SYNC] - Sync started!');
	const guild = client.guilds.cache.get(client.config.guildID);
	const muteRole = guild.roles.cache.get('840342500555358258');

    const mutesData = client.mutesDB;
        
	mutesData.all().map(x => ({
		ID: x.ID,
		data: x.data,
	})).forEach(x => {
		guild.members.fetch(x.ID)
			.then(member => {
				const obj = JSON.parse(x.data);
				if (obj.expiresAt <= Date.now()) {
					console.log(`[MUTE SYNC] - ${member.user.tag}'s mute is over, removing mute.`);
					mutesData.delete(x.ID);
                    member.roles.remove(muteRole);
                    guild.channels.fetch('840296305502322709').then((channel: TextChannel) => {
                        if (channel != null) {
                            const embed = new MessageEmbed()
                                .setTitle('Unmute')
                                .addField('User', member.user.tag + ' (ID: ' + member.id + ')')
                                .addField('After', ms(obj.expiresAt - obj.mutedAt, {
                                    long: true,
                                }), true)
                                .setFooter('Time:').setTimestamp();
                            channel.send({ embeds: [embed] });
                        }
                    });
				}
				else {
					console.log(`[MUTE SYNC] - Starting ${member.user.tag}'s mute.`);
					setTimeout(() => {
						console.log(`[MUTE SYNC] - ${member.user.tag}'s mute is over, removing mute.`);
						mutesData.delete(x.ID);
                        member.roles.remove(muteRole);
                        guild.channels.fetch('840296305502322709').then((channel: TextChannel) => {
                            if (channel != null) {
                                const embed = new MessageEmbed()
                                    .setTitle('Unmute')
                                    .addField('User', member.user.tag + ' (ID: ' + member.id + ')')
                                    .addField('After', ms(obj.expiresAt - obj.mutedAt, {
                                        long: true,
                                    }), true)
                                    .setFooter('Time:').setTimestamp();
                                channel.send({ embeds: [embed] });
                            }
                        });
					}, obj.expiresAt - Date.now());
				}
			});
		console.log(`[MUTE SYNC] - Found mutes...`);
	});
}