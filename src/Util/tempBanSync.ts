import Client from '../Client';
import { MessageEmbed, TextChannel } from 'discord.js';
import ms from 'ms';

export default async function tempBanSync(client: Client) {
    console.log(`[TEMPBAN SYNC] - Sync started!`);
	const guild = client.guilds.cache.get('839886398466687016');

	const tempBanData = client.tempBanDB;

	tempBanData.all().map(x => ({
		ID: x.ID,
		data: x.data,
	})).forEach(x => {
		client.users.fetch(x.ID)
			.then(member => {
				const obj = JSON.parse(x.data);
				if (obj.expiresAt <= Date.now()) {
					console.log(`[TEMPBAN SYNC] - ${member.tag}'s temp ban is over, removing the ban.`);
					try {
						tempBanData.delete(x.ID);
						guild.members.unban(member.id);
					}
					catch (err) {
						return console.log(`[TEMPBAN SYNC ERROR] - Failed to unban ${member.tag}. ${err}`);
                    }

                    guild.channels.fetch('840296305502322709').then((channel: TextChannel) => {
                        if (channel != null) {
                            const embed = new MessageEmbed()
                                .setTitle('Tempban end')
                                .addField('User', member.tag + ' (ID: ' + member.id + ')')
                                .addField('After', ms(obj.expiresAt - obj.bannedAt, {
                                    long: true,
                                }), true)
                                .setFooter('Time:').setTimestamp();
                            channel.send({ embeds: [embed] });
                        }
                    });

				} else {
					console.log(`[TEMPBAN SYNC] - Starting ${member.tag}'s ban.`);
					setTimeout(() => {
						console.log(`[TEMPBAN SYNC] - ${member.tag}'s tempban is over, removing the ban.`);
						try {
							guild.members.unban(member.id);
							tempBanData.delete(x.ID);
						}
						catch (err) {
							return console.log(`[TEMPBAN SYNC ERROR] - Failed to unban ${member.tag}. ${err}`);
                        }
                        
                        guild.channels.fetch('840296305502322709').then((channel: TextChannel) => {
                            if (channel != null) {
                                const embed = new MessageEmbed()
                                    .setTitle('Unmute')
                                    .addField('User', member.tag + ' (ID: ' + member.id + ')')
                                    .addField('After', ms(obj.expiresAt - obj.bannedAt, {
                                        long: true,
                                    }), true)
                                    .setFooter('Time:').setTimestamp();
                                channel.send({ embeds: [embed] });
                            }
                        })
					}, obj.expiresAt - Date.now());
				}
			});
		console.log(`[TEMPBAN SYNC] - Found bans...`);
	});
}