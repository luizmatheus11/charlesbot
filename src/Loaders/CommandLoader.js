const { readdir } = require('fs')
const chalk = require('chalk')

module.exports = class CommandLoader {
    constructor(client) {
        readdir("./src/Commands", (err, f) => {
            if(err) throw new RangeError("Command Loader Error: " + err)
            f.forEach(category => {
                readdir(`./src/Commands/${category}`, (err, cmd) => {
                    cmd.forEach(cmd => {
                        if(err) return console.error(chalk.red.bold(' | [ COMMANDS ]  ' + err))
                        const Command = require(`../Commands/${category}/${cmd}`)
                        delete require.cache[require.resolve(`../Commands/${category}/${cmd}`)]
                        
                        const command = new Command(client)
                        client.commands.set(command.commandSettings.name, command)
                        
                        command.commandSettings.aliases.forEach(aliases => client.aliases.set(aliases, command.commandSettings.name))
                        
                        console.log(' | ' + chalk.rgb(94, 209, 113).bold('[ COMMANDS ]  ') + cmd.replace('.js', '').replace('Command', '') + ' - Command Loaded with Sucess')
                    })
                })
            })
        })
    }
}