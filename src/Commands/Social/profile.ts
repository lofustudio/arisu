import { MessageEmbed } from "discord.js";
import { DiscordCommand } from "../../Interfaces";
import { CurrencyJSON } from "../../Interfaces/Economy/currency";

export const command: DiscordCommand = {
    name: "profile",
    description: "Manage or view your profile.",
    module: "Social",
    aliases: [],
    permissions: [],
    usage: "[option] [...optionQueries]",
    visable: true,
    permLevel: "MEMBER",
    run: async (client, message, args, member, prefix) => {
        if (!args[0]) {
            const guildData = await client.database.guild.findUnique({ where: { id: message.guild?.id }, include: { economy: true, social: true } });
            const currencyData = guildData?.economy?.currency as unknown as CurrencyJSON;
            console.log(currencyData);
            const embed = new MessageEmbed()
                .setAuthor({ iconURL: message.author.displayAvatarURL({ dynamic: true, size: 512 }), name: `${message.author.tag}'s Profile` })
            // Add Pixel data here for tyger's valley https://tygr.dev/discord
            if (member.database.global?.profile?.bio && member.database.global?.profile?.bio.length >= 1) {
                embed.setDescription(`${member.database.global?.profile?.bio}`);
            }
            if (guildData?.social?.enabled === true) {
                embed.addField("XP", member.database.guild?.xp.toString() as string, true)
                embed.addField("Level", member.database.guild?.level.toString() as string, true)
            }

            if (guildData?.economy?.enabled === true) {
                embed.addField(`${currencyData?.symbol} ${currencyData?.name}'s`, `${member.database.guild?.balance.toString() as string}`)
            }

            message.channel.send({ embeds: [embed] });
        }
    }
}