const Discord = require("discord.js");
const client = new Discord.Client()
const mongoose = require('mongoose')
const config = require("../config.json")
const Timeout = new Discord.Collection()
const ms = require('ms')

module.exports = async (client, mongoose, message) => {
  const p = await client.prefix(message)
  if (message.channel.type == 'dm') return;
  const embed = new Discord.MessageEmbed()
    .setColor(`#2a0050`)
    .setAuthor(`CharDev`)
    .setDescription(`Me chamo ${client.user.username}, fui criado para servir aos administradores desse servidor e adoro muquecas
    Meu prefixo é ${p}`)
    .setTimestamp()

  if ([`<@${client.user.id}>`, `<@!${client.user.id}>`].includes(message.content)) return message.quote([embed], {options: false})
  if (!message.content.startsWith(p)) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(`${p}aviso`)) message.delete({ timeout: 0 })
  else message.delete({ timeout: 2000 })

  const args = message.content.slice(p.length).split(' '),
    comando = args.shift()
  const command = client.commands.find(c => c.help.name === comando || (c.help.aliases && c.help.aliases.includes(comando)))
  if (!command) return;
  else if  (command) {
    if (command.help.timeout) {
      if (Timeout.has(`${command.help.name}${message.author.id}`)) return message.channel.send(`Este comando tem: \`${ms(Timeout.get(`${command.help.name}${message.author.id}`) - Date.now())}\` segundos de tempo de espera. `)
      command.run(client, message, args, config, mongoose)
      Timeout.set(`${command.help.name}${message.author.id}`, Date.now() + command.help.timeout)
      setTimeout(() => {
        Timeout.delete(`${command.help.name}${message.author.id}`)
      }, command.help.timeout)
    }
  }

}