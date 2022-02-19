import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export default NextAuth({
    providers: [
        DiscordProvider({
            clientId: '846139750779715584',
            clientSecret: 'e0onkXJeo7nUpHQDW9fJgl7_fcdroobO',
        }),
    ],
})