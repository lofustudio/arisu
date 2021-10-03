const profileCheck = require('../../util/profile/profileCheck');

module.exports = {
	name: 'verify',
	description: 'verify you are not a robot.',
	category: 'Core',

	execute(interaction) {
		const client = interaction.client;
		const db = client.roleDB;
		const memberRole = interaction.guild.roles.cache.get(client.config.roles.member.id);
		const notVerifiedRole = interaction.guild.roles.cache.get(client.config.roles.notVerified.id);
		const hasMemberRole = db.get(`${interaction.member.id}.member`);
		const hasNotVerifyRole = db.get(`${interaction.member.id}.notVerified`);

		// Check / Create profile.
		profileCheck(interaction);

		// Check if the db is broken (somehow)
		if (hasMemberRole && hasNotVerifyRole === true) {
			db.set(`${interaction.member.id}.member`, false);
			db.set(`${interaction.member.id}.notVerified`, true);
		}

		if (hasMemberRole === true) return interaction.reply({ content: 'you are already a member, you silly goose!', ephemeral: true });

		try {
			db.set(`${interaction.member.id}.member`, true);
			db.set(`${interaction.member.id}.notVerified`, false);
			interaction.reply({ content: 'you are now verified!', ephemeral: true });
			interaction.member.roles.remove(notVerifiedRole);
			interaction.member.roles.add(memberRole);
		}
		catch (err) {
			return interaction.reply({
				content: 'something went wrong. a report has been sent to tyger, please try again later.', ephemeral: true }) && console.log(err);
		}
	},
};