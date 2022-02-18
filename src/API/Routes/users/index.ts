import { ApiRoute } from "../../../Interfaces/ApiRoute";

export const route: ApiRoute = {
    path: "/users",
    description: "Provide info on how to use the /users endpoint",
    method: "GET",
    protected: false,
    handler: async (client, req, res) => {
        res.json({ error: 'You need to provide a user id to get info on a user. Example: /api/users/889270418786119681' });
    }
}