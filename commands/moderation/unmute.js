const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'unmute',
	description: 'unmute a member.',
	category: 'Moderation',
	options: [
		{
			name: 'member',
			description: 'what member would you like to unmute?',
			type: '6',
			required: true,
		},
	],

	async execute(interaction) {
		if (!interaction.member.roles.cache.some(roles => roles.id === interaction.client.config.roles.mod.id)) return await interaction.reply({ content: 'you do not have permission to use this command.', ephemeral: true });

		const user = interaction.options.getUser('member');
		const member = interaction.guild.members.cache.get(user.id.match(/[0-9]{18}/).length == 0 ? user.id : user.id.match(/[0-9]{18}/)[0]);
		const muterole = interaction.guild.roles.cache.get(interaction.client.config.roles.muted.id);

		try {
			if (!interaction.client.muteDB.has(member.id)) return await interaction.reply('the user isnt muted.');
			await member.roles.remove(muterole);

			interaction.client.muteDB.delete(member.id);

			await interaction.reply(`✅ **${member.user.tag}** has been unmuted!`);

			member.send(`${interaction.member.user.tag} has unmuted you!`);

			const embed = new MessageEmbed()
				.setTitle('Force Unmute')
				.addField('User', member.user.tag + ' (ID: ' + member.id + ')')
				.addField('Moderator', interaction.member.user.tag, true)
				.setFooter('Time:').setTimestamp();

			const modlog = interaction.guild.channels.cache.get(interaction.client.config.channels.logs.mod);

			if (modlog != null) {
				modlog.send({ embeds: [embed] });
			}

		}
		catch (err) {
			return await interaction.reply({ content: 'an unexpected error occured... ' + '`' + `${err}` + '`', ephemeral: true }).then(console.log());
		}
	},
};