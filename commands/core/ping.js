module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    category: 'Core',
    async execute(interaction) {
        await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
    },
};