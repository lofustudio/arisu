import { table } from "quick.db";
import ms from "ms";
import { TextChannel, MessageEmbed, Guild, Role } from "discord.js";
import Cookie from "../../Client";

class tempBanDB extends table {
    public database = new table('tempbans');
    public SyncTempBans(client: Cookie, guild: Guild) {
        this.database.all().map(x => ({
            ID: x.ID,
            data: x.data,
        })).forEach(x => {
            client.users.fetch(x.ID)
                .then(member => {
                    const obj = JSON.parse(x.data);
                    if (obj.expiresAt <= Date.now()) {
                        console.log(`[TEMPBAN SYNC] - ${member.tag}'s temp ban is over, removing the ban.`);
                        try {
                            this.database.delete(x.ID);
                            guild.members.unban(member.id);
                        }
                        catch (err) {
                            return console.log(`[TEMPBAN SYNC ERROR] - Failed to unban ${member.tag}. ${err}`);
                        }

                        guild.channels.fetch('840296305502322709').then((channel: TextChannel) => {
                            if (channel != null) {
                                const embed = new MessageEmbed()
                                    .setTitle('Tempban End')
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
                                this.database.delete(x.ID);
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
    }

}

export default tempBanDB;

