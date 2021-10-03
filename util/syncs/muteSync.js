const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = async (client) => {
	console.log(chalk.bgGreen('[MUTE SYNC]'), chalk.green(' - Sync started!'));
	const guild = client.guilds.cache.get(client.config.guild.id);
	const modlog = guild.channels.cache.get(client.config.channels.logs.mod);
	const muteRole = guild.roles.cache.get(client.config.roles.muted.id);

	const mutesData = client.muteDB;

	mutesData.all().map(x => ({
		ID: x.ID,
		data: x.data,
	})).forEach(x => {
		guild.members.fetch(x.ID)
			.then(member => {
				const obj = JSON.parse(x.data);
				if (obj.expiresAt <= Date.now()) {
					console.log(chalk.bgGreen('[MUTE SYNC]'), chalk.green(` - ${member.user.tag}'s mute is over, removing mute.`));
					mutesData.delete(x.ID);
					member.roles.remove(muteRole);
					if (modlog != null) {
						const embed = new MessageEmbed()
							.setTitle('Unmute')
							.addField('User', member.user.tag + ' (ID: ' + member.id + ')')
							.addField('After', ms(obj.expiresAt - obj.mutedAt, {
								long: true,
							}), true)
							.setFooter('Time:').setTimestamp();
						modlog.send({ embeds: [embed] });
					}
				}
				else {
					console.log(chalk.bgGreen('[MUTE SYNC]'), chalk.green(` - Starting ${member.user.tag}'s mute.`));
					setTimeout(() => {
						console.log(chalk.bgGreen('[MUTE SYNC]'), chalk.green(` - ${member.user.tag}'s mute is over, removing mute.`));
						mutesData.delete(x.ID);
						member.roles.remove(muteRole);
						if (modlog != null) {
							const embed = new MessageEmbed()
								.setTitle('Unmute')
								.addField('User', member.user.tag + ' (ID: ' + member.id + ')')
								.addField('After', ms(obj.expiresAt - obj.mutedAt, {
									long: true,
								}), true)
								.setFooter('Time:').setTimestamp();
							modlog.send({ embeds: [embed] });
						}
					}, obj.expiresAt - Date.now());
				}
			});
		console.log(chalk.bgGreen('[MUTE SYNC]'), chalk.green(' - Found mutes...'));
	});
};