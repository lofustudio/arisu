import { ApiRoute } from "../../../../Interfaces/ApiRoute";
import Ajv from "ajv";

export const route: ApiRoute = {
    path: "/settings",
    description: "Update the settings for the bot",
    method: "PUT",
    handler: async (client, req, res) => {
        const update: object = req.body;
        const data = client.settings.get('settings');

        const ajv = new Ajv();
        const schema = {
            type: "object",
            properties: {
                prefix: { type: "string" },
                guildID: { type: "string" },
                api: {
                    type: "object", properties: {
                        port: { type: "integer" }
                    }
                }
            },
            additionalProperties: false
        }

        const valid = ajv.validate(schema, update);
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
        client.settings.set('settings', data);
        res.json(data);
    }
};

function validate(schema: { type: string; properties: { prefix: { type: string; }; guildID: { type: string; }; api: { type: string; properties: { port: { type: string; }; }; }; }; required: string[]; additionalProperties: boolean; }, update: object) {
    throw new Error("Function not implemented.");
}
