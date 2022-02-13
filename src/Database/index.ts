import { Message } from "discord.js";

class userDB {
    public test(message: Message) {
        message.channel.send('it worked');
    }
}

export default userDB;