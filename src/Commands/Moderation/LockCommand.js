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
        let embed = new MessageEmbed()
        .setColor(color)
        .setDescription(`🔒Chat trancado por **${ctx.author}** \n Para destrancar o chat, digite o comando **unlock**/**destrancar** ou reaja no 🔓.`)
        .setFooter(`${ctx.guild.name} `, ctx.guild.iconURL({ format: "png", dynamic: true }))
        .setTimestamp();
        ctx.channel.updateOverwrite(ctx.guild.id, { SEND_MESSAGES: false })
        ctx.channel.send(embed).then(msg => {
            msg.react("🔓")
        
            let filtrolock = (reaction, usuario) => reaction.emoji.name === "🔓" && usuario.id === ctx.author.id;
            let coletorsim = msg.createReactionCollector(filtrolock, { max: 1 })
        
            let embed = new MessageEmbed()
              .setColor(color)
              .setDescription(`Este canal foi desbloqueado por ${ctx.author}🔓`)
              .setFooter(`${ctx.guild.name} `, ctx.guild.iconURL({ format: "png", dynamic: true }))
              .setTimestamp();
        
            coletorsim.on("collect", cpnao => {
              cpnao.remove(ctx.author.id);
              ctx.channel.updateOverwrite(ctx.guild.id, { SEND_MESSAGES: true })
              msg.edit(embed);
              
        
            })
            })
    }
}