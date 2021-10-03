module.exports = {
	name: 'lockdown',
	description: 'Lock the server.',
	category: 'Admins',
	options: [
		{
			name: 'toggle',
			type: '5',
			description: 'Toggle lockdown on / off.',
			required: true,
		},
	],

	async execute(interaction) {
		if (!interaction.member.roles.cache.some(roles => roles.id === interaction.client.config.roles.admins.id)) return await interaction.reply({ content: 'You\'re not an admin!', ephemeral: true });

		const toggled = interaction.options.getBoolean('toggle');

		// Store the categorys
		const main = interaction.guild.channels.cache.get(interaction.client.config.channels.main.id);
		const voice = interaction.guild.channels.cache.get(interaction.client.config.channels.voice.id);

		// Store the member role
		const memberRole = interaction.guild.roles.cache.get(interaction.client.config.roles.member.id);
		

		try {
			if (toggled === true) {
				interaction.client.serverDB.set(`${interaction.guild.id}_lockdown`, true);
				main.permissionOverwrites.edit(memberRole, { SEND_MESSAGES: false, CONNECT: false });
				voice.permissionOverwrites.edit(memberRole, { SEND_MESSAGES: false, CONNECT: false });
				interaction.reply('🔒 Lockdown has been enabled. All channels are now locked!');
			} else {
				interaction.client.serverDB.set(`${interaction.guild.id}_lockdown`, false);
				main.permissionOverwrites.delete(memberRole);
				voice.permissionOverwrites.delete(memberRole);
				interaction.reply('🔓 Lockdown has been disabled. All channels are now unlocked!');
			}
		} catch (err) {
			return await interaction.reply({ content: 'An unexpected error occured: `' + err + '`', ephemeral: true }) && console.log(err);
		}
	},
};