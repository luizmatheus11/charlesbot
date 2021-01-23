const CommandContext = require('../Structures/CommandContext');
const Event = require('../Structures/Event')
const { MessageEmbed } = require('discord.js')
const default_prefix = process.env.PREFIX
const color = process.env.COLOR


module.exports = class MessageListener extends Event {
  constructor(client) {
    super(client, {
      name: "message"
    })
  }

  async run(message) {
    let prefix;
    const data = await this.client.database.prefix.findOne({ Guild: message.guild.id }).catch(err => console.log(err))
    if (data) {
      prefix = data.Prefix
    } else {
      prefix = default_prefix
    }

    if (message.channel.type !== "text") return;
    if (message.author.bot) return;
    const embed = new MessageEmbed()
      .setColor(color)
      .setAuthor(`CharDev`)
      .setDescription(`Me chamo ${message.client.user.username}, fui criado para servir aos administradores desse servidor e adoro muquecas
    Meu prefixo neste servidor é ${prefix}`)
      .setTimestamp()

    if ([`<@${message.client.user.id}>`, `<@!${message.client.user.id}>`].includes(message.content)) return message.channel.send(embed)
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(" ");

    const command = args.shift().toLowerCase()
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
    if (!cmd) return message.channel.send(":x: | Não tenho o comando/alias " + command)

    message.channel.startTyping();

    const context = new CommandContext(message, args, this.client)

    cmd.run(context)
    message.delete({timeout: 0})

    message.channel.stopTyping();
  }
}