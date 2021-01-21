const Discord = require('discord.js')
module.exports.run = async (client, message, args, config, mongoose) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 4096 });
        
    
        let embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setDescription(`**${user.username}**`)
            .setImage(avatar)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png" }))
            .setTimestamp()
        message.channel.send(embed)

} 

module.exports.help = {
    name: "avatar",
    aliases: "av",
    description: "Mostra a foto/avatar da pessoa no chat.",
    timeout : 7000,
}