module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member, client) {
        const isMember = client.profileDB.get(`roles_${member.id}.member`);

        if (isMember === null) {
            const notVerifyRole = member.guild.roles.cache.get(client.config.roles.notVerified.id);
            member.roles.add(notVerifyRole);
        } else if (isMember === true) {
            const memberRole = member.guild.roles.cache.get(client.config.roles.member.id);
            member.roles.add(memberRole);
        }
    }
}