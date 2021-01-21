const prefixSchema = require("../models/prefix")
const Discord = require('discord.js')

module.exports.run = async (client, message, args, config, mongoose) => {
    const server = client.guilds.cache.get(message.guild.id)
    const servericon = server.iconURL({ format: "png", dynamic: true })
    switch (args[0].toLowerCase()) {
        case 'addprefix': {
            const res = args[1]
            const embed = new Discord.MessageEmbed()
                .setColor(`#ac0202`)
                .setThumbnail(servericon)
                .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                .setDescription(`<:Ve_ErradoTKF:801586594146418709> Expecifique o prefixo do servidor.`)
                .setFooter(`${server.name}`, servericon)
                .setTimestamp()

            if (!res) return message.reply(embed)

            await prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    data = new prefixSchema({
                        Guild: message.guild.id,
                        Prefix: res
                    })
                    data.save()
                    const embed = new Discord.MessageEmbed()
                        .setColor(`#228B22`)
                        .setThumbnail(servericon)
                        .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                        .setDescription(`<:V_CorretoTKF:801586413535100939> Seu novo prefixo é **${res}**`)
                        .setFooter(`${server.name}`, servericon)
                        .setTimestamp()
                    message.channel.send(embed)
                }
            })
            break;
        }
        case 'updateprefix': {
            const res = args[1]
            await prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
                await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res
                })
                data.save()
                const embed = new Discord.MessageEmbed()
                    .setColor(`#228B22`)
                    .setThumbnail(servericon)
                    .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                    .setDescription(`<:V_CorretoTKF:801586413535100939> Seu prefixo atualizado é **${res}**`)
                    .setFooter(`${server.name}`, servericon)
                    .setTimestamp()
                await message.channel.send(embed)
            })
            break;
        }
        case `reset`: {
            await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
            const embed = new Discord.MessageEmbed()
                .setColor(`#228B22`)
                .setThumbnail(servericon)
                .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                .setDescription(`<:V_CorretoTKF:801586413535100939> Prefixo resetado com sucesso. Seu novo prefixo é **${config.prefix}**`)
                .setFooter(`${server.name}`, servericon)
                .setTimestamp()
            message.channel.send(embed)
            break;
        }
    }



}
module.exports.help = {
    name: "prefix",
    aliases: "p",
    description: "Criar, mudar e resetar um prefixo customizado.",
    timeout: 1000
}