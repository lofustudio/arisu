import { GuildMember } from "discord.js"
import Client from "../Client";

export default async function (client: Client, member: GuildMember) {
    const userDB = client.userDB;

    if (userDB.has(`${member.id}.warns`) === false) {
        userDB.set(`${member.id}.warns`, {
            amount: 0,
            data: []
        });
    }

    if (userDB.has(`${member.id}.roles`) === false) {
        if (member.premiumSince)
        userDB.set(`${member.id}.roles`, {
            roles: {
                notVerify: false,
                member: true,
                serverBoost: false,
                moderator: false,
                admin: false,
                owner: false
            }
        });
    }
}