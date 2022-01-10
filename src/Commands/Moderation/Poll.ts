import { MessageEmbed, Permissions, Message, TextChannel } from "discord.js";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'poll',
    description: 'Create a poll.',
    category: 'Moderation',
    aliases: ['vote'],
    visable: true,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send('You don\'t have the correct permissions to use this command.');
        if (!args[0]) {
            const embed = new MessageEmbed()
                .setTitle('Polls')
                .addField('!poll <question>', 'Creates a poll with ✅ and ❌ options.')
                .addField('!poll create', 'Create a poll with the interactive setup.')
            return message.channel.send({ embeds: [embed] });
        }

        if (args.length < 2) {
            message.react('✅');
            await message.guild.channels.fetch('839890628908810240').then((channel: TextChannel) => {
                let question = args.join(' ');
                const embed = new MessageEmbed()
                    .setTitle(question)
                channel.send({ embeds: [embed] }).then(async (msg) => {
                    await msg.react('✅');
                    await msg.react('❌');
                });
            });
        }


        if (args[0].toLowerCase() === 'create') {
            let question = '';
            let options = [];

            let embed = new MessageEmbed()
                .setTitle('Create a poll')
                .setDescription('Please reply with the question you would like to ask.');
            let res = await message.channel.send({ embeds: [embed] });

            const filter = (m: Message) => m.author.id === message.author.id;
            const questionCollector = message.channel.createMessageCollector({ filter, time: 60000 });

            questionCollector.on('collect', async (m: Message) => {
                if (m.content.toLowerCase() === 'cancel') {
                    m.delete();
                    res.delete();
                    message.channel.send('Cancelled.');
                    return questionCollector.stop();
                }

                question = m.content;
                m.delete();
                questionCollector.stop();
                
                embed.setDescription('Please reply with the options you would like to use. Your options will be listed below. Once you are finished, please reply with `done`.');
                res.edit({ embeds: [embed] });

                const optionCollector = message.channel.createMessageCollector({ filter, time: 600000 });

                optionCollector.on('collect', async (m: Message) => {
                    if (m.content.toLowerCase() === 'cancel') {
                        res.delete();
                        m.delete();
                        message.channel.send('Cancelled.');
                        return optionCollector.stop();
                    }

                    else if (m.content.toLowerCase() === 'done') {
                        console.log('Finishing up...');
                        optionCollector.stop();
                        res.edit('Poll created.');
                        message.guild.channels.fetch('839890628908810240').then((channel: TextChannel) => {
                                
                            const emojis = {
                                1: '1️⃣',
                                2: '2️⃣',
                                3: '3️⃣',
                                4: '4️⃣',
                                5: '5️⃣',
                                6: '6️⃣',
                                7: '7️⃣',
                                8: '8️⃣',
                                9: '9️⃣',
                                10: '🔟'
                            };

                            let desc = '';
                            options.forEach(obj => desc += `${obj.num}: ${obj.value}\n`);
                            console.log(desc);
                            
                            const embed = new MessageEmbed()
                                .setTitle(`${question}`)
                                .setDescription(`${desc}`);
                            channel.send({ embeds: [embed] }).then(async msg => {
                                for (const option of options) {
                                    await msg.react(emojis[option.num]);
                                }
                            })
                        });
                    }

                    else if (options.length >= 10) {
                        optionCollector.stop();
                        res.edit('You can only have 10 options.');
                        return;
                    }

                    else {
                        options.push({ value: m.content, num: options.length + 1 });
                        embed.addField(`${options.length}`, `${m.content}`, true);
                        res.edit({ embeds: [embed] });
                        m.delete();
                    }
                }); 
            });
        }
    }
}