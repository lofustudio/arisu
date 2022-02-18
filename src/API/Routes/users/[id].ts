import { ApiRoute } from "../../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/:id",
    description: 'Get info about a user',
    method: "GET",
    protected: true,
    handler: async (client, req, res) => {
        const user = client.userDB.get(req.params.id);
        if (!user) {
            res.status(404).json({
                error: "User not found"
            });
        } else {
            res.json(user);
        }
    }
};