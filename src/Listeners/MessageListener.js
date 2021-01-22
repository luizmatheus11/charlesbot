const CommandContext = require('../Structures/CommandContext');
const Event = require('../Structures/Event')

module.exports = class MessageListener extends Event {
    constructor(client) {
        super(client, {
            name: "message"
        })
    }

    run(message) {
        if(message.channel.type !== "text") return;
        if(message.author.bot) return;
        
        if(!message.content.startsWith("test!")) return;
        const args = message.content.slice("test!".length).trim().split(" ");

        const command = args.shift().toLowerCase()
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
        if(!cmd) return message.channel.send(":x: | Não tenho o comando/alias " + command)

        message.channel.startTyping();
        
        const context = new CommandContext(message, args, this.client)
        cmd.run(context)

        message.channel.stopTyping();
    }
}