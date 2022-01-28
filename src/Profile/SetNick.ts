import { Message } from "discord.js";
import Client from "../Client";

export async function setNick(client: Client, message: Message, nickname: string) {
    const oldNick = message.member.nickname;

    if (oldNick === nickname) return message.channel.send('You already have that nickname.');
    if (nickname.length > 32) return message.channel.send('That nickname is too long.');
    if (nickname.length < 1) return message.channel.send('That nickname is too short.');

    const reg = new RegExp("[^A-Za-z0-9 ]+");
    if (!reg.test(nickname)) return message.channel.send('Please refrain from including symbols in your name.');

    try {
        client.userDB.set(`${message.member.id}.profile.nickname`, nickname)
    } catch (err) {
        console.log(err)
        return false;
    }
}