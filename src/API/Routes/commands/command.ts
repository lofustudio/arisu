import { ApiRoute } from "../../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/api/commands/:query",
    method: "GET",
    protected: true,
    handler: async (client, req, res) => {
        if (!client.commands.find((command) => command.name === req.params.query) && !client.commands.find((command) => command.aliases.includes(req.params.query))) {
            res.status(404).json({
                error: "Command not found"
            });
        } else {
            res.json(client.commands.find((command) => command.name === req.params.query) || client.commands.find((command) => command.aliases.includes(req.params.query)));
        }
    }
};