import { ApiRoute } from "../../../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/commands",
    description: "Returns the list all avalible commands.",
    method: "GET",
    handler: async (client, req, res) => {
        const commands = client.commands;
        res.json(commands);
    }
}