// TODO: Add a system that every time the bot starts, it checks if there are any punishments that need a setTimeout() function still just incase the bot
// crashes.

const chalk = require("chalk");
const ms = require("ms");

module.exports = {
    name: 'warn',
    description: 'Warn a member.',
    category: 'Moderation',
    options: [
        {
            name: 'member',
            description: "What member do you want to warn?",
            type: '6',
            required: true,
        },
    ],

    async execute(interaction) {
        // Check if the user has mods+
        if (!interaction.member.roles.cache.some(roles => roles.id === interaction.client.config.roles.mod.id)) return await interaction.reply({ content: "Error! You do not have permission to use this command.", ephemeral: true });

        // Store options and the client
        const client = interaction.client;

        let user = interaction.options.getUser('member');
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return await interaction.reply({ content: 'Error! This user is not in the guild.', ephemeral: true });

        // Add a warn. 
        interaction.client.profileDB.add(`profile_${member.id}.warns`, 1);
        const warns = client.profileDB.get(`profile_${member.id}.warns`);
        await interaction.reply(`✅ **${member.user.tag}** has been warned, they now have ${warns} warnings.`);

        // If the member wasnt found then return with a console log.
        if (!member) return console.log(chalk.bgRed('[ERROR]'), chalk.red('- Failed to find member during [WARN CHECK]'));

        // Check if the warns = to the max set in the config then punish
        if (warns == parseInt(client.config.moderation.strike.one)) {

            // Store the mute role
            const muterole = interaction.guild.roles.cache.get(interaction.client.config.roles.muted.id);

            // First strike
            try {
                const time = ms('10s');
                member.roles.add(muterole);
                const mutedAt = Date.now();
                const expiresAt = Date.now() + time;
                interaction.client.muteDB.set(member.id, { mutedAt: mutedAt, expiresAt: expiresAt });
                member.send(`You have reached your first strike on ${interaction.guild.name}, you have been muted for **1 week**.`);
                console.log(chalk.bgRed('[WARN MUTE]'), chalk.red(`- ${member.user.tag} has been given their first strike.`));
                setTimeout(() => {
                    member.roles.remove(muterole)
                    client.profileDB.set(`roles_${member.id}.muted`, false);
                    client.profileDB.set(`roles_${member.id}.muted.time`, 0);
                    member.send(`You are now unmuted from ${interaction.guild.name}. Make sure you understand the rules!`);
                    console.log(chalk.bgYellow('[WARN MUTE END]'), chalk.yellow(`- ${member.user.tag}'s first strike has ended.`));
                }, time);
            } catch (err) {
                return console.log(chalk.bgRed('[FIRST STRIKE ERROR]'), chalk.red("- " + err));
            }

        }

        // Second strike
        else if (warns == parseInt(client.config.moderation.strike.two)) {
            try {
                const time = ms('10s');
                member.send(`You have reached your second strike on ${interaction.guild.name}, you have been temporarily banned from ${interaction.guild.name} for **1 week**.`);
                interaction.guild.bans.create(member, { reason: 'Hit their second strike.' });
                console.log(chalk.bgRed('[WARN TEMPBAN]'), chalk.red(`- ${member.user.tag} has been given their second strike.`));
                setTimeout(() => {
                    interaction.guild.bans.remove(member, { reason: 'Second strike has ended.' });
                    console.log(chalk.bgYellow('[WARN TEMPBAN END]'), chalk.yellow(`- ${member.user.tag}'s second strike has ended.`));
                }, time)
            } catch (err) {
                return console.log(chalk.bgRed('[SECOND STRIKE ERROR]'), chalk.red("- " + err));
            }
        }
            
        // Third strike
        else if (warns == parseInt(client.config.moderation.strike.three)) {
            try {
                member.send(`You have reached your **third** strike on ${interaction.guild.name}, you have been permanently banned from ${interaction.guild.name}.`);
                interaction.guild.bans.create(member, { reason: 'Hit their third strike.' });
                console.log(chalk.bgRed('[BAN]'), chalk.red(`- ${member.user.tag} has been given their third strike and is now banned.`));
            } catch (err) {
                return console.log(chalk.bgRed('[THIRD STRIKE ERROR]'), chalk.red("- " + err));
            }
        }

        else {
            console.log(chalk.bgGreen('[WARN SYNC]'), chalk.green(`- ${member.user.tag} passed all checks!`));
        }
    }
}