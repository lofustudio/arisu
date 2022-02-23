import { ApiRoute } from "../../../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/commnads",
    description: "Returns the list all avalible commands.",
    method: "GET",
    handler: async (client, req, res) => {
        const commands = client.commands;
        res.json(commands);
    }
}