import { permissionLevel } from "@prisma/client";
import { createCanvas, loadImage } from "canvas";
import { MessageAttachment } from "discord.js";
import { DiscordCommand, PermLevel } from "../../Interfaces";
import extractID from "../../Utils/extractID";

export const command: DiscordCommand = {
    name: "ban",
    description: "Ban a user from the server.",
    module: "Moderation",
    aliases: [],
    usage: "<mention | id> [reason] [-s]",
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    permLevel: "ADMIN",
    visable: true,
    run: async (client, message, args, member) => {
        if (!args[0]) return message.channel.send("Oops, you forgot to specify a user to ban.");

        const targetId = extractID(args[0]);
        if (!targetId) return message.reply("I couldn't find the user's ID.");
        if (targetId === client.user?.id) {
            if (PermLevel[member.database.guild?.permissionLevel as permissionLevel] < 3) return message.channel.send("Mean.");
            const canvas = createCanvas(727, 479);
            const ctx = canvas.getContext("2d");
            const base = await loadImage("https://newfastuff.com/wp-content/uploads/2019/05/dfuJWON.png");
            ctx.drawImage(base, 0, 0);
            const botImg = await loadImage(client.user.displayAvatarURL({ format: "png", size: 256 }));
            // Add the victim's avatar to the canvas.
            ctx.save();
            ctx.beginPath();
            ctx.arc(200, 250, 100, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(botImg, 100, 150, 200, 200);
            ctx.restore();
            // Add the executioner to the canvas.
            ctx.save();
            ctx.beginPath();
            ctx.arc(725, 250, 100, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(botImg, 625, 150, 200, 200);
            ctx.restore();
            const attachment = new MessageAttachment(canvas.toBuffer(), "canvas.png");
            await message.channel.send({ files: [attachment] });

            return await message.guild?.leave();
        }

        const target = await message.guild?.members.fetch(targetId);
        if (!target) return message.channel.send("I couldn't find that user.");
        if (!target.bannable) return message.channel.send("I don't have the correct permissions to ban that user.");

        let reason = args.slice(1).length >= 1 ? args[args.length - 1] === "-s" ? args.slice(1, args.length - 1).join(" ") : args.slice(1).join(" ") : "No reason specified.";
        if (args[args.length - 1] !== "-s") {
            target.send(`You have been banned from ${message.guild?.name}.\nReason: ${reason}`).catch((err) => {
                client.log.command.warn("Unable to DM the user being banned.");
            });
        }

        target.ban({ reason }).then(() => {
            reason === "No reason specified." ?
                message.channel.send(`<@!${targetId}> has been banned.`) :
                message.channel.send(`<@!${targetId}> has been banned for \`${reason}\`.`);
        });
    }
}