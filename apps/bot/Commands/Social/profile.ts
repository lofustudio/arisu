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
    example: "profile color #f1e4f1",
    visable: true,
    permLevel: "MEMBER",
    run: async (client, message, args, member, prefix) => {
        if (!args[0]) {
            const guildData = await client.database.guild.findUnique({ where: { id: message.guild?.id }, include: { economy: true, social: true } });
            const currencyData = guildData?.economy?.currency as unknown as CurrencyJSON;
            const embed = new MessageEmbed()
                .setAuthor({ iconURL: message.author.displayAvatarURL({ dynamic: true, size: 512 }), name: `${message.author.tag}'s Profile` })
            // TODO: Add Pixel data here for tyger's valley https://tygr.dev/discord
            if (member.database.global?.profile?.bio && member.database.global?.profile?.bio.length >= 1) {
                embed.setDescription(`${member.database.global?.profile?.bio}`);
            }
            if (guildData?.social?.enabled === true) {
                embed.addFields({ name: "XP", value: member.database.guild?.xp.toString() as string, inline: true })
                embed.addFields({ name: "Level", value: member.database.guild?.level.toString() as string, inline: true })
                embed.addFields({ name: "Perm", value: member.database.guild?.permissionLevel.toString() as string, inline: true })
            }

            if (guildData?.economy?.enabled === true) {
                embed.addFields({ name: `${currencyData?.symbol} ${currencyData?.name}'s`, value: `${member.database.guild?.balance.toString() as string}` })
            }

            message.channel.send({ embeds: [embed] });
        }
    }
}