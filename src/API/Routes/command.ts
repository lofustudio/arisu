import { ApiRoute } from "../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/api/command/:command",
    method: "GET",
    handler: async (client, req, res) => {
        const command = client.commands.get(req.params.command) || client.aliases.get(req.params.command);
        if (!command) return res.status(404).json({ error: "Command not found" });
        res.json(command);
    }
}