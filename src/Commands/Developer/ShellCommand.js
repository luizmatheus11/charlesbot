const Command = require('../../Structures/Command')

module.exports = class ShellCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shell',
            aliases: ['terminal', 'cmd'],
            cooldown: 7,
            devOnly: true
        })
    }

    async run(ctx) {
        if(!ctx.args.join(" ")) return ctx.channel.send("O que eu devo executar ? Tenho cara q tenho bola de cristal filho da puta ?")
        
        const { promisify } = require('util');
        const exec = promisify(require('child_process').exec);

        const { error, stdout, stderr } = await exec(ctx.args.join(" "))
        if(error) return ctx.channel.send(`\`\`\`${error}\`\`\``)
        if(stderr) return ctx.channel.send(`\`\`\`${stderr}\`\`\``)
        if(stdout) return ctx.channel.send(`\`\`\`${stdout}\`\`\``)
    }
}