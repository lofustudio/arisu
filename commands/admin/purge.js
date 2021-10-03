const { MessageEmbed } = require("discord.js");
const sleep = require('../../util/message/sleep');
const ms = require('ms');

module.exports = {
	name: 'purge',
	description: 'Bulk deletes a certain amount of messages.',
	category: 'Admins',
	options: [
		{
			name: 'amount',
			description: 'The amount of messages you want to delete.',
			type: '4',
			required: true,
		},
		{
			name: 'channel',
			description: 'The target channel (Optional).',
			type: '7',
			required: false,
		},
	],

	async execute(interaction) {
		if (!interaction.member.roles.cache.some(roles => roles.id === interaction.client.config.roles.admins.id)) return await interaction.reply('You\'re not an admin!');
		const num = interaction.options.getInteger('amount');
		const channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(interaction.channel.id);

		let amount = num;
		let loop = 0;

		while (amount > 0) {
			loop++;
			channel.bulkDelete(Math.min(amount, 100));
			amount = amount - Math.min(amount, 100);
		}

		const logChannel = interaction.guild.channels.cache.get(interaction.client.config.channels.logs.message);
		// const embed = new MessageEmbed()
		// 	.setAuthor('Message purge!')
		// 	.setColor(interaction.client.config.embed.color)
		// 	.setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
		// 	.addField({ name: '**• Moderator:** ', value: '`' + interaction.member.user.tag + '`' })
		// 	.addField({ name: '**• Amount of messages:** ', value: '`' + num + '`' })
		// 	.setFooter(interaction.client.config.embed.footer)
		// 	.setTimestamp(new Date());
		// logChannel.send({ embed: [embed] });
		
		const embed = {
			author: { name: 'Message purge!' },
			color: interaction.client.config.theme.red,
			thumbnail: { url: interaction.member.user.displayAvatarURL({ dynamic: true }) },
			fields: [
				{ name: '**• Moderator:** ', value: '`' + interaction.member.user.tag + '`' },
				{ name: '**• Amount of msgs:** ', value: '`' + num + '`' },
				{ name: '**• Channel:** ', value: `[#${channel.name}](https://discord.com/channels/${interaction.guild.id}/${channel.id})` },
			],
			footer: `ID: ` + interaction.member.user.id,
			timestamp: new Date()
		}

		logChannel.send({ embeds: [embed] });

		await interaction.reply(`✅ Successfully deleted ${num} messages!`);
		sleep(ms('5s'));
		await interaction.deleteReply();
	},
};