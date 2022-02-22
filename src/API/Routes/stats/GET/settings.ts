import { ApiRoute } from "../../../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/settings",
    description: "Fetch the settings for the bot",
    method: "GET",
    handler: async (client, req, res) => {
        res.json('Settings');
    }
};