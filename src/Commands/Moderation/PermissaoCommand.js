const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const color = process.env.COLOR
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'lock',
            aliases: ['trancar']
        })
    }

    run(ctx) {
        if (!ctx.guild.ownerID || ctx.author.id !== '160928247973019648')
        return ctx.reply('você nao tem permissão pra este comando.')
    
    const servericon = ctx.guild.iconURL({ format: "png", dynamic: true })
    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
        .setDescription(`<:Ve_ErradoTKF:801586594146418709> Use add ou remove.`)
        .setFooter(`${server.name}`, servericon)
        .setTimestamp()

    if (!ctx.args[0]) return ctx.channel.send(embed)

    switch (ctx.args[0].toLowerCase()){
        case 'add' : {
            const cargo = ctx.mentions.roles.first() || ctx.guild.roles.cache.get(ctx.args[1])
            const embed = new MessageEmbed()
                        .setColor(color)
                        .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                        .setDescription(`<:V_CorretoTKF:801586413535100939> Permissão <@&${cargo.id}> adicionada com sucesso.`)
                        .setFooter(`${server.name}`, servericon)
                        .setTimestamp()
                ctx.channel.send(embed)
                await permSchema.findOne({ Guild: ctx.guild.id }, async (err, data) => {
                    if (err) throw err;
                        data = new permSchema({
                            Guild: ctx.guild.id,
                            PermissaoMod: cargo.id,
                        })
                        data.save()
                    
                })
                break;
            }
        }
        
    }}