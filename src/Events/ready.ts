import Cookie from '../Client';
import { dev, serve } from '../Client/dashboard';
import { DiscordEvent } from '../Interfaces/DiscordEvent';

export const event: DiscordEvent = {
    name: 'ready',
    run: async (client: Cookie) => {
        if (!client) return;
        client.user!.setActivity(`Doki Doki Literature Club`, { type: 'PLAYING' });
        if (process.env.TS_NODE_DEV === "true" || process.env.NODE_ENV === "development") {
            console.log("[DASH] Starting dashboard in development mode. http://localhost:3000/");
            dev();
        } else {
            console.log("[DASH] Starting dashboard...");
            serve();
        }
    }
}