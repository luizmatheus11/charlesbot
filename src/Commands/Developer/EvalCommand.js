const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            aliases: ['e', 'ev'],
            cooldown: 5,
            devOnly: true
        })
    }

    run(ctx) {
        const input = ctx.args.join(' ');
        if(!input) return ctx.channel.send('Fala o que tu quer passar no eval filho da puta')

        const { inspect } = require('util')
        let output = eval(input)

        output = inspect(output)
        output = output.substr(0, 1980)

        try {
            ctx.channel.send(`\`\`\`${output}\`\`\``)
        } catch (error) {
            ctx.channel.send(`${error}`)
        }
    }
}