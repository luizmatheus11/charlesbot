const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'addpremium',
            aliases: ['addp']
        })
    }

    run(ctx) {
        
    }
}