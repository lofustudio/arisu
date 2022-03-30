import { ApiRoute } from "../../../../Interfaces/ApiRoute";
import SettingsSchema from '../../../Schemas/SettingsSchema';
import Ajv from "ajv";

export const route: ApiRoute = {
    path: "/settings",
    description: "Update the settings for the bot",
    method: "PUT",
    handler: async (client, req, res) => {
        const update: object = req.body;
        const data = client.database.settings.get('settings');

        const ajv = new Ajv();

        const valid = ajv.validate(SettingsSchema, update);
        if (!valid) {
            res.status(400).json({
                error: ajv.errors
            });
            return;
        }

        // update the data with the update
        Object.keys(update).forEach((key) => {
            data[key] = update[key];
        });

        // save the data
        client.database.settings.set('settings', data);
        res.json(data);
    }
};
