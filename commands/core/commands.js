const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'commands',
    description: 'Displays a full list of all the avalible commands.',
    category: 'Core',
    options: [
        {
            name: 'command',
            description: 'Enter a command name to get more info.',
            type: '3',
            required: false,
        },
    ],

    async execute(interaction) {
        const commandToSearch = interaction.options.getString('command');

        const core = interaction.client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
        const mod = interaction.client.commands.filter(x => x.category == 'Moderation').map((x) => '`' + x.name + '`').join(', ');

        const displayCommands = new MessageEmbed()
            .setColor(interaction.client.config.embed.color)
            .setAuthor('Commands')
            .setFooter('To find more info on a specific command, please use !commands [command]')
            .addField('Bot', core, false)
            .addField('Moderation', mod, false);

        if (!commandToSearch) {
            await interaction.reply({ embeds: [displayCommands] });
        } else {
            const command = interaction.client.commands.get(commandToSearch.toLowerCase());
            if (!command) return await interaction.reply({ content: "Oops! I couldn't find this command. Try using `/commands` to find a list of avalible commands.", ephemeral: true });
            const searchEmbed = new MessageEmbed()
                .setColor(interaction.client.config.embed.color)
                .setAuthor('Commands')
                .setFooter(interaction.client.config.embed.footer)
                .addField('Name', command.name, true)
                .addField('Description', command.description, true)
                .addField('Category', command.category, true)
            await interaction.reply({ embeds: [searchEmbed] });
        };
    },
};