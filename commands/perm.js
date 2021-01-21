const permSchema = require('../models/permissaomod')
const Discord = require('discord.js')

module.exports.run = async (client, message, args, config, mongoose) => {
    if (!message.guild.ownerID || message.author.id !== '160928247973019648')
        return message.reply('você nao tem permissão pra este comando.')
    const server = client.guilds.cache.get(message.guild.id)
    const servericon = server.iconURL({ format: "png", dynamic: true })
    const embed = new Discord.MessageEmbed()
        .setColor(`#ac0202`)
        .setThumbnail(servericon)
        .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
        .setDescription(`<:Ve_ErradoTKF:801586594146418709> Use add ou remove.`)
        .setFooter(`${server.name}`, servericon)
        .setTimestamp()

    if (!args[0]) return message.channel.send(embed)

    switch (args[0].toLowerCase()){
        case 'add' : {
            const cargo = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
            const embed = new Discord.MessageEmbed()
                        .setColor(`#228B22`)
                        .setThumbnail(servericon)
                        .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                        .setDescription(`<:V_CorretoTKF:801586413535100939> Permissão <@&${cargo.id}> adicionada com sucesso.`)
                        .setFooter(`${server.name}`, servericon)
                        .setTimestamp()
                message.channel.send(embed)
                await permSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
                    if (err) throw err;
                        data = new permSchema({
                            Guild: message.guild.id,
                            PermissaoMod: cargo.id,
                        })
                        data.save()
                    
                })
                break;
            }
        }
    }
module.exports.help = {
    name: "permissoes",
    aliases: "permadm",
    description: "Gerenciamento de permissões do bot.",
    timeout: 1000
}