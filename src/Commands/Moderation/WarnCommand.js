const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const color = process.env.COLOR
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            aliases: ['advertencia','adv']
        })
    }

    async run(ctx){
        const role1 = await ctx.guild.roles.cache.find(r => r.name === 'Advertencia 1')
        const role2 = await ctx.guild.roles.cache.find(r => r.name === 'Advertencia 2')
        if(!role1 && !role2) {
            ctx.guild.roles.create({
                data: {
                    name: 'Advertencia 1',
                    color: 'BLACK'
                }
            })
            ctx.guild.roles.create({
                data: {
                    name: 'Advertencia 2',
                    color: 'BLACK'
                }
            })
             return ctx.channel.send('Sua tag de Advertencia foi criada.')}
        
        const target = ctx.mentions.members.first()
        const reason = ctx.args.slice(1).join(" ")
        if(!target) return ctx.channel.send(`Por favor, marque a pessoa na qual vai receber a advertência`)
        if(!reason) return ctx.channel.send('Por favor, dê um motivo para a advertência')
        if(target && reason && !target.roles.cache.find(r => r.name === 'Advertencia 1') && !target.roles.cache.find(r => r.name === 'Advertencia 2')){
            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`<:warning:805497619442696242> Inteface de Advertência | ${this.client.user.username} `)
            .addField('<:DiscordStaff:805497902315208725> Staff:', `${ctx.author.username}`, true)
            .addField('<:Discord_Team_Member:805498382897643540> Membro Advertido:',`${target}`, true)
            .addField('<:quantix_rules:805498178664136714> Motivo:',`${reason}`)
            .setFooter(`Primeira Advetencia.`, ctx.guild.iconURL({ format: "png", dynamic: true }))
            .setTimestamp()
            ctx.channel.send(embed)
            target.roles.add(role1)

        }
        else if(target && reason && target.roles.cache.find(r => r.name === 'Advertencia 1' && !target.roles.cache.find(r => r.name === 'Advertencia 2'))){
            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`<:warning:805497619442696242> Inteface de Advertência | ${this.client.user.username} `)
            .addField('<:DiscordStaff:805497902315208725> Staff:', `${ctx.author.username}`, true)
            .addField('<:Discord_Team_Member:805498382897643540> Membro Advertido:',`${target}`, true)
            .addField('<:quantix_rules:805498178664136714> Motivo:',`${reason}`)
            .setFooter(`Segunda advertencia.`, ctx.guild.iconURL({ format: "png", dynamic: true }))
            .setTimestamp()
            ctx.channel.send(embed)
            target.roles.remove(role1)
            target.roles.add(role2)
        }
        else if(target && reason && !target.roles.cache.find(r => r.name === 'Advertencia 1') && target.roles.cache.find(r => r.name === 'Advertencia 2')) {
            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`<:warning:805497619442696242> Inteface de Advertência | ${this.client.user.username} `)
            .addField('<:DiscordStaff:805497902315208725> Staff:', `${ctx.author.username}`, true)
            .addField('<:Discord_Team_Member:805498382897643540> Membro Advertido:',`${target}`, true)
            .addField('<:quantix_rules:805498178664136714> Motivo:',`${reason}`)
            .setFooter(`Terceira advertencia e Banimento`, ctx.guild.iconURL({ format: "png", dynamic: true }))
            .setTimestamp()
            ctx.channel.send(embed)

        }
    }}