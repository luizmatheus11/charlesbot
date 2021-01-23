const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'removeguild',
            aliases: ['rguild']
        })
    }

    run(ctx) {
        
    }
}