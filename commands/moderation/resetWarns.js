module.exports = {
	name: 'resetwarns',
	description: 'Resets a members warnings.',
	category: 'Moderation',
	options: [
		{
			name: 'member',
			description: 'Please specify a member.',
			type: '6',
			required: true,
		},
	],


	async execute(interaction) {
		// Check if the user has mods+
		if (!interaction.member.roles.cache.some(roles => roles.id === interaction.client.config.roles.mod.id)) return await interaction.reply({ content: 'Error! You do not have permission to use this command.', ephemeral: true });

		// Store options and the client
		const client = interaction.client;

		const user = interaction.options.getUser('member');
		const member = interaction.guild.members.cache.get(user.id);
		if (!member) return await interaction.reply({ content: 'Error! This user is not in the guild.', ephemeral: true });

		// store warns and check if they are already at 0 or empty object
		const warns = client.profileDB.get(`${member.id}.warns`);
		if (warns === null || 0) {
			return await interaction.reply('[ERROR] - Member has no warnings.');
		}

		client.profileDB.set(`${member.id}.warns`, 0);
		client.profileDB.delete(`${member.id}.warn`);
		await interaction.reply(`✅ **${member.user.tag}** warnings have been reset.`);
	},
};