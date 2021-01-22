const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['pong']
        })
    }

    run(ctx) {
        ctx.channel.send(":ping_pong: | Meu ping está em " + ctx.client.ws.ping + " ms")
    }
}