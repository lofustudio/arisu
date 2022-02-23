import SettingsSchema from '../../Schemas/SettingsSchema'
import { table } from "quick.db";

class botDB extends table {
    public database = new table('settings');
    public SyncSettings() {
        // Check if there is any data missing for the member
        Object.keys(SettingsSchema).forEach(key => {
            if (!this.database.has(`settings.${key}`)) {
                this.database.set(`settings.${key}`, SettingsSchema[key]);
            }
        });

        // Fetch for the updated data
        const data = this.database.get(`settings`);

        // Check for any data that isn't in the schema
        Object.keys(data).forEach(key => {
            if (!SettingsSchema.hasOwnProperty(key)) {
                this.database.delete(`settings.${key}`);
            }
        })
    }
}

export default botDB;