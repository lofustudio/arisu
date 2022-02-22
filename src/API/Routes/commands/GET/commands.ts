import { ApiRoute } from "../../../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/commands",
    description: 'Get info about all commands',
    method: "GET",
    handler: async (client, req, res) => {
        const commands = client.commands;
        res.json(commands);
    }
};