module.exports = (interaction) => {
    const client = interaction.client;

    // profile
    const nick = client.profileDB.has(`profile_${interaction.member.id}.nick`);
    const xp = client.profileDB.has(`profile_${interaction.member.id}.xp`);

    // roles
    const notVerify = client.profileDB.has(`roles_${interaction.member.id}.notVerified`);
    const member = client.profileDB.has(`roles_${interaction.member.id}.member`);

    // profile
    if (nick === false) {
        client.profileDB.set(`profile_${interaction.member.id}.nick`, 'None');
    }
    
    if (xp === false) {
        client.profileDB.set(`profile_${interaction.member.id}.xp`, 0);
    }


    // roles
    if (notVerify === false) {
        client.profileDB.set(`roles_${interaction.member.id}.notVerified`, false);
    }

    if (member === false) {
        client.profileDB.set(`roles_${interaction.member.id}.member`, false);
    }
} 