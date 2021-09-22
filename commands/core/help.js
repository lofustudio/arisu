const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Introduces the user to the bot.',
    category: 'Core',

    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor(interaction.client.config.embed.color)
            .setAuthor('Help')
            .setFooter(interaction.client.config.embed.footer)
            .setTimestamp()
            .setDescription('Hello! My name is Cookie and I protect ' + `${interaction.guild.name}.\n` + ' Use `/commands` for a list of all commands!');
        
        await interaction.reply({ embeds: [embed] });
    },
};