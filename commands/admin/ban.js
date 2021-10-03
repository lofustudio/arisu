const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Ban a member!',
	category: 'Admins',
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
		if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: 'Error! You do not have permissions to use this command.', ephemeral: true });

		const user = interaction.options.getUser('member');
		const member = interaction.guild.members.cache.get(user.id);
		const reason = interaction.options.getString('reason') || 'No reason specified.';

		if (!member) return interaction.reply({ content: 'The user is not in the guild.', ephemeral: true });
		if (!member.bannable) return interaction.reply({ content: 'You cannot ban the specified user.', ephemeral: true });

		try {
			const embed = new MessageEmbed()
				.setColor(interaction.client.config.theme.red)
				.setAuthor('Ban')
				.setDescription(`**• Member:** ${member.user.tag} (${member.user.id})\n**• Moderator:** ${interaction.member.user.tag}\n**• Reason:** ${reason}`)
				.setThumbnail(member.user.avatarURL({ dynamic: true }));

			const channel = interaction.guild.channels.cache.get(interaction.client.config.channels.logs.member);
			channel.send({ embeds: [embed] });

			interaction.guild.members.ban(member, { days: 0, reason: reason });
		}
		catch (err) {
			return await interaction.reply({ content: 'An unexpected error occured... ' + '`' + `${err}` + '`', ephemeral: true });
		}

		if (interaction.options.getString('reason') === null) return await interaction.reply(`✅ Successfully banned **${member.user.tag}**!`);
	
		await interaction.reply(`✅ Successfully banned **${member.user.tag}** for **${reason}**!`);
	},
};