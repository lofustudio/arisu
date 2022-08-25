
import type { DiscordEvent } from "../Interfaces/DiscordEvent";

export const event: DiscordEvent<"ready"> = {
    name: "ready",
    run: (client) => {
        console.log("Ready!")
    },
};
