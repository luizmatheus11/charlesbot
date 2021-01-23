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

    run(ctx) {
        let embed = new MessageEmbed()
              .setColor(color)
              .setDescription(`Este canal foi desbloqueado por ${ctx.author}🔓`)
              .setFooter(`${ctx.guild.name} `, ctx.guild.iconURL({ format: "png", dynamic: true }))
              .setTimestamp();
        ctx.channel.updateOverwrite(ctx.guild.id, { SEND_MESSAGES: true })
        ctx.channel.send(embed)
        
            
            }
    }
