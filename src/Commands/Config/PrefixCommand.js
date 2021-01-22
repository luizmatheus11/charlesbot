const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'prefix',
            aliases: []
        })
    }

    async run(ctx) {
        if(!ctx.args.length) return ctx.channel.send("Fala um prefixo novo filho da puta")
        await ctx.client.database.prefix.findOne({ Guild: ctx.guild.id }, async (err, data) => {
            if (err) throw err;
            data.Prefix = ctx.args[0];
            data.save()
        })
    }
}
