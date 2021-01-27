const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const { COLOR } = process.env
const ms = require('ms')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['mutar', 'silenciar'],
            cooldown: 1000
        })
    }

    async run(ctx) {
        const role = await ctx.guild.roles.cache.find(r => r.name === 'Muted')
        let time = ctx.args[1];
        let user = ctx.mentions.members.first() || ctx.client.members.cache.get(ctx.args[0])
        let reason = ctx.args.slice(2).join(" ")
        if(!role) {
            ctx.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'BLACK'
                }
            })
             return ctx.channel.send('Sua tag de Mutado foi criada, para o comando ser efetivo, configure a tag no servidor.')
        }
        if(!time) return ctx.channel.send('Sem tempo definido.')
        if(!user) return ctx.channel.send('Sem usuario definido.')
        if(!reason) return ctx.channel.send('Sem razão fornecida.')
        
        const previousmute = await ctx.client.database.muted.find({
            guildId: ctx.guild.id,
            userId: user.id
        })
        
        const currentlyMuted = previousmute.filter(mute => {
             return mute.current === true
        })
        if(currentlyMuted.length) {
             return ctx.channel.send('Usuario já está mutado.')
        }

        const expires = new Date()
        expires.setHours(expires.getHours() + ms(time))
        console.log(time)
        console.log(expires)
        user.roles.add(role)
        
        await ctx.client.database.muted.find({ guildId: ctx.guild.id }, async (err, data) => {
            if(!data) {
                data = new ctx.client.database.muted({
                userId: user.id,
                guildId: ctx.guild.id,
                reason: reason,
                expires: expires,
                current: true,
    
            }).save()}
            else {
                data =  new ctx.client.database.muted({
                    userId: user.id,
                    guildId: ctx.guild.id,
                    reason: reason,
                    expires: expires,
                    current: true,
        
                }).save()
            }
        })
       

        const embed = new MessageEmbed()
            .setColor(COLOR)
            .setTitle(`<a:xseta_HG:801587045633884236> Inteface de Banimento | ${this.client.user.username} `)
            .addField('Staff:', `${ctx.author.username}`, true)
            .addField('Motivo:',`${reason}`, true)
            .addField('Tempo:',`${ms(time)}`)
            .addField('Membro Mutado:',`${user}`)
            .setFooter(`${ctx.guild.name}`, ctx.guild.iconURL({ format: "png", dynamic: true }))
            .setTimestamp()
        ctx.channel.send(embed)
        
        
    }
}