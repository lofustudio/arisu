import { GuildMember, Message } from "discord.js";
import ProfileSchema from './Schemas/ProfileSchema'
import { table } from "quick.db";
import Cookie from "../Client";

// UserDB Functions
import addWarning from "./Functions/AddWarning";

class ExtendedUserDB extends table {
    public database = new table('users');
    public SyncMember(message: Message) {
        const memberID = message.author.id;

        // Check if there is any data missing for the member
        Object.keys(ProfileSchema).forEach(key => {
            if (!this.database.has(`${memberID}.${key}`)) {
                this.database.set(`${memberID}.${key}`, ProfileSchema[key]);
            }
        });

        // Fetch for the updated data
        const profile = this.database.get(`${memberID}`);

        // Check for any data that isn't in the schema
        Object.keys(profile).forEach(key => {
            if (!ProfileSchema.hasOwnProperty(key)) {
                this.database.delete(`${memberID}.${key}`);
            }
        })
    }

    public addWarning(client: Cookie, member: GuildMember, moderator: string, reason?: string) {
        addWarning(client, member, moderator, reason);
    }
}

const db = {
    users: ExtendedUserDB
}

export default db;