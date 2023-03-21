import type { DiscordEvent } from "@/Interfaces";

export const event: DiscordEvent<"ready"> = {
    name: "ready",
    run: async (client) => {
        console.log("Arisu is ready!");
    },
};