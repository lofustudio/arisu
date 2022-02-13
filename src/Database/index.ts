import { Message } from "discord.js";
import ProfileSchema from './Schemas/ProfileSchema'
import { table } from "quick.db";
class users extends table {
    public database = new table('users');
    public SyncMember(message: Message) {
        const memberID = message.author.id;

        if (this.database.get(`${memberID}`) != ProfileSchema) {
            console.log('\n\nBefore:\n' + JSON.stringify(this.database.fetch(`${memberID}`)));
            this.database.set(`${memberID}`, ProfileSchema);
            console.log('\n\nAfter:\n' + JSON.stringify(this.database.fetch(`${memberID}`)));
            console.log('\n\nWarns:\n' + JSON.stringify(this.database.fetch(`${memberID}.warns`)));
            console.log('\n\nRoles:\n' + JSON.stringify(this.database.fetch(`${memberID}.roles`)));
            console.log('\n\nNotes:\n' + JSON.stringify(this.database.fetch(`${memberID}.notes`)));
        }

        return true;
    }

    public test(message: Message) {
        message.channel.send('it works');
    }
}

const db = {
    users
}

export default db;