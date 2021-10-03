const { MessageEmbed } = require('discord.js');
const convertPronouns = require('../pronouns/convertPronouns');

module.exports = async (interaction) => {
	const client = interaction.client;
	const nick = client.profileDB.get(`${interaction.member.id}.nick`);
	const xp = client.profileDB.get(`${interaction.member.id}.xp`);
	const avatar = interaction.member.user.displayAvatarURL({ dynamic: true });
	const username = interaction.member.user.tag;
	const fetch = require('node-fetch');
	const api_url = `https://pronoundb.org/api/v1/lookup?platform=discord&id=${interaction.member.id}`;

	async function getData() {
		const response = await fetch(api_url);
		const data = await response.json();
		if (data.error) return data.error;
		return data.pronouns;
	}

	const pronounID = await getData();
	const pronoun = await convertPronouns(pronounID);

	const embed = new MessageEmbed()
		.setAuthor(`${username}'s profile`)
		.setThumbnail(avatar)
		.addField('Nickname', '`' + nick + '`', true)
		.addField('XP', '`' + xp + '`', true)
		.addField('Pronouns', '`' + pronoun + '`', true)
		.setFooter(`${interaction.client.config.embed.footer}`);

	await interaction.reply({ embeds: [embed] });
};