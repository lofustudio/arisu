const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'rules',
    description: 'Send the rules.',
    category: 'Owner',
    options: [
        {
            name: 'action',
            description: 'What message would you like to send?',
            type: '3',
            required: true,
            choices: [
                {
                    name: 'rules',
                    value: 'rules',
                },
            ],
        },
    ],

    async execute(interaction) {
        if (interaction.member.id != interaction.client.config.dev.id) return interaction.reply({ content: 'Only tyger can use this command!', ephemeral: true });

        const color = interaction.client.config.embed.color;
        const rulesChannel = interaction.guild.channels.cache.get(interaction.client.config.channels.important.rules);
        const action = interaction.options.getString('action');

        if (action == 'rules') {
            const RulesImage = new MessageEmbed()
                .setColor(color)
                .setImage('https://i.imgur.com/d6Xfd7D.png');
            
            const RulesVerifyMessage = new MessageEmbed()
                .setColor(color)
                .setDescription(`Once you have read all of the rules and info above, please continue to the <#${interaction.client.config.channels.important.verify}> channel to verify you are not a bot!`);

            const RulesEmbed = new MessageEmbed()
                .setColor(color)
                .setDescription(`
Before engaging in discussion in Tyger's Valley, you must read and agree to the rules:

• While participating in the server, ensure you have read the server rules before engaging in discussion.
• Rules are subject to change at any time.
• Your access to this server is not a right, and it can be taken from you at any time.
• If someone is violating these rules, please ping the moderators so they can take care of it.


> 💻 ┃ Content
• All Discord Terms of Service and Guidelines apply at all times.

• Any content that is NSFW (text / pictures / videos / drawings) is STRICTLY forbidden. Your profile picture, username, and nickname need to be appropriate.

• Keep messages in appropriate channels.

• No spamming. This includes but is not limited to: Walls of text, chain mail, singing lyrics, emote spam, ear-rape audio, excessive use of images, etc.


> 💬 ┃ Chatting
• Show respect at all times. Use common sense when conversing.

• In this server, we have no toleration for no form of insults, racism, sexism, homophobia and any discrimination.

• Do not encourage others to violate rules.

• Do not ask for anyone's personal information. This includes age, location, etc.

• English only.

• If it is found you are under 13 or staff have reasonable suspicion that you are, you will be banned.


> 🛠 ┃ Moderation
• Mini-modding is not allowed. If someone is violating the rules, ping moderators.

• Do not ping the moderators or admins if you're issue isnt extremely urgant! Instead please DM <@!${interaction.client.config.bot.id}> to open a ticket with the mods.

• Ensure you have DMs enabled. This is how you are notified of punishment and reasoning.

• If you are banned, you can submit an appeal here: https://forms.gle/mBRaNaoA2nxyce7z7\n
    - You will also be sent this link in your DMs if this does occur.


> 🔗 ┃ Advertising
• Posting invite links to Discord servers will result in a ban. DM advertising a server is prohibited unless someone explicitly asks for this information.

• Advertising of any kind is not permitted, this includes, but is not limited to:\n > YouTube channels, Twitch streams, Twitter profiles and any other social media platform you use to establish a following.`);
            
            try {
                rulesChannel.send({ embeds: [RulesImage, RulesEmbed, RulesVerifyMessage] });

                interaction.reply({ content: 'Successfully posted new content!', ephemeral: true });
            } catch (err) {
                interaction.reply({ content: 'An error occured! `' + err + '`', ephemeral: true });
            }
        }
    }
}