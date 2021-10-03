const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'introduces the user to the bot.',
	category: 'Core',

	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor(interaction.client.config.embed.color)
			.setFooter('developed by tyger796')
			.setDescription('hi! my name is Cookie and I protect ' + `${interaction.guild.name}.\n` + ' Use `/commands` for a list of all commands!');

		await interaction.reply({ embeds: [embed] });
	},
};