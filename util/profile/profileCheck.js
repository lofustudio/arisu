module.exports = (interaction) => {
	// ############## store params #####################
	const client = interaction.client;

	// profile
	const warns = client.profileDB.has(`${interaction.member.id}.warns`);

	// roles
	const notVerify = client.roleDB.has(`${interaction.member.id}.notVerified`);
	const member = client.roleDB.has(`${interaction.member.id}.member`);

	// ################# check params #####################

	// profile
	if (warns === false) {
		client.profileDB.set(`${interaction.member.id}.warns`, 0);
	}

	// roles
	if (notVerify === false) {
		client.roleDB.set(`${interaction.member.id}.notVerified`, false);
	}

	if (member === false) {
		client.roleDB.set(`${interaction.member.id}.member`, false);
	}
};