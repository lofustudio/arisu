module.exports = {
	name: 'ping',
	description: 'replies with Pong!',
	category: 'Core',
	async execute(interaction) {
		await interaction.reply(`${interaction.client.ws.ping}ms`);
	},
};