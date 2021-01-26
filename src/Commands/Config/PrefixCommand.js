const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const {PREFIX, COLOR} = process.env

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'prefix',
            aliases: []
        })
    }

    async run(ctx) {
        
        const data = await ctx.client.database.permissaomod.find({ Guild: ctx.guild.id})
        if(!data) return ctx.channel.send('Permissões não configuradas.')
        let counter = 0
        const arrayperm = []
        data.forEach(element => {
            arrayperm.push(data[counter].PermissaoMod)
            counter++
        });
        if(!arrayperm.some(id => ctx.member.roles.cache.has(id))) 
        return ctx.channel.send('sem perm otario')

        const servericon = ctx.guild.iconURL({ format: "png", dynamic: true })
        const embed = new MessageEmbed()
            .setColor(COLOR)
            .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
            .setDescription(`<:Ve_ErradoTKF:801586594146418709> Use addprefix, updateprefix ou reset`)
            .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
            .setTimestamp()
        if (!ctx.args[0]) return (embed)

        switch (ctx.args[0].toLowerCase()) {
            case 'add': {
                const res = ctx.args[1]
                const embed = new MessageEmbed()
                    .setColor(COLOR)
                    .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                    .setDescription(`<:Ve_ErradoTKF:801586594146418709> Expecifique o prefixo do servidor.`)
                    .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
                    .setTimestamp()

                if (!res) return ctx.channel.send(embed)
                await ctx.client.database.prefix.findOne({ Guild: ctx.guild.id }, async (err, data) => {
                    if (err) throw err;
                    const embed = new MessageEmbed()
                        .setColor(COLOR)
                        .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                        .setDescription(`<:Ve_ErradoTKF:801586594146418709> Você já possui um prefixo no banco de dados.`)
                        .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
                        .setTimestamp()
                    if (data) {
                        ctx.channel.send(embed)
                    } else {
                        data = new ctx.client.database.prefix({
                            Guild: ctx.guild.id,
                            Prefix: res
                        })

                        data.save()
                        const embed = new MessageEmbed()
                            .setColor(COLOR)
                            .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                            .setDescription(`<:V_CorretoTKF:801586413535100939> Seu novo prefixo é **${res}**`)
                            .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
                            .setTimestamp()
                        ctx.channel.send(embed)
                    }
                }
                )
                break;
            }
            case 'update': {
                const res = ctx.args[1]
                await ctx.client.database.prefix.findOne({ Guild: ctx.guild.id }, async (err, data) => {
                    data.Prefix = res
                    data.save()
                    const embed = new MessageEmbed()
                        .setColor(COLOR)
                        .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                        .setDescription(`<:V_CorretoTKF:801586413535100939> Seu prefixo atualizado é **${res}**`)
                        .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
                        .setTimestamp()
                    await ctx.channel.send(embed)
                })
                break;
            }
            case `reset`: {
                await ctx.client.database.prefix.findOneAndDelete({ Guild: ctx.guild.id })
                const embed = new MessageEmbed()
                    .setColor(COLOR)
                    .setTitle(`<a:xseta_HG:801587045633884236> Sistema de customização de prefixo`)
                    .setDescription(`<:V_CorretoTKF:801586413535100939> Prefixo resetado com sucesso. Prefixo padrão do bot é **${PREFIX}**`)
                    .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
                    .setTimestamp()
                ctx.channel.send(embed)
                break;
            }
        }
    }
}
