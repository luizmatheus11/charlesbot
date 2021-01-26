const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const color = process.env.COLOR

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['av'],
            cooldown: 5000
        })
    }

    async run(ctx) {
        const data = await ctx.client.database.permissaoav.find({ Guild: ctx.guild.id})
        let counter = 0
        const arrayperm = []
        data.forEach(element => {
            arrayperm.push(data[counter].PermissaoAv)
            counter++
        });
        if(!arrayperm.some(id => ctx.member.roles.cache.has(id))) 
        return ctx.channel.send('sem perm otario')
        let user = ctx.author
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 4096 });
        
    
        let embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`<:blobcamera:802276851439501352> ${user.username}`)
            .setImage(avatar)
            .setTimestamp()
        ctx.channel.send(embed)

    }
}