const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const color = process.env.COLOR
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'warn-remove',
            aliases: ['retirar-advertencia','removeadv']
        })
    }

    async run(ctx){
        const role1 = await ctx.guild.roles.cache.find(r => r.name === 'Advertencia 1')
        const role2 = await ctx.guild.roles.cache.find(r => r.name === 'Advertencia 2')
        const target = ctx.mentions.members.first()
        if(!target) return ctx.channel.send(`Por favor, marque a pessoa na qual vai remover a advertência`)
        if(target && target.roles.cache.find(r => r.name === 'Advertencia 1')){
            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`<:warning:805497619442696242> Inteface de Advertência | ${this.client.user.username} `)
            .setDescription(`Advertencia removida de ${target}`)
            .setTimestamp()
            ctx.channel.send(embed)
            target.roles.remove(role1)

        }
        else if(target && target.roles.cache.find(r => r.name === 'Advertencia 2')){
            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`<:warning:805497619442696242> Inteface de Advertência | ${this.client.user.username} `)
            .setDescription(`Advertencia removida de ${target}`)
            .setTimestamp()
            ctx.channel.send(embed)
            target.roles.remove(role2)
        }else{
            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`<:warning:805497619442696242> Inteface de Advertência | ${this.client.user.username} `)
            .setDescription(`${target} não possui nenhuma advertencia.`)
            .setTimestamp()
            ctx.channel.send(embed)
        }
     }}