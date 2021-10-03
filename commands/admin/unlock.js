module.exports = {
	name: 'unlock',
	description: 'Unlock a channel.',
	category: 'Admins',
	options: [
		{
			name: 'channel',
			description: 'The channel you want to unlock. (Optional)',
			type: '7',
			required: false,
		},
	],

	async execute(interaction) {
		if (!interaction.member.roles.cache.some(roles => roles.id === interaction.client.config.roles.admins.id)) return await interaction.reply('you\'re not an admin!');
		const lockdown = interaction.client.serverDB.get(`${interaction.guild.id}_lockdown`);
		// if (lockdown === true) return await interaction.reply({ content: 'Error: This action is locked as the server is in lockdown.', ephemeral: true });

		// Store the channel.
		const channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(interaction.channel.id);

		if (channel.permissionsLocked === true) return await interaction.reply({ content: 'Error: Channel is already unlocked!', ephemeral: true });

		channel.lockPermissions();
		// If the channel param was met.
		if (interaction.options.getChannel('channel')) {
			interaction.reply({ content: `🔓 Unlocked ${channel.name} successfully!`, ephemeral: true });
			channel.send('🔓 This channel is now unlocked.');
		}
		else {
			interaction.reply('🔓 Unlocked `' + channel.name + '` successfully!');
		}
	},
};