import { table } from "quick.db";
import ms from "ms";
import { TextChannel, MessageEmbed, Guild, Role } from "discord.js";

class mutesDB extends table {
    public database = new table('mutes');
    public SyncMutes(guild: Guild, muteRole: Role) {
        this.database.all().map(x => ({
            ID: x.ID,
            data: x.data,
        })).forEach(x => {
            guild.members.fetch(x.ID)
                .then(member => {
                    const obj = JSON.parse(x.data);
                    if (obj.expiresAt <= Date.now()) {
                        this.database.delete(x.ID);
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
                            this.database.delete(x.ID);
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
    }
}

export default mutesDB;