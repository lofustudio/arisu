import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        DiscordProvider({
            clientId: '846139750779715584',
            clientSecret: 'hY2Zjb4r-b2Eymi2W2XVeWUBhwTzAvXI',
        }),
        // ...add more providers here
    ],
})