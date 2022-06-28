import { PrismaClient } from "@prisma/client";
import Enquirer from "enquirer";

export class Setup {
    private db = new PrismaClient();

    async bot() {
        interface IAnswer {
            prefix: string;
            id: string;
            status?: boolean;
            status_type?: string;
            status_twitch?: string;
        }

        const questions = new Enquirer<IAnswer>();

        try {
            const answers = await questions.prompt([
                {
                    type: "input",
                    name: "prefix",
                    message: "Enter your bot prefix. Note: This prefix will only be used if the guild doesn't have a prefix set.",
                },
                {
                    type: "input",
                    name: "id",
                    message: "Enter the bot ID.",
                    required: true,
                },
                {
                    type: "confirm",
                    name: "status",
                    message: "Do you want to set the bot's status?",
                },
                {
                    type: "select",
                    name: "status_type",
                    message: "What status type do you want to set? (\"STREAMING\" will require a twitch link to be set.)",
                    choices: [
                        "WATCHING", "PLAYING", "LISTENING", "STREAMING",
                    ],
                    skip: (state: Partial<IAnswer>) => {
                        return !state.status
                    }
                },
                {
                    type: "input",
                    name: "status_message",
                    message: "Enter the bot's status.",
                    skip: (state: Partial<IAnswer>) => {
                        return !state.status
                    }
                },
                {
                    type: "input",
                    name: "status_twitch",
                    message: "Enter your YouTube/Twitch link.",
                    skip: (state: Partial<IAnswer>) => {
                        return !(state.status_type === "STREAMING")
                    }
                }
            ]);
            await this.db.bot.create({
                data: {
                    prefix: answers.prefix,
                    id: answers.id,
                    status: answers.status,
                },
            });
        } catch {
            process.exit(1);
        }
    }
}