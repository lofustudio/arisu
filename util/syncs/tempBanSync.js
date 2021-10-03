const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = async (client) => {
	console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(' - Sync started!'));
	const guild = client.guilds.cache.get(client.config.guild.id);
	const modlog = guild.channels.cache.get(client.config.channels.logs.mod);

	const tempBanData = client.tempBanDB;

	tempBanData.all().map(x => ({
		ID: x.ID,
		data: x.data,
	})).forEach(x => {
		client.users.fetch(x.ID)
			.then(member => {
				const obj = JSON.parse(x.data);
				if (obj.expiresAt <= Date.now()) {
					console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(` - ${member.tag}'s temp ban is over, removing the ban.`));
					try {
						tempBanData.delete(x.ID);
						guild.member.unban(member.id);
					}
					catch (err) {
						return console.log(chalk.bgRed('[TEMPBAN SYNC ERROR]'), chalk.red(`- Failed to unban ${member.tag}. ${err}`));
					}
					if (modlog != null) {
						const embed = new MessageEmbed()
							.setTitle('Temp ban end')
							.addField('User', member.tag + ' (ID: ' + member.id + ')')
							.addField('After', ms(obj.expiresAt - obj.bannedAt, {
								long: true,
							}), true)
							.setFooter('Time:').setTimestamp();
						modlog.send({ embeds: [embed] });
					}
				}
				else {
					console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(` - Starting ${member.tag}'s ban.`));
					setTimeout(() => {
						console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(` - ${member.tag}'s tempban is over, removing the ban.`));
						try {
							guild.member.unban(member.id);
							tempBanData.delete(x.ID);
						}
						catch (err) {
							return console.log(chalk.bgRed('[TEMPBAN SYNC ERROR]'), chalk.red(`- Failed to unban ${member.tag}. ${err}`));
						}
						if (modlog != null) {
							const embed = new MessageEmbed()
								.setTitle('Unmute')
								.addField('User', member.user.tag + ' (ID: ' + member.id + ')')
								.addField('After', ms(obj.expiresAt - obj.bannedAt, {
									long: true,
								}), true)
								.setFooter('Time:').setTimestamp();
							modlog.send({ embeds: [embed] });
						}
					}, obj.expiresAt - Date.now());
				}
			});
		console.log(chalk.bgGreen('[TEMPBAN SYNC]'), chalk.green(' - Found bans...'));
	});
};