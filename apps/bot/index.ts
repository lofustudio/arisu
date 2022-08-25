import dotenv from "dotenv";
import { access, constants, writeFileSync } from "fs";
import Enquirer from "enquirer";
import { exec } from "child_process";
import Client from "./Modules/Client";
import { Intents } from "discord.js";

access(".env", constants.R_OK, async (err) => {
  if (err) {
    interface IAnswer {
      token: string;
      database_url: string;
    }

    try {
      access(".env.example", constants.W_OK, (err) => {
        if (err) {
          console.log(
            "Installation is broken. Please redownload Cookie from https://github.com/lofustudio/cookie/releases"
          );
          return process.exit(0);
        }
      });

      const questions = new Enquirer<IAnswer>();

      await questions
        .prompt([
          {
            type: "password",
            name: "token",
            message: "Please enter your bot token.",
            required: true,
            async validate(value: string) {
              const { Client } = require("discord.js");
              const client = new Client({ intents: [] });
              const result: string = client
                .login(value)
                .then(() => {
                  return true;
                })
                .catch(() => {
                  return "Invalid token.";
                });
              return result;
            },
          },
          {
            type: "input",
            name: "database_url",
            message: "Please enter your database url (PostgreSQL only).",
            required: true,
            initial: "postgresql://",
            async validate(value) {
              const { Client } = require("pg");
              const client = new Client({
                connectionString: value,
                connectionTimeoutMillis: 5000,
              });

              const result: string = client
                .connect()
                .then(() => {
                  client.end();
                  return true;
                })
                .catch((err: Error) => {
                  return "Database connection failed. Please check your database URL and try again.";
                });

              return result;
            },
          },
        ])
        .then((answers: IAnswer) => {
          writeFileSync(
            ".env",
            Buffer.from(
              `TOKEN=${answers.token}\nDATABASE_URL=${answers.database_url}`
            )
          );
        })
        .catch((err: Error) => {
          console.log(err);
          process.exit(1);
        });

      exec("prisma generate", (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return process.exit(1);
        }
      });

      console.log("Successfully created .env file. Restarting...");
      const child = exec("node ./index.js");
    } catch (err) {
      console.error(err);
      return process.exit(1);
    }
  } else {
    start();
  }
});

dotenv.config();

async function start() {
  new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_INVITES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
  }).init();
}
