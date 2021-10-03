const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'mute',
	description: 'Mute a member.',
	category: 'Moderation',
	options: [
		{
			name: 'member',
			description: 'The member to mute.',
			type: '6',
			required: true,
		},
		{
			name: 'amount',
			description: 'What is the amount you want to mute the member for? (5, 10, etc)',
			type: '4',
			required: true,
		},
		{
			name: 'time',
			description: 'How long would you like to mute the member for?',
			type: '3',
			required: true,
			choices: [
				{
					name: 'Seconds',
					value: 's',
				},
				{
					name: 'Minutes',
					value: 'm',
				},
				{
					name: 'Hours',
					value: 'h',
				},
				{
					name: 'Days',
					value: 'd',
				},
				{
					name: 'Weeks',
					value: 'w',
				},
			],
		},
		{
			name: 'reason',
			description: 'Reason for the mute.',
			type: '3',
			required: false,
		},
	],

	async execute(interaction) {
		if (!interaction.member.roles.cache.some(roles => roles.id === interaction.client.config.roles.mod.id)) return await interaction.reply({ content: 'Error! You do not have permission to use this command.', ephemeral: true });

		const user = interaction.options.getUser('member');
		const options_amount = interaction.options.getInteger('amount');
		const options_time = interaction.options.getString('time');

		const member = interaction.guild.members.cache.get(user.id.match(/[0-9]{18}/).length == 0 ? user.id : user.id.match(/[0-9]{18}/)[0]);
		// const reason = interaction.options.getString('reason') || 'No reason specified';
		let time = (options_amount + options_time).replaceAll(/\s/g, '') || 300000;

		if (member == null) return await interaction.reply({ content: 'Error! This user is not in the guild.', ephemeral: true });
		// 10 years
		if (time > 2592000000) time = 315569520000;
		// 5 seconds
		if (time < 5000) time = 5000;

		const muterole = interaction.guild.roles.cache.get(interaction.client.config.roles.muted.id);

		try {
			await member.roles.add(muterole);
			const mutedAt = Date.now();
			const expiresAt = Date.now() + ms(time);

			interaction.client.muteDB.set(member.id, { mutedAt: mutedAt, expiresAt: expiresAt });

			await interaction.reply(`✅ **${member.user.tag}** has been muted for **${options_amount}${options_time}**!`);

			setTimeout(() => {
				member.roles.remove(muterole);
				interaction.client.muteDB.delete(member.id);
				member.send(`You are now unmuted from ${interaction.guild.name}. Make sure you understand the rules!`);

				const footerText = 'ID:' + member.id;

				const embed = new MessageEmbed()
					.setTitle('Unmute')
					.addField('User', member.user.tag)
					.addField('After', ms(expiresAt - mutedAt, { long: true }), true)
					.setFooter(footerText.toString());

				const modlog = interaction.guild.channels.cache.get(interaction.client.config.channels.logs.mod);

				if (modlog != null) {
					modlog.send({ embeds: [embed] });
				}
			}, ms(time));

		}
		catch (err) {
			return await interaction.reply({ content: 'Oops! An unexpected error occured... ' + '`' + `${err}` + '`', ephemeral: true }).then(console.log());
		}
	},
};