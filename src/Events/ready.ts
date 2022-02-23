import Cookie from '../Client';
import { TextChannel, MessageEmbed } from 'discord.js';
import ms from 'ms';
import { DiscordEvent } from '../Interfaces/DiscordEvent';
import { Api } from '../API';

export const event: DiscordEvent = {
    name: 'ready',
    run: async (client: Cookie) => {
        console.log(`${client.user.tag} is online!`);
        console.log(`Prefix: ${client.settings.get('settings.general.prefix')}`);
        client.user.setActivity(`Doki Doki Literature Club`, { type: 'PLAYING' });

        // Mute Sync
        console.log('[MUTE SYNC] - Sync started!');
        const guildObj = client.guilds.cache.get(client.settings.get('settings.guildID'));
        const muteRole = guildObj.roles.cache.find(r => r.name.toLowerCase() === 'muted');
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
                                    .setFooter({ 'text': "Time:" }).setTimestamp();
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
                                        .setFooter({ text: 'Time:' }).setTimestamp();
                                    channel.send({ embeds: [embed] });
                                }
                            });
                        }, obj.expiresAt - Date.now());
                    }
                });
            console.log(`[MUTE SYNC] - Found mutes...`);
        });

        // TempBan Sync
        console.log(`[TEMPBAN SYNC] - Sync started!`);
        const guild = client.guilds.cache.get(client.settings.get('settings.general.guildID'));

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
                                    .setFooter({ text: 'Time:' }).setTimestamp();
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
                                        .setTitle('Unban')
                                        .addField('User', member.tag + ' (ID: ' + member.id + ')')
                                        .addField('After', ms(obj.expiresAt - obj.bannedAt, {
                                            long: true,
                                        }), true)
                                        .setFooter({ text: 'Time:' }).setTimestamp();
                                    channel.send({ embeds: [embed] });
                                }
                            })
                        }, obj.expiresAt - Date.now());
                    }
                });
            console.log(`[TEMPBAN SYNC] - Found bans...`);
        });

        const API = new Api(client);
        API.init();
    }
}