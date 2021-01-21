const { APIMessage, Message } = require("discord.js");
/**
* @param {StringResolvable|APIMessage} [content='']
* @param {MessageOptions|MessageAdditions} [options={}]
* @param {string} [options?.messageID] - o ID da mensagem que será citada
* @param {boolean} [options?.mention] - caso deva mencionar o autor da mensagem
*/

Message.prototype.quote = async function (content, options) {
  const reference = {
    message_id: (
      !!content && !options
        ? typeof content === 'object' && content.messageID
        : options && options.messageID
    ) || this.id,
    message_channel: this.channel.id
  }

  const { data: parsed, files } = await APIMessage
    .create(this, content, options)
    .resolveData()
    .resolveFiles()

  let msg = await this.client.api.channels[this.channel.id].messages.post({
    data: { ...parsed, message_reference: reference },
    files
  })

  await this.channel.messages.fetch(msg.id)
            .then(message => msg = message)
            .catch((err) => {
                console.log(err.stack)
            });

  return msg
}