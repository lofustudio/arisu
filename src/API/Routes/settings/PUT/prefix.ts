import { ApiRoute } from "../../../../Interfaces/ApiRoute";
import Ajv from "ajv";

export const route: ApiRoute = {
    path: "/prefix",
    description: "Update the prefix for the bot",
    method: "PUT",
    handler: async (client, req, res) => {
        const update: object = req.body;
        const data = client.settings.get('settings.prefix');

        const ajv = new Ajv();
        const schema = {
            type: "string",
            properties: {
                prefix: { type: "string" },
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

        // save the data
        client.settings.set('settings.prefix', data);
        res.json(data);
    }
};
