import { ApiRoute } from "../../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/:command",
    description: 'Get info about a command',
    method: "GET",
    protected: true,
    handler: async (client, req, res) => {
        if (!client.commands.find((command) => command.name === req.params.command) && !client.commands.find((command) => command.aliases.includes(req.params.command))) {
            res.status(404).json({
                error: "Command not found"
            });
        } else {
            res.json(client.commands.find((command) => command.name === req.params.command) || client.commands.find((command) => command.aliases.includes(req.params.command)));
        }
    }
};