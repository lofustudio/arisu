const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'unban',
	description: 'Unban a member!',
	category: 'Admins',
	options: [
		{
			name: 'id',
			description: 'The users ID.',
			type: '3',
			required: true,
		},
		{
			name: 'reason',
			description: 'The reason of the unban.',
			type: '3',
			required: false,
		},
	],

	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: 'Error! You do not have permissions to use this command.', ephemeral: true });
        
		const id = interaction.options.getString('id');
		const reason = interaction.options.getString('reason') || 'No reason specified.';

		interaction.client.users.fetch(id).then(user => {
			try {
				interaction.guild.members.unban(id, { reason: reason });
			} catch (err) {
				return interaction.reply({ content: 'Failed to unban user: `' + err + '`', ephemeral: true });
			} finally {
				const embed = new MessageEmbed()
					.setColor(interaction.client.config.theme.yellow)
					.setAuthor('Unban')
					.setDescription(`**• User:** ${user.tag} (${user.id})\n**• Moderator:** ${interaction.member.user.tag}\n**• Reason:** ${reason}`)
					.setThumbnail(user.avatarURL({ dynamic: true }));

				const channel = interaction.guild.channels.cache.get(interaction.client.config.channels.logs.member);
				channel.send({ embeds: [embed] });
				interaction.reply(`✅ Successfully unbanned **${user.tag}**!`);
			}
		});
	},
};