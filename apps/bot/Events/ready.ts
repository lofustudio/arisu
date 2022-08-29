
import type { DiscordEvent } from "../Interfaces";

export const event: DiscordEvent<"ready"> = {
    name: "ready",
    run: async (client) => {
        await client.log.init.info("Bot is ready.");
    },
};
