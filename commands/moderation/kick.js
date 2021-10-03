const { Permissions } = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Kick a member!',
	category: 'Moderation',
	options: [
		{
			name: 'member',
			description: 'The member to ban.',
			type: '6',
			required: true,
		},
		{
			name: 'reason',
			description: 'The reason of the ban.',
			type: '3',
			required: false,
		},
	],

	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({ content: 'Error! You do not have permissions to use this command.', ephemeral: true });

		const user = interaction.options.getUser('member');
		let reason = interaction.options.getString('reason');
		if (reason === null) {
			reason = 'No reason provided.';
		}

		const member = interaction.guild.members.cache.get(user.id);
		if (!member) return interaction.reply({ content: 'Error! This user is not in the guild.', ephemeral: true });
		if (!member.kickable) return interaction.reply({ content: 'Error! This member isn\'t kickable.', ephemeral: true });

		try {
			interaction.guild.members.kick(member, reason);
		}
		catch (err) {
			return await interaction.reply({ content: 'Oops! An unexpected error occured... ' + '`' + `${err}` + '`', ephemeral: true });
		}

		await interaction.reply(`✅ Successfully kicked **${member.user.tag}**!`);
	},
};