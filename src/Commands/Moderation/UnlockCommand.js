const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const color = process.env.COLOR
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'unlock',
            aliases: ['destrancar']
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

        let embed = new MessageEmbed()
              .setColor(color)
              .setDescription(`Este canal foi desbloqueado por ${ctx.author}🔓`)
              .setFooter(`${ctx.guild.name} `, ctx.guild.iconURL({ format: "png", dynamic: true }))
              .setTimestamp();
        ctx.channel.updateOverwrite(ctx.guild.id, { SEND_MESSAGES: true })
        ctx.channel.send(embed)
        
            
            }
    }
