const CommandContext = require('../Structures/CommandContext');
const Event = require('../Structures/Event')
const { MessageEmbed } = require('discord.js')
const { PREFIX, COLOR } = process.env;
const ms = require('ms')

module.exports = class MessageListener extends Event {
  constructor(client) {
    super(client, {
      name: "message"
    })
  }

  async run(message) {
    if (message.channel.type !== "text") return;
    if (message.author.bot) return;
    
    let prefix = PREFIX;
    const data = await this.client.database.prefix.findOne({ Guild: message.guild.id }).catch(err => console.log(err))
    if (data) prefix = data.Prefix;
    
    const embed = new MessageEmbed()
      .setColor(COLOR)
      .setAuthor(`CharDev`)
      .setDescription(`Me chamo ${message.client.user.username}, fui criado para servir aos administradores desse servidor e adoro muquecas\nMeu prefixo neste servidor é ${prefix}`)
      .setTimestamp()

    if ([`<@${message.client.user.id}>`, `<@!${message.client.user.id}>`].includes(message.content)) return message.channel.send(embed)
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(" ");

    const command = args.shift().toLowerCase()
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
    if (!cmd) return message.channel.send(":x: | Não tenho este comando. " + command)
    
    if(this.client.cooldowns.has(message.author.id)) return message.channel.send(`Você está em tempo de espera de ${ms(cmd.commandSettings.cooldown)} `)
    if(cmd.commandSettings.devOnly && !this.client.settings.owners.includes(message.author.id)) return message.channel.send("Você não é um dos meus criadores.")

    message.channel.startTyping();
    const context = new CommandContext(message, args, this.client)

    cmd.run(context)
    this.client.cooldowns.set(message.author.id, cmd.commandSettings.cooldown)
    
    setTimeout(() => {
      this.client.cooldowns.delete(message.author.id)
    }, cmd.commandSettings.cooldown)
    
    message.delete()

    message.channel.stopTyping();
  }
}