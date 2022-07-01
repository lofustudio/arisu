import { PrismaClient } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { DiscordStrategy, SocialsProvider } from "remix-auth-socials";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator
export let authenticator = new Authenticator(sessionStorage, { sessionKey: '_session' });
// You may specify a <User> type which the strategies will return (this will be stored in the session)
// export let authenticator = new Authenticator<User>(sessionStorage, { sessionKey: '_session' });

authenticator.use(new DiscordStrategy(
    {
        clientID: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        callbackURL: `http://localhost:3000/auth/${SocialsProvider.DISCORD}/callback`,
        scope: ["identify", "email", "guilds"]
    },
    async ({ profile }) => {
        const db = new PrismaClient();
        let user;
        if (await db.globalUser.findUnique({ where: { id: profile.id } }) === null) {
            user = await db.globalUser.create({
                data: {
                    id: profile.id,
                }
            });
            return {
                ...profile,
                ...user
            }
        } else {
            user = await db.globalUser.findUnique({ where: { id: profile.id } });
            return {
                ...profile,
                ...user
            }
        }
    }
));