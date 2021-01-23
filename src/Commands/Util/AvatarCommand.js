const Command = require('../../Structures/Command')
const {MessageEmbed} = require('discord.js')
const color = process.env.COLOR

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['av']
        })
    }

    run(ctx) {
        let user = ctx.author
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 4096 });
        
    
        let embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`<:blobcamera:802276851439501352> ${user.username}`)
            .setImage(avatar)
            .setTimestamp()
        ctx.channel.send(embed)

    }
}