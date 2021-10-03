module.exports = {
	name: 'lock',
	description: 'Lock a channel.',
	category: 'Admins',
	options: [
		{
			name: 'channel',
			description: 'The channel you want to lock. (Optional)',
			type: '7',
			required: false,
		},
	],

	async execute(interaction) {
		if (!interaction.member.roles.cache.some(roles => roles.id === interaction.client.config.roles.admins.id)) return await interaction.reply({ content: 'You\'re not an admin!', ephemeral: true });
		const lockdown = interaction.client.serverDB.get(`${interaction.guild.id}_lockdown`);
		// if (lockdown === true) return await interaction.reply({ content: 'Error: This action is locked as the server is in lockdown.', ephemeral: true });

		// Store the channel.
		const channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(interaction.channel.id);

		if (channel.permissionsLocked === false) return await interaction.reply({ content: 'Error: Channel is already locked!', ephemeral: true });

		// Store the memberRole.
		const memberRole = interaction.guild.roles.cache.get(interaction.client.config.roles.member.id);

		// Update permissions.
		channel.permissionOverwrites.edit(memberRole, { SEND_MESSAGES: false });

		// If the channel param was met.
		if (interaction.options.getChannel('channel')) {
			interaction.reply({ content: `✅ Locked ${channel.name} successfully!`, ephemeral: true });
			channel.send('🔒 This channel is now locked.');
		}
		else {
			interaction.reply('🔒 Locked `' + channel.name + '` successfully!');
		}
	},
};