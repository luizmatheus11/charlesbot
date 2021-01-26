const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const { COLOR } = process.env
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'permissaoVIP',
            aliases: ['permvip'],
            cooldown: 1000
        })
    }

    async run(ctx) {
        if (!ctx.guild.ownerID || ctx.author.id !== '160928247973019648')
            return ctx.reply('você nao tem permissão pra este comando.')
        const servericon = ctx.guild.iconURL({ format: "png", dynamic: true })
        const embed = new MessageEmbed()
            .setColor(COLOR)
            .setTitle(`<a:xseta_HG:801587045633884236> Sistema de permissão VIP ${ctx.guild.name.toUpperCase()}`)
            .setDescription(`<:Ve_ErradoTKF:801586594146418709> Use add, remove ou visualize`)
            .setFooter(`${ctx.guild.name}`, servericon)
            .setTimestamp()

        if (!ctx.args[0]) return ctx.channel.send(embed)
        switch (ctx.args[0].toLowerCase()) {
            case 'add': {
                const cargo = ctx.mentions.roles.first() || ctx.guild.roles.cache.get(ctx.args[1])
                await ctx.client.database.permissaoav.find({ Guild: ctx.guild.id }, async (err, data) => {
                    if (err) throw err;
                    let counter = 0
                    const arrayIds = []
                    data.forEach(element => {
                        arrayIds.push(data[counter].PermissaoAv)
                        counter++
                    });
                    if (!data) {
                        data = new ctx.client.database.permissaoav({
                            Guild: ctx.guild.id,
                            PermissaoAv: cargo.id,
                            PermissaoName: cargo
                        }).save()
                    } else if (arrayIds.includes(cargo.id)) {
                        const embed = new MessageEmbed()
                            .setColor(COLOR)
                            .setTitle(`<a:xseta_HG:801587045633884236> Sistema de permissão VIP ${ctx.guild.name.toUpperCase()}`)
                            .setDescription(`<:Ve_ErradoTKF:801586594146418709> Já existe este cargo dentro da database`)
                            .setFooter(`${ctx.guild.name}`, servericon)
                            .setTimestamp()
                        return ctx.channel.send(embed)
                    } else {
                        data = new ctx.client.database.permissaoav({
                            Guild: ctx.guild.id,
                            PermissaoAv: cargo.id,
                            PermissaoName: cargo
                        }).save()
                    }
                    const embed = new MessageEmbed()
                        .setColor(COLOR)
                        .setTitle(`<a:xseta_HG:801587045633884236> Sistema de permissão VIP ${ctx.guild.name.toUpperCase()}`)
                        .setDescription(`<:V_CorretoTKF:801586413535100939> Permissão ${cargo} adicionada com sucesso.`)
                        .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
                        .setTimestamp()
                    ctx.channel.send(embed)

                })
                break;
            }
            case 'remove': {
                const cargo = ctx.mentions.roles.first() || ctx.guild.roles.cache.get(ctx.args[1])
                await ctx.client.database.permissaoav.findOneAndDelete({ Guild: ctx.guild.id, PermissaoAv: cargo.id })
                const embed = new MessageEmbed()
                    .setColor(COLOR)
                    .setTitle(`<a:xseta_HG:801587045633884236> Sistema de permissão VIP ${ctx.guild.name.toUpperCase()}`)
                    .setDescription(`<:V_CorretoTKF:801586413535100939> Permissão ${cargo} removida com sucesso.`)
                    .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
                    .setTimestamp()
                ctx.channel.send(embed)
                break;

            }
            case 'visualize': {
                let counter = 0
                const arrayVisu = []
                const guild = ctx.guild.id
                const data = await ctx.client.database.permissaoav.find({ Guild: guild })
                data.forEach(element => {
                    arrayVisu.push(data[counter].PermissaoName)
                    counter++
                });
                console.log(arrayVisu)
                const embed2 = new MessageEmbed()
                    .setColor(COLOR)
                    .setTitle(`<a:xseta_HG:801587045633884236> Sistema de permissão VIP ${ctx.guild.name.toUpperCase()}`)
                    .setDescription(`Permissões VIP:${arrayVisu}`)
                    .setFooter(`${ctx.guild.name.toUpperCase()}`, servericon)
                    .setTimestamp()
                await ctx.channel.send(embed2)



            }
        }


    }
}  