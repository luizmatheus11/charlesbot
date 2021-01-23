const { MessageEmbed } = require('discord.js')
const Command = require('../../Structures/Command')
const color = process.env.COLOR

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            aliases: ['clean', 'limpar']
        })
    }

    async run(ctx) {
        const servericon = ctx.guild.iconURL({ format: "png", dynamic: true })
        const deleteCount = parseInt(ctx.args[0], 10)
        const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`<a:xseta_HG:801587045633884236> Moderação ${server.name.toUpperCase()}`)
            .setDescription(`<:Ve_ErradoTKF:801586594146418709> Diga o numero de mensagens para apagar.`)
            .setFooter(`${server.name}`, servericon)
            .setTimestamp()
        if (!deleteCount || deleteCount < 1 || deleteCount > 99) return ctx.channel.send(embed).then(m => m.delete({ timeout: 5000 }))

        const embed1 = new MessageEmbed()
            .setColor(color)
            .setDescription(`<a:lab_loading:802253207240704001> Apagando as mensagens...`)
            .setFooter(`${server.name}`, servericon)
            .setTimestamp()
        await ctx.channel.send(embed1)
        const fetched = await ctx.channel.messages.fetch({
            limit: deleteCount + 1
        });
        ctx.channel.bulkDelete(fetched, [true])

        var segundos;
        if (deleteCount < 2) {
            segundos = "mensagem"
        } else {
            segundos = "mensagens"
        }

        const embed2 = new MessageEmbed()
            .setColor(color)
            .setTitle(`<a:xseta_HG:801587045633884236> Moderação ${server.name.toUpperCase()}`)
            .setDescription(`<a:Rainbow_Blob_Trash:802256372266958848> Apaguei com sucesso: **${deleteCount} ${segundos}**`)
            .setFooter(`${server.name}`, servericon)
            .setTimestamp()

        await ctx.channel.send(embed2).then(m => m.delete({ timeout: 10000 }))



    }
}