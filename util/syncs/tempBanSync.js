const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = async (client) => {
    console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(' - Sync started!'));
    let guild = client.guilds.cache.get(client.config.guild.id);
    let modlog = guild.channels.cache.get(client.config.channels.logs.mod);

    const tempBanData = client.tempBanDB;

    tempBanData.all().map(x => ({
        ID: x.ID,
        data: x.data
    })).forEach(x => {
        client.users.fetch(x.ID)
            .then(user => {
                const obj = JSON.parse(x.data);
                if (obj.expiresAt <= Date.now()) {
                    console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(` - ${user.tag}'s temp ban is over, removing the ban.`));
                    try {
                        tempBanData.delete(x.ID);
                        guild.member.unban(user.id);
                    } catch (err) {
                        return console.log(chalk.bgRed('[TEMPBAN SYNC ERROR]'), chalk.red(`- Failed to unban ${user.tag}. ${err}`));
                    }
                    if (modlog != null) {
                        let embed = new MessageEmbed()
                            .setTitle('Temp ban end')
                            .addField("User", user.tag + " (ID: " + user.id + ")")
                            .addField("After", ms(obj.expiresAt - obj.mutedAt, {
                                long: true
                            }), true)
                            .setFooter("Time:").setTimestamp()
                        modlog.send({ embeds: [embed] });
                    }
                } else {
                    console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(` - Starting ${user.tag}'s ban.`));
                    setTimeout(() => {
                        console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(` - ${user.tag}'s tempban is over, removing the ban.`));
                        try {
                            guild.member.unban(user.id);
                            tempBanData.delete(x.ID);
                        } catch (err) {
                            return console.log(chalk.bgRed('[TEMPBAN SYNC ERROR]'), chalk.red(`- Failed to unban ${user.tag}. ${err}`));
                        }
                        if (modlog != null) {
                            let embed = new MessageEmbed()
                                .setTitle('Unmute')
                                .addField("User", member.user.tag + " (ID: " + member.id + ")")
                                .addField("After", ms(obj.expiresAt - obj.mutedAt, {
                                    long: true
                                }), true)
                                .setFooter("Time:").setTimestamp()
                            modlog.send({ embeds: [embed] });
                        }
                    }, obj.expiresAt - Date.now());
                }
            });
        console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(' - Found bans...'));
    });
}