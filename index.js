const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});
const db = require('quick.db');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

client.config = require('./config/bot');
client.config.roles = require('./config/roles');
client.config.channels = require('./config/channels');
client.config.theme = require('./config/theme');
client.commands = new Collection();

// Databases
client.serverDB = new db.table('server');
client.profileDB = new db.table('profile');
client.roleDB = new db.table('role');

// Punishment databases
client.muteDB = new db.table('mute');
client.tempBanDB = new db.table('tempBan');

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
// const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
	console.log(`Loading discord.js event ${file}`);
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

fs.readdirSync('./commands').forEach(dirs => {
	const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

	for (const file of commands) {
		const command = require(`./commands/${dirs}/${file}`);
		console.log(`Loading command ${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
});

// eslint-disable-next-line no-unused-vars
const commands = client.commands.map(({ execute, ...data }) => data);

const rest = new REST({ version: '9' }).setToken(client.config.discord.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands('846139750779715584', '839886398466687016'),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command! Check console for more details!', ephemeral: true });
	}
});

client.login(client.config.discord.token);